import {
    Vec3,
    Quat,
    Xfo
} from '../../Math';
import {
    Operator,
    XfoOperatorOutput
} from './Operator.js';
import {
    ValueGetMode,
    ValueSetMode,
    Parameter,
    NumberParameter,
    Vec3Parameter,
    StructParameter,
    TreeItemParameter,
    ListParameter,
    KinematicGroupParameter
} from '../Parameters';
import {
    NumberParameter
} from '../Parameters/NumberParameter.js';

import {
    sgFactory
} from '../SGFactory.js';

class PistonParameter extends StructParameter {
    constructor() {
        super('Piston');

        // this.__pistonAxisParam = this._addMember(new Vec('Axis', 0));
        this.__pistonAngleParam = this._addMember(new NumberParameter('PistonAngle', 0));
        this.__camPhaseParam = this._addMember(new NumberParameter('CamPhase', 0));
        this.__camLengthParam = this._addMember(new NumberParameter('CamLength', 3));
        this.__rodLengthParam = this._addMember(new NumberParameter('RodLength', 3));

        // The first RodItem added causes the rodOffset to be computed.
        this.__rodoutput = new XfoOperatorOutput();
        this.__capoutput = new XfoOperatorOutput();


        this.__pistonAngleParam.valueChanged.connect(this.init.bind(this));
        this.__camPhaseParam.valueChanged.connect(this.init.bind(this));
        this.__camLengthParam.valueChanged.connect(this.init.bind(this));
        this.__rodLengthParam.valueChanged.connect(this.init.bind(this));

        this.__bindXfos = {};
    }
    getRodOutput() {
        return this.__rodoutput;
    }

    getCapOutput() {
        return this.__capoutput;
    }

    setCrankXfo(baseCrankXfo){
        this.__baseCrankXfo = baseCrankXfo;
        this.init();
    }
    init(){
        if(!this.__baseCrankXfo)
            return;

        const camPhase = this.__camPhaseParam.getValue();
        const camLength = this.__camLengthParam.getValue();
        const rodLength = this.__rodLengthParam.getValue();
        const pistonAngle = this.__pistonAngleParam.getValue();
        const crankVec = new Vec3(Math.sin(Math.degToRad(pistonAngle)), 0.0, Math.cos(Math.degToRad(pistonAngle)))
        this.__pistonAxis = this.__baseCrankXfo.ori.rotateVec3(crankVec);
        // this.__pistonOffset = Math.cos(camPhase * 2.0 * Math.PI)*camLength;

        this.__camVec = new Vec3(Math.sin(camPhase * 2.0 * Math.PI)*camLength, Math.cos(camPhase * 2.0 * Math.PI)*camLength, 0.0);


        const camAngle = (camPhase) * 2.0 * Math.PI;
        const bigEndOffset = Math.sin(camAngle) * camLength;
        const rodAngle = Math.asin(bigEndOffset / rodLength);
        const headOffset = Math.sqrt(rodLength * rodLength - bigEndOffset * bigEndOffset) + (Math.cos(camAngle) * camLength);
        this.__pistonOffset = headOffset;
    }

    evaluate(crankXfo, crankAxis, revolutions) {

        const camPhase = this.__camPhaseParam.getValue();
        const camLength = this.__camLengthParam.getValue();
        const rodLength = this.__rodLengthParam.getValue();
        const camAngle = (camPhase + revolutions) * 2.0 * Math.PI;

        const bigEndOffset = Math.sin(camAngle) * camLength;
        const rodAngle = Math.asin(bigEndOffset / rodLength);
        const headOffset = Math.sqrt(rodLength * rodLength - bigEndOffset * bigEndOffset) + (Math.cos(camAngle) * camLength);


        if(this.__rodoutput.isConnected())
        {
            const rodxfo = this.__rodoutput.getInitialValue().clone();
            const axisPos = rodxfo.tr.subtract(crankXfo.tr).dot(crankAxis);

            const rotRotation = new Quat();
            rotRotation.setFromAxisAndAngle(crankAxis, -rodAngle);

            rodxfo.tr = crankXfo.tr.add(crankXfo.ori.rotateVec3(this.__camVec));
            rodxfo.tr.addInPlace(crankAxis.scale(axisPos))
            rodxfo.ori = rotRotation.multiply(rodxfo.ori);
            this.__rodoutput.setValue(rodxfo);
        }

        if(this.__capoutput.isConnected())
        {
            const headxfo = this.__capoutput.getInitialValue().clone();
            headxfo.tr.addInPlace(this.__pistonAxis.scale(headOffset-this.__pistonOffset))
            this.__capoutput.setValue(headxfo);
        }
    }

    clone() {
        const clonedParam = new PistonParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }

    setOwner(owner) {
        this.__owner = owner;
    }

    getOwner() {
        return this.__owner;
    }



    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON();
        // if(j){
        //     j.rodOutput = this.__rodoutput.toJSON(context);
        //     j.capOutput = this.__capoutput.toJSON(context);
        // }
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);
        if(j.rodOutput){
            this.__rodoutput.fromJSON(j.rodOutput, context);
        }
        if(j.capOutput){
            this.__capoutput.fromJSON(j.capOutput, context);
        }
    }

};


class PistonOperator extends Operator {
    constructor(name) {
        super(name);

        this.__revolutionsParam = this.addParameter(new NumberParameter('Revolutions', 0.0, [0, 1]));
        const rpmParam = this.addParameter(new NumberParameter('RPM', 0.0)); // revolutions per minute
        rpmParam.valueChanged.connect(() => {
            let rpm = rpmParam.getValue();
            if (rpm > 0.0) {
                if (!this.__timeoutId) {
                    const timerCallback = () => {
                        rpm = rpmParam.getValue();
                        const revolutions = this.__revolutionsParam.getValue();
                        this.__revolutionsParam.setValue(revolutions + (rpm * (1 / (50 * 60))));
                        this.__timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
                    };
                    timerCallback();
                }
            } else {
                clearTimeout(this.__timeoutId);
                this.__timeoutId = undefined;
            }
        });

        // this.__crankParam = this.addParameter(new KinematicGroupParameter('Crank'));
        this.__crankOutput = this.addOutput(new XfoOperatorOutput());
        this.__crankOutput.paramSet.connect(this.init.bind(this));
        // this.__crankParam.elementAdded.connect(this.init.bind(this));
        // this.__crankParam.elementRemoved.connect(this.init.bind(this));
        // this.__outputs[0] = this.__crankParam;
        this.__crankAxisParam = this.addParameter(new Vec3Parameter('CrankAxis', new Vec3(1,0,0)));
        this.__crankAxisParam.valueChanged.connect(this.init.bind(this));
        this.__pistonsParam = this.addParameter(new ListParameter('Pistons', PistonParameter));
        this.__pistonsParam.elementAdded.connect((value, index) => {
            this.__outputs[index+1] = value;
            value.setCrankXfo(this.__baseCrankXfo)

            this.addOutput(value.getRodOutput());
            this.addOutput(value.getCapOutput());
        })
        this.__pistonsParam.elementRemoved.connect((value, index) => {
            this.__outputs.splice(index+1, 1);
        })

        this.__baseCrankXfo = new Xfo();
        this.__pistons = [];
    }

    setOwner(ownerItem) {
        super.setOwner(ownerItem);
    }

    getCrankOutput() {
        return this.__crankOutput;
    }

    init(){
        this.__baseCrankXfo.ori.setFromAxisAndAngle(this.__crankAxisParam.getValue(), 0.0);
        const pistons = this.__pistonsParam.getValue();
        for (let piston of pistons)
            piston.setCrankXfo(this.__baseCrankXfo);

        if(this.__crankOutput.isConnected())
            this.__crankOffset = this.__baseCrankXfo.inverse().multiply(this.__crankOutput.getInitialValue());
    }

    evaluate() {

        const revolutions = this.__revolutionsParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
        const crankAxis = this.__crankAxisParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
        const quat = new Quat();
        quat.setFromAxisAndAngle(crankAxis, revolutions * Math.PI * 2.0);


        const crankXfo = this.__crankOutput.getValue();
        crankXfo.ori = quat.multiply(this.__crankOutput.getInitialValue().ori);
        this.__crankOutput.setValue(crankXfo);

        const pistons = this.__pistonsParam.getValue();
        const len = pistons.length;
        for (let i = 0; i < len; i++) {
            const piston = pistons[i];
            piston.evaluate(crankXfo, crankAxis, revolutions);
        }
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        return super.toJSON(context);
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);
        this.init();
    }


    destroy(){
        clearTimeout(this.__timeoutId);
        super.destroy();
    };
};


sgFactory.registerClass('PistonOperator', PistonOperator);


export {
    PistonOperator
};