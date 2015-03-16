game.ExperienceManager = Object.extend({
    init: function (x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function () {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
        }

        return true;
    },
    gameOver: function (win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        this.gameover = true;
           document.getElementById("exp").value = game.data.exp;            //Awesomenauts 2 saving
           document.getElementById("exp1").value = game.data.exp1;
           document.getElementById("exp2").value = game.data.exp2;
           document.getElementById("exp3").value = game.data.exp3;
           document.getElementById("exp4").value = game.data.exp4;
           
           console.log(game.data.exp + " " + document.getElementById("exp").value);
           
           document.getElementById("save").style.visibility = "visible";
    }

});



