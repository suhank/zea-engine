import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Vec2,
    Vec3,
    Ray,
    Color,
    Mat4
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    Plane,
    Camera
} from '../SceneTree';
import {
    BaseViewport
} from './BaseViewport.js';
import {
    GLFbo
} from './GLFbo.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
// import {
//     PostProcessing
// } from './Shaders/PostProcessing.js';
import {
    OutlinesShader
} from './Shaders/OutlinesShader.js';
import {
    GLMesh
} from './GLMesh.js';

import {
    CameraMouseAndKeyboard
} from '../SceneTree';

class GLViewport extends BaseViewport {
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
        this.__antialiase = false;

        // this.__mouseOverGizmo = undefined;
        this.__manipGizmo = undefined;
        this.__mouseDownPos = new Vec2();

        this.__geomDataBuffer = undefined;
        this.__geomDataBufferFbo = undefined;

        const gl = renderer.getGL();
        // this.__selectionRect = new GLSelectionRect(gl);
        // this.__overlayPass.addDrawItem(this.__selectionRect);

        // Signals to abstract the user view. 
        // i.e. when a user switches to VR mode, the signals 
        // simply emit the new VR data.
        this.viewChanged = new Signal();


        this.keyDown = new Signal();
        this.keyPressed = new Signal();
        this.keyUp = new Signal();
        this.mouseDown = new Signal();
        this.mouseMoved = new Signal();
        this.mouseUp = new Signal();
        this.mouseDownOnGeom = new Signal();
        this.mouseWheel = new Signal();

        this.touchStart = new Signal();
        this.touchMove = new Signal();
        this.touchEnd = new Signal();
        this.touchCancel = new Signal();

        this.renderGeomDataFbo = this.renderGeomDataFbo.bind(this);

        // this.__glshaderScreenPostProcess = new PostProcessing(gl);
        this.__outlineShader = new OutlinesShader(gl);
        this.__outlineColor = new Color("#03E3AC")
        this.quad = new GLMesh(gl, new Plane(1, 1));

        this.setCamera(new Camera('Default'));
        this.__cameraManipulator = new CameraMouseAndKeyboard();
        this.__cameraManipulatorDragging = false;

        this.resize(width, height);
        // this.createOffscreenFbo();

        this.createSelectedGeomsFbo();
    }

    getOutlineColor() {
        return this.__outlineColor
    }

    setOutlineColor(color) {
        this.__outlineColor = color;
    }

    resize(width, height) {
        super.resize(width, height);
        if (this.__camera)
            this.__updateProjectionMatrix();

        if (this.__geomDataBufferFbo) {
            this.__geomDataBuffer.resize(this.__width, this.__height);
            this.__geomDataBufferFbo.resize();
        }
        this.region = [this.__x, this.__y, this.__width, this.__height];
    }

    getCamera() {
        return this.__camera
    }

    setCamera(camera) {
        this.__camera = camera;
        this.__camera.viewMatChanged.connect(() => {
            this.updated.emit();
            this.viewChanged.emit({
                interfaceType: 'CameraAndPointer',
                viewXfo: this.__camera.getGlobalXfo()
            });
        });
        // this.__camera.clippingRangesChanged.connect(()=>{
        //     this.__updateProjectionMatrix();
        //     this.updated.emit();
        // });
        this.__camera.projectionParamChanged.connect(() => {
            this.__updateProjectionMatrix();
            this.updated.emit();
        });

        // The state machine can manipulate the camera and then signal the
        // end of a movement.
        this.__camera.movementFinished.connect(this.renderGeomDataFbo);

        this.__updateProjectionMatrix();
    }

    getManipulator(){
        return this.__cameraManipulator
    }

    setManipulator(manipulator) {
        this.__cameraManipulator = manipulator;
    }

    setGizmoPass(gizmoPass) {
        this.__gizmoPass = gizmoPass;
    }

    getCameraMatrix() {
        return this.__camera.getGlobalXfo().toMat4();
    }

    getViewMatrix() {
        return this.__camera.getViewMatrix();
    }

    getProjectionMatrix() {
        return this.__projectionMatrix;
    }

    __updateProjectionMatrix() {
        let aspect = this.__width / this.__height;
        this.__camera.updateProjectionMatrix(this.__projectionMatrix, aspect);

        let frustumH = (Math.tan(this.__camera.getFov() / 2.0) * this.__camera.getNear()) * 2.0;
        let frustumW = frustumH * aspect;
        this.__frustumDim.set(frustumW, frustumH);
    }

    setActive(state) {
        if (state)
            activeViewport = this;
        else
            activeViewport = undefined;
    }

    frameView(treeItems) {
        this.__camera.frameView(this, treeItems);
    }

    /// compute a ray into the scene based on a mouse coordinate
    calcRayFromScreenPos(screenPos) {

        // Convert the raster coordinates to screen space ([0,{w|h}] -> [-1,1]
        // - Note: The raster vertical is inverted wrt OGL screenspace Y

        let topy = (this.__canvasHeight * (1.0 - this.__tr.y));
        let sx = (screenPos.x - this.__x) / this.__width;
        let sy = (screenPos.y - topy) / this.__height;

        sx = (sx * 2.0) - 1.0;
        sy = (sy * 2.0) - 1.0;

        // Transform the origin from camera local to world space
        let cameraMat = this.getCameraMatrix();

        let projInv = this.__projectionMatrix.inverse();
        if (projInv == null) // Sometimes this happens, not sure why...
            return null;

        let rayStart, rayDirection;
        if (this.__camera.getIsOrthographic()) {
            // Orthographic projections.
            rayStart = cameraMat.transformVec3(projInv.transformVec3(new Vec3(sx, -sy, -1.0)));
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

    ////////////////////////////
    // GeomData

    createGeomDataFbo(floatGeomBuffer) {
        let gl = this.__renderer.gl;
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

    getGeomDataFbo() {
        return this.__geomDataBufferFbo;
    }

    __initRenderState(renderstate) {
        renderstate.viewXfo = this.__camera.getGlobalXfo();
        renderstate.viewMatrix = this.getViewMatrix();
        renderstate.cameraMatrix = renderstate.viewXfo.toMat4();
        renderstate.projectionMatrix = this.getProjectionMatrix();
        renderstate.isOrthographic = this.__camera.getIsOrthographic();
        // renderstate.camera = this.__camera; // Note: in VR, we have no camera.
        renderstate.viewportFrustumSize = this.__frustumDim;
        renderstate.fovY = this.__camera.getFov(),
        renderstate.viewScale = 1.0;
        renderstate.region = this.region;
        renderstate.eye = 0; // 0==Left, 1==Right;,
    }

    renderGeomDataFbo() {
        if (this.__geomDataBufferFbo) {
            this.__geomDataBufferFbo.bindAndClear();

            const renderstate = {
                drawCalls: 0,
                drawCount: 0,
                profileJSON: {},
                shaderopts: this.__renderer.getShaderPreproc()
            };
            this.__initRenderState(renderstate);
            this.__renderer.drawSceneGeomData(renderstate);
            // this.__gizmoPass.drawDataPass(renderstate);
        }
    }

    getGeomDataAtPos(screenPos) {
        if (this.__geomDataBufferFbo) {
            const gl = this.__renderer.gl;
            gl.finish();
            // Allocate a 1 pixel block.

            this.__geomDataBufferFbo.bindForReading();


            // const logGeomData = (geomId)=>{
            //     console.log("logGeomData " + geomId + ":[" + this.__geomDataBuffer.width +","+ this.__geomDataBuffer.height + "]")
            //     const pixels = new Float32Array(this.__geomDataBuffer.width * 4);
            //     for(let i=0; i<this.__geomDataBuffer.height; i++){
            //       gl.readPixels(0, i, this.__geomDataBuffer.width, 1, gl.RGBA, gl.FLOAT, pixels);
            //       console.log(pixels);
            //     }
            // }
            // logGeomData();

            let passId, geomData;
            if (gl.floatGeomBuffer) {
                geomData = new Float32Array(4);
                gl.readPixels(screenPos.x, (this.__height - screenPos.y), 1, 1, gl.RGBA, gl.FLOAT, geomData);
                if (geomData[3] == 0)
                    return undefined;
                passId = Math.round(geomData[0]);
            } else {
                geomData = new Uint8Array(4);
                gl.readPixels(screenPos.x, (this.__height - screenPos.y), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, geomData);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                if (geomData[0] == 0 && geomData[1] == 0)
                    return undefined;
                passId = 0;
            }
            this.__geomDataBufferFbo.unbind();
            const geomItemAndDist = this.__renderer.getPass(passId).getGeomItemAndDist(geomData);

            if (geomItemAndDist) {
                const mouseRay = this.calcRayFromScreenPos(screenPos);
                const intersectionPos = mouseRay.start.add(mouseRay.dir.scale(geomItemAndDist.dist));
                return {
                    screenPos,
                    mouseRay: mouseRay,
                    intersectionPos,
                    geomItem: geomItemAndDist.geomItem,
                    dist: geomItemAndDist.dist
                };
            }
        }
    }

    getGeomItemsInRect(tl, br) {
        if (this.__geomDataBufferFbo) {
            let gl = this.__renderer.gl;
            gl.finish();
            // Allocate a pixel block.
            let rectBottom = Math.round(this.__height - br.y);
            let rectLeft = Math.round(tl.x);
            let rectWidth = Math.round(br.x - tl.x);
            let rectHeight = Math.round(br.y - tl.y);
            let numPixels = rectWidth * rectHeight;

            this.__geomDataBufferFbo.bindForReading();

            let geomDatas;
            if (gl.floatGeomBuffer) {
                geomDatas = new Float32Array(4 * numPixels);
                gl.readPixels(rectLeft, rectBottom, rectWidth, rectHeight, gl.RGBA, gl.FLOAT, geomDatas);
            } else {
                geomDatas = new Uint8Array(4 * numPixels);
                gl.readPixels(rectLeft, rectBottom, rectWidth, rectHeight, gl.RGBA, gl.UNSIGNED_BYTE, geomDatas);
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            let geomItems = new Set();
            for (let i = 0; i < numPixels; i++) {

                let passId;
                const geomData = geomDatas.subarray(i*4, (i+1)*4);
                if (gl.floatGeomBuffer) {
                    passId = Math.round(geomData[0]);
                } else {
                    passId = 0;
                }

                const geomItemAndDist = this.__renderer.getPass(passId).getGeomItemAndDist(geomData);
                if (geomItemAndDist) {
                    geomItems.add(geomItemAndDist.geomItem);
                }
            }
            return geomItems;
        }
    }

    /////////////////////////////
    // Events

    __eventMousePos(event) {
        return new Vec2(
            event.rendererX - this.getPosX(),
            event.rendererY - this.getPosY()
        );
    }

    onMouseDown(event) {

        this.__mouseDownPos = this.__eventMousePos(event);
        this.__mouseDownGeom = undefined;

        if (event.button == 0) {
            const intersectionData = this.getGeomDataAtPos(this.__mouseDownPos);
            if (intersectionData != undefined) {
                // console.log("onMouseDown on Geom"); // + " Material:" + geomItem.getMaterial().name);
                // console.log(intersectionData.geomItem.getPath()); // + " Material:" + geomItem.getMaterial().name);
                this.__mouseDownGeom = intersectionData.geomItem;
                this.__mouseDownGeom.onMouseDown(event, intersectionData);
                if(event.vleStopPropagation == true)
                    return;

                this.mouseDownOnGeom.emit(event, this.__mouseDownGeom, intersectionData);
                if(event.vleStopPropagation == true)
                    return;
            }

            if (this.__cameraManipulator) {
                this.__cameraManipulatorDragging = true;
                this.__cameraManipulator.onDragStart(event, this.__mouseDownPos, this);
                return;
            }
        }

        this.mouseDown.emit(event, this.__mouseDownPos, this);

        return false;
    }

    onMouseUp(event) {
        const mouseUpPos = this.__eventMousePos(event);

        if (this.__cameraManipulator && this.__cameraManipulatorDragging) {
            this.__cameraManipulator.onDragEnd(event, mouseUpPos, this);
            this.__cameraManipulatorDragging = false;
            return;
        }

        this.mouseUp.emit(event, mouseUpPos, this);

        return false;
    }

    onMouseMove(event) {

        // Note: for some reason, I started getting mouse moves events, even when making a single click.
        if (event.movementX == 0 && event.movementX == 0)
            return false;

        const mousePos = this.__eventMousePos(event);

        if (this.__cameraManipulator && this.__cameraManipulatorDragging){
            this.__cameraManipulator.onDrag(event, mousePos, this);
            return;
        }

        this.mouseMoved.emit(event, mousePos, this);

        return false;
    }

    onKeyPressed(key, event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onKeyPressed(key, event, this);
            return;
        }
        this.keyPressed.emit(key, event, this);
        return false;
    }
    onKeyDown(key, event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onKeyDown(key, event, this);
            return;
        }
        this.keyDown.emit(key, event, this);
    }

    onKeyUp(key, event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onKeyUp(key, event, this);
            return;
        }
        this.keyUp.emit(key, event, this);
    }

    onWheel(event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onWheel(event, this);
            return;
        }
        this.mouseWheel.emit(event, this);
    }

    // Touch events
    onTouchStart(event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onTouchStart(event, this);
            return;
        }
        this.touchStart.emit(event, this);
    }

    onTouchMove(event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onTouchMove(event, this);
            return;
        }
        this.touchMove.emit(event, this);
    }

    onTouchEnd(event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onTouchEnd(event, this);
            return;
        }
        this.touchEnd.emit(event, this);
    }

    onTouchCancel(event) {
        if (this.__cameraManipulator){
            this.__cameraManipulator.onTouchCancel(event, this);
            return;
        }
        this.touchCancel.emit(event, this);
    }


    ////////////////////////////
    // Rendering
    draw(renderstate) {
        this.bindAndClear(renderstate);

        this.__initRenderState(renderstate);

        if (this.__backgroundTexture && this.__backgroundTexture.isLoaded()) {
            this.drawBackground(renderstate);
        }

        this.__renderer.drawScene(renderstate, false);
        // To see the Geom data uncomment this line.
        // this.__renderer.drawSceneGeomData(renderstate);

        if (this.__selectedGeomsBufferFbo) {
            this.__selectedGeomsBufferFbo.bindAndClear();
            this.__renderer.drawSceneSelectedGeoms(renderstate);
            const gl = this.__renderer.getGL();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(...this.region);

            this.__outlineShader.bind(renderstate);
            const unifs = renderstate.unifs;
            this.__selectedGeomsBuffer.bindToUniform(renderstate, unifs.selectionDataTexture);
            gl.uniform2f(unifs.selectionDataTextureSize.location, this.region[2], this.region[3]);
            gl.uniform4fv(unifs.outlineColor.location, this.__outlineColor.asArray());
            this.quad.bindAndDraw(renderstate);
        }
        
        // /////////////////////////////////////
        // // Post processing.
        // if (this.__fbo) {
        //     const gl = this.__renderer.getGL();

        //     // Bind the default framebuffer
        //     gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //     gl.viewport(...this.region);
        //     // gl.disable(gl.SCISSOR_TEST);

        //     // this.__glshaderScreenPostProcess.bind(renderstate);

        //     // const unifs = renderstate.unifs;
        //     // if ('antialiase' in unifs)
        //     //     gl.uniform1i(unifs.antialiase.location, this.__antialiase ? 1 : 0);
        //     // if ('textureSize' in unifs)
        //     //     gl.uniform2fv(unifs.textureSize.location, fbo.size);
        //     // if ('gamma' in unifs)
        //     //     gl.uniform1f(unifs.gamma.location, this.__gamma);
        //     // if ('exposure' in unifs)
        //     //     gl.uniform1f(unifs.exposure.location, this.__exposure);
        //     // if ('tonemap' in unifs)
        //     //     gl.uniform1i(unifs.tonemap.location, this.__tonemap ? 1 : 0);

        //     gl.screenQuad.bindShader(renderstate);
        //     gl.screenQuad.draw(renderstate, this.__fbo.colorTexture);


        //     // Note: if the texture is left bound, and no textures are bound to slot 0 befor rendering
        //     // more goem int he next frame then the fbo color tex is being read from and written to 
        //     // at the same time. (baaaad).
        //     // Note: any textures bound at all avoids this issue, and it only comes up when we have no env
        //     // map, background or textures params in the scene. When it does happen it can be a bitch to 
        //     // track down.
        //     gl.bindTexture(gl.TEXTURE_2D, null);
        // }
    }

    // After post-processing, the overlays are rendered.
    drawOverlays(renderstate) {
        this.__overlayPass.draw(renderstate);
    }
};

export {
    GLViewport
};