(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  Asteroids.resources =  resources = {};

  var resourceCache = {};
  var loading = [];
  var readyCallbacks = [];

  resources.load = function(urlOrArr) {
    if( urlOrArr instanceof Array ) {
      urlOrArr.forEach(function(url) {
        resources._load(url);
      });
    } else {
      resources._load(urlOrArr);
    }
  };

  resources._load = function(url) {
    if(resourceCache[url]) {
      return resourceCache[url];
    } else {
      var img = new Image();
      img.onload = function() {
        resourceCache[url] = img;
        if(resources.isReady()) {
          readyCallbacks.forEach(function(func) { func();});
        }
      };
      resourceCache[url] = false;
      img.src = url;

    }
  };

  resources.isReady = function() {
    var ready = true;
    for( var k in resourceCache ) {
      if(resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  };

  resources.get = function(url) {
    return resourceCache[url];
  };

  resources.onReady = function(func) {
    readyCallbacks.push(func);
  };

})(this);
