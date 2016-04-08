window.Pipes = (function() {
    'use strict';

    var INITIAL_POSITION_Y = 0;
    var INITIAL_POSITION_Z = 0;

    var Pipes = function(el, game, x) {
        
        this.el = el;
        this.game = game;
        this.pos = { x: x, y: 0};
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

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em');

    };

    return Pipes;

})();