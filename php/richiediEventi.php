<?php
if(isset($_SESSION["sessione"]))
{
    if(!isset($_COOKIE["user-credentials"]))
    {
        echo("Pagina non disponibile");
    }
}
else
    die("Non puoi accedere a questa pagina :(");
    
?>