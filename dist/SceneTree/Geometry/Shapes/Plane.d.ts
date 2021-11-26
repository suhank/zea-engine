import { NumberParameter } from '../../Parameters/index';
import { ProceduralMesh } from './ProceduralMesh';
/**
 * A class for generating a plane geometry.
 *
 * ```
 * const plane = new Plane(2.0, 1.5, 10, 10)
 * ```
 *
 * **Parameters**
 * * **SizeX(`NumberParameter`):** Length of the plane along `X` axis.
 * * **SizeY(`NumberParameter`):** Length of the plane along `Y` axis.
 * * **DetailX(`NumberParameter`):** Number of divisions along `X`axis.
 * * **DetailY(`NumberParameter`):** Number of divisions along `Y`axis.
 *
 * @extends {ProceduralMesh}
 */
declare class Plane extends ProceduralMesh {
    /**
     * @member detailXParam - Length of the plane along `X` axis.
     */
    detailXParam: NumberParameter;
    /**
     * @member detailYParam - Length of the plane along `Y` axis.
     */
    detailYParam: NumberParameter;
    /**
     * @member sizeXParam - Number of divisions along `X`axis.
     */
    sizeXParam: NumberParameter;
    /**
     * @member sizeYParam - Number of divisions along `Y`axis.
     */
    sizeYParam: NumberParameter;
    /**
     * Create a plane.
     * @param SizeX - The length of the plane along the X axis.
     * @param SizeY - The length of the plane along the Y axis.
     * @param DetailX - The number of divisions along the X axis.
     * @param DetailY - The number of divisions along the Y axis.
     * @param addNormals - The addNormals value.
     * @param addTextureCoords - The addTextureCoords value.
     */
    constructor(SizeX?: number, SizeY?: number, DetailX?: number, DetailY?: number, addNormals?: boolean, addTextureCoords?: boolean);
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
export { Plane };
