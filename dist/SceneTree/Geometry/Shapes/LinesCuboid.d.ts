import { NumberParameter } from '../../Parameters/NumberParameter';
import { ProceduralLines } from './ProceduralLines';
import { BooleanParameter } from '../../../SceneTree/Parameters';
/**
 * A class for generating a lines cuboid shape(Without faces).
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the line cuboid along the `X` axis
 * * **Y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
 * * **Z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
 * * **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends {ProceduralLines}
 */
declare class LinesCuboid extends ProceduralLines {
    /**
     * @member baseZAtZeroParam - Property to start or not `Z` axis from position `0.
     */
    baseZAtZeroParam: BooleanParameter;
    /**
     * @member sizeXParam - Length of the line cuboid along the `X` axis
     */
    sizeXParam: NumberParameter;
    /**
     * @member sizeYParam - Length of the line cuboid along the `Y` axis
     */
    sizeYParam: NumberParameter;
    /**
     * @member sizeZParam - Length of the line cuboid along the `Z` axis
     */
    sizeZParam: NumberParameter;
    /**
     * Create a lines cuboid.
     * @param x - The length of the line cuboid along the X axis.
     * @param y - The length of the line cuboid along the Y axis.
     * @param z - The length of the line cuboid along the Z axis.
     * @param baseZAtZero - The baseZAtZero value.
     */
    constructor(x?: number, y?: number, z?: number, baseZAtZero?: boolean);
    /**
     * The rebuild method.
     * @private
     */
    rebuild(): void;
    /**
     * The resize method.
     *
     * @private
     */
    resize(): void;
}
export { LinesCuboid };
