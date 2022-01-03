import { GLShader } from '../GLShader';
import './GLSL/index';
import { WebGL12RenderingContext } from '../types/webgl';
declare class EnvProjectionShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
declare class OctahedralEnvProjectionShader extends EnvProjectionShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
declare class LatLongEnvProjectionShader extends EnvProjectionShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl: WebGL12RenderingContext);
}
export { EnvProjectionShader, OctahedralEnvProjectionShader, LatLongEnvProjectionShader };
