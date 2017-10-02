import {
    Color,
    Signal,
    Async
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';
import {
    DataImage2D
} from './DataImage2D.js';


// http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {
            tl: radius,
            tr: radius,
            br: radius,
            bl: radius
        };
    } else {
        var defaultRadius = {
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0
        };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

class Label  extends DataImage2D {
    constructor(text) {
        super(text);

        this.text = text;
        this.color = new Color(1.0,1.0,1.0);
        this.font = "Calibri";
        this.textAlign = "left";
        this.fontSize = 22;
        // this.left = 0;
        this.border = 1;
        this.margin = 1;
        this.borderRadius = 10;
        this.outline = false;
        this.outlineColor = new Color(0.8, 0.2, 0.2, 1.0);
        this.filleOutline = false;
        this.strokeOutline = true;
        this.fillText = true;
        this.fillBackboard = true;


        this.__canvasElem = document.createElement('canvas');


    }
    

    renderLabelToImage() {

        let ctx2d = this.__canvasElem.getContext('2d', {
            'alpha': true
        });
        ctx2d.globalAlpha = 0.0;

        // finally query the various pixel ratios
        let devicePixelRatio = window.devicePixelRatio || 1;
        let backingStoreRatio = ctx2d.webkitBackingStorePixelRatio ||
                            ctx2d.mozBackingStorePixelRatio ||
                            ctx2d.msBackingStorePixelRatio ||
                            ctx2d.oBackingStorePixelRatio ||
                            ctx2d.backingStorePixelRatio || 1;

        let ratio = devicePixelRatio / backingStoreRatio;

        ctx2d.font = this.fontSize + 'px ' + this.font;
        this.width = (ctx2d.measureText(this.text).width + (this.border * 2));// * ratio;
        this.height = (parseInt(this.fontSize) + (this.border * 2));// * ratio;
        console.log("this.width:" + this.width + " this.height:" + this.height )
        ctx2d.canvas.width = this.width;
        ctx2d.canvas.height = this.height;

        ctx2d.clearRect(0, 0, this.width, this.height);
        ctx2d.fillStyle = "rgba(0, 0, 0, 0.0)";
        ctx2d.fillRect(0, 0, this.width, this.height);

        if (this.fillBackboard) {
            ctx2d.fillStyle = this.outlineColor.toHex();
            ctx2d.strokeStyle = this.outlineColor.lerp(new Color(1, 1, 1, 1), 0.5).toHex();
            if (this.strokeOutline)
                roundRect(ctx2d, this.border, this.border, this.width - (this.border*2), this.height - (this.border*2), this.borderRadius, true, this.strokeOutline);
            else
                roundRect(ctx2d, 0, 0, this.width, this.height, this.borderRadius, true, this.strokeOutline);
        }

        ctx2d.font = this.fontSize + 'px ' + this.font;
        ctx2d.textAlign = this.textAlign;
        ctx2d.fillStyle = this.color.toHex();
        ctx2d.textBaseline = "hanging";
        ctx2d.fillText(this.text, this.border, this.border);
        
        // if (this.outline) {
        //     ctx2d.strokeStyle = this.outlineColor.toHex();
        //     ctx2d.lineWidth = 1.5;
        //     ctx2d.strokeText(this.text, this.border, this.border);
        // }

        this.__data = ctx2d.getImageData(0, 0, this.width, this.height);
        console.log(this.__data.data[3])
        this.__loaded = true;
        this.loaded.emit();
    }

    getParams() {
        this.renderLabelToImage();
        return super.getParams();
    }

};

sgFactory.registerClass('Label', Label);


export {
    Label
};