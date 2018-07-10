
import {
    sgFactory
} from '../../SceneTree/SGFactory.js';

import {
    StringParameter
} from '../../SceneTree/Parameters';
import {
    StateEvent
} from '../StateEvent.js';



class GeomClicked extends StateEvent  {
    constructor() {
        super()

        this.__pathParam = this.addParameter(new StringParameter('path', ""));
        this.__pathParam.valueChanged.connect((changeType)=>{
            if(this.__state)
                this.__geom = this.__state.getStateMachine().getOwner().resolvePath(this.__pathParam.getValue());
        });

        this.onGeomClicked = this.onGeomClicked.bind(this);
    }


    setState(state) {
        super.setState(state);
    }


    onGeomClicked(event) {
        this.__onEvent();
    }

    activate() {
        if(!this.__geom){
            this.__geom = this.__state.getStateMachine().getOwner().resolvePath(this.__pathParam.getValue());
        }
        if(this.__geom){
            this.__geom.mouseDownOnItem.connect(this.onGeomClicked);
        }
    }

    deactivate() {
        if(this.__geom){
            this.__geom.mouseDownOnItem.disconnect(this.onGeomClicked);
        }
    }

};


sgFactory.registerClass('GeomClicked', GeomClicked);

export {
    GeomClicked
};
