(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Enemy = Asteroids.Enemy = function(options) {
    Asteroids.HealthObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroids.Enemy, Asteroids.HealthObject);


  Enemy.prototype.fireBullet = function() {

  };

  Enemy.prototype.isCollidedWith = function(otherObject){

    if (otherObject.constructor === Asteroids.Battleship) {

      this.hitBoxes.forEach(function(hitBox) {
        var otherBox = otherObject.hitBoxes;
        for(var i = 0; i < otherBox.length; i++ ) {
          if(otherObject.vulnerable && this.distance(hitBox, otherBox[i])) {
            this.game.handleLifeLost.call(this.game);
          }
        }

      }.bind(this));
    }

  };
})(this);
