window.Pipes = (function() {
    'use strict';

    var FORSCORE = true;
    var INITIAL_POSITION_Y = 0;

    var Pipes = function(el, game, thisX) {
        
        this.el = el;
        this.game = game;
        this.pos = { 
            x: thisX, 
            y: 0
        };
    };

    /**
     * Resets the state of the player for a new game.
     */
    Pipes.prototype.reset = function() {
        //this.pos.y = INITIAL_POSITION_Y;
    };

    Pipes.prototype.onFrame = function() {
        if(this.pos.x < (-10)) {
            this.pos.x = 102.4;
        }
        else {
            this.pos.x -=  0.3;
        }

        if(this.pos.x < 30 && FORSCORE) {
            this.game.score += 1;
            FORSCORE = false;
        }

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

    };

    return Pipes;

})();