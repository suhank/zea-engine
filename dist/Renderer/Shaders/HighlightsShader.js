/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader';
// @ts-ignore
import frag from './Highlights.frag';
// @ts-ignore
import vert from './Highlights.vert';
class HighlightsShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'HighlightsShader');
        this.setShaderStage('VERTEX_SHADER', vert);
        this.setShaderStage('FRAGMENT_SHADER', frag);
    }
}
export { HighlightsShader };
//# sourceMappingURL=HighlightsShader.js.map