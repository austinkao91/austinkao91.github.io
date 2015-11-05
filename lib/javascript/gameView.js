(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }
  var requestAnimFrame = (function(){
      return root.requestAnimationFrame       ||
          root.webkitRequestAnimationFrame ||
          root.mozRequestAnimationFrame    ||
          root.oRequestAnimationFrame      ||
          root.msRequestAnimationFrame     ||
          function(callback){
              root.setTimeout(callback, 1000 / 60);
          };
  })();

  var GameView = Asteroids.GameView = function(game, ctx, width, height, menuView){
    this.game = game;
    this.ctx = ctx;
    this.lastTime = null;
    this.requestId = null;
    this.width = width;
    this.height = height;
    this.menuView = menuView;
  };



  GameView.prototype.start = function(){
    // this.bindKeyHandlers();
    if(!this.requestId) {
      this.lastTime = Date.now();
      this.main();
    }
  };

  GameView.prototype.stop = function() {
    if(this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  };

  GameView.prototype.main = function() {
      var now = Date.now();
      var dt = (now - this.lastTime) / 1000.0;
      this.update(dt);
      this.render();
      this.lastTime = now;
      this.requestId = requestAnimFrame(this.main.bind(this));
      if(this.game.gameOver) { this.handleGameOver(); }
  };

  GameView.prototype.handleGameOver = function() {
    this.stop();
    this.menuView.addHighScore(this.game.score);
    this.menuView.stopScreen();
  };

  GameView.prototype.update = function(time) {
    this.handleInput(time);
    this.game.addEnemies();
    this.game.shoot();
    this.game.checkCollisions();
    this.game.moveObjects(time);
  };

  GameView.prototype.render = function() {
    this.game.draw(this.ctx);
  };

  GameView.prototype.handleInput = function(time) {
    if(typeof this.game.battleship.power !== "undefined") {
      if(Asteroids.input.getKeyState('W')) {
        this.game.battleship.power([0,-6]);
      }
      if(Asteroids.input.getKeyState('A')) {
        this.game.battleship.power([-6,0]);
      }
      if(Asteroids.input.getKeyState('S')) {
        this.game.battleship.power([0,6]);
      }
      if(Asteroids.input.getKeyState('D')) {

        this.game.battleship.power([6,0]);
      }
      if(Asteroids.input.getKeyState('B')) {
        this.game.battleship.fireBomb();
      }
      if(Asteroids.input.getKeyState(" ")) {
        this.game.battleship.fireBullet();
      }
    }

  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    key('w', function(){ that.game.battleship.power([0, -3]); });
    key('a', function(){ that.game.battleship.power([-3, 0]); });
    key('s', function(){ that.game.battleship.power([0, 3]); });
    key('d', function(){ that.game.battleship.power([3, 0]); });
    key('space', function(){ that.game.battleship.fireBullet(); });
  };


})(this);
