import { NumberParameter } from '../../Parameters/NumberParameter';
import { ProceduralMesh } from './ProceduralMesh';
/**
 * A class for generating a sphere geometry.
 *
 * ```
 * const sphere = new Sphere(1.4, 13)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Radius of the sphere.
 * * **Sides(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Loops(`NumberParameter`):** Specifies the number of subdivisions(stacks) along the `Z` axis.
 *
 * @extends {ProceduralMesh}
 */
declare class Sphere extends ProceduralMesh {
    /**
     * @member radiusParam - Radius of the sphere.
     */
    radiusParam: NumberParameter;
    /**
     * @member sidesParam - Specifies the number of subdivisions around the `Z` axis.
     */
    sidesParam: NumberParameter;
    /**
     * @member loopsParam - Specifies the number of subdivisions(stacks) along the `Z` axis.
     */
    loopsParam: NumberParameter;
    /**
     * Creates an instance of Sphere.
     * @param radius - The radius of the sphere.
     * @param sides - The number of sides.
     * @param loops - The number of loops.
     * @param addNormals - Compute vertex normals for the geometry
     * @param addTextureCoords - Compute texture coordinates for the geometry
     */
    constructor(radius?: number, sides?: number, loops?: number, addNormals?: boolean, addTextureCoords?: boolean);
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
export { Sphere };
