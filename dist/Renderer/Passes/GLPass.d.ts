import { ParameterOwner } from '../../SceneTree/ParameterOwner';
import { BooleanParameter } from '../../SceneTree/Parameters/index';
import { TreeItem } from '../../SceneTree/TreeItem';
import { GeomItemAndDist } from '../../Utilities/IntersectionData';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { RenderState, GeomDataRenderState } from '../types/renderer';
import { WebGL12RenderingContext } from '../types/webgl';
declare const PassType: {
    OPAQUE: number;
    TRANSPARENT: number;
    OVERLAY: number;
};
/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends ParameterOwner
 */
declare abstract class GLPass extends ParameterOwner {
    enabled: boolean;
    protected passIndex: number;
    protected __gl: WebGL12RenderingContext | null;
    renderer: GLBaseRenderer | null;
    protected __renderer: GLBaseRenderer | null;
    enabledParam: BooleanParameter;
    /**
     * Create a GL pass.
     */
    constructor();
    /**
     * The __parameterValueChanged method.
     * @param event - The event object.
     * @private
     */
    parameterValueChanged(event: Record<string, any>): void;
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer: GLBaseRenderer, passIndex: number): void;
    /**
     * The setPassIndex method.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    setPassIndex(passIndex: number): void;
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
     * The startPresenting method.
     */
    startPresenting(): void;
    /**
     * The stopPresenting method.
     */
    stopPresenting(): void;
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
    /**
     * The getGeomItemAndDist method.
     * @param geomData - The geomData value.
     */
    getGeomItemAndDist(geomData: Float32Array | Uint8Array): GeomItemAndDist | undefined;
}
export { GLPass, PassType };
