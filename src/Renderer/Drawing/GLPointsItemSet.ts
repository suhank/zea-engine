import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import '../../SceneTree/Geometry/Mesh'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLPointsItemSet extends GLGeomItemSetMultiDraw {
  /**
   * Draw an item to screen.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   * @param {Float32Array} drawIds - the draw id for each element drawn in by this draw call.
   * @param {Uint32Array} counts - the geom element count for each element drawn in by this draw call.
   * @param {Uint32Array} offsets - the geom element offset for each element drawn in by this draw call.
   */
  multiDraw(renderstate: Record<any, any>, drawIds: Float32Array, counts: Uint32Array, offsets: Uint32Array) {
    const gl = this.gl
    if (gl.multiDrawArrays) {
      gl.multiDrawArrays(gl.POINTS, offsets, 0, counts, 0, counts.length)
    } else {
      const { drawId } = renderstate.unifs
      for (let i = 0; i < counts.length; i++) {
        gl.uniform1i(drawId.location, drawIds[i])
        gl.drawArrays(gl.TRIANGLES, offsets[i], counts[i])
      }
    }
  }
}

export { GLPointsItemSet }
