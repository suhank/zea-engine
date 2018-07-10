
import {
    sgFactory
} from '../SceneTree/SGFactory.js';
import {
    ParameterOwner
} from '../SceneTree/ParameterOwner.js';

class StateEvent extends ParameterOwner {
    constructor(name) {
        super();
        this.__name = name;
        this.__childActions = [];
        this.__onEvent = this.__onEvent.bind(this);
    }

    setState(state) {
        this.__state = state;
        this.__childActions.forEach((action)=>{
            action.setState(state);
        });
    }

    __onEvent(){
        this.__childActions.forEach((action)=>{
            action.start();
        });
    }

    activate() {
    }

    deactivate() {
    }


    addAction(action) {
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
            if (childAction) {
                childAction.fromJSON(childActionjson, context);
                this.addChild(childAction);
            }
            else {
                throw("Invalid type:" + childActionjson.type)
            }
        }
    }

};


export {
    StateEvent
};
