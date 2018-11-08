import {
    SystemDesc
} from '../../BrowserDetection.js';
import {
    Vec3,
    Quat,
    EulerAngles,
    Xfo,
    Mat4,
    Ray
} from '../../Math';
import {
    Signal
} from '../../Utilities';
import {
    Lines,
    Plane,
    Sphere,
    GeomItem,
    TreeItem,
    Material,
    DataImage
} from '../../SceneTree';
import {
    GLMesh
} from '../GLMesh.js';
import {
    GLDrawItem
} from '../GLDrawItem.js';
import {
    GLTexture2D
} from '../GLTexture2D.js';
import {
    GLFbo
} from '../GLFbo.js';

class VRController {
    constructor(vrviewport, index) {

        this.__vrviewport = vrviewport;
        this.__index = index;
        this.__isDaydramController = SystemDesc.isMobileDevice;
        this.__treeItem = new TreeItem('VRController:' + index);
        // Controller coordinate system
        // X = Horizontal.
        // Y = Up.
        // Z = Towards handle base.

        if(!this.__isDaydramController) {
            // A Vive or Occulus Touch Controller
            this.__tip = new TreeItem('Tip');
            this.__tip.setLocalXfo(new Xfo(new Vec3(0.0, -0.07, -0.028)));
            this.__treeItem.addChild(this.__tip, false);
            vrviewport.getTreeItem().addChild(this.__treeItem);

            const asset = vrviewport.getAsset();
            if(asset) {
                asset.loaded.connect((entries) => {
                    const controllerTree = asset.getChildByName('HTC_Vive_Controller').clone();
                    controllerTree.setLocalXfo(new Xfo(new Vec3(0, -0.035, 0.01), new Quat({ setFromAxisAndAngle: [new Vec3(0, 1, 0), Math.PI] })));
                    this.__treeItem.addChild(controllerTree);
                });
            }

            this.__projMatrix = new Mat4();
            this.__activeVolumeSize = 0.03
            this.__activeVolumeLength = 0.08
            this.__projMatrix.setOrthographicMatrix(
                this.__activeVolumeSize*-0.5, 
                this.__activeVolumeSize*0.5, 
                this.__activeVolumeSize*-0.5, 
                this.__activeVolumeSize*0.5, 
                0.0, 
                this.__activeVolumeLength);
            this.createGeomDataFbo();
        }

        this.touchpadTouched = new Signal();
        this.buttonPressed = new Signal();
        this.buttonReleased = new Signal();
        this.__pressedButtons = [];

        ///////////////////////////////////
        // Xfo

        this.__xfo = new Xfo();

        // this.setVisible(true);
    }

    getId() {
        return this.__index;
    }

    getTreeItem() {
        return this.__treeItem;
    }

    getTipItem() {
        return this.__tip;
    }

    getTipXfo() {
        return this.__tip.getGlobalXfo();
    }
    
    getTouchPadValue() {
        return this.__touchpadValue;
    }

    isButtonPressed(id=1) {
        return this.__buttonPressed;
    }

    getControllerStageLocalXfo() {
        return this.__xfo;
    }

    update(gamepad) {
        if (gamepad.pose.position)
            this.__xfo.tr.setDataArray(gamepad.pose.position);
        if (gamepad.pose.orientation)
            this.__xfo.ori.setDataArray(gamepad.pose.orientation);

        if (!this.__treeItem)
            return;
        this.__treeItem.setLocalXfo(this.__xfo);

        this.__geomAtTip = undefined;
        this.__hitTested = false;

        ////////////////////////////////////////////
        if (this.__isDaydramController) {
            if (gamepad.buttons[0].pressed &&!this.__buttonPressed) {
                this.__buttonPressed = true;
                this.buttonPressed.emit();
            }
        }
        else {
            this.__touchpadValue = gamepad.axes;
            // Note: Button 0 is the touchpad clicker.
            for (let i = 0; i < gamepad.buttons.length; ++i) {
                if (gamepad.buttons[i].pressed) {
                    if (!this.__pressedButtons[i]) {
                        this.__pressedButtons[i] = true;

                        const event = { button: i, controller: this, vleStopPropagation:false }

                        // trigger
                        if (i == 1) {
                            const intersectionData = this.getGeomItemAtTip();
                            if (intersectionData != undefined) {
                                intersectionData.geomItem.onMouseDown(Object.assign(event, {intersectionData}));
                                if(event.vleStopPropagation == true)
                                    continue;
                            }
                        }

                        this.buttonPressed.emit(event);
                    }
                }
                else {
                    if (this.__pressedButtons[i]) {
                        this.__pressedButtons[i] = false;
                        const event = { button: i, controller: this, vleStopPropagation:false }
                        this.buttonReleased.emit(event);
                    }
                }
            }
        }
    }

    //////////////////////////////////

    createGeomDataFbo() {
        const gl = this.__vrviewport.getRenderer().gl;
        this.__geomDataBuffer = new GLTexture2D(gl, {
            type: 'FLOAT',
            format: 'RGBA',
            filter: 'NEAREST',
            width: 1,
            height: 1,
        });
        this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true);
        this.__geomDataBufferFbo.setClearColor([0, 0, 0, 0]);
    }

    getGeomItemAtTip() {
        if(this.__hitTested)
            return this.__geomAtTip;


        const renderer = this.__vrviewport.getRenderer();
        const gl = renderer.gl;
        const xfo = this.__treeItem.getGlobalXfo();

        this.__geomDataBufferFbo.bindAndClear();
        gl.viewport(0, 0, 1, 1);

        const renderstate = {
            cameraMatrix: xfo.toMat4(),
            viewMatrix: xfo.inverse().toMat4(),
            projectionMatrix: this.__projMatrix,
            isOrthographic: true,
            materialCount: 0,
            drawCalls: 0,
            drawCount: 0
        };

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.depthMask(true);

        renderer.drawSceneGeomData(renderstate);

        gl.finish();
        this.__geomDataBufferFbo.bindForReading();

        let passId, itemId, dist, geomData;
        if (gl.floatGeomBuffer) {
            geomData = new Float32Array(4);
            gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, geomData);
            if (geomData[3] == 0)
                return undefined;
            passId = Math.round(geomData[0]);
        }

        this.__geomDataBufferFbo.unbind();

        const geomItemAndDist = renderer.getPass(passId).getGeomItemAndDist(geomData);

        this.__hitTested = true;

        if (geomItemAndDist) {
            const ray = new Ray(xfo.tr, xfo.ori.getZaxis());
            const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist));
            
            this.__geomAtTip = {
                controllerRay: ray,
                intersectionPos,
                geomItem: geomItemAndDist.geomItem,
                dist: geomItemAndDist.dist
            };
            return this.__geomAtTip;
        }
    }

    //////////////////////////////////
    // UI
    // setPointerLength(length) {
    //     let xfo = this.__uiPointerItem.getLocalXfo();
    //     xfo.sc.set(1, 1, length);
    //     this.__uiPointerItem.setLocalXfo(xfo);
    // }

    // getUIDimensions() {
    //     return this.__dims;
    // }

    // setUIPixelData(width, height, pixels) {
    //     this.__dims = {
    //         width,
    //         height
    //     };
    //     let dpm = 0.0005;//dots-per-meter (1 each 1/2mm)
    //     this.__uiGeomItemGeomXfo.sc.set(width*dpm, height*dpm, 1.0);
    //     this.__uiGeomItem.setGeomOffsetXfo(this.__uiGeomItemGeomXfo)
    //     this.__uiimage.setData(width, height, pixels);
    // }

};

export {
    VRController
};