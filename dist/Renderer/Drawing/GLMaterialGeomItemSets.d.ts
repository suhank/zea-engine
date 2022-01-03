import { EventEmitter } from '../../Utilities/index';
import { GLOpaqueGeomsPass } from '../Passes';
import { RenderState, GeomDataRenderState } from '../types/renderer';
import { WebGL12RenderingContext } from '../types/webgl';
import { GLGeom } from './GLGeom';
import { GLGeomItem } from './GLGeomItem';
import { GLMaterial } from './GLMaterial';
/** Class representing GL material geom item sets.
 * @private
 */
declare class GLMaterialGeomItemSets extends EventEmitter {
    protected pass: GLOpaqueGeomsPass;
    protected __gl: WebGL12RenderingContext;
    glMaterial: GLMaterial;
    protected glGeomItemSets: Record<string, any>;
    protected drawCount: number;
    /**
     * Create a GL material geom item set.
     * @param pass - The pass that owns the GLMaterialGeomItemSets.
     * @param glMaterial - The glMaterial value.
     */
    constructor(pass: GLOpaqueGeomsPass, glMaterial: GLMaterial);
    /**
     * The getGLMaterial method.
     * @return - The return value.
     */
    getGLMaterial(): GLMaterial;
    /**
     * The addGLGeomItem method.
     * @param glGeomItem - The glGeomItem value.
     * @param glGeom - The glGeomItem value.
     * @private
     */
    addGLGeomItem(glGeomItem: GLGeomItem, glGeom: GLGeom): void;
    /**
     * The drawCountChanged method.
     * @param event - The change value.
     * @private
     */
    drawCountChanged(event: Record<string, any>): void;
    /**
     * The __materialChanged method.
     * @private
     */
    __materialChanged(): void;
    /**
     * The addGeomItemSet method.
     * @param glGeomItemSet - The glGeomItemSet value.
     */
    addGeomItemSet(glGeomItemSet: any): void;
    /**
     * Draws all elements, binding the shader and continuing into the GLGeomItemSet
     * @param renderstate - The render state for the current draw traversal
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawHighlighted method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawHighlighted(renderstate: RenderState): void;
    /**
     * The drawHighlightedGeoms method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawGeomData(renderstate: GeomDataRenderState): void;
}
export { GLMaterialGeomItemSets };
