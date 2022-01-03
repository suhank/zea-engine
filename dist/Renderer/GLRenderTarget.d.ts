import { Color } from '../Math/Color';
import { EventEmitter } from '../Utilities/index';
import { RenderState, Uniform } from './types/renderer';
import { WebGL12RenderingContext } from './types/webgl';
/** Class representing a GL render target. */
declare class GLRenderTarget extends EventEmitter {
    protected __gl: WebGL12RenderingContext;
    protected textureTargets: any[];
    protected depthTexture: any;
    protected textureDesc: number[];
    protected frameBuffer: any;
    protected params: Record<string, any>;
    protected type: any;
    protected format: any;
    protected internalFormat: any;
    protected filter: any;
    protected wrap: any;
    protected flipY: any;
    protected width: number;
    protected height: number;
    clearColor: Color;
    protected colorMask: Array<boolean>;
    protected textureType: any;
    protected __prevBoundFbo: any;
    /**
     * Create a GL render target.
     * @param gl - The webgl rendering context.
     * @param params - The params value.
     */
    constructor(gl: WebGL12RenderingContext, params?: Record<string, any>);
    /**
     * The configure method.
     * @param params - The params param.
     */
    configure(params: Record<string, any>): void;
    /**
     * The checkFramebuffer method.
     */
    checkFramebuffer(): void;
    /**
     * The bindForWriting method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param clear - The clear value.
     */
    bindForWriting(renderstate?: RenderState, clear?: boolean): void;
    /**
     * The unbindForWriting method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    unbindForWriting(renderstate?: RenderState): void;
    /**
     * The clear method.
     * @param clearDepth - The clearDepth value.
     */
    clear(clearDepth?: boolean): void;
    /**
     * Binds the render target in preparation for 'readPixels' calls to pull data back to main memory.
     */
    bindForReading(): void;
    /**
     * The unbindForReading method.
     */
    unbindForReading(): void;
    /**
     * The bindColorTexture method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param channelId - The channelId value.
     * @return - The return value.
     */
    bindColorTexture(renderstate: RenderState, unif: Uniform, channelId?: number): boolean;
    /**
     * The bindDepthTexture method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param unif - The WebGL uniform
     * @return - The return value.
     */
    bindDepthTexture(renderstate: RenderState, unif: Uniform): boolean;
    /**
     * The unbind method.
     */
    unbind(renderstate?: RenderState): void;
    /**
     * The resize method.
     * @param width - The width value.
     * @param height - The height value.
     * @param preserveData - The preserveData value.
     */
    resize(width: number, height: number, preserveData?: boolean): void;
    /**
     * The bindToUniform method.
     * @param renderstate - The renderstate param.
     * @param unif - The WebGL uniform
     * @param bindings - The bindings param.
     * @return - The return value.
     */
    bindToUniform(renderstate: RenderState, unif: Uniform, bindings?: any): boolean;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLRenderTarget };
