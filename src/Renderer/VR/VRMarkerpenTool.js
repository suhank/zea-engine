import Vec3 from '../../Math/Vec3';
import Signal from '../../Math/Signal';
import Mat4 from '../../Math/Mat4';
import Xfo from '../../Math/Xfo';
import Color from '../../Math/Color';

class VRMarkerpenTool {
    constructor(vrStage, vrHead, vrControllers) {
        // super('VRMarkerpenTool');
        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
        this.__activeController = null;

        this.__tipOffsetXfo = new Xfo();
        this.__tipOffsetXfo.tr.set(0.0,-0.01, -0.03);
        this.__color = new Color(1.0, 0.2, 0.2);

        this.strokeStarted = new Signal();
        this.strokeEnded = new Signal();
        this.strokeSegmentAdded = new Signal();
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

        this.strokeStarted.emit({
            type: 'strokeStarted',
            data: {
                xfo: xfo,
                color: this.__color,
                thickness: lineThickness
            }
        });
    }

    endAction() {

    }

    applyAction() {
        let xfo = this.__stageXfo.multiply(this.__activeController.getTipXfo().multiply(this.__tipOffsetXfo));
        // this.addSegmentToStroke(this.__currStrokeID, xfo);

        this.strokeSegmentAdded.emit({
            type: 'strokeSegmentAdded',
            data: {
              xfo: xfo
            }
        });
    }
};

export {
    VRMarkerpenTool
};
//export default VRMarkerpenTool;