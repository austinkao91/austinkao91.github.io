(function(root){
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options){
    Asteroids.Sprite.call(this, options);
    this.vel = options["vel"];
    this.color = options["color"];
    this.game = options["game"];
    this.hitBoxes = this.getCenters(options["radius"]);
    this.moveSpeed = options["moveSpeed"] || 1;
  };
  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroids.Sprite);

  MovingObject.prototype.move = function(time){
    this._index += time*this.speed;
    this.pos[0] += this.vel[0]*time*this.moveSpeed;
    this.pos[1] += this.vel[1]*time*this.moveSpeed;
    if (this.game.outofBounds(this.pos)){
      this.game.remove(this);
    }
    this.hitBoxes = this.updateCenters(time);
  };

  MovingObject.prototype.updateCenters = function(time) {
    var newHitBoxes = this.hitBoxes.map(function(hitBox){
      hitBox[0] += time*this.vel[0]*this.moveSpeed;
      hitBox[1] += time*this.vel[1]*this.moveSpeed;
      return hitBox;
    }.bind(this));
    return newHitBoxes;
  };

  MovingObject.prototype.handleExplosion = function(otherObject) {
    var options;
    var bgAudio;
    if(otherObject.constructor === Asteroids.Asteroid) {
      options = {
        'url': 'lib/sprites/sprites.png',
        'pos': otherObject.pos,
        'spritePos': [0,117],
        'spriteSize': [39,50],
        'speed': 10,
        'frames': [12],
        'once': true
      };
      bgAudio = document.getElementById("smallShipExplosion");
    } else if (otherObject.constructor === Asteroids.NavyShip) {
      options = {
        // 'url': 'lib/sprites/images.jpg',
        'url':'lib/sprites/water.jpg',
        'pos': otherObject.pos,
        // 'spritePos': [0,0],
        // 'spriteSize': [96,99],
        'spritePos': [4,0],
        'spriteSize': [73,110],
        'speed': 15,
        // 'frames': [5,5,5],
        'frames': [9],
        'once': true
      };
      bgAudio = document.getElementById("navyShipExplosion");
    }
    bgAudio.play();
    if(typeof otherObject.points === 'number' ) {
       this.game.score += otherObject.points;
    }
    this.game.explosions.push(new Sprite(options));
    this.game.remove(otherObject);
  };

  MovingObject.prototype.getCenters = function(radius) {
    if(typeof radius === "number") { radius = [radius]; }
    var offset = 0;
    var center = [];
    var left;
    var right;
    var rightSum = 0;
    var leftSum = 0;
    var median = Math.floor(radius.length/2);

    if(radius.length%2 === 1) {
      center.push([this.pos[0], this.pos[1], radius[median]]);
      leftSum += radius[median]/2;
      left = median - 1;
    } else {
      center.push([this.pos[0] - radius[median-1]/2, this.pos[1], radius[median-1]]);
      center.push([this.pos[0] + radius[median]/2 , this.pos[1], radius[median]]);
      leftSum += radius[median-1];
      left = median-2;
    }
    right = median+1;
    rightSum += radius[median];

    for(var i = right; i < radius.length; i++) {
      var rightX = this.pos[0] + rightSum + radius[i]/2;
      center.push([rightX , this.pos[1], radius[i]]);
      rightSum += radius[i];
    }
    for( var j = left; j > -1; j--) {
      var leftX = this.pos[0] - leftSum - radius[j]/2;
      center.push([leftX, this.pos[1], radius[j]]);
      leftSum += radius[j];
    }
    return center;
  };

  MovingObject.prototype.distance = function(hitBox1, hitBox2) {
    var distance = Math.sqrt(
      Math.pow(hitBox1[0] - hitBox2[0],2) +
      Math.pow(hitBox1[1] - hitBox2[1],2)
    );
    return distance < (hitBox1[2] + hitBox2[2]);
  };

  MovingObject.prototype.distanceSquared = function(otherObject) {
    return Math.pow(this.pos[0] - otherObject.pos[0],2) +
            Math.pow(this.pos[1] - otherObject.pos[1],2);
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    //duck typing...
  };

})(this);
