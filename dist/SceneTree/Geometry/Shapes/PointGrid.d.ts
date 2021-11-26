import { ProceduralPoints } from './ProceduralPoints';
import { NumberParameter } from '../../Parameters/NumberParameter';
/**
 * Represents an ordered grid of points along `X` and `Y` axes.
 *
 * ```
 * const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the grid along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the grid along the `Y` axis.
 * * **XDivisions(`NumberParameter`):** Number of divisions along `X` axis
 * * **YDivisions(`NumberParameter`):** Number of divisions along `Y` axis
 * @extends {ProceduralPoints}
 */
declare class PointGrid extends ProceduralPoints {
    /**
     * @member sizeXParam - Length of the grid along the `X` axis.
     */
    sizeXParam: NumberParameter;
    /**
     * @member divisionsXParam - Number of divisions along `X` axis
     */
    divisionsXParam: NumberParameter;
    /**
     * @member sizeYParam - Length of the grid along the `Y` axis.
     */
    sizeYParam: NumberParameter;
    /**
     * @member divisionsYParam - Number of divisions along `Y` axis
     */
    divisionsYParam: NumberParameter;
    /**
     * Creates an instance of PointGrid.
     *
     * @param x - The length of the point grid along the X axis.
     * @param y - The length of the point grid along the Y axis.
     * @param xDivisions - The number of divisions along the X axis.
     * @param yDivisions - The number of divisions along the Y axis.
     * @param addTextureCoords - The addTextureCoords value.
     */
    constructor(x?: number, y?: number, xDivisions?: number, yDivisions?: number, addTextureCoords?: boolean);
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
export { PointGrid };
