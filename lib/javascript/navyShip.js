(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var NavyShip = Asteroids.NavyShip = function(options) {
    options.url = 'lib/sprites/1945transparent.jpg';
    options.spriteSize = [20,120];
    options.spritePos = [315,210];
    options.frames = [0];
    options.moveSpeed = 14;
    options.health = 400;
    options.radius = [15];
    options.scale = 1.5;
    options.vel = [0,2];
    this.points = 2500;
    Asteroids.HealthObject.call(this, options);
  };


  Asteroids.Util.inherits(Asteroids.NavyShip, Asteroids.HealthObject);


  NavyShip.prototype.isCollidedWith = function(otherObject){

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
