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
        super(gl, {
            channels: 'RGBA',
            format: 'FLOAT',
            width: hdrImage.width,
            height: hdrImage.height,
            filter: 'LINEAR',
            wrap: 'CLAMP_TO_EDGE'
        });
        let fbo = new GLFbo(gl, this);
        
        let envMapParams = hdrImage.getParams();
        let ldr = envMapParams.ldr;

        let srcLDRTex = new GLTexture2D(gl, {
            channels: 'RGB',
            format: 'UNSIGNED_BYTE',
            width: ldr.width,
            height: ldr.height,
            filter: 'NEAREST',
            mipMapped: false,
            wrap: 'CLAMP_TO_EDGE',
            data: ldr
        });
        let srcCDMTex = new GLTexture2D(gl, {
            channels: 'ALPHA',
            format: 'UNSIGNED_BYTE',
            width: ldr.width,
            height: ldr.height,
            filter: 'NEAREST',
            mipMapped: false,
            wrap: 'CLAMP_TO_EDGE',
            data: envMapParams.cdm
        });

        let glDecompHDRShader = new GLShader(gl, new DecompHDRShader());
        let shaderComp = glDecompHDRShader.compileForTarget('GLHDRImage');
        let shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        let renderstate = {};
        glDecompHDRShader.bind(renderstate, 'GLHDRImage');
        shaderBinding.bind(renderstate);
        let unifs = renderstate.unifs;

        fbo.bind();

        srcLDRTex.bind(renderstate, unifs.ldrSampler.location);
        srcCDMTex.bind(renderstate, unifs.cdmSampler.location);

        gl.drawQuad();


        // // Debug a block of pixels.
        // gl.finish();
        // let numPixels = 4;
        // let pixels = new Float32Array(4 * numPixels);
        // gl.readPixels(ldr.width / 4, ldr.height/4, numPixels, 1, gl.RGBA, gl.FLOAT, pixels);
        // console.log(pixels);
        // gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        fbo.destroy();
        srcLDRTex.destroy();
        srcCDMTex.destroy();
    }
};

export {
    GLHDRImage
};