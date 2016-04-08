window.Pipes = (function() {
    'use strict';

    var RESET = -10;
    var STARTPOS = 100;

    var Pipes = function(el, thisX, thisY) {
        this.el = el;
        
        this.pos = {
            x: thisX,
            y: thisY
        };

        this.initalPos = {
            x: thisX,
            y: thisY
        };
    };

    /**
     * Resets the state of the player for a new game.
     */
    Pipes.prototype.reset = function() {
        this.pos.x = this.initalPos.x;
        this.pos.y = this.initalPos.y;
    };

    Pipes.prototype.onFrame = function() {
        
        if(this.pos.x < RESET) {
            this.pos.x = STARTPOS;
        }
        else {
            this.pos.x -=  0.3;
        }


        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

    };

    return Pipes;

})();