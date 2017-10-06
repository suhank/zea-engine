

class StateMachine {
    constructor(scene) {
        this.__scene = this;
        this.__states = {};
        this.__currentState;
    }

    addState(state) {
        this.__states[state.constructor.name] = state;
    }

    activateState(key) {
        if(this.__currentState)
            this.__currentState.deactivate();
        this.__currentState = this.__states[key];
        this.__currentState.activate();
    }

};

export {
    StateMachine
};