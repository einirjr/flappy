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
        this.calculateGap();
    };

    /**
     * Resets the state of the player for a new game.
     */
    Pipes.prototype.reset = function() {
        this.pos = this.initalPos;
    };

    Pipes.prototype.onFrame = function() {
        
        if(this.pos < RESET) {
            this.calculateGap();
            this.pos = STARTPOS;
        }
        else {
            this.pos -=  SPEED;
        }

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos + 'em', '0em)');

    };

    Pipes.prototype.calculateGap = function() {
        //   for random gap Ain't nobody got time for that!
        
        this.topHeight = Math.floor(Math.random() * (TOP_MAXHEIGHT - TOP_MINHEIGHT + 1)) + TOP_MINHEIGHT;
        this.bottomHeight = Math.floor(Math.random() * (BOTTOM_MAXHEIGHT - BOTTOM_MINHEIGHT + 1)) + BOTTOM_MINHEIGHT;

        if(this.type === types.pipe1) {
           // this.topHeight = 20;
            //this.bottomHeight = 33;
            $('.Pipe1-high').css('height', this.topHeight + 'em');
            $('.Pipe1-low').css('top', this.bottomHeight + 'em');
        }
        else if(this.type === types.pipe2) {
           // this.topHeight = 15;
           // this.bottomHeight = 35;
            $('.Pipe2-high').css('height', this.topHeight + 'em');
            $('.Pipe2-low').css('top', this.bottomHeight + 'em');
        }
        else if(this.type === types.pipe2) {
           // this.topHeight = 17;
           // this.bottomHeight = 30;
            $('.Pipe3-high').css('height', this.topHeight + 'em');
            $('.Pipe3-low').css('top', this.bottomHeight + 'em');
        }
    };

    return Pipes;

})();