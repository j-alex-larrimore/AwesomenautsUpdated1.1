game.PlayerBaseEntity = me.Entity.extend({
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
        this.health = game.data.playerBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        this.type = "PlayerBase";
        
        this.renderable.addAnimation("idle", [10]);
        this.renderable.addAnimation("breaking", [11, 12, 13, 14, 15, 16, 17, 18], 100);
         this.renderable.addAnimation("broken", [19]);
        this.renderable.setCurrentAnimation("idle");
        
    },
    
    update:function(delta){
        if(this.health<=0 && !this.renderable.isCurrentAnimation("breaking")&& !this.renderable.isCurrentAnimation("broken")){
            this.dead = true;
            game.data.win = false;
            this.renderable.setCurrentAnimation("breaking", "broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    onCollision: function(){
        
    }
    
});