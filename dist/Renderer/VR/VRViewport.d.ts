import { Mat4, Xfo } from '../../Math/index';
import { TreeItem, VLAAsset } from '../../SceneTree/index';
import { GLBaseViewport } from '../GLBaseViewport';
import { VRHead } from './VRHead';
import { VRController } from './VRController';
import { XRControllerEvent } from '../../Utilities/Events/XRControllerEvent';
import { XRPoseEvent } from '../../Utilities/Events/XRPoseEvent';
/** This Viewport class is used for rendering stereoscopic views to VR controllers using the WebXR api.
 *  When the GLRenderer class detects a valid WebXF capable device is plugged in, this class is automatically
 *  instantiated ready for XR sessions
 *
 * **Events**
 * * **presentingChanged:** Emitted when presenting is started or stopped
 * * **controllerAdded:** Emitted when a new XR controller is detected.
 * * **viewChanged:** Emitted during presentation each time the frame is rendered.
 * * **pointerDoublePressed:** Emitted when the user double clicks with an XR pointer.
 * * **pointerDown:** Emitted when the user presses an XR pointer
 * * **pointerUp:** Emitted when the user releases an XR pointer
 *
 * @extends GLBaseViewport
 */
declare class VRViewport extends GLBaseViewport {
    protected __projectionMatricesUpdated: boolean;
    protected __stageTreeItem: TreeItem;
    protected __vrhead: VRHead;
    protected controllersMap: Record<string, VRController>;
    protected controllers: VRController[];
    protected controllerPointerDownTime: number[];
    protected spectatorMode: boolean;
    protected tick: number;
    protected __leftViewMatrix: Mat4;
    protected __leftProjectionMatrix: Mat4;
    protected __rightViewMatrix: Mat4;
    protected __rightProjectionMatrix: Mat4;
    protected __vrAsset?: VLAAsset;
    protected __stageXfo: Xfo;
    protected __stageMatrix: Mat4;
    protected __stageScale: any;
    protected session: any;
    protected __canPresent: any;
    protected __hmd: string;
    protected __hmdAssetPromise?: Promise<VLAAsset | null>;
    protected __region: any;
    protected __refSpace: any;
    protected capturedItem: any;
    protected stroke: any;
    protected capturedElement?: TreeItem;
    protected __projectionMatrices: Array<Mat4>;
    protected __hmdCanvasSize: any;
    protected __viewMatrices: any;
    protected __cameraMatrices: any;
    /**
     * Create a VR viewport.
     * @param renderer - The renderer value.
     */
    constructor(renderer: any);
    getRenderer(): import("../GLRenderer").GLRenderer;
    /**
     * The getAsset method.
     * @return - The return value.
     */
    getAsset(): VLAAsset;
    /**
     * The getTreeItem method.
     * @return - The return value.
     */
    getTreeItem(): TreeItem;
    /**
     * The getVRHead method.
     * @return - The return value.
     */
    getVRHead(): VRHead;
    /**
     * The getXfo method.
     * @return - The return value.
     */
    getXfo(): Xfo;
    /**
     * The setXfo method.
     * @param xfo - The xfo value.
     */
    setXfo(xfo: Xfo): void;
    /**
     * The getControllers method.
     * @return - The return value.
     */
    getControllers(): VRController[];
    /**
     * The canPresent method.
     * @return - The return value.
     */
    canPresent(): any;
    /**
     * The isPresenting method.
     * @return - The return value.
     */
    isPresenting(): any;
    /**
     * Turns on and off the spectator mode.
     * Note: specator mode renders the scene an extra time to our regular viewport.
     * @param state -  true for enabling spectator mode, else false
     */
    setSpectatorMode(state: boolean): void;
    /**
     * The __startSession method.
     * @private
     */
    __startSession(): void;
    /**
     * The loadHMDResources method.
     * @return - The return value.
     */
    loadHMDResources(): Promise<VLAAsset | null>;
    /**
     * The startPresenting method.
     */
    startPresenting(): Promise<void>;
    /**
     * The stopPresenting method.
     */
    stopPresenting(): void;
    /**
     * The togglePresenting method.
     */
    togglePresenting(): void;
    /**
     * The getHMDCanvasSize method.
     * @return - The return value.
     */
    getHMDCanvasSize(): any;
    /**
     * The updateControllers method.
     * @param xrFrame - The xrFrame value.
     * @param event - The pose changed event object that will be emitted for observers such as collab.
     */
    updateControllers(xrFrame: any, event: XRPoseEvent): void;
    /**
     * The drawXRFrame method.
     * @param xrFrame - The xrFrame value.
     */
    drawXRFrame(xrFrame: any): void;
    /**
     * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
     *
     * @param event - The DOM event produced by a pointer
     */
    onPointerDown(event: XRControllerEvent): void;
    /**
     * Causes an event to occur when a user releases a mouse button over a element.
     *
     * @param event - The event that occurs.
     */
    onPointerUp(event: XRControllerEvent): void;
}
export { VRViewport };
