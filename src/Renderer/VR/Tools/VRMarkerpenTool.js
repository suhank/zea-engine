import {
    Vec3,
    Color,
    Xfo,
    Signal
} from '../../../Math';
import { VRTool } from '../VRTool.js'

class VRMarkerpenTool extends VRTool {
    constructor(vrStage, vrHead, vrControllers) {
        super();

        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;
        this.__activeController = null;

        this.__tipOffsetXfo = new Xfo();
        this.__tipOffsetXfo.tr.set(0.0,-0.01, -0.03);
        this.__color = new Color(.7, 0.0, 0.0);

        this.strokeStarted = new Signal();
        this.strokeEnded = new Signal();
        this.strokeSegmentAdded = new Signal();

        this.__pressedButtons = 0;
        let bindController = (id, vrController) => {
            vrController.buttonPressed.connect(() => {
                if(!this.__active)
                    return;
                this.__pressedButtons++;
                this.startAction();
            });

            vrController.buttonReleased.connect(() => {
                if(!this.__active)
                    return;
                this.__pressedButtons--;
                this.endAction();
            });

            if(this.__active)
                vrController.setTipColor(this.__color);
        }

        for(let i=0; i<this.__vrControllers.length; i++) {
            if(this.__vrControllers[i])
                bindController(i, this.__vrControllers[i]);
        }
        vrStage.controllerAdded.connect(bindController);
    }

    activateTool() {
        super.activateTool();
        for(let vrController of this.__vrControllers)
            vrController.setTipColor(this.__color);
    }


    startAction() {
        if(this.__vrControllers[0].isButtonPressed()){
            this.__activeController = this.__vrControllers[0];
        }
        else if(this.__vrControllers[1].isButtonPressed()){
            this.__activeController = this.__vrControllers[1];
        }

        let xfo = this.__activeController.getTipGlobalXfo().multiply(this.__tipOffsetXfo);
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

    evalTool() {
        if(this.__pressedButtons == 1) {
            let xfo = this.__activeController.getTipGlobalXfo().multiply(this.__tipOffsetXfo);
            // this.addSegmentToStroke(this.__currStrokeID, xfo);

            this.strokeSegmentAdded.emit({
                type: 'strokeSegmentAdded',
                data: {
                  xfo
                }
            });
        }
    }
};

export {
    VRMarkerpenTool
};