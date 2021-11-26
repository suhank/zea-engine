/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import frag from './ConvolveIrradiance.frag';
// @ts-ignore
import vert from './ConvolveIrradiance.vert';
/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class ConvolveIrradianceShader extends GLShader {
    /**
     * Create a GL renderer.
     * @param gl - The options value.
     */
    constructor(gl) {
        super(gl, 'ConvolveIrradianceShader');
        this.setShaderStage('VERTEX_SHADER', vert);
        this.setShaderStage('FRAGMENT_SHADER', frag);
    }
}
export { ConvolveIrradianceShader };
//# sourceMappingURL=ConvolveIrradianceShader.js.map