import { BaseImage, RefCounted } from '../SceneTree/index';
import { Uniform, Uniforms, RenderState } from './types/renderer';
import { WebGL12RenderingContext } from './types/webgl';
/**
 * Represents a texture that contains 2-dimensional images.
 * Images have width and height, but no depth.
 *
 * @extends RefCounted
 */
declare class GLTexture2D extends RefCounted {
    protected __gl: WebGL12RenderingContext;
    protected ready: boolean;
    width: number;
    height: number;
    protected textureType: number;
    protected textureDesc: number[];
    protected __loaded: boolean;
    protected __bound: boolean;
    protected __image: BaseImage | null;
    protected __internalFormat: number;
    protected __type: number;
    protected __format: number;
    protected __wrapParam: number;
    protected params: Record<string, any>;
    protected __minFilter: number;
    protected __magFilter: number;
    protected __wrapS: number;
    protected __wrapT: number;
    protected __flipY: boolean;
    protected __mipMapped: boolean;
    invert: boolean;
    alphaFromLuminance: boolean;
    protected __gltex: WebGLTexture | null;
    protected __typeParam: string;
    protected __formatParam: string;
    /**
     * Create a GL texture 2D.
     *
     * @param gl - The gl value.
     * @param params - The params value.
     */
    constructor(gl: WebGL12RenderingContext, params?: BaseImage | Record<string, any>);
    /**
     * Returns the loaded status of the 2D Texture
     *
     * @return - The return value.
     */
    isLoaded(): boolean;
    /**
     * Returns the `BaseImage` of the GL Texture
     *
     * @return - The return value.
     */
    getImage(): BaseImage | null;
    /**
     * Returns the specified value of the color components in the texture.
     *
     * @return - The return value.
     */
    getInternalFormat(): number;
    /**
     * Returns the value of the specified data type of the texel data.
     *
     * @return - The return value.
     */
    getType(): number;
    /**
     * Returns the value of the specified texel data. It must be the same as the `internalFormat`
     *
     * @return - The return value.
     */
    getFormat(): number;
    /**
     * Returns the value of the specified wrapping function for texture coordinate
     *
     * @return - The return value.
     */
    getWrap(): number;
    /**
     * Returns the value of the specified binding point.
     *
     * @return - The return value.
     */
    getMipMapped(): boolean;
    /**
     * Builds the GLTexture2D using the specified parameters object.
     * Parameters must have the `BaseImage` properties structure.
     *
     * @param params - The params value.
     *
     * @param emit - The emit value.
     */
    configure(params: Record<string, any>): void;
    /**
     * The __updateGLTexParams method.
     * @private
     */
    __updateGLTexParams(): void;
    /**
     * Initializes and creates the buffer of the object's data store.
     *
     * @param data - The data value.
     * @param width - The width value.
     * @param height - The height value.
     * @param bind - The bind value.
     * @param emit - The emit value.
     */
    bufferData(data: any, width?: number, height?: number, bind?: boolean, emit?: boolean): void;
    /**
     * Clears the buffers to preset values
     */
    clear(): void;
    /**
     * The resize method.
     * @param width - The width value.
     * @param height - The height value.
     * @param preserveData - The preserveData value.
     * @param emit - The emit value.
     */
    resize(width: number, height: number, preserveData?: boolean, emit?: boolean): void;
    /**
     * Upload data for the image to the GPU.
     *
     * @param dataArray - The dataArray value.
     * @param width - The width value
     * @param height - The height value
     * @param offsetX - The offsetX value
     * @param offsetY - The offsetY value
     * @param bind - The bind value
     */
    populate(dataArray: Uint16Array | Float32Array, width: number, height: number, offsetX?: number, offsetY?: number, bind?: boolean): void;
    /**
     * Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.
     *
     * @return - The return value.
     */
    getSize(): number[];
    /**
     * Returns the value of the WebGLTexture value
     *
     * @return - The return value.
     */
    get glTex(): WebGLTexture | null;
    /**
     * Returns the value of the WebGLTexture value
     *
     * @return - The return value.
     */
    getTexHdl(): WebGLTexture | null;
    /**
     * The preBind method.
     * @param unif - The unif value.
     * @param unifs - The unifs value.
     * @return - The return value.
     */
    preBind(unif: Uniform, unifs: Uniforms): Record<string, Uniform>;
    /**
     * Binds Texture to the Uniform attribute.
     *
     * @param renderstate - The renderstate value.
     * @param unif - The unif value.
     * @param bindings - The bindings value.
     * @return - The return value.
     */
    bindToUniform(renderstate: RenderState, unif: Uniform, bindings?: Record<string, any>): boolean;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLTexture2D };
