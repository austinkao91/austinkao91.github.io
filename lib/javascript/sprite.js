(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  root.Asteroids.Sprite = Sprite = function(options) {
    this.spritePos = options["spritePos"];
    this.spriteSize = options["spriteSize"];
    this.speed = typeof options["speed"] === 'number' ? options["speed"] : 0;
    this.frames = options["frames"];
    this._index = 0;
    this.url = options["url"];
    this.dir = options["dir"] || 'horizontal';
    this.once = options["once"];
    this.pos = options["pos"];
    this.scale = typeof options["scale"] === 'number' ? options["scale"] : 1;
    this.scaleX = typeof options["scaleX"] === 'number' ? options["scaleX"] : this.scale;
    this.scaleY = typeof options["scaleY"] === 'number' ? options["scaleY"] : this.scale;
    this.rotate = typeof options["rotate"] === 'boolean' ? options["rotate"] : false;
  };

  Sprite.prototype = {
    move: function(time) {
      this._index += time*this.speed;
    },
    isCollidedWith: function() {

    },
    draw: function(ctx, canvasPos) {
      if(typeof canvasPos === "undefined") { canvasPos = this.pos; }
      var frames;
      var yCoord = 0;
      var xCoord = 0;
      if(this.speed > 0) {
        var max = 0;
        var rowLength = this.frames[0];
        for(var i = 0; i < this.frames.length; i++ ) {
          max += this.frames[i];
        }
        var idx = Math.floor(this._index);
        var modIdx = idx % max;
        yCoord = Math.floor(modIdx/rowLength);
        xCoord = modIdx % rowLength;

        if(this.once && idx >=max) {
          this.done = true;
          return;
        }
      }

      var x = this.spritePos[0];
      var y = this.spritePos[1];
      y += yCoord * this.spriteSize[1];
      x += xCoord*this.spriteSize[0];

      if(typeof canvasPos ==="undefined") {debugger;}
      var canvasSizeX = this.spriteSize[0] * this.scaleX;
      var canvasSizeY = this.spriteSize[1] * this.scaleY;

      var canvasX = canvasPos[0] - canvasSizeX/2;
      var canvasY = canvasPos[1] - canvasSizeY/2;

      ctx.drawImage(Asteroids.resources.get(this.url),x,y,
                    this.spriteSize[0], this.spriteSize[1], canvasX, canvasY,
                    canvasSizeX, canvasSizeY);

    }
  };

})(this);
