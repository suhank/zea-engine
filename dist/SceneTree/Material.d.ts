import { BaseItem } from './BaseItem';
import { BinReader } from './BinReader';
import { GLShader } from '../Renderer';
/**
 * Represents a type of `BaseItem` class that holds material configuration.
 * Use this to apply materials to your assets or item parts.
 *
 * **Events**
 * * **shaderNameChanged:** Triggered when the shader's name is set through `setShaderName` method.
 *
 * @extends BaseItem
 */
declare class Material extends BaseItem {
    protected __isTransparent: boolean;
    protected __isTextured: boolean;
    protected __shaderName: string;
    /**
     * Create a material
     * @param name - The name of the material.
     * @param shaderName - Shader's class name.
     */
    constructor(name?: string, shaderName?: string);
    /**
     * Getter for the shader name.
     * @return - Returns the shader name.
     */
    getShaderName(): string;
    /**
     * Sets shader by using the name of the class with the script.
     * It is important that the shader is registered in `Registry`, otherwise it will error.
     * See all classes that extend from `GLShader`.
     *
     * @param shaderName - The shader name.
     */
    setShaderName(shaderName: string): void;
    /**
     * Remove all textures from Material's parameters.
     */
    removeAllTextures(): void;
    /**
     * Returns all texture parameters in current Material.
     *
     * @return - The return value.
     */
    getParamTextures(): Record<string, any>;
    /**
     * Checks if the material is transparent by checking the `Opacity` parameter.
     *
     * @return - Returns true if the material is transparent.
     */
    isTransparent(): boolean;
    __checkTransparency(event?: Record<string, any>): void;
    /**
     * Checks if the material has a texture applied. The renderer can use this to optimize rendering of non-textured objects
     *
     * @return - Returns true if the material is textured.
     */
    isTextured(): boolean;
    __checkTextures(event?: Record<string, any>): void;
    /**
     * This method can be overridden in derived classes
     * to perform general updates (see GLPass or BaseItem).
     * @param event - The event object emitted by the parameter.
     * @private
     */
    parameterValueChanged(event: Record<string, any>): void;
    /**
     * Returns shaders class of current material, if set. Otherwise it returns `undefined`
     *
     * @return - The return value.
     */
    getShaderClass(): typeof GLShader;
    /**
     * The toJSON method encodes the current object as a json object.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * Sets state of current Item(Including Shaders and Materials) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: Record<string, any>): void;
    /**
     * The clone method constructs a new material, copies its values
     * from this material and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned material.
     */
    clone(context?: Record<string, any>): Material;
    /**
     * When a Material is copied, first runs `BaseItem` copyFrom method, then sets shader.
     *
     * @param src - The material to copy from.
     * @param context - The context value.
     */
    copyFrom(src: Material, context?: Record<string, any>): void;
}
export { Material };
