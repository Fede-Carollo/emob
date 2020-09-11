<?php
die("sono coglione");
session_start();
if(!isset($_SESSION["sessione"]))
    die("Non puoi accedere a questa pagina");
$host = "localhost";
$user = "root";
$dbName = "vallauri_eventi";
$dbpasswd = "";
$mysqli = mysqli_connect($host,$user,$dbpasswd,$dbName);
if(mysqli_connect_errno())
    die("Connect failed: ".mysqli_connect_error());
$sql = "INSERT INTO iscrizione_evento(id_evento, email_user) VALUES ('".$_POST['id_evento']."','".$_POST['email']."')";
if($mysqli->query($sql))
{
    $sql = "UPDATE eventi set num_attuale_partecipanti = (num_attuale_partecipanti + 1) where id = ".$_POST['id_evento']."";
    if($mysqli->query($sql))
        echo(true);
    else
        echo($mysqli->error);
}
else
    echo($mysqli->error);
$mysqli->close();
?>