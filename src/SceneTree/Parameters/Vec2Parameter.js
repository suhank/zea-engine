import {
    Parameter
} from './Parameter.js';

class Vec2Parameter extends Parameter {
    constructor(name, value, range=undefined) {
        super(name, value, 'Vec2');
    }
    
    clone() {
        const clonedParam = new Vec2Parameter(this.__name, this.__value.clone());
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};


export {
    Vec2Parameter
};