import { Mat4, Xfo } from '../../Math/index';
import { TreeItem, VLAAsset } from '../../SceneTree/index';
import { GLBaseViewport } from '../GLBaseViewport';
import { XRHead } from './XRHead';
import { XRController } from './XRController';
import { XRControllerEvent } from '../../Utilities/Events/XRControllerEvent';
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
declare class XRViewport extends GLBaseViewport {
    protected __projectionMatricesUpdated: boolean;
    protected __stageTreeItem: TreeItem;
    protected __xrhead: XRHead;
    protected controllersMap: Record<string, XRController>;
    protected controllers: XRController[];
    protected controllerPointerDownTime: number[];
    protected spectatorMode: boolean;
    protected tick: number;
    stageScale: number;
    protected __leftViewMatrix: Mat4;
    protected __leftProjectionMatrix: Mat4;
    protected __rightViewMatrix: Mat4;
    protected __rightProjectionMatrix: Mat4;
    protected __vrAsset?: VLAAsset;
    protected __stageXfo: Xfo;
    protected __stageMatrix: Mat4;
    protected session: any;
    protected __hmd: string;
    protected __hmdAssetPromise?: Promise<VLAAsset | null>;
    protected __region: Array<number>;
    protected __refSpace: any;
    protected __projectionMatrices: Array<Mat4>;
    protected __viewMatrices: Array<Mat4>;
    protected __cameraMatrices: Array<Mat4>;
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
    getVRHead(): XRHead;
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
    getControllers(): XRController[];
    /**
     * The isPresenting method.
     * @return - The return value.
     */
    isPresenting(): boolean;
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
     * The updateControllers method.
     * @param xrFrame - The xrFrame value.
     * @param event - The pose changed event object that will be emitted for observers such as collab.
     */
    updateControllers(xrFrame: any): void;
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
export { XRViewport };
