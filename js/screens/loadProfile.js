game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
            me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load')), -10);
            
                me.input.unbindKey(me.input.KEY.B);
                me.input.unbindKey(me.input.KEY.Q);
                me.input.unbindKey(me.input.KEY.W);
                me.input.unbindKey(me.input.KEY.E);
                me.input.unbindKey(me.input.KEY.A  );
            
            
            document.getElementById("input").style.visibility = "visible";
            document.getElementById("load").style.visibility = "visible";
            
            me.game.world.addChild( new (me.Renderable.extend ({
                        init: function(){
                             this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                            this.font = new me.Font("Arial", 46, "white");
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                        },

                        draw: function(renderer){    
                            this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD", 0, 0);
                        }

                    })));
             

                
            
	},
                
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            document.getElementById("input").style.visibility = "hidden";
            document.getElementById("load").style.visibility = "hidden";
		//me.input.unbindPointer(me.input.mouse.LEFT); // TODO
	}
});
