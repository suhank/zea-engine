
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

    addChild(childAction) {
        this.__childActions.push(childAction);
        childAction.setState(this.__state);
    }


    getChild(index) {
        return this.__childActions[index];
    }

    activate(){
        console.warn("activate must be implmented by each action. this:" + this.constructor.name)
    }

    addChild(childAction) {
        this.__childActions.push(childAction);
        childAction.setState(this.__state);
    }


    deactivate() {

    }

    __onDone() {
        this.__childActions.forEach((action)=>{
            action.activate();
        });
    }




    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON(context);
        j.type = this.constructor.name;

        const childActionsj = [];
        for(let childAction of this.__childActions){
            childActionsj.push(childAction.toJSON(context));
        }
        j.childActions = childActionsj;

        const outputsj = {};
        for(let key in this.__outputs){
            outputsj[key] = this.__outputs[key].toJSON(context);
        }
        j.outputs = outputsj;

        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);

        for(let childActionjson of j.childActions){
            const childAction = sgFactory.constructClass(childActionjson.type);
            if (childAction) {
                childAction.fromJSON(childActionjson, context);
                this.addChild(childAction);
            }
            else {
                throw("Invalid type:" + childActionjson.type)
            }
        }

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
