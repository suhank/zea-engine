import {
    Vec3,
    Xfo,
    Color,
    Signal
} from '../Math';
import {
    Cuboid,
    Sphere,
    TreeItem,
    GeomItem,
    FlatMaterial,
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
        this.__material = new FlatMaterial('user' + id + 'Material');
        this.__material.baseColor = new Color(data.color.r, data.color.g, data.color.b);
        this.setMouseAndCameraRepresentation();

        this.__visible = visible;
        if (this.__visible) {
            this.__parentTreeItem.addChild(this.__treeItem);
        }
    }

    setVisibility(visible) {
        if (visible && !this.__visible) {
            this.__parentTreeItem.addChild(this.__treeItem);
        } else if (!visible && this.__visible) {
            this.__parentTreeItem.removeChildByHandle(this.__treeItem, false);
        }
        this.__visible = visible;
    }

    pointerMoved(data) {
        // TODO: show a pointer beam.
    }

    setMouseAndCameraRepresentation() {
        this.__treeItem.removeAllChildren();
        this.__treeItem.localXfo = new Xfo();
        let shape = new Cuboid('Camera', 0.5 * this.__avatarScale, 0.5 * this.__avatarScale, 0.7 * this.__avatarScale);
        let geomItem = new GeomItem(this.__id, shape, this.__material);
        this.__treeItem.addChild(geomItem);
        this.__currentViewMode = 'MouseAndKeyboard';
        this.__controllers = [];
    }

    setTabletAndFingerRepresentation() {
        this.__treeItem.removeAllChildren();
        this.__treeItem.localXfo = new Xfo();
        let shape = new Cuboid('Camera', 0.1, 0.1, 0.2);
        let geomItem = new GeomItem(this.__id, shape, this.__material);
        this.__treeItem.addChild(geomItem);
        this.__currentViewMode = 'TabletAndFinger';
        this.__controllers = [];
    }

    setViveRepresentation() {
        this.__treeItem.removeAllChildren();

        let controllerTree = this.__commonResources['viveAsset'].getChildByName('HTC_Vive_HMD').clone();
        controllerTree.localXfo.tr.set(0, -0.035, 0.01);
        controllerTree.localXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
        this.__treeItem.addChild(controllerTree);

        this.__currentViewMode = 'Vive';
    }

    updateViveControllers(data) {
        for (let i = 0; i < data.controllers.length; i++) {
            if (i >= this.__controllers.length) {

                let controllerTree = this.__commonResources['viveAsset'].getChildByName('HTC_Vive_Controller').clone();
                controllerTree.name = 'Handle' + i;
                controllerTree.localXfo.tr.set(0, -0.035, 0.01);
                controllerTree.localXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
                this.__treeItem.addChild(controllerTree);

                this.__controllers.push(controllerTree);
            }
            const controllerXfo = new Xfo();
            controllerXfo.fromJSON(data.controllers[i].xfo);
            this.__controllers[i].localXfo = controllerXfo;
        }
        // Remove any controllers that have turned off
        for (let i = data.controllers.length; i < this.__controllers.length; i++) {
            this.__treeItem.removeChildByHandle(this.__controllers[i]);
        }
        this.__controllers.length = data.controllers.length;
    }

    onViewChange(data) {
        switch (data.interfaceType) {
            case 'MouseAndKeyboard':
                {
                    if (this.__currentViewMode !== 'MouseAndKeyboard') {
                        this.setMouseAndCameraRepresentation(data);
                    }
                    const viewXfo = new Xfo();
                    viewXfo.fromJSON(data.viewXfo);
                    this.__treeItem.getChild(0).localXfo = viewXfo;
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

                    this.__treeItem.getChild(0).localXfo = data.viewXfo;
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