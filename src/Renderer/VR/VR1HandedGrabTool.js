import {
    Vec3,
    Xfo
} from '../../Math/Math.js';

class VR1HandedGrabTool {
    constructor(vrStage, vrHead, vrControllers) {

        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
    }

    startAction() {
        if(this.__vrControllers[0].isButtonPressed()){
            this.__activeController = this.__vrControllers[0];
        }
        else if(this.__vrControllers[1].isButtonPressed()){
            this.__activeController = this.__vrControllers[1];
        }
        this.__grabPos = this.__activeController.getTipXfo().tr.clone();
        this.__stageXfo__GrabStart = this.__vrStage.getXfo().clone();
        this.__invOri = this.__stageXfo__GrabStart.ori.inverse();
    }

    endAction() {

    }

    applyAction() {
        let grabPos = this.__activeController.getTipXfo().tr;

        let deltaXfo = new Xfo();
        deltaXfo.tr = this.__grabPos.subtract(grabPos);

        ////////////////
        // Update the stage Xfo
        let stageXfo = this.__stageXfo__GrabStart.multiply(deltaXfo);
        this.__vrStage.setXfo(stageXfo);
    }
};

export {
    VR1HandedGrabTool
};