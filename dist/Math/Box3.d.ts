import { Vec3 } from './Vec3';
import { Mat4 } from './Mat4';
import { SphereType } from './SphereType';
import { Xfo } from './Xfo';
import { PlaneType } from './PlaneType';
/**
 * Class representing a box in 3D space.
 * Represents a box in 3D space defined by two Vec3 values which define opposing corners of the box.
 */
declare class Box3 {
    p0: Vec3;
    p1: Vec3;
    /**
     * Creates a Box3 object using Vec3s.
     * In case the parameters are not passed by, their values are pre-defined:
     *
     * p0 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY|`Number.POSITIVE_INFINITY`}
     *
     * p1 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY|`Number.NEGATIVE_INFINITY`}
     *
     * @param p0 - A point representing the corners of a 3D box.
     * @param p1 - A point representing the corners of a 3D box.
     */
    constructor(p0?: Vec3 | Float32Array, p1?: Vec3);
    /**
     * Getter for the lower (x, y, z) boundary of the box.
     *
     * @return - Returns the minimum Vec3.
     */
    get min(): Vec3;
    /**
     * Getter for the upper (x, y, z) boundary of the box.
     *
     * @return - Returns the maximum Vec3.
     */
    get max(): Vec3;
    /**
     * Sets both Vec3 points
     *
     * @param p0 - A point representing the corners of a 3D box.
     * @param p1 - A point representing the corners of a 3D box.
     */
    set(p0: Vec3, p1: Vec3): void;
    /**
     * Resets the box3 back to an uninitialized state.
     */
    reset(): void;
    /**
     * Returns `true` if the box has been expanded to contain a point.
     *
     * @return - The return value.
     */
    isValid(): boolean;
    /**
     * Expands the Box3 to contain the new point.
     *
     * @param point - A point represents the corners of a 3D box.
     */
    addPoint(point: Vec3): void;
    /**
     * Adds `Box3` to this `Box3`, of the Xfo instance is passed in the parameters
     * it proceeds to apply the transform for the Vec3.
     *
     * @param box3 - A 3D box.
     * @param xfo - A 3D transform.
     */
    addBox3(box3: Box3, transform?: Xfo | Mat4): void;
    /**
     * Returns the length of the diagonal of the box.
     *
     * @return - Returns the distance.
     */
    size(): number;
    /**
     * Returns the diagonal vector of the B=box from p0 to p1.
     *
     * @return - Returns a Box3.
     */
    diagonal(): Vec3;
    /**
     * Returns the center point of a Box3.
     *
     * @return - Returns a Vec3.
     */
    center(): Vec3;
    /**
     * Converts this Box3 to a Mat4 (a 4x4 matrix). The returned mat4 would transform a unit cube into the shape of the Bounding box.
     *
     * @return - Returns a new Mat4.
     */
    toMat4(): Mat4;
    /**
     * Calculates and returns the bounding Sphere of the Box3
     *
     * @return - The return value.
     */
    getBoundingSphere(): SphereType;
    /**
     * Determines if this Box3 intersects a given box value.
     *
     * @param box - The box to check for intersection against.
     * @return - Returns true if the shapes intersect.
     */
    intersectsBox(box: Box3): boolean;
    /**
     * Determines if this Box3 intersects a sphere.
     *
     * @param sphere - The sphere to check for intersection against.
     * @return - Returns true if the shapes intersect.
     */
    intersectsSphere(sphere: SphereType): boolean;
    /**
     * Determines if this Box3 intersects a plane.
     *
     * @param plane - The plane to check for intersection against.
     * @return - The return value.
     */
    intersectsPlane(plane: PlaneType): boolean;
    /**
     * Clones this Box3 and returns a new Box3.
     * @return - Returns a new Box3.
     */
    clone(): Box3;
    /**
     * Encodes `Box3` Class as a JSON object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, Record<string, number>>;
    /**
     * Decodes a JSON object to set the state of this class.
     *
     * @param j - The json object.
     */
    fromJSON(j: Record<string, Record<string, number>>): void;
    /**
     * The setFromFloat32Array method.
     * @param float32array - The float32array value.
     * @private
     */
    setFromFloat32Array(float32array: Float32Array): void;
    /**
     * Calls `toJSON` method and stringifies it.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { Box3 };
