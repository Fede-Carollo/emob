<?php
    if(isset($_SESSION["sessione"]))
    {
        if(!isset($_COOKIE[$_POST["cookie_name"]]))
        setcookie($_POST["cookie_name"], $_POST["cookie_value"] , time() + (86400 * 30));
    }
    else
        echo("Ci hai provato ad accedere ahahhaha");
?>