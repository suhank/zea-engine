import { Registry } from '../../Registry';
import { ScreenSpaceMaterial } from '../../SceneTree/Materials/ScreenSpaceMaterial';
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import frag from './ScreenSpace.frag';
// @ts-ignore
import vert from './ScreenSpace.vert';
class ScreenSpaceShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'ScreenSpaceShader');
        this.setShaderStage('VERTEX_SHADER', vert);
        this.setShaderStage('FRAGMENT_SHADER', frag);
    }
    static isOverlay() {
        return true;
    }
    /**
     * The getPackedMaterialData method.
     * @param material - The material param.
     * @return - The return value.
     */
    static getPackedMaterialData(material) {
        const matData = new Float32Array(8);
        const baseColor = material.getParameter('BaseColor').value;
        matData[0] = baseColor.r;
        matData[1] = baseColor.g;
        matData[2] = baseColor.b;
        matData[3] = baseColor.a;
        return matData;
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
const material = new ScreenSpaceMaterial('ScreenSpaceShader_template');
Registry.register('ScreenSpaceShader', ScreenSpaceShader);
export { ScreenSpaceShader };
//# sourceMappingURL=ScreenSpaceShader.js.map