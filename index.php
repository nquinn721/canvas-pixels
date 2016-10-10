<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PHP Test</title>
    <style>
        canvas{
            border:1px solid black;
            width:400px;
            height:400px;
        }
    </style>
</head>
<body>
<canvas id="game" width="50" height="50"></canvas>
<script src="nametohex.js"></script>
<script src="pixel.js"></script>
<script src="image.js"></script>
<script>
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");


    var image = new Img(ctx);
    image.init(function () {
        var pixel, nextPixel, prevPixel, downPixel, prevRowPixel;
        for(var i = 0; i < image.pixels.length; i++) {
            pixel = image.pixels[i];
//            nextPixel = image.pixels[i + 1];
//            prevPixel = image.pixels[i - 1];

//            if(i < 410)
//              downPixel = image.getPixelDown(i);

//        console.log(pixel.alpha)
          if(pixel.alpha === 0){
              pixel.fill('blue');
          }else{

          }


        }
        image.save();

    });

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