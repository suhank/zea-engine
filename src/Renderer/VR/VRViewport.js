import {
    isMobileDevice,
    Vec2,
    Vec3,
    Quat,
    Mat4,
    Xfo,
    Color,
    Signal
} from '../../Math';
import {
    TreeItem
} from '../../SceneTree';
import {
    GLFbo
} from '../GLFbo.js';
import {
    GLTexture2D
} from '../GLTexture2D.js';
import {
    VRHead
} from './VRHead.js'
import {
    VRController
} from './VRController.js'
import {
    VRToolMoveStage,
    VRToolHoldObjects,
    VRMarkerpenTool,
    VRFlyTool
} from './Tools'


class VRViewport {
    constructor(renderer, vrDisplay /*, width, height*/ ) {
        this.__renderer = renderer;
        this.__vrDisplay = vrDisplay;
        this.__bgColor = renderer.getViewport().getBackgroundColor();
        this.__frameData = new VRFrameData();

        this.__stageTreeItem = new TreeItem('VRStage');
        this.__stageTreeItem.setVisible(false);
        this.__projectionMatriciesUpdated = false;

        this.__canvasSizeScale = new Vec2(1, 1);
        this.__frustumDim = new Vec2(1, 1);

        this.__far = 1024.0;
        this.__near = 0.1;
        this.__vrDisplay.depthNear = this.__near;
        this.__vrDisplay.depthFar = this.__far;

        this.__stageXfo = new Xfo();
        // this.__standingMatrix = new Mat4();
        this.__stageMatrix = new Mat4();
        this.setXfo(new Xfo()); // Reset the stage Xfo.

        this.__leftViewMatrix = new Mat4();
        this.__leftProjectionMatrix = new Mat4();
        this.__rightViewMatrix = new Mat4();
        this.__rightProjectionMatrix = new Mat4();

        // Construct the head geom and add it directly to the Gizmo pass.
        this.__vrhead = new VRHead(this.__renderer.gl, this.__stageTreeItem);
        this.__renderer.getCollector().addTreeItem(this.__stageTreeItem);

        this.__vrControllers = [];
        this.__vrTools = {};
        this.__currentTool = undefined;

        if (this.__vrDisplay.stageParameters &&
            this.__vrDisplay.stageParameters.sizeX > 0 &&
            this.__vrDisplay.stageParameters.sizeZ > 0) {} else {
            if (this.__vrDisplay.stageParameters) {
                console.warn("VRDisplay reported stageParameters, but stage size was 0. Using default size.");
            } else {
                console.warn("VRDisplay did not report stageParameters");
            }
        }

        this.__vrPresentButton = document.createElement('button');
        this.__vrPresentButton.style.position = 'fixed';
        this.__vrPresentButton.style.right = '20px';
        this.__vrPresentButton.style.bottom = '20px';
        this.__vrPresentButton.style.padding = '20px';
        this.__vrPresentButton.innerText = 'Enter VR';
        renderer.getDiv().appendChild(this.__vrPresentButton);

        let _this = this;
        this.__vrPresentButton.addEventListener('click', function() {
            _this.togglePresenting();
        });

        let vrViewport = this;

        function vrdisplaypresentchange() {
            vrViewport.__onVRPresentChange();
        }

        function vrdisplayactivate() {
            vrViewport.startPresenting();
        }

        function vrdisplaydeactivate() {
            vrViewport.stopPresenting();
        }
        window.addEventListener('vrdisplaypresentchange', vrdisplaypresentchange, false);
        window.addEventListener('vrdisplayactivate', vrdisplayactivate, false);
        window.addEventListener('vrdisplaydeactivate', vrdisplaydeactivate, false);

        this.updated = new Signal();
        this.resized = new Signal();

        // Signals to abstract the user view. 
        // i.e. when a user switches to VR mode, the signals 
        // simply emit the new VR data.
        this.viewChanged = new Signal();
        this.pointerMoved = new Signal();

        // Stroke Signals
        this.actionStarted = new Signal();
        this.actionEnded = new Signal();
        this.actionOccuring = new Signal();

        this.controllerAdded = new Signal();


        if (isMobileDevice()) {
            this.__vrTools['FlyTool'] = new VRFlyTool(this, this.__vrhead, this.__vrControllers);

            this.activateTool('FlyTool');
        } else {
            this.__vrTools['VRToolMoveStage'] = new VRToolMoveStage(this, this.__vrhead, this.__vrControllers);
            this.__vrTools['VRToolHoldObjects'] = new VRToolHoldObjects(this, this.__vrhead, this.__vrControllers);
            this.__vrTools['Markerpen'] = new VRMarkerpenTool(this, this.__vrhead, this.__vrControllers);

            let markerpenTool = this.__vrTools['Markerpen'];
            markerpenTool.strokeStarted.connect((data) => {
                this.actionStarted.emit(data);
            }, this);
            markerpenTool.strokeEnded.connect((data) => {
                this.actionEnded.emit(data);
            }, this);
            markerpenTool.strokeSegmentAdded.connect((data) => {
                this.actionOccuring.emit(data);
            }, this);

            this.activateTool('VRToolMoveStage');
            //this.activateTool('VRToolHoldObjects');
        }

        // Start the update loop that then drives the VRHead + VRController transforms in the scene.
        //this.startContinuousDrawing();
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

    getTreeItem() {
        return this.__stageTreeItem;
    }

    getVRHead() {
        return this.__vrhead;
    }

    getXfo() {
        return this.__stageXfo;
        // return this.__stageTreeItem.globalXfo;
    }

    setXfo(xfo) {
        this.__stageXfo = xfo;
        this.__stageTreeItem.globalXfo = xfo;
        this.__stageMatrix = xfo.inverse().toMat4();
        this.__stageScale = xfo.sc.x;
    }

    getRenderer() {
        return this.__renderer;
    }

    resize(width, height) {
        this.__canvasWidth = width;
        this.__canvasHeight = height;
        // TODO: Support adaptive scaling of the viewport size to 
        // enable higher Fps in heavy scenes. If the Fps drops below
        // a certain threshold, we can drop the viewport resolution.
        this.__width = this.__canvasWidth * this.__canvasSizeScale.x;
        this.__height = this.__canvasHeight * this.__canvasSizeScale.y;

        if (this.__fbo) {
            this.__fwBuffer.resize(this.__width, this.__height);
            this.__fbo.resize();
        }
        this.resized.emit();
    }

    getBackgroundColor() {
        return this.__bgColor;
    }

    setBackgroundColor(color) {
        this.__bgColor = color;
        if (this.__fbo) {
            this.__fbo.setClearColor(this.__bgColor.asArray());
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
        this.__fbo.setClearColor(this.__bgColor.asArray());
    }

    ////////////////////////////
    // Continuous Rendering

    __requestAnimationFrame(cb) {
        this.__vrDisplay.requestAnimationFrame(cb);
    }

    isContinuouslyDrawing() {
        return this.__continuousDrawing;
    }

    startContinuousDrawing() {
        this.__continuousDrawing = true;

        let vrViewport = this;
        let renderer = this.__renderer;
        let vrDisplay = this.__vrDisplay;

        function onAnimationFrame() {
            if (vrViewport.isContinuouslyDrawing())
                vrDisplay.requestAnimationFrame(onAnimationFrame);
            vrViewport.__frameRequested = true;
            renderer.draw();
        }
        this.__vrDisplay.requestAnimationFrame(onAnimationFrame);
    }

    stopContinuousDrawing() {
        this.__continuousDrawing = false;
    }

    ////////////////////////////
    // Presenting

    canPresent() {
        return this.__vrDisplay.capabilities.canPresent;
    }

    isPresenting() {
        return this.__vrDisplay.isPresenting;
    }

    startPresenting() {
        if (this.__vrDisplay.capabilities.canPresent) {

            this.__stageTreeItem.setVisible(true);

            if (isMobileDevice()) {
                let xfo = this.__renderer.getViewport().getCamera().globalXfo.clone();
                let yaxis = xfo.ori.getYaxis();
                let up = new Vec3(0, 1, 0);
                let angle = yaxis.angleTo(up);
                if (angle > 0.0001) {
                    let axis = yaxis.cross(up);
                    let align = new Quat();
                    align.setFromAxisAndAngle(axis, angle);
                    xfo.ori = align.multiply(xfo.ori);
                }
                //    xfo.tr.y = 0;
                //}
                this.setXfo(xfo);
            }
            this.__vrDisplay.requestPresent([{
                source: this.__renderer.getGLCanvas()
            }]).then(function() {}, function() {
                console.warn("requestPresent failed.");
            });
        } else {
            console.warn("VRViewport does not support presenting.");
        }
    }

    stopPresenting() {
        if (!this.__vrDisplay.isPresenting)
            return;

        this.__stageTreeItem.setVisible(false);
        this.__vrDisplay.exitPresent().then(function() {}, function() {
            console.warn("exitPresent failed.");
        });
    }

    togglePresenting() {
        if (this.__vrDisplay.isPresenting)
            this.stopPresenting();
        else
            this.startPresenting();
    }

    getHMDCanvasSize() {
        return this.__hmdCanvasSize;
    }

    __onVRPresentChange() {
        if (this.__vrDisplay.isPresenting) {


            let leftEye = this.__vrDisplay.getEyeParameters("left");
            let rightEye = this.__vrDisplay.getEyeParameters("right");
            this.__hmdCanvasSize = [
                Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2,
                Math.max(leftEye.renderHeight, rightEye.renderHeight)
            ];
            this.__vrhead.setVisible(true);
            for (let vrController of this.__vrControllers)
                vrController.setVisible(true);

            if (this.__vrDisplay.capabilities.hasExternalDisplay) {
                this.__vrPresentButton.innerText = 'Exit VR';
            }

            this.startContinuousDrawing();
        } else {

            this.__vrhead.setVisible(false);
            for (let vrController of this.__vrControllers)
                vrController.setVisible(false);

            if (this.__vrDisplay.capabilities.hasExternalDisplay) {
                this.__vrPresentButton.innerText = 'Enter VR';
            }
            this.stopContinuousDrawing();
        }

        this.__renderer.__onResize();
    }

    ////////////////////////////
    // Controllers
    activateTool(name){
        if(this.__currentTool != this.__vrTools[name]){
            this.__currentTool = this.__vrTools[name];
            this.__currentTool.activateTool();
        }
    }

    updateHeadAndControllers() {

        if (!this.__frameData.pose)
            return;

        this.__vrhead.update(this.__frameData);

        let gamepads = navigator.getGamepads();
        let id = 0;
        for (let gamepad of gamepads) {
            // Skip the new broken controller that is showing up.(maybe not a vive controller??)
            if (gamepad && gamepad.pose) {
                if (!this.__vrControllers[id]) {
                    let vrController = new VRController(this, id, this.__stageTreeItem);
                    vrController.touchpadTouched.connect((vals) => {
                        if (vals[1] > 0) {
                            this.activateTool('VRToolMoveStage');

                        } else if (vals[1] < 0) {
                            // this.activateTool('Markerpen');
                            this.activateTool('VRToolHoldObjects');
                        }
                    }, this);
                    this.__vrControllers[id] = vrController;
                    this.controllerAdded.emit(id, vrController);
                }
                // Update the controllers pose in space.
                this.__vrControllers[id].update(gamepad);
                id++;
            }
        }

        if (this.__currentTool) {
            this.__currentTool.evalTool();
        }


        /////////////////////////
        // Emit a signal for the shared session.
        let data = {
            interfaceType: 'Vive',
            viewXfo: this.__vrhead.getTreeItem().globalXfo,
            controllers: []
        }
        for (let controller of this.__vrControllers) {
            data.controllers.push({
                xfo: controller.getTreeItem().globalXfo
            });
        }
        this.viewChanged.emit(data);
    }

    bindAndClear(renderstate) {
        if (this.__fbo)
            this.__fbo.bindAndClear(renderstate);
        else {
            let gl = this.__renderer.gl;
            // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clearColor(...this.__bgColor.asArray());
            gl.colorMask(true, true, true, true);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
    }

    draw(renderstate) {
        if (!this.__frameRequested) {
            console.log("hey!!");
            return;
        }


        this.__vrDisplay.getFrameData(this.__frameData);
        if (!this.__projectionMatriciesUpdated) {
            this.__leftProjectionMatrix.setDataArray(this.__frameData.leftProjectionMatrix);
            this.__rightProjectionMatrix.setDataArray(this.__frameData.rightProjectionMatrix);
            this.__projectionMatriciesUpdated = true;
        }


        this.updateHeadAndControllers();
        this.bindAndClear(renderstate);

        // if (this.__vrDisplay.stageParameters) {
        //     this.__standingMatrix.setDataArray(this.__vrDisplay.stageParameters.sittingToStandingTransform);
        //     this.__standingMatrix.multiplyInPlace(this.__stageMatrix);
        // } else {
        //     this.__standingMatrix.setIdentify();
        //     let PLAYER_HEIGHT = 1.65;
        //     this.__standingMatrix.translation.set(0, PLAYER_HEIGHT, 0);
        // }
        // this.__standingViewMatrix = this.__standingMatrix.inverse();

        renderstate['viewport'] = this;
        // renderstate['cameraMatrix'] = this.__standingMatrix;
        renderstate['viewScale'] = 1.0 / this.__stageScale;

        let width = this.__hmdCanvasSize[0];
        let height = this.__hmdCanvasSize[1];
        let gl = this.__renderer.gl;

        gl.viewport(0, 0, width * 0.5, height);
        this.__leftViewMatrix.setDataArray(this.__frameData.leftViewMatrix);
        this.__leftViewMatrix.multiplyInPlace(this.__stageMatrix);
        renderstate['viewMatrix'] = this.__leftViewMatrix;
        renderstate['projectionMatrix'] = this.__leftProjectionMatrix;
        this.__renderer.drawScene(renderstate);

        gl.viewport(width * 0.5, 0, width * 0.5, height);
        this.__rightViewMatrix.setDataArray(this.__frameData.rightViewMatrix);
        this.__rightViewMatrix.multiplyInPlace(this.__stageMatrix);
        renderstate['viewMatrix'] = this.__rightViewMatrix;
        renderstate['projectionMatrix'] = this.__rightProjectionMatrix;
        this.__renderer.drawScene(renderstate);

        this.__vrDisplay.submitFrame();
        this.__frameRequested = false;
    }

    drawOverlays(renderstate) {
        // No overlays in VR 
        //(overlays will be 3d scene grometries at an appropriate dist to the head... maybe.)
        // Instead we will use the controllers and attach widgets there.
    }
};

export {
    VRViewport
};