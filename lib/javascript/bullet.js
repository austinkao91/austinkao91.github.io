(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options) {
    options.color = Bullet.COLOR;
    options.radius = Bullet.RADIUS;
    options.url = 'lib/sprites/1945transparent.jpg';
    options.spriteSize =  [20,15];
    options.spritePos = [4,115];
    options.frames = [1];
    options.speed = 15;
    options.moveSpeed = 100;
    this.damage = 15;
    this.owner = options["owner"];
    Asteroids.MovingObject.call(this, options);
  };

  Bullet.COLOR = "yellow";
  Bullet.RADIUS = 10;

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);
  //
  // Bullet.prototype.draw = function() {
  //   ctx.beginPath();
  //   ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
  //   ctx.fillStyle = this.color;
  //   ctx.fill();
  //   ctx.stroke();
  // };


  Bullet.prototype.isCollidedWith = function(otherObject){
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
