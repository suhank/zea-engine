import { PassType } from './GLPass.js'
import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass.js'
import { GLRenderer } from '../GLRenderer.js'
import { Lines, LinesProxy, Points, PointsProxy } from '../../SceneTree/index'

/** Class representing a GL opaque geoms pass.
 * @extends GLOpaqueGeomsPass
 * @private
 */
class GLLinesPass extends GLOpaqueGeomsPass {
  /**
   * Create a GL opaque geoms pass.
   */
  constructor() {
    super()
  }

  /**
   * The filterGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {boolean} - The return value.
   */
  filterGeomItem(geomItem) {
    const geom = geomItem.getParameter('Geometry').getValue()
    if (geom instanceof Lines || geom instanceof LinesProxy || geom instanceof Points || geom instanceof PointsProxy) {
      return true
    }
  }

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate) {
    const gl = this.__gl
    gl.disable(gl.BLEND)

    if (true)
      // 2-sided rendering.
      gl.disable(gl.CULL_FACE)
    // 2-sided rendering.
    else {
      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)
    }

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    this.__traverseTreeAndDraw(renderstate)
  }
}

GLRenderer.registerPass(GLLinesPass, PassType.OPAQUE)

export { GLLinesPass }
