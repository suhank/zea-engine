import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    GLProbe
} from './GLProbe.js';
import {
    ImagePyramid
} from './ImagePyramid.js';

class GLEnvMap extends GLProbe {
    constructor(renderer, envMap) {
        super(renderer.gl, 'EnvMap');
        this.__renderer = renderer;
        this.__envMap = envMap;
        this.__backgroundFocus = 0.0;

        let gl = renderer.gl;
        if (!gl.__quadVertexIdsBuffer)
            gl.setupInstancedQuad();

        let srcGLTex = new GLHDRImage(gl, this.__envMap);
        this.__srcGLTex = srcGLTex;

        srcGLTex.updated.connect(() => {
            this.convolveEnvMap(srcGLTex);
        }, this);
        if (this.__envMap.isLoaded()) {
            // Note: we must setup the image pyramid before connecting our listeners to the signals
            // this is so that during updates, the pyramid is updated first.
            this.__imagePyramid = new ImagePyramid(gl, 'EnvMap', srcGLTex, false);
            this.convolveEnvMap(srcGLTex);
        } else {
            this.__envMap.loaded.connect(() => {
                // Note: we must setup the image pyramid before connecting our listeners to the signals
                // this is so that during updates, the pyramid is updated first.
                this.__imagePyramid = new ImagePyramid(gl, 'EnvMap', srcGLTex, false);
                this.convolveEnvMap(srcGLTex);
            }, this);
        }
        srcGLTex.destructing.connect(() => {
            console.log(this.__hdrImage.name + " destructing");
            this.destroy();
        }, this);

    }

    get backgroundFocus() {
        return this.__backgroundFocus;
    }

    set backgroundFocus(val) {
        this.__backgroundFocus = val;
        this.__renderer.requestRedraw();
    }

    addGUI(gui) {
        gui.add(this, 'backgroundFocus', 0.0, 1.0);
    }

    getShaderPreprocessorDirectives() {
        return {
            "ATLAS_NAME": "EnvMap",
            "EnvMap_COUNT": this.numSubImages(),
            "EnvMap_LAYOUT": this.getLayoutFn()
        }
    }

    draw(renderstate) {
        if (this.__envMap.isLoaded()) {

            let gl = this.__gl;
            let displayAtlas = false;
            if (displayAtlas) {
                let screenQuad = gl.screenQuad;
                screenQuad.bindShader(renderstate);
                //screenQuad.draw(renderstate, this.__srcGLTex.__srcLDRTex);
                //screenQuad.draw(renderstate, this.__srcGLTex);
                //screenQuad.draw(renderstate, this.__imagePyramid);
                screenQuad.draw(renderstate, this);
            } else {
                ///////////////////
                this.__envMapShader.bind(renderstate, 'GLEnvMap');
                let unifs = renderstate.unifs;
                // this.__srcGLTex.bind(renderstate, renderstate.unifs.atlasEnvMap.location);
                //this.__imagePyramid.bind(renderstate, renderstate.unifs.atlasEnvMap.location);
                this.bind(renderstate);

                if ('focus' in unifs)
                    gl.uniform1f(unifs.focus.location, this.__backgroundFocus);
                if ('exposure' in unifs)
                    gl.uniform1f(unifs.exposure.location, renderstate.exposure);

                this.__envMapShaderBinding.bind(renderstate);

                gl.depthMask(false);
                gl.drawQuad();
            }
        }
    }

    destroy() {
        super.destroy();
        this.__srcGLTex.loaded.disconnectScope(this);
        this.__srcGLTex.updated.disconnectScope(this);
        this.__srcGLTex.destroy();
    }
};

export {
    GLEnvMap
};