import { Vec3 } from '../../Math/index';
import { TreeItem } from '../../SceneTree/index';
import { GLPass } from './GLPass';
import { GLImageAtlas } from '../GLImageAtlas';
import { GLTexture2D } from '../GLTexture2D';
import { IGeomShaderBinding } from '../Drawing/index';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { GLShader } from '../GLShader';
import { GeomItemAndDist } from '../../Utilities/IntersectionData';
import { RenderState, GeomDataRenderState } from '../types/renderer';
/** Class representing a GL billboards pass.
 * @extends GLPass
 * @private
 */
declare class GLBillboardsPass extends GLPass {
    protected billboards: any[];
    protected dirtyBillboards: Set<any>;
    protected freeIndices: Array<number>;
    protected drawCount: number;
    protected threshold: number;
    protected updateRequested: boolean;
    protected prevSortCameraPos: Vec3;
    protected atlas: GLImageAtlas | null;
    protected indexArrayUpdateNeeded: boolean;
    protected instanceIdsBuffer: WebGLBuffer | null;
    protected indexArray: Float32Array;
    protected glshader: GLShader | null;
    protected shaderComp: Record<string, any>;
    protected shaderBinding: IGeomShaderBinding | null;
    protected modelMatrixArray: Array<Float32Array>;
    protected billboardDataArray: Array<any[]>;
    protected tintColorArray: Array<Array<number>>;
    protected width: number;
    protected drawItemsTexture: GLTexture2D | null;
    /**
     * Create a GL billboards pass.
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
     * The filterRenderTree method.
     */
    filterRenderTree(): void;
    /**
     * The addBillboard method.
     * @param billboard - The billboard value.
     */
    addBillboard(billboard: any): void;
    /**
     * The removeBillboard method.
     * @param billboard - The billboard value.
     */
    removeBillboard(billboard: any): void;
    /**
     * The populateBillboardDataArray method.
     * @param billboardData - The billboardData value.
     * @param index - The index value.
     * @param dataArray - The dataArray value.
     * @private
     */
    populateBillboardDataArray(billboardData: any, index: number, dataArray: any): void;
    /**
     * The requestUpdate method.
     * @private
     */
    requestUpdate(): void;
    /**
     * The reqUpdateIndexArray method.
     * @private
     */
    reqUpdateIndexArray(): void;
    updateIndexArray(): void;
    /**
     * The updateBillboards method.
     * @param renderstate - The object tracking the current state of the renderer
     * @private
     */
    updateBillboards(renderstate: RenderState): void;
    /**
     * The updateBillboard method.
     * @param index - The index of the Billboard to update .
     * @private
     */
    updateBillboard(index: number): void;
    /**
     * The sort method.
     * @param cameraPos - The cameraPos value.
     */
    sort(cameraPos: any): void;
    /**
     * Invoke the drawing of each item, compiling the shader using the provided key.
     * @param renderstate - The object tracking the current state of the renderer
     * @param key - The key to cache the compiler results against.
     */
    __draw(renderstate: RenderState, key: string): void;
    /**
     * The sort method.
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
    /**
     * The getGeomItemAndDist method.
     * @param geomData - The geomData value.
     * @return - The return value.
     */
    getGeomItemAndDist(geomData: Float32Array | Uint8Array): GeomItemAndDist | undefined;
}
export { GLBillboardsPass };
