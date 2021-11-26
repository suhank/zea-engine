import { BooleanParameter } from '../../../SceneTree/Parameters/BooleanParameter';
import { NumberParameter } from '../../../SceneTree/Parameters/NumberParameter';
import { ProceduralMesh } from './ProceduralMesh';
/**
 * A class for generating a cuboid geometry.
 *
 * **Parameters**
 * * **x(`NumberParameter`):** Length of the line cuboid along the `X` axis
 * * **y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
 * * **z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
 * * **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends {ProceduralMesh}
 */
declare class Cuboid extends ProceduralMesh {
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
     * Create a cuboid.
     * @param x - The length of the cuboid along the X axis.
     * @param y - The length of the cuboid along the Y axis.
     * @param z - The length of the cuboid along the Z axis.
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
     * @private
     */
    resize(): void;
}
export { Cuboid };
