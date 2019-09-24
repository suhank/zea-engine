import {
  Color
} from '../Math';
import {
  Signal
} from '../Utilities';
import {
  ParameterOwner,
  BaseImage,
  ColorParameter,
  NumberParameter
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

class GLBaseViewport extends ParameterOwner {
  constructor(renderer) {
    super();
    this.__renderer = renderer;

    this.__renderer.sceneSet.connect(()=>{
      const rp = renderer.getScene().getRoot().getChildByName('Renderer Params')

      const bgColorPAram = rp.getParameter('BackgroundColor')
      const processBGValue = (mode)=>{
        const value = bgColorPAram.getValue();
        let gl = this.__renderer.gl;
        if (value instanceof BaseImage){
          if (value.type === 'FLOAT'){
            this.__backgroundTexture = value;
            this.__backgroundGLTexture = new GLHDRImage(gl, value);
          }
          else{
            this.__backgroundTexture = value;
            this.__backgroundGLTexture = new GLTexture2D(gl, value);
          }
        }
        else if (value instanceof Color){
          if(this.__backgroundGLTexture) {
            this.__backgroundGLTexture.destroy();
            this.__backgroundGLTexture = undefined;
            this.__backgroundTexture = undefined;
          }
          this.__backgroundColor = value;
        }
        else{
          console.warn("Invalid background:" + value);
        }
        this.updated.emit();
      }
      processBGValue(bgColorPAram.getValue());
      bgColorPAram.valueChanged.connect(processBGValue);
    })

    this.__doubleClickTimeMSParam = this.addParameter(new NumberParameter('DoubleClickTimeMS', 200));
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
    const rp = this.__renderer.getScene().getRoot().getChildByName('Renderer Params')
    const bgColorPAram = rp.getParameter('BackgroundColor')
    return bgColorPAram.getValue();
  }

  setBackground(background) {
    const rp = this.__renderer.getScene().getRoot().getChildByName('Renderer Params')
    const bgColorPAram = rp.getParameter('BackgroundColor')
    bgColorPAram.setValue(background);
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
  onMouseLeave(event) {
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
  GLBaseViewport
};
//export default GLBaseViewport;