/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import frag from './EnvMap.frag';
// @ts-ignore
import vert from './EnvMap.vert';
class EnvMapShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'EnvMapShader');
        this.setShaderStage('VERTEX_SHADER', vert);
        this.setShaderStage('FRAGMENT_SHADER', frag);
    }
}
export { EnvMapShader };
//# sourceMappingURL=EnvMapShader.js.map