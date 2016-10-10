
function Img(ctx) {
    this.img = new Image();
    this.img.src = "spritesheet1.png";
    this.pixels = [];
    this.rowPixels = [];
    this.colPixels = [];

    this.ctx = ctx;

}
Img.prototype = {
    init: function (cb) {
        this.img.onload = function () {
            this.img.style.display = 'none';

            this.ctx.drawImage(this.img, 6, 6);
            this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
            this.data = this.imageData.data;
            this.width = this.img.width;
            this.height = this.img.height;
            this.convertToPixels();

            cb && cb();
        }.bind(this);
    },
    convertToPixels: function () {
        var pixel, row, col;
        for (var i = 0; i < this.data.length; i += 4) {
            row = this.getRowNum(Math.floor(i / 4));
            col = this.getColNum(Math.floor((i / 4)));
            pixel = new Pixel({
                red: this.data[i],
                green: this.data[i + 1],
                blue: this.data[i + 2],
                alpha: this.data[i + 3],
                row: row,
                col: col
            });
            this.pixels.push(pixel);

            if(!this.rowPixels[row])
                this.rowPixels[row] = [];

            if(!this.colPixels[col])
                this.colPixels[col] = [];

            this.rowPixels[row].push(pixel);
            this.colPixels[col].push(pixel);

        }
        console.log(this.pixels);
    },
    convertToImageData: function () {
        var arr = [],
            pixel;
        for (var i = 0; i < this.data.length; i += 4) {
            pixel = this.pixels[i / 4];
            this.data[i] = pixel.red;
            this.data[i + 1] = pixel.green;
            this.data[i + 2] = pixel.blue;
            this.data[i + 3] = pixel.alpha;
        }
        return arr;

    },


    /**
     * GETTERS
     */
    getRowNum : function (i) {
        if(i < 0)return;
        return Math.floor(i / (this.width));
    },
    getColNum : function (i) {
        if(i < 0)return;
        return i % this.width;
    },
    getRowPixels : function (row) {
        return this.rowPixels[row];
    },
    getColPixels : function (col) {
        return this.colPixels[col];
    },
    getPixelByRowCol : function (row, col) {
        var pixel,
            row = this.getRowNum(row),
            col = this.getColNum(col);
        // console.log('row', row, 'col', col);
        if(this.rowPixels[row])
            for(var i = 0; i < this.rowPixels[row].length; i++){
                pixel = this.rowPixels[row][i];
                if(pixel.col === col)return pixel;
            }

    },
    getNextRowPixels : function (i) {
        return this.getRowPixels(i + this.width);
    },
    getPrevRowPixels : function (i) {
        return this.getRowPixels(i - this.width);
    },
    getNextColPixels : function (i) {
        return this.getColPixels(i + 1);
    },
    getPrevColPixels : function (i) {
        return this.getColPixels(i - 1);
    },
    getPixelRight : function (i) {
        return this.getPixelByRowCol(i, i + 1);
    },
    getPixelLeft : function (i) {
        return this.getPixelByRowCol(i, i - 1);
    },
    getPixelUp : function (i) {
        return this.getPixelByRowCol(i - 1, i);
    },
    getPixelDown : function (i) {
        // console.log(i);
        return this.getPixelByRowCol(i + this.width, i);
    },
    getSurroundingPixels : function (i, distance) {

    },
    /**
     * END GETTERS
     */



    save: function () {
        var imgData = this.convertToImageData();
        this.ctx.putImageData(this.imageData, 0, 0);
    }
};