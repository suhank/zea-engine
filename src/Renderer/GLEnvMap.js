import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    GLProbe
} from './GLProbe.js';
import {
    ConvolverShader
} from './Shaders/ConvolverShader.js';
import {
    EnvMapShader
} from './Shaders/EnvMapShader.js';
import {
    GLFbo
} from './GLFbo.js';

import {
    ImagePyramid
} from './ImagePyramid.js';

import {
    generateShaderGeomBinding,
} from './GeomShaderBinding.js';

import {
    Vec3,
    hammersley
} from '../Math/Math.js';

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


        srcGLTex.updated.connect(() => {
            this.convolveEnvMap(srcGLTex);
        }, this);
        if (this.__envMap.isLoaded()) {
            this.convolveEnvMap(srcGLTex);
        }
        //else{
        //    //this.__envMap.loaded.connect(() => {
        //    //    this.convolveEnvMap(srcGLTex);
        //    //}, this);
        //}
        srcGLTex.destructing.connect(() => {
            console.log(this.__hdrImage.name + " destructing");
            this.destroy();
        }, this);

        //srcGLTex.destroy();
        this.__srcGLTex = srcGLTex;
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

    getShaderPreprocessorDirectives(){
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
            if(displayAtlas){
                let screenQuad = gl.screenQuad;
                screenQuad.bindShader(renderstate);
                // screenQuad.draw(renderstate, this.__srcCDMTex);
                // screenQuad.draw(renderstate, this.__srcGLTex);
                // screenQuad.draw(renderstate, this.__imagePyramid);
                screenQuad.draw(renderstate, this);
            }
            else{
                ///////////////////
                this.__glEnvMapShader.bind(renderstate, 'GLEnvMap');
                let unifs = renderstate.unifs;
                // this.__srcGLTex.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);
                // this.__srcCDMTex.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);
                //this.__imagePyramid.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);
                this.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);

                if ('focus' in unifs)
                    gl.uniform1f(unifs.focus.location, this.__backgroundFocus);
                if ('exposure' in unifs)
                    gl.uniform1f(unifs.exposure.location, renderstate.exposure);

                this.__shaderBinding.bind(renderstate);

                gl.depthMask(false);
                gl.drawQuad();
            }
        }
    }
};

export {
    GLEnvMap
};