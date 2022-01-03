import { Material } from '../SceneTree';
import { ShaderParseResult } from './types/renderer';
/** Class representing a shader library.
 * @private
 */
declare class ShaderLibrary {
    __shaderModules: Record<string, string>;
    materialTemplates: Record<string, Material>;
    /**
     * Create a shader library.
     */
    constructor();
    /**
     * The setShaderModule method. Shader must be set before parsing.
     * @param shaderName - The shader name.
     * @param shader - The unparsed shader GLSL.
     */
    setShaderModule(shaderName: string, shader: string): void;
    /**
     * The getShaderModule method. Access specific uniforms, attributes of a particular module.
     * @param shaderName - The shader name.
     * @return - The return value.
     */
    getShaderModule(shaderName: string): string;
    /**
     * The getShaderModuleNames method.
     * @return - The return value.
     */
    getShaderModuleNames(): any[];
    /**
     * The parseAttr
     * @param parts - parts
     * @param instanced - instanced
     * @param result - result object to store parsed data
     */
    parseAttr(parts: string[], instanced: boolean, result: ShaderParseResult, line: string): void;
    /**
     * The handleImport method -- takes the includeFile and if it exists, adds the parsed glsl, uniforms, and attributes to the result, recursively.
     * @param result - result object that stores the glsl, attribute, uniform
     * @param shaderName - shaderName
     * @param includeFile - file name of the shader snippet/module
     * @param includes - keep track of what was included
     * @param lineNumber - keep track of what line we're on
     */
    handleImport(result: ShaderParseResult, shaderName: string, includeFile: string, includes: string[], lineNumber: number): void;
    /**
     * The parseShader method.
     * @param shaderName - The shader name.
     * @param glsl - The glsl param.
     * @return - returns the 'result' object
     */
    parseShader(shaderName: string, glsl: string): ShaderParseResult;
    /**
     * The parseShader recursive helper method
     * @param shaderName - The shader name.
     * @param glsl - The glsl param.
     * @param includes - keep track of what was included
     * @param lineNumber - keep track of what line we're on
     * @return - The return value.
     */
    parseShaderHelper(shaderName: string, glsl: string, includes: string[], lineNumber: number): ShaderParseResult;
}
declare const shaderLibrary: ShaderLibrary;
export { ShaderLibrary, shaderLibrary };
