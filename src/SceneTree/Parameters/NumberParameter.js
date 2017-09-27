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
        this.__axis = 'x';
        this.__step = 0.01;
        
        this.rangeChanged = new Signal();
    }

    getRange() {
        return this.__range;
    }

    setRange(range) {// Should be an array [0, 20]
        this.__range = range;
        this.rangeChanged.emit();
    }

    getStep() {
        return this.__step;
    }

    setStep(step) {
        this.__step = step;
    }
};


export {
    NumberParameter
};