/**
 * Created by nathan on 10/10/16.
 */
function Pixel(obj) {
    this.red = obj.red;
    this.blue = obj.blue;
    this.green = obj.green;
    this.alpha = obj.alpha;
    this.row = obj.row;
    this.col = obj.col;
}

Pixel.prototype = {

    hex2rgb : function (hex, opacity) {
        hex = hex.replace('#','');
        this.red = parseInt(hex.substring(0,2), 16);
        this.green = parseInt(hex.substring(2,4), 16);
        this.blue = parseInt(hex.substring(4,6), 16);
        console.log(this.red, this.green, this.blue);
        this.alpha = opacity || 100;

    },
    fill : function (hex) {
        if(hex.indexOf('#') < 0)
            hex = color(hex);
        this.hex2rgb(hex, 100);
    }
}
