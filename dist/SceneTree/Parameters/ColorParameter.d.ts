import { Color } from '../../Math/index';
import { Parameter } from './Parameter';
import { BinReader } from '../BinReader';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
import { AssetLoadContext } from '../AssetLoadContext';
/**
 * Represents a specific type of parameter, that only stores `Color` values.
 *
 * i.e.:
 * ```javascript
 * const colorParam = new ColorParameter('MyColor', new Color(0, 254, 2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(colorParam)
 * ```
 *
 * @extends Parameter
 */
declare class ColorParameter extends Parameter<Color> implements IBinaryReader {
    /**
     * Create a color parameter.
     * @param name - The name of the color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: Color);
    /**
     * Extracts `Color` values from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: AssetLoadContext): void;
    toJSON(context?: Record<string, unknown>): Record<string, any>;
    fromJSON(j: Record<string, any>, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new color parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned color parameter.
     */
    clone(): ColorParameter;
}
export { ColorParameter };
