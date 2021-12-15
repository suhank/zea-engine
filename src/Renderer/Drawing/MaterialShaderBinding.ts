import { GLTexture2D } from '../GLTexture2D'
import { GLHDRImage } from '../GLHDRImage'
import { Color, Vec2, Vec3, Vec4, Mat4 } from '../../Math'
import {
  Parameter,
  MaterialFloatParam,
  BaseImage,
  HDRImage,
  MaterialColorParam,
  Mat4Parameter,
  ColorParameter,
  NumberParameter,
  BooleanParameter,
} from '../../SceneTree'
import { GLMaterial } from '.'
import { BaseClass } from '../../Utilities/BaseClass'
import { Uniform, RenderState, Uniforms } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'

class ParamUniformBinding extends BaseClass {
  protected unif: Uniform
  protected dirty: boolean = false
  // bind: (renderstate?: RenderState) => void
  // unbind: (renderstate?: RenderState) => void
  // destroy: () => void
  constructor(unif: Uniform) {
    super()
    this.unif = unif
  }

  /**
   * The unbind method.
   */
  bind(renderstate?: RenderState): void {}

  /**
   * The unbind method.
   */
  unbind(renderstate?: RenderState): void {}

  /**
   * The destroy method.
   */
  destroy(): void {}
}

/** Class representing simple uniform binding.
 * @private
 */
class SimpleUniformBinding extends ParamUniformBinding {
  param: NumberParameter | BooleanParameter
  protected textureUnif: Uniform
  protected textureTypeUnif: Uniform
  protected texBinding: Record<string, Uniform>
  protected gltexture: GLTexture2D | null = null
  protected textureType: number = -1
  protected val: number

  protected uniform1i: (index: number, value: number) => void
  protected uniformXX: (index: number, value: number) => void
  protected update: () => void

  /**
   * Create simple uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   * @param unifs - The dictionary of WebGL uniforms.
   */
  constructor(
    gl: WebGL12RenderingContext,
    glMaterial: any,
    param: NumberParameter | BooleanParameter,
    unif: Uniform,
    unifs: Uniforms
  ) {
    super(unif)
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
          gltexture = new GLHDRImage(gl, <HDRImage>image)
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

    let boundImage: BaseImage
    let imageLoadedId: number

    this.update = () => {
      try {
        // Sometimes the value of a color param is an image.
        if (boundImage) {
        } else {
          if (typeof param.value == 'boolean') {
            this.val = param.value ? 1 : 0
          } else this.val = param.value
        }
      } catch (e) {}
      glMaterial.emit('updated')
    }

    /**
     * The update method.
     */
    if (param instanceof MaterialFloatParam) {
      const connectImage = (image: BaseImage) => {
        if (!image.isLoaded()) {
          imageLoadedId = image.on('loaded', () => {
            genGLTex(boundImage)
          })
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

        if (imageLoadedId) {
          boundImage.removeListenerById('loaded', imageLoadedId)
        }
        boundImage = null
        imageLoadedId = null
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
   * @param renderstate - The object tracking the current state of the renderer
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
   * @param renderstate - The object tracking the current state of the renderer
   */
  bindTexture(renderstate: RenderState) {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    this.gltexture!.bindToUniform(renderstate, this.textureUnif, this.texBinding)
  }
}

/** Class representing complex uniform binding.
 * @private
 */
class ComplexUniformBinding extends ParamUniformBinding {
  protected param: Parameter<Vec2> | Parameter<Vec3> | Parameter<Vec4> | Parameter<Color>
  protected values: Float32Array
  protected uniformXX: (index: number, value: Float32Array | number[]) => void
  /**
   * Create complex uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   */
  constructor(
    gl: WebGL12RenderingContext,
    glMaterial: any,
    param: Parameter<Vec2> | Parameter<Vec3> | Parameter<Vec4> | Parameter<Color>,
    unif: Uniform
  ) {
    super(unif)
    this.param = param

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
   * @param renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate: RenderState) {
    if (this.dirty) {
      this.values = <Float32Array>this.param.value.asArray()
      this.dirty = false
    }
    this.uniformXX(this.unif.location, this.values)
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
class MatrixUniformBinding extends ParamUniformBinding {
  protected param: Mat4Parameter
  protected uniformMatrixXXX: (index: number, transpose: boolean, value: Float32Array) => void
  protected values: Float32Array = new Float32Array(0)
  /**
   * Create material uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, param: any, unif: Uniform) {
    super(unif)
    this.param = param

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
   * @param renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate: RenderState) {
    if (this.dirty) {
      this.values = (<Mat4>this.param.value).asArray()
      this.dirty = false
    }
    this.uniformMatrixXXX(this.unif.location, false, this.values)
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
class ColorUniformBinding extends ParamUniformBinding {
  protected param: MaterialColorParam | ColorParameter
  protected unif: Uniform
  protected textureUnif: Uniform
  protected textureTypeUnif: Uniform
  protected values: Float32Array
  protected gltexture: GLTexture2D
  protected textureType: number
  protected texBinding: Record<string, Uniform>

  protected uniform1i: (index: number, value: number) => void
  protected uniform4fv: (index: number, value: Float32Array) => void
  protected update: () => void

  /**
   * Create color uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   * @param unifs - The dictionary of WebGL uniforms.
   */
  constructor(
    gl: WebGL12RenderingContext,
    glMaterial: GLMaterial,
    param: MaterialColorParam | ColorParameter,
    unif: Uniform,
    unifs: Uniforms
  ) {
    super(unif)
    const name = param.getName()
    this.param = param
    this.textureUnif = unifs[name + 'Tex']
    this.textureTypeUnif = unifs[name + 'TexType']

    this.values = Float32Array.from([0, 0, 0, 0])
    this.bind = this.bindValue

    const genGLTex = (image: BaseImage) => {
      boundImage = image
      let gltexture = <GLTexture2D>image.getMetadata('gltexture')
      const textureType = 1
      if (!gltexture) {
        if (image.type === 'FLOAT') {
          gltexture = new GLHDRImage(gl, <HDRImage>image)
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

    let boundImage: BaseImage
    let imageLoadedId: number
    const connectImage = (image: BaseImage) => {
      if (!image.isLoaded()) {
        imageLoadedId = image.once('loaded', () => {
          genGLTex(image)
        })
      } else {
        genGLTex(image)
      }
    }

    const disconnectImage = () => {
      this.gltexture.removeRef(this)
      this.gltexture = null
      this.texBinding = null
      this.textureType = null

      if (imageLoadedId) {
        boundImage.removeListenerById('loaded', imageLoadedId)
      }

      this.bind = this.bindValue
      boundImage = null
      imageLoadedId = null
      glMaterial.emit('updated')
    }

    this.update = () => {
      try {
        // Sometimes the value of a color param is an image.
        if (boundImage) {
        } else if (this.unif) {
          this.values = param.value.asArray()
        }
      } catch (e) {}
      glMaterial.emit('updated')
    }

    /**
     * The update method.
     */
    if (param instanceof MaterialColorParam) {
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
    })

    this.uniform1i = gl.uniform1i.bind(gl)
    this.uniform4fv = gl.uniform4fv.bind(gl)
  }

  /**
   * The bindValue method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bindValue(renderstate?: RenderState) {
    if (!this.unif) return // Note: Normals parms have no unif and can only be bound to a texture.
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    if (this.unif) this.uniform4fv(this.unif.location, this.values)
    if (this.textureTypeUnif) this.uniform1i(this.textureTypeUnif.location, 0)
  }

  /**
   * The bindTexture method.
   * @param renderstate - The object tracking the current state of the renderer
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
  protected uniformBindings: ParamUniformBinding[] = []
  /**
   * Create material shader binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param unifs - The dictionary of WebGL uniforms.
   * @param warnMissingUnifs - The warnMissingUnifs value.
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, unifs: Uniforms, warnMissingUnifs: any) {
    const bindParam = (param: Parameter<any>) => {
      const name = param.getName()
      const unif = unifs[name]
      if (unif == undefined) {
        const textureUnif = unifs[name + 'Tex']
        if (textureUnif) {
          this.uniformBindings.push(
            new ColorUniformBinding(gl, glMaterial, <MaterialColorParam | ColorParameter>param, unif, unifs)
          )
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
          this.uniformBindings.push(
            new SimpleUniformBinding(gl, glMaterial, <NumberParameter | BooleanParameter>param, unif, unifs)
          )
          break
        case 'Vec2':
        case 'Vec3':
        case 'Vec4':
          this.uniformBindings.push(
            new ComplexUniformBinding(
              gl,
              glMaterial,
              <Parameter<Vec2> | Parameter<Vec3> | Parameter<Vec4> | Parameter<Color>>param,
              unif
            )
          )
          break
        case 'Color':
          this.uniformBindings.push(
            new ColorUniformBinding(gl, glMaterial, <MaterialColorParam | ColorParameter>param, unif, unifs)
          )
          break
        case 'Mat4':
          this.uniformBindings.push(new MatrixUniformBinding(gl, glMaterial, <Mat4Parameter>param, unif))
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
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
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
  destroy() {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.destroy()
    }
  }
}

export { MaterialShaderBinding }
