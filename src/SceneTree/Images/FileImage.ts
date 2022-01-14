import { ImageParams } from '..'
import { Registry } from '../../Registry'
import { AssetLoadContext } from '../AssetLoadContext'
import { BaseImage } from '../BaseImage'
import { BinReader } from '../BinReader'

// Cache of any images already loaded.
const imageDataLibrary: Record<string, HTMLImageElement> = {}

/** Class representing a file image.
 * @extends BaseImage
 */
class FileImage extends BaseImage {
  crossOrigin: string
  url: string
  protected __data: HTMLImageElement | null = null

  /**
   * Create a file image.
   * @param name - The name value.
   * @param filePath - The filePath value.
   * @param params - The params value.
   */
  constructor(name?: string, filePath: string = '', params: Record<string, any> = {}) {
    super(name)
    this.type = 'UNSIGNED_BYTE'
    this.crossOrigin = 'anonymous'
    if (filePath && filePath != '') this.load(filePath)
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
   * @param crossOrigin - The crossOrigin value.
   */
  setCrossOrigin(crossOrigin: string): void {
    this.crossOrigin = crossOrigin
  }

  /**
   * Returns the HTML DOM element used to load the image file.
   * Be
   * @returns { HTMLImageElement | null }
   */
  getDOMElement(): HTMLImageElement | null {
    return this.__data
  }

  /**
   * Uses the specify url to load an Image element and adds it to the data library.
   * Sets the state of the current object.
   *
   * @param url - The url value.
   * @param format - The format value.
   * @return Returns a promise that resolves once the image is loaded.
   */
  load(url: string, format = 'RGB'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!format) {
        // Try to guess the format from the
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
      this.loaded = false

      const loaded = () => {
        this.url = url
        this.width = this.__data.width
        this.height = this.__data.height
        this.loaded = true
        this.emit('loaded')
        resolve()
      }

      if (url in imageDataLibrary) {
        this.__data = imageDataLibrary[url]
        if (this.__data.complete) {
          loaded()
        } else {
          this.__data.addEventListener('load', loaded)
          this.__data.addEventListener('error', reject)
        }
      } else {
        this.__data = new Image()
        this.__data.crossOrigin = this.crossOrigin
        this.__data.src = url

        this.__data.addEventListener('load', loaded)
        this.__data.addEventListener('error', reject)
        imageDataLibrary[url] = this.__data
      }
    })
  }

  /**
   * Loads in Image file using the given URL
   *
   * @param url - The url value.
   * @param format - The format value. Can be 'RGB' or 'RGBA' for files that contain an alpha channel. This will cause objects to be drawn using the Transparent pass.
   */
  setImageURL(url: string, format: string = 'RGB'): void {
    this.load(url, format)
  }

  /**
   * The getParams method.
   * @return - The return value.
   */
  getParams(): ImageParams {
    const params = super.getParams()
    if (this.loaded) {
      params['data'] = this.__data
    }
    return params
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The readBinary method.
   * @param reader - The reader param.
   * @param context - The context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    // super.readBinary(reader, context);
    this.setName(reader.loadStr())

    const filePath = reader.loadStr()
    if (typeof filePath === 'string' && filePath != '') {
      const basePath = context.url.substring(0, context.url.lastIndexOf('/'))
      this.load(basePath + '/' + filePath)
    }
  }
}

/** Class representing a 2D file image.
 * @extends FileImage
 */
class FileImage2D extends FileImage {
  /**
   * Create a file image 2D.
   * @param filePath - The filePath value.
   * @param params - The params value.
   */
  constructor(filePath: string, params: any = {}) {
    console.warn('FileImage2D is becoming deprecated in favor of simple FileImage')
    super(filePath, params)
  }
}

Registry.register('FileImage2D', FileImage)
Registry.register('FileImage', FileImage)

export { FileImage, FileImage2D }
