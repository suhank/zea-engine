import {
    Parameter
} from './Parameter.js';

class Vec4Parameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Vec4');
    }
    
    clone() {
        const clonedParam = new Vec4Parameter(this.__name, this.__value.clone());
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};


export {
    Vec4Parameter
};