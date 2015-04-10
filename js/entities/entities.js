game.PlayerEntity = me.Entity.extend({
    init: function (x, y, settings) {
        this.setSuper(x, y);
        this.anchorPoint.set(0.5, 1.0);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();

        this.center = new me.Vector2d(this.hWidth, this.hHeight);
        this.tracking = this.pos.clone();
        me.game.viewport.follow(this.tracking, me.game.viewport.AXIS_BOTH);
        me.game.viewport.setDeadzone(0, 0);

        this.addAnimation();

        this.renderable.setCurrentAnimation("idleRight");
    },
    setSuper: function (x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "caveman",
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
        this.attacking = false;
    },
    addAnimation: function () {
//        this.renderable.addAnimation("idle", [78]);
//        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
//        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.addAnimation("idleLeft", [24]);
        this.renderable.addAnimation("idleRight", [32]);
        this.renderable.addAnimation("walkRight", [32, 33, 34, 35, 36, 37, 38, 39], 80);
        this.renderable.addAnimation("walkLeft", [24, 25, 26, 27, 28, 29, 30, 31], 80);
        this.renderable.addAnimation("attack", [25], 80);

    },
    update: function (delta) {
        //console.log()
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this.tracking.copy(this.pos).add(this.center);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead: function () {
        if (this.health <= 0) {
            return true;
        }
        return false;
    },
    checkKeyPressesAndMove: function () {
        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        } else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
            this.jump();
        }

        this.attacking = me.input.isKeyPressed("attack");
    },
    moveRight: function () {
        //adds to the position of my x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        //this.flipX(true);
    },
    moveLeft: function () {
        this.facing = "left";
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        //this.flipX(false);
    },
    jump: function () {
        this.body.jumping = true;
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
    checkAbilityKeys: function () {
        if (me.input.isKeyPressed("skill1")) {
            //this.speedBurst();
        } else if (me.input.isKeyPressed("skill2")) {
            //this.eatCreep();
        }
        else if (me.input.isKeyPressed("skill3")) {
            console.log("skill3");
            this.throwSpear();
        }
    },
    throwSpear: function () {
        console.log((this.now - this.lastSpear) + " " + game.data.spearTimer * 1000);
        if ((this.now - this.lastSpear) >= game.data.spearTimer * 1000 && game.data.ability3 > 0) {
            this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }
    },
    setAnimation: function () {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //Sets the current animation to attack and once that is over
                //goes back to the idle animation
                this.renderable.setCurrentAnimation("attack", "idleRight");
                //Makes it so that the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (this.renderable.isCurrentAnimation("idleLeft") || this.renderable.isCurrentAnimation("idleRight")) {
                if (this.facing === "right") {
                    this.renderable.setCurrentAnimation("walkRight");
                } else {
                    this.renderable.setCurrentAnimation("walkLeft");
                }
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            if (this.facing === "right") {
                this.renderable.setCurrentAnimation("idleRight");
            } else {
                this.renderable.setCurrentAnimation("idleLeft");
            }

        }
    },
    loseHealth: function (damage) {
        this.health = this.health - damage;
    },
    collideHandler: function (response) {
        if (response.b.type === 'EnemyBaseEntity') {
            this.collideWithEnemyBase(response);
        } else if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemyCreep(response);
        }
    },
    collideWithEnemyBase: function (response) {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;

        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
        } else if (xdif < 70 && this.facing === 'left' && xdif > 0) {
            this.body.vel.x = 0;
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    collideWithEnemyCreep: function (response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        this.stopMovement(xdif);

        if (this.checkAttack(xdif, ydif)) {
            this.hitCreep(response);
        }


    },
    stopMovement: function (xdif) {
        if (xdif > 0) {
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    checkAttack: function (xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            //if the creeps health is less than our attack, execute code in if statement
            return true;
        }
        return false;
    },
    hitCreep: function (response) {
        if (response.b.health <= game.data.playerAttack) {
            //adds one gold for a creep kill
            game.data.gold = Number(game.data.gold) + 1;
            console.log("Current gold: " + game.data.gold);
        }

        response.b.loseHealth(game.data.playerAttack);
    }
});
