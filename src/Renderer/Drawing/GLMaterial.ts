import { Material } from '../../SceneTree/Material'
import { EventEmitter } from '../../Utilities/index'
import { GLShader } from '../GLShader'
import { MaterialShaderBinding } from './MaterialShaderBinding'

/** Class representing a GL material.
 * @extends EventEmitter
 * @private
 */
class GLMaterial extends EventEmitter {
  protected __gl: WebGL12RenderingContext
  protected __material: Material
  protected __glshader: GLShader
  protected __shaderBindings: Record<string, any> = {}
  protected __boundTexturesBeforeMaterial: any
  /**
   * Create a GL material.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {Material} material - The material value.
   * @param {GLShader} glShader - The glShader value.
   */
  constructor(gl: WebGL12RenderingContext, material: Material, glShader: GLShader) {
    super()
    this.__gl = gl
    this.__material = material
    this.__glshader = glShader
    this.__shaderBindings = {}

    material.on('parameterValueChanged', () => this.emit('updated'))
  }

  /**
   * The getMaterial method.
   * @return {any} - The return value.
   */
  getMaterial() {
    return this.__material
  }

  /**
   * The getGLShader method.
   * @return {any} - The return value.
   */
  getGLShader() {
    return this.__glshader
  }

  /**
   * The bind method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   * @param {any} warnMissingUnifs - The renderstate value.
   * @return {any} - The return value.
   */
  bind(renderstate: RenderState, warnMissingUnifs: any) {
    this.__boundTexturesBeforeMaterial = renderstate.boundTextures

    let shaderBinding = this.__shaderBindings[renderstate.shaderkey]
    if (!shaderBinding) {
      const gl = this.__gl
      shaderBinding = new MaterialShaderBinding(gl, this, renderstate.unifs, warnMissingUnifs)
      this.__shaderBindings[renderstate.shaderkey] = shaderBinding
    }
    return shaderBinding.bind(renderstate)

    return true
  }

  /**
   * The unbind method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   */
  unbind(renderstate: RenderState) {
    // Enable texture units to be re-used by resetting the count back
    // to what it was.
    renderstate.boundTextures = this.__boundTexturesBeforeMaterial
  }
}

export { GLMaterial }
