import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw.js'
import '../../SceneTree/Geometry/Mesh.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLLinesItemSet extends GLGeomItemSetMultiDraw {
  /**
   * Draw an item to screen.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {number} count - the element count for this draw call.
   * @param {number} offset - the element offset for this draw call.
   */
  singleDraw(renderstate, count, offset) {
    const gl = this.gl
    const { occluded } = renderstate.unifs
    if (occluded) {
      gl.uniform1i(occluded.location, 0)
    }

    gl.drawElements(gl.LINES, count, gl.UNSIGNED_INT, offset)

    if (occluded) {
      gl.uniform1i(occluded.location, 1)
      gl.depthFunc(gl.GREATER)
      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, counts.length)
    }
  }

  /**
   * Draw an item to screen.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {Int32Array} counts - the counts for each element drawn in by this draw call.
   * @param {Int32Array} offsets - the offsets for each element drawn in by this draw call.
   */
  multiDraw(renderstate, counts, offsets) {
    const gl = this.gl
    const { occluded } = renderstate.unifs
    if (occluded) {
      gl.uniform1i(occluded.location, 0)
    }

    gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, counts.length)

    if (occluded) {
      gl.uniform1i(occluded.location, 1)
      gl.depthFunc(gl.GREATER)
      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, counts.length)
    }
  }
}

export { GLLinesItemSet }
