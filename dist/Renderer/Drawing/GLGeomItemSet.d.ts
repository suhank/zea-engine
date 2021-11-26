import '../../SceneTree/GeomItem';
import { EventEmitter } from '../../Utilities/index';
import { GLGeom } from './GLGeom';
import { GLGeomItem } from './GLGeomItem';
/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
declare class GLGeomItemSet extends EventEmitter {
    protected gl: WebGL12RenderingContext;
    protected glGeom: GLGeom;
    protected id: number;
    protected glGeomItems: Array<GLGeomItem | null>;
    protected glgeomItems_freeIndices: number[];
    protected glgeomItemEventHandlers: any[];
    protected drawIdsArray: Float32Array | null;
    protected drawIdsBuffer: WebGLBuffer | null;
    protected drawIdsBufferDirty: boolean;
    protected highlightedIdsArray: Float32Array | null;
    protected highlightedIdsBuffer: WebGLBuffer | null;
    protected highlightedIdsBufferDirty: boolean;
    protected visibleItems: number[];
    protected highlightedItems: number[];
    /**
     * Create a GL geom item set.
     * @param gl - The webgl rendering context.
     * @param glGeom - The glGeom value.
     */
    constructor(gl: WebGL12RenderingContext, glGeom: GLGeom);
    /**
     * The getGLGeom method.
     * @return - The return value.
     */
    getGLGeom(): GLGeom;
    /**
     * The getDrawCount method.
     * @return - The return value.
     */
    getDrawCount(): number;
    /**
     * The addGLGeomItem method.
     * @param glGeomItem - The glGeomItem value.
     */
    addGLGeomItem(glGeomItem: GLGeomItem): void;
    /**
     * The removeGLGeomItem method.
     * @param glGeomItem - The glGeomItem value.
     */
    removeGLGeomItem(glGeomItem: GLGeomItem): void;
    /**
     * The updateDrawIDsBuffer method.
     * The culling system will specify a subset of the total number of items for
     * drawing.
     */
    updateDrawIDsBuffer(): void;
    /**
     * The getDrawIdsArray method.
     * @return - The drawIds for each GeomItem packed into a Float32Array
     */
    getDrawIdsArray(): Float32Array;
    /**
     * The updateHighlightedIDsBuffer method.
     */
    updateHighlightedIDsBuffer(): void;
    /**
     * The getHighlightedIdsArray method.
     * @return - The drawIds for each GeomItem packed into a Float32Array
     */
    getHighlightedIdsArray(): Float32Array;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawHighlighted method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawHighlighted(renderstate: RenderState): void;
    /**
     * The __bindAndRender method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param itemIndices - The itemIndices value.
     * @param drawIdsBuffer - The drawIdsBuffer value.
     * @private
     */
    __bindAndRender(renderstate: RenderState, itemIndices: number[], drawIdsBuffer: WebGLBuffer | null): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLGeomItemSet };
