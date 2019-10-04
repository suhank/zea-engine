import { Color } from '../../Math'
import { Signal } from '../../Utilities'
import { sgFactory } from '../SGFactory'
import { Parameter, ValueSetMode } from './Parameter.js'
import { ColorParameter } from './ColorParameter.js'

import { BaseImage } from '../BaseImage.js'

/** Class representing a material color parameter.
 * @extends Parameter
 */
class MaterialColorParam extends ColorParameter {
  /**
   * Create a material color parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value)
    this.textureConnected = new Signal()
    this.textureDisconnected = new Signal()
    this.__imageUpdated = this.__imageUpdated.bind(this)
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new MaterialColorParam(
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

  /**
   * The __imageUpdated method.
   * @private
   */
  __imageUpdated() {
    this.valueChanged.emit()
  }

  /**
   * The setImage method.
   * @param {any} value - The value param.
   * @param {any} mode - The mode param.
   */
  setImage(value, mode = 0) {
    const disconnectImage = () => {
      this.__image.removeRef(this)
      this.__image.loaded.disconnect(this.__imageUpdated)
      this.__image.updated.disconnect(this.__imageUpdated)
      this.__image = null
      this.textureDisconnected.emit()
    }
    if (value) {
      if (this.__image != undefined && this.__image !== value) {
        disconnectImage()
      }
      this.__image = value
      this.__image.addRef(this)
      this.__image.updated.connect(this.__imageUpdated)
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
      this.setImage(context.materialLibrary.getImage(textureName))
    }
  }
}

sgFactory.registerClass('MaterialColorParam', MaterialColorParam)

export { MaterialColorParam }
