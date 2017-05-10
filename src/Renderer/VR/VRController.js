import {
    Quat,
    EulerAngles,
    Xfo,
    Color,
    Signal,
    isMobileDevice,
} from '../../Math';
import {
    Cuboid
} from '../../SceneTree/Geometry/Shapes/Cuboid';
import {
    Sphere
} from '../../SceneTree/Geometry/Shapes/Sphere';
import {
    TreeItem
} from '../../SceneTree/TreeItem';
import {
    GeomItem
} from '../../SceneTree/GeomItem';
import {
    FlatMaterial
} from '../../SceneTree/Shaders/FlatMaterial';
import {
    GLMesh
} from '../GLMesh.js';
import {
    GLDrawItem
} from '../GLDrawItem.js';
import {
    Gizmo
} from '../Gizmos/Gizmo.js';

class VRController extends Gizmo {
    constructor(vrstage, index) {
        super(new Color(0, 0, 1));

        this.__vrstage = vrstage;
        this.__index = index;
        this.__treeItem = new TreeItem('VRController:' + index);

        this.__mat = new FlatMaterial('mat1');
        this.__mat.baseColor = new Color(.2, .2, .2);

        /*
        Material:HandleMaterial
        Material:OtherButtons
        Material:Metal
        Material:Touchpad Material
        Material:Material #27
        */

        vrstage.getTreeItem().addChild(this.__treeItem);
        vrstage.getRenderer().getScene().commonResourcesLoaded.connect((entries) => {
            let controllerTree = entries['viveAsset'].getChildByName('HTC_Vive_Controller').clone();
            controllerTree.localXfo.tr.set(0, -0.035, 0.01);
            controllerTree.localXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
            this.__treeItem.addChild(controllerTree);

            let sphere = entries['VRControllerTip'];
            let sphereGeomItem = new GeomItem('VRControllerTip', sphere, this.__mat);
            sphereGeomItem.localXfo.tr.set(0.0, -0.01, -0.02);
            sphereGeomItem.selectable = false;
            this.__treeItem.addChild(sphereGeomItem);

        });

        this.__touchpadPressed = false;
        this.touchpadTouched = new Signal();
        this.buttonPressed = new Signal();
        this.buttonReleased = new Signal();

        this.__xfo = new Xfo();
        this.__isDaydramController = isMobileDevice();

        // this.setVisible(true);
    }

    getTreeItem() {
        return this.__treeItem;
    }

    setVisible(val) {
        // this.__geomItem0.setVisible(val);
        // this.__geomItem1.setVisible(val);
    }

    setTipColor(val) {
        this.__mat.baseColor.setFromOther(val);
    }

    update(gamepad) {
        if (gamepad.pose.position)
            this.__xfo.tr.setDataArray(gamepad.pose.position);
        if (gamepad.pose.orientation)
            this.__xfo.ori.setDataArray(gamepad.pose.orientation);

        if (!this.__treeItem)
            return;
        this.__treeItem.localXfo = this.__xfo;

        // let controllerYAxis = this.__treeItem.globalXfo.ori.getYaxis();
        // let vecToHead = this.__treeItem.globalXfo.tr.subtract(this.__vrstage.getVRHead().getXfo().tr);
        // vecToHead.normalizeInPlace();
        // let angle = controllerYAxis.angleTo(vecToHead);
        // console.log("angle:" + angle);


        this.__touchpadValue = gamepad.axes;
        // Button 0 is the touchpad clicker.
        if (gamepad.buttons[0].pressed) {
            if (this.__isDaydramController) {
                if (!this.__buttonPressed) {
                    this.__buttonPressed = true;
                    this.buttonPressed.emit();
                }
                return;
            } else {
                if (gamepad.axes[0] != 0 && gamepad.axes[1] != 0 && !this.__touchpadPressed) {
                    this.touchpadTouched.emit(gamepad.axes);
                    this.__touchpadPressed = true;
                }
            }
        } else {
            this.__touchpadPressed = false;
        }

        // Button 0 is the touchpad clicker.
        for (let j = 1; j < gamepad.buttons.length; ++j) {
            if (gamepad.buttons[j].pressed) {
                if (!this.__buttonPressed) {
                    this.__buttonPressed = true;
                    // if(gamepad.buttons[j].value)
                    //     this.__geomglDrawItem1.color.setFromOther(this.__highlightedColor);
                    // else
                    //     this.__geomglDrawItem1.color.setFromOther(this.__tipColor);
                    this.buttonPressed.emit();
                }
                return;
            }
        }

        if (this.__buttonPressed) {
            this.__buttonPressed = false;
            // this.__geomglDrawItem1.color.setFromOther(this.__tipColor);
            this.buttonReleased.emit();
        }
    }

    getTouchPadValue() {
        return this.__touchpadValue;
    }

    isButtonPressed() {
        return this.__buttonPressed;
    }

    getTipXfo() {
        return this.__xfo;
    }

    getTipGlobalXfo() {
        return this.__treeItem.globalXfo;
    }
};

export {
    VRController
};