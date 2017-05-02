import {
    Xfo
} from '../../Math';

class VRToolHoldObj2Handed {
    constructor(vrStage, vrHead, vrControllers) {

        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
    }

    startAction() {
        let xfo0 = this.__vrControllers[0].getTipXfo().tr;
        let xfo1 = this.__vrControllers[1].getTipXfo().tr;
        let grabXfo = new Xfo();
        grabXfo.tr = xfo0.tr.lerp(xfo1.tr, 0.5);
        grabXfo.ori = xfo0.ori.lerp(xfo1.ori, 0.5);

        // 
    }

    endAction() {

    }

    applyAction() {
        let p0 = this.__vrControllers[0].getTipXfo().tr;
        let p1 = this.__vrControllers[1].getTipXfo().tr;

        let grabPos = p0.lerp(p1, 0.5);
        let grabDir = p1.subtract(p0);

        let deltaXfo = new Xfo();

        ////////////////
        // Compute sc
        let sc = this.__grabDist / grabDir.length();
        // Limit to a 10x change in scale per grab.
        sc = Math.max(Math.min(sc, 10.0), 0.1);

        // Avoid causing a scale that would make the user < 1.0 scale factor.
        let stageSc = this.__stageXfo__GrabStart.sc.x * sc;
        if(stageSc < 1.0){
            sc = 1.0 / this.__stageXfo__GrabStart.sc.x;
        }

        deltaXfo.sc.set(sc, sc, sc);

        ////////////////
        // Compute ori
        grabDir.y = 0.0;
        grabDir.normalizeInPlace();
        let angle = this.__grabDir.angleTo(grabDir);
        if(this.__grabDir.cross(grabDir).y > 0.0){
            angle = -angle;
        }
        deltaXfo.ori.rotateY(angle);

        // Rotate around the point between the hands.
        let oriTrDelta = deltaXfo.ori.rotateVec3(this.__grabPos);
        deltaXfo.tr.addInPlace(this.__grabPos.subtract(oriTrDelta));

        // Scale around the point between the hands.
        let deltaSc = this.__grabPos.scale(1.0-sc);
        deltaXfo.tr.addInPlace(deltaXfo.ori.rotateVec3(deltaSc));

        ////////////////
        // Compute tr
        // Not quite working.....
        let deltaTr = this.__grabPos.subtract(grabPos).scale(sc);
        deltaXfo.tr.addInPlace(deltaXfo.ori.rotateVec3(deltaTr));



        ////////////////
        // Update the stage Xfo
        let stageXfo = this.__stageXfo__GrabStart.multiply(deltaXfo);
        this.__vrStage.setXfo(stageXfo);
    }


};

export {
    VRToolHoldObj2Handed
};