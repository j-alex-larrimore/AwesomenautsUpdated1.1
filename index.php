<!DOCTYPE HTML>
<?php

//require_once 'php/controller/logout-user.php';
require_once('php/model/config.php');
//require_once 'php/controller/create-user.php';
//require_once 'php/controller/save-user.php';
//require_once 'php/controller/login-user.php';


//if (!isset($_SESSION["connection"])) {
//    echo "configagain";
//    
//}

?>


<html>
    <head>
        <title>melonJS Template</title>
        <link rel="stylesheet" type="text/css" media="screen" href="index.css">
        <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="apple-touch-icon" href="icons/touch-icon-iphone-60x60.png">
        <link rel="apple-touch-icon" sizes="76x76" href="icons/touch-icon-ipad-76x76.png">
        <link rel="apple-touch-icon" sizes="120x120" href="icons/touch-icon-iphone-retina-120x120.png">
        <link rel="apple-touch-icon" sizes="152x152" href="icons/touch-icon-ipad-retina-152x152.png">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
    </head>
    <body>
        <!-- Canvas placeholder -->
        <div id="screen"></div>
        <form id="input" method="post">
            <input type='submit' name='save' id='save' value='Save Your Progress'>
            <div class="field">
                <label for="username">Username</label>
                <input type='text' name='username' id='username' value='<?php
                if (isset($_SESSION["name"])) {
                    echo $_SESSION["name"];
                };
                ?>' autocomplete ='off'>
            </div>

            <div class='password'>
                <label for='password'>Password</label>
                <input type='password' name='password' id='password'>
            </div>

            <div class='field' id='passAgain'>
                <label for='password_again'>Enter your password again</label>
                <input type='password' name='password_again' id='password_again'>
            </div>


            <input type='submit' name='register' id='register' value='Register'>
            <input type='submit' name='mainmenu' id='mainmenu' value='Main Menu'>
            <input type='submit' name='load' id='load' value='Load'>
            <input type ='hidden' name='exp' id='exp' value ='<?php
            if (isset($_SESSION["exp"])) {
                echo $_SESSION["exp"];
            };
            ?>'>
            <input type ='hidden' name='exp1' id='exp1' value =<?php
            if (isset($_SESSION["exp1"])) {
                echo $_SESSION["exp1"];
            };
            ?>>
            <input type ='hidden' name='exp2' id='exp2' value =<?php
            if (isset($_SESSION["exp2"])) {
                echo $_SESSION["exp2"];
            };
            ?>>
            <input type ='hidden' name='exp3' id='exp3' value =<?php
            if (isset($_SESSION["exp3"])) {
                echo $_SESSION["exp3"];
            };
            ?>>
            <input type ='hidden' name='exp4' id='exp4' value =<?php
            if (isset($_SESSION["exp4"])) {
                echo $_SESSION[""];
            };
            ?>>

        </form>
        <div id="state" name='Hi'><?php  ?></div>
        <!-- melonJS Library -->
        <!-- build:js js/app.min.js -->
        <script type="text/javascript" src="lib/melonJS-1.1.0.js"></script>
        

        <!-- Plugin(s) -->
        <script type="text/javascript" src="lib/plugins/debugPanel.js"></script>

        <!-- Game Scripts -->
        <script type="text/javascript" src="js/game.js"></script>
        <script type="text/javascript" src="js/resources.js"></script>

        <script type="text/javascript" src="js/entities/entities.js"></script>
        <script type="text/javascript" src="js/entities/EnemyBaseEntity.js"></script>
        <script type="text/javascript" src="js/entities/PlayerBaseEntity.js"></script>
        <script type="text/javascript" src="js/gamemanagers/GameManager.js"></script>
        <script type="text/javascript" src="js/gamemanagers/GameTimerManager.js"></script>
        <script type="text/javascript" src="js/gamemanagers/SpendGold.js"></script>
        <script type="text/javascript" src="js/gamemanagers/HeroDeathManager.js"></script>
        <script type="text/javascript" src="js/entities/EnemyCreep.js"></script>
        <script type="text/javascript" src="js/entities/HUD.js"></script>
        <script type="text/javascript" src="js/entities/SpearThrow.js"></script>
        <script type="text/javascript" src="js/entities/MiniMap.js"></script>
        <script type="text/javascript" src="js/entities/MiniPlayerLocation.js"></script>
        <script type="text/javascript" src="js/screens/title.js"></script>
        <script type="text/javascript" src="js/screens/play.js"></script>
        <script type="text/javascript" src="js/screens/spendExp.js"></script>
        <script type="text/javascript" src="js/screens/loadProfile.js"></script>
        <script type="text/javascript" src="js/screens/newProfile.js"></script>
        <!-- /build -->
        <!-- Bootstrap & Mobile optimization tricks -->
        <script type="text/javascript">
            window.onReady(function onReady() {
                game.onload();

                // Mobile browser hacks
                if (me.device.isMobile && !navigator.isCocoonJS) {
                    // Prevent the webview from moving on a swipe
                    window.document.addEventListener("touchmove", function (e) {
                        e.preventDefault();
                        window.scroll(0, 0);
                        return false;
                    }, false);

                    // Scroll away mobile GUI
                    (function () {
                        window.scrollTo(0, 1);
                        me.video.onresize(null);
                    }).defer();

                    me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
                        window.scrollTo(0, 1);
                    });
                }
            });
        </script>

        <script>
//            $("#save").bind("click", function () {
//                    $.ajax({
//                    type: "POST",
//                    url: "php/controller/create-user.php",
//                    data: {username: $('#username').val(), password: $('#username').val()},
//                    dataType: "text"
//                })
//                        .success(function (response) {
//                            $("#register").bind("click", function () {
//                $.ajax({
//                    type: "POST",
//                    url: "php/controller/create-user.php",
//                    data: {username: $('#username').val(), password: $('#username').val()},
//                    dataType: "text"
//                })
//                        .success(function (response) {
//                            console.log(response);
//                            alert("Data Saved: " + response);
//                        });
//                        .failure(function (response) {
//                    console.log(response);
//                });
//            });  console.log(response);
//                            alert("Data Saved: " + response);
//                        });
//                        .failure(function (response) {
//                    console.log(response);
//                });
//            });

            $("#register").bind("click", function () {
                $.ajax({
                    type: "POST",
                    url: "php/controller/create-user.php",
                    data: {
                        username: $('#username').val(), 
                        password: $('#password').val()
                    },
                    dataType: "text"
                })
                .success(function (response) {
                    console.log(response);
                    alert("Data Saved: " + response);
                })      
                .fail(function (response) {
                    alert("Fail");
                })
                .done(function() {
                    alert("Finished");
                });
                
            });
//            $("#load").bind("click", function () {
//                   $.ajax({
//                    type: "POST",
//                    url: "php/controller/create-user.php",
//                    data: {username: $('#username').val(), password: $('#username').val()},
//                    dataType: "text"
//                })
//                        .success(function (response) {
//                            console.log(response);
//                            alert("Data Saved: " + response);
//                        });
//                        .failure(function (response) {
//                    console.log(response);
//                });
//            });
//            $("#mainmenu").bind("click", function () {
//                   $.ajax({
//                    type: "POST",
//                    url: "php/controller/create-user.php",
//                    data: {username: $('#username').val(), password: $('#username').val()},
//                    dataType: "text"
//                })
//                        .success(function (response) {
//                            console.log(response);
//                            alert("Data Saved: " + response);
//                        });
//                        .failure(function (response) {
//                    console.log(response);
//                });
//            });
        </script>

    </body>
</html>
