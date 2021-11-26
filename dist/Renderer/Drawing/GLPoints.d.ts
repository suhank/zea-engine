import { GLGeom } from './GLGeom';
/** Class representing GL points.
 * @extends GLGeom
 * @private
 */
declare class GLPoints extends GLGeom {
    protected __numVertices: number;
    protected __vboState: number;
    /**
     * Create a GL point.
     * @param gl - The webgl rendering context.
     * @param points - The points value.
     */
    constructor(gl: WebGL12RenderingContext, points: any);
    /**
     * The genBuffers method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    genBuffers(renderstate?: RenderState): void;
    /**
     * The updateBuffers method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    updateBuffers(renderstate?: RenderState): void;
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    bind(renderstate: RenderState): boolean;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: RenderState): void;
    /**
     * The drawInstanced method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param instanceCount - The instanceCount value.
     */
    drawInstanced(renderstate: RenderState, instanceCount: number): void;
}
export { GLPoints };
