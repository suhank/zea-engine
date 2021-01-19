import { GLGeomSet } from './GLGeomSet.js'
import '../../SceneTree/Geometry/Mesh.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLPointsSet extends GLGeomSet {
  /**
   * Draw an item to screen.
   * @param {Array} - instanceCounts the instance counts for this draw call.
   */
  multiDrawInstanced(instanceCounts) {
    const gl = this.__gl
    gl.multiDrawArraysInstanced(
      gl.POINTS,
      this.geomVertexOffsets,
      0,
      this.geomVertexCounts,
      0,
      instanceCounts,
      0,
      instanceCounts.length
    )
  }
}

export { GLPointsSet }
