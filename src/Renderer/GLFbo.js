
import '../Math/Math.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLFbo {
    constructor(gl, colorTexture, createDepthTexture = false, geomIdTexture = undefined) {
        this.__gl = gl;
        this.__colorTexture = colorTexture;
        this.__depthTexture = undefined;
        this.__createDepthTexture = createDepthTexture;
        this.__geomIdTexture = geomIdTexture;
        this.__clearColor = [0, 0, 0, 1];

        this.setup();

        // If multiple attachments, we can't automatically resize here.
        // TODO: this solutoin isn't very nice. Find a better approach. 
        if(!geomIdTexture)
            this.__colorTexture.resized.connect(this.resize, this);
    }

    setClearColor(clearColor) {
        this.__clearColor = clearColor;
    }

    setup() {
        let gl = this.__gl;

        // Query the extensions
        if (this.__createDepthTexture) {
            this.__ext__WEBGL_depth_texture = gl.getExtension("WEBGL_depth_texture"); // Or browser-appropriate prefix
            if (!this.__ext__WEBGL_depth_texture)
                console.warn("'WEBGL_depth_texture' not found. depth textures not supported...");
        }

        // Note: DEPRECATED
        if (this.__geomIdTexture) {
            this.__ext_WEBGL_draw_buffers = gl.getExtension("WEBGL_draw_buffers");
            if (!this.__ext_WEBGL_draw_buffers) {
                console.warn("Selection isn't possible without support for WEBGL_draw_buffers");
                this.__geomIdTexture.destroy();
                this.__geomIdTexture = undefined;
            }
        }

        this.__fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo);

        if (this.__colorTexture.type == 'FLOAT') {
            // Note: Fails on all browsers..
            // let ext = gl.getExtension('WEBGL_color_buffer_float');
            // if(!ext)
            //     throw("Unable to write to float textures.");
            if (this.__colorTexture.filter != 'NEAREST') {
                let ext = gl.getExtension('OES_texture_float_linear');
                if (!ext)
                    throw ("Unable to use filtering on floating point textures");
            }
        }

        if (this.__geomIdTexture) {
            // Note: DEPRECATED
            let ext = this.__ext_WEBGL_draw_buffers;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, this.__colorTexture.glTex, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, this.__geomIdTexture.glTex, 0);
        } else {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0);
        }

        // Create the depth texture
        if (this.__createDepthTexture) {
            if (!this.__ext__WEBGL_depth_texture) {
                // Create the depth buffer
                var depthBuffer = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
            } else {
                this.__depthTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, this.__depthTexture);
                // TODO: Copy params from the color image.
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.__depthTexture, 0);
            }
        }


        this.__checkFramebuffer();

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    }

    resize() {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo);
        // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0);
        if (this.__depthTexture) {
            gl.bindTexture(gl.TEXTURE_2D, this.__depthTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
        }
        this.__checkFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    __checkFramebuffer() {
        let gl = this.__gl;

        let check = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (check !== gl.FRAMEBUFFER_COMPLETE) {
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            console.warn("Error creating Fbo width:" + this.width + ", height:" + this.height);
            switch(check){
            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                throw ("The attachment types are mismatched or not all framebuffer attachment points are framebuffer attachment complete.");
            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                throw ("There is no attachment.");
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw ("Height and width of the attachment are not the same.");
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw ("The format of the attachment is not supported or if depth and stencil attachments are not the same renderbuffer.");
            case 36061: //gl.GL_FRAMEBUFFER_UNSUPPORTED:
                throw ("The framebuffer is unsupported");
            default:
                throw ("Incomplete Frambuffer");
            }
        }

    }

    get width() {
        return this.__colorTexture.width;
    }

    get height() {
        return this.__colorTexture.height;
    }

    get size(){
        return [this.__colorTexture.width, this.__colorTexture.height];
    }

    get colorTexture() {
        return this.__colorTexture;
    }

    get depthTextureGL() {
        return this.__depthTexture;
    }


    bind(renderstate, viewportScaleFactor = 1.0) {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo);
        gl.viewport(0, 0, this.width * viewportScaleFactor, this.height * viewportScaleFactor); // Match the viewport to the texture size

        // Note: DEPRECATED
        if (this.__geomIdTexture) {
            this.__ext_WEBGL_draw_buffers.drawBuffersWEBGL([
                this.__ext_WEBGL_draw_buffers.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]
                this.__ext_WEBGL_draw_buffers.COLOR_ATTACHMENT1_WEBGL // gl_FragData[1]
            ]);
        }
    }

    clear() {
        let gl = this.__gl;
        gl.colorMask(true, true, true, true); // Don't write to the color channels at all
        gl.clearColor(...this.__clearColor);
        if (this.__createDepthTexture) {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        } else {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    }

    bindAndClear(renderstate, viewportScaleFactor = 1.0) {
        this.bind(renderstate, viewportScaleFactor);
        this.clear(renderstate);
    }

    unbind() {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    destroy() {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.deleteFramebuffer(this.__fbo);
    }
};

export {
    GLFbo
};
