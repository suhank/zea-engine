import {
    Signal
} from '../../Utilities';
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

    getValue() {
        // if(this.__range) {
        //     return Math.clamp(super.getValue(), this.__range[0], this.__range[1]);
        // }
        return super.getValue();
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

    cloneMembers(clonedParam) {
        clonedParam.__range = this.__range;
        clonedParam.__axis = this.__axis;
        clonedParam.__step = this.__step;
    }

    clone() {
        let clonedParam = new NumberParameter(this.__name, this.__value, this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }
};


export {
    NumberParameter
};