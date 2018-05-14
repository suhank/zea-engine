import {
    Color,
} from '../Math';
import {
    Signal,
    Async
} from '../Utilities';
import {
    Parameter,
    NumberParameter,
    Vec2Parameter,
    Vec3Parameter,
    ColorParameter
} from './Parameters';
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
    constructor(text='') {
        super(text);

        // this.text = text;
        // this.fontColor = new Color(1.0,1.0,1.0);
        // this.font = "Calibri";
        // this.textAlign = "left";
        // this.fontSize = 22;
        // this.fillText = true;
        // // this.left = 0;
        // this.borderWidth = 1;
        // this.margin = this.fontSize * 0.5;
        // this.borderRadius = this.fontSize * 0.5;
        // this.outline = false;
        // this.outlineColor = new Color(0.2, 0.2, 0.2, 1.0);

        // this.background = true;
        // this.backgroundColor = this.outlineColor.lerp(new Color(1, 1, 1, 1), 0.5);
        // this.fillBackground = true;
        // this.strokeBackgroundOutline = true;

        let fontSize = 22;
        let outlineColor = new Color(0.2, 0.2, 0.2, 1.0);
        let backgroundColor = outlineColor.lerp(new Color(1, 1, 1, 1), 0.5);


        this.addParameter(new Parameter('text', text, 'String'));
        this.addParameter('fontColor', new Color(1.0, 1.0, 1.0));
        this.addParameter(new Parameter('textAlign', 'left', 'String'));
        // this.addParameter(MultiChoiceParameter('textAlign', ['left', 'right'], 0, 'String'));
        this.addParameter('fillText', true);
        this.addParameter('margin', fontSize * 0.5);
        this.addParameter('borderWidth', 2);
        this.addParameter('borderRadius', fontSize * 0.5);
        this.addParameter('outline', false);
        this.addParameter('outlineColor', outlineColor);
        this.addParameter('background', true);
        this.addParameter('backgroundColor', backgroundColor);
        this.addParameter('fillBackground', true);
        this.addParameter('strokeBackgroundOutline', true);
        this.addParameter('fontSize', 22).valueChanged.connect(loadFont);
        const fontParam = this.addParameter(new Parameter('font', 'Helvetica', 'String'));

        const loadFont = ()=>{
            const font = this.getParameter('font').getValue();
            const fontSize = this.getParameter('fontSize').getValue();
            document.fonts.load(fontSize + 'px "' + font + '"').then(()=>{
                console.log("Font Loaded:" + font);
                // if(this.__loaded) {
                //     this.__loaded = true;
                //     this.loaded.emit();
                // }
                this.renderLabelToImage();
            });
        }
        fontParam.valueChanged.connect(loadFont)
        // fontParam.setValue('AGBookTTReg');

        this.__canvasElem = document.createElement('canvas');
    }
    

    renderLabelToImage() {

        let ctx2d = this.__canvasElem.getContext('2d', {
            'alpha': true
        });

        const text = this.getParameter('text').getValue();
        const font = this.getParameter('font').getValue();
        const fontColor = this.getParameter('fontColor').getValue();
        const textAlign = this.getParameter('textAlign').getValue();
        const fontSize = this.getParameter('fontSize').getValue();
        const fillText = this.getParameter('fillText').getValue();
        const margin = this.getParameter('margin').getValue();
        const borderWidth = this.getParameter('borderWidth').getValue();
        const borderRadius = this.getParameter('borderRadius').getValue();
        const outline = this.getParameter('outline').getValue();
        const outlineColor = this.getParameter('outlineColor').getValue();
        const background = this.getParameter('background').getValue();
        const backgroundColor = this.getParameter('backgroundColor').getValue();
        const fillBackground = this.getParameter('fillBackground').getValue();
        const strokeBackgroundOutline = this.getParameter('strokeBackgroundOutline').getValue();

        // let ratio = devicePixelRatio / backingStoreRatio;
        let marginAndBorder = margin + borderWidth;

        ctx2d.font = fontSize + 'px "' + font + '"';
        console.log("renderLabelToImage:" + ctx2d.font);
        this.width = (ctx2d.measureText(text).width + (marginAndBorder * 2));
        this.height = (parseInt(fontSize) + (marginAndBorder * 2));
        ctx2d.canvas.width = this.width;
        ctx2d.canvas.height = this.height;

        // ctx2d.clearRect(0, 0, this.width, this.height);
        ctx2d.fillStyle = "rgba(0, 0, 0, 0.0)";
        ctx2d.fillRect(0, 0, this.width, this.height);

        if (background) {
            ctx2d.fillStyle = backgroundColor.toHex();
            ctx2d.strokeStyle = outlineColor.toHex();
            roundRect(ctx2d, borderWidth, borderWidth, this.width - (borderWidth*2), this.height - (borderWidth*2), borderRadius, fillBackground, strokeBackgroundOutline);
        }

        ctx2d.font = fontSize + 'px "' + font + '"';
        ctx2d.textAlign = textAlign;
        ctx2d.fillStyle = fontColor.toHex();
        ctx2d.textBaseline = "hanging";
        ctx2d.fillText(text, marginAndBorder, marginAndBorder);
        
        if (outline) {
            ctx2d.strokeStyle = outlineColor.toHex();
            ctx2d.lineWidth = 1.5;
            ctx2d.strokeText(text, marginAndBorder, marginAndBorder);
        }

        this.__data = ctx2d.getImageData(0, 0, this.width, this.height);

        if(!this.__loaded){
            this.__loaded = true;
            this.loaded.emit();
        }
        else {
            this.updated.emit();
        }
    }

    getParams() {
        // this.renderLabelToImage();
        return super.getParams();
    }

};

sgFactory.registerClass('Label', Label);


export {
    Label
};