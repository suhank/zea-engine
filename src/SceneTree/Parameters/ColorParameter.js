import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class ColorParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Color');
    }
};


export {
    ColorParameter
};