import {
    Parameter
} from './Parameter.js';

class Vec3Parameter extends Parameter {
    constructor(name, value, range=undefined) {
        super(name, value, 'Vec3');
    }
    
    clone() {
        const clonedParam = new Vec3Parameter(this.__name, this.__value.clone());
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};


export {
    Vec3Parameter
};