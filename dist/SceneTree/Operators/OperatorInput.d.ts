import { Parameter } from '../Parameters';
import { Operator } from './Operator';
import { EventEmitter } from '../../Utilities/EventEmitter';
/** Class representing an operator input.
 * @extends EventEmitter
 */
declare abstract class OperatorInput<T> extends EventEmitter {
    name: string;
    _op?: Operator;
    param?: Parameter<T>;
    detached: boolean;
    /**
     * Create an operator input.
     * @param name - The name value.
     */
    constructor(name: string);
    /**
     * The getName method.
     * @return - The return value.
     */
    getName(): string;
    /**
     * Sets operator that owns this input. Called by the operator when adding inputs
     * @param op - The operator object.
     */
    setOperator(op: Operator): void;
    /**
     * Returns operator that owns this input.
     * @return - The operator object.
     */
    getOperator(): Operator;
    /**
     * Returns true if this input is connected to a parameter.
     * @return - The return value.
     */
    isConnected(): boolean;
    /**
     * The getParam method.
     * @return - The return value.
     */
    getParam(): Parameter<T> | undefined;
    /**
     * @private
     * The handler function for when the input paramter changes.
     * @param event - The event object.
     */
    paramValueChanged(): void;
    /**
     * Assigns the Paramter to be used to provide the input value.
     * @param param - The param value.
     */
    setParam(param?: Parameter<T>): void;
    /**
     * The getValue method.
     * @return - The return value.
     */
    getValue(): T;
    /**
     * The setValue method.
     * @param value - The value param.
     */
    setValue(value: T): void;
    /**
     * Propagates from the upstream parameter to the connected operator.
     */
    setDirty(): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): {
        name: string;
        paramPath: string[];
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
}
import { Vec2, Vec3, Vec4, Color, Quat, Xfo, Mat3, Mat4 } from '../../Math';
declare class BooleanOperatorInput extends OperatorInput<boolean> {
}
declare class NumberOperatorInput extends OperatorInput<number> {
}
declare class Vec2OperatorInput extends OperatorInput<Vec2> {
}
declare class Vec3OperatorInput extends OperatorInput<Vec3> {
}
declare class Vec4OperatorInput extends OperatorInput<Vec4> {
}
declare class ColorOperatorInput extends OperatorInput<Color> {
}
declare class QuatOperatorInput extends OperatorInput<Quat> {
}
declare class XfoOperatorInput extends OperatorInput<Xfo> {
}
declare class Mat3OperatorInput extends OperatorInput<Mat3> {
}
declare class Mat4OperatorInput extends OperatorInput<Mat4> {
}
export { OperatorInput, BooleanOperatorInput, NumberOperatorInput, Vec2OperatorInput, Vec3OperatorInput, Vec4OperatorInput, ColorOperatorInput, QuatOperatorInput, XfoOperatorInput, Mat3OperatorInput, Mat4OperatorInput, };
