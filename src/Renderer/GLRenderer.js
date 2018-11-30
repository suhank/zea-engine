import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Signal
} from '../Utilities';
import {
    Vec3,
    Xfo,
    Color
} from '../Math';
import {
    Plane,
    BaseImage,
    HDRImageMixer,
    ProceduralSky,
    Lightmap,
    LightmapMixer
} from '../SceneTree';
import {
    GLFbo
} from './GLFbo.js';
import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    GLLightmapMixer
} from './GLLightmapMixer.js';
import {
    GLEnvMap
} from './GLEnvMap.js';
import {
    GLProceduralSky
} from './GLProceduralSky.js';
import {
    GLBaseRenderer
} from './GLBaseRenderer.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLScreenQuad
} from './GLScreenQuad.js';
import {
    BackgroundImageShader,
    OctahedralEnvMapShader,
    LatLongEnvMapShader,
    SterioLatLongEnvMapShader,
    DualFishEyeEnvMapShader,
    DualFishEyeToLatLongBackgroundShader
} from './Shaders/EnvMapShader.js';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';

// import {
//     PostProcessing
// } from './Shaders/PostProcessing.js';
import {
    OutlinesShader
} from './Shaders/OutlinesShader.js';
import {
    GLMesh
} from './GLMesh.js';


class GLRenderer extends GLBaseRenderer {
    constructor(canvasDiv, options = {}) {

        super(canvasDiv, options, {
            antialias: true,
            depth: true
        });

        /////////////////////////
        // Renderer Setup
        this.__exposure = 1.0;
        this.__tonemap = true;
        this.__gamma = 2.2;

        this.__glEnvMap = undefined;
        this.__glBackgroundMap = undefined;
        this.__glLightmaps = {};
        this.__displayEnvironment = true;
        this.__debugMode = 0;
        this.__debugLightmaps = false;
        this._planeDist = 0.0;
        this.__cutPlaneNormal = new Vec3(1,0,0);


        const gl = this.__gl;

        this.__debugTextures = [undefined];

        this.addShaderPreprocessorDirective('ENABLE_INLINE_GAMMACORRECTION');

        if (!options.disableLightmaps)
            this.addShaderPreprocessorDirective('ENABLE_LIGHTMAPS');
        if (!options.disableTextures)
            this.addShaderPreprocessorDirective('ENABLE_TEXTURES');

        if (!SystemDesc.isMobileDevice) {
            if(!options.disableSpecular)
                this.addShaderPreprocessorDirective('ENABLE_SPECULAR');
            // this.addShaderPreprocessorDirective('ENABLE_DEBUGGING_LIGHTMAPS');
        }

        this.__outlineShader = new OutlinesShader(gl);
        this.__outlineColor = new Color("#03E3AC")
        this.quad = new GLMesh(gl, new Plane(1, 1));

        // this.__glshaderScreenPostProcess = new PostProcessing(gl);
        
        this.createSelectedGeomsFbo();
    }

    __bindEnvMap(env) {
        if (env instanceof ProceduralSky) {
            this.__glEnvMap = new GLProceduralSky(this.__gl, env);
        } else if (env instanceof BaseImage) {
            this.__glEnvMap = env.getMetadata('gltexture');
            if(!this.__glEnvMap) {
                if (env.type === 'FLOAT'){
                    this.addShaderPreprocessorDirective('ENABLE_SPECULAR');
                    this.__glEnvMap = new GLEnvMap(this, env, this.__preproc);
                }
                else if (env.isStreamAtlas()){
                    this.__glEnvMap = new GLImageStream(this.__gl, env);
                }
                else{
                    this.__glEnvMap = new GLTexture2D(this.__gl, env);
                }
            }
        } else {
            console.warn("Unsupported EnvMap:" + env);
            return;
        }
        this.__glEnvMap.ready.connect(this.requestRedraw);
        this.__glEnvMap.updated.connect(this.requestRedraw);

        this.envMapAssigned.emit(this.__glEnvMap);
    }

    getGLEnvMap(){
        return this.__glEnvMap;
    }
    getEnvMapTex(){
            console.warn("Deprecated Function");
        return this.__glEnvMap;
    }

    setScene(scene) {
        super.setScene(scene);

        if (scene.getEnvMap() != undefined) {
            this.__bindEnvMap(scene.getEnvMap());
        }
        this.__scene.envMapChanged.connect(this.__bindEnvMap.bind(this));

        // Note: The difference bween an EnvMap and a BackgroundMap, is that
        // An EnvMap must be HDR, and can be convolved for reflections.
        // A Background map can be simply an image.
        if (scene.getBackgroundMap() != undefined) {
            const gl = this.__gl;
            const backgroundMap = scene.getBackgroundMap();
            this.__glBackgroundMap  = backgroundMap.getMetadata('gltexture');
            if(!this.__glBackgroundMap ) {
                if (backgroundMap.type === 'FLOAT') {
                    this.__glBackgroundMap = new GLHDRImage(gl, backgroundMap);
                } else {
                    this.__glBackgroundMap = new GLTexture2D(gl, backgroundMap);
                }
            }
            this.__glBackgroundMap.ready.connect(this.requestRedraw);
            this.__glBackgroundMap.updated.connect(this.requestRedraw);
            if (!this.__backgroundMapShader) {
                if (!gl.__quadVertexIdsBuffer)
                    gl.setupInstancedQuad();
                switch (backgroundMap.getMapping()) {
                    case 'octahedral':
                        this.__backgroundMapShader = new OctahedralEnvMapShader(gl);
                        break;
                    case 'latlong':
                        this.__backgroundMapShader = new LatLongEnvMapShader(gl);
                        break;
                    case 'steriolatlong':
                        this.__backgroundMapShader = new SterioLatLongEnvMapShader(gl);
                        break;
                    case 'dualfisheye':
                        this.__backgroundMapShader = new DualFishEyeToLatLongBackgroundShader(gl);
                        break;
                    case 'uv':
                    default:
                        this.__backgroundMapShader = new BackgroundImageShader(gl);
                        break;
                }
                let shaderComp = this.__backgroundMapShader.compileForTarget();
                this.__backgroundMapShaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
            }
        }

        const lightMaps = scene.getLightMaps();
        const addLightmap = (name, lightmap) => {
            let gllightmap;
            if (lightmap instanceof LightmapMixer)
                gllightmap = new GLLightmapMixer(this.__gl, lightmap);
            else{
                gllightmap = lightmap.image.getMetadata('gltexture');
                if(!gllightmap){
                    gllightmap = new GLHDRImage(this.__gl, lightmap.image);
                }
            }
            gllightmap.updated.connect((data) => {
                this.requestRedraw();
            });
            this.__glLightmaps[name] = {
                atlasSize: lightmap.atlasSize,
                glimage: gllightmap
            };
        }
        for (let name in lightMaps) {
            addLightmap(name, lightMaps[name]);
        }
        scene.lightmapAdded.connect(addLightmap);
    }


    addViewport(name) {
        let vp = super.addViewport(name);
        // vp.createOffscreenFbo();
        return vp;
    }

    onKeyPressed(key, event) {
        switch (key) {
            case 'b':
                this.__displayEnvironment = !this.__displayEnvironment;
                this.requestRedraw();
                break;
            default:
                super.onKeyPressed(key, event);
        }
    }

    ////////////////////////////
    // GUI

    get exposure() {
        return this.__exposure;
    }

    set exposure(val) {
        this.__exposure = val;
        this.requestRedraw();
    }

    get gamma() {
        return this.__gamma;
    }

    set gamma(val) {
        this.__gamma = val;
        this.requestRedraw();
    }

    get displayEnvironment() {
        return this.__displayEnvironment;
    }

    set displayEnvironment(val) {
        this.__displayEnvironment = val;
        this.requestRedraw();
    }

    get planeDist() {
        return this._planeDist;
    }

    set planeDist(val) {
        this._planeDist = val;
        this.requestRedraw();
    }

    get cutPlaneNormal() {
        return this.__cutPlaneNormal;
    }

    set cutPlaneNormal(val) {
        this.__cutPlaneNormal = val;
        this.requestRedraw();
    }

    ////////////////////////////
    // Fbos

    resizeFbos(width, height) {
        super.resizeFbos();
        if (this.__fbo) {
            this.__fbo.colorTexture.resize(width, height);
        }
        if (this.__selectedGeomsBufferFbo) {
            this.__selectedGeomsBuffer.resize(width, height);
        }
    }


    ////////////////////////////
    // SelectedGeomsBuffer

    getOutlineColor() {
        return this.__outlineColor
    }

    setOutlineColor(color) {
        this.__outlineColor = color;
    }

    createSelectedGeomsFbo() {
        let gl = this.__gl;
        this.__selectedGeomsBuffer = new GLTexture2D(gl, {
            type: 'UNSIGNED_BYTE',
            format: 'RGBA',
            filter: 'NEAREST',
            width: this.__glcanvas.width <= 1 ? 1 : this.__glcanvas.width,
            height: this.__glcanvas.height <= 1 ? 1 : this.__glcanvas.height,
        });
        this.__selectedGeomsBufferFbo = new GLFbo(gl, this.__selectedGeomsBuffer, true);
        this.__selectedGeomsBufferFbo.setClearColor([0, 0, 0, 0]);
    }

    getFbo() {
        return this.__fbo;
    }

    createOffscreenFbo(format='RGB') {
        let targetWidth = this.__glcanvas.width;
        let targetHeight = this.__glcanvas.height;

        let gl = this.__gl;
        this.__fwBuffer = new GLTexture2D(gl, {
            type: 'FLOAT',
            format,
            filter: 'NEAREST',
            width: targetWidth,
            height: targetHeight
        });
        this.__fbo = new GLFbo(gl, this.__fwBuffer, true);
        this.__fbo.setClearColor(this.__backgroundColor.asArray());
    }

    ////////////////////////////
    // Rendering

    drawBackground(renderstate) {
        if (this.__glBackgroundMap) {
            if (!this.__glBackgroundMap.isLoaded())
                return;
            const gl = this.__gl;
            gl.depthMask(false);
            this.__backgroundMapShader.bind(renderstate);
            const unifs = renderstate.unifs;
            this.__glBackgroundMap.bindToUniform(renderstate, unifs.backgroundImage);
            this.__backgroundMapShaderBinding.bind(renderstate);
            gl.drawQuad();
        } else if (this.__glEnvMap && this.__glEnvMap.draw) {
            this.__glEnvMap.draw(renderstate);
        }
    }

    drawScene(renderstate) {
        renderstate.envMap = this.__glEnvMap;
        renderstate.lightmaps = this.__glLightmaps;
        renderstate.boundLightmap = undefined;
        renderstate.debugLightmaps = this.__debugLightmaps;
        renderstate.planeDist = this._planeDist;
        renderstate.planeNormal = this.__cutPlaneNormal;
        renderstate.exposure = this.__exposure;
        renderstate.gamma = this.__gamma;

        // if (this.__displayEnvironment)
        //     this.drawBackground(renderstate);

        super.drawScene(renderstate);
        // console.log("Draw Calls:" + renderstate['drawCalls']);

        if (this.__selectedGeomsBufferFbo) {
            this.__selectedGeomsBufferFbo.bindForWriting(renderstate);
            this.__selectedGeomsBufferFbo.clear();
            this.drawSceneSelectedGeoms(renderstate);

            // Unbind and restore the bound fbo
            this.__selectedGeomsBufferFbo.unbindForWriting(renderstate);

            // Now render the outlines to the entire screen.
            const gl = this.__gl;
            gl.viewport(...renderstate.region);

            this.__outlineShader.bind(renderstate);
            const unifs = renderstate.unifs;
            this.__selectedGeomsBuffer.bindToUniform(renderstate, unifs.selectionDataTexture);
            gl.uniform2f(unifs.selectionDataTextureSize.location, renderstate.region[2], renderstate.region[3]);
            gl.uniform4fv(unifs.outlineColor.location, this.__outlineColor.asArray());
            this.quad.bindAndDraw(renderstate);
        }

        
        // /////////////////////////////////////
        // // Post processing.
        // if (this.__fbo) {
        //     const gl = this.__gl;

        //     // Bind the default framebuffer
        //     gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //     gl.viewport(...this.region);
        //     // gl.disable(gl.SCISSOR_TEST);

        //     // this.__glshaderScreenPostProcess.bind(renderstate);

        //     // const unifs = renderstate.unifs;
        //     // if ('antialiase' in unifs)
        //     //     gl.uniform1i(unifs.antialiase.location, this.__antialiase ? 1 : 0);
        //     // if ('textureSize' in unifs)
        //     //     gl.uniform2fv(unifs.textureSize.location, fbo.size);
        //     // if ('gamma' in unifs)
        //     //     gl.uniform1f(unifs.gamma.location, this.__gamma);
        //     // if ('exposure' in unifs)
        //     //     gl.uniform1f(unifs.exposure.location, this.__exposure);
        //     // if ('tonemap' in unifs)
        //     //     gl.uniform1i(unifs.tonemap.location, this.__tonemap ? 1 : 0);

        //     gl.screenQuad.bindShader(renderstate);
        //     gl.screenQuad.draw(renderstate, this.__fbo.colorTexture);


        //     // Note: if the texture is left bound, and no textures are bound to slot 0 befor rendering
        //     // more goem int he next frame then the fbo color tex is being read from and written to 
        //     // at the same time. (baaaad).
        //     // Note: any textures bound at all avoids this issue, and it only comes up when we have no env
        //     // map, background or textures params in the scene. When it does happen it can be a bitch to 
        //     // track down.
        //     gl.bindTexture(gl.TEXTURE_2D, null);
        // }

        this.redrawOccured.emit();
    }



};

const GLVisualiveRenderer = GLRenderer;

export {
    GLRenderer,
    GLVisualiveRenderer
};