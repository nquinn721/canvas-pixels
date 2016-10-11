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
        return [
            parseInt(hex.substring(0,2), 16),
            parseInt(hex.substring(2,4), 16),
            parseInt(hex.substring(4,6), 16),
            opacity
        ];
    },


    rgb2hex : function(colors) {
        return "#" +
            componentToHex(colors[0]) +
            componentToHex(colors[1]) +
            componentToHex(colors[2]);
    },
    hex2name : function (hex) {
        return hexToNamed(hex);
    },
    getRGBA : function (rgba) {
        var colors = rgba.replace(/[\(\)rgba]/g, '').split(',');
        return colors;
    },
    setColor : function (red, green, blue, alpha) {
        if(Array.isArray(red)){
            alpha = red[3];
            blue = red[2];
            green = red[1];
            red = red[0];
        }
        this.red = Number(red);
        this.green = Number(green);
        this.blue = Number(blue);
        this.alpha = Number(alpha) || 100;
    },
    fill : function (color) {
        var colors;
        color = namedToHex(color) || color;

        if(color.indexOf('#') > -1)
            colors = this.hex2rgb(color, 100);

        if(color.match('rgb'))
            colors = this.getRGBA(color);

        this.color = getColorFromHex(this.rgb2hex(colors));

        this.setColor(colors);
    }
}
