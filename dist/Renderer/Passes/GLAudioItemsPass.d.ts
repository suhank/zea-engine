import { GLPass } from './GLPass';
import { TreeItem } from '../../SceneTree/index';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { RenderState } from '../types/renderer';
declare global {
    interface Window {
        ZeaAudioaudioCtx: any;
    }
}
declare let audioCtx: any;
/** Class representing a GL audio items pass.
 * @extends GLPass
 */
declare class GLAudioItemsPass extends GLPass {
    protected __audioItems: any[];
    /**
     * Create a GL audio items pass.
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
     * The addAudioSource method.
     * @param treeItem - The treeItem value.
     * @param audioSource - The audioSource value.
     * @param parameterOwner - The parameterOwner value.
     */
    addAudioSource(treeItem: TreeItem, audioSource: HTMLMediaElement | AudioBufferSourceNode, parameterOwner: any): void;
    /**
     * The __updateListenerPosition method.
     * @param viewXfo - The viewXfo value.
     * @private
     */
    __updateListenerPosition(viewXfo: any): void;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
}
export { GLAudioItemsPass, audioCtx };
