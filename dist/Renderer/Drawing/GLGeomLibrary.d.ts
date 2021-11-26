import { EventEmitter, Allocator1D } from '../../Utilities/index';
import { BaseGeom } from '../../SceneTree/index';
import { GLGeom } from './index';
import { GLBaseRenderer } from '../GLBaseRenderer';
declare const resizeIntArray: (intArray: Int32Array, newSize: number) => Int32Array;
/** Class representing a GL geom.
 * @private
 */
declare class GLGeomLibrary extends EventEmitter {
    protected renderer: GLBaseRenderer;
    protected __gl: WebGL12RenderingContext;
    protected shaderAttrSpec: Record<string, any>;
    protected freeGeomIndices: number[];
    protected geoms: Array<BaseGeom | null>;
    protected geomRefCounts: number[];
    protected geomsDict: Record<string, number>;
    protected glGeomsDict: Record<string, GLGeom>;
    protected geomBuffersTmp: any[];
    protected glattrbuffers: Record<string, any>;
    protected shaderBindings: Record<string, any>;
    protected bufferNeedsRealloc: boolean;
    protected attributesAllocator: Allocator1D;
    protected dirtyGeomIndices: Set<number>;
    protected geomVertexOffsets: Int32Array;
    protected geomVertexCounts: Int32Array;
    protected numIndices: number;
    protected indicesAllocator: Allocator1D;
    protected indicesCounts: Int32Array;
    protected indicesOffsets: Int32Array;
    protected indexBuffer: WebGLBuffer | null;
    protected __destroyed: boolean;
    /**
     * Create a GLGeomLibrary.
     * @param renderer - The renderer object
     */
    constructor(renderer: GLBaseRenderer);
    /**
     * Given a BaseGeom, constructs the GLGeom that manages the state of the geometry in the GPU.
     * @param geom - The geom value.
     * @return - The return value.
     */
    constructGLGeom(geom: BaseGeom): GLGeom;
    /**
     * Adds a geom to the GLGeomLibrary.
     *
     * @param geom - The geom to be managed by this GLGeomLibrary.
     * @return - The index of the geom in the GLGeomLibrary
     */
    addGeom(geom: BaseGeom): number;
    /**
     * Removes a Geom managed by this GLGeomLibrary.
     * @param geom - The geom to remove
     */
    removeGeom(geom: BaseGeom): void;
    /**
     * Returns a Geom managed by this GLGeomLibrary.
     * @param index - The index of the geom to retrieve
     * @return - The return value.
     */
    getGeom(index: number): BaseGeom;
    /**
     * Returns a Geom managed by this GLGeomLibrary.
     * @param index - The index of the geom to retrieve
     * @return - The return value.
     */
    getGeomOffsetAndCount(index: number): number[];
    /**
     * Allocates space for the geomBuffers for the specified geometry
     * @param index - The index of the geom to upload
     */
    allocateBuffers(index: number): void;
    /**
     * Generates the GPU buffers required to store all the geometries
     */
    genBuffers(): void;
    /**
     * The uploadBuffers method.
     * @param index - The index of the geom to upload
     */
    uploadBuffers(index: number): void;
    /**
     * Cleans the state of this GeomSet during rendering.
     */
    cleanGeomBuffers(): void;
    /**
     * The bind method.
     * @param renderstate - The renderstate value.
     * @return - Returns true if binding was successful
     */
    bind(renderstate: RenderState): boolean;
    /**
     * The unbind method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    unbind(renderstate: RenderState): void;
    /**
     * The clearBuffers method.
     */
    clearBuffers(): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLGeomLibrary, resizeIntArray };
