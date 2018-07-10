import {
    Signal
} from '../../Utilities';
import {
    sgFactory
} from '../SGFactory';
import {
    Parameter
} from './Parameter.js';

class StringParameter extends Parameter {
    constructor(name, value=0) {
        super(name, value, 'String');
    }

    clone() {
        const clonedParam = new StringParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};

export {
    StringParameter
};