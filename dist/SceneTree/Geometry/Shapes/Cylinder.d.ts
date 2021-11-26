import { BooleanParameter, NumberParameter } from '../../Parameters/index';
import { ProceduralMesh } from './ProceduralMesh';
/**
 * A class for generating a cylinder geometry. It is very much like a cuboid but with `N` number of sides.
 *
 * ```
 * const cylinder = new Cylinder(1.5, 2.0, 6)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Specifies the radius of the cylinder.
 * * **Height(`NumberParameter`):** Specifies the height of the cone.
 * * **Sides(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Loops(`NumberParameter`):** Specifies the number of subdivisions(stacks) on the `Z` axis.
 * * **Caps(`BooleanParameter`):** Specifies whether the ends of the cylinder are capped or open.
 * * **BaseZAtZero(`BooleanParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends {ProceduralMesh}
 */
declare class Cylinder extends ProceduralMesh {
    /**
     * @member baseZAtZeroParam - Property to start or not `Z` axis from position `0.
     */
    baseZAtZeroParam: BooleanParameter;
    /**
     * @member capsParam - Specifies whether the ends of the cylinder are capped or open.
     */
    capsParam: BooleanParameter;
    /**
     * @member heightParam - Specifies the height of the cone.
     */
    heightParam: NumberParameter;
    /**
     * @member loopsParam - Specifies the number of subdivisions(stacks) on the `Z` axis.
     */
    loopsParam: NumberParameter;
    /**
     * @member radiusParam - Specifies the radius of the cylinder.
     */
    radiusParam: NumberParameter;
    /**
     * @member sidesParam - Specifies the number of subdivisions around the `Z` axis.
     */
    sidesParam: NumberParameter;
    /**
     * Create a cylinder.
     * @param radius - The radius of the cylinder.
     * @param height - The height of the cylinder.
     * @param sides - The number of sides.
     * @param loops - The number of loops.
     * @param caps - A boolean indicating whether the ends of the cylinder are capped or open.
     * @param baseZAtZero - The baseZAtZero value.
     */
    constructor(radius?: number, height?: number, sides?: number, loops?: number, caps?: boolean, baseZAtZero?: boolean);
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
export { Cylinder };
