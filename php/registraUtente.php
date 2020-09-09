<?php
if(isset($_SESSION))
    $host = "localhost";
    $user = "root";
    $dbName = "vallauri_eventi";
    $dbpasswd = "";
    $mysqli = mysqli_connect($host,$user,$dbpasswd,$dbName);
    if(mysqli_connect_errno())
        die("Connect failed: ".mysqli_connect_error());
        //query sbagliata
    $email = $_POST['email'];
    $nome = $_POST['nome'];
    $cognome = $_POST['cognome'];
    date_default_timezone_set('UTC');
    $timestamp = strtotime($_POST["data_nascita"]);
    $data = date('Y-m-d', $timestamp);
    $password = $_POST["password"];
    $sql = "INSERT INTO users(email, nome, cognome, data_nascita, passwd) VALUES ('".$email."', '".$nome."', '".$cognome."', '".$data."', '".$password."')";
    if($mysqli->query($sql) === TRUE)
        echo(true);
    else
        echo($mysqli->error);
    $mysqli->close();
?>