import {
    Signal
} from '../../Utilities';
import {
    Parameter
} from './Parameter.js';

class XfoParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Xfo');
    }
    
    clone() {
        let clonedParam = new XfoParameter(this.__name, this.__value.clone(), this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }
};

export {
    XfoParameter
};