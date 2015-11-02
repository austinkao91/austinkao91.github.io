(function(root){
  _keys = {};
  var canvas = document.getElementById("game-canvas");
  var addKey = function(event) {
    _keys[event.keyCode] = true;
  };
  var removeKey = function(event) {
    _keys[event.keyCode] = false;
  };

  document.addEventListener("keydown", function(event) {
    console.log("add")
    addKey(event);
  });

  document.addEventListener("keyup", function(event) {
    removeKey(event);
  });

  window.Asteroids.input = {
    getKeyState: function(keyLetter) {
      var key = keyLetter.charCodeAt();
      return _keys[key];
    }
  };
})(this);
