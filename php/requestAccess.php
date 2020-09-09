<?php
if(!isset($_SESSION["sessione"]))
    die("Non puoi accedere al webservice");
$vect = [];
$host = "localhost";
$user = "root";
$dbName = "vallauri_eventi";
$dbpasswd = "";
$mysqli = mysqli_connect($host,$user,$dbpasswd,$dbName);
if(mysqli_connect_errno())
    die("Connect failed: ".mysqli_connect_error());
$email = $_POST["email"];
$passwd = $_POST["password"];
$sql = "SELECT * FROM users WHERE passwd = '".$passwd."' AND email = '".$email."'";
$result = mysqli_query($mysqli, $sql);
$json;
if(mysqli_num_rows($result) == 0)
    $vect['success'] = false;
else
{
    $vect['success'] = true;
    while($record = mysqli_fetch_assoc($result))
    {
        $vect['user'] = $record;
    }
    $json = json_encode($vect);
}
echo($json);
mysqli_close($mysqli);
    
?>