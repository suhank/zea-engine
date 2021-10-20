import { Registry } from '../../Registry'
import { NumberParameter } from './NumberParameter'
import { BaseImage } from '../BaseImage'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { BinReader } from '../../SceneTree/BinReader'
/**
 * Represents a specific type of parameter, that stores `number` and `BaseImage` texture values.
 *
 * i.e.:
 * ```javascript
 * const image = new LDRImage();
 * image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
 *
 * const numberParam = new MaterialFloatParam('MyMaterialFloat', 15.5)
 * numberParam.setImage(image)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(numberParam)
 * ```
 *
 * * **Events**
 * * **valueChanged:** Triggered every time the Image value changes
 * * **textureDisconnected:** Triggered when Image value is cleaned/removed.
 * * **textureConnected:** Triggered when the Image value is set.
 *
 * @extends NumberParameter
 */
class MaterialFloatParam extends NumberParameter implements IBinaryReader {
  protected image?: BaseImage
  /**
   * Create a material float parameter.
   * @param {string} name - The name of the material color parameter.
   * @param {number} [value] - The value of the parameter.
   * @param {number[]} [range] - An array with two numbers. If defined, the parameter value will be clamped.
   */
  constructor(name: string = '', value?: number, range?: number[]) {
    super(name, value, range)
  }

  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    const j = super.toJSON(context)

    return j
  }
  /**
   * Returns `BaseImage` texture of the Material.
   *
   * @return {BaseImage} - The return value.
   */
  getImage(): BaseImage | undefined {
    return this.image
  }

  /**
   * Sets `BaseImage` texture value in parameter.
   *
   * @param {BaseImage | null} value - The value value.
   */
  setImage(value: BaseImage | null): void {
    const disconnectImage = () => {
      this.emit('textureDisconnected')
    }
    if (value) {
      if (this.image != undefined && this.image !== value) {
        disconnectImage()
      }
      this.image = value
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
   * Sets `number` or the `BaseImage` texture value in parameter.
   *
   * @param {number} value - The value param.
   */
  setValue(value: number | BaseImage) {
    if (value instanceof BaseImage) {
      this.setImage(value)
    } else {
      super.setValue(value)
    }
  }

  /**
   * Extracts `number` and `Image` values from a buffer, updating current parameter state.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, any>} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, any>): void {
    super.readBinary(reader, context)

    const textureName = reader.loadStr()
    if (textureName != '') {
      console.log('Load Texture')
      this.setImage(context.materialLibrary.getImage(textureName))
    }
  }

  /**
   * The clone method constructs a new material float parameter,
   * copies its values from this parameter and returns it.
   *
   * @return {MaterialFloatParam} - Returns a new cloned material float parameter.
   */
  clone(): MaterialFloatParam {
    const clonedParam = new MaterialFloatParam(this.name, this.__value, this.range)
    return clonedParam
  }
}

Registry.register('MaterialFloatParam', MaterialFloatParam)

export { MaterialFloatParam }
