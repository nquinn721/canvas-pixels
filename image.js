
function Img(ctx) {
    this.img = new Image();
    this.img.src = "spritesheet1.png";
    this.pixels = [];
    this.rowPixels = [];
    this.colPixels = [];

    this.ctx = ctx;
    this.x = 6;
    this.y = 6;

}
Img.prototype = {
    init: function (cb) {
        this.img.onload = function () {
            this.img.style.display = 'none';

            this.ctx.drawImage(this.img, this.x, this.y);
            this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
            this.data = this.imageData.data;
            this.width = canvas.width;
            this.height = canvas.height;
            this.convertToPixels();

            cb && cb();
        }.bind(this);
    },
    convertToPixels: function () {
        var pixel, row, col;
        for (var i = 0; i < this.data.length; i += 4) {
            row = this.getRowNum(Math.floor(i / 4));
            col = this.getColNum(Math.floor(i / 4));
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

        if(this.rowPixels[row])
            return this.rowPixels[row][col];

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
        return this.getPixelByRowCol(i - this.width, i);
    },
    getPixelUpRight : function (i) {
        return this.getPixelByRowCol(i - this.width, i + 1);
    },
    getPixelUpLeft : function (i) {
        return this.getPixelByRowCol(i - this.width, i - 1);
    },
    getPixelDownLeft : function (i) {
        return this.getPixelByRowCol(i + this.width, i - 1);
    },
    getPixelDownRight : function (i) {
        return this.getPixelByRowCol(i + this.width, i + 1);
    },
    getPixelDown : function (i) {
        return this.getPixelByRowCol(i + this.width, i);
    },
    getSurroundingPixels : function (i, distance) {
        return [
            this.getPixelUpLeft(i),
            this.getPixelUp(i),
            this.getPixelUpRight(i),
            this.getPixelLeft(i),
            this.getPixelByRowCol(i, i),
            this.getPixelRight(i),
            this.getPixelDownLeft(i),
            this.getPixelDown(i),
            this.getPixelDownRight(i)
        ];
    },
    /**
     * END GETTERS
     */



    save: function () {
        var imgData = this.convertToImageData();
        this.ctx.putImageData(this.imageData, 0, 0);
    }
};