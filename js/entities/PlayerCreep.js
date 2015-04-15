game.PlayerCreep = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "pCreep",
                width: 140,
                height: 170,
                spritewidth: "140",
                spriteheight: "170",
                getShape: function () {
                    return (new me.Rect(0, 0, 80, 120)).toPolygon();
                }
            }]);
        this.anchorPoint.set(0.5, 1.0);
        this.health = game.data.playerCreepHealth;
        this.alwaysUpdate = true;
        //this.attacking lets us know if the enemy is currently attacking
        this.attacking = false;
        //keeps track of when our creep last attacked anything
        this.lastAttacking = new Date().getTime();
        //keep track of the last time our creep hit anything
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.deathTimer = this.now;
        this.dead = false;
        this.body.setVelocity(3, 20);

        this.type = "PlayerCreep";

        this.mini = me.pool.pull("miniPCreep", 10, 10, 3, {});
        me.game.world.addChild(this.mini, 31);

        this.renderable.addAnimation("walk", [40, 41, 42, 43, 44, 45, 46, 47], 80);
        this.renderable.addAnimation("attack", [48, 49, 50, 51, 52, 53, 54, 55], 80);
        this.renderable.addAnimation("die", [56, 57, 58, 59], 100);
        this.renderable.addAnimation("dead", [59]);
        this.renderable.setCurrentAnimation("walk");

    },
    loseHealth: function (damage) {
        this.health = this.health - damage;
    },
    update: function (delta) {
        if (!game.data.gameover) {
            this.now = new Date().getTime();
            this.mini.updateMini(this.pos.x, this.pos.y);
            this.body.vel.x += this.body.accel.x * me.timer.tick;

            if (this.dead && this.now - this.deathTimer >= 3000) {
                me.game.world.removeChild(this);
            }
            this.attacking = false;
            me.collision.check(this, true, this.collideHandler.bind(this), true);
            if (!this.dead) {
                this.setAnimation();

            }
        }
        else{
            this.body.vel.x = 0;
        }
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    setAnimation: function () {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                this.renderable.setCurrentAnimation("attack");
            }
        } else if (!this.renderable.isCurrentAnimation("walk")) {
            this.renderable.setCurrentAnimation("walk");
        }
        if (this.health <= 0) {
            this.die();
        }
    },
    die: function () {
        this.renderable.setCurrentAnimation("die", "dead");
        this.dead = true;
        me.game.world.removeChild(this.mini);
        this.body.setVelocity(0, 0);
        this.deathTimer = this.now;
    },
    collideHandler: function (response) {
        if ((response.b.type === 'EnemyBaseEntity' || response.b.type === 'EnemyCreep' || response.b.type === 'Enemy') && !response.b.dead && !response.b.dying) {
            var xdif = this.pos.x - response.b.pos.x;
            this.attacking = true;
            if (xdif < 0) {
                //keeps moving the creep to the right to maintain its position
                this.body.vel.x = 0;
            }
            //checks that it has been at least 1 second since this creep hit something
            if ((this.now - this.lastHit >= 1000) && xdif < 0 && !this.dead) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //makes the player call its loseHealth function and passes it a 
                //damage of 1
                response.b.loseHealth(game.data.playerCreepAttack);
            }
        } 
    }

});

