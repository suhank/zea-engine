
import {
    ParameterOwner
} from '../ParameterOwner.js';

class StateEvent extends ParameterOwner {
    constructor(state) {
        this.__state = state;
    }

    __onEvent(){
        this.__stateMachine.activateState(this.__targetState);
    }

    activate() {
    }

    deactivate() {
    }
};


export {
    StateEvent
};
