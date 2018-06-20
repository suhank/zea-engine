import {
    Vec3,
    Quat,
    Xfo
} from '../../Math';
import {
    Operator
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
        this.__rodParam = this._addMember(new KinematicGroupParameter('Rod'));
        this.__headParam = this._addMember(new KinematicGroupParameter('Head'));


        this.__pistonAngleParam.valueChanged.connect(this.init.bind(this));
        this.__camPhaseParam.valueChanged.connect(this.init.bind(this));
        this.__camLengthParam.valueChanged.connect(this.init.bind(this));
        this.__rodLengthParam.valueChanged.connect(this.init.bind(this));

        this.__bindXfos = {};
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

        this.__camVec = new Vec3(Math.sin(camPhase * 2.0 * Math.PI)*camLength, 0.0, Math.cos(camPhase * 2.0 * Math.PI)*camLength);


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

        if(this.__rodParam.getCount() > 0)
        {
            const rodxfo = this.__rodParam.getInitialXfo().clone();
            const axisPos = rodxfo.tr.subtract(crankXfo.tr).dot(crankAxis);

            const rotRotation = new Quat();
            rotRotation.setFromAxisAndAngle(crankAxis, -rodAngle);

            rodxfo.tr = crankXfo.tr.add(crankXfo.ori.rotateVec3(this.__camVec));
            rodxfo.tr.addInPlace(crankAxis.scale(axisPos))
            rodxfo.ori = rotRotation.multiply(rodxfo.ori)
            this.__rodParam.setXfo(rodxfo, ValueSetMode.OPERATOR_SETVALUE);
        }

        if(this.__headParam.getCount() > 0)
        {
            const headxfo = this.__headParam.getInitialXfo().clone();
            headxfo.tr.addInPlace(this.__pistonAxis.scale(headOffset-this.__pistonOffset))
            this.__headParam.setXfo(headxfo, ValueSetMode.OPERATOR_SETVALUE);
        }
    }

    clone() {
        const clonedParam = new PistonParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }

    setOwner(owner) {
        this.__owner = owner;
        this.__rodParam.setOwner(owner);
        this.__headParam.setOwner(owner);
    }

    getOwner() {
        return this.__owner;
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

        this.__crankParam = this.addParameter(new KinematicGroupParameter('Crank'));
        this.__crankParam.elementAdded.connect(this.init.bind(this));
        this.__crankParam.elementRemoved.connect(this.init.bind(this));
        this.__outputs[0] = this.__crankParam;
        this.__crankAxisParam = this.addParameter(new Vec3Parameter('CrankAxis', new Vec3(1,0,0)));
        this.__crankAxisParam.valueChanged.connect(this.init.bind(this));
        this.__pistonsParam = this.addParameter(new ListParameter('Pistons', PistonParameter));
        this.__pistonsParam.elementAdded.connect((value, index) => {
            this.__outputs[index+1] = value;
            value.setCrankXfo(this.__baseCrankXfo)
        })
        this.__pistonsParam.elementRemoved.connect((value, index) => {
            this.__outputs.splice(index+1, 1);
        })
        this.init();

        this.__pistons = [];
    }

    setOwner(ownerItem) {
        super.setOwner(ownerItem);
    }

    init(){

        if(this.__crankParam.getCount()==0)
            return;
        this.__baseCrankXfo = new Xfo();
        this.__baseCrankXfo.ori.setFromAxisAndAngle(this.__crankAxisParam.getValue(), 0.0);
        this.__crankOffset = this.__baseCrankXfo.inverse().multiply(this.__crankParam.getInitialXfo());
        const pistons = this.__pistonsParam.getValue();
        for (let piston of pistons)
            piston.setCrankXfo(this.__baseCrankXfo);
    }

    evaluate() {
        if(this.__crankParam.getCount()==0)
            return;

        const revolutions = this.__revolutionsParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
        const crankAxis = this.__crankAxisParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
        // const quat = new Quat();
        // quat.setFromAxisAndAngle(crankAxis, revolutions * Math.PI * 2.0);

        // const crankXfo = this.__crankParam.getInitialXfo().clone();
        // crankXfo.ori = quat.multiply(crankXfo.ori);
        const crankXfo = new Xfo();
        crankXfo.ori.setFromAxisAndAngle(crankAxis, revolutions * Math.PI * 2.0);
        // console.log("Ori:" + crankXfo.ori.toString())
        this.__crankParam.setXfo(crankXfo.multiply(this.__crankOffset), ValueSetMode.OPERATOR_SETVALUE);


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