import {
    Vec2,
    Vec3,
    Quat,
    Mat4,
    Xfo,
    Color,
    Ray,
    Signal,
    isMobileDevice
} from '../Math';
import {
    HDRImage2D,
    Image2D
} from '../SceneTree';
import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    GLTexture2D
} from './GLTexture2D.js';

class BaseViewport {
    constructor(renderer) {
        this.__renderer = renderer;
        this.__fbo = undefined;
    }

    getRenderer() {
        return this.__renderer;
    }

    getName() {
        return this.__name;
    }

    getWidth() {
        return this.__width;
    }

    getHeight() {
        return this.__height;
    }
    
    getBackground() {
        return this.__background;
    }

    setBackground(background) {
        let gl = this.__renderer.gl;
        if (background instanceof Image2D){
            if (background.isHDR()){
                this.__backgroundTexture = background;
                this.__backgroundGLTexture = new GLHDRImage(gl, background);
            }
            else{
                this.__backgroundTexture = background;
                if (background.hasAlpha())
                    this.__backgroundGLTexture = new GLLDRAlphaImage(gl, background);
                else
                    this.__backgroundGLTexture = new GLTexture2D(gl, background);
            }
        }
        else{
             if(this.__backgroundGLTexture) {
                this.__backgroundGLTexture.destroy();
                this.__backgroundGLTexture = undefined;
                this.__backgroundTexture = undefined;
            }
            this.__backgroundColor = background;
            if (this.__fbo) {
                this.__fbo.setClearColor(this.__backgroundColor.asArray());
            }
        }
        this.updated.emit();
    }

    ////////////////////////////
    // Fbo

    getFbo() {
        return this.__fbo;
    }

    createOffscreenFbo() {
        let targetWidth = this.__width;
        let targetHeight = this.__height;

        let gl = this.__renderer.gl;
        this.__fwBuffer = new GLTexture2D(gl, {
            format: 'FLOAT',
            channels: 'RGB',
            width: targetWidth,
            height: targetHeight
        });
        this.__fbo = new GLFbo(gl, this.__fwBuffer, true);
        this.__fbo.setClearColor(this.__background.asArray());
    }

    ////////////////////////////
    // Fbo

    bindAndClear(renderstate) {
        let gl = this.__renderer.gl;
        if (this.__fbo)
            this.__fbo.bindAndClear(renderstate);
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(this.x, this.y, this.__width, this.__height);
            // Only sissor if multiple viewports are setup.
            // gl.enable(gl.SCISSOR_TEST);
            // gl.scissor(this.x, this.y, this.__width, this.__height);

            gl.clearColor(...this.__backgroundColor.asArray());
            gl.colorMask(true, true, true, true);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        if(this.__backgroundTexture && this.__backgroundTexture.isLoaded()) {
            let screenQuad = gl.screenQuad;
            screenQuad.bindShader(renderstate);
            gl.depthMask(false);
            screenQuad.draw(renderstate, this.__backgroundGLTexture, [0.0, 0.0], [1.0, -1.0]);
        }
    }


    /////////////////////////////
    // Events
    onMouseDown(event) {
        return false;
    }
    onMouseUp(event) {
        return false;
    }
    onMouseMove(event) {
        return false;
    }
    onKeyPressed(key) {
        return false;
    }
    onKeyDown(key) {
        return false;
    }
    onKeyUp(key) {
        return false;
    }


};

export {
    BaseViewport
};
//export default BaseViewport;