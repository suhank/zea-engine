import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class Vec4Parameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Vec3');
    }
};


export {
    Vec4Parameter
};