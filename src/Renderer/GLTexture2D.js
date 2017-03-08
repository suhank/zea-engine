import {
    Signal
} from '../Math/Math.js';

import {
    RefCounted,
    Image2D
} from '../SceneTree/SceneTree.js';


class GLTexture2D extends RefCounted {
    constructor(gl, params) {
        super();
        this.__gl = gl;

        this.updated = new Signal();
        this.resized = new Signal();
        
        this.__gltex = this.__gl.createTexture();
        this.width = 0;
        this.height = 0;
        this.__loaded = false;
        if (params != undefined){
            if (params instanceof Image2D){
                this.__texture = params;
                if (this.__texture.isLoaded()) {
                    this.configure(this.__texture.getParams());
                }
                else {
                    this.__texture.loaded.connect(() => {
                        this.configure(this.__texture.getParams());
                    }, this);
                }
                this.__texture.destructing.connect(() => {
                    console.log(this.__texture.name + " destructing");
                    this.destroy();
                }, this);
            }
            else
                this.configure(params);
        }
    }

    isLoaded(){
        return this.__loaded;
    }
    getTexture(){
        return this.__texture;
    }

    configure(params) {

        if (!('channels' in params) || !('width' in params) || !('height' in params))
            throw ("Invalid texture params");

        let width = params['width'];
        let height = params['height'];
        let data = params['data'];

        let gl = this.__gl;
        let maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
        if(width <= 0 || width > maxSize || height <= 0 || height > maxSize) {
            throw new Error('gl-texture2d: Invalid texture size')
        }

        this.channels = params['channels'];
        this.format = params['format'];
        this.filter = ('filter' in params) ? params['filter'] : 'LINEAR';
        let wrap = ('wrap' in params) ? params['wrap'] : 'CLAMP_TO_EDGE';
        let flipY = ('flipY' in params) ? params['flipY'] : false;
        this.mipMapped = ('mipMapped' in params) ? params['mipMapped'] : false;

        if (this.format == 'FLOAT') {
            this.__ext_float = gl.getExtension('OES_texture_float');
            if (!this.__ext_float)
                throw ("OES_texture_float is not available");
            this.__ext_OES_texture_float_linear = gl.getExtension('OES_texture_float_linear');
            if (!this.__ext_OES_texture_float_linear)
                throw ("OES_texture_float_linear is not available");
        } else if (this.format == 'sRGB') {
            this.__ext_sRGB = gl.getExtension('EXT_sRGB');
            if (!this.__ext_sRGB)
                throw ("EXT_sRGB is not available");
        }

        // Load the image into the GPU for rendering.
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[this.filter]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[this.filter]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrap]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrap]);

        this.resize(width, height, data);
        this.__loaded = true;
        
        this.updated.emit();
    }

    bufferData(data){
        let gl = this.__gl;
        let channels = (typeof this.channels) == "string" ? gl[this.channels] : this.channels;
        if (data != undefined) {
            if (data instanceof Image) {
                gl.texImage2D(gl.TEXTURE_2D, 0, channels, channels, gl[this.format], data);
            }
            else {
                // Note: data images must have an even size width/height to load correctly. 
                // this doesn't mean they must be pot textures...
                //console.log(this.width + "x"+ this.height+ ":" + data.length + " channels:" + this.channels + " format:" + this.format);
                gl.texImage2D(gl.TEXTURE_2D, 0, channels, this.width, this.height, 0, channels, gl[this.format], data);
            }

            if (this.mipMapped)
                gl.generateMipmap(gl.TEXTURE_2D);
        } 
        else
            gl.texImage2D(gl.TEXTURE_2D, 0, channels, this.width, this.height, 0, channels, gl[this.format], null);
    }

    resize(width, height, data) {
        let sizeChanged = this.width != width || this.height != height;
        let gl = this.__gl;
        if(sizeChanged){
            this.width = width;
            this.height = height;
            let maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
            if(this.width < 0 || this.width > maxSize || this.height < 0 || this.height > maxSize) {
                throw new Error('gl-texture2d: Invalid texture size');
            }
        }
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex);

        this.bufferData(data);
        gl.bindTexture(gl.TEXTURE_2D, null);
        if(sizeChanged)
            this.resized.emit();
    }

    getSize(){
        return [this.width, this.height]
    }

    get glTex() {
        return this.__gltex;
    }

    bind(renderstate, location) {
        if(!this.__loaded){
            return;
        }
        if(!this.__gltex){
            throw("Unable to bind non-initialized or deleted texture.");
        }
        let unit = renderstate['boundTextures']++;
        let texId = this.__gl.TEXTURE0 + unit;
        let gl = this.__gl;
        gl.activeTexture(texId);
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        gl.uniform1i(location, unit);
    }

    destroy(){
        super.destroy();
        this.__gl.deleteTexture(this.__gltex);
        this.__gltex = undefined;
    }
};

export {
    GLTexture2D
};
