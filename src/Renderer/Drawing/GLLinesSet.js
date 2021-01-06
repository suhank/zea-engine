import { GLIndexedGeomSet } from './GLIndexedGeomSet.js'
import '../../SceneTree/Geometry/Mesh.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLLinesSet extends GLIndexedGeomSet {
  /**
   * Draw an item to screen.
   * @param {Array} - instanceCounts the instance counts for this draw call.
   */
  multiDrawInstanced(instanceCounts) {
    const gl = this.__gl
    gl.multiDrawElementsInstanced(
      gl.LINES,
      this.indicesCounts,
      0,
      gl.UNSIGNED_INT,
      this.indicesOffsets,
      0,
      instanceCounts,
      0,
      instanceCounts.length
    )
  }
}

export { GLLinesSet }
