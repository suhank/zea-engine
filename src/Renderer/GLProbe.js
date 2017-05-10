import { GLShader } from './GLShader.js';
import { GLTexture2D } from './GLTexture2D.js';
import { GLHDRImage } from './GLHDRImage.js';
import { ImageAtlas } from './ImageAtlas.js';
import { ConvolverShader } from './Shaders/ConvolverShader.js';
import { EnvMapShader } from './Shaders/EnvMapShader.js';
import { GLFbo } from './GLFbo.js';
import { ImagePyramid } from './ImagePyramid.js';
import { generateShaderGeomBinding } from './GeomShaderBinding.js';
import { Vec3 } from '../Math/Vec3';

import {
    hammersley
} from '../Math/Hammersley';

class GLProbe extends ImageAtlas {
    constructor(gl, name) {
        super(gl, name);
        this.__gl = gl;

        if (!gl.__quadVertexIdsBuffer)
            gl.setupInstancedQuad();
        
        this.__convolved = false;
        this.__fbos = [];
    }

    generateHammersleySamples(numSamples) {
        let gl = this.__gl;
        if(!gl['Hammersley'+numSamples]){

            let dataArray = new Float32Array(numSamples*3);
            for (let i=0; i<numSamples; i++) {
                let Xi = hammersley(i, numSamples);
                let offset = i * 3;
                dataArray[offset+0] = Xi[0];
                dataArray[offset+1] = Xi[1];
            }
            gl['Hammersley'+numSamples] = new GLTexture2D(gl, {
                channels: 'RGB',
                format: 'FLOAT',
                width: numSamples,
                height: 1,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                data: dataArray,
                mipMapped: false
            });
        }
        return gl['Hammersley'+numSamples];
    }

    convolveEnvMap(srcGLTex) {
        let gl = this.__gl;

        // Compile and bind the convolver shader.
        let numSamples = 1024; 
        // let numSamples = 64;
        let hammersleyTexture = this.generateHammersleySamples(numSamples);

        if(!this.__convolved){
            if(!this.__imagePyramid){
                this.__imagePyramid = new ImagePyramid(gl, 'EnvMap', srcGLTex, false);
                this.__imagePyramid.updated.connect(() => {
                    this.convolveEnvMap(srcGLTex);
                }, this);
            }

            this.addSubImage(srcGLTex);

            let currRez = [srcGLTex.width / 2, srcGLTex.height / 2];

            let levels = 6;//this.__imagePyramid.numSubImages();
            for (let i = 0; i < levels; i++) {
                let level = new GLTexture2D(gl, {
                    channels: 'RGBA',
                    format: 'FLOAT',
                    width: currRez[0],
                    height: currRez[1],
                    filter: 'LINEAR',
                    wrap: 'CLAMP_TO_EDGE'
                });
                this.addSubImage(level);

                let fbo = new GLFbo(gl, level);
                this.__fbos.push(fbo);

                currRez = [currRez[0] / 2, currRez[1] / 2];
            }

            this.generateAtlasLayout();

            this.__convolverShader = new GLShader(gl, new ConvolverShader());
            let covolverShaderComp = this.__convolverShader.compileForTarget('GLProbe', {
                repl:{
                    "NUM_SAMPLES": numSamples
                }
            });
            this.__covolverShaderBinding = generateShaderGeomBinding(gl, covolverShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);


            // this.__envMapShader = new GLShader(gl, new EnvMapShader());
            // let rendererpreproc = this.__renderer.getShaderPreprocessorDirectives();
            // let envMapShaderComp = this.__envMapShader.compileForTarget('GLEnvMap', {
            //     defines: rendererpreproc.defines,
            //     repl:{
            //         "ATLAS_NAME": "EnvMap",
            //         "EnvMap_COUNT": this.__imagePyramid.numSubImages(),
            //         "EnvMap_LAYOUT": this.__imagePyramid.getLayoutFn()
            //     }
            // });
            // this.__envMapShaderBinding = generateShaderGeomBinding(gl, envMapShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);

            
            this.__envMapShader = new GLShader(gl, new EnvMapShader());
            let envMapShaderComp = this.__envMapShader.compileForTarget('GLEnvMap');
            this.__envMapShaderBinding = generateShaderGeomBinding(gl, envMapShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        }

        for (let i = 0; i < this.__fbos.length; i++) {
            this.__fbos[i].bind();

            let renderstate = {};
            this.__convolverShader.bind(renderstate, 'GLProbe');
            this.__covolverShaderBinding.bind(renderstate);

            // Set the roughness.
            let unifs = renderstate.unifs;
            // let roughness = (i+1)/this.__fbos.length;
            // gl.uniform1f(unifs.roughness.location, roughness);

            // Note: we should not need to bind the texture every iteration. 
            this.__imagePyramid.bind(renderstate);
            // hammersleyTexture.bind(renderstate, unifs.hammersleyMap.location);

            gl.drawQuad();
        }

        this.__convolved = true;

        this.renderAtlas(false);
    }

    // TODO: we shouldn't template the shaders to use an env map.
    // These values need to be passed in as uniforms.
    getShaderPreprocessorDirectives(){
        return {
            "ATLAS_NAME": "EnvMap",
            "EnvMap_COUNT": this.numSubImages(),
            "EnvMap_LAYOUT": this.getLayoutFn()
        }
    }

    bindforReading(renderstate, location){
        //this.__imagePyramid.getSubImage(3).bind(renderstate, location);
        if(this.__convolved)
            this.bind(renderstate, location);
    }

    destroy(){
        super.destroy();
        this.__convolverShader.destroy();

        for (let fbo of this.__fbos) {
            fbo.destroy();
        }
    }
};


export {
    GLProbe
};
// export default GLProbe;