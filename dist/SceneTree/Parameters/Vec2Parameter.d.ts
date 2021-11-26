import { Vec2 } from '../../Math/index';
import { Parameter } from './Parameter';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
import { BinReader } from '../../SceneTree/BinReader';
/**
 * Represents a specific type of parameter, that only stores Vec2(two-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec2Param = new Vec2Parameter('MyVec2', new Vec2(1.2, 3.4))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec2Param)
 * ```
 *
 * **Events**
 * * **rangeChanged:** Triggered when rage array changes.
 *
 * @extends Parameter
 */
declare class Vec2Parameter extends Parameter<Vec2> implements IBinaryReader {
    protected range?: Vec2[];
    /**
     * Create a Vec2 parameter.
     *
     * @param name - The name of the Vec2 parameter.
     * @param value - The value of the parameter.
     * @param range - The range value is an array of two `Vec2` objects.
     */
    constructor(name?: string, value?: Vec2, range?: Vec2[]);
    /**
     * Returns the range of values in which current parameter can be.
     *
     * @return - The return value.
     */
    getRange(): Vec2[] | undefined;
    /**
     * The __setRange method.
     * @param range - The range value.
     * @private
     */
    protected setRange(range: Vec2[]): void;
    /**
     * Extracts a number value from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, unknown>): void;
    toJSON(context?: Record<string, unknown>): Record<string, unknown>;
    fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new Vec2 parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Vec2 parameter.
     */
    clone(): Vec2Parameter;
}
export { Vec2Parameter };
