
import {
    ParameterOwner
} from '../SceneTree/ParameterOwner.js';

class StateEvent extends ParameterOwner {
    constructor() {
        super();
        this.__targetStateParam = this.addParameter('targetState', "");
    }

    setState(state) {
        this.__state = state;
    }

    __onEvent(){
        this.__state.getStateMachine().activateState(this.__targetStateParam.getValue());
    }

    activate() {
    }

    deactivate() {
    }
};


export {
    StateEvent
};
