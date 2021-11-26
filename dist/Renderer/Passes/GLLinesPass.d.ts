import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass';
import { GLTexture2D } from '../GLTexture2D';
import { GeomItem } from '../../SceneTree/index';
import { FattenLinesShader } from '../Shaders/FattenLinesShader';
import { GLMesh } from '../Drawing/GLMesh';
import { GLBaseRenderer } from '../GLBaseRenderer';
/** Class representing a GL opaque geoms pass.
 * @extends GLOpaqueGeomsPass
 * @private
 */
declare class GLLinesPass extends GLOpaqueGeomsPass {
    protected linesGeomDataBuffer: GLTexture2D | null;
    protected fattenLinesShader: FattenLinesShader | null;
    protected quad: GLMesh | null;
    protected fbo: WebGLFramebuffer | null;
    /**
     * Create a GL opaque geoms pass.
     */
    constructor();
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer: GLBaseRenderer, passIndex: number): void;
    /**
     * The filterGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    filterGeomItem(geomItem: GeomItem): boolean;
    /**
     * The __checkFramebuffer method.
     * @private
     */
    __checkFramebuffer(width: number, height: number): void;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawGeomData method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawGeomData(renderstate: GeomDataRenderState): void;
}
export { GLLinesPass };
