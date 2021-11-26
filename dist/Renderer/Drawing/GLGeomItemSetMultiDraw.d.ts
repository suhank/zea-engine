import { Vec3 } from '../../Math/Vec3';
import '../../SceneTree/GeomItem';
import { EventEmitter } from '../../Utilities/index';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { GLTexture2D } from '../GLTexture2D';
import { GLGeomItem } from './GLGeomItem';
/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
declare abstract class GLGeomItemSetMultiDraw extends EventEmitter {
    protected renderer: GLBaseRenderer;
    protected gl: WebGL12RenderingContext;
    protected glGeomItems: Array<GLGeomItem | null>;
    protected glGeomIdsMapping: Record<string, any>;
    protected glgeomItemEventHandlers: any[];
    protected freeIndices: number[];
    protected drawElementCounts: Int32Array;
    protected drawElementOffsets: Int32Array;
    protected highlightElementCounts: Int32Array;
    protected highlightElementOffsets: Int32Array;
    protected reserved: number;
    protected visibleItems: GLGeomItem[];
    protected drawIdsArray: Float32Array;
    protected drawIdsBufferDirty: boolean;
    protected drawIdsTexture: GLTexture2D | null;
    protected highlightedItems: GLGeomItem[];
    protected highlightedIdsArray: any;
    protected highlightedIdsTexture: GLTexture2D | null;
    protected highlightedIdsBufferDirty: boolean;
    /**
     * Create a GL geom item set.
     * @param renderer - The renderer object.
     */
    constructor(renderer: GLBaseRenderer);
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
     * @param renderstate - The object used to track state changes during rendering.
     */
    updateDrawIDsBuffer(renderstate: RenderState): void;
    /**
     * The updateHighlightedIDsBuffer method.
     * @param renderstate - The object used to track state changes during rendering.
     */
    updateHighlightedIDsBuffer(renderstate: RenderState): void;
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
     * The bindAndRender method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param counts - the counts for each element drawn in by this draw call.
     * @param offsets - the offsets for each element drawn in by this draw call.
     * @private
     */
    bindAndRender(renderstate: RenderState, drawIdsArray: Float32Array, counts: Int32Array, offsets: Int32Array, drawCount: number): void;
    /**
     * Draw an item to screen.
     * @param renderstate - The object tracking the current state of the renderer
     * @param drawIds - the draw id for each element drawn in by this draw call.
     * @param counts - the geom element count for each element drawn in by this draw call.
     * @param offsets - the geom element offset for each element drawn in by this draw call.
     * @param drawCount - the number of active draw calls for this invocation
     */
    abstract multiDraw(renderstate: RenderState, drawIds: Float32Array, counts: Int32Array, offsets: Int32Array, drawCount: number): void;
    /**
     * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
     * @param viewPos - The position of the camera that we are sorting relative to.
     */
    sortItems(viewPos: Vec3): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLGeomItemSetMultiDraw };
