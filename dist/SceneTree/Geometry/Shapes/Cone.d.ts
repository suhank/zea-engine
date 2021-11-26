import { BooleanParameter, NumberParameter } from '../../../SceneTree/Parameters/index';
import { ProceduralMesh } from './ProceduralMesh';
/**
 * Represents a cone geometry.
 *
 * ```
 * const cone = new Cone(1.2, 4.0)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Specifies the radius of the base of the cone.
 * * **Height(`NumberParameter`):** Specifies the height of the cone.
 * * **Detail(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Cap(`BooleanParameter`):** Specifies whether the base of the cone is capped or open.
 *
 * @extends {ProceduralMesh}
 */
declare class Cone extends ProceduralMesh {
    /**
     * @member capParam - Specifies whether the base of the cone is capped or open.
     */
    capParam: BooleanParameter;
    /**
     * @member detailParam - Specifies the number of subdivisions around the `Z` axis.
     */
    detailParam: NumberParameter;
    /**
     * @member heightParam - Specifies the height of the cone.
     */
    heightParam: NumberParameter;
    /**
     * @member radiusParam - Specifies the radius of the base of the cone.
     */
    radiusParam: NumberParameter;
    /**
     * Create a cone.
     * @param radius - The radius of the base of the cone.
     * @param height - The height of the cone.
     * @param detail - The detail of the cone.
     * @param cap -  A boolean indicating whether the base of the cone is capped or open.
     * @param addNormals - Compute vertex normals for the geometry
     * @param addTextureCoords - Compute texture coordinates for the geometry
     */
    constructor(radius?: number, height?: number, detail?: number, cap?: boolean, addNormals?: boolean, addTextureCoords?: boolean);
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
export { Cone };
