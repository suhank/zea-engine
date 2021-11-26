import { BaseClass } from '../../Utilities/BaseClass';
declare class ParamUniformBinding extends BaseClass {
    protected unif: Uniform;
    protected dirty: boolean;
    constructor(unif: Uniform);
    /**
     * The unbind method.
     */
    bind(renderstate?: RenderState): void;
    /**
     * The unbind method.
     */
    unbind(renderstate?: RenderState): void;
    /**
     * The destroy method.
     */
    destroy(): void;
}
/** Class representing material shader binding.
 * @private
 */
declare class MaterialShaderBinding {
    protected uniformBindings: ParamUniformBinding[];
    /**
     * Create material shader binding.
     * @param gl - The webgl rendering context.
     * @param glMaterial - The glMaterial value.
     * @param unifs - The dictionary of WebGL uniforms.
     * @param warnMissingUnifs - The warnMissingUnifs value.
     */
    constructor(gl: WebGL12RenderingContext, glMaterial: any, unifs: Uniforms, warnMissingUnifs: any);
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    bind(renderstate: RenderState): boolean;
    /**
     * The unbind method.
     */
    unbind(renderstate: RenderState): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { MaterialShaderBinding };
