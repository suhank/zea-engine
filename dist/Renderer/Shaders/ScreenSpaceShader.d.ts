import { Material } from '../../SceneTree/Material';
import { GLShader } from '../GLShader';
import './GLSL/index';
declare class ScreenSpaceShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl?: WebGL12RenderingContext);
    static isOverlay(): boolean;
    /**
     * The getPackedMaterialData method.
     * @param material - The material param.
     * @return - The return value.
     */
    static getPackedMaterialData(material: Material): Float32Array;
    /**
     * Each shader provides a template material that each material instance is
     * based on. The shader specifies the parameters needed by the shader, and
     * the material provides values to the shader during rendering.
     * @return - The template material value.
     */
    static getMaterialTemplate(): Material;
}
export { ScreenSpaceShader };
