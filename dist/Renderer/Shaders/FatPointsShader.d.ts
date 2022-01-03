import { Material } from '../../SceneTree';
import { GLShader } from '../GLShader';
import './GLSL/index';
import { RenderState } from '../types/renderer';
import { WebGL12RenderingContext } from '../types/webgl';
declare class FatPointsShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl?: WebGL12RenderingContext);
    bind(renderstate: RenderState, key: any): boolean;
    /**
     * The supportsInstancing method.
     * @return - return false for shaders that cannot be rendered in instanced mode.
     */
    static supportsInstancing(): boolean;
    /**
     * Each shader provides a template material that each material instance is
     * based on. The shader specifies the parameters needed by the shader, and
     * the material provides values to the shader during rendering.
     * @return - The template material value.
     */
    static getMaterialTemplate(): Material;
}
export { FatPointsShader };
