import { NumberParameter } from './NumberParameter';
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
declare class MultiChoiceParameter extends NumberParameter {
    choices: any[];
    /**
     * Create a multi choice parameter.
     * @param name - The name of the multi choice parameter.
     * @param index - The index value.
     * @param choices - The choices value.
     */
    constructor(name?: string, index?: number, choices?: any[]);
    /**
     * Returns choices array.
     *
     * @return - The return value.
     */
    getChoices(): Array<any>;
    /**
     * Sets parameter index value.
     *
     * @param value - The value param.
     */
    setValue(value: any): void;
}
export { MultiChoiceParameter };
