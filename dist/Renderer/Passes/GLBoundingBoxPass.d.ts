import { TreeItem } from '../../SceneTree/index';
import { GLPass } from './GLPass';
import { GLTexture2D } from '../GLTexture2D';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { GLGeom } from '../Drawing';
import { GLShader } from '../GLShader';
/** Class representing a GL treeitems pass.
 * @extends GLPass
 * @private
 */
declare class GLBoundingBoxPass extends GLPass {
    protected boxes: any[];
    protected dirtyBoxes: Set<any>;
    protected freeIndices: Array<number>;
    protected idToIndex: Array<number>;
    protected drawCount: number;
    protected indexArrayUpdateNeeded: boolean;
    protected __updateRequested: boolean;
    protected glgeom?: GLGeom;
    protected glshader?: GLShader;
    protected __modelMatrixArray: Array<Float32Array>;
    protected __treeitemDataArray: Array<Array<number>>;
    protected __tintColorArray: Array<Array<number>>;
    protected __instanceIdsBuffer?: WebGLBuffer;
    protected __indexArray: Float32Array;
    protected __drawItemsTexture?: GLTexture2D;
    protected __width: number;
    /**
     * Create a GL treeitems pass.
     */
    constructor();
    /**
     * The getPassType method.
     * @return - The pass type value.
     */
    getPassType(): number;
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer: GLBaseRenderer, passIndex: number): void;
    /**
     * The itemAddedToScene method is called on each pass when a new item
     * is added to the scene, and the renderer must decide how to render it.
     * It allows Passes to select geometries to handle the drawing of.
     * @param treeItem - The treeItem value.
     * @param rargs - Extra return values are passed back in this object.
     * The object contains a parameter 'continueInSubTree', which can be set to false,
     * so the subtree of this node will not be traversed after this node is handled.
     * @return - The return value.
     */
    itemAddedToScene(treeItem: TreeItem, rargs: Record<string, any>): boolean;
    /**
     * The itemRemovedFromScene method is called on each pass when aa item
     * is removed to the scene, and the pass must handle cleaning up any resources.
     * @param treeItem - The treeItem value.
     * @param rargs - Extra return values are passed back in this object.
     * @return - The return value.
     */
    itemRemovedFromScene(treeItem: TreeItem, rargs: Record<string, any>): boolean;
    /**
     * Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.
     *
     * @param treeItem - The tree item to add.
     */
    addTreeItem(treeItem: TreeItem, continueIntoSubTree?: boolean): void;
    /**
     * The bindTreeItem method.
     * @param treeitem - The treeitem value.
     */
    bindTreeItem(treeitem: TreeItem): void;
    /**
     * The unbindTreeItem method.
     * @param treeitem - The treeitem value.
     */
    unbindTreeItem(treeitem: TreeItem): void;
    /**
     * The __populateBoxesDataArray method.
     * @param treeitemData - The treeitemData value.
     * @param index - The index value.
     * @param dataArray - The dataArray value.
     * @private
     */
    __populateBoxesDataArray(treeitemData: any, index: number, dataArray: any): void;
    __updateIndexArray(): void;
    /**
     * The __updateBoxes method.
     * @private
     */
    __updateBoxes(): void;
    /**
     * The __updateBoxes method.
     * @param index - The index value.
     * @private
     */
    __updateBox(index: number): void;
    /**
     * The sort method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
}
export { GLBoundingBoxPass };
