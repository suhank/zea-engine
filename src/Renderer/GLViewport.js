import { Vec2, Vec3, Ray, Mat4 } from '../Math';
import { Signal } from '../Utilities';
import { Camera } from '../SceneTree';
import { GLBaseViewport } from './GLBaseViewport.js';
import { GLFbo } from './GLFbo.js';
import { GLTexture2D } from './GLTexture2D.js';

import { CameraMouseAndKeyboard } from '../SceneTree';

/** Class representing a GL viewport.
 * @extends GLBaseViewport
 */
class GLViewport extends GLBaseViewport {
  /**
   * Create a GL viewport.
   * @param {any} renderer - The renderer value.
   * @param {string} name - The name value.
   * @param {any} width - The namwidthe value.
   * @param {any} height - The height value.
   */
  constructor(renderer, name, width, height) {
    super(renderer);
    this.__name = name;
    this.__projectionMatrix = new Mat4();
    this.__frustumDim = new Vec2();

    // Layout coords, x:[0..1], y:[0..1]
    this.__bl = new Vec2(0, 0);
    this.__tr = new Vec2(1, 1);

    this.__exposure = 0.0;
    this.__exposureRange = [-5, 10];
    this.__tonemap = true;
    this.__gamma = 2.2;
    this.__prevDownTime = 0;

    this.__geomDataBuffer = undefined;
    this.__geomDataBufferFbo = undefined;

    const gl = renderer.getGL();

    // Signals to abstract the user view.
    // i.e. when a user switches to VR mode, the signals
    // simply emit the new VR data.
    this.viewChanged = new Signal();

    this.capturedElement = null;
    this.keyDown = new Signal();
    this.keyPressed = new Signal();
    this.keyUp = new Signal();
    this.mouseDown = new Signal();
    this.mouseDoubleClicked = new Signal();
    this.mouseMove = new Signal();
    this.mouseUp = new Signal();
    this.mouseLeave = new Signal();
    this.mouseDownOnGeom = new Signal();
    this.mouseWheel = new Signal();

    this.touchStart = new Signal();
    this.touchMove = new Signal();
    this.touchEnd = new Signal();
    this.touchCancel = new Signal();
    this.doubleTapped = new Signal();

    // this.renderGeomDataFbo = this.renderGeomDataFbo.bind(this);

    // Each user has a separate camera, and so the default
    //  camera cannot be part of the scene.
    this.setCamera(new Camera('Default'));
    this.setManipulator(new CameraMouseAndKeyboard());
    this.__cameraManipulatorDragging = false;

    this.resize(width, height);
  }

  /**
   * The resize method.
   * @param {any} width - The width param.
   * @param {any} height - The height param.
   */
  resize(width, height) {
    super.resize(width, height);
    if (this.__camera) this.__updateProjectionMatrix();

    if (this.__geomDataBufferFbo) {
      this.__geomDataBuffer.resize(this.__width, this.__height);
      this.__geomDataBufferFbo.resize();
    }
  }

  /**
   * The getCamera method.
   * @return {any} - The return value.
   */
  getCamera() {
    return this.__camera;
  }

  /**
   * The setCamera method.
   * @param {any} camera - The camera param.
   */
  setCamera(camera) {
    this.__camera = camera;
    const globalXfoParam = camera.getParameter('GlobalXfo');
    const getCameraParams = () => {
      this.__cameraXfo = globalXfoParam.getValue();
      this.__cameraMat = this.__cameraXfo.toMat4();
      this.__viewMat = this.__cameraMat.inverse();
    };
    getCameraParams();
    globalXfoParam.valueChanged.connect(() => {
      getCameraParams();
      this.invalidateGeomDataBuffer();
      this.updated.emit();
      this.viewChanged.emit({
        interfaceType: 'CameraAndPointer',
        viewXfo: this.__cameraXfo,
        focalDistance: this.__camera.getFocalDistance(),
      });
    });
    this.__camera.projectionParamChanged.connect(() => {
      this.__updateProjectionMatrix();
      this.updated.emit();
    });

    this.__updateProjectionMatrix();
  }

  /**
   * The getManipulator method.
   * @return {any} - The return value.
   */
  getManipulator() {
    return this.__cameraManipulator;
  }

  /**
   * The setManipulator method.
   * @param {any} manipulator - The manipulator param.
   */
  setManipulator(manipulator) {
    this.__cameraManipulator = manipulator;
  }

  /**
   * The __updateProjectionMatrix method.
   * @private
   */
  __updateProjectionMatrix() {
    const aspect = this.__width / this.__height;
    this.__camera.updateProjectionMatrix(this.__projectionMatrix, aspect);

    const frustumH =
      Math.tan(this.__camera.getFov() / 2.0) * this.__camera.getNear() * 2.0;
    const frustumW = frustumH * aspect;
    this.__frustumDim.set(frustumW, frustumH);
  }

  /**
   * The setActive method.
   * @param {any} state - The state param.
   */
  setActive(state) {
    if (state) activeViewport = this;
    else activeViewport = undefined;
  }

  /**
   * The frameView method.
   * @param {any} treeItems - The treeItems param.
   */
  frameView(treeItems) {
    this.__camera.frameView(this, treeItems);
  }

  /**
   * Compute a ray into the scene based on a mouse coordinate.
   * @param {any} screenPos - The screenPos param.
   * @return {any} - The return value.
   */
  calcRayFromScreenPos(screenPos) {
    // Convert the raster coordinates to screen space ([0,{w|h}] -> [-1,1]
    // - Note: The raster vertical is inverted wrt OGL screenspace Y

    const topy = this.__canvasHeight * (1.0 - this.__tr.y);
    let sx = (screenPos.x - this.__x) / this.__width;
    let sy = (screenPos.y - topy) / this.__height;

    sx = sx * 2.0 - 1.0;
    sy = sy * 2.0 - 1.0;

    // Transform the origin from camera local to world space
    const cameraMat = this.__cameraMat;

    const projInv = this.__projectionMatrix.inverse();
    if (projInv == null)
      // Sometimes this happens, not sure why...
      return null;

    let rayStart;
    let rayDirection;
    if (this.__camera.getIsOrthographic()) {
      // Orthographic projections.
      rayStart = cameraMat.transformVec3(
        projInv.transformVec3(new Vec3(sx, -sy, -1.0))
      );
      rayDirection = new Vec3(0.0, 0.0, -1.0);
    } else {
      rayStart = cameraMat.translation;
      // Get the projected window coordinate on the near plane
      // See http://www.songho.ca/opengl/gl_projectionmatrix.html
      // for details.
      rayDirection = projInv.transformVec3(new Vec3(sx, -sy, -1.0));
    }
    // And from projection space to camera local.
    // - We nuke the translation part since we're transforming a vector.
    rayDirection = cameraMat.rotateVec3(rayDirection).normalize();
    return new Ray(rayStart, rayDirection);
  }

  // //////////////////////////
  // GeomData

  /**
   * The createGeomDataFbo method.
   * @param {any} floatGeomBuffer - The floatGeomBuffer param.
   */
  createGeomDataFbo(floatGeomBuffer) {
    const gl = this.__renderer.gl;
    this.__floatGeomBuffer = floatGeomBuffer;
    if (this.__floatGeomBuffer) {
      this.__geomDataBuffer = new GLTexture2D(gl, {
        type: 'FLOAT',
        format: 'RGBA',
        filter: 'NEAREST',
        width: this.__width <= 1 ? 1 : this.__width,
        height: this.__height <= 1 ? 1 : this.__height,
      });
    } else {
      this.__geomDataBuffer = new GLTexture2D(gl, {
        type: 'UNSIGNED_BYTE',
        format: 'RGBA',
        filter: 'NEAREST',
        width: this.__width <= 1 ? 1 : this.__width,
        height: this.__height <= 1 ? 1 : this.__height,
      });
    }
    this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true);
    this.__geomDataBufferFbo.setClearColor([0, 0, 0, 0]);
  }

  /**
   * The getGeomDataFbo method.
   * @return {any} - The return value.
   */
  getGeomDataFbo() {
    return this.__geomDataBufferFbo;
  }

  /**
   * The renderGeomDataFbo method.
   */
  renderGeomDataFbo() {
    if (this.__geomDataBufferFbo) {
      this.__geomDataBufferFbo.bindAndClear();

      const renderstate = {};
      this.__initRenderState(renderstate);
      this.__renderer.drawSceneGeomData(renderstate);
      this.__geomDataBufferInvalid = false;
    }
  }

  /**
   * The invalidateGeomDataBuffer method.
   */
  invalidateGeomDataBuffer() {
    this.__geomDataBufferInvalid = true;
  }

  /**
   * The getGeomDataAtPos method.
   * @param {any} screenPos - The screenPos param.
   * @param {any} mouseRay - The mouseRay param.
   * @return {any} - The return value.
   */
  getGeomDataAtPos(screenPos, mouseRay) {
    if (this.__geomDataBufferFbo) {
      if (this.__geomDataBufferInvalid) {
        this.renderGeomDataFbo();
        this.__screenPos = null;
      }

      // cache the intersection tests result so subsequent queries will return the same value.
      // Note: every new mouse event will generate a new mousePos value, so the cache
      // is only valid for a given event propagation, and for that exact mousePos value.
      if (screenPos === this.__screenPos) {
        return this.__intersectionData;
      }
      this.__screenPos = screenPos;
      this.__intersectionData = null;

      const gl = this.__renderer.gl;
      gl.finish();

      this.__geomDataBufferFbo.bindForReading();

      // const logGeomData = ()=>{
      //     console.log("logGeomData :[" + this.__geomDataBuffer.width +","+ this.__geomDataBuffer.height + "]")
      //     const pixels = new Float32Array(this.__geomDataBuffer.width * 4);
      //     for(let i=0; i<this.__geomDataBuffer.height; i++){
      //       gl.readPixels(0, i, this.__geomDataBuffer.width, 1, gl.RGBA, gl.FLOAT, pixels);
      //         for(let j=0; j<this.__geomDataBuffer.width; j++){
      //             const geomData = pixels.subarray(j*4, (j+1)*4);
      //             if (geomData[0] != 0 || geomData[1] != 0){
      //                 console.log(j, i)
      //                 break; // Only log the left border pixels.
      //             }
      //         }
      //       // console.log(pixels);
      //     }
      // }
      // logGeomData();
      // console.log("getGeomDataAtPos:", screenPos.toString())

      // Allocate a 1 pixel block and read grom the GeomData buffer.
      let passId;
      let geomData;
      if (gl.floatGeomBuffer) {
        geomData = new Float32Array(4);
        gl.readPixels(
          screenPos.x,
          this.__height - screenPos.y,
          1,
          1,
          gl.RGBA,
          gl.FLOAT,
          geomData
        );
        if (geomData[3] == 0) return undefined;
        passId = Math.round(geomData[0]);
      } else {
        geomData = new Uint8Array(4);
        gl.readPixels(
          screenPos.x,
          this.__height - screenPos.y,
          1,
          1,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          geomData
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (geomData[0] == 0 && geomData[1] == 0) return undefined;
        passId = 0;
      }
      this.__geomDataBufferFbo.unbind();
      const pass = this.__renderer.getPass(passId);
      if (!pass) {
        console.warn('Geom data buffer returns invalid pass id:', passId);
        return;
      }
      const geomItemAndDist = pass.getGeomItemAndDist(geomData);

      if (geomItemAndDist) {
        if (!mouseRay) mouseRay = this.calcRayFromScreenPos(screenPos);
        const intersectionPos = mouseRay.start.add(
          mouseRay.dir.scale(geomItemAndDist.dist)
        );
        this.__intersectionData = {
          screenPos,
          mouseRay,
          intersectionPos,
          geomItem: geomItemAndDist.geomItem,
          dist: geomItemAndDist.dist,
        };
      }
      return this.__intersectionData;
    }
  }

  /**
   * The getGeomItemsInRect method.
   * @param {any} tl - The tl param.
   * @param {any} br - The br param.
   * @return {any} - The return value.
   */
  getGeomItemsInRect(tl, br) {
    if (this.__geomDataBufferFbo) {
      const gl = this.__renderer.gl;
      gl.finish();
      // Allocate a pixel block.
      const rectBottom = Math.round(this.__height - br.y);
      const rectLeft = Math.round(tl.x);
      const rectWidth = Math.round(br.x - tl.x);
      const rectHeight = Math.round(br.y - tl.y);
      const numPixels = rectWidth * rectHeight;

      this.__geomDataBufferFbo.bindForReading();

      let geomDatas;
      if (gl.floatGeomBuffer) {
        geomDatas = new Float32Array(4 * numPixels);
        gl.readPixels(
          rectLeft,
          rectBottom,
          rectWidth,
          rectHeight,
          gl.RGBA,
          gl.FLOAT,
          geomDatas
        );
      } else {
        geomDatas = new Uint8Array(4 * numPixels);
        gl.readPixels(
          rectLeft,
          rectBottom,
          rectWidth,
          rectHeight,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          geomDatas
        );
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      const geomItems = new Set();
      for (let i = 0; i < numPixels; i++) {
        let passId;
        const geomData = geomDatas.subarray(i * 4, (i + 1) * 4);
        if (gl.floatGeomBuffer) {
          passId = Math.round(geomData[0]);
        } else {
          passId = 0;
        }

        const geomItemAndDist = this.__renderer
          .getPass(passId)
          .getGeomItemAndDist(geomData);
        if (geomItemAndDist) {
          geomItems.add(geomItemAndDist.geomItem);
        }
      }
      return geomItems;
    }
  }

  // ///////////////////////////
  // Events

  /**
   * The __eventMousePos method.
   * @param {any} event - The event param.
   * @return {NewType} - The return value.
   * @private
   */
  __eventMousePos(event) {
    return new Vec2(
      event.rendererX - this.getPosX(),
      event.rendererY - this.getPosY()
    );
  }

  __prepareEvent(event) {
    event.viewport = this;
    event.propagating = true;
    event.stopPropagation();
    event.stopPropagation = ()=>{
      event.propagating = false;
    }
    if(event instanceof MouseEvent) {
      const mousePos = this.__eventMousePos(event);
      event.mousePos = mousePos;
      event.mouseRay = this.calcRayFromScreenPos(mousePos);
      
      const intersectionData = this.getGeomDataAtPos(event.mousePos, event.mouseRay);
      if (intersectionData != undefined) {
        // console.log("onMouseDown on Geom"); // + " Material:" + geomItem.getMaterial().name);
        // console.log(intersectionData.geomItem.getPath()); // + " Material:" + geomItem.getMaterial().name);
        event.intersectionData = intersectionData;
      }
    }
  }

  setCapture(target) {
    this.capturedElement = target;
  }

  /**
   * The getCapture method.
   * @return {any} - The return value.
   */
  getCapture() {
    return this.capturedElement;
  }

  /**
   * The releaseCapture method.
   */
  releaseCapture() {
    this.capturedElement = null;
  }

  /**
   * The onMouseDown method.
   * @param {any} event - The event param.
   * @return {any} - The return value.
   */
  onMouseDown(event) {
    this.__prepareEvent(event);
    
    if (this.capturedElement) {
      this.capturedElement.onMouseDown(event);
      return;
    }

    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onMouseDown(event);
      if (!event.propagating || this.capturedElement)
        return;

      this.mouseDownOnGeom.emit(event);
      if (!event.propagating)
        return;
    }

    const downTime = Date.now();
    if (
      downTime - this.__prevDownTime <
      this.__doubleClickTimeMSParam.getValue()
    ) {
      if (this.__cameraManipulator) {
        this.__cameraManipulatorDragging = true;
        this.__cameraManipulator.onDoubleClick(event);
        return;
      }

      this.mouseDoubleClicked.emit(event);
    } else {
      this.__prevDownTime = downTime;
      if (this.__cameraManipulator) {
        this.__cameraManipulatorDragging = true;
        this.__cameraManipulator.onDragStart(event);
        return;
      }

      this.mouseDown.emit(event);
    }

    return false;
  }

  /**
   * The onMouseMove method.
   * @param {any} event - The event param.
   * @return {any} - The return value.
   */
  onMouseMove(event) {

    this.__prepareEvent(event);

    if (this.capturedElement) {
      this.capturedElement.onMouseMove(event);
      return;
    }
    
    if (event.intersectionData != undefined) {
      if(event.intersectionData.geomItem != this.mouseOverItem) {
        if(this.mouseOverItem)
          this.mouseOverItem.onMouseLeave(event);
        this.mouseOverItem = event.intersectionData.geomItem;
        this.mouseOverItem.onMouseEnter(event);
      }

      event.intersectionData.geomItem.onMouseMove(event);
      if (!event.propagating || this.capturedElement)
        return;
    }
    else if(this.mouseOverItem) {
      this.mouseOverItem.onMouseLeave(event);
      this.mouseOverItem = null;
    }

    if (this.__cameraManipulator && this.__cameraManipulatorDragging) {
      this.__cameraManipulator.onDrag(event);
      return;
    }
    this.mouseMove.emit(event);
    return false;
  }

  /**
   * The onMouseUp method.
   * @param {any} event - The event param.
   * @return {any} - The return value.
   */
  onMouseUp(event) {
    this.__prepareEvent(event);
    
    if (this.capturedElement) {
      this.capturedElement.onMouseUp(event);
      if (this.capturedElement) {
        console.warn(
          "Element was captured by setCapture but no 'releaseCapture' has been called."
        );
      }
      return;
    }

    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onMouseUp(event);
      if (!event.propagating)
        return;
    }

    if (this.__cameraManipulator && this.__cameraManipulatorDragging) {
      this.__cameraManipulator.onDragEnd(event);
      this.__cameraManipulatorDragging = false;
      return;
    }

    this.mouseUp.emit(event);
    return false;
  }

  /**
   * The onMouseLeave method.
   * @param {any} event - The event param.
   * @return {any} - The return value.
   */
  onMouseLeave(event) {
    this.__prepareEvent(event);
    this.mouseLeave.emit(event);
    return false;
  }

  /**
   * The onKeyPressed method.
   * @param {any} key - The key param.
   * @param {any} event - The event param.
   * @return {any} - The return value.
   */
  onKeyPressed(key, event) {
    this.__prepareEvent(event);
    if (this.__cameraManipulator) {
      if (this.__cameraManipulator.onKeyPressed(key, event)) return true;
    }
    this.keyPressed.emit(key, event);
    return false;
  }

  /**
   * The onKeyDown method.
   * @param {any} key - The key param.
   * @param {any} event - The event param.
   * @return {any} - The return value.
   */
  onKeyDown(key, event) {
    this.__prepareEvent(event);
    if (this.__cameraManipulator) {
      if (this.__cameraManipulator.onKeyDown(key, event)) return true;
    }
    this.keyDown.emit(key, event);
  }

  /**
   * The onKeyUp method.
   * @param {any} key - The key param.
   * @param {any} event - The event param.
   * @return {any} - The return value.
   */
  onKeyUp(key, event) {
    this.__prepareEvent(event);
    if (this.__cameraManipulator) {
      if (this.__cameraManipulator.onKeyUp(key, event)) return true;
    }
    this.keyUp.emit(key, event);
  }

  /**
   * The onWheel method.
   * @param {any} event - The event param.
   */
  onWheel(event) {
    this.__prepareEvent(event);
    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onWheel(event);
      if (!event.propagating)
        return;
    }

    if (this.__cameraManipulator) {
      this.__cameraManipulator.onWheel(event);
      return;
    }
    this.mouseWheel.emit(event);
  }

  // Touch events

  /**
   * The __eventTouchPos method.
   * @param {any} touch - The touch param.
   * @return {any} - The return value.
   * @private
   */
  __eventTouchPos(touch) {
    return new Vec2(
      touch.rendererX - this.getPosX(),
      touch.rendererY - this.getPosY()
    );
  }

  /**
   * The onTouchStart method.
   * @param {any} event - The event param.
   */
  onTouchStart(event) { 
    this.__prepareEvent(event);

    if (event.touches.length == 1) {
      const touch = event.touches[0];
      const touchPos = this.__eventTouchPos(touch);
      event.touchPos = touchPos;
      event.touchRay = this.calcRayFromScreenPos(touchPos);

      const intersectionData = this.getGeomDataAtPos(touchPos, event.touchRay);
      if (intersectionData != undefined) {
        // console.log("onMouseDown on Geom"); // + " Material:" + geomItem.getMaterial().name);
        // console.log(intersectionData.geomItem.getPath()); // + " Material:" + geomItem.getMaterial().name);
        event.intersectionData = intersectionData;
        intersectionData.geomItem.onMouseDown(event, intersectionData);
        if (!event.propagating) return;
        if (this.capturedElement) return;

        this.mouseDownOnGeom.emit(event);
        if (!event.propagating) return;
      }

      const downTime = Date.now();
      if (
        downTime - this.__prevDownTime <
        this.__doubleClickTimeMSParam.getValue()
      ) {
        if (this.__cameraManipulator) {
          this.__cameraManipulatorDragging = true;
          this.__cameraManipulator.onDoubleTap(event);
          return;
        }
        this.doubleTapped.emit(event);
        return;
      } else {
        this.__prevDownTime = downTime;
      }
    }

    if (this.__cameraManipulator) {
      this.__cameraManipulator.onTouchStart(event);
      return;
    }
    this.touchStart.emit(event);
  }

  /**
   * The onTouchMove method.
   * @param {any} event - The event param.
   */
  onTouchMove(event) {
    this.__prepareEvent(event);

    if (this.capturedElement) {
      event.touchPos = [];
      event.touchRay = [];
      for (let index = 0; index < event.touches.length; index++) {
        const touch = event.touches[index];
        const touchPos = this.__eventTouchPos(touch);
        event.touchPos[index] = touchPos;
        event.touchRay[index] = this.calcRayFromScreenPos(touchPos);
      }
      event.mousePos = event.touchPos[0];
      event.mouseRay = event.touchRay[0];
      this.capturedElement.onMouseMove(event);
      return;
    }

    if (this.__cameraManipulator) {
      this.__cameraManipulator.onTouchMove(event);
      return;
    }
    this.touchMove.emit(event);
  }

  /**
   * The onTouchEnd method.
   * @param {any} event - The event param.
   */
  onTouchEnd(event) {
    this.__prepareEvent(event);
    
    if (this.capturedElement) {
      this.capturedElement.onMouseUp(event);
      return;
    }

    if (this.__cameraManipulator) {
      this.__cameraManipulator.onTouchEnd(event);
      return;
    }
    this.touchEnd.emit(event);
  }

  /**
   * The onTouchCancel method.
   * @param {any} event - The event param.
   */
  onTouchCancel(event) {
    this.__prepareEvent(event);

    if (this.capturedElement) {
      this.capturedElement.onTouchCancel(event);
      return;
    }

    if (this.__cameraManipulator) {
      this.__cameraManipulator.onTouchCancel(event);
      return;
    }
    this.touchCancel.emit(event);
  }

  // //////////////////////////
  // Rendering

  /**
   * The __initRenderState method.
   * @param {any} renderstate - The renderstate param.
   * @private
   */
  __initRenderState(renderstate) {
    // console.log(this.__viewMat.toString())
    renderstate.viewXfo = this.__cameraXfo;
    renderstate.viewScale = 1.0;
    renderstate.region = this.region;
    renderstate.cameraMatrix = this.__cameraMat;
    renderstate.viewports = [{
      region: this.region,
      viewMatrix: this.__viewMat,
      projectionMatrix: this.__projectionMatrix,
      viewportFrustumSize: this.__frustumDim,
      isOrthographic: this.__camera.getIsOrthographic(),
      fovY: this.__camera.getFov()
    }];
  }

  /**
   * The draw method.
   */
  draw() {
    const gl = this.__renderer.gl;

    // Make sure th default fbo is bound
    // Note: sometimes an Fbo is left bound
    // from anohter op(like resizing, populating etc..)
    // We need to unbind here to ensure rendering is to the
    // right target.
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.viewport(...this.region);

    if(this.__backgroundColor)
      gl.clearColor(...this.__backgroundColor.asArray());
    gl.colorMask(true, true, true, true);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const renderstate = {};
    this.__initRenderState(renderstate);
    this.__renderer.drawScene(renderstate);

    // // Turn this on to debug the geom data buffer.
    // {
    //     gl.screenQuad.bindShader(renderstate);
    //     gl.screenQuad.draw(renderstate, this.__geomDataBuffer);
    // }
  }
}

export { GLViewport };
