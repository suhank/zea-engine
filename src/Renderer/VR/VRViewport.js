import {
    SystemDesc
} from '../../BrowserDetection.js';
import {
    Vec2,
    Vec3,
    Quat,
    Mat4,
    Xfo,
    Color,
    Ray
} from '../../Math';
import {
    Signal
} from '../../Utilities';
import {
    TreeItem,
    VLAAsset,
    resourceLoader
} from '../../SceneTree';
import {
    GLBaseViewport
} from '../GLBaseViewport.js';
import {
    VRHead
} from './VRHead.js'
import {
    VRController
} from './VRController.js'

class VRViewport extends GLBaseViewport {
    constructor(renderer, vrDisplay, displayVRGeometry) {
        super(renderer);
        this.__vrDisplay = vrDisplay;

        //////////////////////////////////////////////
        // Resources

        const resourceLoader = renderer.getScene().getResourceLoader();
        const viveAssetId = resourceLoader.resolveFilePathToId("VisualiveEngine/Vive.vla")
        if (viveAssetId && displayVRGeometry && !SystemDesc.isMobileDevice) {
            this.__viveAsset = renderer.getScene().loadCommonAssetResource(viveAssetId);
            this.__viveAsset.loaded.connect(() => {
                const materialLibrary = this.__viveAsset.getMaterialLibrary();
                const materialNames = materialLibrary.getMaterialNames();
                for (let name of materialNames) {
                    const material = materialLibrary.getMaterial(name, false);
                    if (material)
                        material.setShaderName('SimpleSurfaceShader');
                }
            });
        }

        //////////////////////////////////////////////
        // Viewport params
        this.__projectionMatriciesUpdated = false;
        this.__presentingRequested = false;
        this.__frameRequested = false;
        this.__canvasSizeScale = new Vec2(1, 1);
        this.__frustumDim = new Vec2(1, 1);

        // These values are in meters.
        this.__far = 1024.0;
        this.__near = 0.1;
        this.__vrDisplay.depthNear = this.__near;
        this.__vrDisplay.depthFar = this.__far;

        //////////////////////////////////////////////
        // Tree
        this.setBackground(renderer.getViewport().getBackground());
        this.__frameData = new VRFrameData();

        this.__stageTreeItem = new TreeItem('VRStage');
        this.__stageTreeItem.setSelectable(false);
        this.__stageTreeItem.setVisible(false);
        this.__renderer.getCollector().addTreeItem(this.__stageTreeItem);

        this.__vrhead = new VRHead(this.__renderer.gl, this.__stageTreeItem);

        this.__vrControllers = [];

        //////////////////////////////////////////////
        // Xfos
        const xfo = new Xfo();
        xfo.ori.setFromAxisAndAngle(new Vec3(1, 0, 0), Math.PI * 0.5);
        this.setXfo(xfo); // Reset the stage Xfo.

        this.__leftViewMatrix = new Mat4();
        this.__leftProjectionMatrix = new Mat4();
        this.__rightViewMatrix = new Mat4();
        this.__rightProjectionMatrix = new Mat4();


        //////////////////////////////////////////////
        // Signals
        this.resized = new Signal();

        // Signals to abstract the user view.
        // i.e. when a user switches to VR mode, the signals
        // simply emit the new VR data.
        this.viewChanged = new Signal();
        this.presentingChanged = new Signal();

        this.controllerAdded = new Signal();
        this.controllerButtonDown = new Signal();
        this.controllerButtonUp = new Signal();
        this.controllerTouchpadTouched = new Signal();

        //////////////////////////////////////////////
        // UI
        if (this.__vrDisplay.stageParameters &&
            this.__vrDisplay.stageParameters.sizeX > 0 &&
            this.__vrDisplay.stageParameters.sizeZ > 0) {} else {
            if (this.__vrDisplay.stageParameters) {
                console.warn("VRDisplay reported stageParameters, but stage size was 0. Using default size.");
            } else {
                console.warn("VRDisplay did not report stageParameters");
            }
        }

        //////////////////////////////////////////////
        // Events
        window.addEventListener('vrdisplaypresentchange', this.__onVRPresentChange.bind(this), false);
        window.addEventListener('vrdisplayactivate', this.startPresenting.bind(this), false);
        window.addEventListener('vrdisplaydeactivate', this.stopPresenting.bind(this), false);

        // Start the update loop that then drives the VRHead + VRController transforms in the scene.
        //this.startContinuousDrawing();

    }

    getVRDisplay() {
        return this.__vrDisplay;
    }

    getAsset() {
        return this.__viveAsset;
    }

    getTreeItem() {
        return this.__stageTreeItem;
    }

    getVRHead() {
        return this.__vrhead;
    }

    getXfo() {
        return this.__stageXfo;
        // return this.__stageTreeItem.getGlobalXfo();
    }

    setXfo(xfo) {
        this.__stageXfo = xfo;
        this.__stageTreeItem.setGlobalXfo(xfo);
        this.__stageMatrix = xfo.inverse().toMat4();
        // this.__stageMatrix.multiplyInPlace(this.__sittingToStandingMatrix);
        this.__stageScale = xfo.sc.x;
    }

    getControllers() {
        return this.__vrControllers;
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

        this.__frameRequested = false;
        const onAnimationFrame = () => {
            if (this.__continuousDrawing) {
                this.__vrDisplay.requestAnimationFrame(onAnimationFrame);
                this.__frameRequested = true;
            }
            this.__renderer.draw();
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
        //if (this.__vrDisplay.capabilities.canPresent) {
        if (this.__presentingRequested) {
            return false;
        }

        this.__presentingRequested = true;
        this.__vrDisplay.requestPresent([{
            source: this.__renderer.getGLCanvas()
        }]).then(() => {
            this.__presentingRequested = false;
        }, (e) => {
            console.warn("requestPresent failed:" + e);
            this.__presentingRequested = true;
        });
        // } else {
        //     console.warn("VRViewport does not support presenting.");
        // }
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
            const leftEye = this.__vrDisplay.getEyeParameters("left");
            const rightEye = this.__vrDisplay.getEyeParameters("right");
            this.__hmdCanvasSize = [
                Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2,
                Math.max(leftEye.renderHeight, rightEye.renderHeight)
            ];
            this.region = [0, 0, this.__hmdCanvasSize[0], this.__hmdCanvasSize[1]];

            this.__stageTreeItem.setVisible(true);

            if (SystemDesc.isMobileDevice) {
                const xfo = this.__renderer.getViewport().getCamera().getGlobalXfo().clone();
                const yaxis = xfo.ori.getYaxis();
                const up = new Vec3(0, 0, 1);
                const angle = yaxis.angleTo(up);
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

            this.startContinuousDrawing();
            this.presentingChanged.emit(true);
        } else {
            this.stopContinuousDrawing();
            this.__stageTreeItem.setVisible(false);
            this.presentingChanged.emit(false);
        }

        this.__renderer.__onResize();
    }

    ////////////////////////////
    // Controllers

    updateHeadAndControllers() {

        this.__vrhead.update(this.__frameData);

        const gamepads = navigator.getGamepads();
        let id = 0;
        for (let gamepad of gamepads) {
            // Skip the new broken controller that is showing up.(maybe not a vive controller??)
            if (gamepad && gamepad.pose) {
                if (!this.__vrControllers[id]) {
                    const vrController = new VRController(this, id);

                    vrController.buttonPressed.connect((event) => {
                        event.vrviewport = this;
                        this.controllerButtonDown.emit(event, this)
                    });

                    vrController.buttonReleased.connect((event) => {
                        event.vrviewport = this;
                        this.controllerButtonUp.emit(event, this)
                    });

                    this.__vrControllers[id] = vrController;
                    this.controllerAdded.emit(vrController);
                }
                // Update the controllers pose in space.
                this.__vrControllers[id].update(gamepad);
                id++;
            }
        }

        /////////////////////////
        // Emit a signal for the shared session.
        const data = {
            interfaceType: 'Vive',
            viewXfo: this.__vrhead.getTreeItem().getGlobalXfo(),
            controllers: this.__vrControllers,
            vrviewport: this
        }
        this.viewChanged.emit(data, this);
    }


    bindAndClear(renderstate) {

        super.clear();

        if(!this.__frameRequested)
            return;

        this.__vrDisplay.getFrameData(this.__frameData);

        if (!this.__frameData.pose || !this.__frameData.pose.orientation)
            return false;

        if (!this.__projectionMatriciesUpdated) {
            this.__leftProjectionMatrix.setDataArray(this.__frameData.leftProjectionMatrix);
            this.__rightProjectionMatrix.setDataArray(this.__frameData.rightProjectionMatrix);
            // if (this.__vrDisplay.stageParameters) {
            //     this.__sittingToStandingMatrix.setDataArray(this.__vrDisplay.stageParameters.sittingToStandingTransform);
            // } else {
            //     this.__standingMatrix.setIdentify();
            //     let PLAYER_HEIGHT = 1.65;
            //     this.__sittingToStandingMatrix.translation.set(0, PLAYER_HEIGHT, 0);
            // }
            // this.__stageMatrix.multiplyInPlace(this.__sittingToStandingMatrix);
            this.__projectionMatriciesUpdated = true;
        }

        this.updateHeadAndControllers();

        this.__leftViewMatrix.setDataArray(this.__frameData.leftViewMatrix);
        this.__leftViewMatrix.multiplyInPlace(this.__stageMatrix);
        this.__rightViewMatrix.setDataArray(this.__frameData.rightViewMatrix);
        this.__rightViewMatrix.multiplyInPlace(this.__stageMatrix);

        const width = this.__hmdCanvasSize[0];
        const height = this.__hmdCanvasSize[1];

        renderstate.viewScale = 1.0 / this.__stageScale;
        renderstate.viewXfo = this.__vrhead.getTreeItem().getGlobalXfo();
        renderstate.cameraMatrix = renderstate.viewXfo.toMat4();
        renderstate.viewports =[{
            region: [0, 0, width * 0.5, height],
            cameraMatrix: renderstate.cameraMatrix,
            viewMatrix: this.__leftViewMatrix,
            projectionMatrix: this.__leftProjectionMatrix
        },
        {
            region: [width * 0.5, 0, width * 0.5, height],
            cameraMatrix: renderstate.cameraMatrix,
            viewMatrix: this.__rightViewMatrix,
            projectionMatrix: this.__rightProjectionMatrix
        }]

        return true;
    }

    submitFrame(){
        this.__vrDisplay.submitFrame();
        this.__frameRequested = false;
    }

};

export {
    VRViewport
};
//export default VRViewport;