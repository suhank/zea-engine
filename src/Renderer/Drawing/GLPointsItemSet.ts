import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import '../../SceneTree/Geometry/Mesh'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLPointsItemSet extends GLGeomItemSetMultiDraw {
  /**
   * Draw an item to screen.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @param {Float32Array} drawIds - the draw id for each element drawn in by this draw call.
   * @param {Int32Array} counts - the geom element count for each element drawn in by this draw call.
   * @param {Int32Array} offsets - the geom element offset for each element drawn in by this draw call.
   * @param {number} drawCount - the number of active draw calls for this invocation
   */
  multiDraw(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    const gl = this.gl
    if (gl.multiDrawArrays) {
      gl.multiDrawArrays(gl.POINTS, offsets, 0, counts, 0, drawCount)
    } else {
      const { drawId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i])
        gl.drawArrays(gl.TRIANGLES, offsets[i], counts[i])
      }
    }
  }
}

export { GLPointsItemSet }
