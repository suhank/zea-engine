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
    }

    update(frameData){
        const localXfo = this.__treeItem.getLocalXfo();
        if(frameData.pose.position)
            localXfo.tr.setDataArray(frameData.pose.position);
        if(frameData.pose.orientation)
            localXfo.ori.setDataArray(frameData.pose.orientation);
        this.__treeItem.setLocalXfo(localXfo);
    }

    getTreeItem(){
        return this.__treeItem;
    }

    getXfo(){
        return this.__treeItem.getLocalXfo();
    }
};

export {
    VRHead
};
//export default VRHead;