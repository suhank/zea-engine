import { GLShader } from '../GLShader';
import './GLSL/index';
import { Material } from '../../SceneTree/Material';
/** A standard shader handling Opaque and transparent items and PBR rendering.
 * @extends GLShader
 * @private
 */
declare class StandardSurfaceShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl?: WebGL12RenderingContext);
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param key - The key value.
     * @return - The return value.
     */
    bind(renderstate: RenderState, key: string): boolean;
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
export { StandardSurfaceShader };
