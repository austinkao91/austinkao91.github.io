(function(root){
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var HealthObject = Asteroids.HealthObject = function(options){
    this.health = options["health"];
    Asteroids.MovingObject.call(this, options);
  };
  Asteroids.Util.inherits(Asteroids.HealthObject, Asteroids.MovingObject);

  HealthObject.prototype.damaged = function(damage) {
    this.health -= damage;
    if(this.health <= 0 ) {
      return true;
    }
    return false;
  };


  HealthObject.prototype.isCollidedWith = function(otherObject){
    //duck typing...
  };

})(this);
