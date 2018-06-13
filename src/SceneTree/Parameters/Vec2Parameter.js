import {
    Vec2
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class Vec2Parameter extends Parameter {
    constructor(name, value) {
        super(name, value ? value : new Vec2(), 'Vec2');
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