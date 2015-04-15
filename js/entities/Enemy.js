game.Enemy = me.Entity.extend({
    init: function (x, y, settings) {
        this.setSuper(x, y, "caveman");
        this.anchorPoint.set(0.5, 1.0);
        this.alwaysUpdate = true;
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "Enemy";
        var char = Math.floor(Math.random() * 8) + 1;
        this.setFlags();

        this.center = new me.Vector2d(this.hWidth, this.hHeight);
        this.tracking = this.pos.clone();
        //me.game.viewport.follow(this.tracking, me.game.viewport.AXIS_BOTH);
        me.game.viewport.setDeadzone(0, 0);

        this.mini = me.pool.pull("miniECreep", 10, 10, 5, {});
        me.game.world.addChild(this.mini, 31);

        this.addAnimation();

        this.renderable.setCurrentAnimation("idleRight");
    },
    setSuper: function (x, y, image) {
        this._super(me.Entity, 'init', [x, y, {
                image: image,
                width: 240,
                height: 272,
                spritewidth: "240",
                spriteheight: "272",
                getShape: function () {
                    return (new me.Rect(0, 0, 160, 218)).toPolygon();
                }
            }]);
    },
    setPlayerTimers: function () {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.deathTimer = this.now;
        this.lastAttack = new Date().getTime();  //Haven't used this
    },
    setAttributes: function () {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags: function () {
        //Keeps track of which direction your character is going
        this.facing = "right";
        this.dead = false;
        this.dying = false;
        this.attacking = false;
    },
    addAnimation: function () {
        this.renderable.addAnimation("jumpLeft", [6], 120);
        this.renderable.addAnimation("jumpRight", [7], 120);
        this.renderable.addAnimation("dying", [2, 3, 4, 5], 100);
        this.renderable.addAnimation("dead", [5]);
        this.renderable.addAnimation("idleLeft", [0]);
        this.renderable.addAnimation("idleRight", [1]);
        this.renderable.addAnimation("walkRight", [32, 33, 34, 35, 36, 37, 38, 39], 80);
        this.renderable.addAnimation("walkLeft", [24, 25, 26, 27, 28, 29, 30, 31], 80);
        this.renderable.addAnimation("attackLeft", [8, 9, 10, 11, 12, 13, 14, 15], 80);
        this.renderable.addAnimation("attackRight", [16, 17, 18, 19, 20, 21, 22, 23], 80);

    },
    loseHealth: function (damage) {
        this.health = this.health - damage;
    },
    update: function (delta) {
        this.mini.updateMini(this.pos.x, this.pos.y);
        if (!game.data.gameover) {
            this.now = new Date().getTime();
            //this.mini.updateMini(this.pos.x, this.pos.y);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

            if (this.dying && this.now - this.deathTimer >= game.data.playerRespawnTimer) {
                //me.game.world.removeChild(this);
                this.dead = true;
            }
            this.attacking = false;
            me.collision.check(this, true, this.collideHandler.bind(this), true);
            if (!this.dead) {
                this.setAnimation();

            }
        }
        else {
            this.body.vel.x = 0;
        }
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    setAnimation: function () {
        if (!this.dying) {
            if (this.attacking) {
                if (!this.renderable.isCurrentAnimation("attackLeft")) {
                    this.renderable.setCurrentAnimation("attackLeft");
                }
            } else if (!this.renderable.isCurrentAnimation("walkLeft")) {
                this.renderable.setCurrentAnimation("walkLeft");
            }
            if (this.health <= 0) {
                this.die();
            }
        }
    },
    die: function () {
        //this.renderable.setCurrentAnimation("die", "dead");
        if (!this.dying) {
            this.dying = true;
            this.renderable.setCurrentAnimation("dying", "dead");
            me.game.world.removeChild(this.mini);
            this.body.setVelocity(0, 0);
            this.deathTimer = this.now;
        }
    },
    collideHandler: function (response) {
        if ((response.b.type === 'PlayerBase' || response.b.type === 'PlayerCreep' || response.b.type === 'Teammate' || response.b.type === 'PlayerEntity') && !response.b.dying && !response.b.dead) {
             var xdif = this.pos.x - response.b.pos.x;
            this.attacking = true;
            if (xdif > 0) {
                this.body.vel.x = 0;
            }
            if ((this.now - this.lastHit >= 1000) && xdif > 0 && !this.dead) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        } 
    }

});
