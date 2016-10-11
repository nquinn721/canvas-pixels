<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PHP Test</title>
    <style>
        canvas{
            border:1px solid black;
            width:200px;
            height:200px;
        }
    </style>
</head>
<body>
<canvas id="game" width="50" height="50"></canvas>
<canvas id="game" width="600" height="400"></canvas>
<script src="nametohex.js"></script>
<script src="pixel.js"></script>
<script src="image.js"></script>
<script>
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

var found;
    var image = new Img(ctx);
    image.init(function () {
        var pixel, pixels, nextPixel, prevPixel, downPixel, prevRowPixel;
        for(var i = 0; i < image.pixels.length; i++) {
            pixel = image.pixels[i];
          if(pixel.alpha === 0) {

              var pixels = image.getSurroundingPixels(i);
              for (var j = 0; j < pixels.length; j++) {
                  if (pixels[j] && pixels[j].alpha !== 0)
                      pixels[j].fill('red');
              }
          }
        }
        image.save();

    });
    function num(pixel) {
        return Math.random() * pixel.row & pixel.col;
    }

    function fill(i, pos) {
        setGray(image.pixels[i]);
        if(!pos){
            setGray(image.pixels[i - 1]);
            setGray(image.pixels[i - 2]);
            setGray(image.pixels[i - 3]);
            setGray(image.pixels[i - 4]);
        }else{
            setGray(image.pixels[i + 1]);
            setGray(image.pixels[i + 2]);
            setGray(image.pixels[i + 3]);
            setGray(image.pixels[i + 4]);
        }
    }
    function setGray(pixel) {
        pixel.red = 255;
        pixel.green = 0;
        pixel.blue = 0;
        pixel.alpha = 100;
    }
</script>
</body>
</html>