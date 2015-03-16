<?php

function saveUser(){
    $user = $_SESSION["name"];
    
    $query = $_SESSION["connection"]->query("UPDATE users SET "
            . "exp = ". $_SESSION["exp"]. ","
            . "exp1 = ". $_SESSION["exp1"]. ","
            . "exp2 = ". $_SESSION["exp2"]. ","
            . "exp3 = ". $_SESSION["exp3"]. ","
            . "exp4 = ". $_SESSION["exp4"]. " WHERE username = 'bob'");
    
    if($query){
        echo "Successfully created user: $username";
    }else{
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
}