/* eslint-disable guard-for-in */
import { Color } from '../../Math/index'
import { BooleanParameter, NumberParameter, ColorParameter, StringParameter } from '../Parameters/index'
import { Registry } from '../../Registry'
import { DataImage } from './DataImage'
import { labelManager } from './LabelManager'

// http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param ctx
 * @param x - The top left x coordinate
 * @param y - The top left y coordinate
 * @param width - The width of the rectangle
 * @param height - The height of the rectangle
 *
 * @param radius - The corner radius; It can also be an object to specify different radii for corners
 * @param radius.tl - Top left
 * @param radius.tr - Top right
 * @param radius.br - Bottom right
 * @param radius.bl - Bottom left
 *
 * @param fill - Whether to fill the rectangle.
 * @param stroke - Whether to stroke the rectangle.
 * @param strokeWidth - The strokeWidth param.
 * @private
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | Record<any, number>,
  fill: boolean = false,
  stroke: boolean = true,
  strokeWidth: number
) {
  if (typeof stroke == 'undefined') {
    stroke = true
  }
  if (typeof radius === 'undefined') {
    radius = 5
  }
  if (typeof radius === 'number') {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius,
    }
  } else {
    const defaultRadius: { [key: string]: number } = {
      tl: 0,
      tr: 0,
      br: 0,
      bl: 0,
    }
    for (const side in defaultRadius) {
      radius[side] = radius[side] || <number>defaultRadius[side]
    }
  }
  ctx.beginPath()
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height - radius.br)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
  ctx.lineTo(x + radius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)
  ctx.closePath()
  if (fill) {
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth
    ctx.stroke()
  }
}
// TODO: rewrite
/**
 * Represents a 2D label item the scene.
 * Since displaying text in the scene is not an easy task,
 * we've abstracted the complicated logic behind this class, transforming any text into a 2D image(`DataImage`).
 *
 * **Library List**
 * * LabelPack
 *
 * **Parameters**
 * * **Library(`StringParameter`):** Library you wan to use for your label, see **Library List** above.
 * * **Text(`StringParameter`):**
 * * **FontColor(`ColorParameter`):**
 * * **Margin(`NumberParameter`):**
 * * **BorderWidth(`NumberParameter`):**
 * * **BorderRadius(`NumberParameter`):**
 * * **Outline(`BooleanParameter`):**
 * * **OutlineColor(`BooleanParameter`):**
 * * **Background(`BooleanParameter`):**
 * * **ColorParameter(`BackgroundColor`):**
 * * **FillBackground(`BooleanParameter`):**
 * * **StrokeBackgroundOutline(`BooleanParameter`):**
 * * **FontSize(`NumberParameter`):** Represents FontSize of the label
 * * **Font(`StringParameter`):**
 *
 * **Events**
 * * **loaded:** Triggered when label's data is loaded.
 * * **updated:** Triggered when label's data changes.
 * * **labelRendered:** Triggered when the text image is rendered. Contains `width`, `height` and data of the image.
 *
 * @extends DataImage
 */
class Label extends DataImage {
  protected needsRender: boolean
  protected canvasElem: HTMLCanvasElement
  protected requestedReRender: boolean = false
  /**
   * Creates a label instance. Creating a canvas element that hosts the specified text.
   *
   * @param name - The name value.
   * @param library - The library value.
   */

  marginParam: NumberParameter
  borderRadiusParam: NumberParameter

  /**
   * @member libraryParam - Library you wan to use for your label, see **Library List** above.
   */
  libraryParam: StringParameter = new StringParameter('Library')

  /**
   * @member textParam - text to display on the label
   */
  textParam: StringParameter = new StringParameter('Text', '')

  /**
   * @member fontColorParam - TODO
   */
  fontColorParam: ColorParameter = new ColorParameter('FontColor', new Color(0, 0, 0))

  /**
   * @member - TODO
   */
  fontSizeParam: NumberParameter = new NumberParameter('FontSize', 22)

  /**
   * @member fontParam - TODO
   */
  fontParam: StringParameter = new StringParameter('Font', 'Helvetica')

  /**
   * @member borderWidthParam - Border around the label
   */
  borderWidthParam: NumberParameter = new NumberParameter('BorderWidth', 2)

  /**
   * @member outlineParam - TODO
   */
  outlineParam: BooleanParameter = new BooleanParameter('Outline', false)

  /**
   * @member outlineColorParam - TODO
   */
  outlineColorParam: ColorParameter = new ColorParameter('OutlineColor', new Color(0, 0, 0))

  /**
   * @member backgroundParam - TODO
   */
  backgroundParam: BooleanParameter = new BooleanParameter('Background', true)

  /**
   * @member backgroundColorParam - TODO
   */
  backgroundColorParam: ColorParameter = new ColorParameter('BackgroundColor', new Color('#FBC02D'))

  /**
   * @member fillBackgroundParam - TODO
   */
  fillBackgroundParam: BooleanParameter = new BooleanParameter('FillBackground', true)

  /**
   * @member strokeBackgroundOutlineParam - TODO
   */
  strokeBackgroundOutlineParam: BooleanParameter = new BooleanParameter('StrokeBackgroundOutline', true)

  constructor(name?: string, library?: string) {
    super(name)

    this.canvasElem = document.createElement('canvas')

    const fontSize = 22
    this.marginParam = new NumberParameter('Margin', fontSize * 0.5)
    this.borderRadiusParam = new NumberParameter('BorderRadius', fontSize * 0.5)

    this.addParameter(this.marginParam)
    this.addParameter(this.borderRadiusParam)

    this.addParameter(this.libraryParam)
    this.addParameter(this.textParam)
    this.addParameter(this.fontColorParam)
    this.addParameter(this.fontSizeParam)
    this.addParameter(this.fontParam)
    this.addParameter(this.borderWidthParam)
    this.addParameter(this.outlineParam)
    this.addParameter(this.outlineColorParam)
    this.addParameter(this.backgroundParam)
    this.addParameter(this.backgroundColorParam)
    this.addParameter(this.fillBackgroundParam)
    this.addParameter(this.strokeBackgroundOutlineParam)

    const reload = () => {
      this.loadLabelData()
    }
    this.on('nameChanged', reload)

    if (library) this.libraryParam.value = library

    this.requestedReRender = false
    this.needsRender = false
    this.loadLabelData()
  }

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   *
   * @param event - The event object.
   * @private
   */
  __parameterValueChanged(event: Record<string, any>) {
    super.parameterValueChanged(event)
    if (!this.requestedReRender) {
      this.requestedReRender = true
      this.loadLabelData()
    }
  }

  /**
   * Method in charge of basically do everything, set text, load/update it, get the library, load the font, etc.
   */
  loadLabelData() {
    const onLoaded = () => {
      this.requestedReRender = false
      this.needsRender = true
      if (!this.__loaded) {
        this.__loaded = true
        this.emit('loaded')
      } else {
        this.emit('updated')
      }
    }

    const loadText = (): Promise<void> => {
      return new Promise((resolve) => {
        const library = this.libraryParam.value
        if (library == '') {
          resolve()
          return
        }
        if (!labelManager.isLibraryFound(library)) {
          console.warn('Label Library not found:', library)
          resolve()
          return
        }
        const getLibraryText = () => {
          try {
            const name = this.getName()
            // console.log("Text Loaded:" + name);
            const text = labelManager.getLabelText(library, name)
            this.textParam.value = text
          } catch (e) {
            // Note: if the text is not found in the labels pack
            // an exception is thrown, and we catch it here.
            console.warn(e)
          }
          resolve()
        }
        if (!labelManager.isLibraryLoaded(library)) {
          labelManager.on('labelLibraryLoaded', (event: any) => {
            const loadedLibrary = event.library
            if (loadedLibrary == library) getLibraryText()
          })
        } else {
          getLibraryText()
        }
      })
    }
    const loadFont = (): Promise<void> => {
      return new Promise((resolve) => {
        if ((document as any).fonts != undefined) {
          const font = this.fontParam.value
          const fontSize = this.fontSizeParam.value
          ;(document as any).fonts.load(fontSize + 'px "' + font + '"')!.then(() => {
            // console.log("Font Loaded:" + font);
            resolve()
          })
        } else {
          resolve()
        }
      })
    }
    Promise.all([loadText(), loadFont()]).then(onLoaded)
  }

  /**
   * Renders the label text to a canvas element ready to display.
   * Here is where all parameters are applied to the canvas containing the text,
   * then the image data is extracted from the canvas context.
   */
  renderLabelToImage() {
    // console.log("renderLabelToImage")
    const ctx2d = this.canvasElem.getContext('2d', {
      alpha: true,
    })

    let text = this.textParam.value
    if (text == '') text = this.getName()

    const font = this.fontParam.value
    const fontColor = this.fontColorParam.value
    const textAlign = 'left' // this.textAlignParam.value
    const fontSize = this.fontSizeParam.value
    const margin = this.marginParam.value
    const borderWidth = this.borderWidthParam.value
    const borderRadius = this.borderRadiusParam.value
    const outline = this.outlineParam.value
    const outlineColor = this.outlineColorParam.value
    const background = this.backgroundParam.value
    const backgroundColor = this.backgroundColorParam.value
    const fillBackground = this.fillBackgroundParam.value
    const strokeBackgroundOutline = this.strokeBackgroundOutlineParam.value

    // let ratio = devicePixelRatio / backingStoreRatio;
    const marginAndBorder = margin + borderWidth
    const lines = text.split('\n')

    ctx2d.font = fontSize + 'px "' + font + '"'
    // console.log("renderLabelToImage:" + ctx2d.font);
    let width = 0
    lines.forEach((line) => {
      width = Math.max(ctx2d.measureText(line).width, width)
    })
    const fontHeight = fontSize // parseInt(fontSize)
    this.width = Math.ceil(width + marginAndBorder * 2)
    this.height = Math.ceil(fontHeight * lines.length + marginAndBorder * 2)
    ctx2d.canvas.width = this.width
    ctx2d.canvas.height = this.height
    this.canvasElem.width = this.width
    this.canvasElem.height = this.height

    // ctx2d.clearRect(0, 0, this.width, this.height);
    ctx2d.fillStyle = 'rgba(0, 0, 0, 0.0)'
    ctx2d.fillRect(0, 0, this.width, this.height)

    if (background) {
      ctx2d.fillStyle = backgroundColor.toHex()
      ctx2d.strokeStyle = outlineColor.toHex()
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
      )
    }

    ctx2d.font = fontSize + 'px "' + font + '"'
    ctx2d.textAlign = textAlign
    ctx2d.fillStyle = fontColor.toHex()
    ctx2d.textBaseline = 'hanging'
    lines.forEach((line, index) => {
      ctx2d.fillText(line, marginAndBorder, marginAndBorder + index * fontHeight)
    })

    if (outline) {
      ctx2d.strokeStyle = outlineColor.toHex()
      ctx2d.lineWidth = 1.5
      ctx2d.strokeText(text, marginAndBorder, marginAndBorder)
    }

    this.__data = ctx2d.getImageData(0, 0, this.width, this.height)
    this.needsRender = false
    this.emit('labelRendered', {
      width: this.width,
      height: this.height,
      data: this.__data,
    })
  }

  /**
   *  Returns all parameters and class state values(Including data).
   *
   * @return - The return value.
   */
  getParams(): Record<string, any> {
    if (this.needsRender) this.renderLabelToImage()
    return super.getParams()
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context: Record<string, any>) {
    const j = super.toJSON(context)
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any>) {
    super.fromJSON(j, context)
  }
}

Registry.register('Label', Label)

export { Label }
