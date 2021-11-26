import { NumberParameter } from '../../Parameters/index';
import { ProceduralLines } from './ProceduralLines';
/**
 * A class for generating a circle shape using line segments.
 *
 * ```
 * const circle = new Circle(2.2, 12)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Radius of the circle.
 * * **Angle(`NumberParameter`):** Number of segments used to build the circle.
 * * **Sides(`NumberParameter`):** Segments angle in radiants.
 *
 * @extends {ProceduralLines}
 */
declare class Circle extends ProceduralLines {
    /**
     * @member angleParam - TODO
     */
    angleParam: NumberParameter;
    /**
     * @member sidesParam - The number of sides that compose the circle (e.g. 3 creates a triangle)
     */
    sidesParam: NumberParameter;
    /**
     * @member radiusParam - The radius of the circle
     */
    radiusParam: NumberParameter;
    /**
     * Creates an instance of Circle.
     * @param radius - The radius of the circle.
     * @param sides - The number of segments.
     * @param angle - Arc segments angle(radians)
     */
    constructor(radius?: number, sides?: number, angle?: number);
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
export { Circle };
