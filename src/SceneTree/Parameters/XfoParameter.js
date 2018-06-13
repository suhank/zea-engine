import {
    Parameter
} from './Parameter.js';

class XfoParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Xfo');
    }
    
    clone() {
        const clonedParam = new XfoParameter(this.__name, this.__value.clone());
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};

export {
    XfoParameter
};