"use strict";

function send_request(url,method,parameters,callback){
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

let user = { name : "Fede", surname: "Carollo"};
let nowSelected = "";
let logged = true;

$(document).ready(function()
{
    ModalitàAccesso();
    let buttons = $("#modalAccedi .modal-body button");
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
    $("#btnAccedi").on("click", function(){
        if(logged)
        {
            $(buttons).hide();
            $("#modalAccedi .modal-header h5").text("Accesso come " + user.surname + " " + user.name);
            $("#modalAccedi .modal-body").text("Sei iscritto a questi eventi: ");
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
    $("#btnAccediModal").on("click", function(){
        if(nowSelected == "Accedi")
        {
            Accedi();
        }
        else
        {
            ControlliValiditaDati();
        }
    });
});

function GeneraAccedi()
{
    let string = '<div class="form">' + 
    '<div class="form">' + 
    '<input class="form-control" type="text" placeholder="Email" id="txtEmail">' + 
    '<input class="form-control mt-2" type="password" placeholder="Password" id= "txtPassword">' +
    '</div>';
    $("#modalAccedi .modal-body .container").html(string);
    $("#btnAccediModal").html("Accedi");
}

function GeneraRegister()
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
    user = JSON.parse(responseText);
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
    //da fixare
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

function RegisterResponse(responseText){
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
function loginResponse(responseText){
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
    $("#btnAccedi").text(user.surname.trim().charAt(0) + user.name.trim().charAt(0));
    $("#btnAccedi").addClass("user-logged").css({"color": "black"});
    $("#btnAccedi").unbind();
    $("#btnAccedi").click(function(){

    });
}