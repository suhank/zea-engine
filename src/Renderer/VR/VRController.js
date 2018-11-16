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
            // Note: the tip of the controller need to be off
            // the end of the controller. getGeomItemAtTip
            // now searches a grid in that area and so we need to 
            // ensure that the grid does not touch the controller, 
            // else it will return the controller geom from
            // the getGeomItemAtTip function
            this.__tip.setLocalXfo(new Xfo(new Vec3(0.0, -0.05, -0.065)));
            this.__treeItem.addChild(this.__tip, false);
            vrviewport.getTreeItem().addChild(this.__treeItem);

            const asset = vrviewport.getAsset();
            if(asset) {
                asset.loaded.connect((entries) => {
                    const controllerTree = asset.getChildByName('HTC_Vive_Controller').clone();
                    controllerTree.setLocalXfo(new Xfo(new Vec3(0, -0.035, -0.02), new Quat({ setFromAxisAndAngle: [new Vec3(0, 1, 0), Math.PI] })));
                    this.__treeItem.addChild(controllerTree);
                });
            }

            this.__projMatrix = new Mat4();
            this.__activeVolumeSize = 0.04
            this.__projMatrix.setOrthographicMatrix(
                this.__activeVolumeSize*-0.5, 
                this.__activeVolumeSize*0.5, 
                this.__activeVolumeSize*-0.5, 
                this.__activeVolumeSize*0.5, 
                0.0, 
                this.__activeVolumeSize);
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
        // The geom data buffer is a 3x3 data buffer.
        // See getGeomItemAtTip below
        const gl = this.__vrviewport.getRenderer().gl;
        this.__geomDataBuffer = new GLTexture2D(gl, {
            type: 'FLOAT',
            format: 'RGBA',
            filter: 'NEAREST',
            width: 3,
            height: 3,
        });
        this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true);
        this.__geomDataBufferFbo.setClearColor([0, 0, 0, 0]);
    }

    getGeomItemAtTip() {
        if(this.__hitTested)
            return this.__geomAtTip;
        this.__hitTested = true;

        const renderer = this.__vrviewport.getRenderer();
        const gl = renderer.gl;
        const xfo = this.__tip.getGlobalXfo();

        this.__geomDataBufferFbo.bindAndClear();
        gl.viewport(0, 0, 3, 3);

        const renderstate = {
            viewports: [{
                region: [0, 0, 3, 3],
                cameraMatrix: xfo.toMat4(),
                viewMatrix: xfo.inverse().toMat4(),
                projectionMatrix: this.__projMatrix,
                isOrthographic: true,
            }]
        };

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.depthMask(true);

        renderer.drawSceneGeomData(renderstate);
        gl.finish();
        this.__geomDataBufferFbo.unbindForWriting();
        this.__geomDataBufferFbo.bindForReading();

        const geomDatas = new Float32Array(4*9);
        gl.readPixels(0, 0, 3, 3, gl.RGBA, gl.FLOAT, geomDatas);
        this.__geomDataBufferFbo.unbindForReading();

        //////////////////////////////////////
        // We have a 3x3 grid of pixels, and we
        // scan them to find if any geom was in the 
        // frustum.
        // Starting with the center pixel (4),
        // then left and right (3, 5)
        // Then top bottom (1, 7)
        const checkPixel = id => (geomDatas[(id*4)+3] != 0);
        const dataPixels = [4, 3, 5, 1, 7]
        let geomData;
        for(let pixelID of dataPixels) {
            if(checkPixel(pixelID)) {
                geomData = geomDatas.subarray(pixelID*4, pixelID*4+4);;
                break;
            }
        }
        if(!geomData)
            return;

        const passId = Math.round(geomData[0]);
        const geomItemAndDist = renderer.getPass(passId).getGeomItemAndDist(geomData);

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