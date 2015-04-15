game.EnemyBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
            image: "brickbuilding",
            width: 600,
            height: 800,
            spritewidth: "600",
            spriteheight: "800",
            getShape: function(){
                return (new me.Rect(0, 0, 400, 790)).toPolygon();
            }
        }]);
        this.dead = false;
        this.health = game.data.enemyBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);        
        this.type = "EnemyBaseEntity";        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("breaking", [1, 2, 3, 4, 5, 6, 7, 8], 100);
        this.renderable.addAnimation("broken", [9]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update:function(delta){
        if(this.health<=0 && !this.renderable.isCurrentAnimation("breaking")&& !this.renderable.isCurrentAnimation("broken")){
            this.broken = true;
            game.data.win = true;
            this.renderable.setCurrentAnimation("breaking", "broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
        console.log(this.health);
    }
    
});