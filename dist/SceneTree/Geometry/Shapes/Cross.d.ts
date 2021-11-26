import { ProceduralLines } from './ProceduralLines';
import { NumberParameter } from '../../../SceneTree/Parameters/NumberParameter';
/**
 * A class for generating a cross shape, drawing a line on the `X,Y,Z` axes.
 * The axis line length is the `size` you specify, but the middle of the line is positioned in the coordinate `(0, 0, 0)` .
 * Meaning that half of the line goes negative and half goes positive.
 *
 * ```
 * const cross = new Cross(1.5)
 * ```
 *
 * **Parameters**
 * * **Size(`NumberParameter`):** Specifies the size of the cross.
 *
 * @extends {ProceduralLines}
 */
declare class Cross extends ProceduralLines {
    /**
     * @member sizeParam - Specifies the size of the cross.
     */
    sizeParam: NumberParameter;
    /**
     * Create a cross.
     * @param size - The size of the cross.
     */
    constructor(size?: number);
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
export { Cross };
