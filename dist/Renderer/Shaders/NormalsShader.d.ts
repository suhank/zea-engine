import { GLShader } from '../GLShader';
import { WebGL12RenderingContext } from '../types/webgl';
import './GLSL/index';
declare class NormalsShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { NormalsShader };
