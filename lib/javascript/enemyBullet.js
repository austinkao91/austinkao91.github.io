(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var EnemyBullet = Asteroids.EnemyBullet = function(options) {
    options.damage = 5;
    options.radius = 5;
    options.url = 'lib/sprites/1945transparent.jpg';
    options.spriteSize =  [20,15];
    options.spritePos = [4,115];
    options.frames = [1];
    options.speed = 15;
    options.moveSpeed = 100;
    Asteroids.Enemy.call(this, options);
  };

  Asteroids.Util.inherits(Asteroids.EnemyBullet, Asteroids.Enemy);



})(this);
