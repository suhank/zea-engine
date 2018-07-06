
import {
    BaseItem
} from '../SceneTree/BaseItem.js';
import {
    sgFactory
} from '../SceneTree/SGFactory.js';

class StateMachine extends BaseItem {
    constructor(name) {
        super(name)
        this.__states = {};
        this.__currentState;
        this.__initialStateName;
    }

    addState(state) {
        state.setStateMachine(this);
        this.__states[state.getName()] = state;

        if(Object.keys(this.__states).length == 1) {
            this.__initialStateName = state.getName();
        }
    }


    getState(name) {
        return this.__states[name];
    }

    activateState(key) {
        if(this.__currentState == this.__states[key])
            return;
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

    getInitialState() {
        return this.__initialStateName;
    }
    setInitialState(name) {
        this.__initialStateName = name;
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        let j = super.toJSON(context);
        if(!j) j = {};
        j.type = this.constructor.name;
        j.initialStateName = this.__initialStateName;

        const statesj = {};
        for(let key in this.__states){
            statesj[key] = this.__states[key].toJSON(context);
        }
        j.states = statesj;
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);
        this.__initialStateName = j.initialStateName;

        context.stateMachine = this;

        for(let key in j.states){
            const statejson = j.states[key];
            const state = sgFactory.constructClass(statejson.type);
            if (state) {
                state.fromJSON(statejson, context);
                this.addState(state);
            }
            else {
                throw("Invalid type:" + statejson.type)
            }
        }

        const onloaded = ()=>{
            this.activateState(this.__initialStateName);
            context.assetItem.loaded.disconnect(onloaded)
        }
        context.assetItem.loaded.connect(onloaded);
    }

};

sgFactory.registerClass('StateMachine', StateMachine);

export {
    StateMachine
};