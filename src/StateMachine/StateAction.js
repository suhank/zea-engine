

import {
    ParameterOwner
} from '../ParameterOwner.js';


class StateAction extends ParameterOwner {
    constructor(state) {
        this.__state = state;
        this.__childActions = [];

        this.__params = [];
        this.__paramMapping = {};
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
