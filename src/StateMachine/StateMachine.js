

class StateMachine {
    constructor(treeItem) {
        this.__treeItem = treeItem;
        this.__states = {};
        this.__currentState;
    }

    getTreeItem() {
        return this,__treeItem;
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