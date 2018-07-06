
import {
    sgFactory
} from '../../SceneTree/SGFactory.js';


import {
    ValueSetMode,
    Parameter,
    NumberParameter
} from '../../SceneTree/Parameters';
import {
    OperatorOutput
} from '../../SceneTree/Operators';


import {
    StateAction
} from '../StateAction.js';

class SetParameterValue extends StateAction {
    constructor() {
        super()

        this.__outParam = this.addOutput('Param', new OperatorOutput());
        this.__outParam.paramSet.connect(()=>{
            this.__valueParam = this.addParameter('Value', this.__outParam.getInitialValue());
        })
        this.__interpTimeParam = this.addParameter(new NumberParameter('InterpTime', 1.0));
        this.__updateFrequencyParam = this.addParameter(new NumberParameter('UpdateFrequency', 30));
    }

    start(){
        if(this.__outParam.isConnected()){
            const interpTime = this.__interpTimeParam.getValue();
            if(interpTime > 0.0) {
                const updateFrequency = this.__updateFrequencyParam.getValue();
                const paramValueStart = this.__outParam.getValue();
                let step = 0;
                const steps = Math.round(interpTime / (1.0/updateFrequency));
                const timerCallback = () => {
                    step++;
                    if (step < steps) {
                        const t = step / steps;
                        const smooth_t = Math.smoothStep(0.0, 1.0, t);
                        const newVal = Math.lerp(paramValueStart, this.__valueParam.getValue(), smooth_t);
                        // Note: In this case, we want the parameter to emit a notification
                        // and cause the update of the scene. But we also don't want the parameter value to then
                        // be considered modified so it is saved to the JSON file. I'm not sure how to address this.
                        // We need to check what happens if a parameter emits a 'valueChanged' during cleaning. (maybe it gets ignored)
                        this.__outParam.setValue(newVal, ValueSetMode.USER_SETVALUE);
                        this.__timeoutId = window.setTimeout(timerCallback, 1000/updateFrequency);
                    }
                    else {
                        this.__outParam.setValue(this.__valueParam.getValue(), ValueSetMode.USER_SETVALUE);
                        this.__timeoutId = undefined;
                        this.__onDone();
                    }
                };
                timerCallback();
            }
            else {
                this.__outParam.setValue(this.__valueParam.getValue());
                this.__onDone();
            }
        }
    }


    cancel() {
        if(this.__timeoutId){
            clearTimeout(this.__timeoutId);
            this.__timeoutId = undefined;
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON(context);
        j.valueParam = this.__valueParam.toJSON(context);
        j.valueParamType = this.__valueParam.constructor.name;
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);
        if(j.valueParam){
            this.__valueParam = sgFactory.constructClass(j.valueParamType);
            this.__valueParam.fromJSON(j.valueParam, context);
        }
    }
};


sgFactory.registerClass('SetParameterValue', SetParameterValue);
export {
    SetParameterValue
};
