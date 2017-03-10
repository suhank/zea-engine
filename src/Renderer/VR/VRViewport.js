import {
    Vec2,
    Vec3,
    Mat4,
    Xfo,
    Color,
    Signal
} from '../../Math/Math.js';
import {
    TreeItem
} from '../../SceneTree/SceneTree.js';
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
    VR1HandedGrabTool
} from './VR1HandedGrabTool.js'
import {
    VR2HandedGrabTool
} from './VR2HandedGrabTool.js'
import {
    MarkerpenTool
} from './MarkerpenTool.js'


class VRViewport {
    constructor(renderer, vrDisplay /*, width, height*/ ) {
        this.__renderer = renderer;
        this.__vrDisplay = vrDisplay;
        this.__bgColor = new Color(0.94, 0.94, 0.94);
        this.__canvasSizeScale = new Vec2(1, 1);
        this.__frustumDim = new Vec2(1, 1);

        this.__far = 1024.0;
        this.__near = 0.1;
        this.__vrDisplay.depthNear = this.__near;
        this.__vrDisplay.depthFar = this.__far;

        this.__stageXfo = new Xfo();
        this.__standingMatrix = new Mat4();
        this.__stageMatrix = new Mat4();

        this.__frameData = new VRFrameData();
        this.__stageTreeItem = new TreeItem('VRStage');
        this.__projectionMatriciesUpdated = false;

        this.__leftViewMatrix = new Mat4();
        this.__leftProjectionMatrix = new Mat4();
        this.__rightViewMatrix = new Mat4();
        this.__rightProjectionMatrix = new Mat4();

        // Construct the head geom and add it directly to the Gizmo pass.
        this.__vrhead = new VRHead(this.__renderer.gl, this.__stageTreeItem);
        this.__vrControllers = [];
        this.__vrTools = {};
        if(Visualive.isMobileDevice()){
            this.__vrTools['1HandedGrab'] = new VR1HandedGrabTool(this, this.__vrhead, this.__vrControllers);
            this.__vrTools['2HandedGrab'] = new VR2HandedGrabTool(this, this.__vrhead, this.__vrControllers);
            this.__vrTools['Markerpen'] = new MarkerpenTool(this, this.__vrhead, this.__vrControllers);
        }
        this.__renderer.getCollector().addTreeItem(this.__stageTreeItem);
        this.__renderer.getCollector().finalize();// TODO this should not be explicit.

        this.__pressedButtons = 0;
        this.__currentTool = undefined;
        this.__moveMode = true;

        if (this.__vrDisplay.stageParameters &&
            this.__vrDisplay.stageParameters.sizeX > 0 &&
            this.__vrDisplay.stageParameters.sizeZ > 0) {} else {
            if (this.__vrDisplay.stageParameters) {
                console.warn("VRDisplay reported stageParameters, but stage size was 0. Using default size.");
            } else {
                console.warn("VRDisplay did not report stageParameters");
            }
        }

        // VRSamplesUtil.addButton("Reset Pose", "R", null, function() {
        //     this.__vrDisplay.resetPose();
        // });
        // if (this.__vrDisplay.capabilities.canPresent)
        //     vrPresentButton = VRSamplesUtil.addButton("Enter VR", "E", "media/icons/cardboard64.png", onVRRequestPresent);

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

        // this.__createOffscreenFbo();

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
        this.__vrDisplay.requestPresent([{
            source: this.__renderer.getGLCanvas()
        }]).then(function() {}, function() {
            console.warn("requestPresent failed.");
        });
    }

    stopPresenting() {
        if (!this.__vrDisplay.isPresenting)
            return;
        this.__vrDisplay.exitPresent().then(function() {}, function() {
            console.warn("exitPresent failed.");
        });
    }

    setMoveMode(mode) {
        this.__moveMode = mode;
        if (this.__moveMode) {
            for (let vrController of this.__vrControllers)
                vrController.setHandleColor(new Color(0, 0, 1));
        } else {
            for (let vrController of this.__vrControllers)
                vrController.setHandleColor(new Color(0, 1, 0));
        }
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
                // VRSamplesUtil.removeButton(vrPresentButton);
                // vrPresentButton = VRSamplesUtil.addButton("Exit VR", "E", "media/icons/cardboard64.png", onVRExitPresent);
            }

            this.startContinuousDrawing();
        } else {
            this.__vrhead.setVisible(false);
            for (let vrController of this.__vrControllers)
                vrController.setVisible(false);

            if (this.__vrDisplay.capabilities.hasExternalDisplay) {
                // VRSamplesUtil.removeButton(vrPresentButton);
                // vrPresentButton = VRSamplesUtil.addButton("Enter VR", "E", "media/icons/cardboard64.png", onVRRequestPresent);
            }
            this.stopContinuousDrawing();
        }

        this.__renderer.__onResize();
    }

    ////////////////////////////
    // Rendering

    updateHeadAndControllers() {

        this.__vrhead.update(this.__frameData);

        let gamepads = navigator.getGamepads();
        let id = 0;
        for (let gamepad of gamepads) {
            // Skip the new broken controller that is showing up.(maybe not a vive controller??)
            if (gamepad && gamepad.pose) {
                if (!this.__vrControllers[id]) {

                    let vrController = new VRController(this.__renderer.gl, id, this.__stageTreeItem);
                    vrController.touchpadTouched.connect((vals) => {
                        if (vals[1] > 0) {
                            this.setMoveMode(true);
                        } else if (vals[1] < 0) {
                            this.setMoveMode(false);
                        }
                    }, this);

                    vrController.buttonPressed.connect(() => {
                        this.__pressedButtons++;
                        if (this.__moveMode) {
                            if (this.__pressedButtons == 1) {
                                this.__currentTool = this.__vrTools['1HandedGrab'];
                            } else if (this.__pressedButtons == 2) {
                                this.__currentTool = this.__vrTools['2HandedGrab'];
                            }
                        } else {
                            this.__currentTool = this.__vrTools['Markerpen'];
                        }
                        this.__currentTool.startAction();
                    }, this);

                    vrController.buttonReleased.connect(() => {
                        this.__pressedButtons--;
                        if (this.__currentTool) {
                            this.__currentTool.endAction();
                            this.__currentTool = null;
                        }
                        if (this.__moveMode && this.__pressedButtons == 1) {
                            this.__currentTool = this.__vrTools['1HandedGrab'];
                            this.__currentTool.startAction();
                        }
                    }, this);

                    this.__renderer.getCollector().addTreeItem(vrController.getTreeItem());
                    this.__vrControllers[id] = vrController;
                    this.__renderer.getCollector().finalize();// TODO this should not be explicit.
                }
                this.__vrControllers[id].update(gamepad);
                id++;
            }
        }

        if (this.__currentTool) {
            this.__currentTool.applyAction();
        }
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
        if(!this.__projectionMatriciesUpdated){
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
        renderstate['cameraMatrix'] = this.__standingMatrix;
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