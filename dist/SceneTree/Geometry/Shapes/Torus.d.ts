import { ProceduralMesh } from './ProceduralMesh';
import { NumberParameter } from '../../Parameters/NumberParameter';
/**
 * A class for generating a torus geometry.
 *
 * ```
 * const torus = new Torus(0.4, 1.3)
 * ```
 *
 * @extends ProceduralMesh
 */
declare class Torus extends ProceduralMesh {
    /**
     * @member arcAngleParam - TODO
     */
    arcAngleParam: NumberParameter;
    /**
     * @member detailParam - TODO
     */
    detailParam: NumberParameter;
    /**
     * @member innerRadiusParam - TODO
     */
    innerRadiusParam: NumberParameter;
    /**
     * @member outerRadiusParam - TODO
     */
    outerRadiusParam: NumberParameter;
    /**
     * Creates an instance of Torus.
     *
     * @param innerRadius - The inner radius of the torus.
     * @param outerRadius - The outer radius of the torus.
     * @param detail - The detail of the cone.
     * @param arcAngle - The angle of the arc.
     */
    constructor(innerRadius?: number, outerRadius?: number, detail?: number, arcAngle?: number);
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
export { Torus };
