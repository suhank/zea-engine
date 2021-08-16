import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import '../../SceneTree/Geometry/Mesh'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLLinesItemSet extends GLGeomItemSetMultiDraw {
  /**
   * Draw an item to screen.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @param {Float32Array} drawIds - the draw id for each element drawn in by this draw call.
   * @param {Uint32Array} counts - the geom element count for each element drawn in by this draw call.
   * @param {Uint32Array} offsets - the geom element offset for each element drawn in by this draw call.
   */
  multiDraw(renderstate: RenderState, drawIds: Float32Array, counts: Uint32Array, offsets: Uint32Array) {
    const gl = this.gl
    if (gl.multiDrawArrays) {
      const { occluded } = renderstate.unifs
      if (occluded) {
        gl.uniform1i(occluded.location, 0)
      }

      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)

      if (occluded) {
        gl.uniform1i(occluded.location, 1)
        gl.depthFunc(gl.GREATER)
        gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
        gl.depthFunc(gl.LEQUAL)
      }
    } else {
      const { drawId, occluded } = renderstate.unifs
      if (occluded) {
        gl.uniform1i(occluded.location, 0)
      }

      for (let i = 0; i < counts.length; i++) {
        gl.uniform1i(drawId.location, drawIds[i])
        gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }

      if (occluded) {
        gl.uniform1i(occluded.location, 1)
        gl.depthFunc(gl.GREATER)
        for (let i = 0; i < counts.length; i++) {
          gl.uniform1i(drawId.location, drawIds[i])
          gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
        }
        gl.depthFunc(gl.LEQUAL)
      }
    }
  }
}

export { GLLinesItemSet }
