import { GLStandardGeomsPass } from './GLStandardGeomsPass';
import { GeomItem, Material } from '../../SceneTree/index';
import { GLShaderMaterials } from '../Drawing/GLShaderMaterials';
import { GLShaderGeomSets } from '../Drawing/GLShaderGeomSets';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { RenderState, GeomDataRenderState } from '../types/renderer';
/** Class representing a GL opaque geoms pass.
 * @extends GLStandardGeomsPass
 * @private
 */
declare class GLOpaqueGeomsPass extends GLStandardGeomsPass {
    protected __glshadermaterials: Record<string, GLShaderMaterials>;
    protected __glShaderGeomSets: Record<string, GLShaderGeomSets>;
    /**
     * Create a GL opaque geoms pass.
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
     * The filterGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    filterGeomItem(geomItem: GeomItem): boolean;
    /**
     * Checks the material to see if it is not transparent.
     * @param material - The geomItem value.
     * @return - The return value.
     */
    checkMaterial(material: Material): boolean;
    /**
     * Removes the GeomITem from this pass, and then asks the renderer to re-add it.
     * @param geomItem - The geomItem value.
     */
    removeAndReAddGeomItem(geomItem: GeomItem): void;
    /**
     * The addGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    addGeomItem(geomItem: GeomItem): boolean;
    /**
     * The removeGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    removeGeomItem(geomItem: GeomItem): boolean;
    /**
     * The removeMaterial method.
     * @param material - The material value.
     */
    removeMaterial(material: Material): void;
    /**
     * The __traverseTreeAndDraw method.
     * @param renderstate - The renderstate value.
     * @private
     */
    __traverseTreeAndDraw(renderstate: RenderState): void;
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
export { GLOpaqueGeomsPass };
