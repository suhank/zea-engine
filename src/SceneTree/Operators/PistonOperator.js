import {
    Vec3,
    Quat
} from '../../Math';
import {
    Operator
} from './Operator.js';
import {
    ValueGetMode,
    ValueSetMode,
    Parameter,
    StructParameter,
    TreeItemParameter
} from '../Parameters';
import {
    NumberParameter
} from '../Parameters/NumberParameter.js';

class PistonParameter extends StructParameter {
    constructor() {
        super('Piston');

        this.__rodOffsetParam = this._addMember(new Vec3Parameter('RodOffset'));

        // The first RodItem added causes the rodOffset to be computed.
        this.__rodParam = this._addMember(new ListParameter('Rod', TreeItemParameter));
        this.__pistonParam = this._addMember(new ListParameter('Piston', TreeItemParameter));

        this.__bindXfos = {};
    }
    
    clone() {
        const clonedParam = new PistonParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }

    setOwner(owner) {
        this.__owner = owner;
        this.__rodParam.setOwner(owner);
        this.__pistonParam.setOwner(owner);
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
        const timeoutId;
        rpmParam.valueChanged.connect(() => {
            const rpm = rpmParam.getValue();
            if (rpm > 0.0) {
                if (!timeoutId) {
                    const timerCallback = () => {
                        rpm = rpmParam.getValue();
                        const revolutions = this.__revolutionsParam.getValue();
                        this.__revolutionsParam.setValue(revolutions += (rpm * (1 / (50 * 60))));
                        timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
                    };
                    timerCallback();
                }
            } else {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
        });

        this.__crankParam = this.addParameter(new TreeItemParameter('Crank', (treeItem)=> true ));
        this.__crankAxisParam = this.addParameter(new TreeItemParameter('CrankAxis', (treeItem)=> true ));
        this.__pistonsParam = this.addParameter(new ListParameter('Pistons', PistonParameter));
        this.__pistonsParam.valueChanged.connect((mode) => { 
            if(mode == ValueSetMode.USER_SETVALUE) this.init.bind(this) 
        })

        this.__pistons = [];
    }

    setOwner(ownerItem) {
        super.setOwner(ownerItem);
    }

    init(){

        const crank = this.__crankParam.getValue();
        if(!crank)
            return;
        
        const rods = this.__crankParam.getValue();
        const pistons = this.__pistonsParam.getValue();
        if(rods.length != pistons.length)
            return;

        const len = this.__pistons.length;
        for (let i = 0; i < len; i++) {
            const piston = this.__pistons[i].getValue();
        }
    }

    evaluate() {

        const crank = this.__crankParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
        if(!crank)
            return;

        const revolutions = this.__revolutionsParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
        const axis = this.__crankAxisParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
        const quat = new Quat();
        quat.setFromAxisAndAngle(axis, revolutions * Math.PI * 2.0);



        const len = this.__pistons.length;
        for (let i = 0; i < len; i++) {
            const piston = this.__pistons[i];
            const rot = (revolutions * piston.ratio) + piston.offset;

            const quat = new Quat();
            quat.setFromAxisAndAngle(piston.axis, rot * Math.PI * 2.0);

            const bigEndPos = quat.rotateVec3();
            .getValue(ValueGetMode.OPERATOR_GETVALUE)

            const len = piston.rodItems.length;
            for (let i = 0; i < len; i++) {
                const rodItem = piston.rodItems[i];
                const globalXfo = rodItem.xfoParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
                globalXfo.ori = quat.multiply(rodItem.initialXfo.ori);

                if (piston.deltas) {
                    const delta = piston.deltas[i];
                    const vec = quat.rotateVec3(delta);
                    vec.subtractInPlace(piston.axis.scale(vec.dot(piston.axis)));
                    vec.addInPlace(piston.axis.scale(globalXfo.tr.dot(piston.axis)));
                    globalXfo.tr = vec;
                }
                output.xfoParam.setValue(globalXfo, 1);
            }

            const len = piston.headItems.length;
            for (let i = 0; i < len; i++) {
                const output = piston.outputs[i];
                const globalXfo = output.xfoParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
                globalXfo.ori = quat.multiply(output.initialXfo.ori);

                if (piston.deltas) {
                    const delta = piston.deltas[i];
                    const vec = quat.rotateVec3(delta);
                    vec.subtractInPlace(piston.axis.scale(vec.dot(piston.axis)));
                    vec.addInPlace(piston.axis.scale(globalXfo.tr.dot(piston.axis)));
                    globalXfo.tr = vec;
                }
                output.xfoParam.setValue(globalXfo, 1);
            }
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
};

export {
    PistonOperator
};