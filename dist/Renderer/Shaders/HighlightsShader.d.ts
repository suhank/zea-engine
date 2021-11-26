import { GLShader } from '../GLShader';
declare class HighlightsShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { HighlightsShader };
