import { Color } from '../../Math';
import { Signal, Async } from '../../Utilities';
import {
  Parameter,
  BooleanParameter,
  NumberParameter,
  Vec2Parameter,
  Vec3Parameter,
  ColorParameter,
  StringParameter,
} from '../Parameters';
import { sgFactory } from '../SGFactory.js';
import { DataImage } from './DataImage.js';
import { labelManager } from './LabelManager.js';

// http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x - The top left x coordinate
 * @param {Number} y - The top left y coordinate
 * @param {Number} width - The width of the rectangle
 * @param {Number} height - The height of the rectangle
 * @param {Number} [radius = 5] - The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] - Top left
 * @param {Number} [radius.tr = 0] - Top right
 * @param {Number} [radius.br = 0] - Bottom right
 * @param {Number} [radius.bl = 0] - Bottom left
 * @param {Boolean} [fill = false] - Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] - Whether to stroke the rectangle.
 * @param {Number} [strokeWidth] - The strokeWidth param.
 */
function roundRect(
  ctx,
  x,
  y,
  width,
  height,
  radius,
  fill,
  stroke,
  strokeWidth
) {
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
      bl: radius,
    };
  } else {
    const defaultRadius = {
      tl: 0,
      tr: 0,
      br: 0,
      bl: 0,
    };
    for (const side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

/** Class representing a label.
 * @extends DataImage
 */
class Label extends DataImage {
  /**
   * Create a label.
   * @param {any} name - The name value.
   * @param {any} library - The library value.
   */
  constructor(name, library) {
    super(name);

    this.__canvasElem = document.createElement('canvas');
    const fontSize = 22;
    const outlineColor = new Color(0.2, 0.2, 0.2, 1.0);
    const backgroundColor = outlineColor.lerp(new Color(1, 1, 1, 1), 0.5);

    const libraryParam = this.addParameter(new StringParameter('library'));
    const textParam = this.addParameter(new StringParameter('text', ''));
    if (labelManager.isLibraryLoaded(library)) this.__getLabelText();
    // or load the label when it is loaded.
    labelManager.labelLibraryLoaded.connect(loadedLibrary => {
      const library = libraryParam.getValue();
      if (loadedLibrary == library) this.__getLabelText();
    });
    libraryParam.valueChanged.connect(this.__getLabelText.bind(this));
    this.nameChanged.connect(this.__getLabelText.bind(this));
    // const setLabelTextToLibrary = ()=>{
    //     const library = libraryParam.getValue();
    //     const name = this.getName();
    //     const text = textParam.getValue();
    //     labelManager.setLabelTextToLibrary(library, name, text);
    // }
    // textParam.valueChanged.connect(setLabelText);

    this.addParameter(
      new ColorParameter('fontColor', new Color(1.0, 1.0, 1.0))
    );
    this.addParameter(new StringParameter('textAlign', 'left', 'String'));
    // this.addParameter(MultiChoiceParameter('textAlign', 0, ['left', 'right']));
    this.addParameter(new StringParameter('fillText', true));
    this.addParameter(new NumberParameter('margin', fontSize * 0.5));
    this.addParameter(new NumberParameter('borderWidth', 2));
    this.addParameter(new NumberParameter('borderRadius', fontSize * 0.5));
    this.addParameter(new BooleanParameter('outline', false));
    this.addParameter(new BooleanParameter('outlineColor', outlineColor));
    this.addParameter(new BooleanParameter('background', true));
    this.addParameter(new ColorParameter('backgroundColor', backgroundColor));
    this.addParameter(new BooleanParameter('fillBackground', true));
    this.addParameter(new BooleanParameter('strokeBackgroundOutline', true));
    const fontSizeParam = this.addParameter(
      new NumberParameter('fontSize', 22)
    );
    const fontParam = this.addParameter(
      new StringParameter('font', 'Helvetica', 'String')
    );

    const loadFont = () => {
      const library = this.getParameter('library').getValue();
      const font = fontParam.getValue();
      const fontSize = fontSizeParam.getValue();
      if (document.fonts != undefined) {
        document.fonts.load(fontSize + 'px "' + font + '"').then(() => {
          // console.log("Font Loaded:" + font);
          // if(this.__loaded) {
          //     this.__loaded = true;
          //     this.loaded.emit();
          // }

          // If there were no label libraries discovered, then
          // we assume this is an inline label, and we render immedietly.
          if (library == '' || !labelManager.isLibraryFound(library))
            this.renderLabelToImage();
        });
      } else {
        // If there were no label libraries discovered, then
        // we assume this is an inline label, and we render immedietly.
        if (library == '' || !labelManager.isLibraryFound(library))
          this.renderLabelToImage();
      }
    };
    fontSizeParam.valueChanged.connect(loadFont);
    fontParam.valueChanged.connect(loadFont);
    // fontParam.setValue('AGBookTTReg');

    if (library) libraryParam.setValue(library);
  }

  /**
   * The __getLabelText method.
   * @private
   */
  __getLabelText() {
    const library = this.getParameter('library').getValue();
    if (library == '') {
      return;
    }
    const textParam = this.getParameter('text');
    const name = this.getName();

    if (!labelManager.isLibraryFound(library)) {
      console.warn('Label Libary not found:', library);
      return;
    }
    if (!labelManager.isLibraryLoaded(library)) {
      return;
    }
    try {
      const text = labelManager.getLabelText(library, name);
      textParam.setValue(text);
      this.renderLabelToImage();
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * The renderLabelToImage method.
   */
  renderLabelToImage() {
    const ctx2d = this.__canvasElem.getContext('2d', {
      alpha: true,
    });

    let text = this.getParameter('text').getValue();
    if (text == '') text = this.getName();

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
    const strokeBackgroundOutline = this.getParameter(
      'strokeBackgroundOutline'
    ).getValue();

    // let ratio = devicePixelRatio / backingStoreRatio;
    const marginAndBorder = margin + borderWidth;
    const lines = text.split('\n');

    ctx2d.font = fontSize + 'px "' + font + '"';
    // console.log("renderLabelToImage:" + ctx2d.font);
    let width = 0;
    lines.forEach(line => {
      width = Math.max(ctx2d.measureText(line).width, width);
    });
    const fontHeight = parseInt(fontSize);
    this.width = width + marginAndBorder * 2;
    this.height = fontHeight * lines.length + marginAndBorder * 2;
    ctx2d.canvas.width = this.width;
    ctx2d.canvas.height = this.height;

    // ctx2d.clearRect(0, 0, this.width, this.height);
    ctx2d.fillStyle = 'rgba(0, 0, 0, 0.0)';
    ctx2d.fillRect(0, 0, this.width, this.height);

    if (background) {
      ctx2d.fillStyle = backgroundColor.toHex();
      ctx2d.strokeStyle = outlineColor.toHex();
      roundRect(
        ctx2d,
        borderWidth,
        borderWidth,
        this.width - borderWidth * 2,
        this.height - borderWidth * 2,
        borderRadius,
        fillBackground,
        strokeBackgroundOutline,
        borderWidth
      );
    }

    ctx2d.font = fontSize + 'px "' + font + '"';
    ctx2d.textAlign = textAlign;
    ctx2d.fillStyle = fontColor.toHex();
    ctx2d.textBaseline = 'hanging';
    lines.forEach((line, index) => {
      ctx2d.fillText(
        line,
        marginAndBorder,
        marginAndBorder + index * fontHeight
      );
    });

    if (outline) {
      ctx2d.strokeStyle = outlineColor.toHex();
      ctx2d.lineWidth = 1.5;
      ctx2d.strokeText(text, marginAndBorder, marginAndBorder);
    }

    this.__data = ctx2d.getImageData(0, 0, this.width, this.height);

    if (!this.__loaded) {
      this.__loaded = true;
      this.loaded.emit();
    } else {
      this.updated.emit();
    }
  }

  /**
   * The getParams method.
   * @return {any} - The return value.
   */
  getParams() {
    // this.renderLabelToImage();
    return super.getParams();
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    const j = super.toJSON(context, flags);
    return j;
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags);
    this.__getLabelText();
  }
}

sgFactory.registerClass('Label', Label);

export { Label };
