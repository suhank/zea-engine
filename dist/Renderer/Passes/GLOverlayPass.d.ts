import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass';
import { GeomItem } from '../../SceneTree/GeomItem';
/** Class representing a GL overlay pass.
 * @extends GLOpaqueGeomsPass
 */
declare class GLOverlayPass extends GLOpaqueGeomsPass {
    /**
     * Create a GL overlay pass.
     * @param name - The name value.
     */
    constructor();
    /**
     * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
     * @return - The pass type value.
     */
    getPassType(): number;
    /**
     * The filterGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    filterGeomItem(geomItem: GeomItem): boolean;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawGeomData method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawGeomData(renderstate: GeomDataRenderState): void;
}
export { GLOverlayPass };
