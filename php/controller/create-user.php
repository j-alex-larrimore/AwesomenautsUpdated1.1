<?php


    //$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

    $salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
    //$hashedPassword = crypt($password, $salt);

      
      echo $username;
      echo $password;
    
    $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");

    if ($query->num_rows == 0) {

        $query = $_SESSION["connection"]->query("INSERT INTO users SET "
                . "email = 'fu', "
                . "username = '$username', "
                . "password = '$password', "
                . "salt = '$salt',"
                . "exp = 0,"
                . "exp1 = 0,"
                . "exp2 = 0,"
                . "exp3 = 0,"
                . "exp4 = 0");

        $_SESSION["name"] = $username;
        $_SESSION["exp"] = 0;
        $_SESSION["exp1"] = 0;
        $_SESSION["exp2"] = 0;
        $_SESSION["exp3"] = 0;
        $_SESSION["exp4"] = 0;

        if ($query) {
            echo "Successfully created user: $username";
        } else {
            echo "<p>" . $_SESSION["connection"]->error . "</p>";
        }
    }else{
        echo "username already exists";
        }
