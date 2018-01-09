import {
    Vec3,
    Quat
} from '../../Math';
import {
    Operator
} from './Operator.js';
import {
    Parameter
} from '../Parameters/Parameter.js';
import {
    NumberParameter
} from '../Parameters/NumberParameter.js';

class GearsOperator extends Operator {
    constructor(ownerItem) {
        super(ownerItem);

        this.__revolutionsParam = this.addParameter(new NumberParameter('Revolutions', 0.0, [0, 1]));
        let rpmParam = this.addParameter(new NumberParameter('RPM', 0.0)); // revolutions per minute
        let timeoutId;
        rpmParam.valueChanged.connect(() => {
            let rpm = rpmParam.getValue();
            if (rpm > 0.0) {
                if (!timeoutId) {
                    let timerCallback = () => {
                        rpm = rpmParam.getValue();
                        let revolutions = this.__revolutionsParam.getValue();
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

        this.__gears = [];
    }


    connectParts(gearBindings) {
        // e.g. [{ path:'.a/b/c', teeth:30, axis: vec3(1,0,0) }, [[{ path:'./foo', teeth:10, axis: vec3(1,0,0)]
        this.__gears = [];
        for (let i = 0; i < gearBindings.length; i++) {
            let gearBinding = gearBindings[i];
            if (!gearBinding) {
                continue;
            }
            let paths = gearBinding.paths;
            if (!paths) {
                paths = [gearBinding.path];
            }
            let offset = 0.0;

            if (gearBinding.offset) {
                offset = gearBinding.offset;
            }


            let outputs = [];
            let deltas = [];
            let initialXfos = [];
            for (let path of paths) {
                let treeItem = this.__ownerItem.resolvePath(path);
                if (treeItem) {
                    let xfoParam = treeItem.getParameter('globalXfo');
                    let xfo = xfoParam.getValue().clone();
                    this.__outputs.push(xfoParam);
                    outputs.push({
                        initialXfo: xfo,
                        xfoParam
                    });


                    if (gearBinding.rotationCenter) {
                        let delta = xfo.tr.subtract(gearBinding.rotationCenter);
                        delta.subtractInPlace(gearBinding.axis.scale(delta.dot(gearBinding.axis)));
                        deltas.push(delta);
                    }
                }
            }
            let gear = {
                axis: gearBinding.axis,
                ratio: gearBinding.ratio,
                offset,
                initialXfos,
                outputs,
            };
            if (deltas.length > 0)
                gear.deltas = deltas;

            this.__gears.push(gear);
        }
    }

    evaluate() {

        let revolutions = this.__revolutionsParam.getValue();

        const len = this.__gears.length;
        for (let i = 0; i < len; i++) {
            const gear = this.__gears[i];
            let rot = (revolutions * gear.ratio) + gear.offset;

            let quat = new Quat();
            quat.setFromAxisAndAngle(gear.axis, rot * Math.PI * 2.0);

            const len = gear.outputs.length;
            for (let i = 0; i < len; i++) {
                const output = gear.outputs[i];
                let globalXfo = output.xfoParam.getValue(1);
                globalXfo.ori = quat.multiply(output.initialXfo.ori);

                if (gear.deltas) {
                    let delta = gear.deltas[i];
                    let vec = quat.rotateVec3(delta);
                    vec.subtractInPlace(gear.axis.scale(vec.dot(gear.axis)));
                    vec.addInPlace(gear.axis.scale(globalXfo.tr.dot(gear.axis)));
                    globalXfo.tr = vec;
                }
                output.xfoParam.setValue(globalXfo, 1);
            }
        }
    }
};

export {
    GearsOperator
};