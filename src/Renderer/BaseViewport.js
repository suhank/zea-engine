import {
    Color,
    Signal
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
        this.__backgroundColor = new Color(0.4, 0.4, 0.4);
        this.__fbo = undefined;
        this.updated = new Signal();
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
        return this.__backgroundTexture ? this.__backgroundTexture : this.__backgroundColor;
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
        else if (background instanceof Color){
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
        else{
            console.warn("Invalid background:" + background);
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
        if (this.__fbo)
            this.__fbo.bindAndClear(renderstate);
        else {
            let gl = this.__renderer.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(this.x, this.y, this.__width, this.__height);
            // Only sissor if multiple viewports are setup.
            // gl.enable(gl.SCISSOR_TEST);
            // gl.scissor(this.x, this.y, this.__width, this.__height);

            gl.clearColor(...this.__backgroundColor.asArray());
            gl.colorMask(true, true, true, true);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
    }

    drawBackground(renderstate, pos=[0,0], size=[1,-1]) {
        let gl = this.__renderer.gl;
        let screenQuad = gl.screenQuad;
        screenQuad.bindShader(renderstate);
        gl.depthMask(false);
        screenQuad.draw(renderstate, this.__backgroundGLTexture, pos, size);
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
    onKeyPressed(key, event) {
        return false;
    }
    onKeyDown(key, event) {
        return false;
    }
    onKeyUp(key, event) {
        return false;
    }


};

export {
    BaseViewport
};
//export default BaseViewport;