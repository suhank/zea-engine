import { ProceduralLines } from './ProceduralLines';
import { NumberParameter } from '../../Parameters/NumberParameter';
/**
 * A class for generating a rectangle shape.
 *
 * ```
 * const rect = new Rect(1.5, 2.0)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the rectangle along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the rectangle along the `Y` axis.
 *
 *
 * @extends {ProceduralLines}
 */
declare class Rect extends ProceduralLines {
    /**
     * @member sizeXParam - Length of the rectangle along the `X` axis.
     */
    sizeXParam: NumberParameter;
    /**
     * @member sizeYParam - Length of the rectangle along the `Y` axis.
     */
    sizeYParam: NumberParameter;
    /**
     * Create a rect.
     * @param x - The length of the rect along the `X` axis.
     * @param y - The length of the rect along the `Y` axis.
     */
    constructor(x?: number, y?: number);
    /**
     * The rebuild method.
     * @private
     */
    rebuild(): void;
    /**
     * The resize method.
     * @private
     */
    resize(): void;
}
export { Rect };
