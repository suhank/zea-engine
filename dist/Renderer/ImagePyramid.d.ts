import { GLTexture2D } from './GLTexture2D';
import { GLFbo } from './GLFbo';
import { GLImageAtlas } from './GLImageAtlas';
import { GLScreenQuad } from './GLScreenQuad';
import { WebGL12RenderingContext } from './types/webgl';
/** Class representing an image pyramid.
 * @extends GLImageAtlas
 * @private
 */
declare class ImagePyramid extends GLImageAtlas {
    protected size: number;
    protected __srcGLTex: GLTexture2D;
    protected __fbos: GLFbo[];
    protected screenQuad: GLScreenQuad;
    /**
     * Create an image pyramid.
     * @param gl - The webgl rendering context.
     * @param name - The name value.
     * @param srcGLTex - The srcGLTex value.
     * @param destroySrcImage - The destroySrcImage value.
     * @param minTileSize - The minTileSize value.
     */
    constructor(gl: WebGL12RenderingContext, name: string, srcGLTex: GLTexture2D, screenQuad: GLScreenQuad, destroySrcImage?: boolean, minTileSize?: number);
    /**
     * The generateAtlasLayout method.
     * @param minTileSize - The minTileSize value.
     */
    generateAtlasLayout(minTileSize: any): void;
    /**
     * The renderAtlas method.
     * @param cleanup - The cleanup value.
     */
    renderAtlas(cleanup?: boolean): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { ImagePyramid };
