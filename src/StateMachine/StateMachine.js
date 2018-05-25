
import {
    BaseItem
} from '../SceneTree/BaseItem.js';

class StateMachine extends BaseItem {
    constructor(name) {
        super(name)
        this.__states = {};
        this.__currentState;
    }

    addState(state) {
        state.setStateMachine(this);
        this.__states[state.getName()] = state;
    }

    activateState(key) {
        if(this.__currentState)
            this.__currentState.deactivate();
        this.__currentState = this.__states[key];
        this.__currentState.activate();
    }

    getActiveState() {
        return this.__currentState;
    }

    getActiveStateName() {
        return this.__currentState.constructor.name;
    }

};

export {
    StateMachine
};