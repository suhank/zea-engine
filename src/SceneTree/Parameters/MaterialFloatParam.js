import { Signal } from '../../Utilities'
import { sgFactory } from '../SGFactory'
import { Parameter, ValueSetMode } from './Parameter.js'
import { NumberParameter } from './NumberParameter.js'

import { BaseImage } from '../BaseImage.js'

/** Class representing a material float parameter.
 * @extends NumberParameter
 */
class MaterialFloatParam extends NumberParameter {
  /**
   * Create a material float parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   * @param {any} range - The range value.
   */
  constructor(name, value, range) {
    super(name, value, range)
    this.textureConnected = new Signal()
    this.textureDisconnected = new Signal()
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new MaterialFloatParam(
      this.__name,
      this.__value.clone()
    )
    return clonedParam
  }

  /**
   * The getImage method.
   * @return {any} - The return value.
   */
  getImage() {
    return this.__image
  }

  // let imageUpdated = () => {
  //     valueChanged.emit();
  // }

  /**
   * The setImage method.
   * @param {any} value - The value param.
   * @param {any} mode - The mode param.
   */
  setImage(value, mode = 0) {
    const disconnectImage = () => {
      this.__image.removeRef(this)
      // image.loaded.disconnect(imageUpdated);
      // image.updated.disconnect(imageUpdated);
      this.textureDisconnected.emit()
    }
    if (value) {
      if (this.__image != undefined && this.__image !== value) {
        disconnectImage()
      }
      this.__image = value
      this.__image.addRef(this)
      // image.loaded.connect(imageUpdated);
      // image.updated.connect(imageUpdated);
      this.textureConnected.emit()
      this.valueChanged.emit(mode)
    } else {
      if (this.__image != undefined) {
        disconnectImage()
        this.__image = undefined
        this.textureDisconnected.emit()
      }
    }
  }

  /**
   * The setValue method.
   * @param {any} value - The value param.
   */
  setValue(value) {
    if (value instanceof BaseImage) {
      this.setImage(value)
    } else {
      if (this.__image != undefined) {
        this.setImage(undefined)
      }
      super.setValue(value)
    }
  }

  /**
   * The readBinary method.
   * @param {object} reader - The reader param.
   * @param {object} context - The context param.
   */
  readBinary(reader, context) {
    super.readBinary(reader, context)

    const textureName = reader.loadStr()
    if (textureName != '') {
      console.log('Load Texture')
      this.setImage(context.materialLibrary.getImage(textureName))
    }
  }
}

sgFactory.registerClass('MaterialFloatParam', MaterialFloatParam)

export { MaterialFloatParam }
