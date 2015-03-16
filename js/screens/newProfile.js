game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
            me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new')), -10);
            document.getElementById("input").style.visibility = "visible";  //NEED THIS
            //document.getElementById("passAgain").style.visibility = "visible";  //NEED THIS
            document.getElementById("register").style.visibility = "visible";  //NEED THIS
            
                me.input.unbindKey(me.input.KEY.B);
                me.input.unbindKey(me.input.KEY.Q);
                me.input.unbindKey(me.input.KEY.W);
                me.input.unbindKey(me.input.KEY.E);
                me.input.unbindKey(me.input.KEY.A  );
            

                
      
                
            me.game.world.addChild( new (me.Renderable.extend ({
                        init: function(){
                            this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                            this.font = new me.Font("Arial", 46, "black");
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                        },

                        draw: function(renderer){    
                            this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD", 0, 0);
                        }

                    })));
                    
           this.userName = "";
           this.PW = "";
           this.exp1 = 0;
           
	},
                
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            document.getElementById("input").style.visibility = "hidden";
            document.getElementById("passAgain").style.visibility = "hidden";
            document.getElementById("register").style.visibility = "hidden";
          //  me.input.unbindKey(me.input.KEY.ENTER); Old version
		//me.input.unbindPointer(me.input.mouse.LEFT); // Awesomenauts 1
	}
});