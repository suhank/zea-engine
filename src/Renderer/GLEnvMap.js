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
    ImageAtlas
} from './ImageAtlas.js';
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

class GLEnvMap extends ImageAtlas {
    constructor(renderer, envMap) {
        super(renderer.gl, 'EnvMap');
        this.__renderer = renderer;
        this.__envMap = envMap;
        this.__backgroundFocus = 0.0;

        let gl = renderer.gl;
        if (!gl.__quadVertexIdsBuffer)
            gl.setupInstancedQuad();

        this.convolveEnvMap(renderer);
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

    generateHammersleySamples(numSamples) {
        let gl = this.__renderer.gl;
        let dataArray = new Float32Array(numSamples*3);
        for (let i=0; i<numSamples; i++) {
            let Xi = hammersley(i, numSamples);
            let offset = i * 3;
            let vec3 = Vec3.createFromFloat32Buffer(dataArray.buffer, offset);
            vec3.set(Xi[0], Xi[1], 0.0);
        }
        let hammersleyTexture = new GLTexture2D(gl, {
            channels: 'RGB',
            format: 'FLOAT',
            width: numSamples,
            height: 1,
            filter: 'NEAREST',
            wrap: 'CLAMP_TO_EDGE',
            data: dataArray,
            mipMapped: false
        });
        return hammersleyTexture;
    }

    convolveEnvMap() {
        let gl = this.__renderer.gl;
        let screenQuad = this.__renderer.getScreenQuad();
        let srcGLTex = new GLHDRImage(gl, this.__envMap);
        
        this.__imagePyramid = new ImagePyramid(gl, 'EnvMapImagePyramid', srcGLTex, screenQuad, false);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // Compile and bind the convolver shader.
        let numSamples = 1024; 
        // let numSamples = 64;
        let hammersleyTexture = this.generateHammersleySamples(numSamples);
        let glConvolverShader = new GLShader(gl, new ConvolverShader());
        let covolverShaderComp = glConvolverShader.compileForTarget('GLEnvMap', {
            repl:{
                "NUM_SAMPLES": numSamples,
                "ATLAS_NAME": "EnvMap",
                "EnvMap_COUNT": this.__imagePyramid.numSubImages(),
                "EnvMap_LAYOUT": this.__imagePyramid.getLayoutFn()
            }
        });
        let covolverShaderBinding = generateShaderGeomBinding(gl, covolverShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);


        let renderstate = {};
        glConvolverShader.bind(renderstate, 'GLEnvMap');
        covolverShaderBinding.bind(renderstate);

        let unifs = renderstate.unifs;
        let roughnessLocation = unifs.roughness.location;

        this.addSubImage(srcGLTex);

        let currRez = [this.__envMap.width / 2, this.__envMap.height / 2];
        let levels = 6;//this.__imagePyramid.numSubImages();
        let pyramidBound = false;
        for (let j = 0; j < levels; j++) {
            // Set the roughness.
            gl.uniform1f(roughnessLocation, (j+1)/levels);

            let level = new GLTexture2D(gl, {
                channels: 'RGB',
                format: 'FLOAT',
                width: currRez[0],
                height: currRez[1],
                filter: 'LINEAR',
                wrap: 'CLAMP_TO_EDGE'
            });

            let fbo = new GLFbo(gl, level);
            fbo.bind();

            // Note: we should not need to bind the texture every iteration. 
            this.__imagePyramid.bind(renderstate, unifs.atlas_EnvMap.location);
            hammersleyTexture.bind(renderstate, unifs.hammersleyMap.location);

            gl.drawQuad();
            fbo.destroy();

            this.addSubImage(level);
            currRez = [currRez[0] / 2, currRez[1] / 2];
        }
        this.generateAtlas(gl, screenQuad, false);

        glConvolverShader.destroy();
        hammersleyTexture.destroy();
        //srcGLTex.destroy();
        this.__srcGLTex = srcGLTex;

        
        // this.__glEnvMapShader = new GLShader(gl, new EnvMapShader());
        // let rendererpreproc = this.__renderer.getShaderPreprocessorDirectives();
        // let envMapShaderComp = this.__glEnvMapShader.compileForTarget('GLEnvMap', {
        //     defines: rendererpreproc.defines,
        //     repl:{
        //         "ATLAS_NAME": "EnvMap",
        //         "EnvMap_COUNT": this.__imagePyramid.numSubImages(),
        //         "EnvMap_LAYOUT": this.__imagePyramid.getLayoutFn()
        //     }
        // });
        // this.__shaderBinding = generateShaderGeomBinding(gl, envMapShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);

        
        this.__glEnvMapShader = new GLShader(gl, new EnvMapShader());
        let rendererpreproc = this.__renderer.getShaderPreprocessorDirectives();
        let envMapShaderComp = this.__glEnvMapShader.compileForTarget('GLEnvMap', {
            defines: rendererpreproc.defines,
            repl:{
                "ATLAS_NAME": "EnvMap",
                "EnvMap_COUNT": this.numSubImages(),
                "EnvMap_LAYOUT": this.getLayoutFn()
            }
        });
        this.__shaderBinding = generateShaderGeomBinding(gl, envMapShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
    }

    getShaderPreprocessorDirectives(){
        return {
            "ATLAS_NAME": "EnvMap",
            "EnvMap_COUNT": this.numSubImages(),
            "EnvMap_LAYOUT": this.getLayoutFn()
        }
    }

    bindforReading(renderstate, location){
        //this.__imagePyramid.getSubImage(3).bind(renderstate, location);
        this.bind(renderstate, location);
    }

    draw(renderstate) {
        if (this.__envMap.isLoaded()) {

            let displayAtlas = false;
            if(displayAtlas){
                let screenQuad = this.__renderer.getScreenQuad();
                screenQuad.bindShader(renderstate);
                // screenQuad.draw(renderstate, this.__srcCDMTex);
                screenQuad.draw(renderstate, this.__srcGLTex);
                //screenQuad.draw(renderstate, this.__imagePyramid);
                // screenQuad.draw(renderstate, this);
            }
            else{
                ///////////////////
                this.__glEnvMapShader.bind(renderstate, 'GLEnvMap');
                let gl = this.__gl;
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