import {
    Vec3,
    Xfo,
    Color,
    EulerAngles,
    Signal
} from '../Math';
import {
    Cone,
    Cuboid,
    Sphere,
    TreeItem,
    GeomItem,
    Material,
    MarkerpenTool
} from '../SceneTree';

class UserAvatar {

    constructor(id, data, parentTreeItem, scaleFactor = 1.0, visible = true, commonResources) {
        this.__id = id;
        this.__parentTreeItem = parentTreeItem;

        // Used when the scene scale is not meters. (usualy testin scenes)
        this.__avatarScale = scaleFactor;
        this.__commonResources = commonResources;

        this.__controllers = [];

        this.userMarker = new MarkerpenTool('client' + id);
        this.__parentTreeItem.addChild(this.userMarker.getTreeItem());

        this.__treeItem = new TreeItem(id);
        this.__treeItem.setVisible(visible);
        this.__material = new Material('user' + id + 'Material', 'SimpleSurfaceShader');
        this.__material.addParameter('baseColor', new Color(data.color.r, data.color.g, data.color.b));
        this.setMouseAndCameraRepresentation();

        this.__parentTreeItem.addChild(this.__treeItem);
    }

    setVisibility(visible) {
        this.__treeItem.setVisible(visible);
    }

    pointerMoved(data) {
        // TODO: show a pointer beam.
    }

    __switchReprentationTree(treeItem) {
        if (this.__currentTree) {
            this.__currentTree.setVisible(false);
        }
        this.__currentTree = treeItem;
        this.__currentTree.setVisible(true);
    }

    setMouseAndCameraRepresentation() {
        if (!this.__mouseAndKeyboardTree) {

            //let shape = new Cuboid('Camera', 0.2 * this.__avatarScale, 0.2 * this.__avatarScale, 0.4 * this.__avatarScale);
            let shape = new Cone('Camera', 0.4 * this.__avatarScale, 0.6, 4, true);
            shape.computeVertexNormals();
            let geomItem = new GeomItem(this.__id, shape, this.__material);
            let geomXfo = new Xfo();
            geomXfo.ori.setFromEulerAngles(new EulerAngles(Math.PI * 0.5, Math.PI * 0.25, 0.0));
            geomItem.setGeomOffsetXfo(geomXfo);
            this.__mouseAndKeyboardTree = new TreeItem("MouseAndCameraRepresentation");
            this.__mouseAndKeyboardTree.addChild(geomItem);
            this.__treeItem.addChild(this.__mouseAndKeyboardTree);
        }
        this.__currentViewMode = 'MouseAndKeyboard';
        this.__switchReprentationTree(this.__mouseAndKeyboardTree);
    }

    setTabletAndFingerRepresentation() {
        // this.__treeItem.removeAllChildren();
        let shape = new Cuboid('Camera', 0.1, 0.1, 0.2);
        let geomItem = new GeomItem(this.__id, shape, this.__material);
        this.__treeItem.addChild(geomItem);
        this.__currentViewMode = 'TabletAndFinger';
        this.__controllers = [];
    }

    setViveRepresentation() {
        if (!this.__viveTree) {
            let hmdTree = this.__commonResources['viveAsset'].getChildByName('HTC_Vive_HMD').clone();
            hmdTree.localXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
            let treeItem = new TreeItem("hmdHolder");
            treeItem.addChild(hmdTree);

            this.__viveTree = new TreeItem("ViveRepresentation");
            this.__viveTree.addChild(treeItem);
            this.__treeItem.addChild(this.__viveTree);
        }
        // this.__treeItem.addChild(treeItem);
        this.__switchReprentationTree(this.__viveTree);
        this.__currentViewMode = 'Vive';
    }

    updateViveControllers(data) {
        for (let i = 0; i < data.controllers.length; i++) {
            if (i >= this.__controllers.length) {

                let controllerTree = this.__commonResources['viveAsset'].getChildByName('HTC_Vive_Controller').clone();
                controllerTree.name = 'Handle' + i;
                controllerTree.localXfo.tr.set(0, -0.035, 0.01);
                controllerTree.localXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
                let treeItem = new TreeItem("handleHolder" + i);
                treeItem.addChild(controllerTree);
                this.__viveTree.addChild(treeItem);

                this.__controllers.push(treeItem);
            }
            this.__controllers[i].setVisible(true);
            this.__controllers[i].setLocalXfo(data.controllers[i].xfo);
        }
        // Hide any controllers that have turned off
        if (this.__controllers.length > data.controllers.length) {
            for (let i = data.controllers.length; i < this.__controllers.length; i++) {
                this.__controllers[i].setVisible(false);
            }
        }
    }

    onViewChange(data) {
        switch (data.interfaceType) {
            case 'MouseAndKeyboard':
                {
                    if (this.__currentViewMode !== 'MouseAndKeyboard') {
                        this.setMouseAndCameraRepresentation(data);
                    }
                    this.__mouseAndKeyboardTree.getChild(0).setLocalXfo(data.viewXfo);
                }
                break;
            case 'TabletAndFinger':
                if (this.__currentViewMode !== 'MouseAndKeyboard') {

                }

                break;
            case 'Vive':
                {
                    if (this.__currentViewMode !== 'Vive') {
                        this.setViveRepresentation(data);
                    }

                    this.__viveTree.getChild(0).setLocalXfo(data.viewXfo);
                    if (data.controllers)
                        this.updateViveControllers(data);
                }

                break;
            case 'Daydream':
                break;
            case 'Occulus':
                break;
        }

        //this.__treeItem.requestRedraw();
    };

    destroy() {
        this.__parentTreeItem.removeChildByHandle(this.__treeItem);
        // Notr: the marker pen tool stays, as we don't want lines
        // dissappearing after a user quits.
    }
};

export {
    UserAvatar
};
//export default UserAvatar;