import { Vec2, Vec3 } from '../../Math/index';
import { BaseTool } from './BaseTool';
import { NumberParameter, BooleanParameter } from '../Parameters/index';
import { Camera } from '../Camera';
import { ZeaPointerEvent } from '../../Utilities/Events/ZeaPointerEvent';
import { ZeaMouseEvent } from '../../Utilities/Events/ZeaMouseEvent';
import { ZeaWheelEvent } from '../../Utilities/Events/ZeaWheelEvent';
import { Touch, ZeaTouchEvent } from '../../Utilities/Events/ZeaTouchEvent';
import { KeyboardEvent } from '../../Utilities/Events/KeyboardEvent';
interface OngoingTouch {
    identifier: number;
    pos: Vec2;
}
/**
 * Class for defining and interaction model of the camera.
 *
 * The CameraManipulator supports a variety of manipulation modes, and hotkeys/modifier keys
 * that allow the user to rapidly switch between modes, such as 'turntable' and 'pan'.
 * A detailed explanation of various camera manipulation modes can be found
 * here: https://www.mattkeeter.com/projects/rotation/
 *
 * **MANIPULATION_MODES**
 * * **pan:** Translates the camera sideways according the the camera's current orientation. Activated by the right mouse button, or two fingered touches on mobile.
 * * **dolly:** Translates the camera forwards and backwards according the the camera's current orientation. Activated by holding the ctrl and alt keys while using the left mouse button, or the mouse wheel, or two fingered touches on mobile.
 * * **focussing:** Focusses the camera on a specific 3d point in the scene. Activated by double clicking, or double tapping on a geometry in the 3d view.
 * * **look:** Rotates the camera around its own position. Useful for simulating looking by turning ones head inside a scene. Activated by holding the ctrl key and right mouse button.
 * * **turntable:** Rotates the camera around the current camera target, using the turntable style manipulation described above. Activated by the left mouse button.
 * * **tumbler:** Rotates the camera around the current camera target, using the tumbler style manipulation described above. Activated by the left mouse button.
 * * **trackball:** Rotates the camera around the current camera target, using the trackball style manipulation described above. Activated by the left mouse button.
 *
 * The default manipulation mode, is the mode that is active with only the left mouse button. The default manipulation mode is currently 'turntable'.
 *
 * To Assign a different default manipulation mode, retrieve the manipulator from the viewport
 * and set the default mode.
 * ```
 * const cameraManipulator = renderer.getViewport().getManipulator()
 * cameraManipulator.setDefaultManipulationMode(CameraManipulator.MANIPULATION_MODES.trackball);
 * ```
 *
 * This class is the default manipulator, and can be replaced with custom manipulators.
 *
 * ```
 * const customManipulator = new CustomCameraManipulator()
 * renderer.getViewport().setManipulator(customManipulator);
 * ```
 *
 * The Camera manipulator can focus the view on a point in the view by various gestures.
 * A single click or touch tap can cause the view to be focussed or a double click or tap.
 * This behavior can be configured using the 2 values.
 * e.g. to disable all focus gestures, set both values to zero.
 * ```
 * const cameraManipulator = renderer.getViewport().getManipulator()
 * cameraManipulator.aimFocusOnTouchTap = 0
 * cameraManipulator.aimFocusOnMouseClick = 0
 * ```
 *
 * **Parameters**
 * * **OrbitRate(`NumberParameter`):** The rate at which mouse or touch interactions are translated camera orientation changes.
 * * **DollySpeed(`NumberParameter`):** The rate at which the mouse button or touch interactions are translated camera dolly movement.
 * * **mouseWheelDollySpeed(`NumberParameter`):** The rate at which the mouse wheel interactions are translated camera dolly movement.
 *
 *   Note: this value defaults to different values for touch based interfaces to mouse based input.
 *   For mobile devices, the orbit rate defaults to 0.5, and for mouse based interaction, the value defaults to 1.
 *   A value of 1 means that the camera will rotate 180 degrees for a mouse interaction that spans from the left border of the viewport to the right border.
 *   Some applications might require lower, or higher default values
 *
 * To set different default values for mobile or desktop set a different value based on the SystemDesc.isMobileDevice flag.
 * ```
 * const cameraManipulator = renderer.getViewport().getManipulator()
 * cameraManipulator.getParameter('OrbitRate').setValue(SystemDesc.isMobileDevice ? 0.1 : 0.4)
 * ```
 *
 * **Events**
 * * **movementFinished:** Emitted when a camera movement is finished. E.g. when the user releases the mouse after a dolly, or after the focussing action has completed.
 * * **aimingFocus:** Emitted when a camera is being focussed on a target. E.g. when the user double clicks the mouse on a geometry in the view.
 *
 * @extends BaseTool
 */
declare class CameraManipulator extends BaseTool {
    protected appData: Record<string, any>;
    protected __defaultManipulationState: number;
    protected __manipulationState: any;
    protected __pointerDown: boolean;
    protected __dragging: number;
    protected aimFocusOnTouchTap: number;
    protected aimFocusOnMouseClick: number;
    protected enabledWASDWalkMode: boolean;
    protected __keyboardMovement: boolean;
    protected __keysPressed: any[];
    protected __velocity: Vec3;
    protected __prevVelocityIntegrationTime: number;
    protected __ongoingTouches: Record<string, OngoingTouch>;
    protected __orbitTarget: any;
    protected prevCursor: any;
    protected __prevPointerPos: any;
    protected __focusIntervalId: any;
    __mouseWheelMovementDist: number;
    protected __mouseWheelZoomCount: number;
    protected __mouseWheelZoomId: number;
    /**
     * @member orbitRateParam - The rate at which mouse or touch interactions are translated camera orientation changes.
     */
    orbitRateParam: NumberParameter;
    /**
     * @member dollySpeedParam - The rate at which the mouse button or touch interactions are translated camera dolly movement.
     */
    dollySpeedParam: NumberParameter;
    /**
     * @member mouseWheelDollySpeedParam - The rate at which the mouse wheel interactions are translated camera dolly movement.
     */
    mouseWheelDollySpeedParam: NumberParameter;
    /**
     * @member orbitAroundCursor - TODO
     */
    orbitAroundCursor: BooleanParameter;
    /**
     * @member walkSpeedParam - TODO
     */
    walkSpeedParam: NumberParameter;
    /**
     * @member walkModeCollisionDetection - TODO
     */
    walkModeCollisionDetection: BooleanParameter;
    /**
     * Create a camera, mouse and keyboard
     * @param appData - The object containing the scene and the renderer.
     */
    constructor(appData: Record<string, any>);
    /**
     * Enables tools usage.
     */
    activateTool(): void;
    /**
     * Disables tool usage.
     */
    deactivateTool(): void;
    /**
     * Sets default manipulation mode.
     * The value can be on of the keys in #CameraManipulator.MANIPULATION_MODES
     *
     * @param manipulationMode - The manipulation mode value.
     */
    setDefaultManipulationMode(manipulationMode: string): void;
    /**
     * The look method.
     * @param event - The event value.
     * @param dragVec - The drag vector value.
     */
    look(event: Record<string, any>, dragVec: Vec2): void;
    /**
     * Rotates viewport camera about the target.
     *
     * @param event - The event value.
     * @param dragVec - The drag vector value.
     */
    turntable(event: Record<string, any>, dragVec: Vec2): void;
    /**
     * Rotates viewport camera about the target.
     *
     * @param event - The event value.
     * @param dragVec - The drag vector value.
     */
    tumbler(event: Record<string, any>, dragVec: Vec2): void;
    /**
     * Rotates viewport camera about the target.
     *
     * @param event - The event value.
     * @param dragVec - The drag vector value.
     */
    trackball(event: Record<string, any>, dragVec: Vec2): void;
    /**
     * Rotates the camera around its own `X`,`Y` axes.
     *
     * @param event - The event value.
     * @param dragVec - The drag vector value.
     */
    pan(event: Record<string, any>, dragVec: Vec2): void;
    /**
     * The dolly method.
     * @param event - The event value.
     * @param dragVec - The drag vector value.
     */
    dolly(event: Record<string, any>, dragVec: Vec2): void;
    /**
     * The initDrag method.
     *
     * @private
     * @param event - The event value.
     */
    initDrag(event: Record<string, any>): void;
    /**
     * The initDrag method.
     *
     * @private
     * @param event - The event value.
     */
    endDrag(event: Record<string, any>): void;
    /**
     * The aimFocus method.
     *
     * @private
     * @param camera - The camera that we are aiming
     * @param target - The target to focus on.
     * @param distance - The distance from the target to get to.
     * @param duration - The duration in milliseconds to aim the focus.
     */
    aimFocus(camera: Camera, target: Vec3, distance?: number, duration?: number): void;
    /**
     * The orientPointOfView method.
     *
     * @private
     * @param camera - The camera that we are orienting
     * @param position - The target to focus on.
     * @param target - The target to focus on.
     * @param distance - The distance to the specified we want the user to be moved to
     * @param duration - The duration in milliseconds to aim the focus.
     */
    orientPointOfView(camera: Camera, position: Vec3, target: Vec3, distance?: number, duration?: number): void;
    /**
     * Invoked when a user double presses a pointer over an element.
     *
     * @param event - The pointer event that occurs
     * @memberof CameraManipulator
     */
    onPointerDoublePress(event: ZeaPointerEvent): void;
    /**
     * Event fired when either the mouse button is pressed, or a touch start event occurs.
     *
     * @param event - The mouse event that occurs.
     */
    onPointerDown(event: ZeaPointerEvent): void;
    /**
     * Event fired when either the mouse cursor is moved, or a touch point moves.
     *
     * @param event - The mouse event that occurs.
     */
    onPointerMove(event: ZeaPointerEvent): void;
    /**
     * The event that occurs when the user moves the pointer across a screen.
     *
     * @param event -The event value
     */
    _onMouseMove(event: ZeaMouseEvent): void;
    /**
     * The event that occurs when the user moves pointer across a touch screen.
     *
     * @param event - The touch event that occurs.
     * @private
     */
    _onTouchMove(event: ZeaTouchEvent): void;
    /**
     * Event fired when either the mouse button is released, or a touch end event occurs.
     *
     * @param event - The mouse event that occurs.
     */
    onPointerUp(event: ZeaPointerEvent): void;
    /**
     * Causes an event to occur when the mouse pointer is moved into this viewport
     * @param event - The event that occurs.
     */
    onPointerEnter(event: ZeaPointerEvent): void;
    /**
     * Causes an event to occur when the mouse pointer is moved out of this viewport
     * @param event - The event that occurs.
     */
    onPointerLeave(event: ZeaPointerEvent): void;
    /**
     * Invoked when the mouse wheel is rolled up or down over an element.
     *
     * @param event - The wheel event that occurs.
     */
    onWheel(event: ZeaWheelEvent): void;
    /**
     * The integrateVelocityChange method.
     * @param event - The event value.
     * @private
     */
    integrateVelocityChange(event: Record<string, any>): void;
    /**
     * Invoked when the user is pressing a key on the keyboard.
     *
     * @param event - The keyboard event that occurs.
     * @private
     */
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Invoked when the user releases a key on the keyboard.
     *
     * @param event - The event that occurs.
     */
    onKeyUp(event: KeyboardEvent): void;
    /**
     * The __startTouch method.
     * @param touch - The touch value.
     * @private
     */
    __startTouch(touch: Touch): void;
    /**
     * The __endTouch method.
     * @param touch - The touch value.
     * @private
     */
    __endTouch(touch: Touch): void;
    /**
     * Invoked when the user touches an element on a touch screen.
     *
     * @param event - The touch event that occurs.
     */
    _onTouchStart(event: ZeaTouchEvent): void;
    /**
     * Invoked when the user removes his/her finger from the touch pad.
     *
     * @param event - The touch event that occurs.
     */
    onTouchEnd(event: ZeaTouchEvent): void;
    /**
     * Invoked when the touch event gets interrupted.
     *
     * @param event - The touch event that occurs.
     */
    onTouchCancel(event: ZeaTouchEvent): void;
    /**
     * Returns a dictionary of support manipulation modes.
     *
     * @param event - The touch event that occurs.
     */
    static get MANIPULATION_MODES(): {
        [key: string]: number;
    };
}
export { CameraManipulator };
