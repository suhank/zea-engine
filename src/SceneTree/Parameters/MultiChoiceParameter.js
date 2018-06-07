import {
    Parameter
} from './Parameter.js';

class MultiChoiceParameter extends Parameter {
    constructor(name, choices, index, type) {
        super(name, choices[index], type);
    }
};

export {
    MultiChoiceParameter
};