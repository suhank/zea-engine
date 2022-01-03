import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw';
import '../../SceneTree/Geometry/Mesh';
import { RenderState } from '../types/renderer';
/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
declare class GLPointsItemSet extends GLGeomItemSetMultiDraw {
    /**
     * Draw an item to screen.
     * @param renderstate - The object tracking the current state of the renderer
     * @param drawIds - the draw id for each element drawn in by this draw call.
     * @param counts - the geom element count for each element drawn in by this draw call.
     * @param offsets - the geom element offset for each element drawn in by this draw call.
     * @param drawCount - the number of active draw calls for this invocation
     */
    multiDraw(renderstate: RenderState, drawIds: Float32Array, counts: Int32Array, offsets: Int32Array, drawCount: number): void;
}
export { GLPointsItemSet };
