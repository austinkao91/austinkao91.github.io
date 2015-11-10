(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Bomb = Asteroids.Bomb = function(options) {
    options.radius = Bomb.RADIUS;
    options.url = 'lib/sprites/explosion_0.png';
    options.spriteSize =  [252,130];
    options.spritePos = [0,0];
    options.frames = [ 3,3,3,2];
    options.speed = 7;
    options.vel = [0,0];
    options.scale = 2.1;
    options.scaleX = 1.2;
    this.damage = 100;
    options.once = true;
    Asteroids.MovingObject.call(this, options);
};



  Bomb.RADIUS = 100;

  Asteroids.Util.inherits(Asteroids.Bomb, Asteroids.MovingObject);
  //
  // Bullet.prototype.draw = function() {
  //   ctx.beginPath();
  //   ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
  //   ctx.fillStyle = this.color;
  //   ctx.fill();
  //   ctx.stroke();
  // };
  Bomb.prototype.isCollidedWith = function(otherObject){
    if (otherObject.constructor === Asteroids.Asteroid ||
          otherObject.constructor === Asteroids.NavyShip) {
      this.hitBoxes.forEach(function(hitBox) {
        var otherBox = otherObject.hitBoxes;
        for(var i = 0; i < otherBox.length; i++ ) {
          if(this.distance(hitBox, otherBox[i])) {
            this.game.remove(this);
            if(otherObject.damaged.call(otherObject, this.damage)) {
              this.handleExplosion(otherObject);
              return;
            }
          }
        }
      }.bind(this));
    }
  };



})(this);
