import {
    Vec3,
    Quat
} from '../../Math';
import {
    Operator
} from './Operator.js';
import {
    StructParameter,
    Parameter,
    NumberParameter
} from '../Parameters';


class GearParameter extends StructParameter {
    constructor(name) {
        super(name);

        this.__gearGeomsParam = new TreeItemListParameter('GearGeoms');
        this.__initialXfos = [];
        gearGeomsParam.elementAdded.connect((elem, index)=>{
            this.__initialXfos[index] = elem.getGlobalXfo();
        })

        this._addMember(new NumberParameter('Ratio', 1.0));
        this._addMember(new NumberParameter('Offset', 0.0));
        this._addMember(new Vec3Parameter('Axis', new Vec3(1,0,0)));
        this._addMember(this.__gearGeomsParam);
    }

    getValue(mode = ValueGetMode.NORMAL) {
        const result = super.fromJSON(mode);
        result.initialXfos = this.__initialXfos;
        return result;
    }

    //////////////////////////////////////////
    // Persistence

    fromJSON(j) {
        super.fromJSON(j);

        const geoms = this.__gearGeomsParam.getValue();
        this.__initialXfos = [];
        for(let i=0; i<geoms.length; i++) {
            this.__initialXfos[index] = geoms[i].getGlobalXfo();
        }
    }
}

class GearsOperator extends Operator {
    constructor(name) {
        super(name);

        this.__revolutionsParam = this.addParameter(new NumberParameter('Revolutions', 0.0, [0, 1]));
        const rpmParam = this.addParameter(new NumberParameter('RPM', 0.0)); // revolutions per minute
        let timeoutId;
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
        this.__gearsParam = this.addParameter(new ListParameter('Gears', GearParameter));

        this.__gears = [];
    }


    connectParts(gearBindings) {
        const gearBindings = this.__gearsParam.getValue();
        // e.g. [{ path:'.a/b/c', ratio:30, axis: vec3(1,0,0) }, [[{ path:'./foo', ratio:10, axis: vec3(1,0,0)]
        this.__gears = [];
        for (let i = 0; i < gearBindings.length; i++) {
            const gearBinding = gearBindings[i];
            const treeItems = gearBinding.GearGeoms;
            const offset = gearBinding.Offset;


            const outputs = [];
            const deltas = [];
            const initialXfos = [];
            for (let treeItem of treeItems) {
                if (treeItem) {
                    const xfoParam = treeItem.getParameter('GlobalXfo');
                    const xfo = xfoParam.getValue().clone();
                    this.__outputs.push(xfoParam);
                    outputs.push({
                        initialXfo: xfo,
                        xfoParam,
                        offset: 
                    });
                    // if (gearBinding.rotationCenter) {
                    //     const delta = xfo.tr.subtract(gearBinding.rotationCenter);
                    //     delta.subtractInPlace(gearBinding.axis.scale(delta.dot(gearBinding.axis)));
                    //     deltas.push(delta);
                    // }
                }
            }
            this.__gears.push({
                axis: gearBinding.Axis,
                ratio: gearBinding.Ratio,
                offset,
                initialXfos,
                outputs,
            });
        }
    }


    __connectParts(gearBindings) {
        // e.g. [{ path:'.a/b/c', ratio:30, axis: vec3(1,0,0) }, [[{ path:'./foo', ratio:10, axis: vec3(1,0,0)]
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