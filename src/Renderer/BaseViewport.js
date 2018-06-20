import {
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    Image
} from '../SceneTree';
import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLFbo
} from './GLFbo.js';

class BaseViewport {
    constructor(renderer) {
        this.__renderer = renderer;
        this.__backgroundColor = new Color('#e3e3e3');
        this.__fbo = undefined;
        this.updated = new Signal();
        this.resized = new Signal();
    }

    getRenderer() {
        return this.__renderer;
    }

    getName() {
        return this.__name;
    }

    getBl() {
        return this.__bl;
    }
    setBl(bl) {
        this.__bl = bl;
        this.resize(this.__canvasWidth, this.__canvasHeight);
    }

    getTr() {
        return this.__tr;
    }
    setTr(tr) {
        this.__tr = tr;
        this.resize(this.__canvasWidth, this.__canvasHeight);
    }

    getPosX() {
        return this.__x;
    }
    getPosY() {
        return this.__y;
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
        if (background instanceof Image){
            if (background.format === "FLOAT"){
                this.__backgroundTexture = background;
                this.__backgroundGLTexture = new GLHDRImage(gl, background);
            }
            else{
                this.__backgroundTexture = background;
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

    resize(width, height) {
        this.__canvasWidth = width;
        this.__canvasHeight = height;
        this.__x = (this.__canvasWidth * this.__bl.x);
        this.__y = (this.__canvasWidth * this.__bl.y);
        this.__width = (this.__canvasWidth * this.__tr.x) - (this.__canvasWidth * this.__bl.x);
        this.__height = (this.__canvasHeight * this.__tr.y) - (this.__canvasHeight * this.__bl.y);

        if (this.__camera)
            this.__updateProjectionMatrix();

        if (this.__fbo) {
            this.__fbo.colorTexture.resize(this.__width, this.__height);
            this.__fbo.resize();
        }
        if (this.__geomDataBufferFbo) {
            this.__geomDataBuffer.resize(this.__width, this.__height);
            this.__geomDataBufferFbo.resize();
        }

        this.resized.emit();
    }

    ////////////////////////////
    // Fbo

    getFbo() {
        return this.__fbo;
    }

    createOffscreenFbo(channels='RGB') {
        let targetWidth = this.__width;
        let targetHeight = this.__height;

        let gl = this.__renderer.gl;
        this.__fwBuffer = new GLTexture2D(gl, {
            format: 'FLOAT',
            channels,
            filter: 'NEAREST',
            width: targetWidth,
            height: targetHeight
        });
        this.__fbo = new GLFbo(gl, this.__fwBuffer, true);
        this.__fbo.setClearColor(this.__backgroundColor.asArray());
    }

    ////////////////////////////
    // Fbo

    bindAndClear(renderstate) {
        let gl = this.__renderer.gl;
        if (this.__fbo)
            this.__fbo.bindAndClear(renderstate);
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(this.__x, this.__y, this.__width, this.__height);
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