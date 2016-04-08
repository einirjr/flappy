
window.Game = (function() {
	'use strict';

	var pipePos = 100;

	var types = {
		pipe1: 0,
		pipe2: 1,
		pipe3: 2
	};

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.points = 0;
		this.dead = new Audio('/audio/gameover.mp3');
		this.player = new window.Player(this.el.find('.Player'), this);
		
		this.pipe1 = new window.Pipes(this.el.find('.Pipe1'), pipePos, types.pipe1);
		this.pipe2 = new window.Pipes(this.el.find('.Pipe2'), pipePos + 35, types.pipe2);
		this.pipe3 = new window.Pipes(this.el.find('.Pipe3'), pipePos + 70, types.pipe3);
		
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

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		var theme = document.getElementsByClassName("theme");
		theme[0].currentTime = 0;
		if(!this.muted) {
			theme[0].play();
		}
		this.points = 0;
		this.player.reset();
		this.pipe1.reset();
		this.pipe2.reset();
		this.pipe3.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		this.hasStarted = false;
		this.stopAnimation();
		var theme = document.getElementsByClassName("theme");
		theme[0].pause();
		if(!this.muted) {
			this.dead.play();
		}
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

	Game.prototype.stopAnimation = function() {
		$('.Player-wings').css('animation-play-state', 'paused');
		$('.Land').css('animation-play-state', 'paused');
		$('.Sky').css('animation-play-state', 'paused');
		$('.Cloud').css('animation-play-state', 'paused');
	};


    Game.prototype.toggleMute = function() {
        if (!this.muted) {
            this.muted = true;
            $('.muted').show();
            $('.sound').hide();
            var allSounds = document.getElementsByClassName('allSounds');
            for (var i = 0 ; i < allSounds.length ; i++) {
                allSounds[i].pause();
            }
        } else {
            this.muted = false;
            $('.muted').hide();
            $('.sound').show();
            var theme = document.getElementsByClassName('theme');
            theme[0].play();
        }
    };

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


