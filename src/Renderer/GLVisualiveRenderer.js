import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Xfo
} from '../Math';
import {
    HDRImage2D,
    HDRImageMixer,
    ProceduralSky,
    Lightmap,
    LightmapMixer
} from '../SceneTree';
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
    GLShader
} from './GLShader.js';
import {
    GLForwardPass
} from './Passes/GLForwardPass.js';
import {
    GLTransparencyPass
} from './Passes/GLTransparencyPass.js';
import {
    GLHardEdgesPass
} from './Passes/GLHardEdgesPass.js';
import {
    GLMeshPointsPass
} from './Passes/GLMeshPointsPass.js';
import {
    GLGeomDataPass
} from './Passes/GLGeomDataPass.js';
import {
    GLBillboardsPass
} from './Passes/GLBillboardsPass.js';
import {
    GLRenderer
} from './GLRenderer.js';
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

class GLVisualiveRenderer extends GLRenderer {
    constructor(canvasDiv, options = {}) {

        super(canvasDiv, options, {
            antialias: true,
            depth: true
        });

        /////////////////////////
        // Renderer Setup
        this.__exposure = 0.0;
        this.__exposureRange = options.exposureRange ? options.exposureRange : [-5, 10];
        this.__tonemap = true;
        this.__gamma = 2.2;
        this.__antialiase = false;

        this.__glEnvMap = undefined;
        this.__glBackgroundMap = undefined;
        this.__glLightmaps = {};
        this.__displayEnvironment = true;
        this.__debugMode = 0;
        this.__debugLightmaps = false;
        this.__planeDist = 0.0;
        this.__planeAngle = 0.0;

        // this.addPass(new GLNormalsPass(this.__gl, this.__collector));
        // this.addPass(new GLWirePass(this.__gl, this.__collector));
        // this.__edgesPass = new GLHardEdgesPass(this.__gl, this.__collector);
        // this.__pointsPass = new GLMeshPointsPass(this.__gl, this.__collector);

        this.__drawEdges = false;
        this.__drawPoints = false;

        let gl = this.__gl;

        this.__debugTextures = [undefined];
        // this.__debugTextures.push(this.__viewports[0].__fwBuffer);
        // if(this.__geomDataPass){
        //     this.__debugTextures.push(this.__viewports[0].getGeomDataFbo().colorTexture);
        // }

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
    }

    __bindEnvMap(env) {
        if (env instanceof ProceduralSky) {
            this.__glEnvMap = new GLProceduralSky(this.__gl, env);
        } else if (env instanceof HDRImage2D || env.format === "FLOAT") {
            this.addShaderPreprocessorDirective('ENABLE_SPECULAR');
            this.__glEnvMap = new GLEnvMap(this, env);
        } else {
            console.warn("Unsupported EnvMap:" + env);
            return;
        }
        this.__glEnvMap.ready.connect(this.requestRedraw);
        this.__glEnvMap.updated.connect(this.requestRedraw);
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
            let gl = this.__gl;
            let backgroundMap = scene.getBackgroundMap();
            this.__glBackgroundMap  = backgroundMap.getMetadata('gltexture');
            if(!this.__glBackgroundMap ) {
                if (backgroundMap instanceof HDRImage2D || backgroundMap.format === "FLOAT") {
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
        this.__scene.envMapChanged.connect(this.__bindEnvMap.bind(this));

        let lightMaps = scene.getLightMaps();
        let addLightmap = (name, lightmap) => {
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
            // case '[':
            //     this.__debugMode--;
            //     if (this.__debugMode < 0)
            //         this.__debugMode += this.__debugTextures.length + 1;
            //     break;
            // case ']':
            //     this.__debugMode = (this.__debugMode + 1) % (this.__debugTextures.length + 1);
            //     break;
            // case 'k':
            //     this.__debugLightmaps = !this.__debugLightmaps;
            //     break;
            // case 'f':
            //     let selection = scene.getSelectionManager().selection;
            //     if (selection.size == 0)
            //         this.__viewport.getCamera().frameView([scene.getRoot()]);
            //     else
            //         this.__viewport.getCamera().frameView(selection);
            //     break;
            // case 'o':
            //     this.__drawEdges = !this.__drawEdges;
                // break;
            // case 'b':
            //     this.__displayEnvironment = !this.__displayEnvironment;
            //     break;
            // case 'v':
            //     if (this.__vrViewport)
            //         this.__vrViewport.togglePresenting();
            //     break;
            // case ' ':
            //     break;
            default:
                super.onKeyPressed(key);
        }
    }

    ////////////////////////////
    // GUI

    get antialiase() {
        return this.__antialiase;
    }

    set antialiase(val) {
        this.__antialiase = val;
        this.requestRedraw();
    }

    get exposure() {
        return this.__exposure;
    }

    set exposure(val) {
        this.__exposure = val;
        this.requestRedraw();
    }

    get tonemap() {
        return this.__tonemap;
    }

    set tonemap(val) {
        this.__tonemap = val;
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

    get debugLightmaps() {
        return this.__debugLightmaps;
    }

    set debugLightmaps(val) {
        this.__debugLightmaps = val;
        this.requestRedraw();
    }

    get planeDist() {
        return this.__planeDist;
    }

    set planeDist(val) {
        this.__planeDist = val;
        this.requestRedraw();
    }

    get planeAngle() {
        return this.__planeAngle;
    }

    set planeAngle(val) {
        this.__planeAngle = val;
        this.requestRedraw();
    }

    addGUI(gui) {
        gui.add(this, 'exposure', this.__exposureRange[0], this.__exposureRange[1]);
        // gui.add(this, 'tonemap', 0, 1);
        // gui.add(this, 'gamma', 0, 5.0);
        // gui.add(this, 'antialiase');
        gui.add(this, 'displayEnvironment');
        // gui.add(this, 'debugLightmaps');

        if (this.__glEnvMap)
            this.__glEnvMap.addGUI(gui);
    }

    ////////////////////////////
    // Rendering

    drawBackground(renderstate) {
        if (this.__glBackgroundMap) {
            if (!this.__glBackgroundMap.isLoaded())
                return;
            let gl = this.__gl;
            gl.depthMask(false);
            this.__backgroundMapShader.bind(renderstate);
            let unifs = renderstate.unifs;
            this.__glBackgroundMap.bindToUniform(renderstate, unifs.backgroundImage);
            this.__backgroundMapShaderBinding.bind(renderstate);
            gl.drawQuad();
        } else if (this.__glEnvMap) {
            this.__glEnvMap.draw(renderstate);
        }
    }

    drawVP(viewport) {
        /////////////////////////////////////
        // Debugging 
        let gl = this.__gl;
        if (this.__debugMode > 0) {
            // Bind the default framebuffer
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, this.getWidth(), this.getHeight());

            let displayDebugTexture = this.__debugTextures[this.__debugMode];
            let renderstate = {};
            gl.screenQuad.bindShader(renderstate);
            gl.screenQuad.draw(renderstate, displayDebugTexture);
        } else {


            viewport.draw(this.__renderstate);

            // this.__gizmoPass.draw(this.__renderstate);
            // viewport.drawOverlays(this.__renderstate);
        }
    }

    drawScene(renderstate) {
        renderstate.envMap = this.__glEnvMap;
        renderstate.lightmaps = this.__glLightmaps;
        renderstate.boundLightmap = undefined;
        renderstate.debugLightmaps = this.__debugLightmaps;
        renderstate.planeDist = this.__planeDist;
        renderstate.planeAngle = this.__planeAngle;
        renderstate.exposure = Math.pow(2, this.__exposure);
        renderstate.shaderopts = this.__preproc;

        if (this.__displayEnvironment)
            this.drawBackground(renderstate);

        super.drawScene(renderstate);

        // if (this.__drawEdges)
        //     this.__edgesPass.draw(renderstate);

        // if (this.__drawPoints)
        //     this.__pointsPass.draw(renderstate);

        // this.__gizmoPass.draw(renderstate);

        // console.log("Draw Calls:" + this.__renderstate['drawCalls']);
    }


    ////////////////////////////
    // Debugging
};


export {
    GLVisualiveRenderer
};