"use strict";

function send_request(url,method,parameters,callback){  //chiamata ajax generica
	//alert(parameters);
	$.ajax({
		url: url, //default: currentPage
		type: method,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		dataType: "text",   //usiamo un dato di tipo testo perchè al momento del parsing possiamo debuggarlo visualizzandolo
		data: parameters,
		timeout : 10000,
		success: callback,
		error : function(jqXHR, test_status, str_error){
			alert("Error: Not run. " + str_error);
		}
	});
}

let user = {};
let nowSelected = "";
let logged = false;
let buttons;

$(document).ready(function()
{
    send_request("php/userCookie.php", "POST", null, UserCookie_response);
    buttons = $("#modalAccedi .modal-body button");
    DefineBtnAccedi();
    DefineModalButtonsClick();
    DefineModalBtnAccedi();
    
});

//#region event listeners

function DefineModalBtnAccedi(){
    $("#btnAccediModal").on("click", function(){
        if(nowSelected == "Accedi")
            Accedi();
        else
            ControlliValiditaDati();
    });
}

function DefineModalButtonsClick(){
    buttons.on("click",function(){
        console.log(nowSelected.toString());
        if(nowSelected != $(this).html())
        {
            buttons.filter(".selected").removeClass("selected");
            $(this).addClass("selected");
            $("#modalAccedi .modal-body .container").empty();
            if($(this).html() == "Accedi")
            {
                GeneraAccedi();
            }
            else
            {
                GeneraRegister();
            }
            nowSelected = $(this).html();
            console.log(nowSelected);
        }
    });
}

function DefineBtnAccedi(){
    $("#btnAccedi").on("click", function(){
        if(logged)
        {
            $(buttons).hide();
            $("#modalAccedi .modal-header h5").text("Accesso come " + user.cognome + " " + user.nome);
            //$("#modalAccedi .modal-body").text("Sei iscritto a questi eventi: ");
            $("#btnAccediModal").text("Logout");
        }
        else
        {
            $(buttons).show();
            $(buttons).eq(0).click();
            setTimeout(function(){
                $(buttons).eq(0).focus();
            },501);
            nowSelected = "Accedi";
        }
        
        
    });
}
//#endregion

function UserCookie_response(responseText)
{
    let json = JSON.parse(responseText);
    if(json.cookie_existing)
    {
        logged = true;
        $(buttons).hide();
        user = JSON.parse(JSON.parse(json.data));
        $("#modalAccedi .modal-header h5").text("Accesso come " + user.cognome + " " + user.nome);
        $("#modalAccedi .modal-body").append("<div class='container events-container'></div>");
        //TODO eventi
        send_request("php/richiediEventi.php", "POST", null, eventiRequest);
        $("#btnAccediModal").text("Logout");
        ModalitàAccesso();
    }

}

function eventiRequest(responseText){
    let json = JSON.parse(responseText);
    if(json.success)
    {
        for(let evento of json.events)
        {
            let expired = evento.num_attuale_partecipanti == evento.num_max_partecipanti;
            let row = $("<div class='d-flex flex-row bd-highlight mb-3 evento rounded "+ (expired? "bg-danger": "bg-success") +"'></div>");
            row.append('<div class="align-middle p-2 bd-highlight col-lg-3">'+ evento.nome_evento +'</div>');
            row.append('<div class="align-middle p-2 bd-highlight col-lg-2">Il '+ evento.data +'</div>');
            row.append('<div class="align-middle p-2 bd-highlight col-lg-2">Ore '+ evento.ora +'</div>');
            row.append('<div class="align-middle p-2 bd-highlight col-lg-2">Partecipanti: '+ evento.num_attuale_partecipanti + "/"+ evento.num_max_partecipanti +'</div>');
            row.append('<div class="align-middle p-2 bd-highlight col-lg-2">' + 
                            '<button id="btnEvento'+ evento.id +'" class="btn btn-primary" name="btnEvento" '+ (expired? "disabled":"") +'>Iscriviti</button>' + 
                            '</div>');
            $("#modalAccedi .modal-body .events-container").append(row);
        }
        $("button[name = 'btnEvento']").on("click", function(){
            let parameters = {
                id_evento : $(this).attr("id").toString().substr($(this).attr("id").toString().lenght-1),
                email : user.email
            }
            send_request("php/eventRegistration.php","POST", parameters, EventRegistrationResponse);
        });
    }
}

function EventRegistrationResponse(){




}

function GeneraAccedi() //html per accedere
{
    let string = '<div class="form">' +
    '<div class="form">' + 
    '<input class="form-control" type="text" placeholder="Email" id="txtEmail">' + 
    '<input class="form-control mt-2" type="password" placeholder="Password" id= "txtPassword">' +
    '</div>';
    $("#modalAccedi .modal-body .container").html(string);
    $("#btnAccediModal").html("Accedi");
}

function GeneraRegister()   //html per iscriversi
{
    let string =
                '<div class="form">' + 
                '<input class="form-control" type="text" placeholder="Nome" id="txtNome">' + 
                '<input class="form-control mt-2" type="text" placeholder="Cognome" id="txtCognome">' +
                '<input class="form-control mt-2" type="email" placeholder="Email" id="txtEmail">' +
                '<input class="form-control mt-2" type="password" placeholder="Password" id="txtPassword">' +
                '<input class="form-control mt-2" type="password" placeholder="Conferma Password" id = "txtConfermaPass">' +
                '<input class="form-control mt-2" type="text" placeholder="Data di nascita" id="datepicker" autocomplete="off">' +
                '</div>';
    $("#modalAccedi .modal-body .container").html(string);
    $("#alertRegister").hide();
    $("#btnAccediModal").html("Registrati");
    $("#datepicker").datepicker({changeMonth: true, changeYear: true, yearRange: "-120:+0"})
                    .attr('readonly','readonly');
}

function Accedi()
{
    let parameters = {
        email: $("#txtEmail").val(),
        password: $("#txtPassword").val()
    }
    send_request("php/requestAccess.php", "POST", parameters, AccessResponse);
}

function AccessResponse(responseText){
    let json = JSON.parse(responseText);
    user = json.user;
    send_request("php/createCookie.php", "POST",{cookie_name:'user-credentials', cookie_value:JSON.stringify(user)});
    logged = true;
    $("#modalAccedi .modal-footer button").eq(1).click();
    ModalitàAccesso();
    console.log(json.success);
}

function ControlliValiditaDati()
{
    if(!$("#alertRegister").lenght)
        $("#alertRegister").remove();
    let nome = $("#txtNome").val();
    let cognome = $("#txtCognome").val();
    let email = $("#txtEmail").val();
    let password = $("#txtPassword").val();
    let confermaPass = $("#txtConfermaPass").val();
    let data = $("#datepicker").val();
    let alert = $("<div id='alertRegister' role='alert'></div>").addClass("alert alert-danger mt-2")
                                                                .append("<span id='alertText'></span>")
                                                                .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                                                '<span aria-hidden="true">&times;</span>' +
                                                                '</button>');
    $(alert).appendTo(".modal-body .container");
    $(alert).hide();
    if(nome == "")
    {
        $("#alertText").text("Nome è un campo richiesto");
        alert.show();
        $("#txtNome").focus();
        return false;
    }
    if(cognome == "")
    {
        $("#alertText").text("Cognome è un campo richiesto");
        alert.show();
        $("#txtCognome").focus();
        return false;
    }
    if(email == "")
    {
        $("#alertText").text("Email è un campo richiesto");
        alert.show();
        $("#txtEmail").focus();
        return false;
    }
    if(password == "")
    {
        $("#alertText").text("Password è un campo richiesto");
        alert.show();
        $("#txtPassword").focus();
        return false;
    }
    if(confermaPass == "")
    {
        $("#alertText").text("Conferma password è un campo richiesto");
        alert.show();
        $("#txtConfermaPass").focus();
        return false;
    }
    if(password != confermaPass)  
    {
        $("#alertText").text("Password e conferma password non coincidono");
        alert.show();
        $("#txtConfermaPass").focus();
        return false;
    }
    if(data == "")
    {
        $("#alertText").text("Data di nascita è un campo richiesto");
        alert.show();
        $("#datepicker").focus();
        return false;
    }
    let parameters = {
        email : email,
        password : password
    }
    send_request("php/verificaDatiRegister.php","POST",parameters, RegisterResponse);
}

function RegisterResponse(responseText){    //callback controllo regex dati inseriti per iscrizione
    alert(responseText);
    let json = JSON.parse(responseText);
    let alertErrore = $("#alertRegister");
    switch(json.result)
    {
        case 0: //!regex email
        alertErrore.show().text("Formato email non valido");
            $("#txtEmail").focus();
            break;
        case 1: //!regex password
        alertErrore.show().text("Formato password non valido");
            $("#txtEmail").focus();
            break;
        case 2: //utente già iscritto
        alertErrore.show().text("Utente già registrato con l'email inserita");
            $("#txtEmail").focus();
            break;
        case 3: //dati inseriti validi
            let parameters = {
                email : $("#txtEmail").val(),
                password : $("#txtPassword").val(),
                nome : $("#txtNome").val(),
                cognome : $("#txtCognome").val(),
                data_nascita : $("#datepicker").val()
            };
            send_request("php/registraUtente.php","POST",parameters,loginResponse)
            break;
    }
}
function loginResponse(responseText){   //callback all'esecuzione della registrazione utente
    if(responseText == "1")
    {
        let parameters = {
            email: $("#txtEmail").val(),
            password: $("#txtPassword").val()
        }
        send_request("php/requestAccess.php", "POST", parameters, AccessResponse);
    }
    else
        console.log(responseText);
}

function ModalitàAccesso(){ //login eseguito
    $("#btnAccedi").text(user.cognome.trim().charAt(0) + user.nome.trim().charAt(0));
    $("#btnAccedi").addClass("user-logged").css({"color": "black"});
}