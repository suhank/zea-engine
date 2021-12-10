import { GLShader } from '../GLShader';
import './GLSL/index';
declare class ScreenQuadShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { ScreenQuadShader };