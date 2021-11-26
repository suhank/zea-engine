import { GLTexture2D } from './GLTexture2D';
import { GLFbo } from './GLFbo';
import { IGeomShaderBinding } from './Drawing/GeomShaderBinding';
import { VLHImage } from '../SceneTree/Images/VLHImage';
import { BaseImage } from '../SceneTree/BaseImage';
import { GLShader } from './GLShader';
/** Class representing a GL high dynamic range (HDR) image.
 * @extends GLTexture2D
 * @private
 */
declare class GLHDRImage extends GLTexture2D {
    protected listenerIDs: Record<string, number>;
    protected hdrImage: VLHImage;
    protected fbo: GLFbo | null;
    protected srcLDRTex: GLTexture2D | null;
    protected srcCDMTex: GLTexture2D | null;
    protected unpackHDRShader: GLShader | null;
    protected shaderBinding: IGeomShaderBinding | null;
    /**
     * Create a GL HDR image.
     * @param gl - The webgl rendering context.
     * @param hdrImage - The HDR image.
     */
    constructor(gl: WebGL12RenderingContext, hdrImage: VLHImage);
    /**
     * Returns the `BaseImage` of the GL Texture
     *
     * @return - The return value.
     */
    getImage(): BaseImage;
    /**
     * The __unpackHDRImage method.
     * @param hdrImageParams - The HDR image parameters.
     * @private
     */
    __unpackHDRImage(hdrImageParams: Record<string, any>): void;
    /**
     * The bindToUniform method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param unif - The WebGL uniform
     * @param bindings - The bindings value.
     * @return - The return value.
     */
    bindToUniform(renderstate: RenderState, unif: Uniform, bindings?: Record<string, any>): boolean;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLHDRImage };
