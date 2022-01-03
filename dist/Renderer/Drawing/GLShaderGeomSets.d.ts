import { EventEmitter } from '../../Utilities/index';
import { BaseGeom } from '../../SceneTree/index';
import { GLStandardGeomsPass } from '../Passes';
import { GLGeomItem } from './GLGeomItem';
import { Vec3 } from '../../Math/Vec3';
import { RenderState, GeomDataRenderState } from '../types/renderer';
import { WebGL12RenderingContext } from '../types/webgl';
/** Class representing GL shader materials.
 * @private
 */
declare class GLShaderGeomSets extends EventEmitter {
    protected pass: GLStandardGeomsPass;
    protected gl: WebGL12RenderingContext;
    protected glShader: any;
    protected glGeomDataShader: any;
    protected glHighlightShader: any;
    protected glGeomItemSets: Record<string, any>;
    protected glShaderKey: string;
    protected glGeomDataShaderKey: string;
    protected glHighlightShaderKey: string;
    /**
     * Create a GL shader material.
     * @param pass - The pass that owns this object.
     * @param gl - The glShader value.
     * @param shaders - The shader value.
     */
    constructor(pass: GLStandardGeomsPass, gl: WebGL12RenderingContext, shaders: Record<string, any>);
    /**
     * Given a GeomItem, constructs the GLGeomItemSet that handles drawing that type of geometry.
     * @param geom - The geomitem value.
     * @return - The return value.
     * */
    getOrCreateGLGeomItemSet(geom: BaseGeom): any;
    /**
     * The addGLGeomItem method.
     * @param glGeomItem - The glGeomItem value.
     */
    addGLGeomItem(glGeomItem: GLGeomItem): void;
    /**
     *  Called by the GLPass to remove an item from this GLShaderGeomSets object.
     * @param glGeomItem - The glGeomItem value.
     */
    removeGLGeomItem(glGeomItem: GLGeomItem): void;
    /**
     * Binds one of its shaders for rendering, and also the other textures and values needed.
     * @param glShader - The shader to bind
     * @param renderstate - The render state for the current draw traversal
     * @param key - The key to use to cache the shader binding.
     * @private
     */
    bindShader(glShader: Record<string, any>, renderstate: RenderState, key: string): void;
    /**
     * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
     * @param renderstate - The render state for the current draw traversal
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawHighlightedGeoms method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawHighlightedGeoms(renderstate: RenderState): void;
    /**
     * The drawGeomData method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawGeomData(renderstate: GeomDataRenderState): void;
    /**
     * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
     * @param viewPos - The position of the camera that we are sorting relative to.
     */
    sortItems(viewPos: Vec3): void;
}
export { GLShaderGeomSets };
