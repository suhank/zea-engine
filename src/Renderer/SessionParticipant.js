import {
    Vec3,
    Xfo,
    Color,
    EulerAngles,
    typeRegistry
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    Cone,
    Cuboid,
    Sphere,
    TreeItem,
    GeomItem,
    Material,
    MarkerpenTool
} from '../SceneTree';

let avatarColors = [
    new Color(0.0, 0.15, 0.15),
    new Color(0.0, 0.85, 0.15),
    new Color(0.0, 0.15, 0.85),
    new Color(0.0, 0.85, 0.85),
    new Color(0.75, 0.15, 0.15),
    new Color(0.75, 0.85, 0.15),
    new Color(0.75, 0.15, 0.85),
    new Color(0.75, 0.85, 0.85)
];
let randomAvatarColor = () => {
    return avatarColors[random(0, avatarColors.length)];
}

let convertValuesFromJSON = (data) => {
    const result = data;
    let fromJSON = (key, value) => {
        value.fromJSON(data[key]);
        data[key] = value;
    }
    for (let key in data) {
        let member = data[key];
        if (member.className) {
            const newval = typeRegistry.getType(member.className).create();
            value.fromJSON(member);
            result[key] = value;
        } else if (Array.isArray(member)) {
            let arr = [];
            for (const element of value)
                arr.push(convertValuesFromJSON(element));
            result[key] = arr;
        } else if (typeof member === "object") {
            convertValuesFromJSON(member);
        }
    }
    return result;
}


let convertValuesToJSON = (data) => {
    const result = data;
    for (let key in result) {
        let member = data[key];
        if (member.toJSON) {
            result[key] = member.toJSON();
            result[key].className = member.constructor.name;
        } else if (Array.isArray(member)) {
            let arr = [];
            for (const element of member)
                arr.push(convertValuesToJSON(element));
            result[key] = arr;
        } else if (typeof member === "object") {
            result[key] = convertValuesToJSON(member);
        }
    }
    return result;
}


class SessionParticipant {

    constructor(renderer, visualivePlatform, parentTreeItem, user, isLocalUser) {
        this.__renderer = renderer;
        this.__parentTreeItem = parentTreeItem;
        this.__user = user;
        this.__isLocalUser = isLocalUser;
        this.__avatarScale = 1.0;

        this.__controllers = [];

        this.__treeItem = new TreeItem(user.id);
        // this.__treeItem.setVisible(visible);

        this.userMarker = new MarkerpenTool('marker');
        this.__treeItem.addChild(this.userMarker.getTreeItem());

        this.__avatarTreeItem = new TreeItem('avatar');
        this.__treeItem.addChild(this.__avatarTreeItem);

        this.__parentTreeItem.addChild(this.__treeItem);
        this.__treeItem.setSelectable(false);

        this.__material = new Material('user' + user.id + 'Material', 'SimpleSurfaceShader');
        this.__material.addParameter('baseColor', new Color(data.color.r, data.color.g, data.color.b));


        if (isLocalUser) {
            const sendMessage = (type, data, persisted){
                data.type = type;
                data.userId = this.__user.id;
                visualivePlatform.sendMessage(convertValuesToJSON(data), persisted);
            }

            renderer.viewChanged.connect((data) => {
                sendMessage('viewChanged', data, false);
            });

            renderer.pointerMoved.connect((data) => {
                sendMessage('pointerMoved', data, false);
            });

            renderer.actionStarted.connect((data) => {
                const storkeData = this.onStrokeStarted(data);
                sendMessage('strokeStarted', storkeData, true);
            });
            renderer.actionOccuring.connect((data) => {
                this.onStrokePoint(data);
                sendMessage('strokeSegmentAdded', data, true);
            });
            renderer.actionEnded.connect((msg) => {
                this.onStrokeEnded(msg);
                sendMessage('strokeEnded', msg, true);
            });
        } else {
            this.setBasicCamera();
        }
    }

    setVisibility(visible) {
        this.__treeItem.setVisible(visible);
    }

    onPointerMoved(data) {
        // TODO: show a pointer beam.
    }

    onStrokeStarted(data) {
        return this.userMarker.startStroke(data.xfo);
    }
    onStrokePoint(data) {
        this.userMarker.addSegmentToStroke(data.xfo);
    }
    onStrokeEnded(data) {
        this.userMarker.endStroke();
    }

    setBasicCamera() {
        this.__avatarTreeItem.removeAllChildren();

        //let shape = new Cuboid('Camera', 0.2 * this.__avatarScale, 0.2 * this.__avatarScale, 0.4 * this.__avatarScale);
        let shape = new Cone('Camera', 0.4 * this.__avatarScale, 0.6, 4, true);
        shape.computeVertexNormals();
        let geomItem = new GeomItem(this.__id, shape, this.__material);
        let geomXfo = new Xfo();
        geomXfo.ori.setFromEulerAngles(new EulerAngles(Math.PI * 0.5, Math.PI * 0.25, 0.0));
        geomItem.setGeomOffsetXfo(geomXfo);

        this.__avatarTreeItem.addChild(geomItem);

        this.__currentViewMode = 'BasicCamera';
    }

    setViveRepresentation() {
        if (renderer.getScene().getResourceLoader().resourceAvailable("VisualiveEngine/Vive.vla")) {

            this.__avatarTreeItem.removeAllChildren();

            if (!this.__viveAsset) {
                this.__viveAsset = renderer.getScene().loadCommonAssetResource("VisualiveEngine/Vive.vla");
                this.__viveAsset.getMaterialLibrary().setMaterialTypeMapping({
                    '*': 'SimpleSurfaceShader'
                });
            }

            this.__viveAsset.loaded.connect((entries) => {
                let hmdTree = this.__viveAsset.getChildByName('HTC_Vive_HMD').clone();
                hmdTree.getLocalXfo().ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
                let treeItem = new TreeItem("hmdHolder");
                treeItem.addChild(hmdTree);
            });
        }
        // this.__treeItem.addChild(treeItem);
        this.__switchReprentationTree(this.__viveTree);
        this.__currentViewMode = 'Vive';
    }

    updateViveControllers(data) {
        for (let i = 0; i < data.controllers.length; i++) {
            if (i >= this.__controllers.length) {

                let treeItem = new TreeItem("handleHolder" + i);

                this.__viveAsset.loaded.connect(() => {
                    let controllerTree = this.__viveAsset.getChildByName('HTC_Vive_Controller').clone();
                    controllerTree.getLocalXfo().tr.set(0, -0.035, 0.01);
                    controllerTree.getLocalXfo().ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
                    treeItem.addChild(controllerTree);
                });


                this.__avatarTreeItem.addChild(treeItem);
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

    onViewChanged(data) {
        switch (data.interfaceType) {
            case 'BasicCamera':
                if (this.__currentViewMode !== 'BasicCamera') {
                    this.setBasicCamera(data);
                }
                this.__avatarTreeItem.getChild(0).setLocalXfo(data.viewXfo);
                break;
            case 'TabletAndFinger':
                if (this.__currentViewMode !== 'BasicCamera') {

                }
                break;
            case 'Vive':
                if (this.__currentViewMode !== 'Vive') {
                    this.setViveRepresentation(data);
                }

                this.__viveTree.getChild(0).setLocalXfo(data.viewXfo);
                if (data.controllers)
                    this.updateViveControllers(data);
                break;
            case 'Daydream':
                break;
            case 'Occulus':
                break;
        }

        //this.__treeItem.requestRedraw();
    };


    onUserMessage(data) {
        const tmp = convertValuesFromJSON(data)
        if (tmp.type == 'viewChanged') {
            this.onViewChanged(tmp);
        } else if (tmp.type == 'pointerMoved') {
            this.onPointerMoved(tmp);
        } else if (tmp.type == 'strokeStarted') {
            this.onStrokeStarted(tmp);
        } else if (tmp.type == 'strokePoint') {
            this.onStrokePoint(tmp);
        } else if (tmp.type == 'strokeEnded') {
            this.onStrokeEnded(tmp);
        }
    }

    destroy() {
        this.__parentTreeItem.removeChildByHandle(this.__treeItem);
        // Notr: the marker pen tool stays, as we don't want lines
        // dissappearing after a user quits.
    }
};

export {
    SessionParticipant
};
//export default SessionParticipant;