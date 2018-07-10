
import {
    sgFactory
} from '../../SceneTree/SGFactory.js';

import {
    TreeItemParameter
} from '../../SceneTree/Parameters';
import {
    StateEvent
} from '../StateEvent.js';



class GeomClicked extends StateEvent  {
    constructor(name) {
        super(name)
        this.__geomParam = this.addParameter(new TreeItemParameter('TreeItem'));
        this.__geomParam.valueChanged.connect(()=>{
            this.__geom = this.__geomParam.getValue();
        });
    }

    activate() {
        if(this.__geom){
            this.__geom.mouseDown.connect(this.__onEvent);
        }
    }

    deactivate() {
        if(this.__geom){
            this.__geom.mouseDown.disconnect(this.__onEvent);
        }
    }

};


sgFactory.registerClass('GeomClicked', GeomClicked);

export {
    GeomClicked
};
