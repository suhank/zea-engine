

class GLHammersleyTexture2D {
    constructor(gl, numSamples = 512) {
        this.updated = new Signal();
        this.__gl = gl;
        this.__numSamples = numSamples;
        this.__gltex = this.__gl.createTexture();
        this.__ext_float = gl.getExtension('OES_texture_float');
        this.__configure(numSamples);
    }

    __configure(numSamples) {
        let data = new Float32Array(4 * numSamples);
        for(let i=0; i<numSamples; i++) {
            let p = hammersley(i, numSamples)
            data[i*4]   = p[0];
            data[i*4+1] = p[1];
            data[i*4+2] = 0;
            data[i*4+3] = 0;
        }

        this.__gl.bindTexture(this.__gl.TEXTURE_2D, this.__gltex);
        this.__gl.pixelStorei(this.__gl.UNPACK_FLIP_Y_WEBGL, false);
        this.__gl.texImage2D(this.__gl.TEXTURE_2D, 0, this.__gl.RGBA, 1, numSamples, 0, this.__gl.RGBA, this.__gl.FLOAT, data);
        this.__gl.texParameteri(this.__gl.TEXTURE_2D, this.__gl.TEXTURE_MAG_FILTER, this.__gl.NEAREST);
        this.__gl.texParameteri(this.__gl.TEXTURE_2D, this.__gl.TEXTURE_MIN_FILTER, this.__gl.NEAREST);
        this.__gl.texParameteri(this.__gl.TEXTURE_2D, this.__gl.TEXTURE_WRAP_S, this.__gl.CLAMP_TO_EDGE);
        this.__gl.texParameteri(this.__gl.TEXTURE_2D, this.__gl.TEXTURE_WRAP_T, this.__gl.CLAMP_TO_EDGE);
        // this.__gl.generateMipmap(this.__gl.TEXTURE_2D);
        this.__gl.bindTexture(this.__gl.TEXTURE_2D, null);

        this.updated.emit();
    }
    get loaded() {
        return true;
    }

    bind(renderstate) {
        let unit = renderstate['boundTextures']++;
        let texId = this.__gl.TEXTURE0 + unit;
        this.__gl.activeTexture(texId);
        this.__gl.bindTexture(this.__gl.TEXTURE_2D, this.__gltex);
        this.__gl.uniform1i(unifs['hammersleyPointSetMap']['location'], unit);
    }
}