import { Color, Vec2 } from '../Math/index'
import { BooleanParameter, NumberParameter, ColorParameter, ImageParameter, Vec2Parameter } from './Parameters/index'
import { TreeItem } from './TreeItem'
import { Registry } from '../Registry'
import { BaseImage } from './BaseImage'

/**
 * A special type of TreeItem(Item with hierarchical abilities) class that represents a banner in a 2D dimension.
 * Can own any type of `BaseImage`.
 * <br>
 * <br>
 * **Parameters**
 * * **Image(`ImageParameter`):** Is the BaseImage you want to display on the board.
 * * **PixelsPerMeter(`NumberParameter`):** Quality and Size of the board. The bigger the number, the smaller the board.
 * * **Alpha(`NumberParameter`):** Transparency of the board, from 0 to 1.
 * * **AlignedToCamera(`BooleanParameter`):** Faces or not the board to the camera at all time(Moves with camera movement).
 * * **DrawOnTop(`BooleanParameter`):** The billboards are rendered overlaid on the scene.
 * * **FixedSizeOnscreen(`BooleanParameter`):** The billboards are rendered at a fixed size on screen, regardless of the distance to the billboard.
 *
 * @extends TreeItem
 */
class BillboardItem extends TreeItem {
  /**
   * Creates a billboard item.
   *
   * @param {string} name - The name of the billboard item.
   * @param {BaseImage} image - The image value.
   */
  
  /**
   * @member {ImageParameter} imageParam - Is the BaseImage you want to display on the board.
  */
  imageParam:  ImageParameter = new ImageParameter('Image')

  /**
   * @member {NumberParameter} pixelsPerMeterParam - Quality and Size of the board. The bigger the number, the smaller the board.
  */
  pixelsPerMeterParam: NumberParameter = new NumberParameter('PixelsPerMeter', 1000.0)

  /**
   * @member {NumberParameter} alphaParam - Transparency of the board, from 0 to 1.
  */
  alphaParam: NumberParameter = new NumberParameter('Alpha', 1.0)

  /**
   * @member {ColorParameter} colorParam - The color of the billboard
  */
  colorParam: ColorParameter = new ColorParameter('Color', new Color(1.0, 1.0, 1.0))

  /**
   * @member {BooleanParameter} alignedToCameraParam - Faces or not the board to the camera at all time(Moves with camera movement).
  */
  alignedToCameraParam: BooleanParameter = new BooleanParameter('AlignedToCamera', false)

  /**
   * @member {BooleanParameter} drawOnTopParam - The billboards are rendered overlaid on the scene.
  */
  drawOnTopParam: BooleanParameter = new BooleanParameter('DrawOnTop', false)

  /**
   * @member {BooleanParameter} fixedSizeOnscreenParam - The billboards are rendered at a fixed size on screen, regardless of the distance to the billboard.
  */
  fixedSizeOnscreenParam: BooleanParameter = new BooleanParameter('FixedSizeOnscreen', false)

  /**
   * @member {Vec2Parameter} pivotParam - Where the pivot of the billboard is.
  */
  pivotParam: Vec2Parameter = new Vec2Parameter('Pivot', new Vec2(0.5, 0.0))

  constructor(name?: string, image?: BaseImage) {
    super(name)
    const imageParamResult = this.addParameter(this.imageParam)
    if (image) imageParamResult.value = image // Note: this dirties the param and will ensure it is saved to JSON
    this.addParameter(this.pixelsPerMeterParam)
    this.addParameter(this.alphaParam)
    this.addParameter(this.colorParam)
    this.addParameter(this.alignedToCameraParam)
    this.addParameter(this.drawOnTopParam)
    this.addParameter(this.fixedSizeOnscreenParam)
    this.addParameter(this.pivotParam)
  }
}

Registry.register('BillboardItem', BillboardItem)

export { BillboardItem }
