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

let user = null;
let nowSelected = "";

$(document).ready(function()
{
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
        $(buttons).eq(0).click();
        setTimeout(function(){
            $(buttons).eq(0).focus();
        },501);
        nowSelected = "Accedi";
        
    });
    $("#btnAccediModal").on("click", function(){
        if(nowSelected == "Accedi")
        {
            Accedi();
        }
        else
        {
            Register();
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
    let string = '<div class="form">' + 
                '<div class="form">' + 
                '<input class="form-control" type="text" placeholder="Nome">' + 
                '<input class="form-control mt-2" type="text" placeholder="Cognome">' +
                '<input class="form-control mt-2" type="text" placeholder="Email">' +
                '<input class="form-control mt-2" type="text" placeholder="Password">' +
                '<input class="form-control mt-2" type="text" placeholder="Conferma Password">' +
                '<input class="form-control mt-2" type="text" placeholder="Data di nascita" id="datepicker" autocomplete="off">' +
                '</div>';
    $("#modalAccedi .modal-body .container").html(string);
    $("#btnAccediModal").html("Registrati");
    $("#datepicker").on("click",function(){
        $("#datepicker").datepicker();
    });
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
    alert(responseText);
    user = JSON.parse(responseText);
    console.log(json.success);
    //json encode non funzia
}

function Register()
{

}