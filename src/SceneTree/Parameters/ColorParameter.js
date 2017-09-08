import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class ColorParameter extends Parameter {
    constructor(name, value, range=undefined) {
        super(name, value, 'Color');
    }


};


export {
    ColorParameter
};