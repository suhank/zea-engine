import { GLShader } from '../GLShader';
import './GLSL/index';
declare class BillboardShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { BillboardShader };
