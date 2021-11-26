/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import frag from './PostProcessing.frag';
// @ts-ignore
import vert from './PostProcessing.vert';
class PostProcessing extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'PostProcessing');
        this.setShaderStage('VERTEX_SHADER', vert);
        this.setShaderStage('FRAGMENT_SHADER', frag);
    }
}
export { PostProcessing };
//# sourceMappingURL=PostProcessing.js.map