import { Vec3 } from '../../Math/Vec3';
import { GeomItem } from '../../SceneTree/index';
import { GLStandardGeomsPass } from './GLStandardGeomsPass';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { RenderState, GeomDataRenderState } from '../types/renderer';
/** Class representing a GL transparent geoms pass.
 * @extends GLStandardGeomsPass
 * @private
 */
declare class GLTransparentGeomsPass extends GLStandardGeomsPass {
    protected listenerIDs: Record<number, Record<string, number>>;
    protected itemCount: number;
    protected __glShaderGeomSets: Record<string, any>;
    protected transparentItems: any[];
    protected transparentItemIndices: Record<string, any>;
    protected freeList: any[];
    protected visibleItems: any[];
    protected prevSortCameraPos: Vec3;
    protected sortCameraMovementDistance: number;
    protected reSort: boolean;
    /**
     * Create GL transparent geoms pass.
     */
    constructor();
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer: GLBaseRenderer, passIndex: number): void;
    /**
     * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
     * @return - The pass type value.
     */
    getPassType(): number;
    /**
     * The init method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    filterGeomItem(geomItem: GeomItem): boolean;
    /**
     * When an item visibility changes, we trigger this method, as new items become visible
     */
    resortNeeded(): void;
    /**
     * The addGeomItem method.
     * @param geomItem - The geomItem value.
     */
    addGeomItem(geomItem: GeomItem): void;
    /**
     * The removeGeomItem method.
     * @param geomItem - The geomItem value.
     */
    removeGeomItem(geomItem: GeomItem): boolean;
    /**
     * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
     * @param viewPos - The position of the camera that we are sorting relative to.
     */
    sortItems(viewPos: Vec3): void;
    /**
     * Draw n individual item, binding the shader and material if necessary.
     * @param renderstate - current renderstad
     * @param transparentItem - current item to render
     * @param cache - cache tracking which material/shader is currently bound.
     */
    _drawItem(renderstate: RenderState, transparentItem: Record<string, any>, cache: Record<string, any>): void;
    /**
     * The _drawItems method.
     * @param renderstate - The object tracking the current state of the renderer
     * @private
     */
    _drawItems(renderstate: RenderState): void;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawHighlightedGeoms method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawHighlightedGeoms(renderstate: RenderState): void;
    /**
     * The drawGeomData method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawGeomData(renderstate: GeomDataRenderState): void;
}
export { GLTransparentGeomsPass };
