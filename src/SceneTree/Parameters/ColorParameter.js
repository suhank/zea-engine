import {
    Parameter
} from './Parameter.js';

class ColorParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Color');
    }
    
    clone() {
        const clonedParam = new ColorParameter(this.__name, this.__value.clone());
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};


export {
    ColorParameter
};