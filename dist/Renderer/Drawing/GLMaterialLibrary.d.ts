import { EventEmitter, Allocator1D, Allocation1D } from '../../Utilities/index';
import { GLMaterial } from './GLMaterial';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { Material } from '../../SceneTree';
import { RenderState } from '../types/renderer';
/** Class representing a GL CAD material library.
 * @ignore
 */
declare class GLMaterialLibrary extends EventEmitter {
    protected renderer: GLBaseRenderer;
    protected materials: any[];
    protected materialIndices: Record<string, number>;
    protected glMaterials: Record<number, GLMaterial>;
    protected refCounts: number[];
    protected freeIndices: number[];
    protected dirtyIndices: Set<number>;
    protected materialsAllocator: Allocator1D;
    protected materialsTexture: any;
    protected dirtyItemIndices: any;
    protected glGeomItemsTexture: any;
    /**
     * Create a GL CAD material library.
     * @param renderer - The renderer object
     */
    constructor(renderer: GLBaseRenderer);
    /**
     * The addMaterial method.
     * @param material - The material object.
     * @return - The index of GLMaterial
     */
    addMaterial(material: Material): number;
    /**
     * Given a material, generates a GLMaterial that manages the GPU state for the material.
     * @param material - The material value.
     * @return - The constructed GLMaterial.
     */
    getGLMaterial(material: Material): GLMaterial;
    getMaterialAllocation(material: Material): Allocation1D | undefined;
    /**
     * The removeMaterial method.
     * @param material - The material object.
     */
    removeMaterial(material: Material): void;
    /**
     * The uploadMaterials method.
     * @param renderstate - The render state for the current draw traversal
     */
    uploadMaterials(renderstate: RenderState): void;
    /**
     * Updates the GPU state if any update is needed.
     * @param renderstate - The object tracking the current state of the renderer
     */
    update(renderstate: RenderState): void;
    /**
     * The bind method.
     * @param renderstate - The renderstate param.
     * @return - The return value.
     */
    bind(renderstate: any): boolean;
}
export { GLMaterialLibrary };
