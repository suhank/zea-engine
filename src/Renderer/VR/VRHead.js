import { 
    Mat4,
    Xfo,
    Color 
} from '../../Math';
import {
    TreeItem
} from '../../SceneTree';

class VRHead {
    constructor(gl, stageTreeItem) {
        this.__treeItem = new TreeItem('VRHead');
        stageTreeItem.addChild(this.__treeItem);

        this.__mat4 = new Mat4();
        this.__localXfo = new Xfo();
    }

    update(pose){
        this.__mat4.setDataArray(pose.poseModelMatrix);
        this.__localXfo.fromMat4(this.__mat4);
        this.__treeItem.setLocalXfo(localXfo);
    }

    getTreeItem(){
        return this.__treeItem;
    }

    getXfo(){
        return this.__localXfo;
    }
};

export {
    VRHead
};
//export default VRHead;