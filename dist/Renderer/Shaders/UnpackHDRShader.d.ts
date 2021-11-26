import { GLShader } from '../GLShader';
import './GLSL/index';
/** Shader for unpacking HDR images using Boost HDR algorithm.
 * @extends GLShader
 * @private
 */
declare class UnpackHDRShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { UnpackHDRShader };
