import { Vec2, Ray, Mat4, Xfo } from '../Math/index';
import { Camera, TreeItem } from '../SceneTree/index';
import { GLBaseViewport } from './GLBaseViewport';
import { GLFbo } from './GLFbo';
import { GLTexture2D } from './GLTexture2D';
import { GLRenderer } from './GLRenderer';
import { IntersectionData } from '../Utilities/IntersectionData';
import { KeyboardEvent } from '../Utilities/Events/KeyboardEvent';
import { ZeaWheelEvent } from '../Utilities/Events/ZeaWheelEvent';
import { ZeaTouchEvent } from '../Utilities/Events/ZeaTouchEvent';
import { ZeaUIEvent } from '../Utilities/Events/ZeaUIEvent';
import { RenderState } from './types/renderer';
/**
 * Class representing a GL viewport.
 *
 * **Events**
 * * **resized:** Emitted when the GLViewport resizes
 * * **updated:** Emitted when the GLViewport needs updating. The Renderer will trigger a redraw when this occurs.
 * * **viewChanged:** Emitted when the view changes. Usually caused by the camera moving.
 * * **pointerDoublePressed:** Emitted when the user double clicks with the mouse, or double taps in the viewport.
 * * **pointerDown:** Emitted when the user presses a pointer
 * * **pointerUp:** Emitted when the user releases a pointer
 * * **pointerOverGeom:** Emitted when the pointer is moved over a geometry
 * * **pointerLeaveGeom:** Emitted when the pointer is moved off a geometry
 * * **pointerMove:** Emitted when the pointer is moved
 * * **pointerEnter:** Emitted when the pointer is moved into thg viewport
 * * **pointerLeave:** Emitted when the mouse leaves the viewport.
 * * **keyDown:** Emitted when the user presses a key on the keyboard
 * * **keyUp:** Emitted when the user releases a key on the keyboard
 * * **touchCancel:** Emitted when the user cancels a touch interaction
 *
 * @extends GLBaseViewport
 */
declare class GLViewport extends GLBaseViewport {
    protected __name: string;
    protected __projectionMatrix: Mat4;
    protected __frustumDim: Vec2;
    protected __camera: Camera;
    protected __bl: Vec2;
    protected __tr: Vec2;
    protected __prevDownTime: number;
    protected __geomDataBuffer: GLTexture2D;
    protected __geomDataBufferSizeFactor: number;
    protected __geomDataBufferFbo: GLFbo;
    protected debugGeomShader: boolean;
    protected debugHighlightedGeomsBuffer: boolean;
    protected __x: number;
    protected __y: number;
    protected region: Array<number>;
    protected __cameraXfo: Xfo;
    protected __cameraMat: Mat4;
    protected __viewMat: Mat4;
    protected __geomDataBufferInvalid: boolean;
    protected __screenPos: Vec2 | null;
    protected __intersectionData: IntersectionData;
    protected pointerOverItem: TreeItem;
    /**
     * Create a GL viewport.
     * @param renderer - The renderer value.
     * @param name - The name value.
     * @param width - The width of the viewport
     * @param height - The height of the viewport
     */
    constructor(renderer: GLRenderer, name: string, width: number, height: number);
    /**
     * The getBl method.
     * @return - The return value.
     */
    getBl(): Vec2;
    /**
     * The setBl method.
     * @param bl - The bl value.
     */
    setBl(bl: number): void;
    /**
     * The getTr method.
     * @return - The return value.
     */
    getTr(): Vec2;
    /**
     * The setTr method.
     * @param tr - The tr value.
     */
    setTr(tr: number): void;
    /**
     * The getPosX method.
     * @return - The return value.
     */
    getPosX(): number;
    /**
     * The getPosY method.
     * @return - The return value.
     */
    getPosY(): number;
    /**
     * Dynamically resizes viewport.
     *
     * @param canvasWidth - The canvasWidth value.
     * @param canvasHeight - The canvasHeight value.
     */
    resize(canvasWidth: number, canvasHeight: number): void;
    /**
     * Resize any offscreen render targets.
     * > Note: Values ,ay not be the entire canvas with if multiple viewports exists.
     * @param width - The width used by this viewport.
     * @param height - The height  used by this viewport.
     */
    resizeRenderTargets(width: number, height: number): void;
    /**
     * Returns current camera object
     *
     * @return - The return value.
     */
    getCamera(): Camera;
    /**
     * Sets current camera object
     *
     * @param camera - The camera value.
     */
    setCamera(camera: Camera): void;
    __updateProjectionMatrix(): void;
    /**
     * The getProjectionMatrix method.
     * @return - The return projection matrix for the viewport.
     */
    getProjectionMatrix(): Mat4;
    /**
     * The getProjectionMatrix method.
     * @return - The return projection matrix for the viewport.
     */
    getViewMatrix(): Mat4;
    /**
     * Calculates a new camera position that frames all the items passed in `treeItems` array, moving
     * the camera to a point where we can see all of them.
     * > See Camera.frameView
     * @param treeItems - The array of TreeItem.
     */
    frameView(treeItems?: TreeItem[]): void;
    /**
     * Compute a ray into the scene based on a mouse coordinate.
     * @param screenPos - The screen position.
     * @return - The return value.
     */
    calcRayFromScreenPos(screenPos: Vec2): Ray;
    /**
     * Renders the scene geometry to the viewport's geom data buffer
     * in preparation for mouse picking.
     */
    renderGeomDataFbo(): void;
    /**
     * The invalidateGeomDataBuffer method.
     */
    invalidateGeomDataBuffer(): void;
    /**
     * The getGeomDataAtPos method.
     * @param screenPos - The screen position.
     * @param pointerRay - The pointerRay value.
     * @return - The return value.
     */
    getGeomDataAtPos(screenPos: Vec2, pointerRay: Ray | undefined): IntersectionData | null;
    /**
     * getGeomItemsInRect
     * Gathers all the geoms renders in a given rectangle of the viewport.
     * @param tl - The top left value of the rectangle.
     * @param br - The bottom right corner of the rectangle.
     * @return - The return value.
     */
    getGeomItemsInRect(tl: Vec2, br: Vec2): Set<TreeItem>;
    /**
     * Calculates the event coordinates relative to the viewport.
     * There could be multiple viewports connected to the current renderer.
     *
     * @param rendererX - The rendererX value
     * @param rendererY - The rendererY value
     * @return - Returns a new Vec2.
     * @private
     */
    __getPointerPos(rendererX: number, rendererY: number): Vec2;
    /**
     * Prepares pointer event by adding properties of the engine to it.
     *
     * @param event - The event that occurs in the canvas
     * @private
     */
    prepareUIEvent(event: ZeaUIEvent): void;
    /**
     * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
     *
     * @param event - The DOM event produced by a pointer
     */
    onPointerDown(event: ZeaUIEvent): void;
    /**
     * Causes an event to occur when a user releases a mouse button over a element.
     *
     * @param event - The event that occurs.
     */
    onPointerUp(event: ZeaUIEvent): void;
    /**
     * Causes an event to occur when the pointer device is moving.
     *
     * @param event - The event that occurs.
     */
    onPointerMove(event: ZeaUIEvent): void;
    /**
     * Causes an event to occur when the mouse pointer is moved into this viewport
     * @param event - The event that occurs.
     */
    onPointerEnter(event: ZeaUIEvent): void;
    /**
     * Causes an event to occur when the mouse pointer is moved out of this viewport
     * @param event - The event that occurs.
     */
    onPointerLeave(event: ZeaUIEvent): void;
    /**
     * Causes an event to occur when the user is pressing a key on the keyboard.
     * @param event - The event that occurs.
     */
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Causes an event to occur  when the user releases a key on the keyboard.
     * @param event - The event that occurs.
     */
    onKeyUp(event: KeyboardEvent): void;
    /**
     * Causes an event to occur when the mouse wheel is rolled up or down over an element.
     * @param event - The event that occurs.
     */
    onWheel(event: ZeaWheelEvent): void;
    /**
     * Causes an event to occur when the touch event gets interrupted.
     * @param event - The event that occurs.
     */
    onTouchCancel(event: ZeaTouchEvent): void;
    /**
     * The __initRenderState method.
     * @param renderstate - The object tracking the current state of the renderer
     * @private
     */
    __initRenderState(renderstate: RenderState): void;
    /**
     * The draw method.
     */
    draw(): void;
}
export { GLViewport };
