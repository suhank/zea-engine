import { Registry } from '../../Registry';
import { FatPointsMaterial } from '../../SceneTree';
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import vert from './FatPoints.vert';
// @ts-ignore
import frag from './FatPoints.frag';
class FatPointsShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'FatPointsShader');
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
const material = new FatPointsMaterial('FatPointsShader_template');
Registry.register('FatPointsShader', FatPointsShader);
export { FatPointsShader };
//# sourceMappingURL=FatPointsShader.js.map