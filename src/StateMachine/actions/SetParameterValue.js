

import {
    Parameter,
    NumberParameter
} from '../../SceneTree/Parameters';
import {
    StateAction
} from '../StateAction.js';

class SetParameterValue extends StateAction {
    constructor() {
        super()

        this.__pathParam = this.addParameter('path', "");
        this.__valueParam = this.addParameter('value', 1.0);
        this.__pathParam.valueChanged.connect((changeType)=>{
            if(this.__state)
                this.__bindParam();
        });
        this.__interpTimeParam = this.addParameter(new NumberParameter('interpTime', 1.0));
        this.__updateFrequencyParam = this.addParameter(new NumberParameter('updateFrequency', 30));
    }

    __bindParam(){
        this.__parameter = this.__state.getStateMachine().getOwner().resolvePath(this.__pathParam.getValue());
    }

    setState(state) {
        super.setState(state);
        this.__bindParam();
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
