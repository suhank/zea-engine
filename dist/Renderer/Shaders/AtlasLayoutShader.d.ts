import { GLShader } from '../GLShader';
import './GLSL/index';
declare class AtlasLayoutShader extends GLShader {
    /**
     * Create an atlas layout shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { AtlasLayoutShader };
