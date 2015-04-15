game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        game.data.character = "caveman";
        // reset the score
        game.data.score = 0;
        me.levelDirector.loadLevel("level01");

        var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
        me.game.world.addChild(gameTimerManager, 0);

        var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
        me.game.world.addChild(heroDeathManager, 0);

        var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
        me.game.world.addChild(experienceManager, 0);

        var spendGold = me.pool.pull("SpendGold", 0, 0, {});
        me.game.world.addChild(spendGold, 0);

        game.data.minimap = me.pool.pull("minimap", 10, 10, {});
        me.game.world.addChild(game.data.minimap, 30);


        this.resetPlayer(10, 0, 1);
        this.resetPlayer(10, 0, 2);
        this.resetPlayer(10, 0, 3);
        this.resetPlayer(11000, 0, 4);
        this.resetPlayer(11000, 0, 5);
        this.resetPlayer(11000, 0, 6);
        me.input.bindKey(me.input.KEY.B, "buy");
        me.input.bindKey(me.input.KEY.Q, "skill1");
        me.input.bindKey(me.input.KEY.W, "skill2");
        me.input.bindKey(me.input.KEY.E, "skill3");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.SPACE, "jump");
        me.input.bindKey(me.input.KEY.A, "attack");

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
        game.data.gold += (Number(game.data.exp2) * 10);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
    resetPlayer: function (x, y, n) {
        if (n === 1) {
            game.data.player = me.pool.pull("player", x, y, {});
            me.game.world.addChild(game.data.player, 15);
            game.data.miniPlayer = me.pool.pull("miniplayer", 10, 10, 5, {});
            me.game.world.addChild(game.data.miniPlayer, 31);
        } else if (n === 2) {
            game.data.teammate1 = me.pool.pull("Teammate", x, y, {});
            me.game.world.addChild(game.data.teammate1, 15);
        } else if (n === 3) {
            game.data.teammate2 = me.pool.pull("Teammate", x, y, {});
            me.game.world.addChild(game.data.teammate2, 15);
        } else if (n === 4) {
            game.data.enemy1 = me.pool.pull("Enemy", x, y, {});
            me.game.world.addChild(game.data.enemy1, 15);
        } else if (n === 5) {
            game.data.enemy2 = me.pool.pull("Enemy", x, y, {});
            me.game.world.addChild(game.data.enemy2, 15);
        } else if (n === 6) {
            game.data.enemy3 = me.pool.pull("Enemy", x, y, {});
            me.game.world.addChild(game.data.enemy3, 15);
        }
        
    }
});
