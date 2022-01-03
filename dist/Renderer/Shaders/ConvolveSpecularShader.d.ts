import { GLShader } from '../GLShader';
import './GLSL/index';
import { WebGL12RenderingContext } from '../types/webgl';
/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
declare class ConvolveSpecularShader extends GLShader {
    /**
     * Create a GL renderer.
     * @param gl - The options value.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { ConvolveSpecularShader };
