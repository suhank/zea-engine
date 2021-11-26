import { GLGeom } from './GLGeom';
import { GLTexture2D } from '../GLTexture2D';
import { BaseGeom } from '../../SceneTree';
interface FatBuffers {
    drawCount: number;
    positionsTexture: GLTexture2D | null;
    glattrbuffers: {
        [key: string]: null | {
            buffer: WebGLBuffer;
            dimension: number;
            dataType: string;
        };
    };
}
/** Class representing GL lines.
 * @extends GLGeom
 * @private
 */
declare class GLLines extends GLGeom {
    protected __numSegIndices: number;
    protected __numVertices: number;
    protected __fatBuffersNeedUpload: boolean;
    protected fatBuffers: FatBuffers | null;
    protected __buffersNeedUpload: boolean;
    protected __indexDataType: number;
    /**
     * Create a GL line.
     * @param gl - The webgl rendering context.
     * @param lines - The geom value.
     */
    constructor(gl: WebGL12RenderingContext, lines: BaseGeom);
    /**
     * The dirtyBuffers method.
     * @param opts - options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool)
     */
    dirtyBuffers(opts: Record<string, any>): void;
    /**
     * The clearBuffers method.
     */
    clearBuffers(): void;
    /**
     * The genFatBuffers method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    genFatBuffers(renderstate: RenderState): void;
    /**
     * The genBuffers method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    genBuffers(renderstate?: RenderState): void;
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    bind(renderstate: RenderState): boolean;
    /**
     * The drawPoints method.
     */
    drawPoints(): void;
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
export { GLLines };
