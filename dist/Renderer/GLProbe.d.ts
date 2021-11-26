import { EventEmitter } from '../Utilities/index';
import { GLTexture2D } from './GLTexture2D';
/** Class representing a GL probe.
 * @private
 */
declare class GLProbe extends EventEmitter {
    protected __gl: WebGL12RenderingContext;
    protected maxFragmentShaderTextureUnits: any;
    protected textureType: number;
    protected textureDesc: number[];
    protected __convolved: boolean;
    protected __fbos: any[];
    protected brdfLUTTexture: any;
    protected irradianceCubeTex: any;
    protected specularCubetex: any;
    /**
     * Create a GL probe.
     * @param gl - The webgl rendering context.
     * @param name - The name value.
     */
    constructor(gl: WebGL12RenderingContext, name: string);
    /**
     * The convolveProbe method.
     * @param srcGLTex - The srcGLTex value.
     */
    convolveProbe(srcGLTex: GLTexture2D): void;
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param unif - The WebGL uniform
     * @return - Returns true if the Probe was successfully bound.
     */
    bind(renderstate: RenderState): boolean;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLProbe };
