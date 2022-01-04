import { Xfo, Ray } from '../../Math/index';
import { BaseTool, TreeItem } from '../../SceneTree/index';
import { IntersectionData } from '../../Utilities/IntersectionData';
import { EventEmitter } from '../..';
/** Class representing a VR controller.
 *
 * The XRController class wraps the XRInputSource provided by the WebXR API.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource
 *
 * The XRController provides a tree item that can be used to attach geometries to represenet
 * the controllers or tools that the user may have in thier hands.
 * ```javascript
 * renderer.getXRViewport().then((xrvp) => {
 *   xrvp.on('controllerAdded', (event) => {
 *     const controller = event.controller
 *
 *     // Configure the distance of the ray cast performed by the controller into the scene.
 *     // Note: setting to 0 disables ray casting.
 *     controller.raycastDist = 20.0
 *
 *     // Remove the green ball added by the VRViewManipulator.
 *     controller.tipItem.removeAllChildren()
 *
 *     // Add a visual indication of the ray.
 *     const pointerItem = new GeomItem('PointerRay', line, pointermat)
 *     pointerItem.setSelectable(false)
 *     const pointerXfo = new Xfo()
 *     pointerXfo.sc.set(1, 1, controller.raycastDist)
 *     pointerItem.localXfoParam.value = pointerXfo
 *     controller.tipItem.addChild(pointerItem, false)
 *
 *     // The tip items needs to be rotated down a little to make it
 *     // point in the right direction.
 *     const tipItemXfo = controller.tipItem.localXfoParam.value
 *     tipItemXfo.ori.setFromAxisAndAngle(new Vec3(1, 0, 0), -0.8)
 *     controller.tipItem.localXfoParam.value = tipItemXfo
 *
 *     controller.on('buttonPressed', (event) => {
 *       console.log('buttonPressed', event)
 *     })
 *     controller.on('buttonReleased', (event) => {
 *       console.log('buttonReleased', event)
 *     })
 *   })
 * })
 * ```
 *
 * **Events**
 * * **buttonPressed:** Emitted when the user presses any of the buttons aside from the trigger button.
 * * **buttonReleased:** Emitted when the user release any of the buttons aside from the trigger button.
 *
 *
 * @extends EventEmitter
 */
declare class XRController extends EventEmitter {
    id: number;
    buttonPressed: boolean;
    private xrvp;
    private inputSource;
    private pressedButtons;
    private mat4;
    private xfo;
    private treeItem;
    private tipItem;
    raycastTick: number;
    raycastArea: number;
    raycastDist: number;
    pointerRay: Ray;
    private raycastAreaCache;
    private raycastDistCache;
    private rayCastRenderTargetProjMatrix;
    private tick;
    private touchpadValue;
    private hitTested;
    private pointerOverItem;
    private intersectionData;
    capturedItem: TreeItem | BaseTool;
    /**
     * Create a VR controller.
     * @param xrvp - The Vr viewport.
     * @param inputSource - The input source.
     * @param id - The id value.
     */
    constructor(xrvp: any, inputSource: any, id: number);
    /**
     * The getHandedness method.
     * @return - The return value.
     */
    getHandedness(): any;
    /**
     * The getId method.
     * @return - The return value.
     */
    getId(): number;
    /**
     * The getTreeItem method.
     * @return - The return value.
     */
    getTreeItem(): TreeItem;
    /**
     * The getTipItem method.
     * @return - The return value.
     */
    getTipItem(): TreeItem;
    /**
     * The getTipXfo method.
     * @return - The return value.
     */
    getTipXfo(): Xfo;
    /**
     * The getTouchPadValue method.
     * @return - The return value.
     */
    getTouchPadValue(): any;
    /**
     * The isButtonPressed method.
     * @return - The return value.
     */
    isButtonPressed(): boolean;
    /**
     * The getControllerStageLocalXfo method.
     * @return - The return value.
     */
    getControllerStageLocalXfo(): Xfo;
    /**
     * The getControllerTipStageLocalXfo method.
     * @return - The return value.
     */
    getControllerTipStageLocalXfo(): Xfo;
    /**
     * The updatePose method.
     * @param refSpace - The refSpace value.
     * @param xrFrame - The xrFrame value.
     * @param inputSource - The inputSource value.
     */
    updatePose(refSpace: any, xrFrame: any, inputSource: any): void;
    /**
     * The getGeomItemAtTip method.
     * @return - The return value.
     */
    getGeomItemAtTip(): IntersectionData;
}
export { XRController };
