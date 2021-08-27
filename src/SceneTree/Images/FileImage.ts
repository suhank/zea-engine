import { Registry } from '../../Registry'
import { BaseImage } from '../BaseImage'

import { resourceLoader } from '../resourceLoader'

import { FilePathParameter } from '../Parameters/FilePathParameter'
import { BinReader } from '../BinReader'

const imageDataLibrary = {}

/** Class representing a file image.
 * @extends BaseImage
 */
class FileImage extends BaseImage {
  __loaded: any
  __crossOrigin: any
  url: any
  __data: any

  getDOMElement: any
  /**
   * Create a file image.
   * @param {string} name - The name value.
   * @param {string} filePath - The filePath value.
   * @param {Record<any,any>} params - The params value.
   */
  constructor(name?: string, filePath: string = '', params: Record<string, any> = {}) {
    if (filePath.constructor == Object) {
      params = { filePath }
    }
    if (name != undefined && name.includes('.')) {
      console.warn('Deprecated signature. Please provide a name and filepath to the image constructor')
      name = name.substring(name.lastIndexOf('/') + 1, name.lastIndexOf('.'))
    }

    super(name) // used to be: super(name, params)

    this.type = 'UNSIGNED_BYTE'
    this.__crossOrigin = 'anonymous'
    this.__loaded = false

    const fileParam = <FilePathParameter>this.addParameter(new FilePathParameter('FilePath'))
    fileParam.on('valueChanged', () => {
      this.loaded = false
      if (this.getName() == '') {
        // Generate a name from the file path.
        const stem = fileParam.getStem()
        if (!stem) {
          console.warn('no fileName found')
          return
        }
        const decorator: any = stem.substring(stem.length - 1) // TODO: check output
        if (!isNaN(decorator)) {
          // Note: ALL image names have an LOD specifier at the end.
          // remove that off when retrieving the name.
          this.setName(stem.substring(0, stem.length - 1))
        } else {
          this.setName(stem)
        }
      }

      if (fileParam.getValue()) {
        const url = fileParam.getUrl()
        this.load(url)
      }
    })

    if (filePath && filePath != '') fileParam.setFilepath(filePath)
  }

  /**
   * The __imageDataLibrary method.
   * @return {any} - The return value.
   * @private
   */
  static __imageDataLibrary() {
    return imageDataLibrary
  }

  /**
   * Defines how to handle cross origin request.
   *
   * **Possible values:**
   * * **anonymous** - CORS requests for this element will have the credentials flag set to 'same-origin'.
   * * **use-credentials** - CORS requests for this element will have the credentials flag set to 'include'.
   * * **""** - Setting the attribute name to an empty value, like crossorigin or crossorigin="", is the same as anonymous.
   *
   * @default anonymous
   * @param {string} crossOrigin - The crossOrigin value.
   */
  setCrossOrigin(crossOrigin: string) {
    this.__crossOrigin = crossOrigin
  }

  /**
   * Uses the specify url to load an Image element and adds it to the data library.
   * Sets the state of the current object.
   *
   * @param {string} url - The url value.
   * @param {string} format - The format value.
   * @return {Promise} Returns a promise that resolves once the image is loaded.
   */
  load(url: string, format = 'RGB') {
    return new Promise((resolve, reject) => {
      if (!format) {
        const suffixSt = url.lastIndexOf('.')
        if (suffixSt != -1) {
          const ext = url.substring(suffixSt).toLowerCase()
          if (ext == '.png') {
            // TODO: Check webp for alpha channel..
            format = 'RGBA'
          }
        }
      }
      this.format = format
      this.__loaded = false

      let imageElem: any
      const loaded = () => {
        this.getDOMElement = () => {
          return imageElem
        }
        this.url = url
        this.width = imageElem.width
        this.height = imageElem.height
        this.__data = imageElem
        this.__loaded = true
        this.emit('loaded', {})
        // TODO: (commented out) resolve()
      }
      const imageDataLibrary = FileImage.__imageDataLibrary()
      if (url in imageDataLibrary) {
        imageElem = imageDataLibrary[url]
        if (imageElem.complete) {
          loaded()
        } else {
          imageElem.addEventListener('load', loaded)
        }
      } else {
        imageElem = new Image()
        imageElem.crossOrigin = this.__crossOrigin
        imageElem.src = url

        imageElem.addEventListener('load', loaded)
        imageDataLibrary[url] = imageElem
      }
    })
  }

  /**
   * Loads in Image file using the given URL
   *
   * @param {string} url - The url value.
   * @param {string} format - The format value. Can be 'RGB' or 'RGBA' for files that contain an alpha channel. This will cause objects to be drawn using the Transparent pass.
   */
  setImageURL(url: string, format: string = 'RGB') {
    this.load(url, format)
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
    }
    return params
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @param {Record<any,any>} context - The context value.
   */
  toJSON(context?: Record<string, any>) {
    return {}
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {Record<any,any>} json - The json object this item must decode.
   * @param {Record<any,any>} context - The context value.
   */
  fromJSON(json: Record<string, any>, context?: Record<string, any>) {}

  /**
   * The readBinary method.
   * @param {Record<any,any>} reader - The reader param.
   * @param {Record<any,any>} context - The context param.
   */
  readBinary(reader: BinReader, context: Record<string, any>) {
    // super.readBinary(reader, context);
    this.setName(reader.loadStr())

    let filePath = reader.loadStr()
    if (typeof filePath === 'string' && filePath != '') {
      if (context.lod >= 0) {
        const suffixSt = filePath.lastIndexOf('.')
        if (suffixSt != -1) {
          const lodPath = filePath.substring(0, suffixSt) + context.lod + filePath.substring(suffixSt)
          if (resourceLoader.resolveFilepath(lodPath)) {
            filePath = lodPath
          }
        }
      }
      ;(<FilePathParameter>this.getParameter('FilePath')).setFilepath(filePath)
    }
  }
}

/** Class representing a 2D file image.
 * @extends FileImage
 */
class FileImage2D extends FileImage {
  /**
   * Create a file image 2D.
   * @param {any} filePath - The filePath value.
   * @param {any} params - The params value.
   */
  constructor(filePath: any, params: any = {}) {
    console.warn('FileImage2D is becoming deprecated in favor of simple FileImage')
    super(filePath, params)
  }
}

Registry.register('FileImage2D', FileImage)
Registry.register('FileImage', FileImage)

export { FileImage, FileImage2D }
