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
$sql = "DELETE FROM iscrizione_evento WHERE id_evento = ? AND email_user = ?";
$stmt = $mysqli->prepare($sql);
if(!$stmt)
    die("Creazione stmt fallita");
$bind = $stmt->bind_param('ss', $id, $email);
if(!$bind)
    die("Creazione bind fallita");
$id = $_POST['id_evento'];
$email = $_POST['email'];
$execute = $stmt->execute();
if(!$execute)
    die("Fallimento a eseguire la query");
$sql = "UPDATE eventi set num_attuale_partecipanti = (num_attuale_partecipanti - 1) where id = '".$id."'";
if($mysqli->query($sql))
    echo(true);
else
    echo($mysqli->error);
$mysqli->close();
?>