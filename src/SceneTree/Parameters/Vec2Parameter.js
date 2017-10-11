import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class Vec2Parameter extends Parameter {
    constructor(name, value, range=undefined) {
        super(name, value, 'Vec2');
    }
    
    clone() {
        let clonedParam = new Vec2Parameter(this.__name, this.__value.clone(), this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }
};


export {
    Vec2Parameter
};