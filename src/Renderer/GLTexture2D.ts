import { BaseImage, RefCounted } from '../SceneTree/index'
import { ResizedEvent } from '../Utilities/Events/ResizedEvent'
import { MathFunctions } from '../Utilities/MathFunctions'
import { processTextureParams } from './processTextureParams'
import { Uniform, Uniforms, RenderState } from './types/renderer'
import { WebGL12RenderingContext } from './types/webgl'

/**
 * Represents a texture that contains 2-dimensional images.
 * Images have width and height, but no depth.
 *
 * @extends RefCounted
 */
class GLTexture2D extends RefCounted {
  protected __gl: WebGL12RenderingContext
  protected ready: boolean
  width: number
  height: number
  protected textureType: number
  protected textureDesc: number[]
  protected __loaded: boolean
  protected __bound: boolean

  protected __image: BaseImage | null = null
  protected __internalFormat: number = 0
  protected __type: number = 0
  protected __format: number = 0
  protected __wrapParam: number = 0

  protected params: Record<string, any> = {}
  protected __minFilter: number = 0
  protected __magFilter: number = 0
  protected __wrapS: number = 0
  protected __wrapT: number = 0
  protected __flipY: boolean = false
  protected __mipMapped: boolean = false
  invert: boolean = false
  alphaFromLuminance: boolean = false

  protected __gltex: WebGLTexture | null = null
  protected __typeParam: string = ''
  protected __formatParam: string = ''
  /**
   * Create a GL texture 2D.
   *
   * @param gl - The gl value.
   * @param params - The params value.
   */
  constructor(gl: WebGL12RenderingContext, params?: BaseImage | Record<string, any>) {
    super()
    this.__gl = gl

    this.ready = false

    this.width = 0
    this.height = 0
    this.textureType = 1 // Default 2d 24bit texture image texture. No alpha.
    this.textureDesc = [0, 0, 0, 0] // To be populated by derived classes.
    this.__loaded = false
    this.__bound = false
    if (params != undefined) {
      if (params instanceof BaseImage) {
        this.__image = params
        this.__image.setMetadata('gltexture', this)
        const imageUpdated = () => {
          // this.bufferData(data);
          const params = this.__image!.getParams()
          const width = params.width
          const height = params.height
          const data = params.data
          this.bufferData(data, width, height)
        }
        this.__image.on('updated', imageUpdated)
        if (this.__image.isLoaded()) {
          this.configure(this.__image.getParams())
        } else {
          this.__image.on('loaded', () => {
            this.configure(this.__image!.getParams())
          })
        }
      } else {
        this.configure(params)
      }
    }
  }

  /**
   * Returns the loaded status of the 2D Texture
   *
   * @return - The return value.
   */
  isLoaded(): boolean {
    return this.__loaded
  }

  /**
   * Returns the `BaseImage` of the GL Texture
   *
   * @return - The return value.
   */
  getImage(): BaseImage | null {
    return this.__image
  }

  /**
   * Returns the specified value of the color components in the texture.
   *
   * @return - The return value.
   */
  getInternalFormat(): number {
    return this.__internalFormat
  }

  /**
   * Returns the value of the specified data type of the texel data.
   *
   * @return - The return value.
   */
  getType(): number {
    return this.__type
  }

  /**
   * Returns the value of the specified texel data. It must be the same as the `internalFormat`
   *
   * @return - The return value.
   */
  getFormat(): number {
    return this.__format
  }

  /**
   * Returns the value of the specified wrapping function for texture coordinate
   *
   * @return - The return value.
   */
  getWrap(): number {
    return this.__wrapParam
  }

  /**
   * Returns the value of the specified binding point.
   *
   * @return - The return value.
   */
  getMipMapped() {
    return this.__mipMapped
  }

  /**
   * Builds the GLTexture2D using the specified parameters object.
   * Parameters must have the `BaseImage` properties structure.
   *
   * @param params - The params value.
   *
   * @param emit - The emit value.
   */
  configure(params: Record<string, any>) {
    const gl = this.__gl
    const p: Record<string, any> = processTextureParams(gl, params) // TODO: check method

    this.params = p
    this.__format = p.format
    this.__internalFormat = p.internalFormat
    this.__type = p.type

    this.__minFilter = p.minFilter
    this.__magFilter = p.magFilter
    this.__wrapS = p.wrapS
    this.__wrapT = p.wrapT
    this.__flipY = 'flipY' in params ? params.flipY : false
    this.__mipMapped = 'mipMapped' in params ? params.mipMapped : false
    this.invert = 'invert' in params ? params.invert : false
    this.alphaFromLuminance = 'alphaFromLuminance' in params ? params.alphaFromLuminance : false

    this.textureType = 1 // Default 2d 8 bit texture image texture.
    this.textureDesc[0] = this.width
    this.textureDesc[1] = this.height
    // Detect an 8 bit image with an alpha channel.
    if (this.textureType == 1 && this.__format == gl.RGBA) {
      this.textureType = 2 // 32bit BPP image.
    }

    if (this.__gltex) {
      gl.deleteTexture(this.__gltex)
    }

    this.__gltex = gl.createTexture()
    this.__updateGLTexParams()

    const width = p.width
    const height = p.height
    const data = params.data
    if (data) {
      this.bufferData(data, width, height, false, false)
    } else {
      this.resize(width, height, false, false)
    }
    if (!this.__loaded) {
      this.emit('ready')
      this.__loaded = true
    }
  }

  /**
   * The __updateGLTexParams method.
   * @private
   */
  __updateGLTexParams() {
    const gl = this.__gl

    // Load the image into the GPU for rendering.
    gl.bindTexture(gl.TEXTURE_2D, this.__gltex)

    // This parameter caused all images to be blank. Flipping in the pixel shader instead(by default)
    // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.__minFilter)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.__magFilter)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.__wrapS)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.__wrapT)
  }

  /**
   * Initializes and creates the buffer of the object's data store.
   *
   * @param data - The data value.
   * @param width - The width value.
   * @param height - The height value.
   * @param bind - The bind value.
   * @param emit - The emit value.
   */

  // TODO: type Image doesn't exist.
  bufferData(
    data:
      | HTMLImageElement
      | ImageData
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | Uint8Array
      | Uint8ClampedArray
      | Uint16Array
      | Float32Array
      | WebGLTexture,
    width = -1,
    height = -1,
    bind = true,
    emit = true
  ) {
    const gl = this.__gl
    if (data != undefined) {
      if (data instanceof WebGLTexture) {
        this.__gltex = data
      } else if (
        data instanceof HTMLImageElement ||
        data instanceof ImageData ||
        data instanceof HTMLCanvasElement ||
        data instanceof HTMLImageElement ||
        data instanceof HTMLVideoElement
      ) {
        if (bind) {
          gl.bindTexture(gl.TEXTURE_2D, this.__gltex)
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, this.__format, this.__type, data)
        this.width = data.width
        this.height = data.height
      } else {
        // if wieght and height not specified, assume they stay the same.
        if (width == -1) {
          width = this.width
        }
        if (height == -1) {
          height = this.height
        }
        // Note: data images must have an even size width/height to load correctly.
        // this doesn't mean they must be pot textures...
        const numPixels = width * height
        let numChannels
        switch (this.__format) {
          case gl.RED:
          case gl.RED_INTEGER:
          case gl.ALPHA:
          case gl.LUMINANCE:
          case gl.LUMINANCE_ALPHA:
            numChannels = 1
            break
          case gl.RG:
            numChannels = 2
            // Note: when uploading UNSIGNED_BYTE  RG textures, I received the following error: ArrayBuffer not big enough for request
            // This answer on stack overflow lead me to this fix.
            // https://stackoverflow.com/questions/42789896/webgl-error-arraybuffer-not-big-enough-for-request-in-case-of-gl-luminance
            // The same fix maybe need to be applied to single channel textures above, although I have not seen the error.
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 2)
            break
          case gl.RGB:
            numChannels = 3
            break
          case gl.RGBA:
            numChannels = 4
            break
          default:
            console.warn('Reaching default case: numChannels:=1')
            numChannels = 1
            break
        }
        if (data.length != numPixels * numChannels) {
          console.warn(
            'Invalid data for Image width:' +
              width +
              ' height:' +
              height +
              ' format:' +
              this.__formatParam +
              ' type:' +
              this.__typeParam +
              ' Data Length:' +
              data.length +
              ' Expected:' +
              numPixels * numChannels
          )
        }
        let uploadData = data
        if (this.__type == gl.HALF_FLOAT && data instanceof Float32Array) {
          uploadData = MathFunctions.convertFloat32ArrayToUInt16Array(data)
        }
        if (bind) {
          gl.bindTexture(gl.TEXTURE_2D, this.__gltex)
        }
        if (gl.name == 'webgl2') {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            this.__internalFormat,
            width,
            height,
            0,
            this.__format,
            this.__type,
            uploadData,
            0
          )
        } else {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            this.__internalFormat,
            width,
            height,
            0,
            this.__format,
            this.__type,
            uploadData
          )
        }
        // These values may not have changed....
        this.width = width
        this.height = height
      }

      if (this.__mipMapped) {
        gl.generateMipmap(gl.TEXTURE_2D)
      }
    } else {
      if (bind) {
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex)
      }
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        this.__internalFormat,
        this.width,
        this.height,
        0,
        this.__format,
        this.__type,
        null
      )

      // simply resize the buffer.
      this.width = width
      this.height = height
    }

    if (emit) {
      this.emit('updated')
    }
  }

  /**
   * Clears the buffers to preset values
   */
  clear() {
    const gl = this.__gl
    const numPixels = this.width * this.height
    let numChannels
    switch (this.__format) {
      case gl.RED:
      case gl.RED_INTEGER:
      case gl.ALPHA:
      case gl.LUMINANCE:
      case gl.LUMINANCE_ALPHA:
        numChannels = 1
        break
      case gl.RG:
        numChannels = 2
        break
      case gl.RGB:
        numChannels = 3
        break
      case gl.RGBA:
        numChannels = 4
        break
      default:
        throw new Error('Invalid Format')
    }
    let data
    switch (this.__type) {
      case gl.UNSIGNED_BYTE:
        data = new Uint8Array(numPixels * numChannels)
        break
      case gl.HALF_FLOAT:
        data = new Uint16Array(numPixels * numChannels)
        break
      case gl.FLOAT:
        data = new Float32Array(numPixels * numChannels)
        break
      default:
        throw new Error('Invalid Type')
    }

    if (gl.name == 'webgl2') {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        this.__internalFormat,
        this.width,
        this.height,
        0,
        this.__format,
        this.__type,
        data,
        0
      )
    } else {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        this.__internalFormat,
        this.width,
        this.height,
        0,
        this.__format,
        this.__type,
        data
      )
    }
  }

  /**
   * The resize method.
   * @param width - The width value.
   * @param height - The height value.
   * @param preserveData - The preserveData value.
   * @param emit - The emit value.
   */
  resize(width: number, height: number, preserveData = false, emit = true) {
    const gl = this.__gl
    const sizeChanged = this.width != width || this.height != height
    if (sizeChanged) {
      const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      if (width < 0 || width > maxSize || height < 0 || height > maxSize) {
        throw new Error(
          'gl-texture2d: Invalid texture size. width:' + width + ' height:' + height + ' maxSize:' + maxSize
        )
      }

      if (preserveData) {
        const gltex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, gltex)
        gl.texImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, width, height, 0, this.__format, this.__type, null)
        const fbo = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__gltex, 0)

        gl.bindTexture(gl.TEXTURE_2D, gltex) // Do we need this line?
        gl.copyTexImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, 0, 0, this.width, this.height, 0)

        gl.bindFramebuffer(gl.FRAMEBUFFER, null)

        gl.deleteFramebuffer(fbo)

        this.__gl.deleteTexture(this.__gltex)
        this.__gltex = gltex
        this.__updateGLTexParams()
      } else {
        if (this.width > 0 && this.height > 0) {
          // this destroys the texture. I am sure this is a memory leak here, but can't figure out what to do to fix it.
          // this.__gl.deleteTexture(this.__gltex)
          // this.__gltex = gl.createTexture()
        }
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex)
        gl.texImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, width, height, 0, this.__format, this.__type, null)
      }

      this.width = width
      this.height = height

      if (emit) {
        const event = new ResizedEvent(width, height)
        this.emit('resized', event)
      }
    }
  }

  /**
   * Upload data for the image to the GPU.
   *
   * @param dataArray - The dataArray value.
   * @param width - The width value
   * @param height - The height value
   * @param offsetX - The offsetX value
   * @param offsetY - The offsetY value
   * @param bind - The bind value
   */
  populate(
    dataArray: Uint16Array | Float32Array,
    width: number,
    height: number,
    offsetX = 0,
    offsetY = 0,
    bind = true
  ) {
    const gl = this.__gl
    if (bind) gl.bindTexture(gl.TEXTURE_2D, this.__gltex)
    gl.texSubImage2D(gl.TEXTURE_2D, 0, offsetX, offsetY, width, height, this.__format, this.__type, dataArray)
  }

  /**
   * Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.
   *
   * @return - The return value.
   */
  getSize(): number[] {
    return [this.width, this.height]
  }

  /**
   * Returns the value of the WebGLTexture value
   *
   * @return - The return value.
   */
  get glTex(): WebGLTexture | null {
    return this.__gltex
  }

  /**
   * Returns the value of the WebGLTexture value
   *
   * @return - The return value.
   */
  getTexHdl(): WebGLTexture | null {
    return this.__gltex
  }

  /**
   * The preBind method.
   * @param unif - The unif value.
   * @param unifs - The unifs value.
   * @return - The return value.
   */
  preBind(unif: Uniform, unifs: Uniforms): Record<string, Uniform> {
    return {
      textureTypeUnif: unifs[unif.name + 'Type'],
      textureDescUnif: unifs[unif.name + 'Desc'],
    }
  }

  /**
   * Binds Texture to the Uniform attribute.
   *
   * @param renderstate - The renderstate value.
   * @param unif - The unif value.
   * @param bindings - The bindings value.
   * @return - The return value.
   */
  bindToUniform(renderstate: RenderState, unif: Uniform, bindings?: Record<string, any>) {
    if (!this.__loaded) {
      return false
    }
    if (!this.__gltex) {
      throw new Error('Unable to bind non-initialized or deleted texture.')
    }

    const unit = renderstate.boundTextures++
    const gl = this.__gl
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, this.__gltex)
    gl.uniform1i(unif.location, unit)

    if (bindings) {
      if (bindings.textureTypeUnif) {
        gl.uniform1i(bindings.textureTypeUnif.location, this.textureType)
      }

      if (bindings.textureDescUnif) {
        gl.uniform4fv(bindings.textureDescUnif.location, this.textureDesc)
      }
    }

    return true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
    if (this.__image) {
      this.__image.setMetadata('gltexture', undefined)
    }
    this.__gl.deleteTexture(this.__gltex)
    this.__gltex = null
  }
}

export { GLTexture2D }
