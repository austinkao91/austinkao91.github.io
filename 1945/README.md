#1945

Remake of the classic arcade game 1945 written in Javascript, HTML5, and canvas.
Request animation frame is used in place of the usual setInterval methods. This
lets the browser determine and  calculate each animation frame as they become ready.
More about this can be read https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame.

**Challenges: **
In order to animate sprites in this game, I created a flexible sprite object which
every game object inherits from. In order to determine which animation to draw, I
gave each sprite object a time instance variable which I modularize based on the
number of animation frames.

```
this.frames = [5,5,5]
var idx = Math.floor(this._time);
var modIdx = idx % max;
```

I then figure out relative x and y coordinates of the sprite map based on the modularized
index.

```
var rowLength = this.frames[0];
yCoord = Math.floor(modIdx/rowLength);
xCoord = modIdx % rowLength;
```
