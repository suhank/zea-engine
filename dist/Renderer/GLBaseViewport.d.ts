import { ParameterOwner, BaseImage, NumberParameter, ColorParameter, BaseTool } from '../SceneTree/index';
import { GLRenderer } from './GLRenderer';
import { GLHDRImage } from './GLHDRImage';
import { GLTexture2D } from './GLTexture2D';
import { GLFbo } from './GLFbo';
import { GLMesh } from './Drawing/GLMesh';
import { ZeaPointerEvent } from '../Utilities/Events/ZeaPointerEvent';
import { KeyboardEvent } from '../Utilities/Events/KeyboardEvent';
declare const FRAMEBUFFER: {
    MSAA_RENDERBUFFER: number;
    COLORBUFFER: number;
    DEPTHBUFFER: number;
};
/**
 * Class representing a GL base viewport.
 * @extends ParameterOwner
 * @private
 */
declare class GLBaseViewport extends ParameterOwner {
    protected __gl: WebGL12RenderingContext;
    protected renderer: GLRenderer;
    protected __renderer: GLRenderer;
    protected __fbo: WebGLFramebuffer | null;
    protected quad: GLMesh;
    protected offscreenBuffer: GLTexture2D | null;
    protected depthTexture: GLTexture2D | null;
    protected highlightedGeomsBuffer: GLTexture2D;
    protected highlightedGeomsBufferFbo: GLFbo;
    protected __backgroundTexture: BaseImage | null;
    protected __backgroundGLTexture: GLHDRImage | GLTexture2D | null;
    protected offscreenBufferFbo: GLFbo | null;
    protected __width: number;
    protected __height: number;
    protected __canvasWidth: number;
    protected __canvasHeight: number;
    protected fb: Array<WebGLFramebuffer | null> | null;
    protected colorRenderbuffer: any;
    protected depthBuffer: WebGLRenderbuffer | null;
    protected EXT_frag_depth: EXT_frag_depth | null;
    protected manipulator: any;
    protected depthRange: number[];
    /**
     * @member backgroundColorParam - Changes background color of the scene
     */
    backgroundColorParam: ColorParameter;
    /**
     * @member doubleClickTimeParam - The maximum time between clicks for a double click to be registered.
     */
    doubleClickTimeParam: NumberParameter;
    /**
     * Create a GL base viewport.
     * @param renderer - The renderer value.
     */
    constructor(renderer: GLRenderer);
    /**
     * The getWidth method.
     * @return - The return value.
     */
    getWidth(): number;
    /**
     * The getHeight method.
     * @return - The return value.
     */
    getHeight(): number;
    /**
     * The resize method.
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
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: ColorRenderState): void;
    /**
     * Draws the Silhouettes around geometries.
     * @param renderstate - The object tracking the current state of the renderer
     * @private
     */
    drawSilhouettes(renderstate: RenderState): void;
    /**
     * Draws the highlights around geometries.
     * @param renderstate - The object tracking the current state of the renderer
     * @private
     */
    drawHighlights(renderstate: RenderState): void;
    /**
     * The getManipulator method.
     * @return - The return value.
     */
    getManipulator(): BaseTool;
    /**
     * Sets the tool that will receive mouse, touch and keyboard events from the viewport.
     * @param tool - The manipulator value.
     */
    setManipulator(tool: BaseTool): void;
    /**
     * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
     *
     * @param event - The DOM event produced by a pointer
     */
    onPointerDown(event: ZeaPointerEvent): void;
    /**
     * Handler of the `pointerup` event fired when the pointer device is finally released.
     *
     * @param event - The DOM event produced by a pointer
     */
    onPointerUp(event: ZeaPointerEvent): void;
    /**
     * Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled
     *
     * @param event - The DOM event produced by a pointer
     */
    onPointerMove(event: ZeaPointerEvent): void;
    /**
     * Invoked when the mouse pointer is moved into this viewport.
     *
     * @param event - The DOM event produced by a pointer
     */
    onPointerEnter(event: ZeaPointerEvent): void;
    /**
     * Invoked when the mouse pointer is moved out of this viewport.
     *
     * @param event - The DOM event produced by a pointer
     */
    onPointerLeave(event: ZeaPointerEvent): void;
    /**
     * Invoked when the mouse pointer is moved out of an element.
     * @param event - The event that occurs.
     */
    onMouseLeave(event: ZeaPointerEvent): void;
    /**
     * Invoked when the user is pressing a key on the keyboard.
     * @param event - The event that occurs.
     */
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Causes an event to occur  when the user releases a key on the keyboard.
     * @param event - The event that occurs.
     */
    onKeyUp(event: KeyboardEvent): void;
}
export { GLBaseViewport, FRAMEBUFFER };
