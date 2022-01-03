import { GLShader } from '../GLShader';
import { Material } from '../../SceneTree/Material';
import './GLSL/index';
import { WebGL12RenderingContext } from '../types/webgl';
/** A simple shader with no support for PBR or textures
 * @ignore
 */
declare class SimpleSurfaceShader extends GLShader {
    /**
     * Create a SimpleSurfaceShader
     * @param gl - gl context
     */
    constructor(gl?: WebGL12RenderingContext);
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
export { SimpleSurfaceShader };
