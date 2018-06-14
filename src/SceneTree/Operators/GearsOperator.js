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

        this.__gears = [];
    }


    connectParts(gearBindings) {
        // e.g. [{ path:'.a/b/c', teeth:30, axis: vec3(1,0,0) }, [[{ path:'./foo', teeth:10, axis: vec3(1,0,0)]
        this.__gears = [];
        for (let i = 0; i < gearBindings.length; i++) {
            const gearBinding = gearBindings[i];
            if (!gearBinding) {
                continue;
            }
            const paths = gearBinding.paths;
            if (!paths) {
                paths = [gearBinding.path];
            }
            const offset = 0.0;

            if (gearBinding.offset) {
                offset = gearBinding.offset;
            }


            const outputs = [];
            const deltas = [];
            const initialXfos = [];
            for (let path of paths) {
                const treeItem = this.__ownerItem.resolvePath(path);
                if (treeItem) {
                    const xfoParam = treeItem.getParameter('GlobalXfo');
                    const xfo = xfoParam.getValue().clone();
                    this.__outputs.push(xfoParam);
                    outputs.push({
                        initialXfo: xfo,
                        xfoParam
                    });


                    if (gearBinding.rotationCenter) {
                        const delta = xfo.tr.subtract(gearBinding.rotationCenter);
                        delta.subtractInPlace(gearBinding.axis.scale(delta.dot(gearBinding.axis)));
                        deltas.push(delta);
                    }
                }
            }
            const gear = {
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

        const revolutions = this.__revolutionsParam.getValue();

        const len = this.__gears.length;
        for (let i = 0; i < len; i++) {
            const gear = this.__gears[i];
            const rot = (revolutions * gear.ratio) + gear.offset;

            const quat = new Quat();
            quat.setFromAxisAndAngle(gear.axis, rot * Math.PI * 2.0);

            const len = gear.outputs.length;
            for (let i = 0; i < len; i++) {
                const output = gear.outputs[i];
                const globalXfo = output.xfoParam.getValue(1);
                globalXfo.ori = quat.multiply(output.initialXfo.ori);

                if (gear.deltas) {
                    const delta = gear.deltas[i];
                    const vec = quat.rotateVec3(delta);
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