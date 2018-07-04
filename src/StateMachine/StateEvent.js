
import {
    ParameterOwner
} from '../SceneTree/ParameterOwner.js';

class StateEvent extends ParameterOwner {
    constructor() {
        super();
        // this.__targetStateParam = this.addParameter('TargetState', "");

        this.__childActions = [];
    }

    setState(state) {
        this.__state = state;
        this.__childActions.forEach((action)=>{
            action.setState(state);
        });
    }

    __onEvent(){
        // this.__state.getStateMachine().activateState(this.__targetStateParam.getValue());

        this.__childActions.forEach((action)=>{
            action.start();
        });
    }

    activate() {
    }

    deactivate() {
    }


    addChild(action) {
        this.__childActions.push(action);
        action.setState(this.__state);
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

        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);

        for(let childActionjson of j.childActions){
            const childAction = sgFactory.constructClass(childActionjson.type);
            if (!childAction) {
                childAction.fromJSON(childActionjson, context);
                this.addChild(key, childItem);
            }
            else {
                throw("Invalid type:" + childAction.type)
            }
        }
    }

};


export {
    StateEvent
};
