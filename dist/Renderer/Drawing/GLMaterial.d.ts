import { Material } from '../../SceneTree/Material';
import { EventEmitter } from '../../Utilities/EventEmitter';
import { GLShader } from '../GLShader';
import { RenderState } from '../types/renderer';
import { WebGL12RenderingContext } from '../types/webgl';
/** Class representing a GL material.
 * @extends EventEmitter
 * @private
 */
declare class GLMaterial extends EventEmitter {
    protected __gl: WebGL12RenderingContext;
    protected __material: Material;
    protected __glshader: GLShader;
    protected __shaderBindings: Record<string, any>;
    protected __boundTexturesBeforeMaterial: any;
    /**
     * Create a GL material.
     * @param gl - The webgl rendering context.
     * @param material - The material value.
     * @param glShader - The glShader value.
     */
    constructor(gl: WebGL12RenderingContext, material: Material, glShader: GLShader);
    /**
     * The getMaterial method.
     * @return - The return value.
     */
    getMaterial(): Material;
    /**
     * The getGLShader method.
     * @return - The return value.
     */
    getGLShader(): GLShader;
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param warnMissingUnifs - The renderstate value.
     * @return - The return value.
     */
    bind(renderstate: RenderState, warnMissingUnifs: any): any;
    /**
     * The unbind method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    unbind(renderstate: RenderState): void;
}
export { GLMaterial };
