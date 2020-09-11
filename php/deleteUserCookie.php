<?php
    session_start();
    if(!isset($_SESSION["sessione"]))
        die("Pagina non disponibile");
    setcookie("user-credentials",null,time() - 3600);
?>