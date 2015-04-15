game.ExperienceManager = Object.extend({
    init: function (x, y, settings) {
        this.alwaysUpdate = true;
        this.now = new Date().getTime();
    },
    update: function () {
        this.now = new Date().getTime();
        if (game.data.win === true && !game.data.gameover) {
            this.endTimer = this.now;
            this.gameOver(true);

        } else if (game.data.win === false && !game.data.gameover) {
            this.endTimer = this.now;
            this.gameOver(false);
        }
        if (game.data.gameover) {
            this.endCheck();
        }

        return true;
    },
    gameOver: function (win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        game.data.gameover = true;
        me.save.exp = game.data.exp;
        game.data.player.body.setVelocity(0, 0);

    },
    endCheck: function () {
        if (this.now - this.endTimer >= 3000) {
            if (game.data.win) {
                alert("YOU WIN!");
            }
            else {
                alert("YOU LOSE!");
            }

            $.ajax({
                type: "POST",
                url: "php/controller/save-user.php",
                data: {
                    exp: game.data.exp,
                    exp1: game.data.exp1,
                    exp2: game.data.exp2,
                    exp3: game.data.exp3,
                    exp4: game.data.exp4,
                },
                dataType: "text"
            })
                    .success(function (response) {
                        if (response === "true") {
                            me.state.change(me.state.MENU);
                        } else {
                            alert(response);
                        }
                    })
                    .fail(function (response) {
                        alert("Fail");
                    });
        }
    }

});



