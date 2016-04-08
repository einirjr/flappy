window.Pipes = (function() {
    'use strict';

    var RESET = -10;
    var STARTPOS = 100;
    var SPEED = 0.5;
    var TOP_MAXHEIGHT = 20;
    var TOP_MINHEIGHT = 15;
    var BOTTOM_MAXHEIGHT = 35;
    var BOTTOM_MINHEIGHT = 30;

    var types = {
        pipe1: 0,
        pipe2: 1,
        pipe3: 2
    };

    var Pipes = function(el, pos, type) {
        this.el = el;
        this.pos = pos;
        this.initalPos = pos;
        this.type = type;
    };

    /**
     * Resets the state of the player for a new game.
     */
    Pipes.prototype.reset = function() {
        this.pos = this.initalPos;
    };

    Pipes.prototype.onFrame = function() {
        
        if(this.pos < RESET) {
            if(this.type === types.pipe1) {
                $('.Pipe1-high').css('height', Math.floor(Math.random() * (TOP_MAXHEIGHT - TOP_MINHEIGHT + 1)) + TOP_MINHEIGHT + 'em');
                $('.Pipe1-low').css('height', Math.floor(Math.random() * (BOTTOM_MAXHEIGHT - BOTTOM_MINHEIGHT + 1)) + BOTTOM_MINHEIGHT + 'em');
            }
            else if(this.type === types.pipe2) {
                $('.Pipe2-high').css('height', Math.floor(Math.random() * (TOP_MAXHEIGHT - TOP_MINHEIGHT + 1)) + TOP_MINHEIGHT + 'em');
                $('.Pipe2-low').css('height', Math.floor(Math.random() * (BOTTOM_MAXHEIGHT - BOTTOM_MINHEIGHT + 1)) + BOTTOM_MINHEIGHT + 'em');
            }
            else if(this.type === types.pipe2) {
                $('.Pipe3-high').css('height', Math.floor(Math.random() * (TOP_MAXHEIGHT - TOP_MINHEIGHT + 1)) + TOP_MINHEIGHT + 'em');
                $('.Pipe3-low').css('height', Math.floor(Math.random() * (BOTTOM_MAXHEIGHT - BOTTOM_MINHEIGHT + 1)) + BOTTOM_MINHEIGHT + 'em');
            }
            
            this.pos = STARTPOS;
        }
        else {
            this.pos -=  SPEED;
        }

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos + 'em', '0em)');

    };

    return Pipes;

})();