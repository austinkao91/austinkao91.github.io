(function(root) {
  'use strict';
  if(typeof root.Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var MenuView = Asteroids.MenuView = function(ctx, width, height) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.gameView = new Asteroids.GameView(new Asteroids.Game(this.width,this.height), this.ctx, this.width, this.height,this);
    this.highScore = [];
    this.saveScores = 3;
  };


  MenuView.prototype.run = function() {
    if(this.gameView.requestId === null){
      this.gameView.start();
    } else {
      this.gameView.stop();
    }
  };

  MenuView.prototype.startScreen = function() {
    document.addEventListener("click", this.run.bind(this));
    var startScreenOptions = {
      "url": 'lib/sprites/1945transparent.jpg',
      "spriteSize": [175,90],
      "spritePos": [75,387],
      "scale":2,
      "frames": [1]
    };

    var startScreen = new Sprite(startScreenOptions);
    this.ctx.font="30px Verdana";
    this.ctx.fillStyle='yellow';
    this.ctx.fillText("Click anywhere to Start", this.width*0.25,this.height*0.75);
    this.ctx.font="20px Verdana";
    startScreen.draw(this.ctx, [300,275]);
  };

  MenuView.prototype.restart = function() {
    this.gameView = new Asteroids.GameView(new Asteroids.Game(this.width,this.height), this.ctx, this.width, this.height,this);
  };

  MenuView.prototype.stopScreen = function() {
    this.clearScreen();
    this.displayHighScore();
    this.restart();
  };

  MenuView.prototype.clearScreen = function() {
    this.ctx.clearRect(0,0,600,600);
    this.ctx.drawImage(Asteroids.img, 202,245, 20,20, 0, 0, 600,600);
    this.ctx.font="30px Verdana";
    this.ctx.fillStyle='yellow';
    this.ctx.fillText("Game Over!", this.width*0.2,this.height*0.7);
    this.ctx.fillText("Click anywhere to Try Again", this.width*0.2,this.height*0.78);

  };

  MenuView.prototype.addHighScore = function(score) {
    var topScores = [];
    var pushed = false;
    for(var i = 0; i < this.saveScores; i++ ) {
      if(!pushed && (typeof this.highScore[i] === "undefined" || score > this.highScore[i])) {
        topScores.push(score);
        pushed = true;
      }
      if(typeof this.highScore[i] !== "undefined" ) {
        topScores.push(this.highScore[i]);
      }
    }
    this.highScore = topScores.slice(0,this.saveScores);
  };

  MenuView.prototype.displayHighScore = function() {
    this.ctx.font="30px Verdana";
    this.ctx.fillStyle='yellow';
    this.ctx.fillText("High Scores", this.width*0.2, this.height*0.3);
    for(var i = 0; i < this.highScore.length; i++) {
      var scoreText = i+1 + ". " + this.highScore[i];
      var heightOffset = (i+1)*50;
      this.ctx.fillText(scoreText, this.width*0.2, this.height*0.3+heightOffset);
    }
  };

}(this));
