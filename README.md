# Norman.js [![Build Status](https://travis-ci.org/shakyShane/norman.js.svg?branch=master)](https://travis-ci.org/shakyShane/norman.js)

Use x, y coordinates to map the position of 1 element onto another.
  
Use it as the basis for any image-zoom type libs.

###Example

```js

// The container
var viewBox = {
    height: 300,
    width: 300,
    x: 0,
    y: 0
};

// The image or whatever.
var subject = {
    height: 400,
    width: 400
};

mapper = new Norman({viewBox: viewBox}).mapTo(subject);

document.addEventListener("mousemove", function (event) {
    var newPosition = mapper.map(event.clientX, event.clientY);
    console.log(newPosition) => { x: 120, y: 200 }
});

```

## License
Copyright (c) 2014 Shane Osbourne
Licensed under the MIT license.
