import { PlaneType } from './PlaneType';
import { Box3 } from './Box3';
import { Mat4 } from './Mat4';
/**
 * Class representing a Frustum. Frustums are used to determine what
 * is inside the camera's field of view.
 * @private
 * */
declare class Frustum {
    planes: PlaneType[];
    /**
     * Create a Frustum
     * @param p0 - the p0 value.
     * @param p1 - the p1 value.
     * @param p2 - the p2 value.
     * @param p3 - the p3 value.
     * @param p4 - the p4 value.
     * @param p5 - the p5 value.
     */
    constructor(p0: PlaneType, p1: PlaneType, p2: PlaneType, p3: PlaneType, p4: PlaneType, p5: PlaneType);
    /**
     * The setFromMatrix configures a Frustum object using a matrix.
     * Typically the matrix is a model view projection matrix.
     * @param mat4 - The matrix to use.
     */
    setFromMatrix(mat4: Mat4): void;
    /**
     * Tests a box to see if it is entirely within the frustum.
     * @param box3 - The box to test.
     * @return - True if the frustum intersects the box.
     */
    intersectsBox(box3: Box3): boolean;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object.
     */
    fromJSON(j: Record<string, any>): void;
    /**
     * Calls `toJSON` method and stringifies it.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { Frustum };
