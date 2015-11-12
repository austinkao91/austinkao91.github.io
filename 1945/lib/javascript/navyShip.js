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
    Asteroids.Enemy.call(this, options);
    this.fire = true;
  };


  Asteroids.Util.inherits(Asteroids.NavyShip, Asteroids.Enemy);
  NavyShip.prototype.enableFire = function() {
    this.fire = true;
  };

  NavyShip.prototype.fireBullet = function() {

    if(this.fire) {
      this.fire = false;
      var velocity = this.game.vectorToShip.call(this.game, this.pos);
      var normVel = Asteroids.Util.normalize(velocity,5);
      var scale = 1;
      var options = {
        "pos": this.pos.slice(),
        "vel": [normVel[0]*scale, normVel[1]*scale],
        "game": this.game,
      };
      this.game.bullets.push(new Asteroids.EnemyBullet(options));
      setTimeout(this.enableFire.bind(this),3000);
    }
  };

})(this);
