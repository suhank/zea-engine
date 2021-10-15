import { GLTexture2D } from '../GLTexture2D'
import { GLHDRImage } from '../GLHDRImage'
import { Mat4 } from '../../Math/Mat4'
import { Parameter, MaterialFloatParam, BaseImage, VLHImage, MaterialColorParam } from '../../SceneTree'
import { GLMaterial } from '.'

/** Class representing simple uniform binding.
 * @private
 */
class SimpleUniformBinding {
  protected param: Parameter<any>
  protected unif: Uniform
  protected textureUnif: Uniform
  protected textureTypeUnif: Uniform
  protected uniform1i: any
  protected uniformXX: any
  protected bind: any
  protected texBinding: any
  protected gltexture: GLTexture2D | null = null
  protected textureType: number = -1

  protected update: any
  protected dirty: any
  protected val: any
  /**
   * Create simple uniform binding.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {any} glMaterial - The glMaterial value.
   * @param {any} param - The param value.
   * @param {WebGLUniformLocation} unif - The WebGL uniform
   * @param {Uniforms} unifs - The dictionary of WebGL uniforms.
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, param: any, unif: Uniform, unifs: Uniforms) {
    const name = param.getName()
    this.param = param
    this.unif = unif
    this.textureUnif = unifs[name + 'Tex']
    this.textureTypeUnif = unifs[name + 'TexType']
    this.uniform1i = gl.uniform1i.bind(gl)

    switch (this.unif.type) {
      case 'Boolean':
        // gl.uniform1ui(unif.location, value);// WebGL 2
        this.uniformXX = gl.uniform1i.bind(gl)
        break
      case 'UInt32':
        if (gl.name == 'webgl2') this.uniformXX = gl.uniform1ui.bind(gl)
        else this.uniformXX = gl.uniform1i.bind(gl)
        break
      case 'SInt32':
        this.uniformXX = gl.uniform1i.bind(gl)
        break
      case 'Float32':
        this.uniformXX = gl.uniform1f.bind(gl)
        break
    }

    this.bind = this.bindValue

    const genGLTex = (image: BaseImage) => {
      let gltexture = <GLTexture2D>image.getMetadata('gltexture')
      const textureType = 1
      if (!gltexture) {
        if (image.type === 'FLOAT') {
          gltexture = new GLHDRImage(gl, <VLHImage>image)
        } else {
          gltexture = new GLTexture2D(gl, image)
        }
      }
      this.texBinding = gltexture.preBind(this.textureUnif, unifs)
      gltexture.on('updated', () => {
        glMaterial.emit('updated')
      })
      this.gltexture = gltexture
      this.gltexture.addRef(this)
      this.textureType = textureType
      this.bind = this.bindTexture
      glMaterial.emit('updated')
    }

    let boundImage: any
    let imageLoaded: any

    this.update = () => {
      try {
        // Sometimes the value of a color param is an image.
        if (boundImage) {
        } else {
          this.val = param.getValue()
        }
      } catch (e) {}
      glMaterial.emit('updated')
    }

    /**
     * The update method.
     */
    if (param instanceof MaterialFloatParam) {
      const connectImage = (image: any) => {
        if (!image.isLoaded()) {
          imageLoaded = () => {
            genGLTex(boundImage)
          }
          image.on('loaded', imageLoaded)
        } else {
          genGLTex(image)
        }
        boundImage = image
      }

      const disconnectImage = () => {
        const gltexture = boundImage.getMetadata('gltexture')
        gltexture.removeRef(this)
        this.texBinding = null
        this.gltexture = null
        this.textureType = -1
        this.bind = this.bindValue

        if (imageLoaded) {
          boundImage.off('loaded', imageLoaded)
        }
        boundImage = null
        imageLoaded = null
        glMaterial.emit('updated')
      }

      if (param.getImage()) connectImage(param.getImage())
      param.on('textureConnected', () => {
        connectImage(param.getImage())
      })
      param.on('textureDisconnected', () => {
        disconnectImage()
      })
    }

    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glMaterial.emit('updated')
    })
  }

  /**
   * The bindValue method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  bindValue(renderstate: RenderState) {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    if (this.unif) this.uniformXX(this.unif.location, this.val)
    if (this.textureTypeUnif) this.uniform1i(this.textureTypeUnif.location, 0)
  }

  /**
   * The bindTexture method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  bindTexture(renderstate: RenderState) {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    this.gltexture!.bindToUniform(renderstate, this.textureUnif, this.texBinding)
  }

  /**
   * The unbind method.
   */
  unbind() {}

  /**
   * The destroy method.
   */
  destroy() {}
}

/** Class representing complex uniform binding.
 * @private
 */
class ComplexUniformBinding {
  protected param: any
  protected unif: Uniform
  protected dirty: any
  protected uniformXX: any
  protected vals: any
  /**
   * Create complex uniform binding.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {any} glMaterial - The glMaterial value.
   * @param {any} param - The param value.
   * @param {Uniform} unif - The WebGL uniform
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, param: any, unif: Uniform) {
    this.param = param
    this.unif = unif

    switch (this.unif.type) {
      case 'Vec2':
        this.uniformXX = gl.uniform2fv.bind(gl)
        break
      case 'Vec3':
        this.uniformXX = gl.uniform3fv.bind(gl)
        break
      case 'Vec4':
        this.uniformXX = gl.uniform4fv.bind(gl)
        break
    }
    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glMaterial.emit('updated')
    })
  }

  /**
   * The bind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate: RenderState) {
    if (this.dirty) {
      this.vals = this.param.getValue().asArray()
      this.dirty = false
    }
    this.uniformXX(this.unif.location, this.vals)
  }

  /**
   * The unbind method.
   */
  unbind() {}

  /**
   * The destroy method.
   */
  destroy() {}
}

/** Class representing material uniform binding.
 * @private
 */
class MatrixUniformBinding {
  protected param: any
  protected unif: Uniform
  protected uniformMatrixXXX: any
  protected dirty: boolean = false
  protected vals: Float32Array = new Float32Array(0)
  protected val: any
  /**
   * Create material uniform binding.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {any} glMaterial - The glMaterial value.
   * @param {any} param - The param value.
   * @param {WebGLUniformLocation} unif - The WebGL uniform
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, param: any, unif: Uniform) {
    this.param = param
    this.unif = unif

    switch (this.unif.type) {
      case 'Mat3':
        this.uniformMatrixXXX = gl.uniformMatrix3fv.bind(gl)
        break
      case 'Mat4':
        this.uniformMatrixXXX = gl.uniformMatrix4fv.bind(gl)
        break
    }

    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glMaterial.emit('updated')
    })
  }

  /**
   * The bind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate: RenderState) {
    if (this.dirty) {
      this.vals = (<Mat4>this.param.getValue()).asArray()
      this.dirty = false
    }
    this.uniformMatrixXXX(this.unif.location, false, this.val)
  }

  /**
   * The unbind method.
   */
  unbind() {}

  /**
   * The destroy method.
   */
  destroy() {}
}

/** Class representing color uniform binding.
 * @private
 */
class ColorUniformBinding {
  protected param: MaterialColorParam
  protected unif: Uniform
  protected textureUnif: Uniform
  protected textureTypeUnif: any
  protected vals: Float32Array
  protected bind: any
  protected gltexture!: GLTexture2D
  protected textureType: any
  protected texBinding: any
  protected update: any
  protected dirty: boolean = false
  protected uniform1i: any
  protected uniform4fv: any
  /**
   * Create color uniform binding.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {GLMaterial} glMaterial - The glMaterial value.
   * @param {MaterialColorParam} param - The param value.
   * @param {Uniform} unif - The WebGL uniform
   * @param {Uniforms} unifs - The dictionary of WebGL uniforms.
   */
  constructor(
    gl: WebGL12RenderingContext,
    glMaterial: GLMaterial,
    param: MaterialColorParam,
    unif: Uniform,
    unifs: Uniforms
  ) {
    const name = param.getName()
    this.param = param
    this.unif = unif
    this.textureUnif = unifs[name + 'Tex']
    this.textureTypeUnif = unifs[name + 'TexType']

    this.vals = Float32Array.from([0, 0, 0, 0])
    this.bind = this.bindValue

    const genGLTex = (image: any) => {
      boundImage = image
      let gltexture = image.getMetadata('gltexture')
      const textureType = 1
      if (!gltexture) {
        if (image.type === 'FLOAT') {
          gltexture = new GLHDRImage(gl, image)
        } else {
          gltexture = new GLTexture2D(gl, image)
        }
      }
      this.texBinding = gltexture.preBind(this.textureUnif, unifs)
      gltexture.on('updated', () => {
        glMaterial.emit('updated')
      })
      this.gltexture = gltexture
      this.gltexture.addRef(this)
      this.textureType = textureType
      this.bind = this.bindTexture
      glMaterial.emit('updated')
    }

    let boundImage: any
    let imageLoaded: any
    const connectImage = (image: any) => {
      if (!image.isLoaded()) {
        imageLoaded = () => {
          genGLTex(image)
        }
        image.once('loaded', imageLoaded)
      } else {
        genGLTex(image)
      }
    }

    const disconnectImage = () => {
      this.gltexture.removeRef(this)
      this.gltexture = null
      this.texBinding = null
      this.textureType = null
      this.bind = this.bindValue
      boundImage = null
      imageLoaded = null
      glMaterial.emit('updated')
    }

    this.update = () => {
      try {
        // Sometimes the value of a color param is an image.
        if (boundImage) {
        } else if (this.unif) {
          this.vals = param.getValue().asArray()
        }
      } catch (e) {}
      glMaterial.emit('updated')
    }

    /**
     * The update method.
     */
    if (param.getImage()) connectImage(param.getImage())
    param.on('textureConnected', () => {
      connectImage(param.getImage())
    })
    param.on('textureDisconnected', () => {
      disconnectImage()
    })

    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
    })

    this.uniform1i = gl.uniform1i.bind(gl)
    this.uniform4fv = gl.uniform4fv.bind(gl)
  }

  /**
   * The bindValue method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  bindValue(renderstate?: RenderState) {
    if (!this.unif) return // Note: Normals parms have no unif and can only be bound to a texture.
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    if (this.unif) this.uniform4fv(this.unif.location, this.vals)
    if (this.textureTypeUnif) this.uniform1i(this.textureTypeUnif.location, 0)
  }

  /**
   * The bindTexture method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  bindTexture(renderstate: RenderState) {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    this.gltexture.bindToUniform(renderstate, this.textureUnif, this.texBinding)
  }
}

const logged: { [key: string]: { [key: string]: boolean } } = {}

/** Class representing material shader binding.
 * @private
 */
class MaterialShaderBinding {
  protected uniformBindings: any
  /**
   * Create material shader binding.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {GLMaterial} glMaterial - The glMaterial value.
   * @param {Uniforms} unifs - The dictionary of WebGL uniforms.
   * @param {any} warnMissingUnifs - The warnMissingUnifs value.
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, unifs: Uniforms, warnMissingUnifs: any) {
    this.uniformBindings = []

    const bindParam = (param: any) => {
      const name = param.getName()
      const unif = unifs[name]
      if (unif == undefined) {
        const textureUnif = unifs[name + 'Tex']
        if (textureUnif) {
          this.uniformBindings.push(new ColorUniformBinding(gl, glMaterial, param, unif, unifs))
          return
        }

        // Note: we now bind the Material even for rendering geom datas,
        // which can mean many params have no uniform in the shader, which is fine.
        if (warnMissingUnifs) {
          // Note: this silent error caused me a lot of searching. make it noisy.
          const shaderName = glMaterial.getMaterial().getShaderName()
          if (!logged[shaderName]) {
            logged[shaderName] = {}
          }
          if (!logged[shaderName][name]) {
            // TODO: Many of these warnings are because when we change shaders
            // we do not remove obsolete params, but we probably should.
            console.warn(
              'Material:' + glMaterial.getMaterial().getName(),
              'with Shader ',
              shaderName,
              'Param has no unif',
              name
            )
            logged[shaderName][name] = true
          }
        }
        return
      }
      switch (unif.type) {
        case 'Boolean':
        case 'UInt32':
        case 'SInt32':
        case 'Float32':
          this.uniformBindings.push(new SimpleUniformBinding(gl, glMaterial, param, unif, unifs))
          break
        case 'Vec2':
        case 'Vec3':
        case 'Vec4':
          this.uniformBindings.push(new ComplexUniformBinding(gl, glMaterial, param, unif))
          break
        case 'Color':
          this.uniformBindings.push(new ColorUniformBinding(gl, glMaterial, param, unif, unifs))
          break
        case 'Mat4':
          this.uniformBindings.push(new MatrixUniformBinding(gl, glMaterial, param, unif))
          break
        default:
          console.warn('Param :' + name + ' has unhandled data type:' + unif.type)
          return
      }
      return
    }
    const params = glMaterial.getMaterial().getParameters()
    for (const param of params) {
      bindParam(param)
    }
  }

  /**
   * The bind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @return {boolean} - The return value.
   */
  bind(renderstate: RenderState) {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.bind(renderstate)
    }
    return true
  }

  /**
   * The unbind method.
   */
  unbind(renderstate: RenderState) {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.unbind(renderstate)
    }
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(renderstate: RenderState) {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.destroy(renderstate)
    }
  }
}

export { MaterialShaderBinding }
