import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class Vec3Parameter extends Parameter {
    constructor(name, value, range=undefined) {
        super(name, value, 'Vec3');
    }
};


export {
    Vec3Parameter
};