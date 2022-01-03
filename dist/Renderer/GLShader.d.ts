import { BaseItem, Material } from '../SceneTree';
import { ShaderParseResult, Shaderopts, RenderState } from './types/renderer';
import { WebGL12RenderingContext } from './types/webgl';
/** Class representing a GL shader.
 * @extends BaseItem
 * @private
 */
declare class GLShader extends BaseItem {
    protected __gl: WebGL12RenderingContext | undefined;
    protected __shaderStagesGLSL: Record<string, string>;
    protected __shaderStages: Record<string, ShaderParseResult>;
    protected __shaderProgramHdls: Record<string, any>;
    protected __gltextures: Record<string, any>;
    protected __shaderCompilationAttempted: boolean;
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl?: WebGL12RenderingContext, name?: string);
    /**
     * Sets the GL context to the shader.
     * > Note: normally the context should be passed to the constructor. This method us used when using the Registry to construct shaders.
     * @param gl - The webgl rendering context.
     */
    setGLContext(gl: WebGL12RenderingContext): void;
    /**
     * Sets the GLSL code for a given shader stage.
     * @param stageName - The name of the stage. currently only 'VERTEX_SHADER' or 'FRAGMENT_SHADER' are supported.
     * @param glsl - The GLSL code for the shader stage.
     */
    setShaderStage(stageName: string, glsl: string): void;
    /**
     * Gets the GLSL code for a given shader stage.
     * @param stageName - The name of the stage. currently only 'VERTEX_SHADER' or 'FRAGMENT_SHADER' are supported.
     * @return - The GLSL code for the shader stage.
     */
    getShaderStage(stageName: string): string;
    /**
     * Clears all cached shader compilations for this shader.
     */
    clearProgramsCache(): void;
    /**
     * The isTransparent method.
     * @return - The return value.
     */
    static isTransparent(): boolean;
    /**
     * The isOverlay method.
     * @return - The return value.
     */
    static isOverlay(): boolean;
    /**
     * The __compileShaderStage method.
     * @param glsl - The glsl value.
     * @param stageID - The stageID value.
     * @param name - The name value.
     * @param shaderopts - The shaderopts value.
     * @return - The return value.
     * @private
     */
    __compileShaderStage(glsl: string, stageID: number, name: string, shaderopts: Shaderopts): WebGLShader;
    /**
     * The __createProgram method.
     * @param shaderopts - The shaderopts value.
     * @return - The program value.
     * @private
     */
    __createProgram(shaderopts: Record<string, any>): false | Record<string, any>;
    /**
     * The __extractAttributeAndUniformLocations method.
     * @param shaderProgramHdl - The shaderProgramHdl value.
     * @param shaderopts - The shaderopts value.
     * @return - The dictionary of attributes and uniform values
     * @private
     */
    __extractAttributeAndUniformLocations(shaderProgramHdl: WebGLProgram, shaderopts: Shaderopts): Record<string, any>;
    /**
     * The getAttributes method.
     * @return - The dictionary of attributes that this shader expects to be bound.
     */
    getAttributes(): Record<string, any>;
    /**
     * The getUniforms method.
     * @return - The dictionary of uniforms that this shader expects to be bound.
     */
    getUniforms(): Record<string, string>;
    /**
     * Checks to see if the engine is compiled for the target specified by the key
     * @param key - The key value.
     * @return - The return value.
     */
    isCompiledForTarget(key: string): boolean;
    /**
     * The compileForTarget method.
     * @param key - The key value.
     * @param shaderopts - The shaderopts value.
     * @return - The result of the shader compilation.
     */
    compileForTarget(key?: string, shaderopts?: Shaderopts): Record<string, any>;
    /**
     * The compile method.
     */
    compile(): void;
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param key - The key value.
     * @return - The return value.
     */
    bind(renderstate: RenderState, key?: string): boolean;
    /**
     * The unbind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    unbind(renderstate: RenderState): boolean;
    /**
     * The getGeomDataShaderName method.
     * @return - an array of param declarations that the shader expects the material tp provide.
     */
    getGeomDataShaderName(): string;
    /**
     * The getSelectedShaderName method.
     */
    getSelectedShaderName(): string;
    /**
     * The supportsInstancing method.
     * @return - return false for shaders that cannot be rendered in instanced mode.
     */
    static supportsInstancing(): boolean;
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
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLShader };
