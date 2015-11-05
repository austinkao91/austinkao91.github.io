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
    Asteroids.Enemy.call(this, options);
    this.points = 100;
    this.fire = true;
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.Enemy);
  Asteroid.prototype.enableFire = function() {
    this.fire = true;
  };

  Asteroid.prototype.fireBullet = function() {

    if(this.fire) {
      this.fire = false;
      var velocity = this.vel.slice();
      var scale = 1.2;
      var options = {
        "pos": this.pos.slice(),
        "vel": [velocity[0]*scale, velocity[1]*scale],
        "game": this.game,
      };
      this.game.bullets.push(new Asteroids.EnemyBullet(options));
      setTimeout(this.enableFire.bind(this),5000);
    }
  };





})(this);
