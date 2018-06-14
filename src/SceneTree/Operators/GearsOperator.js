import {
    Vec3,
    Quat
} from '../../Math';
import {
    Operator
} from './Operator.js';
import {
    ValueSetMode,
    StructParameter,
    Parameter,
    NumberParameter,
    Vec3Parameter,
    ListParameter,
    TreeItemGroupParameter
} from '../Parameters';


class GearParameter extends StructParameter {
    constructor(name) {
        super(name);

        this.__gearGeomsParam = new TreeItemGroupParameter('GearGeoms');
        this.__initialXfos = [];
        this.__gearGeomsParam.elementAdded.connect((elem, index)=>{
            this.__initialXfos[index] = elem.getGlobalXfo();
        })

        this.__ratioParam = this._addMember(new NumberParameter('Ratio', 1.0));
        this.__offsetParam =  this._addMember(new NumberParameter('Offset', 0.0));
        this.__axisParam = this._addMember(new Vec3Parameter('Axis', new Vec3(1,0,0)));
        this._addMember(this.__gearGeomsParam);
    }

    getRatio() {
        return this.__ratioParam.getValue();
    }
    getOffset() {
        return this.__offsetParam.getValue();
    }
    getAxis() {
        return this.__axisParam.getValue();
    }
    getInitialXfo() {
        return this.__gearGeomsParam.getInitialXfo();
    }
    getXfo() {
        return this.__gearGeomsParam.getXfo();
    }
    setXfo(xfo) {
        this.__gearGeomsParam.setXfo(xfo);
    }

    setDirty(cleanerFn) {
        return this.__gearGeomsParam.setDirty(cleanerFn);
    }
    removeCleanerFn(cleanerFn) {
        return this.__gearGeomsParam.removeCleanerFn(cleanerFn);
    }
}

class GearsOperator extends Operator {
    constructor(name) {
        super(name);

        this.__revolutionsParam = this.addParameter(new NumberParameter('Revolutions', 0.0, [0, 1]));
        const rpmParam = this.addParameter(new NumberParameter('RPM', 0.0)); // revolutions per minute
        let timeoutId;
        rpmParam.valueChanged.connect(() => {
            let rpm = rpmParam.getValue();
            if (rpm > 0.0) {
                if (!timeoutId) {
                    const timerCallback = () => {
                        rpm = rpmParam.getValue();
                        const revolutions = this.__revolutionsParam.getValue();
                        this.__revolutionsParam.setValue(revolutions + (rpm * (1 / (50 * 60))));
                        timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
                    };
                    timerCallback();
                }
            } else {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
        });
        this.__gearsParam = this.addParameter(new ListParameter('Gears', GearParameter));
        this.__gearsParam.elementAdded.connect((value, index) => {
            this.__outputs[index] = value;
        })

        this.__gears = [];
    }

    evaluate() {

        const revolutions = this.__revolutionsParam.getValue();
        const gears = this.__gearsParam.getValue();
        const len = gears.length;
        for(let gear of gears) {
            const rot = (revolutions * gear.getRatio()) + gear.getOffset();

            const quat = new Quat();
            quat.setFromAxisAndAngle(gear.getAxis(), rot * Math.PI * 2.0);
            const xfo = gear.getXfo();
            xfo.ori = quat.multiply(gear.getInitialXfo().ori);
            gear.setXfo(xfo, ValueSetMode.OPERATOR_SETVALUE);
        }
    }
};

export {
    GearsOperator
};