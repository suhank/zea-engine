import {
    Vec3,
    Color,
    Xfo
} from '../../Math/Math.js';
import {
    Lines,
    GeomItem,
    FatLinesMaterial
} from '../../SceneTree/SceneTree.js';

class MarkerpenTool {
    constructor(vrStage, vrHead, vrControllers) {
        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
        this.__activeController = null;
        this.__strokeCount = 0;

        this.__tipOffsetXfo = new Xfo();
        this.__tipOffsetXfo.tr.set(0.0,-0.01, -0.03);
    }

    startAction() {
        if(this.__vrControllers[0].isButtonPressed()){
            this.__activeController = this.__vrControllers[0];
        }
        else if(this.__vrControllers[1].isButtonPressed()){
            this.__activeController = this.__vrControllers[1];
        }
        this.__startPos = this.__activeController.getTipXfo().tr;
        this.__stageXfo = this.__vrStage.getXfo();

        this.__lineGeom = new Lines('MarkerpenTool_Stroke');
        let sc = this.__vrStage.getXfo().sc;
        this.__lineGeom.lineThickness = 0.0075 * sc.x;

        this.__used = 0;
        this.__vertexCount = 100;
        this.__lineGeom.setNumVertices(this.__vertexCount);
        this.__lineGeom.setNumSegments(this.__vertexCount-1);
        let pos = this.__activeController.getTipXfo().multiply(this.__tipOffsetXfo).tr;
        let scenePos = this.__stageXfo.transformVec3(pos);
        this.__lineGeom.vertices.setValue(this.__used, scenePos);

        this.__material = new FatLinesMaterial('stroke');
        this.__material.color = new Color(1.0, 0.2, 0.2);

        let geomItem = new GeomItem('MarkerpenTool_Stroke'+this.__strokeCount, this.__lineGeom, this.__material);
        this.__vrStage.getRenderer().getScene().getRoot().addChild(geomItem);

        this.__strokeCount++;
    }

    endAction() {

    }

    applyAction() {
        this.__used++;

        let realloc = false;
        if(this.__used >= this.__lineGeom.getNumSegments()){
            this.__vertexCount = this.__vertexCount * 2;
            this.__lineGeom.setNumVertices(this.__vertexCount);
            this.__lineGeom.setNumSegments(this.__vertexCount-1);
            realloc = true;
        }

        let pos = this.__activeController.getTipXfo().multiply(this.__tipOffsetXfo).tr;
        let scenePos = this.__stageXfo.transformVec3(pos);
        this.__lineGeom.vertices.setValue(this.__used, scenePos);

        this.__lineGeom.setSegment(this.__used-1, this.__used-1, this.__used);

        if(realloc){
            this.__lineGeom.geomDataTopologyChanged.emit();
        }
        else{
            this.__lineGeom.geomDataChanged.emit({'indicesChanged':true});
        }
    }
};

export {
    MarkerpenTool
};