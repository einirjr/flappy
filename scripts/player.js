window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	//var SPEED = 5; // * 10 pixels per second
	//var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY = 0.2;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.rotation = 0;
		this.kvak = new Audio('/audio/crow.mp3');
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		$('.Player-wings').css('animation-play-state', 'running');
		$('.Land').css('animation-play-state', 'running');
		$('.Sky').css('animation-play-state', 'running');
		$('.Cloud').css('animation-play-state', 'running');
	};

	Player.prototype.onFrame = function(delta) {
		this.rotation = -2000 * delta;
		this.pos.y += GRAVITY;
		var jumped = Controls.didJump();
		if(jumped) {
			
			this.pos.y -= 8 ;
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.rotation + 'deg)');
			//this.kvak.play();
			return;
		}
		
		this.checkCollisionWithBounds();
		//this.checkCollisionWithPipes();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + delta + 'deg)');
	};


	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y < 0 ||
			this.pos.y > this.game.WORLD_HEIGHT - 16.5 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};
/*
	Player.prototype.checkCollisionWithPipes = function() {
		if(this.pos.y < )
	}
*/
	return Player;

})();
