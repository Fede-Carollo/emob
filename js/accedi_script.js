"use strict";

let nowSelected = null;

$(document).ready(function(){
    let buttons = $("#modalAccedi .modal-body button");
    buttons.on("click",function(){
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
        }
    });
    $("#btnAccedi").on("click", function(){
        $(buttons).eq(0).click();
        setTimeout(function(){
            $(buttons).eq(0).focus();
        },501);
        
    });
});

function GeneraAccedi()
{
    let string = '<div class="form">' + 
    '<div class="form">' + 
    '<input class="form-control" type="text" placeholder="Email">' + 
    '<input class="form-control mt-2" type="text" placeholder="Password">' +
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