import { BooleanParameter, NumberParameter } from '../../Parameters/index';
import { ProceduralLines } from './ProceduralLines';
/**
 * Represents a network of lines that cross each other to form a series of squares or rectangles.
 *
 * ```
 * const grid = new Grid(5, 5, 50, 50, true)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the grid along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the grid along the `Y` axis.
 * * **XDivisions(`NumberParameter`):** Number of divisions along `X` axis
 * * **YDivisions(`NumberParameter`):** Number of divisions along `Y` axis
 * * **SkipCenterLines(`BooleanParameter`):** Property that indicates whether to display the center grid lines or not
 *
 * @extends {ProceduralLines}
 */
declare class Grid extends ProceduralLines {
    /**
     * @member skipCenterLinesParam - Property that indicates whether to display the center grid lines or not
     */
    skipCenterLinesParam: BooleanParameter;
    /**
     * @member xDivisionsParam - Number of divisions along `X` axis
     */
    xDivisionsParam: NumberParameter;
    /**
     * @member xParam - Length of the grid along the `X` axis.
     */
    xParam: NumberParameter;
    /**
     * @member yDivisionsParam - Number of divisions along `Y` axis
     */
    yDivisionsParam: NumberParameter;
    /**
     * @member yParam - Length of the grid along the `Y` axis.
     */
    yParam: NumberParameter;
    /**
     * Create a grid.
     * @param x - The length of the grid along the `X` axis.
     * @param y - The length of the grid along the `Y` axis.
     * @param xDivisions - The number of divisions along `X` axis.
     * @param yDivisions - The number of divisions along `Y` axis.
     * @param skipCenterLines - A boolean indicating whether to display the center grid lines or not.
     */
    constructor(x?: number, y?: number, xDivisions?: number, yDivisions?: number, skipCenterLines?: boolean);
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
export { Grid };
