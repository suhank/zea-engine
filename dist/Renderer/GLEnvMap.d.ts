import { GLProbe } from './GLProbe';
import { GLHDRImage } from './GLHDRImage';
import { EnvMapShader } from './Shaders/EnvMapShader';
import { IGeomShaderBinding } from './Drawing/GeomShaderBinding';
import { EnvMap } from '../SceneTree/Images/EnvMap';
import { GLRenderer } from './GLRenderer';
import { ColorRenderState } from './types/renderer';
/** Class representing a GL environment map.
 * @extends GLProbe
 * @private
 */
declare class GLEnvMap extends GLProbe {
    protected __renderer: GLRenderer;
    protected __envMap: EnvMap;
    protected __backgroundFocus: number;
    protected __srcGLTex: GLHDRImage | null;
    protected __envMapShader: EnvMapShader | null;
    protected __envMapShaderBinding: IGeomShaderBinding | null;
    protected __lodPyramid: any;
    /**
     * Create a GL env map.
     * @param renderer - The renderer value.
     * @param envMap - The environment map.
     */
    constructor(renderer: GLRenderer, envMap: EnvMap);
    /**
     * @private
     */
    init(): void;
    /**
     * The getEnvMap method.
     * @return - The return value.
     */
    getEnvMap(): EnvMap;
    /**
     * The getBackgroundFocus method.
     * @return - The return value.
     */
    getBackgroundFocus(): number;
    /**
     * The setBackgroundFocus method.
     * @param val - The val param.
     */
    setBackgroundFocus(val: number): void;
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate: ColorRenderState): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLEnvMap };
