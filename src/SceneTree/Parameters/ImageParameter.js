import {
    Signal
} from '../../Utilities';
import {
    ParamFlags,
    ValueSetMode,
    Parameter
} from './Parameter.js';

import {
    sgFactory
} from '../SGFactory.js';

class ImageParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'BaseImage');
        this.valueParameterValueChanged = new Signal();
    }
    
    clone() {
        const clonedParam = new ImageParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }

    //////////////////////////////////////////
    // Persistence


    toJSON(context) {
        const j = super.toJSON(context);
        if(this.__value) {
            j.imageType = this.__value.constructor.name;
        }
        return j;
    }

    fromJSON(j, context) {
        if(j.imageType) {
            this.__value = sgFactory.constructClass(j.imageType);
        }
        return super.fromJSON(j, context);
    }
};


export {
    ImageParameter
};