<?php
session_start();
if(!isset($_SESSION["sessione"]))
{
    die($_SESSION["sessione"]);
}
if(!isset($_COOKIE["user-credentials"]))
{
    echo("Pagina non disponibile");
}
else
{
    $pars = [];
    $vect = [];
    $host = "localhost";
    $user = "root";
    $dbName = "vallauri_eventi";
    $dbpasswd = "";
    $mysqli = mysqli_connect($host,$user,$dbpasswd,$dbName);
    if(mysqli_connect_errno())
        die("Connect failed: ".mysqli_connect_error());
    $sql = "SELECT * FROM eventi";
    $result = mysqli_query($mysqli, $sql);
    if(mysqli_num_rows($result) == 0)
            $vect['success'] = false;
    else
    {
        $vect['success'] = true;
        $events =[];
        while($record = mysqli_fetch_assoc($result))
        {
            array_push($events,$record);
        }
        $vect["events"] = $events;
    }
    $eventiRegistrati = [];
    $sql = "SELECT id_evento FROM iscrizione_evento WHERE email_user = '".$_POST['email']."'";
    $result = mysqli_query($mysqli, $sql);
    while($record = mysqli_fetch_assoc($result))
    {
        array_push($eventiRegistrati,$record);
    }
    $vect["eventi_registrati"] = $eventiRegistrati;
    $json = json_encode($vect);
    echo($json);
    mysqli_close($mysqli);
}
    
?>