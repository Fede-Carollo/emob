<?php
$vect = [];
$email = $_POST['email'];
$password = $_POST["password"];
if(!filter_var($email, FILTER_VALIDATE_EMAIL))
{
    $vect['result'] = 0;
    die(json_encode($vect));
}
$regexPassword = "^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$^";
if(!preg_match($regexPassword, $password))
{
    $vect['result'] = 1;
    die(json_encode($vect));
}

$host = "localhost";
    $user = "root";
    $dbName = "vallauri_eventi";
    $dbpasswd = "";
    $mysqli = mysqli_connect($host,$user,$dbpasswd,$dbName);
    if(mysqli_connect_errno())
        die("Connect failed: ".mysqli_connect_error());
    $sql = "SELECT * FROM users WHERE email = '".$email."'";
    $result = mysqli_query($mysqli, $sql);
    if(mysqli_num_rows($result) == 0)
        $vect['result'] = 3;
    else
    {
        $vect['result'] = 2;
    }
    echo(json_encode($vect));
    mysqli_close($mysqli);
?>