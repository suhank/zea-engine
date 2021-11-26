import { BaseImage } from '../SceneTree/index';
import { GLTexture2D } from './GLTexture2D';
import { GLRenderTarget } from './GLRenderTarget';
import { IGeomShaderBinding } from './Drawing/GeomShaderBinding';
import { GLShader } from './GLShader';
/**
 * An Image Atlas lays out multiple smaller images within a larger image atlas, and tracks their positions.
 * @private
 */
declare class GLImageAtlas extends GLRenderTarget {
    protected __name: string;
    protected __formatParam: string;
    protected __typeParam: string;
    protected __subImages: any[];
    protected __layoutNeedsRegeneration: boolean;
    protected __asyncCount: number;
    protected loaded: boolean;
    protected ready: boolean;
    protected __layout: Array<LayoutItem>;
    protected __atlasLayoutTexture: any;
    protected __layoutVec4s: Array<number[]>;
    protected __atlasLayoutShaderBinding: IGeomShaderBinding | null;
    protected __atlasLayoutShader: GLShader | null;
    /**
     * Create an image atlas..
     * @param gl - The webgl rendering context.
     * @param name - The name value.
     * @param format - The format value.
     * @param type - The type value.
     */
    constructor(gl: WebGL12RenderingContext, name: string, format?: string, type?: string);
    incAsyncCount(count?: number): void;
    decAsyncCount(): void;
    /**
     * The isLoaded method.
     * @return - The return value.
     */
    isLoaded(): boolean;
    /**
     * The getMainImage method.
     * @return - The return value.
     */
    getMainImage(): BaseImage;
    /**
     * The addSubImage method.
     * @param subImage - The subImage value.
     * @return - The return value.
     */
    addSubImage(subImage: BaseImage | WebGLTexture | null): number;
    /**
     * The removeSubImage method.
     * @param subImage - The subImage value.
     */
    removeSubImage(subImage: BaseImage): void;
    /**
     * The getSubImage method.
     * @param index - The index value.
     * @return - The image value.
     */
    getSubImage(index: number): GLTexture2D;
    /**
     * The numSubImages method.
     * @return - The return value.
     */
    numSubImages(): number;
    /**
     * The generateAtlasLayout method.
     */
    generateAtlasLayout(minTileSize?: any): void;
    /**
     * The getLayoutData method.
     * @param index - The index value.
     * @return - The return value.
     */
    getLayoutData(index: number): Array<number>;
    /**
     * The renderAtlas method.
     * @param cleanup - The cleanup value.
     * @param off - The off value.
     */
    renderAtlas(cleanup?: boolean, off?: number): void;
    /**
     * The isReady method.
     * @return - The return value.
     */
    isReady(): boolean;
    /**
     * The bindToUniform method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param unif - The WebGL uniform
     * @return - The return value.
     */
    bindToUniform(renderstate: RenderState, unif: Uniform): boolean;
    /**
     * The cleanup method.
     */
    cleanup(): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLImageAtlas };
