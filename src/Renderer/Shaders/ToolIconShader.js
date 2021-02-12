import { Registry } from '../../Registry'
import { FlatSurfaceShader } from './FlatSurfaceShader.js'

class ToolIconShader extends FlatSurfaceShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl) {
    super(gl)
    this.invisibleToGeomBuffer = true
  }
}

Registry.register('ToolIconShader', ToolIconShader)
export { ToolIconShader }
