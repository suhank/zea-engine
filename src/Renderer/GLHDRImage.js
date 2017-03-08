import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    DecompHDRShader
} from './Shaders/DecompHDRShader.js';
import {
    GLFbo
} from './GLFbo.js';
import {
    generateShaderGeomBinding,
} from './GeomShaderBinding.js';

class GLHDRImage extends GLTexture2D {
    constructor(gl, hdrImage) {
        super(gl);

        this.__hdrImage = hdrImage;
        this.__hdrImage.updated.connect(() => {
            this.__unpackHDRImage(this.__hdrImage.getParams());
        }, this);
        if (this.__hdrImage.isLoaded()) {
            this.__unpackHDRImage(this.__hdrImage.getParams());
        }
        else{
            this.__hdrImage.loaded.connect(() => {
                this.__unpackHDRImage(this.__hdrImage.getParams());
            }, this);
        }
        this.__hdrImage.destructing.connect(() => {
            console.log(this.__hdrImage.name + " destructing");
            this.destroy();
        }, this);

    }

    __unpackHDRImage(hdrImageParams){

        let gl = this.__gl;
        
        let ldr = hdrImageParams.ldr;
        let cdm = hdrImageParams.cdm;

        if(!this.__fbo){
            this.configure({
                channels: 'RGBA',
                format: 'FLOAT',
                width: ldr.width,
                height: ldr.height,
                filter: 'LINEAR',
                wrap: 'CLAMP_TO_EDGE'
            });
            this.__fbo = new GLFbo(gl, this);
            this.__srcLDRTex = new GLTexture2D(gl, {
                channels: 'RGB',
                format: 'UNSIGNED_BYTE',
                width: ldr.width,
                height: ldr.height,
                filter: 'NEAREST',
                mipMapped: false,
                wrap: 'CLAMP_TO_EDGE',
                data: ldr
            });
            this.__srcCDMTex = new GLTexture2D(gl, {
                channels: 'ALPHA',
                format: 'UNSIGNED_BYTE',
                width: ldr.width/*8*/,
                height: ldr.height/*8*/,
                filter: 'NEAREST',
                mipMapped: false,
                wrap: 'CLAMP_TO_EDGE',
                data: cdm
            });
            this.__glDecompHDRShader = new GLShader(gl, new DecompHDRShader());
            let shaderComp = this.__glDecompHDRShader.compileForTarget('GLHDRImage');
            this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        }
        else{
            this.__srcLDRTex.bufferData(ldr);
            this.__srcCDMTex.bufferData(cdm);
        }
        
        this.__fbo.bind();

        let renderstate = {};
        this.__glDecompHDRShader.bind(renderstate, 'GLHDRImage');
        this.__shaderBinding.bind(renderstate);


        let unifs = renderstate.unifs;
        this.__srcLDRTex.bind(renderstate, unifs.ldrSampler.location);
        this.__srcCDMTex.bind(renderstate, unifs.cdmSampler.location);

        gl.drawQuad();

        // // Debug a block of pixels.
        // gl.finish();
        // let numPixels = 4;
        // let pixels = new Float32Array(4 * numPixels);
        // gl.readPixels(ldr.width / 4, ldr.height/4, numPixels, 1, gl.RGBA, gl.FLOAT, pixels);
        // console.log(pixels);
        // gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        if(!this.__hdrImage.isStream()){
            this.destroy();
        }
    }

    destroy(){
        super.destroy();
        this.__fbo.destroy();
        this.__srcLDRTex.destroy();
        this.__srcCDMTex.destroy();
        this.__glDecompHDRShader.destroy();
        this.__shaderBinding.destroy();
    }
};

export {
    GLHDRImage
};