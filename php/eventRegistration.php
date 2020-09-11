<?php
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
$id;
$email;
$sql = "INSERT INTO iscrizione_evento(id_evento, email_user) VALUES (?,?)";
$stmt = $mysqli->prepare($sql);
if(!$stmt)
    die("Errore");
$bind = $stmt->bind_param('is',$id,$email);
$id = $_POST["id_evento"];
$email = $_POST["email"]; 
$execute = $stmt->execute();
if(!$execute)
    die("Errore nell'esecuzione della query");
$sql = "UPDATE eventi set num_attuale_partecipanti = (num_attuale_partecipanti + 1) where id = ?";
$stmt = $mysqli->prepare($sql);
$bind = $stmt->bind_param('i',$id);
$execute = $stmt->execute();
if($execute)
    echo(true);
else
    echo($mysqli->error);
$mysqli->close();
?>