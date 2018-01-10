

import {
    Parameter,
    NumberParameter
} from '../../SceneTree/Parameters';
import {
    StateAction
} from '../StateAction.js';

class SetParameterValue extends StateAction {
    constructor(state) {
        super(state)

        this.__pathParam = this.addParameter('path', "");
        this.__pathParam.valueChanged.connect((changeType)=>{
            this.__parameter = this.__state.getStateMachine().getTreeItem().resolvePath(this.__pathParam.getValue());

            // Initialize the value param with the same value as the boudn parameter
            this.__valueParam = this.addParameter('value', this.__parameter.getValue());
        });
        this.__interpTimeParam = this.addParameter(new NumberParameter('interpTime', 1.0));
        this.__updateFrequencyParam = this.addParameter(new NumberParameter('updateFrequency', 30));
    }

    start(){

        if(this.__parameter){
            const interpTime = this.__interpTimeParam.getValue();
            if(interpTime > 0.0) {
                const updateFrequency = this.__updateFrequencyParam.getValue();
                const paramValueStart = this.__parameter.getValue();
                let step = 0;
                const steps = Math.round(interpTime / (1.0/updateFrequency));
                const timerCallback = () => {
                    step++;
                    if (step < steps) {
                        const t = step / steps;
                        const smooth_t = Math.smoothStep(0.0, 1.0, t);
                        this.__parameter.setValue(Math.lerp(paramValueStart, this.__valueParam.getValue(), smooth_t));
                        this.__timeoutId = window.setTimeout(timerCallback, updateFrequency*1000); // Sample at 50fps.
                    }
                    else {
                        this.__parameter.setValue(this.__valueParam.getValue());
                        this.__timeoutId = undefined;
                        this.__onDone();
                    }
                };
                timerCallback();
            }
        }
        else {
            this.__parameter.setValue(this.__valueParam.getValue());
            this.__onDone();
        }
    }


    cancel() {
        if(this.__timeoutId){
            clearTimeout(this.__timeoutId);
            this.__timeoutId = undefined;
        }
    }

};

export {
    SetParameterValue
};
