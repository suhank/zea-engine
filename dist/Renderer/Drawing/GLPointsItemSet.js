import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw';
import '../../SceneTree/Geometry/Mesh';
/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLPointsItemSet extends GLGeomItemSetMultiDraw {
    /**
     * Draw an item to screen.
     * @param renderstate - The object tracking the current state of the renderer
     * @param drawIds - the draw id for each element drawn in by this draw call.
     * @param counts - the geom element count for each element drawn in by this draw call.
     * @param offsets - the geom element offset for each element drawn in by this draw call.
     * @param drawCount - the number of active draw calls for this invocation
     */
    multiDraw(renderstate, drawIds, counts, offsets, drawCount) {
        const gl = this.gl;
        if (gl.multiDrawArrays) {
            gl.multiDrawArrays(gl.POINTS, offsets, 0, counts, 0, drawCount);
        }
        else {
            const { drawId } = renderstate.unifs;
            for (let i = 0; i < drawCount; i++) {
                gl.uniform1i(drawId.location, drawIds[i]);
                gl.drawArrays(gl.TRIANGLES, offsets[i], counts[i]);
            }
        }
    }
}
export { GLPointsItemSet };
//# sourceMappingURL=GLPointsItemSet.js.map