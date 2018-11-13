import {
    Color
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class ColorParameter extends Parameter {
    constructor(name, value) {
        super(name, value ? value : new Color(), 'Color');
    }
    
    clone(flags) {
        const clonedParam = new ColorParameter(this.__name, this.__value.clone());
        return clonedParam;
    }
};


export {
    ColorParameter
};