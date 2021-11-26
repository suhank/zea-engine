import { BaseGeom, Mesh, RefCounted } from '../../SceneTree/index';
/** Class representing a GL geom.
 * @private
 */
declare class GLGeom extends RefCounted {
    protected __gl: WebGL12RenderingContext;
    protected __geom: BaseGeom | Mesh;
    protected __glattrbuffers: Record<string, any>;
    protected __shaderBindings: Record<string, any>;
    protected buffersDirty: boolean;
    protected genBufferOpts: Record<string, any>;
    protected __indexBuffer: WebGLBuffer | null;
    /**
     * Create a GL geom.
     * @param gl - The webgl rendering context.
     * @param geom - A geometry object
     */
    constructor(gl: WebGL12RenderingContext, geom: BaseGeom);
    /**
     * Returns the owned Geometry object
     * @return - The geometry object.
     */
    getGeom(): BaseGeom;
    /**
     * The dirtyBuffers method.
     * @param opts - options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool)
     */
    dirtyBuffers(opts: Record<string, any>): void;
    /**
     * The genBuffers method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    genBuffers(renderstate?: RenderState): any;
    /**
     * The updateBuffers method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    updateBuffers(renderstate?: RenderState): void;
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - returns false if the binding failed.
     */
    bind(renderstate: RenderState): boolean;
    /**
     * The unbind method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    unbind(renderstate: RenderState): void;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawInstanced method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param instanceCount - The instanceCount param.
     */
    drawInstanced(renderstate: RenderState, instanceCount: number): void;
    /**
     * The bindAndDraw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    bindAndDraw(renderstate: RenderState): void;
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
export { GLGeom };
