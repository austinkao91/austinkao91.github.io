(function(root){
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function(ChildClass, ParentClass){
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

Util.randomVec = function(length) {
    return [0, length];
  };

  Util.norm = function(vel) {
    return Math.sqrt(
      Math.pow(vel[0],2) +
      Math.pow(vel[1],2)
    );
  };

  Util.normalize = function(vel,length) {
    var norm = length/Util.norm(vel);
    return [vel[0]*norm, vel[1]*norm];
  };

})(this);
