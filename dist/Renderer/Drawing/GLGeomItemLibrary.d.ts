import { EventEmitter } from '../../Utilities/index';
import { GLGeomItem } from './GLGeomItem';
import { GLTexture2D } from '../GLTexture2D';
import { GeomItem } from '../../SceneTree/GeomItem';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { Material } from '../../SceneTree/Material';
import { RenderState } from '../types/renderer';
/** Class for managing all the GeomItems discovered in the SceneTree.
 * @private
 */
declare class GLGeomItemLibrary extends EventEmitter {
    protected renderer: GLBaseRenderer;
    protected glGeomItems: Array<GLGeomItem | null>;
    protected glGeomItemEventHandlers: any[];
    protected glGeomItemsMap: Record<number, number>;
    protected glGeomItemsIndexFreeList: number[];
    protected dirtyItemIndices: number[];
    protected dirtyWorkerItemIndices: Set<number>;
    protected removedItemIndices: number[];
    protected glGeomItemsTexture: GLTexture2D | null;
    protected enableFrustumCulling: boolean;
    private worker;
    /**
     * Create a GLGeomItemLibrary.
     * @param renderer - The renderer instance
     * @param options - The options object passed to the GLRenderer constructor.
     */
    constructor(renderer: GLBaseRenderer, options: Record<string, any>);
    /**
     * Sets up the Culling Worker to start calculating frustum culling.
     * @param renderer - The renderer instance
     */
    setupCullingWorker(renderer: GLBaseRenderer): void;
    /**
     * The addGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The index of GLGeomItem
     */
    addGeomItem(geomItem: GeomItem): GLGeomItem;
    /**
     * Handles applying the culling results received from the GLGeomItemLibraryCullingWorker
     * @param data - The object containing the newlyCulled and newlyUnCulled results.
     */
    applyCullResults(data: Record<string, any>): void;
    /**
     * The removeGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    removeGeomItem(geomItem: GeomItem): GLGeomItem;
    /**
     * The getGeomItem method.
     * @param index - The index value.
     * @return - The GLGeomItem that wraps the provided GeomItem
     */
    getGeomItem(index: number): GeomItem | undefined;
    /**
     * The getGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The GLGeomItem that wraps the provided GeomItem
     */
    getGLGeomItem(geomItem: GeomItem): GLGeomItem | null;
    /**
     * The populateDrawItemDataArray method.
     * @param index - The index of the item in the library.
     * @param subIndex - The index of the item within the block being uploaded.
     * @param dataArray - The dataArray value.
     * @private
     */
    populateDrawItemDataArray(index: number, subIndex: number, dataArray: Float32Array): void;
    /**
     * Gathers data to pass to the culling worker.
     * @param geomItem - The GeomItem to gether the data for.
     * @param material - The material of GeomItem.
     * @param index - The index of the item to gether the data for.
     * @return - the JSON data that will be passed to the worker.
     */
    getCullingWorkerData(geomItem: GeomItem, material: Material, index: number): Record<string, any>;
    /**
     * Any items that need to be updated on the worker are now pushed.
     */
    uploadGeomItemsToWorker(): void;
    /**
     * The uploadGeomItems method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    uploadGeomItems(renderstate: RenderState): void;
    /**
     * Updates the GPU state if any update is needed.
     * @param renderstate - The object tracking the current state of the renderer
     */
    bind(renderstate: RenderState): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLGeomItemLibrary };
