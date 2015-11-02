(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }


  var Battleship = Asteroids.Battleship = function(options) {
    options.color = Battleship.COLOR;
    options.radius = Battleship.RADIUS;
    options.vel = [0,0];
    options.url = 'lib/sprites/1945transparent.jpg';
    options.spriteSize =  [39,39];
    options.spritePos = [136,270];
    options.frames = [1];
    options.speed = 15;
    Asteroids.MovingObject.call(this, options);
    this.direction = Asteroids.Util.normalize([3,4]);
    this.fire = true;
    this.bomb = true;
  };

  Battleship.COLOR = "green";
  Battleship.RADIUS = 20;

  Asteroids.Util.inherits(Asteroids.Battleship, Asteroids.MovingObject);


  Battleship.prototype.relocate = function(){
    this.pos = this.game.shipPosition().pos;
    this.vel = [0,0];
  };


  Battleship.prototype.move = function(time){
    this.pos = this.game.boundary(this.pos);
    this.hitBoxes = this.getCenters(Battleship.RADIUS);
  };

  Battleship.prototype.power = function(impulse) {
    this.pos[0] += impulse[0];
    this.pos[1] += impulse[1];
  };



  Battleship.prototype.enableFire = function() {
    this.fire = true;
  };
  Battleship.prototype.enableBomb = function() {
    this.bomb = true;
  };


  Battleship.prototype.fireBullet = function(){
    if(this.fire) {
      this.fire = false;
      var position1 = this.pos.slice();
      var position2 = this.pos.slice();
      position1[0] = position1[0]-10;
      position2[0] = position2[0]+10;
      var velocity = [0,-10];

      var options1 = {
        "pos": position1,
        "vel": velocity,
        "game": this.game,
      };

      var options2 = {
        "pos": position2,
        "vel": velocity,
        "game": this.game,
      };

      var bgAudio = document.getElementById("Laser_Shoot15");
      bgAudio.play();

      this.game.bullets.push(new Asteroids.Bullet(options1), new Asteroids.Bullet(options2));
      setTimeout(this.enableFire.bind(this), 200);

    }
  };
  Battleship.prototype.fireBomb = function(){
    if(this.bomb) {
      this.bomb = false;
      var position = this.pos.slice();
      var options = {
        "pos": position,
        "game": this.game,
      };

      var bgAudio = document.getElementById("bombSound");
      bgAudio.playbackRate = 4.0;
      bgAudio.play();
      this.game.explosions.push(new Asteroids.Bomb(options));
      setTimeout(this.enableBomb.bind(this), 5000);

    }
  };

})(this);
