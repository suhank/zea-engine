/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import frag from './DepthMapShader.frag';
// @ts-ignore
import vert from './DepthMapShader.vert';
class DepthMapShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'DepthMapShader');
        this.setShaderStage('VERTEX_SHADER', vert);
        this.setShaderStage('FRAGMENT_SHADER', frag);
    }
}
export { DepthMapShader };
//# sourceMappingURL=DepthMapShader.js.map