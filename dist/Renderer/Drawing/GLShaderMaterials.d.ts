import { EventEmitter } from '../../Utilities/index';
import { GLShader } from '../GLShader';
import { GLPass } from '../Passes';
import { GLGeom } from './GLGeom';
import { GLGeomItem } from './GLGeomItem';
import { GLMaterial } from './GLMaterial';
import { GLMaterialGeomItemSets } from './GLMaterialGeomItemSets';
/** Class representing GL shader materials.
 * @private
 */
declare class GLShaderMaterials extends EventEmitter {
    protected gl: WebGL12RenderingContext;
    protected pass: any;
    protected glShader: GLShader;
    protected glgeomdatashader: any;
    protected glselectedshader: any;
    protected glMaterialGeomItemSets: any[];
    /**
     * Create a GL shader material.
     * @param gl - The WebGL Context value.
     * @param pass - The pass that owns this GLShaderMaterials object.
     * @param shaders - The shaders value.
     */
    constructor(gl: WebGL12RenderingContext, pass: GLPass, shaders: Record<string, any>);
    /**
     * The findMaterialGeomItemSets method.
     * @param glMaterial - The glMaterial value.
     * @return - The return value.
     */
    findMaterialGeomItemSets(glMaterial: GLMaterial): any;
    /**
     * The addGLGeomItem method.
     * @param glGeomItem - The glGeomItem value.
     * @param glGeom - The glGeomItem value.
     * @param glMaterial - The glMaterial value.
     */
    addGLGeomItem(glGeomItem: GLGeomItem, glGeom: GLGeom, glMaterial: GLMaterial): void;
    /**
     * The addMaterialGeomItemSets method.
     * @param glMaterialGeomItemSets - The glMaterialGeomItemSets value.
     */
    addMaterialGeomItemSets(glMaterialGeomItemSets: any): void;
    /**
     * The removeMaterialGeomItemSets method.
     * @param glMaterialGeomItemSets - The glMaterialGeomItemSets value.
     */
    removeMaterialGeomItemSets(glMaterialGeomItemSets: GLMaterialGeomItemSets): void;
    /**
     * The getMaterialGeomItemSets method.
     * @return - The return value.
     */
    getMaterialGeomItemSets(): any[];
    /**
     * Draws all elements, binding the shader and continuing into the GLMaterialGeomItemSets
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
}
export { GLShaderMaterials };
