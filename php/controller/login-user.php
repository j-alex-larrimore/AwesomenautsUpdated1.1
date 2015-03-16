<?php
    //require_once(__DIR__ . '/../model/config.php');
    
function loadUser(){

    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
    if($query->num_rows == 1){
        $row = $query->fetch_array();
        
        if($row["password"] === crypt($password, $row["salt"])){
            $_SESSION["authenticated"] = true;
            $_SESSION["name"] = $username;
            $_SESSION["exp"] = $row["exp"];
            $_SESSION["exp1"] = $row["exp1"];
            $_SESSION["exp2"] = $row["exp2"];
            $_SESSION["exp3"] = $row["exp3"];
            $_SESSION["exp4"] = $row["exp4"];
            echo "Login Successful";
            $_SESSION["state"] = 3;
        }else{
            echo "<p>Invalid username and password</p>";
            $_SESSION["state"] = 2;
        }
        
    }else{
        echo "<p>Invalid username and password</p>";
        $_SESSION["state"] = 2;
    }

}