import { Vec3, Xfo, Mat4, Ray, Color } from '../Math/index';
import { EnvMap } from '../SceneTree/index';
import { GLRenderTarget } from './GLRenderTarget';
import { GLHDRImage } from './GLHDRImage';
import { GLEnvMap } from './GLEnvMap';
import { GLBaseRenderer } from './GLBaseRenderer';
import { GLTexture2D } from './GLTexture2D';
import { PassType } from './Passes/GLPass';
import { EnvMapShader } from './Shaders/EnvMapShader';
import { HighlightsShader } from './Shaders/HighlightsShader';
import { SilhouetteShader } from './Shaders/SilhouetteShader';
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding';
import { EnvMapAssignedEvent } from '../Utilities/Events/EnvMapAssignedEvent';
const ALL_PASSES = PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY;
// TODO: move this fn somewhere
/** Class representing a GL renderer.
 * @extends GLBaseRenderer
 */
class GLRenderer extends GLBaseRenderer {
    /**
     * Create a GL renderer.
     * @param $canvas - The $canvas value.
     * @param options - The dictionary of options.
     */
    constructor($canvas, options = {}) {
        // use HTMLCanvasElement?
        super($canvas, options);
        this.__glEnvMap = null;
        this.__rayCastRenderTarget = null;
        this.__backgroundMapShader = null;
        this.__backgroundMapShaderBinding = null;
        this.__rayCastRenderTargetProjMatrix = new Mat4();
        // ///////////////////////
        // Renderer Setup
        this.__exposure = 1.0;
        this.__tonemap = true;
        this.__gamma = 2.2;
        this.__displayEnvironment = true;
        this.__debugMode = 0;
        this._planeDist = 0.0;
        this.__cutPlaneNormal = new Vec3(1, 0, 0);
        this.rayCastDist = 0;
        this.rayCastArea = 0;
        const gl = this.__gl;
        this.highlightsShader = new HighlightsShader(gl);
        this.silhouetteShader = new SilhouetteShader(gl);
        this.highlightOutlineThickness = 1.5;
        this.outlineThickness = 0;
        this.outlineColor = new Color(0.15, 0.15, 0.15, 1);
        this.outlineSensitivity = 2;
        this.outlineDepthBias = 0.7;
        this.__debugTextures = [undefined];
        this.addShaderPreprocessorDirective('ENABLE_INLINE_GAMMACORRECTION');
        if (!options.disableTextures) {
            this.addShaderPreprocessorDirective('ENABLE_TEXTURES');
        }
        if (options.debugGeomIds) {
            this.addShaderPreprocessorDirective('DEBUG_GEOM_ID');
        }
    }
    /**
     * The __bindEnvMap method.
     * @param env - The env value.
     * @private
     */
    __bindEnvMap(env) {
        const gl = this.__gl;
        if (env instanceof EnvMap) {
            // Note: Safari doesn't support rendering to floating
            // point textures, so our PBR lighting pipeline doesn't work.
            if (gl.name !== 'webgl2') {
                return;
            }
            this.__glEnvMap = env.getMetadata('gltexture');
            if (!this.__glEnvMap) {
                if (env.type === 'FLOAT') {
                    this.addShaderPreprocessorDirective('ENABLE_PBR');
                    this.__glEnvMap = new GLEnvMap(this, env);
                }
                // } else if (env.isStreamAtlas()) { // TODO: are these two lines still needed?
                //   this.__glEnvMap = new GLImageStream(gl, env)
                // else {
                //   this.__glEnvMap = new GLTexture2D(this.__gl, env)
                // }
            }
        }
        else {
            // Note: The difference between an EnvMap and a BackgroundMap, is that
            // An EnvMap must be HDR, and can be convolved for reflections.
            // A Background map can be simply an image.
            const backgroundMap = env;
            this.__glBackgroundMap = backgroundMap.getMetadata('gltexture');
            if (!this.__glBackgroundMap) {
                if (backgroundMap.type === 'FLOAT') {
                    this.__glBackgroundMap = new GLHDRImage(this.__gl, backgroundMap); // todo: is this cast ok?
                }
                else {
                    this.__glBackgroundMap = new GLTexture2D(this.__gl, backgroundMap);
                }
            }
            this.__glBackgroundMap.on('loaded', () => {
                this.requestRedraw();
            });
            this.__glBackgroundMap.on('updated', () => {
                this.requestRedraw();
            });
            if (!this.__backgroundMapShader) {
                if (!gl.__quadVertexIdsBuffer)
                    gl.setupInstancedQuad();
                this.__backgroundMapShader = new EnvMapShader(this.__gl);
                // switch (backgroundMap.getMapping()) {
                //   case 'octahedral':
                //     break
                //   case 'latlong':
                //     break
                //   case 'steriolatlong':
                //     break
                //   case 'dualfisheye':
                //     break
                //   case 'uv':
                //   default:
                //     break
                // }
                const shaderComp = this.__backgroundMapShader.compileForTarget();
                this.__backgroundMapShaderBinding = generateShaderGeomBinding(this.__gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
            }
            // console.warn('Unsupported EnvMap:' + env)
            return;
        }
        this.__glEnvMap.on('loaded', (event) => {
            this.requestRedraw();
        });
        this.__glEnvMap.on('updated', (event) => {
            this.requestRedraw();
        });
        const event = new EnvMapAssignedEvent(this.__glEnvMap);
        this.emit('envMapAssigned', event);
    }
    /**
     * The setScene method.
     * @param scene - The scene value.
     */
    setScene(scene) {
        const envMapParam = scene.envMapParam;
        if (envMapParam.value != undefined) {
            this.__bindEnvMap(envMapParam.value);
        }
        envMapParam.on('valueChanged', () => {
            this.__bindEnvMap(envMapParam.value);
        });
        const displayEnvMapParam = scene.displayEnvMapParam;
        this.__displayEnvironment = displayEnvMapParam.value;
        displayEnvMapParam.on('valueChanged', () => {
            this.__displayEnvironment = displayEnvMapParam.value;
            this.requestRedraw();
        });
        super.setScene(scene);
    }
    /**
     * The addViewport method.
     * @param name - The name value.
     * @return - The return value.
     */
    addViewport(name) {
        const vp = super.addViewport(name);
        return vp;
    }
    // //////////////////////////
    // GUI
    /**
     * Getter for exposure.
     * @return exposure
     */
    get exposure() {
        return this.__exposure;
    }
    /**
     * Setter for exposure.
     * @param val - The val value.
     */
    set exposure(val) {
        this.__exposure = val;
        this.requestRedraw();
    }
    /**
     * Getter for gamma.
     */
    get gamma() {
        return this.__gamma;
    }
    /**
     * Setter for gamma.
     * @param val - The val value.
     */
    set gamma(val) {
        this.__gamma = val;
        this.requestRedraw();
    }
    /**
     * Getter for displayEnvironment.
     */
    get displayEnvironment() {
        return this.__displayEnvironment;
    }
    /**
     * Setter for displayEnvironment.
     * @param val - The val value.
     */
    set displayEnvironment(val) {
        this.__displayEnvironment = val;
        this.requestRedraw();
    }
    // //////////////////////////
    // Raycasting
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
    raycastWithRay(ray, dist, area = 0.01, mask = ALL_PASSES) {
        const xfo = new Xfo();
        xfo.setLookAt(ray.start, ray.start.add(ray.dir), new Vec3(0, 0, 1));
        return this.raycast(xfo, ray, dist, area, mask);
    }
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
    raycastWithXfo(xfo, dist, area = 0.01, mask = ALL_PASSES) {
        const ray = new Ray(xfo.tr, xfo.ori.getZaxis().negate());
        return this.raycast(xfo, ray, dist, area, mask);
    }
    /**
     * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
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
    raycast(xfo, ray, dist, area = 0.01, mask = ALL_PASSES) {
        var _a;
        const gl = this.__gl;
        if (!this.__rayCastRenderTarget) {
            this.__rayCastRenderTarget = new GLRenderTarget(gl, {
                type: 'FLOAT',
                format: 'RGBA',
                filter: 'NEAREST',
                width: 3,
                height: 3,
                numColorChannels: 1,
            });
        }
        if (this.rayCastDist != dist || this.rayCastArea != area) {
            this.__rayCastRenderTargetProjMatrix.setOrthographicMatrix(area * -0.5, area * 0.5, area * -0.5, area * 0.5, 0.0, dist);
            this.rayCastDist = dist;
            this.rayCastArea = area;
        }
        const region = [0, 0, 3, 3];
        const renderstate = {
            cameraMatrix: xfo.toMat4(),
            viewports: [
                {
                    region,
                    viewMatrix: xfo.inverse().toMat4(),
                    projectionMatrix: this.__rayCastRenderTargetProjMatrix,
                    isOrthographic: true,
                },
            ],
        };
        this.__rayCastRenderTarget.bindForWriting(renderstate, true);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.depthMask(true);
        this.drawSceneGeomData(renderstate, mask);
        gl.finish();
        this.__rayCastRenderTarget.unbindForWriting();
        this.__rayCastRenderTarget.bindForReading();
        const geomDatas = new Float32Array(4 * 9);
        gl.readPixels(0, 0, 3, 3, gl.RGBA, gl.FLOAT, geomDatas);
        this.__rayCastRenderTarget.unbindForReading();
        // ////////////////////////////////////
        // We have a 3x3 grid of pixels, and we
        // scan them to find if any geom was in the
        // frustum.
        // Starting with the center pixel (4),
        // then left and right (3, 5)
        // Then top bottom (1, 7)
        const checkPixel = (id) => geomDatas[id * 4 + 3] != 0;
        const dataPixels = [4, 3, 5, 1, 7];
        let geomData;
        for (const pixelID of dataPixels) {
            if (checkPixel(pixelID)) {
                geomData = geomDatas.subarray(pixelID * 4, pixelID * 4 + 4);
                break;
            }
        }
        if (!geomData)
            return null;
        // Mask the pass id to be only the first 6 bits of the integer.
        const passId = Math.round(geomData[0]) & (64 - 1);
        const geomItemAndDist = (_a = this.getPass(passId)) === null || _a === void 0 ? void 0 : _a.getGeomItemAndDist(geomData);
        if (geomItemAndDist) {
            const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist));
            return {
                pointerRay: ray,
                intersectionPos,
                geomItem: geomItemAndDist.geomItem,
                dist: geomItemAndDist.dist,
                geomData,
            };
        }
        else {
            return null;
        }
    }
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
    raycastCluster(xfo, ray, dist, area = 0.01, mask = ALL_PASSES) {
        const gl = this.__gl;
        if (!this.__rayCastRenderTarget) {
            this.__rayCastRenderTarget = new GLRenderTarget(gl, {
                type: 'FLOAT',
                format: 'RGBA',
                filter: 'NEAREST',
                width: 3,
                height: 3,
                numColorChannels: 1,
            });
            this.__rayCastRenderTargetProjMatrix = new Mat4();
        }
        if (this.rayCastDist != dist || this.rayCastArea != area) {
            this.__rayCastRenderTargetProjMatrix.setOrthographicMatrix(area * -0.5, area * 0.5, area * -0.5, area * 0.5, 0.0, dist);
            this.rayCastDist = dist;
            this.rayCastArea = area;
        }
        const region = [0, 0, 3, 3];
        const renderstate = {};
        renderstate.viewports.push({
            region,
            viewMatrix: xfo.inverse().toMat4(),
            projectionMatrix: this.__rayCastRenderTargetProjMatrix,
            isOrthographic: true,
        });
        renderstate.cameraMatrix = xfo.toMat4();
        this.__rayCastRenderTarget.bindForWriting(renderstate, true);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.depthMask(true);
        this.drawSceneGeomData(renderstate, mask);
        gl.finish();
        this.__rayCastRenderTarget.unbindForWriting();
        this.__rayCastRenderTarget.bindForReading();
        const geomDatas = new Float32Array(4 * 9);
        gl.readPixels(0, 0, 3, 3, gl.RGBA, gl.FLOAT, geomDatas);
        this.__rayCastRenderTarget.unbindForReading();
        // ////////////////////////////////////
        // We have a 3x3 grid of pixels, and we
        // scan them to find if any geom was in the
        // frustum.
        // Note: we return every intersection, because even multiple intersections
        // on the same geometry will be at different distances.
        // This method is often used to get an average distance.
        const checkPixel = (id) => geomDatas[id * 4 + 3] != 0;
        const result = [];
        for (let i = 0; i < 9; i++) {
            if (checkPixel(i)) {
                const geomData = geomDatas.subarray(i * 4, i * 4 + 4);
                // Mask the pass id to be only the first 6 bits of the integer.
                const passId = Math.round(geomData[0]) & (64 - 1);
                const pass = this.getPass(passId);
                if (pass) {
                    const geomItemAndDist = pass.getGeomItemAndDist(geomData);
                    if (geomItemAndDist) {
                        const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist));
                        result.push({
                            ray,
                            intersectionPos,
                            geomItem: geomItemAndDist.geomItem,
                            dist: geomItemAndDist.dist,
                            geomData,
                        });
                    }
                }
            }
        }
        return result;
    }
    // //////////////////////////
    // Rendering
    /**
     * The drawBackground method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawBackground(renderstate) {
        if (this.__glBackgroundMap && this.__backgroundMapShader && this.__backgroundMapShaderBinding) {
            if (!this.__glBackgroundMap.isLoaded())
                return;
            const gl = this.__gl;
            gl.depthMask(false);
            this.__backgroundMapShader.bind(renderstate);
            const unifs = renderstate.unifs;
            this.__glBackgroundMap.bindToUniform(renderstate, unifs.backgroundImage);
            this.__backgroundMapShaderBinding.bind(renderstate);
            gl.drawQuad();
        }
        else if (this.__glEnvMap && this.__glEnvMap.draw /* Note: video env maps cannot be drawn directly.*/) {
            this.__glEnvMap.draw(renderstate);
        }
    }
    /**
     * The bindGLRenderer method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    bindGLRenderer(renderstate) {
        super.bindGLBaseRenderer(renderstate);
        renderstate.envMap = this.__glEnvMap;
        renderstate.exposure = this.__exposure;
        renderstate.gamma = this.__gamma;
    }
    /**
     * The drawScene method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawScene(renderstate) {
        this.bindGLRenderer(renderstate);
        if (this.__displayEnvironment)
            this.drawBackground(renderstate);
        super.drawScene(renderstate);
        // console.log("Draw Calls:" + renderstate['drawCalls']);
        this.emit('redrawOccurred');
    }
}
export { GLRenderer };
//# sourceMappingURL=GLRenderer.js.map