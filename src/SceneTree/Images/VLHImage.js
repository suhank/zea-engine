import { Color } from '../../Math'
import { Signal, decodeText } from '../../Utilities'
import { sgFactory } from '../SGFactory.js'
import { BaseImage } from '../BaseImage.js'
import { resourceLoader } from '../ResourceLoader.js'

import {
  Parameter,
  NumberParameter,
  Vec4Parameter,
  FilePathParameter,
  ParameterSet,
} from '../Parameters'

/** Class representing a VLH image.
 * @extends BaseImage
 */
class VLHImage extends BaseImage {
  /**
   * Create a VLH image..
   * @param {string} name - The name value.
   * @param {any} params - The params value.
   */
  constructor(name, params = {}) {
    let filepath
    if (name != undefined && name.lastIndexOf('.') != -1) {
      filepath = name
      name = name.substring(name.lastIndexOf('/') + 1, name.lastIndexOf('.'))
    }
    super(name, params)

    this.__loaded = false
    this.__exposure = 1.0
    this.__ambientLightFactor = 0.0
    this.__hdrtint = new Color(1, 1, 1, 1)
    this.__stream = 'stream' in params ? params['stream'] : false
    this.type = 'FLOAT'

    const fileParam = this.addParameter(new FilePathParameter('FilePath'))
    fileParam.valueChanged.connect(() => {
      this.loaded.untoggle()

      if (this.getName() == sgFactory.getClassName(this)) {
        // Generate a name from the file path.
        const stem = fileParam.getStem()
        const decorator = stem.substring(stem.length - 1)
        if (!isNaN(decorator)) {
          // Note: ALL image names have an LOD specifier at the end.
          // remove that off when retrieving the name.
          this.setName(stem.substring(0, stem.length - 1))
        } else {
          this.setName(stem)
        }
      }

      const fileId = fileParam.getValue()
      const file = fileParam.getFile()
      this.__loadVLH(fileId, file)
    })

    if (filepath) {
      this.getParameter('FilePath').setFilepath(filepath)
    }
  }

  /**
   * The getDOMElement method.
   * @return {any} - The return value.
   */
  getDOMElement() {
    return this.__domElement
  }

  /**
   * The getResourcePath method.
   * @return {any} - The return value.
   */
  getResourcePath() {
    return this.getParameter('FilePath').getValue()
  }

  /**
   * The __decodeData method.
   * @param {any} entries - The entries param.
   * @private
   */
  __decodeData(entries) {
    const ldr = entries.ldr
    const cdm = entries.cdm

    // ///////////////////////////////
    // Parse the data.
    const blob = new Blob([ldr.buffer])
    const ldrPic = new Image()
    ldrPic.onload = () => {
      this.width = ldrPic.width
      this.height = ldrPic.height
      // console.log(resourcePath + ": [" + this.width + ", " + this.height + "]");
      this.__data = {
        ldr: ldrPic,
        cdm: cdm,
      }
      if (!this.__loaded) {
        this.__loaded = true
        this.loaded.emit()
      } else {
        this.updated.emit()
      }
    }
    ldrPic.src = URL.createObjectURL(blob)
  }

  /**
   * The __loadVLH method.
   * @param {any} fileId - The fileId param.
   * @param {any} file - The file param.
   * @private
   */
  __loadVLH(fileId, file) {
    this.type = 'FLOAT'

    resourceLoader.loadUrl(fileId, file.url, entries => {
      if (!entries.ldr || !entries.cdm) {
        for (const name in entries) {
          if (name.endsWith('.jpg')) {
            entries.ldr = entries[name]
            delete entries[name]
          } else if (name.endsWith('.bin')) {
            entries.cdm = entries[name]
            delete entries[name]
          }
        }
      }
      this.__decodeData(entries)
    })
  }

  /**
   * The isStream method.
   * @return {boolean} - The return value.
   */
  isStream() {
    return false
  }

  /**
   * The isLoaded method.
   * @return {any} - The return value.
   */
  isLoaded() {
    return this.__loaded
  }

  /**
   * The getParams method.
   * @return {any} - The return value.
   */
  getParams() {
    const params = super.getParams()
    if (this.__loaded) {
      params['data'] = this.__data
      params['exposure'] = this.__exposure
    }
    return params
  }

  /**
   * The setHDRTint method.
   * @param {any} hdrtint - The hdrtint param.
   */
  setHDRTint(hdrtint) {
    this.__hdrtint = hdrtint
  }

  /**
   * The getHDRTint method.
   * @return {any} - The return value.
   */
  getHDRTint() {
    return this.__hdrtint
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The fromJSON method.
   * @param {object} json - The json param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  fromJSON(json, context, flags) {}

  /**
   * The toJSON method.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  toJSON(context, flags) {}

  /**
   * The readBinary method.
   * @param {object} reader - The reader param.
   * @param {object} context - The context param.
   */
  readBinary(reader, context) {
    // super.readBinary(reader, context);
    this.setName(reader.loadStr())
    const resourcePath = reader.loadStr()
    if (typeof resourcePath === 'string' && resourcePath != '') {
      if (context.lod >= 0) {
        const suffixSt = resourcePath.lastIndexOf('.')
        if (suffixSt != -1) {
          const lodPath =
            resourcePath.substring(0, suffixSt) +
            context.lod +
            resourcePath.substring(suffixSt)
          if (resourceLoader.resourceAvailable(lodPath)) {
            resourcePath = lodPath
          }
        }
      }
      this.getParameter('FilePath').setValue(resourcePath)
    }
  }
}

sgFactory.registerClass('VLHImage', VLHImage)

export { VLHImage }
