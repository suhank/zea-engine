import {
    Signal
} from '../../Utilities';
import {
    Parameter
} from './Parameter.js';

class BooleanParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Boolean');
        this.rangeChanged = new Signal();
    }

    clone() {
        const clonedParam = new BooleanParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};


export {
    BooleanParameter
};