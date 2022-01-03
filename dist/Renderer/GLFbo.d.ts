import '../Math/index';
import { GLTexture2D } from './GLTexture2D';
import { BaseEvent } from '../Utilities/BaseEvent';
import { Color } from '../Math/index';
import { RenderState } from './types/renderer';
import { WebGL12RenderingContext } from './types/webgl';
/**
 * This class abstracts the rendering of a collection of geometries to screen.
 */
declare class GLFbo {
    protected colorTextureResizeEventId: number;
    protected __gl: WebGL12RenderingContext;
    protected __colorTexture: GLTexture2D;
    protected __createDepthTexture: boolean;
    protected __clearColor: Color;
    __depthTexture: WebGLTexture | null;
    protected __fbo: WebGLFramebuffer | null;
    protected __prevBoundFbo: WebGLFramebuffer | null;
    /**
     * Creates a GL Framebuffer Object
     *
     * @param gl - The Canvas 3D Context.
     * @param colorTexture - Represents 2D Texture in GL.
     * @param createDepthTexture - The createDepthTexture value.
     */
    constructor(gl: WebGL12RenderingContext, colorTexture: GLTexture2D, createDepthTexture?: boolean);
    /**
     * @private
     * @param event The event object providing the event details
     */
    textureResized(event: BaseEvent): void;
    /**
     * Sets FBO clear color using RGBA array structure.
     *
     * @param clearColor - The clearColor value.
     */
    setClearColor(clearColor: Color): void;
    /**
     * Returns the `width` of the GL Texture
     *
     * @return - The return value.
     */
    getWidth(): number;
    /**
     * Returns the `height` of the GL Texture
     *
     * @return - The return value.
     */
    getHeight(): number;
    /**
     * Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.
     *
     * @return - The return value.
     */
    getSize(): Array<number>;
    /**
     * Returns the ColorTexture of the Fbo
     *
     * @return - The return value.
     */
    getColorTexture(): GLTexture2D;
    /**
     * Returns the value of the deptTexture property.
     *
     * @return - The return value.
     */
    getDepthTextureGL(): WebGLTexture | null;
    /**
     * Returns the `width` of the GL Texture
     *
     * @return - width of GLTexture
     */
    get width(): number;
    /**
     * Returns the `height` of the GL Texture
     *
     * @return - height of GLTexture
     */
    get height(): number;
    /**
     * Returns the [width, height] of the GL Texture.
     *
     * @return - returns [width, height] of the __colorTexture
     */
    get size(): Array<number>;
    /**
     * Returns the ColorTexture of the Fbo
     *
     * @returns {GLTexture2D} - returns this.__colorTexture
     */
    get colorTexture(): GLTexture2D;
    /**
     * Sets ColorTexture of the Fbo.
     *
     * @param colorTexture - The colorTexture value.
     */
    setColorTexture(colorTexture: GLTexture2D): void;
    /**
     * Returns the value of the depthTexture property.
     *
     * @return
     */
    get depthTextureGL(): WebGLTexture | null;
    /**
     * The setup method.
     */
    setup(): void;
    /**
     * Triggered Automatically when the texture resizes.
     *
     * @todo: Fbos should manage the textures assigned to them.
     * E.g. resizing and preserving data.
     */
    resize(width: number, height: number, resizeTexture: any): void;
    /**
     * The __checkFramebuffer method.
     * @private
     */
    __checkFramebuffer(): void;
    /**
     * Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.
     *
     * @param renderstate - The renderstate value.
     */
    bindForWriting(renderstate?: RenderState): void;
    /**
     * Unbinds the Fbo to the canvas context for WRITE operations.
     *
     * @param renderstate - The renderstate value.
     */
    unbindForWriting(renderstate: RenderState): void;
    /**
     * Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.
     *
     * @param renderstate - The renderstate value.
     */
    bind(renderstate?: RenderState): void;
    /**
     * Unbinds the Fbo to the canvas context for WRITE operations.
     *
     * @param renderstate - The renderstate value.
     */
    unbind(renderstate?: RenderState): void;
    /**
     * Binds the Fbo to the canvas context, meaning that all READ operations will affect the current Fbo.
     *
     * @param renderstate - The renderstate value.
     */
    bindForReading(renderstate?: RenderState): void;
    /**
     * Unbinds the Fbo to the canvas context for READ operations.
     *
     * @param renderstate - The renderstate value.
     */
    unbindForReading(): void;
    /**
     * Enables all color components of the rendering context of the Fbo,
     * specifying the default color values when clearing color buffers and clears the buffers to preset values.
     */
    clear(): void;
    /**
     * Runs [`bind`](#bind) then [`clear`](#clear) methods.
     * @param renderstate - The renderstate value.
     */
    bindAndClear(renderstate?: RenderState): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLFbo };
