import { GLGeom } from './GLGeom';
import '../../SceneTree/Geometry/Mesh';
import { Mesh } from '../../SceneTree/Geometry/Mesh';
/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
declare class GLMesh extends GLGeom {
    protected __numTriIndices: number;
    protected __indexDataType: number;
    protected __numVertices: number;
    protected __numTriangles: number;
    protected __numRenderVerts: number;
    /**
     * Create a GL mesh.
     * @param gl - The webgl rendering context.
     * @param mesh - The mesh value.
     */
    constructor(gl: WebGL12RenderingContext, mesh: Mesh);
    /**
     * The genBuffers method.
     */
    genBuffers(): void;
    /**
     * The updateBuffers method.
     * @param opts - The options object.
     */
    updateBuffers(renderstate?: RenderState): void;
    /**
     * The clearBuffers method.
     */
    clearBuffers(): void;
    /**
     * Draw an item to screen.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawInstanced method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param instanceCount - The instanceCount value.
     */
    drawInstanced(renderstate: RenderState, instanceCount: number): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLMesh };
