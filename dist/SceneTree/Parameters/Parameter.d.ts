import { ParameterOwner } from '../ParameterOwner';
import { EventEmitter } from '../../Utilities/EventEmitter';
import { OperatorOutput } from '../Operators/OperatorOutput';
import { ICloneable } from '../../Utilities/ICloneable';
import { ISerializable } from '../../Utilities/ISerializable';
import { BinReader } from '../BinReader';
import { OperatorInput } from '..';
/**
 * Represents a reactive type of attribute that can be owned by a `ParameterOwner` class.
 *
 * **Events**
 * * **nameChanged:** Triggered when the name of the parameter changes.
 * * **valueChanged:** Triggered when the value of the parameter changes.
 */
declare abstract class Parameter<T> extends EventEmitter implements ICloneable, ISerializable {
    protected dirty: boolean;
    protected boundInputs: OperatorInput<any>[];
    protected boundOutputs: OperatorOutput<any>[];
    protected cleaning: boolean;
    protected dirtyOpIndex: number;
    protected firstOP_WRITE: number;
    protected name: string;
    __value: T;
    protected dataType: string;
    protected ownerItem?: ParameterOwner;
    /**
     * When initializing a new parameter, the passed in value could be anything.
     * If it is a new type of value, just ensure you register it in the `Registry`.
     *
     * How to use it:
     *
     * ```javascript
     *  // Creating a parameter object
     *  const param = new Parameter('Title', 'Awesome Parameter Value', 'String')
     *
     *   // Capturing events
     *  param.on('valueChanged', (...params) => console.log('Value changed!'))
     *
     *  // Changing parameter's value will cause `valueChanged` event to trigger.
     *  param.setValue('A New Awesome Parameter Value')
     *  // As result the console log code will execute: Value Changed!
     * ```
     *
     * @param name - The name of the parameter.
     * @param value - The value of the parameter.
     * @param dataType - The data type of the parameter.
     */
    constructor(name: string, value: T, dataType: string);
    /**
     * Returns specified name of the parameter.
     *
     * @return - Returns the name.
     */
    getName(): string;
    /**
     * Sets the name of the current parameter.
     *
     * @param name - The base parameter name.
     * @return - The instance itself.
     */
    setName(name: string): void;
    /**
     * Returns the owner item of the current parameter.
     *
     * @return - The return value.
     */
    getOwner(): ParameterOwner;
    /**
     * Sets the owner item of the current parameter.
     *
     * @param ownerItem - The ownerItem value.
     */
    setOwner(ownerItem: ParameterOwner): void;
    /**
     * Returns the parameter's path as an array of strings.
     * Includes owner's path in case it is owned by a `ParameterOwner`.
     *
     * @return - The return value.
     */
    getPath(): string[];
    /**
     * Returns parameter's data type.
     *
     * @return - The return value.
     */
    getDataType(): string;
    /**
     * When an Operator is reading from a parameter, it must be dirtied when the parameter value
     * changes. The Parameter maintains a list of bound inputs and will propagate dirty to
     * them explicitly.
     *
     * @param operatorInput - The output that we are unbinding from the Parameter
     * @param index - The index(optional) that the output is being bound at.
     * @return - The index of the bound output.
     */
    bindOperatorInput(operatorInput: OperatorInput<any>): void;
    /**
     * When an operator is being removed from reading from a Parameter, the Input is removed
     * This means the operator will no longer receive updates when the operator changes.
     *
     * @param operatorInput - The output that we are unbinding from the Parameter
     * @return - The return value.
     */
    unbindOperatorInput(operatorInput: OperatorInput<any>): void;
    /**
     * When an Operator writes to a parameter, it binds its outputs to the parameter at a given
     * index. Then when the operator is dirtied by one of its inputs, it explicitly dirties
     * the output parameters.
     *
     * @param operatorOutput - The output that we are unbinding from the Parameter
     * @param index - The index(optional) that the output is being bound at.
     * @return - The index of the bound output.
     */
    bindOperatorOutput(operatorOutput: OperatorOutput<any>, index?: number): number;
    /**
     * When an operator is unbinding from a parameter, it removes its self from the list maintained
     * by the parameter.
     *
     * @param operatorOutput - The output that we are unbinding from the Parameter
     * @return - The return value.
     */
    unbindOperatorOutput(operatorOutput: OperatorOutput<any>): number;
    /**
     * Find the first operator in our stack which writes using an OP_WRITE connection.
     * All operators before this op can be ignored during dirty propagation.
     * @private
     */
    private __findFirstOP_WRITE;
    /**
     * Dirties this Parameter so subsequent calls to `getValue` will cause an evaluation of its bound operators.
     *
     * @param index - Index of the operator
     * @return - `true` if the Parameter was made dirty, else `false` if it was already dirty.
     */
    setDirty(index: number): boolean;
    /**
     * Returns true if this parameter is currently dirty and will evaluate its bound
     * operators if its value is requested by a call to getValue.
     *
     * @return - Returns a boolean.
     */
    isDirty(): boolean;
    /**
     * Returns the index of the first 'dirty' binding in the stack. This will be the index of the
     * first operator that will evaluate when the parameter needs to be cleaned.
     *
     * @return - The index of the dirty binding in the binding stack.
     */
    getDirtyBindingIndex(): number;
    /**
     * The setCleanFromOp method.
     * @param value - The computed value to be stored in the Parameter.
     * @param index - The index of the bound OperatorOutput.
     */
    setCleanFromOp(value: T, index: number): void;
    /**
     * During operator evaluation, operators can use this method to retrieve the existing
     * value of one of their outputs.
     * @param index - The index of the bound OperatorOutput to evaluate up to.
     * @return - The return value.
     */
    getValueFromOp(index: number): T | undefined;
    /**
     * Cleans the parameter up tp the index of the specified index of the bound OperatorOutput
     *
     * @param index - The index of the bound OperatorOutput to evaluate up to.
     */
    _clean(index: number): void;
    /**
     * Returns parameter's value.
     * @return - The return value.
     */
    getValue(): T;
    /**
     * Sets value of the parameter.
     *
     * @param value - The value param.
     */
    setValue(value: T): void;
    get value(): T;
    set value(value: T);
    /**
     * The loadValue is used to change the value of a parameter, without triggering a
     * valueChanges, or setting the USER_EDITED state.
     *
     * @param value - The context value.
     */
    loadValue(value: T): void;
    abstract toJSON(context?: Record<string, any>): Record<string, any>;
    abstract fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    abstract clone(): Parameter<unknown>;
    /**
     * The readBinary method.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: Record<string, unknown>): void;
    /**
     * The readBinary method.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    destroy(): void;
}
export { Parameter };
