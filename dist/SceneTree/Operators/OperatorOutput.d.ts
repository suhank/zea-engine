import { Parameter } from '../Parameters/Parameter';
import { EventEmitter } from '../../Utilities/EventEmitter';
import { OperatorOutputMode } from '../Parameters/OperatorOutputMode';
import { Operator } from './Operator';
/** Class representing an operator output.
 * @extends EventEmitter
 */
declare abstract class OperatorOutput<T> extends EventEmitter {
    __name: string;
    _mode: OperatorOutputMode;
    _op: Operator | null;
    private _param?;
    _paramBindIndex: number;
    detached: boolean;
    /**
     * Create an operator output.
     * @param name - The name value.
     * @param operatorOutputMode - The mode which the OperatorOutput uses to bind to its target parameter.
     */
    constructor(name: string, operatorOutputMode?: OperatorOutputMode);
    /**
     * Returns name of the output.
     * @return - The name string.
     */
    getName(): string;
    /**
     * Sets operator that owns this output. Called by the operator when adding outputs
     * @param op - The operator object.
     */
    setOperator(op: Operator): void;
    /**
     * Returns operator that owns this output.
     * @return - The operator object.
     */
    getOperator(): Operator;
    /**
     * Returns mode that the output writes to be parameter. Must be a number from OperatorOutputMode
     * @return - The mode value.
     */
    getMode(): OperatorOutputMode;
    /**
     * Returns true if this output is connected to a parameter.
     * @return - The return value.
     */
    isConnected(): boolean;
    /**
     * The getParam method.
     * @return - The return value.
     */
    getParam(): Parameter<T> | undefined;
    /**
     * Sets the Parameter for this output to write to.
     * @param param - The param value.
     * @param index - The index to bind at in the Parameter.
     */
    setParam(param?: Parameter<T>, index?: number): void;
    /**
     * Returns the index of the binding on the parameter of this OperatorOutput
     * up to date.
     * @return index - The index of the binding on the parameter.
     */
    getParamBindIndex(): number;
    /**
     * If bindings change on a Parameter, it will call this method to ensure the output index is
     * up to date.
     * @param index - The index of the binding on the parameter.
     */
    setParamBindIndex(index: number): void;
    /**
     * Propagates dirty to the connected parameter.
     */
    setDirty(): void;
    /**
     * The getValue method.
     * @return - The return value.
     */
    getValue(): T;
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
    backPropagateValue(value: any): any;
    /**
     * The setClean method.
     * @param value - The value param.
     */
    setClean(value: T): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): {
        name: string;
        paramPath: string[];
        paramBindIndex: number;
    };
    /**
     * The fromJSON method decodes a json object for this type.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * The detach method is called when an operator is being removed from the scene tree.
     * It removes all connections to parameters in the scene.
     */
    detach(): void;
    /**
     * The reattach method can be called when re-instating an operator in the scene.
     */
    reattach(): void;
    /**
     * The rebind rebinds the outputs to be at the top of the stack for its parameter.
     */
    rebind(): void;
}
import { Vec2, Vec3, Vec4, Color, Quat, Xfo, Mat3, Mat4 } from '../../Math';
declare class BooleanOperatorOutput extends OperatorOutput<boolean> {
}
declare class NumberOperatorOutput extends OperatorOutput<number> {
}
declare class Vec2OperatorOutput extends OperatorOutput<Vec2> {
}
declare class Vec3OperatorOutput extends OperatorOutput<Vec3> {
}
declare class Vec4OperatorOutput extends OperatorOutput<Vec4> {
}
declare class ColorOperatorOutput extends OperatorOutput<Color> {
}
declare class QuatOperatorOutput extends OperatorOutput<Quat> {
}
declare class XfoOperatorOutput extends OperatorOutput<Xfo> {
}
declare class Mat3OperatorOutput extends OperatorOutput<Mat3> {
}
declare class Mat4OperatorOutput extends OperatorOutput<Mat4> {
}
export { OperatorOutput, BooleanOperatorOutput, NumberOperatorOutput, Vec2OperatorOutput, Vec3OperatorOutput, Vec4OperatorOutput, ColorOperatorOutput, QuatOperatorOutput, XfoOperatorOutput, Mat3OperatorOutput, Mat4OperatorOutput, };
