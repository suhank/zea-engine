import {
    Vec3,
    Xfo
} from '../../Math';

class VRFlyTool {
    constructor(vrStage, vrHead, vrControllers) {

        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
        this.__flySpeed = 2/60;
    }

    startAction() {
        if(this.__vrControllers[0].isButtonPressed()){
            this.__activeController = this.__vrControllers[0];
        }
        else if(this.__vrControllers[1].isButtonPressed()){
            this.__activeController = this.__vrControllers[1];
        }
    }

    endAction() {

    }

    applyAction() {
        let flyDir = this.__activeController.getTipXfo().ori.getZaxis();
        flyDir.scaleInPlace(this.__flySpeed);

        ////////////////
        // Update the stage Xfo
        let stageXfo = this.__vrStage.getXfo(stageXfo);
        stageXfo.tr.addInPlace(flyDir);
        this.__vrStage.setXfo(stageXfo);
    }
};

export {
    VRFlyTool
};