import { Vec2 } from '../Math/index';
import { ScreenQuadShader } from './Shaders/ScreenQuadShader';
import { GLTexture2D } from './GLTexture2D';
import { RenderState } from './types/renderer';
import { WebGL12RenderingContext } from './types/webgl';
/** Class representing a GL screen quad.
 * @private
 */
declare class GLScreenQuad {
    protected __gl: WebGL12RenderingContext;
    protected __pos: number[];
    protected __size: number[];
    protected flipY: boolean;
    protected __glshader: ScreenQuadShader;
    protected __quadBinding: any;
    protected ready: boolean;
    /**
     * Create a GL screen quad.
     * @param gl - The webgl rendering context.
     * @param shaderopts - shader options
     */
    constructor(gl: WebGL12RenderingContext, shaderopts: Record<string, any>);
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param texture - The texture param.
     * @param pos - The pos value.
     * @param size - The size value.
     */
    bind(renderstate: RenderState, texture?: GLTexture2D, pos?: Vec2, size?: Vec2): void;
    /**
     * The bindShader method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    bindShader(renderstate: RenderState): boolean;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param texture - The texture value.
     * @param pos - The pos value.
     * @param size - The size value.
     */
    draw(renderstate: RenderState, texture?: GLTexture2D, pos?: Vec2, size?: Vec2): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLScreenQuad };
