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


};


export {
    Vec2Parameter
};