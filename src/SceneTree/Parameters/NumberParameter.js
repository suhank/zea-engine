import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class NumberParameter extends Parameter {
    constructor(name, value, range=undefined) {
        super(name, value, 'Number');
        // The value might not have a range.
        this.__range = range;
        this.rangeChanged = new Signal();
    }

    getRange() {
        return this.__range;
    }

    setRange(range) {
        this.__range = range;
        this.rangeChanged.emit();
    }

};


export {
    NumberParameter
};