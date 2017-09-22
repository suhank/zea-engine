import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class XfoParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Xfo');
    }
};

export {
    XfoParameter
};