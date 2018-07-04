
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
        if(!this.__currentState)
            throw("Invalid state transtion:" + key)
        this.__currentState.activate();
    }

    getActiveState() {
        return this.__currentState;
    }

    getActiveStateName() {
        return this.__currentState.constructor.name;
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        let j = super.toJSON(context);
        if(!j) j = {};
        j.type = this.constructor.name;

        const statesj = {};
        for(let key in this.__states){
            statesj[key] = this.__states[key].toJSON(context);
        }
        j.states = statesj;
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);

        context.stateMachine = this;

        for(let key in j.states){
            const statejson = j.states[key];
            const state = sgFactory.constructClass(statejson.type);
            if (state) {
                state.fromJSON(statejson, context);
                this.addState(childItem);
            }
            else {
                throw("Invalid type:" + statejson.type)
            }
        }
    }

};

export {
    StateMachine
};