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
    constructor(renderer, xr, device) {
        super(renderer);
        this.__xr = xr;
        this.__device = device;

        //////////////////////////////////////////////
        // Resources

        const resourceLoader = renderer.getScene().getResourceLoader();
        const viveAssetId = resourceLoader.resolveFilePathToId("VisualiveEngine/Vive.vla")
        if (viveAssetId && !SystemDesc.isMobileDevice) {
            this.__viveAsset = renderer.getScene().loadCommonAssetResource(viveAssetId);
            this.__viveAsset.loaded.connect(() => {
                const materialLibrary = this.__viveAsset.getMaterialLibrary();
                const materialNames = materialLibrary.getMaterialNames();
                for (let name of materialNames) {
                    const material = materialLibrary.getMaterial(name, false);
                    if (material) {
                        material.visibleInGeomDataBuffer = false;
                        material.setShaderName('SimpleSurfaceShader');
                    }
                }
            });
        }

        //////////////////////////////////////////////
        // Viewport params
        this.__projectionMatriciesUpdated = false;

        // These values are in meters.
        this.__far = 1024.0;
        this.__near = 0.1;
        //////////////////////////////////////////////
        // Tree

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
    // Presenting

    canPresent() {
        return this.__canPresent;
    }

    isPresenting() {
        return this.__session;
    }

    __startSession() {
        const onAnimationFrame = (t, frame) => {
            if (this.__session) {
                this.__session.requestAnimationFrame(onAnimationFrame);
                this.draw(t, frame);
            }
        }
        this.__session.requestAnimationFrame(onAnimationFrame);
    }

    startPresenting() {

        // https://github.com/immersive-web/webxr/blob/master/explainer.md

        const gl = this.__renderer.gl;

        // Add an outpute canvas that will allow XR to also send a view
        // back the monitor.
        const mirrorCanvas = document.createElement('canvas');
        mirrorCanvas.style.position = 'relative';
        mirrorCanvas.style.left = '0px';
        mirrorCanvas.style.top = '0px';
        mirrorCanvas.style.width = '100%';
        mirrorCanvas.style.height = '100%';
        const ctx = mirrorCanvas.getContext('xrpresent');

        this.__device.requestSession({ immersive: true, outputContext: ctx }).then((session) => {

            this.__renderer.getDiv().replaceChild(mirrorCanvas, this.__renderer.getGLCanvas());

            session.addEventListener('end', (event) => {
                if (event.session.immersive) {
                    this.__stageTreeItem.setVisible(false);
                    this.__renderer.getDiv().replaceChild(this.__renderer.getGLCanvas(), mirrorCanvas);
                    this.__session = null;
                    this.presentingChanged.emit(false);
                }
            });

            this.__session = session;
            this.__session.baseLayer = new XRWebGLLayer(session, gl);


            // Get a stage frame of reference, which will align the user's physical
            // floor with Y=0 and can provide boundaries that indicate where the
            // user can safely walk. If the system can't natively provide stage
            // coordinates (for example, with a 3DoF device) then it will return an
            // emulated stage, where the view is translated up by a static height so
            // that the scene still renders in approximately the right place.
            session.requestFrameOfReference('stage').then((frameOfRef) => {
                this.__frameOfRef = frameOfRef;
                this.__startSession()
            });

            this.__stageTreeItem.setVisible(true);
            this.presentingChanged.emit(true);

        }).catch((e) => {
            console.warn(e)
          });;
    }

    stopPresenting() {
        if (!this.__session)
            return;

        this.__session.end();
    }

    togglePresenting() {
        if (this.__session)
            this.stopPresenting();
        else
            this.startPresenting();
    }

    getHMDCanvasSize() {
        return this.__hmdCanvasSize;
    }

    ////////////////////////////
    // Controllers

    updateHeadAndControllers(pose) {

        this.__vrhead.update(pose);

        // const gamepads = navigator.getGamepads();
        // let id = 0;
        // for (let gamepad of gamepads) {
        //     // Skip the new broken controller that is showing up.(maybe not a vive controller??)
        //     if (gamepad && gamepad.pose) {
        //         if (!this.__vrControllers[id]) {
        //             const vrController = new VRController(this, id);

        //             vrController.buttonPressed.connect((event) => {
        //                 event.vrviewport = this;
        //                 this.controllerButtonDown.emit(event, this)
        //             });

        //             vrController.buttonReleased.connect((event) => {
        //                 event.vrviewport = this;
        //                 this.controllerButtonUp.emit(event, this)
        //             });

        //             this.__vrControllers[id] = vrController;
        //             this.controllerAdded.emit(vrController);
        //         }
        //         // Update the controllers pose in space.
        //         this.__vrControllers[id].update(gamepad);
        //         id++;
        //     }
        // }

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


    draw(t, xrFrame) {

        const session = xrFrame.session;
        // Assumed to be a XRWebGLLayer for now.
        const layer = session.baseLayer;

        if (!this.__projectionMatriciesUpdated) {
            this.__projectionMatrices = [];
            this.__viewMatrices = [];
            this.__region = [0, 0, 0, 0];
            for (let i=0; i<xrFrame.views.length; i++) {
                const projMat = new Mat4();
                projMat.setDataArray(xrFrame.views[i].projectionMatrix);
                this.__projectionMatrices[i] = projMat;
                this.__viewMatrices[i] = new Mat4();

                const vp = layer.getViewport(xrFrame.views[i]);
                this.__region[2] = Math.max(this.__region[2], vp.x + vp.width);
                this.__region[3] = Math.max(this.__region[3], vp.y + vp.height);
            }

            this.__renderer.resizeFbos(this.__region[2], this.__region[3]);
            this.__projectionMatriciesUpdated = true;
        }

        const gl = this.__renderer.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, layer.framebuffer);

        gl.clearColor(...this.__backgroundColor.asArray());
        gl.colorMask(true, true, true, true);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const pose = xrFrame.getDevicePose(this.__frameOfRef);

        const renderstate = {
            boundRendertarget: layer.framebuffer,
            region: this.__region,
            viewports:[]
        };
        renderstate.boundRendertarget.vrfbo = true;

        for (let i=0; i<xrFrame.views.length; i++) {
            this.__viewMatrices[i].setDataArray(pose.getViewMatrix(xrFrame.views[i]));
            this.__viewMatrices[i].multiplyInPlace(this.__stageMatrix);

            const vp = layer.getViewport(xrFrame.views[i]);
            renderstate.viewports.push({
                viewMatrix: this.__viewMatrices[i],
                projectionMatrix: this.__projectionMatrices[i],
                region: [vp.x, vp.y, vp.width, vp.height],
                cameraMatrix: this.__viewMatrices[i].inverse(),
            })
        }

        this.updateHeadAndControllers(pose);

        renderstate.viewXfo = this.__vrhead.getTreeItem().getGlobalXfo()
        renderstate.viewScale = 1.0 / this.__stageScale;
        renderstate.cameraMatrix = renderstate.viewXfo.toMat4();
        renderstate.region = this.__region;

        this.__renderer.drawScene(renderstate);
    }


};

export {
    VRViewport
};
//export default VRViewport;