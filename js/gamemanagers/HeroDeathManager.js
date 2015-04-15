game.HeroDeathManager = Object.extend({
    init: function (x, y, settings) {
        this.alwaysUpdate = true;
    },
    update: function () {
        if (game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(10, 0, 1);
        }else if(game.data.teammate1.dead){
            me.game.world.removeChild(game.data.teammate1);
            //me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(10, 0, 2);
        }else if(game.data.teammate2.dead){
            me.game.world.removeChild(game.data.teammate2);
            //me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(10, 0, 3);
        }else if(game.data.enemy1.dead){
            me.game.world.removeChild(game.data.enemy1);
            //me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(11000, 0, 4);
        }else if(game.data.enemy2.dead){
            me.game.world.removeChild(game.data.enemy2);
            //me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(11000, 0, 5);
        }else if(game.data.enemy3.dead){
            me.game.world.removeChild(game.data.enemy3);
            //me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(11000, 0, 6);
        }
       
        return true;
    }
});


