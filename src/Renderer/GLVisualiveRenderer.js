import {
    isMobileDevice,
    Vec3
} from '../Math';
import {
    HDRImage2D,
    HDRImageMixer,
    ProceduralSky
} from '../SceneTree';

import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    GLHDRImageMixer
} from './GLHDRImageMixer.js';
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
    GLDepthPass
} from './Passes/GLDepthPass.js';
import {
    GLForwardPass
} from './Passes/GLForwardPass.js';
import {
    GLTransparencyPass
} from './Passes/GLTransparencyPass.js';
// import { GLWirePass } from './Passes/GLWirePass.js';
import {
    GLNormalsPass
} from './Passes/GLNormalsPass.js';
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
    PostProcessing
} from './Shaders/PostProcessing.js';


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
        this.__glLightmaps = {};
        this.__displayEnvironment = true;
        this.__debugMode = 0;
        this.__debugLightmaps = false;
        this.__planeDist = 0.0;
        this.__planeAngle = 0.0;

        this.addPass(new GLForwardPass(this.__gl, this.__collector));
        this.addPass(new GLTransparencyPass(this.__gl, this.__collector));
        // this.addPass(new GLNormalsPass(this.__gl, this.__collector));
        // this.addPass(new GLWirePass(this.__gl, this.__collector));
        // this.__edgesPass = new GLHardEdgesPass(this.__gl, this.__collector);
        // this.__pointsPass = new GLMeshPointsPass(this.__gl, this.__collector);
        this.addPass(new GLBillboardsPass(this.__gl, this.__collector));

        this.__drawEdges = false;
        this.__drawPoints = false;

        this.__glshaderScreenPostProcess = new GLShader(this.__gl, new PostProcessing());

        this.__debugTextures = [undefined];
        // this.__debugTextures.push(this.__viewports[0].__fwBuffer);
        this.__debugTextures.push(this.__viewports[0].getGeomDataFbo().colorTexture);

        this.__shaderDirectives = {
            defines: `
#define ENABLE_LIGHTMAPS
#define ENABLE_INLINE_GAMMACORRECTION
`
        };

        if (!isMobileDevice()) {
            if(!options.disableSpecular)
                this.__shaderDirectives.defines += '\n#define ENABLE_SPECULAR';
            //if(!options.disableTextures)
            //this.__shaderDirectives.defines += '\n#define ENABLE_TEXTURES';
            this.__shaderDirectives.defines += '\n#define ENABLE_DEBUGGING_LIGHTMAPS\n';
        }
        if (options.enableCrossSections)
            this.__shaderDirectives.defines += '\n#define ENABLE_CROSS_SECTIONS'
    }

    getShaderPreprocessorDirectives() {
        return this.__shaderDirectives;
    }

    setScene(scene) {
        super.setScene(scene);

        if (scene.getEnvMap() != undefined) {
            let env = scene.getEnvMap();
            if (env instanceof HDRImage2D) {
                this.__shaderDirectives.defines += '\n#define ENABLE_SPECULAR\n';
                this.__glEnvMap = new GLEnvMap(this, env);
                this.__shaderDirectives.repl = this.__glEnvMap.getShaderPreprocessorDirectives();
            } else if (env instanceof ProceduralSky) {
                this.__glEnvMap = new GLProceduralSky(this.__gl, env);
            }
            this.__glEnvMap.updated.connect((data) => {
                this.requestRedraw();
            }, this);
        }
        let lightMaps = scene.getLightMaps();
        for (let name in lightMaps) {
            let gllightmap;
            if (lightMaps[name] instanceof HDRImageMixer)
                gllightmap = new GLHDRImageMixer(this.__gl, lightMaps[name]);
            else
                gllightmap = new GLHDRImage(this.__gl, lightMaps[name]);
            gllightmap.updated.connect((data) => {
                this.requestRedraw();
            }, this);
            this.__glLightmaps[name] = gllightmap;
        }
    }

    addViewport(name) {
        let vp = super.addViewport(name);
        // vp.createOffscreenFbo();
        return vp;
    }

    onKeyPressed(key) {
        switch (key) {
            case '[':
                this.__debugMode--;
                if (this.__debugMode < 0)
                    this.__debugMode += this.__debugTextures.length + 1;
                break;
            case ']':
                this.__debugMode = (this.__debugMode + 1) % (this.__debugTextures.length + 1);
                break;
            case 'k':
                this.__debugLightmaps = !this.__debugLightmaps;
                break;
            case 'f':
                let selection = scene.getSelectionManager().selection;
                if (selection.size == 0)
                    this.__viewport.getCamera().frameView([scene.getRoot()]);
                else
                    this.__viewport.getCamera().frameView(selection);
                break;
            case 'g':
                this.__canvasDiv.requestFullscreen();
                break;
            case 'o':
                this.__drawEdges = !this.__drawEdges;
                break;
            case 'p':
                this.__drawPoints = !this.__drawPoints;
                break;
            case 'b':
                this.__displayEnvironment = !this.__displayEnvironment;
                break;
            case ' ':
                if (this.__vrViewport)
                    this.__vrViewport.togglePresenting();
                else
                    this.toggleContinuousDrawing();
                break;
            default:
                super.onKeyPressed(key);
        }
        this.requestRedraw();
    }


    //////////////////////////////////////
    // Pass Management
    addDrawItemToPasses(drawItem) {

        super.addDrawItemToPasses(drawItem);

        // TODO: not all items need to be rendered ot the geom data pass.
        // e.g. non-selectable geoms.
        /*
        if (this.__geomDataPass.filter(drawItem))
            this.__geomDataPass.addDrawItem(drawItem);

        if (drawItem.geomItem.irradianceMap != 'Environment') {
            // if (this.__edgesPass.filter(drawItem))
            //     this.__edgesPass.addDrawItem(drawItem);

            // if (this.__pointsPass.filter(drawItem))
            //     this.__pointsPass.addDrawItem(drawItem);
        }
        */
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
        let _this = this;
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

    drawEnv(renderstate) {
        if (this.__glEnvMap != undefined) {
            this.__glEnvMap.draw(renderstate);
        }
    }

    drawVP(viewport) {
        /////////////////////////////////////
        // Debugging 

        if (this.__debugMode > 0) {
            // Bind the default framebuffer
            this.__gl.bindFramebuffer(this.__gl.FRAMEBUFFER, null);
            this.__gl.viewport(0, 0, this.getWidth(), this.getHeight());

            let displayDebugTexture = this.__debugTextures[this.__debugMode];
            let renderstate = {};
            this.__screenQuad.bindShader(renderstate);
            this.__screenQuad.draw(renderstate, displayDebugTexture);
        } else {

            viewport.draw(this.__renderstate);
            /*
                        /////////////////////////////////////
                        // Post processing.

                        // Bind the default framebuffer
                        let gl = this.__gl;
                        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                        gl.viewport(0, 0, this.getWidth(), this.getHeight());

                        this.__glshaderScreenPostProcess.bind(this.__renderstate);

                        let unifs = this.__renderstate.unifs;
                        let fbo = viewport.getFbo();
                        if ('antialiase' in unifs)
                            gl.uniform1i(unifs.antialiase.location, this.__antialiase ? 1 : 0);
                        if ('textureSize' in unifs)
                            gl.uniform2fv(unifs.textureSize.location, fbo.size);
                        if ('gamma' in unifs)
                            gl.uniform1f(unifs.gamma.location, this.__gamma);
                        if ('exposure' in unifs)
                            gl.uniform1f(unifs.exposure.location, this.__exposure);
                        if ('tonemap' in unifs)
                            gl.uniform1i(unifs.tonemap.location, this.__tonemap ? 1 : 0);

                        this.__screenQuad.draw(this.__renderstate, fbo.colorTexture);
            */

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

        if (this.__displayEnvironment)
            this.drawEnv(renderstate);

        super.drawScene(renderstate);

        // if (this.__drawEdges)
        //     this.__edgesPass.draw(renderstate);

        // if (this.__drawPoints)
        //     this.__pointsPass.draw(renderstate);

        // this.__gizmoPass.draw(renderstate);

        // console.log("Draw Calls:" + this.__renderstate['drawCalls']);
    }


    draw() {
        if (this.__drawSuspensionLevel > 0)
            return;
        if (this.__stats)
            this.__stats.begin();

        if (this.__vrViewport) {
            if (this.__vrViewport.isPresenting()) {
                this.__vrViewport.draw(this.__renderstate);
                if (this.mirrorVRisplayToViewport) {
                    this.__gl.viewport(0, 0, this.getWidth(), this.getHeight());
                    this.__gl.disable(this.__gl.SCISSOR_TEST);
                    if (this.__stats)
                        this.__stats.end();
                    return;
                }
            }
            // Cannot upate the view, else it sends signals which
            // end up propagating through the websocket. 
            // TODO: Make the head invisible till active
            // else
            //     this.__vrViewport.updateHeadAndControllers();
        }

        for (let vp of this.__viewports)
            this.drawVP(vp);

        if (this.__stats)
            this.__stats.end();
        // console.log("Draw Calls:" + this.__renderstate['drawCalls']);
        this.redrawOccured.emit();
    }

    ////////////////////////////
    // Debugging
};

export {
    GLVisualiveRenderer
};