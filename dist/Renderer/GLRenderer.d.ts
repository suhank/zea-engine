import { Vec3, Xfo, Mat4, Ray, Color } from '../Math/index';
import { EnvMap, BaseImage, Scene } from '../SceneTree/index';
import { GLRenderTarget } from './GLRenderTarget';
import { GLEnvMap } from './GLEnvMap';
import { GLBaseRenderer } from './GLBaseRenderer';
import { EnvMapShader } from './Shaders/EnvMapShader';
import { HighlightsShader } from './Shaders/HighlightsShader';
import { SilhouetteShader } from './Shaders/SilhouetteShader';
import { IGeomShaderBinding } from './Drawing/GeomShaderBinding';
import { GLViewport } from './GLViewport';
import { IntersectionData } from '../Utilities/IntersectionData';
import { ColorRenderState } from './types/renderer';
/** Class representing a GL renderer.
 * @extends GLBaseRenderer
 */
declare class GLRenderer extends GLBaseRenderer {
    protected __exposure: number;
    protected __tonemap: boolean;
    protected __gamma: number;
    protected __glEnvMap: GLEnvMap | null;
    protected __glBackgroundMap: any;
    protected __displayEnvironment: boolean;
    protected __debugMode: number;
    protected _planeDist: number;
    protected __cutPlaneNormal: Vec3;
    protected rayCastDist: number;
    protected rayCastArea: number;
    highlightsShader: HighlightsShader;
    silhouetteShader: SilhouetteShader;
    highlightOutlineThickness: number;
    outlineThickness: number;
    outlineColor: Color;
    outlineSensitivity: number;
    outlineDepthBias: number;
    protected __debugTextures: any[];
    protected __rayCastRenderTarget: GLRenderTarget | null;
    protected __backgroundMapShader: EnvMapShader | null;
    protected __backgroundMapShaderBinding: IGeomShaderBinding | null;
    protected __rayCastRenderTargetProjMatrix: Mat4;
    /**
     * Create a GL renderer.
     * @param $canvas - The $canvas value.
     * @param options - The dictionary of options.
     */
    constructor($canvas: any, options?: Record<string, any>);
    /**
     * The __bindEnvMap method.
     * @param env - The env value.
     * @private
     */
    __bindEnvMap(env: EnvMap | BaseImage): void;
    /**
     * The setScene method.
     * @param scene - The scene value.
     */
    setScene(scene: Scene): void;
    /**
     * The addViewport method.
     * @param name - The name value.
     * @return - The return value.
     */
    addViewport(name: string): GLViewport;
    /**
     * Getter for exposure.
     * @return exposure
     */
    get exposure(): number;
    /**
     * Setter for exposure.
     * @param val - The val value.
     */
    set exposure(val: number);
    /**
     * Getter for gamma.
     */
    get gamma(): number;
    /**
     * Setter for gamma.
     * @param val - The val value.
     */
    set gamma(val: number);
    /**
     * Getter for displayEnvironment.
     */
    get displayEnvironment(): boolean;
    /**
     * Setter for displayEnvironment.
     * @param val - The val value.
     */
    set displayEnvironment(val: boolean);
    /**
     * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
     * This method takes a Ray value, and uses that base the ray cast operation.
     *
     * @param ray - The ray to use in the raycast.
     * @param dist - The maximum distance to cast the ray
     * @param area - The area to use for the ray
     * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
     * @return - The object containing the ray cast results.
     */
    raycastWithRay(ray: Ray, dist: number, area?: number, mask?: number): IntersectionData | null;
    /**
     * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
     * This method takes an Xfo value, and uses that base the ray cast operation.
     *
     * @param xfo - The xfo to use in the raycast.
     * @param dist - The maximum distance to cast the ray
     * @param area - The area to use for the ray
     * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
     * @return - The object containing the ray cast results.
     */
    raycastWithXfo(xfo: Xfo, dist: number, area?: number, mask?: number): IntersectionData | null;
    /**
     * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
     *
     * @private
     *
     * @param xfo - The xfo to use in the raycast.
     * @param ray - The ray to use in the raycast.
     * @param dist - The maximum distance to cast the ray
     * @param area - The area to use for the ray
     * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
     * @return - The object containing the ray cast results.
     */
    raycast(xfo: Xfo, ray: Ray, dist: number, area?: number, mask?: number): IntersectionData | null;
    /**
     * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
     *
     * @private
     *
     * @param xfo - The xfo to use in the raycast.
     * @param projectionMatrix - The projectionMatrix to use in the raycast.
     * @param ray - The ray to use in the raycast.
     * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
     * @return - The object containing the ray cast results.
     */
    raycastWithProjection(xfo: Xfo, projectionMatrix: Mat4, ray: Ray, mask?: number): IntersectionData | null;
    /**
     *
     * @private
     *
     * @param xfo - The ray to use in the raycast.
     * @param ray - The ray to use in the raycast.
     * @param dist - The maximum distance to cast the ray
     * @param area - The area to use for the ray
     * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
     * @return - The object containing the ray cast results.
     */
    raycastCluster(xfo: Xfo, ray: Ray, dist: number, area?: number, mask?: number): IntersectionData[];
    /**
     * The drawBackground method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawBackground(renderstate: ColorRenderState): void;
    /**
     * The bindGLRenderer method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    bindGLRenderer(renderstate: ColorRenderState): void;
    /**
     * The drawScene method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawScene(renderstate: ColorRenderState): void;
}
export { GLRenderer };
