import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw.js'
import '../../SceneTree/Geometry/Mesh.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLLinesItemSet extends GLGeomItemSetMultiDraw {
  /**
   * Draw an item to screen.
   * @param {Array} count - the element count for this draw call.
   * @param {Array} offset - the element offset for this draw call.
   */
  singleDraw(count, offset) {
    const gl = this.gl
    gl.drawElements(gl.LINES, count, gl.UNSIGNED_INT, offset)
  }

  /**
   * Draw an item to screen.
   * @param {Array} counts - the counts for each element drawn in by this draw call.
   * @param {Array} offsets - the offsets for each element drawn in by this draw call.
   */
  multiDraw(renderstate, counts, offsets) {
    const gl = this.gl
    const { occludedLinesStyle } = renderstate.unifs
    if (occludedLinesStyle) {
      gl.uniform1i(occludedLinesStyle.location, 0)
    }

    gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, counts.length)

    if (occludedLinesStyle) {
      gl.uniform1i(occludedLinesStyle.location, 1)

      gl.depthFunc(gl.GREATER)
      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, counts.length)
    }
  }
}

export { GLLinesItemSet }
