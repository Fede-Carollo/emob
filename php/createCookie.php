<?php
    setcookie($_POST["cookie_name"], $_POST["cookie_value"] , time() + (86400 * 30));
?>