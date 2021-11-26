import { BaseItem } from '../BaseItem';
import { OperatorInput } from './OperatorInput';
import { OperatorOutput } from './OperatorOutput';
/**
 * Class representing an operator.
 *
 * @extends BaseItem
 */
declare class Operator extends BaseItem {
    __inputs: Map<string, OperatorInput<any>>;
    __outputs: Map<string, OperatorOutput<any>>;
    /**
     * Create an operator.
     * @param name - The name value.
     */
    constructor(name?: string);
    /**
     * This method sets the state of the operator to dirty which propagates
     * to the outputs of this operator, and which may then propagate to other
     * operators. When the scene is cleaned, which usually is caused by rendering
     * then the chain of operators are cleaned by triggering evaluation.
     * @private
     */
    setDirty(): void;
    /**
     * This method can be overridden in derived classes
     * to perform general updates (see GLPass or BaseItem).
     *
     * @param event
     * @private
     */
    protected parameterValueChanged(event: Record<string, unknown>): void;
    /**
     * The addInput method.
     * @param input - The name of the input, or the input object
     * @return - The return value.
     */
    addInput(input: OperatorInput<any>): OperatorInput<any>;
    /**
     * The removeInput method.
     * @param input - The name of the input, or the input object
     */
    removeInput(input: OperatorInput<any>): void;
    /**
     * Getter for the number of inputs in this operator.
     * @return - Returns the number of inputs.
     */
    getNumInputs(): number;
    /**
     * The getInputByIndex method.
     * @param index - The index value.
     * @return - The return value.
     */
    getInputByIndex(index: number): Record<string, any>;
    /**
     * The getInput method.
     * @param name - The name value.
     * @return - The return value.
     */
    getInput(name: string): OperatorInput<any>;
    /**
     * The addOutput method.
     * @param output - The name of the output, or the output object
     * @return - The return value.
     */
    addOutput(output: OperatorOutput<any>): OperatorOutput<any>;
    /**
     * The removeOutput method.
     * @param output - The name of the output, or the output object
     */
    removeOutput(output: OperatorOutput<any> | string): void;
    /**
     * Getter for the number of outputs in this operator.
     * @return - Returns the number of outputs.
     */
    getNumOutputs(): number;
    /**
     * The getOutputByIndex method.
     * @param index - The index value.
     * @return - The return value.
     */
    getOutputByIndex(index: number): OperatorOutput<any>;
    /**
     * The getOutput method.
     * @param name - The name value.
     * @return - The return value.
     */
    getOutput(name: string): OperatorOutput<any>;
    /**
     * The evaluate method.
     * Computes the values of each of the outputs based on the values of the inputs
     * and the values of outputs with mode OP_READ_WRITE.
     * This method must be implemented by all Operators.
     */
    evaluate(): void;
    /**
     * When the value on a Parameter is modified by a user by calling 'setValue,
     * then if any operators are bound, the value of the Parameter cannot be modified
     * directly as it is the result of a computation. Instead, the Parameter calls
     * 'backPropagateValue' on the Operator to cause the Operator to handle propagating
     * the value to one or more of its inputs.
     * to its inputs.
     * @param value - The value param.
     * @return - The modified value.
     */
    backPropagateValue(value: unknown): unknown;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * The detach method.
     */
    detach(): void;
    /**
     * The reattach method.
     */
    reattach(): void;
    /**
     * The rebind method.
     */
    rebind(): void;
}
export { Operator };
