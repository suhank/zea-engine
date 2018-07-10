
import {
    sgFactory
} from '../SceneTree/SGFactory.js';

import {
    ParameterOwner
} from '../SceneTree/ParameterOwner.js';


class StateAction extends ParameterOwner {
    constructor(name) {
        super();
        this.__name = name;
        this.__childActions = [];

        this.__outputs = {};
    }

    addOutput(output){
        this.__outputs[output.getName()] = output;
        return output;
    }

    getOutput(name){
        return this.__outputs[name];
    }

    setState(state) {
        this.__state = state;
        this.__childActions.forEach((childAction)=>{
            childAction.setState(state);
        });
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




    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON(context);
        j.type = this.constructor.name;

        const outputsj = {};
        for(let key in this.__outputs){
            outputsj[key] = this.__outputs[key].toJSON(context);
        }
        j.outputs = outputsj;

        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);

        for(let key in j.outputs){
            this.__outputs[key].fromJSON(j.outputs[key], context);
            // const outputjson = j.outputs[key];
            // const output = sgFactory.constructClass(outputjson.type);
            // if (output) {
            //     output.fromJSON(outputjson, context);
            //     this.addOutput(key, output);
            // }
            // else {
            //     throw("Invalid type:" + outputjson.type)
            // }
        }
    }

    destroy(){
        super.destroy();
        this.__outputs = [];
    }
};

export {
    StateAction
};
