import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw.js'
import '../../SceneTree/Geometry/Mesh.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLPointsItemSet extends GLGeomItemSetMultiDraw {
  /**
   * Draw an item to screen.
   * @param {Array} count - the element count for this draw call.
   * @param {Array} offset - the element offset for this draw call.
   */
  singleDraw(count, offset) {
    const gl = this.gl
    gl.drawArrays(gl.POINTS, offset, count)
  }

  /**
   * Draw an item to screen.
   * @param {Array} counts - the counts for each element drawn in by this draw call.
   * @param {Array} offsets - the offsets for each element drawn in by this draw call.
   */
  multiDraw(counts, offsets) {
    const gl = this.gl
    gl.multiDrawArrays(gl.POINTS, offsets, 0, counts, 0, counts.length)
  }
}

export { GLPointsItemSet }
