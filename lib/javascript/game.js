(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }


  var Game = Asteroids.Game = function(width, height) {
    this.width = width;
    this.height = height;
    this.asteroids = [];
    this.bullets = [];
    this.explosions = [];
    this.addAsteroids();
    this.battleship = new Asteroids.Battleship(this.shipPosition());
    this.spawn = true;
    this.navyShipSpawn = true;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
  };

  Game.prototype.shoot = function() {
    this.asteroids.forEach(function(enemy) {
      enemy.fireBullet.call(enemy);
    });
  };

  Game.prototype.spawnPlayer = function() {
    this.battleship = new Asteroids.Battleship(this.shipPosition());

  };

  Game.prototype.handleLifeLost = function() {
    this.lives -=1;
    var bgAudio = document.getElementById("playerExplosion");
    bgAudio.play();
    if(!this.checkState()) {
      var options = {
        'url': 'lib/sprites/sprites.png',
        'pos': this.battleship.pos,
        'spritePos': [0,117],
        'spriteSize': [39,50],
        'speed': 10,
        'frames': [12],
        'once': true
      };
      this.battleship = [];
      this.explosions.push(new Sprite(options));
      setTimeout(this.spawnPlayer.bind(this), 2500);

    }
  };


  Game.prototype.checkState = function() {
    if(this.lives <= 0) {
      this.gameOver = true;
      return true;
    }
    return false;
  };

  Game.prototype.enableSpawn = function() {
    this.spawn = true;
  };

  Game.prototype.addEnemies = function() {
    this.addAsteroids();
    this.addNavyShip();
  };

  Game.prototype.addAsteroids = function(time) {
    if(this.spawn) {
      this.spawn = false;
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition()));

      setTimeout(this.enableSpawn.bind(this), 250);
    }
  };

  Game.prototype.addNavyShip = function(time) {
    if(this.navyShipSpawn) {
      this.navyShipSpawn = false;
      this.asteroids.push(new Asteroids.NavyShip(this.randomPosition()));
      setTimeout(this.enableNavyShipSpawn.bind(this), 15000);
    }
  };

  Game.prototype.enableNavyShipSpawn = function() {
    this.navyShipSpawn = true;
  };

  Game.prototype.outofBounds = function(pos) {
     return (pos[0] < 0 || pos[0] > this.width || pos[1] < 0 || pos[1] > this.height);
   };

  Game.prototype.shipPosition = function() {
    var canvasPos = [this.width*0.5, this.height*0.8];
    var shipImg = new Sprite('lib/sprites/sprites.png', [0, 120], canvasPos, [39, 50], 10, [0,1,2,3,4,5,6,7,8,9,10,11,12],'horizontal', true);
    // var shipImg = new Sprite('lib/airplane.png',
    //                         [400,400], [200,200], 5, [0,1]);
    return {
      "pos": canvasPos,
      "game": this,
      "health": 3
    };

  };

  Game.prototype.randomPosition = function(){
    return {
      "pos": [Math.random()*this.width, 0],
      "game": this
    };
  };

  Game.prototype.remove = function(object) {
    if(object.constructor === Asteroids.Asteroid ||
        object.constructor === Asteroids.NavyShip) {
      this.asteroids.splice(this.asteroids.indexOf(object),1);
    }
    if(object.constructor === Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object),1);
    }
    if(object.constructor === Asteroids.Battleship) {
      this.battleship = [];
    }
  };

  Game.NUM_ASTEROIDS = 10;

  Game.prototype.backgroundInfo = function(ctx) {
    var livetext = "LIVES: " + this.lives;
    var scoretext = "SCORE: " + this.score;
    var pauseText = "Click to toggle pause";
    ctx.font="40px Verdana";
    ctx.fillStyle='yellow';
    ctx.fillText( livetext, 10,50);
    ctx.fillText( scoretext, 10,100);
    ctx.font="30px Verdana";
    ctx.fillText(pauseText, this.width*0.05, this.height*0.95);

  };

  Game.prototype.draw = function(ctx){
    ctx.drawImage(Asteroids.img, 202,245, 20,20, 0, 0, this.width,this.height);
    this.allObjects().forEach(function(asteroid){
      asteroid.draw(ctx);
    });
    this.backgroundInfo(ctx);
  };

  Game.prototype.moveObjects = function(time){
    this.allObjects().forEach(function(asteroid){
      asteroid.move(time);
      if(typeof asteroid.sprite !== "undefined") {
        asteroid.sprite.update(time);
      }
    });
  };

  Game.prototype.wrap = function(pos){
    if (pos[0] < 0 || pos[0] > this.width || pos[1] < 0 || pos[1] > this.height){
      return [this.width - pos[0], this.height - pos[1]];
    }else{
      return pos;
    }
  };

  Game.prototype.boundary = function(pos) {
    if( pos[0] < 0) {
      pos[0] = 0;
    } else if(pos[0] > this.width) {
      pos[0] = this.width;
    }
    if( pos[1] < 0) {
      pos[1] = 0;
    } else if(pos[1] > this.height) {
      pos[1] = this.height;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function() {
    for(var k = 0; k < this.explosions.length; k++) {
      if(this.explosions[k].done) {
        this.explosions.splice(k,1);
        k--;
      }
    }
    for(var i = 0; i < this.allObjects().length; i++) {
      for(var j = 0; j < this.allObjects().length; j++) {
        if (i!==j){
          if(typeof this.allObjects()[i] !== "undefined" ) {
            this.allObjects()[i].isCollidedWith(this.allObjects()[j]);
          }

        }
      }
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.explosions).concat(this.bullets).concat(this.battleship);
  };


})(this);
