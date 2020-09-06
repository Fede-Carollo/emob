$(document).ready(function(){
    let buttons = $("#modalAccedi.modal-body button");
    buttons.on("click",function(){
        buttons.each(function(index){
            console.log($(this).html());
        });
    });
});