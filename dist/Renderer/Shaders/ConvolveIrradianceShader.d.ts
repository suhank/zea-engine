import { GLShader } from '../GLShader';
import './GLSL/index';
/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
declare class ConvolveIrradianceShader extends GLShader {
    /**
     * Create a GL renderer.
     * @param gl - The options value.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { ConvolveIrradianceShader };
