import { Sphere } from '../../SceneTree/Geometry/Shapes';
import { Material } from '../../SceneTree/Material';
import { BaseTool } from '../../SceneTree/Manipulators/BaseTool';
import { ZeaPointerEvent } from '../../Utilities/Events/ZeaPointerEvent';
import { XRControllerEvent } from '../../Utilities/Events/XRControllerEvent';
import { XRPoseEvent } from '../../Utilities/Events/XRPoseEvent';
import { XRController } from './XRController';
/**
 * Class representing a view tool
 * @extends BaseTool
 */
declare class XRViewManipulator extends BaseTool {
    protected listenerIDs: Record<string, number>;
    protected __controllerTriggersHeld: any[];
    protected xrvp: any;
    protected vrControllerToolTip: Sphere;
    protected vrControllerToolTipMat: Material;
    protected __grabPos: any;
    protected stageXfo__GrabStart: any;
    protected __grabDir: any;
    protected __grab_to_stage: any;
    protected __invOri: any;
    protected __grabDist: any;
    /**
     */
    constructor(xrvp: any);
    /**
     * Adds the icon to the tip of the VR Controller
     * @param event
     * @private
     */
    addIconToController(controller: XRController): void;
    /**
     * The activateTool method.
     */
    activateTool(): void;
    /**
     * The deactivateTool method.
     */
    deactivateTool(): void;
    __initMoveStage(): void;
    /**
     * The onVRControllerButtonDown method.
     * @param event - The event param.
     * @return The return value.
     */
    onVRControllerButtonDown(event: XRControllerEvent): void;
    /**
     * The onVRControllerButtonUp method.
     * @param event - The event param.
     * @return The return value.
     */
    onVRControllerButtonUp(event: XRControllerEvent): void;
    /**
     * The onVRControllerDoubleClicked method.
     * @param event - The event param.
     */
    onVRControllerDoubleClicked(event: XRControllerEvent): void;
    /**
     * The onVRPoseChanged method.
     * @param event - The event param.
     */
    onVRPoseChanged(event: XRPoseEvent): void;
    /**
     * Event fired when a pointing device button is pressed while the pointer is over the tool.
     *
     * @param event - The event param.
     */
    onPointerDown(event: ZeaPointerEvent): void;
    /**
     * Event fired when a pointing device is moved while the cursor's hotspot is inside it.
     *
     * @param event - The event param.
     */
    onPointerMove(event: ZeaPointerEvent): void;
    /**
     * Event fired when a pointing device button is released while the pointer is over the tool.
     *
     * @param event - The event param.
     */
    onPointerUp(event: ZeaPointerEvent): void;
    /**
     * Event fired when a pointing device button is double clicked on the tool.
     *
     * @param event - The event param.
     */
    onPointerDoublePress(event: ZeaPointerEvent): void;
}
export { XRViewManipulator };
