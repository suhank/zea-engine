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
    constructor(name, value='') {
        super(name, value, 'String');
        this.multiLine = false;
    }

    setMultiLine(multiLine) {
        this.multiLine = multiLine;
    }

    getMultiLine() {
        return this.multiLine;
    }

    clone(flags) {
        const clonedParam = new StringParameter(this.__name, this.__value);
        return clonedParam;
    }
};

export {
    StringParameter
};