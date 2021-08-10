import { Vec2 } from '../Math/index'
import { ScreenQuadShader } from './Shaders/ScreenQuadShader'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding'
import { GLTexture2D } from './GLTexture2D'

/** Class representing a GL screen quad.
 * @private
 */
class GLScreenQuad {
  protected __gl: WebGL12RenderingContext
  protected __pos: number[]
  protected __size: number[]
  protected flipY: boolean
  protected __glshader: ScreenQuadShader
  protected __quadVertexIdsBuffer: any[]
  protected __quadBinding: any // GeomShaderBinding | VAOGeomShaderBinding
  protected ready: boolean
  /**
   * Create a GL screen quad.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    this.__gl = gl
    this.__pos = [0.0, 0.0]
    this.__size = [1.0, 1.0]
    this.flipY = true
    this.__glshader = new ScreenQuadShader(gl)

    const gl_casted = <Record<any, any>>gl
    if (!gl_casted.__quadVertexIdsBuffer) gl_casted.setupInstancedQuad()

    const shaderComp = this.__glshader.compileForTarget('GLScreenQuad')
    this.__quadBinding = generateShaderGeomBinding(
      this.__gl,
      shaderComp.attrs,
      gl_casted.__quadattrbuffers,
      gl_casted.__quadIndexBuffer
    )

    this.ready = true
  }

  /**
   * The bind method.
   * @param {Record<any, any>} renderstate - The object tracking the current state of the renderer
   * @param {GLTexture2D} texture - The texture param.
   * @param {Vec2} pos - The pos value.
   * @param {Vec2} size - The size value.
   */
  bind(renderstate: Record<any, any>, texture: GLTexture2D, pos: Vec2 = undefined, size: Vec2 = undefined) {
    const unifs = renderstate.unifs
    if (texture) {
      texture.bindToUniform(renderstate, renderstate.unifs.image)
    }

    const gl = this.__gl
    {
      const unif = unifs.pos
      if (unif) {
        let list = pos ? (pos instanceof Vec2 ? pos.asArray() : pos) : this.__pos
        gl.uniform2fv(unif.location, <Float32List>list)
      }
    }
    {
      const unif = unifs.size
      if (unif) {
        let list = size ? (size instanceof Vec2 ? size.asArray() : size) : this.__size
        gl.uniform2fv(unif.location, <Float32List>list)
      }
    }
    // if ('flipY' in unifs)
    //     gl.uniform1i(unifs.flipY.location, this.flipY ? 1 : 0);

    // if ('textureDim' in unifs)
    //     gl.uniform2fv(unifs.textureDim.location, [texture.width, texture.height]);

    this.__quadBinding.bind(renderstate)
  }

  /**
   * The bindShader method.
   * @param {Record<any, any>} renderstate - The object tracking the current state of the renderer
   * @return {any} - The return value.
   */
  bindShader(renderstate: Record<any, any>) {
    return this.__glshader.bind(renderstate, 'GLScreenQuad')
  }

  /**
   * The draw method.
   * @param {Record<any, any>} renderstate - The object tracking the current state of the renderer
   * @param {GLTexture2D} texture - The texture value.
   * @param {Vec2} pos - The pos value.
   * @param {Vec2} size - The size value.
   */
  draw(renderstate: Record<any, any>, texture: GLTexture2D, pos: Vec2 = undefined, size: Vec2 = undefined) {
    this.bind(renderstate, texture, pos, size)
    const gl = <Record<any, any>>this.__gl
    gl.drawQuad()
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {}
}

export { GLScreenQuad }