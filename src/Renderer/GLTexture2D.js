import {
    Signal
} from '../Math/Signal';
import {
    Image2D
} from '../SceneTree/Image2D';
import {
    RefCounted
} from '../SceneTree/RefCounted';

class GLTexture2D extends RefCounted {
    constructor(gl, params) {
        super();
        this.__gl = gl;

        this.ready = new Signal(true);
        this.updated = new Signal();
        this.resized = new Signal();

        this.__gltex = this.__gl.createTexture();
        this.width = 0;
        this.height = 0;
        this.__loaded = false;
        this.__bound = false;
        let imageUpdated = () => {
            // this.bufferData(data);
            let params = this.__texture.getParams();
            let width = params['width'];
            let height = params['height'];
            let data = params['data'];
            this.resize(width, height, data, true, true);
        }
        if (params != undefined) {
            if (params instanceof Image2D) {
                this.__texture = params;
                this.__texture.setMetadata('gltexture', this);
                if (this.__texture.isLoaded()) {
                    this.configure(this.__texture.getParams());
                    this.__texture.updated.connect(imageUpdated);
                } else {
                    this.__texture.loaded.connect(() => {
                        this.configure(this.__texture.getParams());
                        this.__texture.updated.connect(imageUpdated);
                    });
                }
                this.__texture.destructing.connect(() => {
                    console.log(this.__texture.name + " destructing");
                    this.destroy();
                });
            } else
                this.configure(params);
        }
    }

    isLoaded() {
        return this.__loaded;
    }
    getTexture() {
        return this.__texture;
    }

    getFormat(){
        return this.__formatParam;
    }
    getFormatID(){
        return this.__format;
    }
    getChannels(){
        return this.__channelsParam;
    }
    getChannelsID(){
        return this.__channels;
    }
    getFilter(){
        return this.__filterParam;
    }
    getWrap(){
        return this.__wrapParam;
    }

    getMipMapped(){
        return this.__mipMapped;
    }

    configure(params, emit = true) {

        if (!('channels' in params) || !('width' in params) || !('height' in params))
            throw ("Invalid texture params");

        const width = params['width'];
        const height = params['height'];
        const data = params['data'];


        const gl = this.__gl;
        const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
        if (width <= 0 || width > maxSize || height <= 0 || height > maxSize) {
            throw new Error("gl-texture2d: Invalid texture size. width:" + width + " height:" + height + " maxSize:" + maxSize);
        }

        let channels = params['channels'];
        let format = params['format'];
        let filter = ('filter' in params) ? params['filter'] : 'LINEAR';
        const wrap = ('wrap' in params) ? params['wrap'] : 'CLAMP_TO_EDGE';


        if (format == 'FLOAT') {
            if(gl.name == 'webgl2'){
                if (filter == 'LINEAR' && !gl.__ext_float_linear){
                    console.warn('Floating point texture filtering not supported on this device');
                    filter = 'NEAREST';
                }
            }
            else {
                if (gl.__ext_float){
                    if (filter == 'LINEAR' && !gl.__ext_float_linear){
                        console.warn('Floating point texture filtering not supported on this device');
                        filter = 'NEAREST';
                    }
                }
                else {
                    if(gl.__ext_half_float){
                        format = 'HALF_FLOAT';    
                        if (filter == 'LINEAR' && !gl.__ext_texture_half_float_linear) {
                            console.warn('Half Float texture filtering not supported on this device');
                            filter = 'NEAREST';
                        }
                    }
                    else{
                        throw ("OES_texture_half_float is not available");
                    }
                }
            }
        }
        else if (format == 'HALF_FLOAT') {
            if(gl.__ext_half_float){
                format = 'HALF_FLOAT';   
                if (!gl.__ext_texture_half_float_linear) {
                    console.warn('Half Float texture filtering not supported on this device');
                    filter = 'NEAREST';
                }
            }
            else
                throw ("OES_texture_half_float is not available");
        } 
        else if (format == 'sRGB') {
            if (!gl.__ext_sRGB)
                throw ("EXT_sRGB is not available");
        }

        this.__channelsParam = channels;
        this.__formatParam = format;
        this.__filterParam = filter;
        this.__wrapParam = wrap;


        this.__channels = gl[channels];
        this.__internalFormat = this.__channels;
        this.__format = gl[format];

        if(gl.name == 'webgl2'){
            if(this.__format == gl.FLOAT){
                if(this.__channels == gl.RGB){
                    this.__internalFormat = gl.RGB32F;
                }
                else if(channels == gl.RGBA){
                    this.__internalFormat = gl.RGBA32F;
                }
            }
        }
        this.__filter = gl[filter];
        this.__wrap = gl[wrap];
        this.__flipY = ('flipY' in params) ? params['flipY'] : false;
        this.__mipMapped = ('mipMapped' in params) ? params['mipMapped'] : false;
        this.flags = ('flags' in params) ? params['flags'] : 0;
        this.width = width;
        this.height = height;

        this.__updateGLTexParams();
        this.bufferData(data, false, false);
        if (!this.__loaded) {
            this.ready.emit();
            this.__loaded = true;
        }

    }

    __updateGLTexParams() {
        let gl = this.__gl;

        // Load the image into the GPU for rendering.
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex);

        // This parameter caused all images to be blank. Flipping in the pixel shader instead(by default)
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.__filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.__filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.__wrap);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.__wrap);
    }

    bufferData(data, bind = true, emit = true) {
        let gl = this.__gl;
        if (bind)
            gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        if (data != undefined) {
            if (data instanceof Image || data instanceof ImageData || data instanceof HTMLVideoElement) {
                gl.texImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, this.__channels, this.__format, data);
            } else {
                // Note: data images must have an even size width/height to load correctly. 
                // this doesn't mean they must be pot textures...
                let numPixels = this.width * this.height;
                let numChannels;
                switch(this.__channels) {
                    case gl.ALPHA: numChannels = 1; break;
                    case gl.RGB: numChannels = 3; break;
                    case gl.RGBA: numChannels = 4; break;
                }
                if(data.length != numPixels * numChannels) {
                    console.warn("Invalid data for Image width:" + this.width + " height:"+ this.height + " channels:" + this.__channelsParam + " format:" + this.__formatParam  + " Data Length:" + data.length  + " Expected:" + (numPixels * numChannels) );
                }
                if(gl.__ext_half_float && this.__format == gl.__ext_half_float.HALF_FLOAT_OES && data instanceof Float32Array){
                    data = Math.convertFloat32ArrayToUInt16Array(data);
                }
                gl.texImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, this.width, this.height, 0, this.__channels, this.__format, data);
            }

            if (this.__mipMapped) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, this.width, this.height, 0, this.__channels, this.__format, null);
        }

        if (emit) {
            this.updated.emit();
        }
    }

    resize(width, height, data, bind = true, emit = false) {
        let gl = this.__gl;
        let sizeChanged = this.width != width || this.height != height;
        if (sizeChanged) {
            let maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
            if (width < 0 || width > maxSize || height < 0 || height > maxSize) {
                throw new Error("gl-texture2d: Invalid texture size. width:" + width + " height:" + height + " maxSize:" + maxSize);
            }

            this.width = width;
            this.height = height;

            this.__gl.deleteTexture(this.__gltex);
            this.__gltex = this.__gl.createTexture();
            this.__updateGLTexParams();
            bind = false;
        }
        if (bind) {
            gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        }

        this.bufferData(data, false, false);
        if (sizeChanged) {
            this.resized.emit(width, height);
        }
        if (emit) {
            this.updated.emit();
        }
    }

    getSize() {
        return [this.width, this.height]
    }

    get glTex() {
        return this.__gltex;
    }

    getTexHdl() {
        return this.__gltex;
    }

    bind(renderstate, unif) {
        console.warn("'bind' is deprecated. Please use 'bindToUniform'");
        return this.bindToUniform(renderstate, unif);
    }

    bindToUniform(renderstate, unif, type=1) {
        if (!this.__loaded) {
            return false;
        }
        if (!this.__gltex) {
            throw ("Unable to bind non-initialized or deleted texture.");
        }

        let unit = renderstate['boundTextures']++;
        let texId = this.__gl.TEXTURE0 + unit;
        let gl = this.__gl;
        gl.activeTexture(texId);
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        gl.uniform1i(unif.location, unit);

        let textureConnctedUnif = renderstate.unifs[unif.name+'Connected'];
        if (textureConnctedUnif){
            gl.uniform1i(textureConnctedUnif.location, type);
        }

        let textureSizeUnif = renderstate.unifs[unif.name+'Size'];
        if (textureSizeUnif){
            gl.uniform1i(textureSizeUnif.location, this.width);
        }

        return true;
    }

    destroy() {
        super.destroy();
        if(this.__texture){
            this.__texture.setMetadata('gltexture', undefined);
        }
        this.__gl.deleteTexture(this.__gltex);
        this.__gltex = undefined;
    }
};

export {
    GLTexture2D
};
// export default GLTexture2D;