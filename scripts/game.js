
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		var xpipe = 100;

		this.player = new window.Player(this.el.find('.Player'), this);
		
		this.pipe1 = new window.Pipes(this.el.find('.Obstacle1'), this, xpipe, 0);
		this.pipe2 = new window.Pipes(this.el.find('.Obstacle2'), this, xpipe+35, 0);
		this.pipe3 = new window.Pipes(this.el.find('.Obstacle3'), this, xpipe+70, 0);
		
		this.isPlaying = false;
		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
		delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		
		this.pipe1.onFrame();
		this.pipe2.onFrame();
		this.pipe3.onFrame();
		
		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	Game.prototype.updatePipes = function() {
		    $('.Pipe').filter(function() { return $(this).position().left <= -100; }).remove();
		   
		    //add a new pipe (top height + bottom height  + pipeheight == 420) and put it in our tracker
		    var padding = 80;
		    var constraint = 420 - this.pipeheight - (padding * 2); //double padding (for top and bottom)
		    var topheight = Math.floor((Math.random()*constraint) + padding); //add lower padding
		    var bottomheight = (420 - this.pipeheight) - topheight;
		    var newpipe = $('<div class="pipe animated"><div class="pipe_upper" style="height: ' + topheight + 'px;"></div><div class="pipe_lower" style="height: ' + bottomheight + 'px;"></div></div>');
		    $('.GameCanvas').append(newpipe);
		};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		this.hasStarted = false;
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


