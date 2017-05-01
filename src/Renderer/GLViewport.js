import {
    Vec2,
    Vec3,
    Ray,
    Mat4,
    Color,
    Signal
} from '../Math';
import {
    Camera,
    MarkerpenTool
} from '../SceneTree';
import {
    GLFbo
} from './GLFbo.js';
import {
    GL2DOverlayPass
} from './Passes/GL2DOverlayPass.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLSelectionRect
} from './Drawables/GLSelectionRect.js';


class GLViewport {
    constructor(renderer, name, width, height) {
        this.__renderer = renderer;
        this.__name = name;
        this.__bgColor = new Color(0.4, 0.4, 0.4);
        this.__projectionMatrix = new Mat4();
        this.__frustumDim = new Vec2();

        // Layout coords, x:[0..1], y:[0..1]
        this.__bl = new Vec2(0, 0);
        this.__tr = new Vec2(1, 1);

        this.__manipMode = 'highlighting';
        this.__mouseOverGizmo = undefined;
        this.__manipGizmo = undefined;
        this.__mouseDownPos = new Vec2();
        this.__ongoingTouches = {};

        this.__geomDataBuffer = undefined;
        this.__geomDataBufferFbo = undefined;
        this.__geomDataBufferFboRezScale = 1.0;

        // this.__selectionRect = new GLSelectionRect(this.__renderer.gl);
        // this.__overlayPass = new GL2DOverlayPass(this.__renderer.gl);
        // this.__overlayPass.addDrawItem(this.__selectionRect);

        this.updated = new Signal();
        this.resized = new Signal();
        this.keyPressed = new Signal();
        this.mouseMoved = new Signal();

        // Signals to abstract the user view. 
        // i.e. when a user switches to VR mode, the signals 
        // simply emit the new VR data.
        this.viewChanged = new Signal();
        this.pointerMoved = new Signal();

        // Stroke Signals
        this.actionStarted = new Signal();
        this.actionEnded = new Signal();
        this.actionOccuring = new Signal();


        this.__markerPenColor = new Color(1, 0, 0);
        // this.__markerPen = new MarkerpenTool();
        // this.__markerPen.strokeStarted.connect((data) => {
        //     this.actionStarted.emit(data);
        // }, this);
        // this.__markerPen.strokeEnded.connect((data) => {
        //     this.actionEnded.emit(data);
        // }, this);
        // this.__markerPen.strokeSegmentAdded.connect((data) => {
        //     this.actionOccuring.emit(data);
        // }, this);
        // this.__renderer.getCollector().addTreeItem(this.__markerPen.getTreeItem());

        this.setCamera(new Camera('Default'));

        this.resize(width, height);
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
            this.__fwBuffer.resize(this.__width, this.__height);
            this.__fbo.resize();
        }
        if (this.__geomDataBufferFbo) {
            let scl = this.__geomDataBufferFboRezScale;
            this.__geomDataBuffer.resize(this.__width * scl, this.__height * scl);
            this.__geomDataBufferFbo.resize();
        }

        this.resized.emit();
    }

    getBackgroundColor() {
        return this.__bgColor;
    }

    setBackgroundColor(color) {
        this.__bgColor = color;
        this.updated.emit();
    }

    getCamera() {
        return this.__camera
    }

    setCamera(camera) {
        this.__camera = camera;
        this.__camera.viewMatChanged.connect(function(globalXfo) {
            this.updated.emit();
            this.viewChanged.emit({
                interfaceType: 'MouseAndKeyboard',
                viewXfo: globalXfo
            });
        }, this);
        this.__camera.clippingRangesChanged.connect(function() {
            this.__updateProjectionMatrix();
            this.updated.emit();
        }, this);

        this.__updateProjectionMatrix();
    }

    setGizmoPass(gizmoPass) {
        this.__gizmoPass = gizmoPass;
    }

    getCameraMatrix() {
        return this.__camera.globalXfo.toMat4();
    }

    getViewMatrix() {
        return this.__camera.viewMatrix;
    }

    getProjectionMatrix() {
        return this.__projectionMatrix;
    }

    __updateProjectionMatrix() {
        let aspect = this.__width / this.__height;
        this.__camera.updateProjectionMatrix(this.__projectionMatrix, aspect);

        let frustumH = (Math.tan(this.__camera.fov / 2.0) * this.__camera.near) * 2.0;
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
        // this.renderGeomDataFbo();
    }

    /// compute a ray into the scene based on a mouse coordinate
    calcRayFromScreenPos(screenPos) {
        // Convert the raster coordinates to screen space ([0,{w|h}] -> [-1,1]
        // - Note: The raster vertical is inverted wrt OGL screenspace Y
        let sx = screenPos.x / this.__width;
        let sy = screenPos.y / this.__height;

        sx = (sx * 2.0) - 1.0;
        sy = (sy * 2.0) - 1.0;

        // Transform the origin from camera local to world space
        let cameraMat = this.getCameraMatrix();

        let projInv = this.__projectionMatrix.inverse();
        let rayStart, rayDirection;
        if (!this.__camera.isOrthographic) {
            rayStart = cameraMat.translation;
            // Get the projected window coordinate on the near plane
            // See http://www.songho.ca/opengl/gl_projectionmatrix.html
            // for details.
            rayDirection = projInv.transformVec3(new Vec3(sx, -sy, -1.0));
        } else {
            // Orthographic projections.
            rayStart = cameraMat.transformVec3(projInv.transformVec3(new Vec3(sx, -sy, -1.0)));
            rayDirection = new Vec3(0.0, 0.0, -1.0);
        }
        // And from projection space to camera local.
        // - We nuke the translation part since we're transforming a vector.
        rayDirection = cameraMat.rotateVec3(rayDirection).normalize();
        return new Ray(rayStart, rayDirection);
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
        this.__fbo.setClearColor(this.__bgColor.asArray());
    }

    createGeomDataFbo() {
        let gl = this.__renderer.gl;
        let scl = this.__geomDataBufferFboRezScale;
        this.__geomDataBuffer = new GLTexture2D(gl, {
            format: 'FLOAT',
            channels: 'RGBA',
            width: this.__width <= 1 ? 1 : this.__width * scl,
            height: this.__height <= 1 ? 1 : this.__height * scl,
        });
        this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true);
        this.__geomDataBufferFbo.setClearColor([0, 0, 0, 0]);
        this.__geomDataPass = undefined;
    }

    setGeomDataPass(geomDataPass) {
        this.__geomDataPass = geomDataPass;
    }

    getGeomDataFbo() {
        return this.__geomDataBufferFbo;
    }

    renderGeomDataFbo() {
        if (this.__geomDataBufferFbo) {
            this.__geomDataBufferFbo.bindAndClear();

            let renderstate = {
                viewport: this,
                viewMatrix: this.getViewMatrix(),
                cameraMatrix: this.getCameraMatrix(),
                projectionMatrix: this.getProjectionMatrix(),
                isOrthographic: this.__camera.isOrthographic,
                fovY: this.__camera.fov,
                viewportFrustumSize: this.__frustumDim,
                drawCalls: 0,
                drawCount: 0,
                profileJSON: {}
            };

            let gl = this.__renderer.gl;
            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.depthMask(true);

            this.__geomDataPass.draw(renderstate);
            // this.__gizmoPass.drawDataPass(renderstate);
        }
    }

    getGeomDataAtPos(screenPos) {
        if (this.__geomDataBufferFbo) {
            let gl = this.__renderer.gl;
            gl.finish();
            // Allocate a 1 pixel block.
            let pixels = new Float32Array(4);

            let scl = this.__geomDataBufferFboRezScale;
            this.__geomDataBufferFbo.bind();
            gl.readPixels(screenPos.x * scl, (this.__height - screenPos.y) * scl, 1, 1, gl.RGBA, gl.FLOAT, pixels);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            // if (pixels[0] == 0)
            //     return undefined;
            return {
                'id': Math.round(pixels[0]),
                'data1': pixels[1],
                'data2': pixels[2],
                'data3': pixels[3]
            };
        }
    }

    getGeomItemsInRect(tl, br) {
        if (this.__geomDataBufferFbo) {
            let gl = this.__renderer.gl;
            gl.finish();
            // Allocate a pixel block.
            let scl = this.__geomDataBufferFboRezScale;
            let rectBottom = (this.__height - br.y) * scl;
            let rectLeft = tl.x * scl;
            let rectWidth = (br.x - tl.x) * scl;
            let rectHeight = (br.y - tl.y) * scl;
            let numPixels = rectWidth * rectHeight;
            let pixels = new Uint8Array(4 * numPixels);

            this.__geomDataBufferFbo.bind();
            gl.readPixels(rectLeft, rectBottom, rectWidth, rectHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            let drawItems = new Set();
            for (let i = 0; i < numPixels; i++) {
                let pid = i * 4;
                if (pixels[pid + 0] !== 1) // Only keep Geoms. (filter out Gizmos)
                    continue;
                // Merge the 2 last 8bit values to make a 16bit integer index value
                let id = (pixels[pid + 1] * 256) + pixels[pid + 2];
                let drawItem = this.__renderer.getDrawItem(id);
                drawItems.add(drawItem);
            }
            return drawItems;
        }
    }

    /////////////////////////////
    // Events


    __eventMousePos(event){
        return new Vec2(
            (event.offsetX * window.devicePixelRatio) - this.getPosX(), 
            (event.offsetY * window.devicePixelRatio) - this.getPosY()
            );
    }

    onMouseDown(event) {

        this.__mouseDownPos = this.__eventMousePos(event);

        if (event.button == 0) {
            if (event.shiftKey) {
                this.__manipMode = 'marker-tool';
                let ray = this.calcRayFromScreenPos(this.__mouseDownPos);
                let xfo = this.__camera.globalXfo.clone();
                xfo.tr = ray.pointAtDist(this.__camera.focalDistance);
                let thickness = this.__camera.focalDistance * 0.002;
                // this.__markerLineId = this.__markerPen.startStroke(xfo, this.__markerPenColor, thickness);

                this.__currStrokeID++;
                this.actionStarted.emit({
                    type: 'strokeStarted',
                    data: {
                        xfo: xfo,
                        color:  this.__markerPenColor,
                        thickness: thickness
                    }
                });

            } else {
                let geomData = this.getGeomDataAtPos(this.__mouseDownPos);
                if (geomData != undefined) {
                    let drawItem = this.__renderer.getCollector().getDrawItem(geomData.id);
                    if (drawItem) {
                        // Check to see if we mouse-downed on a gizmo.
                        // If so, start a gizmo manipulation
                        let geomItem = drawItem.getGeomItem();
                        console.log(geomItem.name + " Material:" + geomItem.material.name);
                        // if(isGizmo)
                        //     //this.__manipMode = 'gizmo-manipulation'drawItem.getGeomItem();
                        //     //this.__manipGizmo = this.__gizmoPass.getGizmo(geomData.id);
                        //     //this.__manipGizmo.onDragStart(event, this.__mouseDownPos, this);
                        // }
                    }
                }

                // Default to camera manipulation
                this.__manipMode = 'camera-manipulation';
                this.__camera.onDragStart(event, this.__mouseDownPos, this);
            }
        }/* else if (event.button == 2) {
            if (event.shiftKey) {
                if (this.__geomDataPass) {
                    this.__manipMode = 'add-selection';
                }
            } else if (event.ctrlKey) {
                if (this.__geomDataPass) {
                    this.__manipMode = 'remove-selection';
                }
            } else {
                this.__manipMode = 'new-selection';
            }
        }
        */
        return false;
    }

    onMouseUp(event) {
        let mouseUpPos = this.__eventMousePos(event);
        switch (this.__manipMode) {
            case 'highlighting':
                break;
            case 'camera-manipulation':
                this.__camera.onDragEnd(event, mouseUpPos, this);
                this.renderGeomDataFbo();
                break;
            case 'gizmo-manipulation':
                this.__manipGizmo.onDragEnd(event, mouseUpPos, this);
                this.__manipGizmo = undefined;
                this.renderGeomDataFbo();
                break;
            case 'new-selection':
                this.__renderer.getScene().getSelectionManager().clearSelection();
            case 'add-selection':
                this.__renderer.suspendDrawing();
                let geomData = this.getGeomDataAtPos(mouseUpPos);
                if (geomData != undefined && geomData.flags == 1) {
                    let drawItem = this.__renderer.getDrawItem(geomData.id);
                    if (drawItem) {
                        let selectionManager = this.__renderer.getScene().getSelectionManager();
                        if (event.ctrlKey)
                            selectionManager.deselectGeom(drawItem.geomItem);
                        else
                            selectionManager.selectGeom(drawItem.geomItem, !event.shiftKey);
                    }
                }
                this.__renderer.resumeDrawing();
                break;
            case 'new-selection-rect':
            case 'add-selection-rect':
            case 'remove-selection-rect':
                // Rectangular selection. 
                this.__renderer.suspendDrawing();
                this.__selectionRect.setVisible(false);
                let tl = new Vec2(Math.min(this.__mouseDownPos.x, mouseUpPos.x), Math.min(this.__mouseDownPos.y, mouseUpPos.y));
                let br = new Vec2(Math.max(this.__mouseDownPos.x, mouseUpPos.x), Math.max(this.__mouseDownPos.y, mouseUpPos.y));
                let drawItems = this.getGeomItemsInRect(tl, br);
                if (drawItems.size > 0) {
                    let selectedItems = new Set();
                    for (let drawItem of drawItems) {
                        selectedItems.add(drawItem.geomItem);
                    }
                    let selectionManager = this.__renderer.getScene().getSelectionManager();
                    if (this.__manipMode == 'new-selection-rect')
                        selectionManager.selectGeoms(selectedItems, true);
                    else if (this.__manipMode == 'add-selection-rect')
                        selectionManager.selectGeoms(selectedItems, false);
                    else
                        selectionManager.deselectGeoms(selectedItems);
                } else {
                    if (this.__manipMode == 'new-selection-rect')
                        this.__renderer.getScene().getSelectionManager().clearSelection();
                }
                // Not
                this.__renderer.resumeDrawing();
                break;
            case 'marker-tool':
                // this.__markerPen.endStroke(this.__markerLineId);
                this.actionEnded.emit({
                    type: 'strokeEnded'
                });
                break;
        }
        this.__manipMode = 'highlighting';
        return false;
    }

    onMouseMove(event) {

        // Note: for some reason, I started getting mouse moves events, even when making a single click.
        let filterRedundantDrags = () => {
            return (event.movementX == 0 && event.movementX == 0);
        }
        let updateSelectionRect = function() {
            // Update the rect.
            let mousePos = this.__eventMousePos(event);
            let tl = new Vec2(Math.min(this.__mouseDownPos.x, mousePos.x), Math.min(this.__mouseDownPos.y, mousePos.y));
            let br = new Vec2(Math.max(this.__mouseDownPos.x, mousePos.x), Math.max(this.__mouseDownPos.y, mousePos.y));
            let rectWidth = (br.x - tl.x);
            let rectHeight = (br.y - tl.y);
            if (rectWidth == 0 || rectHeight == 0)
                return;

            let xfo = this.__selectionRect.globalXfo;
            xfo.sc.x = (rectWidth / this.__width) * 2.0;
            xfo.sc.y = (rectHeight / this.__height) * 2.0;
            xfo.tr.x = (tl.x / this.__width) + (xfo.sc.x * 0.25);
            xfo.tr.y = (tl.y / this.__height) + (xfo.sc.y * 0.25);
            this.__selectionRect.globalXfoChanged.emit();

            this.__renderer.requestRedraw();
            // Highlite the geoms.
        }

        let getGizmoUnderMouse = function() {
            let geomData = this.getGeomDataAtPos(mousePos);
            if (geomData != undefined && geomData.flags == 2) {
                let gizmo = this.__gizmoPass.getGizmo(geomData.id);
                if (this.__mouseOverGizmo && this.__mouseOverGizmo != gizmo) {
                    this.__mouseOverGizmo.unhighlight();
                    this.__mouseOverGizmo = undefined;
                }
                if (gizmo && this.__mouseOverGizmo != gizmo) {
                    this.__mouseOverGizmo = gizmo;
                    this.__mouseOverGizmo.highlight();
                }
                this.__renderer.requestRedraw();
            } else {
                if (this.__mouseOverGizmo) {
                    this.__mouseOverGizmo.unhighlight();
                    this.__mouseOverGizmo = undefined;
                    this.__renderer.requestRedraw();
                }
            }
        }

        if (filterRedundantDrags())
            return false;

        switch (this.__manipMode) {
            case 'highlighting':
                {
                    // if (this.__geomDataPass)
                    //     getGeomUnderMouse.call(this);
                    if (this.__gizmoPass)
                        getGizmoUnderMouse.call(this);

                    let mousePos = this.__eventMousePos(event);
                    let ray = this.calcRayFromScreenPos(mousePos);
                    this.mouseMoved.emit(event, mousePos, ray);
                }
                break;
            case 'gizmo-manipulation':
                {
                    let mousePos = this.__eventMousePos(event);
                    this.__manipGizmo.onDrag(event, mousePos, this);
                    this.__renderer.draw();
                    break;
                }
            case 'camera-manipulation':
                {
                    let mousePos = this.__eventMousePos(event);
                    this.__camera.onDrag(event, mousePos, this);
                    break;
                }
            case 'new-selection':
                this.__manipMode = 'new-selection-rect';
                this.__selectionRect.setVisible(true);
            case 'new-selection-rect':
                updateSelectionRect.call(this);
                break;
            case 'add-selection':
                this.__manipMode = 'add-selection-rect';
                this.__selectionRect.setVisible(true);
            case 'add-selection-rect':
                updateSelectionRect.call(this);
                break;
            case 'remove-selection':
                this.__manipMode = 'remove-selection-rect';
                this.__selectionRect.setVisible(true);
            case 'remove-selection-rect':
                updateSelectionRect.call(this);
                break;
            case 'marker-tool':
                {
                    let ray = this.calcRayFromScreenPos(this.__eventMousePos(event));
                    let xfo = this.__camera.globalXfo.clone();
                    xfo.tr = ray.pointAtDist(this.__camera.focalDistance);
                    // this.__markerPen.addSegmentToStroke(this.__markerLineId, xfo);
                    this.actionOccuring.emit({
                        type: 'strokeSegmentAdded',
                        data: {
                          id: this.__currStrokeID,
                          xfo: xfo
                        }
                    });
                }
                break;
        }

        return false;
    }

    mouseClick(event) {
        // click action
    }

    onKeyPressed(key) {
        if (this.__camera.onKeyPressed(key))
            return true;
        switch (key) {
            case 'f':
                let selection = this.__renderer.getScene().getSelectionManager().selection;
                if (selection.size == 0)
                    this.__camera.frameView(this, [this.__renderer.getScene().getRoot()]);
                else
                    this.__camera.frameView(this, selection);
                return true;
        }
        return false;
    }
    onKeyDown(key) {
        if (this.__camera.onKeyDown(key))
            return true;
        return false;
    }

    onKeyUp(key) {
        if (this.__camera.onKeyUp(key))
            return true;
        return false;
    }

    onWheel(event) {
        this.__camera.onWheel(event);
        this.renderGeomDataFbo();
    }

    __startTouch(touch) {
        this.__ongoingTouches[touch.identifier] = {
            identifier: touch.identifier,
            pos: new Vec2(touch.pageX, touch.pageY)
        };
    }
    __endTouch(touch) {
        // let idx = this.__ongoingTouchIndexById(touch.identifier);
        // this.__ongoingTouches.splice(idx, 1); // remove it; we're done
        delete this.__ongoingTouches[touch.identifier];
    }

    // Touch events
    onTouchStart(event) {
        // console.log("onTouchStart");
        event.preventDefault();
        event.stopPropagation();

        if(Object.keys(this.__ongoingTouches).length == 0)
            this.__manipMode = undefined;

        let touches = event.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            this.__startTouch(touches[i]);
        }
        this.__camera.initDrag();
    }

    onTouchMove(event) {
        event.preventDefault();
        event.stopPropagation();
        // console.log("this.__manipMode:" + this.__manipMode);
            
        let touches = event.changedTouches;
        if (touches.length == 1 && this.__manipMode != "panAndZoom") {
            let touch = touches[0];
            let touchPos = new Vec2(touch.pageX, touch.pageY);
            let touchData = this.__ongoingTouches[touch.identifier];
            let dragVec = touchData.pos.subtract(touchPos);
            this.__camera.orbit(dragVec, this);
        } else if (touches.length == 2) {
            let touch0 = touches[0];
            let touchData0 = this.__ongoingTouches[touch0.identifier];
            let touch1 = touches[1];
            let touchData1 = this.__ongoingTouches[touch1.identifier];

            let touch0Pos = new Vec2(touch0.pageX, touch0.pageY);
            let touch1Pos = new Vec2(touch1.pageX, touch1.pageY);
            let startSeparation = touchData1.pos.subtract(touchData0.pos).length();
            let dragSeparation = touch1Pos.subtract(touch0Pos).length();
            let separationDist = startSeparation - dragSeparation;

            let touch0Drag = touch0Pos.subtract(touchData0.pos);
            let touch1Drag = touch1Pos.subtract(touchData1.pos);
            let dragVec = touch0Drag.add(touch1Drag);
            // TODO: scale panning here.
            dragVec.scaleInPlace(0.5);
            this.__camera.panAndZoom(dragVec, separationDist * 0.002, this);
            this.__manipMode = "panAndZoom";
        }
    }

    onTouchEnd(event) {
        event.preventDefault();
        event.stopPropagation();
        let touches = event.changedTouches;
        // switch (this.__manipMode) {
        // case 'camera-manipulation':
        //     let touch = touches[0];
        //     let releasePos = new Vec2(touch.pageX, touch.pageY);
        //     this.__camera.onDragEnd(event, releasePos, this);
        //     break;
        // }
        for (let i = 0; i < touches.length; i++) {
            this.__endTouch(touches[i]);
        }
    }
    onTouchCancel(event) {
        event.preventDefault();
        console.log("touchcancel.");
        let touches = event.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            this.__endTouch(touches[i]);
        }
    }


    ////////////////////////////
    // Rendering

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
            gl.clearColor(...this.__bgColor.asArray());
            gl.colorMask(true, true, true, true);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
    }

    draw(renderstate) {
        this.bindAndClear(renderstate);

        renderstate.viewport = this;
        renderstate.viewMatrix = this.getViewMatrix();
        renderstate.cameraMatrix = this.getCameraMatrix();
        renderstate.projectionMatrix = this.getProjectionMatrix();
        renderstate.isOrthographic = this.__camera.isOrthographic;
        renderstate.fovY = this.__camera.fov;
        renderstate.nearDist = this.__camera.near;
        renderstate.farDist = this.__camera.far;
        renderstate.viewportFrustumSize = this.__frustumDim;
        renderstate.viewScale = 1.0;

        this.__renderer.drawScene(renderstate, false);
    }

    // After post-processing, the overlays are rendered.
    drawOverlays(renderstate) {
        this.__overlayPass.draw(renderstate);
    }
};

export {
    GLViewport
};