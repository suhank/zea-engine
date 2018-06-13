import {
    Vec2
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class Vec3Parameter extends Parameter {
    constructor(name, value, range=undefined) {
        super(name, value ? value : new Vec3(), 'Vec3');
    }
    
    clone() {
        let clonedParam = new Vec3Parameter(this.__name, this.__value.clone(), this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }
};


export {
    Vec3Parameter
};