
/* Game namespace */
var game = {
    // an object where to store game information
    data: {
        // score
        score: 0,
        option1: "",
        option2: "",
        character: "",
        enemyBaseHealth: 5,
        playerBaseHealth: 5,
        enemyCreepHealth: 5,
        playerCreepHealth: 3,
        playerHealth: 10,
        enemyCreepAttack: 1,
        playerCreepAttack: 1,
        playerAttack: 1,
        
        orcStartDamage: 10,
        orcStartHealth: 100,
        orcStartSpeed: 5,
        orcStartDefense: 0,
        orcStartAttackTimer: 1000,
        orcStartRespawnTimer: 15000,
        
        archerStartDamage: 10,
        archerStartHealth: 100,
        archerStartSpeed: 5,
        archerStartDefense: 0,
        archerStartAttackTimer: 1000,
        archerStartRespawnTimer: 15000,
        
        wizardStartDamage: 10,
        wizardStartHealth: 100,
        wizardStartSpeed: 5,
        wizardStartDefense: 0,
        wizardStartAttackTimer: 1000,
        wizardStartRespawnTimer: 15000,
        
        ninjaStartDamage: 10,
        ninjaStartHealth: 100,
        ninjaStartSpeed: 5,
        ninjaStartDefense: 0,
        ninjaStartAttackTimer: 1000,
        ninjaStartRespawnTimer: 15000,
        
        skeletonStartDamage: 10,
        skeletonStartHealth: 100,
        skeletonStartSpeed: 5,
        skeletonStartDefense: 0,
        skeletonStartAttackTimer: 1000,
        skeletonStartRespawnTimer: 15000,
        
        plumberStartDamage: 10,
        plumberStartHealth: 100,
        plumberStartSpeed: 5,
        plumberStartDefense: 0,
        plumberStartAttackTimer: 1000,
        plumberStartRespawnTimer: 15000,
        
        cavemanStartDamage: 10,
        cavemanStartHealth: 100,
        cavemanStartSpeed: 5,
        cavemanStartDefense: 0,
        cavemanStartAttackTimer: 1000,
        cavemanStartRespawnTimer: 15000,
        
        fairyStartDamage: 10,
        fairyStartHealth: 100,
        fairyStartSpeed: 5,
        fairyStartDefense: 0,
        fairyStartAttackTimer: 1000,
        fairyStartRespawnTimer: 15000,


        playerAttackTimer: 1000,
        enemyCreepAttackTimer: 1000,
        playerCreepAttackTimer: 1000,
        playerRespawnTimer: 15000,
        playerMoveSpeed: 5,
        creepMoveSpeed: 5,
        gameTimerManager: "",
        heroDeathManager: "",
        spearTimer: 15,
        player: "",
        exp: 0,
        gold: 0,
        ability1: 0,
        ability2: 0,
        ability3: 0,
        skill1: 0,
        skill2: 0,
        skill3: 0,
        exp1: 0,
        exp2: 0,
        exp3: 0,
        exp4: 0,
        win: "",
        pausePos: "",
        buyscreen: "",
        buytext: "",
        minimap: "",
        miniPlayer: "",
        teammate1: "",
        teammate2: "",
        enemy1: "",
        enemy2: "",
        enemy3: "",
        gameover: false
   },
    // Run on page load.
    "onload": function () {
        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, 1400, 768, true, '1.0')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }

        me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});

        me.state.SPENDEXP = 112;
        me.state.LOAD = 113;
        me.state.NEW = 114;

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    // Run on game resources loaded.
    "loaded": function () {
        me.pool.register("player", game.PlayerEntity, true);
        me.pool.register("PlayerBase", game.PlayerBaseEntity);
        me.pool.register("EnemyBase", game.EnemyBaseEntity);
        me.pool.register("EnemyCreep", game.EnemyCreep, true);
        me.pool.register("PlayerCreep", game.PlayerCreep, true);
        me.pool.register("Teammate", game.Teammate, true);
        me.pool.register("Enemy", game.Enemy, true);
        me.pool.register("GameTimerManager", game.GameTimerManager);
        me.pool.register("HeroDeathManager", game.HeroDeathManager);
        me.pool.register("ExperienceManager", game.ExperienceManager);
        me.pool.register("SpendGold", game.SpendGold);
        me.pool.register("spear", game.SpearThrow, true);
        me.pool.register("minimap", game.MiniMap, true);
        me.pool.register("miniplayer", game.MiniPlayerLocation, true);
        me.pool.register("miniEnemy", game.MiniEnemyLocation, true);
        me.pool.register("miniTeam", game.MiniTeamLocation, true);
        me.pool.register("miniECreep", game.MiniECreepLocation, true);
        me.pool.register("miniPCreep", game.MiniPCreepLocation, true);

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.SPENDEXP, new game.SpendExp());
        me.state.set(me.state.LOAD, new game.LoadProfile());
        me.state.set(me.state.NEW, new game.NewProfile());

        me.state.change(me.state.MENU);
    }
};

