import { Vec2, Vec3, Vec4, Color, Mat4 } from '../Math/index'
import { GLTexture2D } from './GLTexture2D.js'
import { GLHDRImage } from './GLHDRImage.js'
import { GLImageStream } from './GLImageStream.js'
import { SInt32, UInt32, Float32 } from '../Utilities/MathFunctions'

/** Class representing simple uniform binding.
 * @private
 */
class SimpleUniformBinding {
  /**
   * Create simple uniform binding.
   * @param {any} gl - The gl value.
   * @param {any} glmaterial - The glmaterial value.
   * @param {any} param - The param value.
   * @param {any} unif - The unif value.
   */
  constructor(gl, glmaterial, param, unif) {
    this.param = param
    this.unif = unif

    switch (unif.type) {
      case Boolean:
        // gl.uniform1ui(unif.location, value);// WebGL 2
        this.uniformXX = gl.uniform1i.bind(gl)
        break
      case UInt32:
        if (gl.name == 'webgl2') this.uniformXX = gl.uniform1ui.bind(gl)
        else this.uniformXX = gl.uniform1i.bind(gl)
        break
      case SInt32:
        this.uniformXX = gl.uniform1i.bind(gl)
        break
      case Float32:
        this.uniformXX = gl.uniform1f.bind(gl)
        break
    }
    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glmaterial.emit('updated', {})
    })
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate value.
   */
  bind(renderstate) {
    if (this.dirty) {
      this.val = this.param.getValue()
      this.dirty = false
    }
    this.uniformXX(this.unif.location, this.val)
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
  /**
   * Create complex uniform binding.
   * @param {any} gl - The gl value.
   * @param {any} glmaterial - The glmaterial value.
   * @param {any} param - The param value.
   * @param {any} unif - The unif value.
   */
  constructor(gl, glmaterial, param, unif) {
    this.param = param
    this.unif = unif

    switch (unif.type) {
      case Vec2:
        this.uniformXX = gl.uniform2fv.bind(gl)
        break
      case Vec3:
        this.uniformXX = gl.uniform3fv.bind(gl)
        break
      case Vec4:
        this.uniformXX = gl.uniform4fv.bind(gl)
        break
    }
    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glmaterial.emit('updated', {})
    })
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate value.
   */
  bind(renderstate) {
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
  /**
   * Create material uniform binding.
   * @param {any} gl - The gl value.
   * @param {any} glmaterial - The glmaterial value.
   * @param {any} param - The param value.
   * @param {any} unif - The unif value.
   */
  constructor(gl, glmaterial, param, unif) {
    this.param = param
    this.unif = unif

    switch (unif.type) {
      case Mat3:
        this.uniformMatrixXXX = gl.uniformMatrix3fv.bind(gl)
        break
      case Mat4:
        this.uniformMatrixXXX = gl.uniformMatrix4fv.bind(gl)
        break
    }

    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glmaterial.emit('updated', {})
    })
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate value.
   */
  bind(renderstate) {
    if (this.dirty) {
      this.vals = this.param.getValue().asArray()
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
  /**
   * Create color uniform binding.
   * @param {any} gl - The gl value.
   * @param {any} glmaterial - The glmaterial value.
   * @param {any} param - The param value.
   * @param {any} unif - The unif value.
   * @param {any} unifs - The unifs value.
   */
  constructor(gl, glmaterial, param, unif, unifs) {
    this.gl = gl
    this.param = param
    this.unif = unif
    this.textureUnif = unifs[unif.name + 'Tex']
    this.textureTypeUnif = unifs[unif.name + 'TexType']

    this.vals = [0, 0, 0, 0]
    this.bind = this.bindValue

    const genGLTex = (image) => {
      let gltexture = image.getMetadata('gltexture')
      const textureType = 1
      if (!gltexture) {
        if (image.type === 'FLOAT') {
          gltexture = new GLHDRImage(this.gl, image)
        } else if (image.isStreamAtlas()) {
          gltexture = new GLImageStream(this.gl, image)
        }
        // else if (image.hasAlpha()){
        //     gltexture = new GLLDRAlphaImage(this.gl, image);
        // }
        else {
          gltexture = new GLTexture2D(this.gl, image)
        }
      }
      this.texBinding = gltexture.preBind(this.textureUnif, unifs)
      gltexture.on('updated', () => {
        glmaterial.emit('updated', {})
      })
      this.gltexture = gltexture
      this.gltexture.addRef(this)
      this.textureType = textureType
      this.bind = this.bindTexture
      glmaterial.emit('updated', {})
    }

    let boundImage
    let imageLoaded
    const connectImage = (image) => {
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
      this.textureType = null
      this.bind = this.bindValue

      if (imageLoaded) {
        boundImage.off('loaded', imageLoaded)
      }
      boundImage = null
      imageLoaded = null
      glmaterial.emit('updated', {})
    }

    this.update = () => {
      // Sometimes the value of a color param is an image.
      const value = param.getValue()
      this.vals = value.asArray()

      if (this.textureUnif) {
        let image
        if (param.getImage) {
          image = param.getImage()
        }
        if (image && image != boundImage) {
          connectImage(image)
        } else if (!image && boundImage) {
          disconnectImage()
        }
      }
      glmaterial.emit('updated')
    }

    /**
     * The update method.
     */
    this.update()
    param.on('textureConnected', () => {
      connectImage(param.getImage())
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
   * @param {any} renderstate - The renderstate value.
   */
  bindValue(renderstate) {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    this.uniform4fv(this.unif.location, this.vals)
    if (this.textureTypeUnif) this.uniform1i(this.textureTypeUnif.location, 0)
  }

  /**
   * The bindTexture method.
   * @param {any} renderstate - The renderstate value.
   */
  bindTexture(renderstate) {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    this.gltexture.bindToUniform(renderstate, this.textureUnif, this.texBinding)
  }
}

const logged = {}

/** Class representing material shader binding.
 * @private
 */
class MaterialShaderBinding {
  /**
   * Create material shader binding.
   * @param {any} gl - The gl value.
   * @param {any} glmaterial - The glmaterial value.
   * @param {any} unifs - The unifs value.
   * @param {any} warnMissingUnifs - The warnMissingUnifs value.
   */
  constructor(gl, glmaterial, unifs, warnMissingUnifs) {
    this.uniformBindings = []

    const bindParam = (param) => {
      const name = param.getName()
      const unif = unifs[name]
      if (unif == undefined) {
        // Note: we now bind the Material even for rendering geom datas,
        // which can mean many params have no uniform in the shader, which is fine.
        if (warnMissingUnifs) {
          // Note: this silent error caused me a lot of searching. make it noisy.
          const shaderName = glmaterial.getMaterial().getShaderName()
          if (!logged[shaderName]) {
            logged[shaderName] = {}
          }
          if (!logged[shaderName][name]) {
            // TODO: Many of these warnings are because when we change shaders
            // we do not remove obsolete params, but we probably should.
            console.warn(
              'Material:' + glmaterial.getMaterial().getName(),
              'with Shader ',
              shaderName,
              'Param has no unif',
              name,
            )
            logged[shaderName][name] = true
          }
        }
        return
      }
      switch (unif.type) {
        case Boolean:
        case UInt32:
        case SInt32:
        case Float32:
          this.uniformBindings.push(new SimpleUniformBinding(gl, glmaterial, param, unif))
          break
        case Vec2:
        case Vec3:
        case Vec4:
          this.uniformBindings.push(new ComplexUniformBinding(gl, glmaterial, param, unif))
          break
        case Color:
          this.uniformBindings.push(new ColorUniformBinding(gl, glmaterial, param, unif, unifs))
          break
        case Mat4:
          this.uniformBindings.push(new MatrixUniformBinding(gl, glmaterial, param, unif))
          break
        default:
          console.warn('Param :' + name + ' has unhandled data type:' + unif.type)
          return
      }
      return
    }
    const params = glmaterial.getMaterial().getParameters()
    for (const param of params) {
      bindParam(param)
    }
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate value.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.bind(renderstate)
    }
    return true
  }

  /**
   * The unbind method.
   */
  unbind() {
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
      uniformBinding.destroy(renderstate)
    }
  }
}

export { MaterialShaderBinding }
