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

        this.__revolutionsParam = this.addParameter(new NumberParameter('Revolutions', 0.0, [0,1]));
        let rpmParam = this.addParameter(new NumberParameter('RPM', 0.0)); // revolutions per minute
        let timeoutId;
        rpmParam.valueChanged.connect(()=>{
            let rpm = rpmParam.getValue();
            if(rpm > 0.0) {
                if(!timeoutId) {
                    let timerCallback = () => {
                        rpm = rpmParam.getValue();
                        let revolutions = this.__revolutionsParam.getValue();
                        this.__revolutionsParam.setValue(revolutions += (rpm * (1/(50 * 60))) );
                        timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
                    };
                    timerCallback();
                }
            }
            else {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
        });

        this.__gears = [];
    }


    connectParts(gearBindings) {
        // e.g. [{ path:'.a/b/c', teeth:30, axis: vec3(1,0,0) }, [[{ path:'./foo', teeth:10, axis: vec3(1,0,0)]
        this.__gears = [];
        for(let i=0; i<gearBindings.length; i++) {
            let gearBinding = gearBindings[i];
            if(!gearBinding){
                continue;
            }
            let paths = gearBinding.paths;
            if(!paths) {
                paths = [gearBinding.path];
            }
            let outputs = [];
            let initialXfos = [];
            for(let path of paths) {
                let treeItem = this.__ownerItem.resolvePath(path);
                if(treeItem) {
                    let xfoParam = treeItem.getParameter('globalXfo');
                    this.__outputs.push(xfoParam);
                    outputs.push({
                        initialXfo: xfoParam.getValue().clone(),
                        xfoParam
                    });
                }
            }
            this.__gears.push({
                axis: gearBinding.axis,
                ratio: gearBinding.ratio,
                initialXfos,
                outputs
            });
        }
    }

    evaluate(){

        let revolutions = this.__revolutionsParam.getValue();
        for(let i=0; i<this.__gears.length; i++) {
            let gear = this.__gears[i];
            revolutions *= gear.ratio;

            let quat = new Quat();
            quat.setFromAxisAndAngle(gear.axis, revolutions * Math.PI * 2.0);

            for(let output of gear.outputs){
                let globalXfo = output.xfoParam.getValue();
                globalXfo.ori = quat.multiply(output.initialXfo.ori);
                output.xfoParam.setValue(globalXfo);
            }
        }
    }
};

export {
    GearsOperator
};
