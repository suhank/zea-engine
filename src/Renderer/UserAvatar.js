import {
    EulerAngles,
    Quat,
    Xfo,
    Color,
    Signal
} from '../Math';
import {
    Cuboid,
    Sphere,
    TreeItem,
    GeomItem,
    FlatMaterial
} from '../SceneTree';

class UserAvatar {

    constructor(id, color, renderer) {
        this.__id = id;
        this.__color = color;
        this.__renderer = renderer;

        this.__treeItem = new TreeItem(id);
        this.__material = new Visualive.StandardMaterial('user#Material');
        this.__material.baseColor = new Visualive.Color(color.r, color.g, color.b);

        this.setMouseAndCameraRepresentation();
        this.__renderer.getCollector().addTreeItem(this.__treeItem);

        this.__controllers = [];


        let userMarker = new Visualive.MarkerpenTool('client' + id);
        this.__renderer.getCollector().addTreeItem(userMarker.getTreeItem());
    }

    setMouseAndCameraRepresentation() {
        this.__treeItem.removeAllChildren();
        let shape = new Visualive.Cuboid('Camera', 1.1, 2.0, 1.0);
        let geomItem = new Visualive.GeomItem(id, shape, this.__material);
        this.__treeItem.addChild(geomItem);
        this.__currentViewMode = 'MouseAndKeyboard';
        this.__controllers = [];
    }

    setTabletAndFingerRepresentation() {
        this.__treeItem.removeAllChildren();
        let shape = new Visualive.Cuboid('Camera', 1.1, 2.0, 1.0);
        let geomItem = new Visualive.GeomItem(id, shape, this.__material);
        this.__treeItem.addChild(geomItem);
        this.__currentViewMode = 'TabletAndFinger';
        this.__controllers = [];
    }

    setViveRepresentation(data) {
        this.__treeItem.removeAllChildren();
        let shape = new Visualive.Cuboid('Camera', 1.1, 2.0, 1.0);
        let geomItem = new Visualive.GeomItem(id, shape, this.__material);
        this.__treeItem.addChild(geomItem);

        let handle = new Cuboid('VRControllerHandle', 0.04, 0.025, 0.16);
        let sphere = new Sphere('VRControllerTip', 0.015);

        for(let i=this.__controllers.length; i<data.controllers.length; i++)
        {
            let handleItem = new GeomItem('Handle'+i, handle, this.__material);
            handleItem.localXfo.tr.set(0.0, -0.01, 0.053);
            handleItem.selectable = false;
            let tipItem = new GeomItem('Tip', sphere, this.__material);
            tipItem.localXfo.tr.set(0.0, 0.0, -0.02);
            tipItem.selectable = false;
            handleItem.addChild(tipItem);
            this.__treeItem.addChild(handleItem);
            this.__controllers.push(handleItem);
        }
        // Remove any controllers that have turned off
        for(let i=data.controllers.length; i<this.__controllers.length; i++) {
            this.__treeItem.removeChildByHandle(this.__controllers[i]);
        }
        this.__controllers.length = data.controllers.length;


        this.__currentViewMode = 'TabletAndFinger';
    }

    onViewChange(id, data) {
        switch (viewChangeData.interfaceType) {
            case 'MouseAndKeyboard':
                {
                    if (this.__currentViewMode !== 'MouseAndKeyboard') {
                        this.setMouseAndCameraRepresentation();
                    }
                    let geomItem = connectedUsers[id].geomItem;
                    const xfo = new Visualive.Xfo();
                    xfo.fromJSON(data.cameraXfo);
                    geomItem.localXfo = xfo;
                }
                break;
            case 'TabletAndFinger':
                if (this.__currentViewMode !== 'MouseAndKeyboard') {

                }

                break;
            case 'Vive':
                {
                    if (this.__currentViewMode !== 'Vive') {
                        this.setViveRepresentation();
                    }
                    let geomItem = connectedUsers[id].geomItem;
                    const xfo = new Visualive.Xfo();
                    xfo.fromJSON(data.headXfo);
                    geomItem.localXfo = xfo;

                    for(let i=0; i<data.controllers.length; i++)
                    {
                        const controllerXfo = new Visualive.Xfo();
                        controllerXfo.fromJSON(data.controllers[i].xfo);
                        this.__controllers[i].localXfo = controllerXfo;
                    }
                }

                break;
            case 'Daydream':

                break;
            case 'Occulus':

                break;
        }

        this.__renderer.requestRedraw();
    };

    destroy() {
        this.__treeItem.destroy();
    }
};

export {
    UserAvatar
};