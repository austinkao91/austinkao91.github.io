(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.url = 'lib/sprites/1945transparent.jpg';
    options.spriteSize = [20,20];
    options.spritePos = [4,47];
    options.frames = [1];
    options.moveSpeed = 20;
    options.health = 30;
    options.radius = 10;
    options.vel = Asteroids.Util.randomVec(5);
    Asteroids.HealthObject.call(this, options);
    this.points = 100;
  };



  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.HealthObject);



  Asteroid.prototype.isCollidedWith = function(otherObject){

    if (otherObject.constructor === Asteroids.Battleship) {

      this.hitBoxes.forEach(function(hitBox) {
        var otherBox = otherObject.hitBoxes;
        for(var i = 0; i < otherBox.length; i++ ) {
          if(this.distance(hitBox, otherBox[i])) {
            this.game.handleLifeLost.call(this.game);
          }
        }

      }.bind(this));
    }

  };
})(this);
