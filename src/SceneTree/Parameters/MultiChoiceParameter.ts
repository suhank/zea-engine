import { Registry } from '../../Registry'
import { NumberParameter } from './NumberParameter'

/**
 * Represents a specific type of parameter, that stores multiple choice(array) values.
 *
 * i.e.:
 * ```javascript
 * const multiChoiceParameter =  new MultiChoiceParameter('InitialXfoMode', GROUP_INITIAL_XFO_MODES.average, [
 *                                  'manual',
 *                                  'first',
 *                                  'average',
 *                                  'global',
 *                                ])
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(multiChoiceParameter)
 * ```
 * @extends NumberParameter
 */
class MultiChoiceParameter extends NumberParameter {
  choices: any[]

  /**
   * Create a multi choice parameter.
   * @param {string} name - The name of the multi choice parameter.
   * @param {number} index - The index value.
   * @param {array} choices - The choices value.
   */
  constructor(name: string, index: number, choices: any[]) {
    super(name, index, [0, choices.length], 1)
    this.choices = choices
  }

  /**
   * Returns choices array.
   *
   * @return {array} - The return value.
   */
  getChoices(): Array<any> {
    return this.choices
  }

  /**
   * Sets parameter index value.
   *
   * @param {string|number} value - The value param.
   */
  setValue(value: any) {
    if (typeof value === 'string') {
      super.setValue(this.choices.indexOf(value))
    } else {
      super.setValue(value)
    }
  }
}

Registry.register('MultiChoiceParameter', MultiChoiceParameter)

export { MultiChoiceParameter }
