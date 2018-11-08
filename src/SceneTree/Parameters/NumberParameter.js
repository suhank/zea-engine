import {
    Signal
} from '../../Utilities';
import {
    sgFactory
} from '../SGFactory';
import {
    ValueSetMode,
    Parameter
} from './Parameter.js';

class NumberParameter extends Parameter {
    constructor(name, value=0, range=undefined) {
        super(name, value, 'Number');
        // The value might not have a range.
        this.__display = 'slider';
        this.__range = range;
        this.__axis = 'x';
        this.__step = undefined;
    }

    setValue(value, mode) {
        if(mode == ValueSetMode.USER_SETVALUE) {
            if(this.__range) {
                value = Math.clamp(value, this.__range[0], this.__range[1]);
            }
            if(this.__step) {
                value = Math.round(value / this.__step) * this.__step;
            }
        }
        super.setValue(value, mode);
    }

    getValue(mode) {
        // if(this.__range) {
        //     return Math.clamp(super.getValue(), this.__range[0], this.__range[1]);
        // }
        return super.getValue(mode);
    }

    getDisplay() {
        return this.__display;
    }

    setDisplay(display) {
        this.__display = display;
        return this;
    }

    getRange() {
        return this.__range;
    }

    setRange(range) {// Should be an array [0, 20]
        this.__range = range;
        return this;
    }

    getStep() {
        return this.__step;
    }

    setStep(step) {
        this.__step = step;
        return this;
    }

    cloneMembers(clonedParam) {
        super.cloneMembers(clonedParam);
        clonedParam.__range = this.__range;
        clonedParam.__axis = this.__axis;
        clonedParam.__step = this.__step;
    }

    clone() {
        const clonedParam = new NumberParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};

// sgFactory.registerClass('NumberParameter', NumberParameter);

export {
    NumberParameter
};