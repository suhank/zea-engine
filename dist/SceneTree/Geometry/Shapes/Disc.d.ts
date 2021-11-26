import { NumberParameter } from '../../Parameters/index';
import { ProceduralMesh } from './ProceduralMesh';
/**
 * A class for generating a disc geometry.
 *
 * ```
 * const disc = new Disc(2.0, 22)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Specifies the radius of the disc.
 * * **Sides(`NumberParameter`):** Specifies the resolution, or the disc subdivisions around `Z` axis.
 *
 * @extends {ProceduralMesh}
 */
declare class Disc extends ProceduralMesh {
    /**
     * @member radiusParam - Specifies the radius of the disc.
     */
    radiusParam: NumberParameter;
    /**
     * @member sidesParam - Specifies the resolution, or the disc subdivisions around `Z` axis.
     */
    sidesParam: NumberParameter;
    /**
     * Creates an instance of Disc.
     *
     * @param radius - The radius of the disc.
     * @param sides - The number of sides.
     */
    constructor(radius?: number, sides?: number);
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
export { Disc };
