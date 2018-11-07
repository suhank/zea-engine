import {
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    BaseImage
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

class GLBaseViewport {
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
        if (background instanceof BaseImage){
            if (background.type === 'FLOAT'){
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
        this.region = [this.__x, this.__y, this.__width, this.__height];

        this.resized.emit();
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


    ////////////////////////////
    // 
    clear(renderstate) {
        let gl = this.__renderer.gl;
        gl.viewport(...this.region);
        gl.clearColor(...this.__backgroundColor.asArray());
        gl.colorMask(true, true, true, true);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

};

export {
    GLBaseViewport
};
//export default GLBaseViewport;