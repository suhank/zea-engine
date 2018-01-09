
import {
    StateEvent
} from '../StateEvent.js';



class GeomClicked extends StateEvent  {
    constructor(state) {
        super(state)

        this.__pathParam = this.addParameter('path', "");
        this.__pathParam.valueChanged.connect((changeType)=>{
            this.__geom = this.__state.getStateMachine().getTreeItem().resolvePath(this.__pathParam.getValue());
        });

        this.onGeomClicked = this.onGeomClicked.bind(this);
    }


    onGeomClicked(event) {
        this.__onEvent();
    }

    activate() {
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


export {
    GeomClicked
};
