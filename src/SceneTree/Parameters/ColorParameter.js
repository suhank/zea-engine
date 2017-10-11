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
    
    clone() {
        let clonedParam = new ColorParameter(this.__name, this.__value.clone(), this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }
};


export {
    ColorParameter
};