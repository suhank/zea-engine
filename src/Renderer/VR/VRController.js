import Quat, {EulerAngles} from '../../Math/Quat';
import Xfo from '../../Math/Xfo';
import Color from '../../Math/Color';
import Signal from '../../Math/Signal';

import {
    isMobileDevice,
} from '../../Math';

import Cuboid from '../../SceneTree/Geometry/Shapes/Cuboid';
import Sphere from '../../SceneTree/Geometry/Shapes/Sphere';
import TreeItem from '../../SceneTree/TreeItem';
import GeomItem from '../../SceneTree/GeomItem';
import FlatMaterial from '../../SceneTree/Shaders/FlatMaterial';
import GLMesh from '../GLMesh.js';
import GLDrawItem from '../GLDrawItem.js';
import Gizmo from '../Gizmos/Gizmo.js';

class VRController extends Gizmo {
    constructor(gl, index, stageTreeItem) {
        super(new Color(0, 0, 1));

        this.__index = index;
        this.__treeItem = new TreeItem('VRController:'+index);
        stageTreeItem.addChild(this.__treeItem);

        let handle = new Cuboid('VRControllerHandle', 0.04, 0.025, 0.16);
        let sphere = new Sphere('VRControllerTip', 0.015);
        this.__mat0 = new FlatMaterial('mat0');
        this.__mat0.baseColor = new Color(0, 0, 1);
        this.__mat1 = new FlatMaterial('mat1');
        this.__mat1.baseColor = new Color(1, 1, 0);

        this.__geomItem0 = new GeomItem('VRControllerHandle', handle, this.__mat0);
        this.__geomItem0.localXfo.tr.set(0.0,-0.01, 0.053);
        this.__geomItem0.selectable = false;
        this.__geomItem1 = new GeomItem('VRControllerTip', sphere, this.__mat1);
        this.__geomItem1.localXfo.tr.set(0.0,-0.01, -0.02);
        this.__geomItem1.selectable = false;
        this.__treeItem.addChild(this.__geomItem0);
        this.__treeItem.addChild(this.__geomItem1);

        this.__handleColor = new Color(0, 0, 1);
        this.__tipColor = new Color(.2, .2, .2);
        this.__highlightedColor = new Color(1, 0, 0);

        // this.__geomglDrawItem0 = new GLDrawItem(gl, this.__geomItem0, new GLMesh(gl, handle));
        // this.__geomglDrawItem1 = new GLDrawItem(gl, this.__geomItem1, new GLMesh(gl, sphere));

        // this.__addDrawItem(this.__geomglDrawItem0);
        // this.__addDrawItem(this.__geomglDrawItem1);

        // this.__geomglDrawItem0.__color = this.__handleColor;
        // this.__geomglDrawItem1.__color = this.__tipColor;

        // this.__setProxyItem(this.__geomglDrawItem1);

        this.touchpadTouched = new Signal();
        this.buttonPressed = new Signal();
        this.buttonReleased = new Signal();

        this.__xfo = new Xfo();
        this.__isDaydramController = isMobileDevice();

        this.setVisible(true);
    }

    getTreeItem(){
        return this.__treeItem;
    }

    setVisible(val){
        this.__geomItem0.setVisible(val);
        this.__geomItem1.setVisible(val);
    }

    setHandleColor(val){
        this.__handleColor = val;
       this.__mat1.baseColor.setFromOther(this.__handleColor);
    }

    setTipColor(val){
        this.__tipColor = val;
        this.__mat1.baseColor.setFromOther(this.__tipColor);
    }

    update(gamepad) {
        if (gamepad.pose.position)
            this.__xfo.tr.setDataArray(gamepad.pose.position);
        if (gamepad.pose.orientation)
            this.__xfo.ori.setDataArray(gamepad.pose.orientation);

        this.__treeItem.localXfo = this.__xfo;
        this.__touchpadValue = gamepad.axes;
        if(gamepad.buttons[0].pressed){
            if(this.__isDaydramController){
                if(!this.__buttonPressed){
                    this.__buttonPressed = true;
                    this.buttonPressed.emit();
                }
                return;
            }
            else{
                if(gamepad.axes[0] != 0 && gamepad.axes[1] != 0)
                    this.touchpadTouched.emit(gamepad.axes);
            }
        }

        // Button 0 is the touchpad clicker.
        for (let j = 1; j < gamepad.buttons.length; ++j) {
            if (gamepad.buttons[j].pressed) {
                if(!this.__buttonPressed){
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

        if(this.__buttonPressed){
            this.__buttonPressed = false;
            // this.__geomglDrawItem1.color.setFromOther(this.__tipColor);
            this.buttonReleased.emit();
        }
    }

    getTouchPadValue(){
        return this.__touchpadValue;
    }

    isButtonPressed(){
        return this.__buttonPressed;
    }

    getTipXfo(){
        return this.__xfo;
    }

    getTipGlobalXfo(){
        return this.__treeItem.globalXfo;
    }
};

export default VRController;

