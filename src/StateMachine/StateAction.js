

import {
    ParameterOwner
} from '../SceneTree/ParameterOwner.js';


class StateAction extends ParameterOwner {
    constructor() {
        super();
        this.__childActions = [];

        this.__params = [];
        this.__paramMapping = {};
    }

    setState(state) {
        this.__state = state;
    }

    addChild(action) {
        this.__childActions.push(action);
    }

    start(){
        console.warn("start must be implmented by each action.")
    }

    cancel() {

    }

    __onDone() {
        this.__childActions.forEach((action)=>{
            action.start();
        });
    }
};

export {
    StateAction
};
