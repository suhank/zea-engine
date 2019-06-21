import {
  Parameter
} from './Parameter.js';
import {
  NumberParameter
} from './NumberParameter.js';

class MultiChoiceParameter extends NumberParameter {
  constructor(name, index, choices) {
    super(name, index, [0, choices.length], 1);
    this.choices = choices;
  }

  getChoices() {
    return this.choices;
  }

};

export {
  MultiChoiceParameter
};