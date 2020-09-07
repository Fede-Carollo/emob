<?php
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
    if(mysqli_num_rows($result) == 0)
        $vect['success'] = false;
    else
    {
        $vect['success'] = true;
        while($record = mysqli_fetch_assoc($result))
        {
            $vect['user'] = $record;
        }
    }
    echo(json_encode($vect));
    mysqli_close($mysqli);
    
?>