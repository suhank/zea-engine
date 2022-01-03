import { GLShader } from '../GLShader';
import './GLSL/index';
import { WebGL12RenderingContext } from '../types/webgl';
declare class DepthMapShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { DepthMapShader };
