<?php
    session_start();
    if(isset($_SESSION["sessione"]))
    {
        setcookie($_POST["cookie_name"], $_POST["cookie_value"] , time() + (86400 * 30));
    }
    else
        echo("Ci hai provato ad accedere ahahhaha");
?>