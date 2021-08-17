import { Registry } from '../../Registry'
import { ColorParameter } from './ColorParameter'
import { BaseImage } from '../BaseImage'
import { Color } from '../../Math/Color'
import { BinReader } from '../../SceneTree/BinReader'

/**
 * Represents a specific type of parameter, that stores `Color` and `BaseImage` texture values.
 *
 * i.e.:
 * ```javascript
 * const image = new LDRImage();
 * image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
 *
 * const matColorParam = new MaterialColorParam('MyMaterialColor', new Color(0, 254, 2))
 * matColorParam.setImage(image)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(matColorParam)
 * ```
 *
 * **Events**
 * * **valueChanged:** Triggered every time the Image value changes
 * * **textureDisconnected:** Triggered when Image value is cleaned/removed.
 * * **textureConnected:** Triggered when the Image value is set.
 *
 * @extends ColorParameter
 */

// TODO: should MaterialColorParam have these parameters below? I'm assuming no.
// class MaterialColorParam extends Parameter {
//   constructor() {
//     super()
//     this.__shaderName = 'StandardSurfaceShader'
//     this.addParameter('BaseColor', new MaterialColorParam(1.0, 1, 0.5))
//     this.addParameter('AmbientOcclusion', new MaterialFloatParam(1, [0, 1]))
//     this.addParameter('Metallic', new MaterialFloatParam(0.5, [0, 1]))
//     this.addParameter('Reflectance', new NumberParameter(0.5, [0, 1]))
//     this.addParameter('Normal', new MaterialColorParam(1.0, 1, 0.5))
//     this.addParameter('EmissiveStrength', new NumberParameter(0.5, [0, 1]))
//     this.addParameter('Opacity', new MaterialFloatParam(0.5, [0, 1]))
//   }

//   get value() : Color {
//     return this.__value
//   }
//   set value() : Color {
//     return this.__value
//   }

// }

class MaterialColorParam extends ColorParameter {
  protected image?: BaseImage
  /**
   * Create a material color parameter.
   * @param {string} name - The name of the material color parameter.
   * @param {Color} value - The value of the parameter.
   */
  constructor(name?: string, value?: Color) {
    super(name, value)
    this.imageUpdated = this.imageUpdated.bind(this)
  }

  /**
   * Returns `BaseImage` texture of the Material.
   *
   * @return {BaseImage|undefined} - The return value.
   */
  getImage(): BaseImage | undefined {
    return this.image
  }

  /**
   * The __imageUpdated method.
   * @private
   */
  protected imageUpdated = (): void => {
    this.emit('valueChanged')
  }

  /**
   * Sets `BaseImage` texture value in parameter.
   *
   * @param {BaseImage | null} value - The value param.
   */
  setImage(value: BaseImage | null): void {
    const disconnectImage = () => {
      this.image?.off('loaded', this.imageUpdated)
      this.image?.off('updated', this.imageUpdated)
      this.image = undefined
      this.emit('textureDisconnected')
    }
    if (value) {
      if (this.image != undefined && this.image !== value) {
        disconnectImage()
      }
      this.image = value
      this.image.on('updated', this.imageUpdated)
      this.emit('textureConnected')
      this.emit('valueChanged', { mode: 0 })
    } else {
      if (this.image != undefined) {
        disconnectImage()
        this.image = undefined
        this.emit('textureDisconnected')
      }
    }
  }

  /**
   * Sets `Color` or the `BaseImage` texture value in parameter.
   *
   * @param {BaseImage|Color} value - The value param.
   */
  setValue(value: BaseImage | Color) {
    // Note: instead of supporting images or colors, we should replace the ColorParameter with an ImageParameter when assigning textures
    // console.warn('@todo-review: Should we accept different type of values?')
    if (value instanceof BaseImage) {
      this.setImage(value)
    } else {
      super.setValue(value)
    }
  }
  /**
   * Extracts `Color` and `Image` values from a buffer, updating current parameter state.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, any>): void {
    super.readBinary(reader, context)

    const textureName = reader.loadStr()
    if (textureName != '') {
      this.setImage(context.materialLibrary.getImage(textureName))
    }
  }

  /**
   * The clone method constructs a new material color parameter,
   * copies its values from this parameter and returns it.
   *
   * @return {MaterialColorParam} - Returns a new cloned material color parameter.
   */
  clone(): MaterialColorParam {
    const clonedParam = new MaterialColorParam(this.name, this.value?.clone())
    return clonedParam
  }
}

Registry.register('MaterialColorParam', MaterialColorParam)

export { MaterialColorParam }
