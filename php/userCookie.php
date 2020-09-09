<?php
    session_start();
    $_SESSION["sessione"] = true;
    $vect =[];
    if(isset($_COOKIE["user-credentials"]))
    {
        $vect["cookie_existing"] = true;
        $vect["data"] = (json_encode($_COOKIE["user-credentials"]));
    }
    else
    {
        $vect["cookie_existing"] = false;
    }
    echo(json_encode($vect));
?>