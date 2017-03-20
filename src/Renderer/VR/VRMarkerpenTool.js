import {
    Vec3,
    Color,
    Xfo
} from '../../Math';
import {
    Lines,
    GeomItem,
    FatLinesMaterial,
    MarkerpenTool
} from '../../SceneTree';

class VRMarkerpenTool extends MarkerpenTool {
    constructor(vrStage, vrHead, vrControllers) {
        super('VRMarkerpenTool');
        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
        this.__activeController = null;

        this.__tipOffsetXfo = new Xfo();
        this.__tipOffsetXfo.tr.set(0.0,-0.01, -0.03);

        this.__vrStage.getCollector().addTreeItem(this.getTreeItem());
    }

    startAction() {
        if(this.__vrControllers[0].isButtonPressed()){
            this.__activeController = this.__vrControllers[0];
        }
        else if(this.__vrControllers[1].isButtonPressed()){
            this.__activeController = this.__vrControllers[1];
        }
        this.__stageXfo = this.__vrStage.getXfo();

        let xfo = this.__stageXfo.multiply(this.__activeController.getTipXfo().multiply(this.__tipOffsetXfo));
        let sc = this.__vrStage.getXfo().sc;
        let lineThickness = 0.0075 * sc.x;
        this.startStroke(xfo, new Color(1.0, 0.2, 0.2), lineThickness);
    }

    endAction() {

    }

    applyAction() {
        let xfo = this.__stageXfo.multiply(this.__activeController.getTipXfo().multiply(this.__tipOffsetXfo));
        this.addSegmentToStroke(xfo);
    }
};

export {
    MarkerpenTool
};