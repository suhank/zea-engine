import { Registry } from '../../Registry';
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import frag from './FatLines.frag';
// @ts-ignore
import vert from './FatLines.vert';
import { FatLinesMaterial } from '../../SceneTree/Materials/FatLinesMaterial';
/** Shader for drawing Fat lines
 * @extends GLShader
 * @private
 */
class FatLinesShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'FatLinesShader');
        this.setShaderStage('VERTEX_SHADER', vert);
        this.setShaderStage('FRAGMENT_SHADER', frag);
    }
    bind(renderstate, key) {
        if (super.bind(renderstate, key)) {
            renderstate.supportsInstancing = false;
            return true;
        }
        return false;
    }
    /**
     * The supportsInstancing method.
     * @return - return false for shaders that cannot be rendered in instanced mode.
     */
    static supportsInstancing() {
        return false;
    }
    /**
     * Each shader provides a template material that each material instance is
     * based on. The shader specifies the parameters needed by the shader, and
     * the material provides values to the shader during rendering.
     * @return - The template material value.
     */
    static getMaterialTemplate() {
        return material;
    }
}
const material = new FatLinesMaterial('FatLinesShader_template');
Registry.register('FatLinesShader', FatLinesShader);
export { FatLinesShader };
//# sourceMappingURL=FatLinesShader.js.map