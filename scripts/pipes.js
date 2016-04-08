window.Pipes = (function() {
    'use strict';

    var FORSCORE = true;
    var INITIAL_POSITION_Y = 0;
    var INITIAL_POSITION_Z = 0;

    var Pipes = function(el, game, thisX) {
        
        this.el = el;
        this.game = game;
        this.pos = { x: thisX, y: 0, z:0 };
    };

    /**
     * Resets the state of the player for a new game.
     */
    Pipes.prototype.reset = function() {
        this.pos.y = INITIAL_POSITION_Y;
        this.pos.z = INITIAL_POSITION_Z;
    };

    Pipes.prototype.onFrame = function() {
        if(this.pos.x < (-5)) {
            this.pos.x = 100;
        }
        else {
            this.pos.x -=  0.3;
        }

        if(this.pos.x < 30 && FORSCORE) {
            this.game.score += 1;
            FORSCORE = false;
        }

        /*
        if(this.pos.x > 29.5 && this.pos.x < 30.5 && this.game.player.pos.y ) {
        }*/

        // Update UI
        this.el.css('transform', 'translateZ(0) translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, ' + this.pos.z + 'em)');

        //Idea for a code that would randomize the height of the pipes
        //37.6 is max height for a pipe
        /*var pipe1 = this.el.find('.Obstacle-pipe1');
        var pipe2 = this.el.find('.Obstacle-pipe2');
        var newHeightUp =(Math.random()*100) + 20;
        var newHeightLow = 200-newHeightUp;
        pipe1.height(newHeightUp);
        pipe2.top(newHeightLow);*/
    };

    return Pipes;

})();