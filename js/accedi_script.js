$(document).ready(function(){
    $("#datepicker").on("click",function(){
        $("#datepicker").datepicker();
    });
    let buttons = $("#modalAccedi .modal-body button");
    buttons.on("click",function(){
        //$("#modalAccedi .modal-body .container").empty();
        if($(this).html() == "Accedi")
        {
            //GeneraAccedi();
        }
        else
        {
            GeneraRegister();
        }
    });
    $("#btnAccedi").on("click", function(){
        //$(buttons).eq(0).click();
    });
});