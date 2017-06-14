import { GLShader } from './GLShader.js';
import { GLTexture2D } from './GLTexture2D.js';
import { UnpackAndMixHDRShader } from './Shaders/UnpackHDRShader.js';
import { GLFbo } from './GLFbo.js';
import { generateShaderGeomBinding } from './GeomShaderBinding.js';

class GLHDRImageMixer extends GLTexture2D {
    constructor(gl, hdrImageMixer) {
        super(gl);

        this.__decompAndMixShader = new UnpackAndMixHDRShader(gl);
        let shaderComp = this.__decompAndMixShader.compileForTarget('GLHDRImageMixer');
        this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);

        this.__hdrImageMixer = hdrImageMixer;
        this.__srcTextures = [];

        this.__hdrImageMixer.updated.connect(() => {
            this.__unpackHDRImages(this.__hdrImageMixer.getParams());
        }, this);
        if (this.__hdrImageMixer.isLoaded()) {
            this.__unpackHDRImages(this.__hdrImageMixer.getParams());
        }
        else{
            this.__hdrImageMixer.loaded.connect(() => {
                this.__unpackHDRImages(this.__hdrImageMixer.getParams());
            }, this);
        }
        this.__hdrImageMixer.weightsChanged.connect((weights) => {
            this.__renderTgtImage(weights);
        }, this);

        this.__hdrImageMixer.destructing.connect(() => {
            console.log(this.__hdrImageMixer.name + " destructing");
            this.destroy();
        }, this);

    }

    __unpackHDRImages(hdrImageParams){

        let gl = this.__gl;
        
        let subImages = hdrImageParams.subImages;
        let weights = hdrImageParams.weights;

        if(!this.__fbo){
            let image0 = subImages[0];
            this.configure({
                channels: 'RGBA',
                format: 'FLOAT',
                width: image0.width,
                height: image0.height,
                filter: 'LINEAR',
                wrap: 'CLAMP_TO_EDGE'
            });
            this.__fbo = new GLFbo(gl, this);
        }

        for(let i=0; i<subImages.length; i++){
            let subImageParams = subImages[i].getParams();
            if(this.__srcTextures.length <= i){
                let ldr = subImageParams.data.ldr;
                let ldrTex = new GLTexture2D(gl, {
                        channels: 'RGB',
                        format: 'UNSIGNED_BYTE',
                        width: ldr.width,
                        height: ldr.height,
                        filter: 'NEAREST',
                        mipMapped: false,
                        wrap: 'CLAMP_TO_EDGE',
                        data: ldr
                    });
                let cdmTex = new GLTexture2D(gl, {
                        channels: 'ALPHA',
                        format: 'UNSIGNED_BYTE',
                        width: ldr.width,
                        height: ldr.height,
                        filter: 'NEAREST',
                        mipMapped: false,
                        wrap: 'CLAMP_TO_EDGE',
                        data: subImageParams.data.cdm
                    });
                this.__srcTextures[i] = { ldrTex, cdmTex };
            }
            else{
                this.__srcTextures[i].ldrTex.bufferData(subImageParams.ldr);
                this.__srcTextures[i].cdmTex.bufferData(subImageParams.cdm);
            }
        }

        this.__renderTgtImage(weights);
    }

    __renderTgtImage(weights){

        let gl = this.__gl;
        this.__fbo.bindAndClear();

        let renderstate = {};
        this.__decompAndMixShader.bind(renderstate, 'GLHDRImageMixer');
        this.__shaderBinding.bind(renderstate);

        let unifs = renderstate.unifs;
        for(let i=0; i<this.__srcTextures.length; i++){
            this.__srcTextures[i].ldrTex.bind(renderstate, unifs['ldrSampler'+i].location);
            this.__srcTextures[i].cdmTex.bind(renderstate, unifs['cdmSampler'+i].location);
            gl.uniform1f(unifs['weight'+i].location, weights[i]);
        }

        gl.drawQuad();

        // // Debug a block of pixels.
        // gl.finish();
        // let numPixels = 4;
        // let pixels = new Float32Array(4 * numPixels);
        // gl.readPixels(this.width / 4, this.height/4, numPixels, 1, gl.RGBA, gl.FLOAT, pixels);
        // console.log(pixels);

        this.__fbo.unbind();

        if(!this.__hdrImageMixer.isStream()){
            this.__fbo.destroy();
            for(let i=0; i<this.__srcTextures.length; i++){
                this.__srcTextures[i].ldrTex.destroy();
                this.__srcTextures[i].cdmTex.destroy();
            }
            this.__fbo = null;
            this.__srcTextures = [];
        }

        this.updated.emit();
    }

    destroy(){
        super.destroy();
        if(this.__fbo){
            this.__fbo.destroy();
            for(let i=0; i<this.__srcTextures.length; i++){
                this.__srcTextures[i].ldrTex.destroy();
                this.__srcTextures[i].cdmTex.destroy();
            }
        }
        this.__decompAndMixShader.destroy();
        this.__shaderBinding.destroy();

        this.__hdrImageMixer.loaded.disconnectScope(this);
        this.__hdrImageMixer.updated.disconnectScope(this);
    }
};

export {
    GLHDRImageMixer
};
// export default GLHDRImageMixer;