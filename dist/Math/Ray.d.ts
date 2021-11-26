import { Vec3 } from './Vec3';
import { Box3 } from './Box3';
/**
 * Class representing a ray that starts from an origin in a specified direction.
 */
declare class Ray {
    dir: Vec3;
    start: Vec3;
    /**
     * Create a ray.
     *
     * @param start - The origin of the ray.
     * @param dir - The direction of the ray.
     */
    constructor(start?: Vec3, dir?: Vec3);
    /**
     * Get the closest point on the ray to the given point.
     *
     * @param point - The point in 3D space.
     * @return - returns a number
     */
    closestPoint(point: Vec3): number;
    /**
     * Get the closest point between the ray and the given line segment made of the 2 points.
     *
     * @param p0 - The point in 3D space.
     * @param p1 - The point in 3D space.
     * @return - Returns an array containing 2 scalar values indicating 0: the fraction of the line segment, 1: distance along the Ray
     */
    closestPointOnLineSegment(p0: Vec3, p1: Vec3): Array<number>;
    /**
     * Get the closest point at a distance.
     *
     * @param dist - The distance value.
     * @return - Returns a Vec3.
     */
    pointAtDist(dist: number): Vec3;
    /**
     * Returns the two ray params that represent the closest point between the two rays.
     *
     * @param ray - The ray value.
     * @return - Returns a Ray.
     */
    intersectRayVector(ray: Ray): number | Vec3 | number[];
    /**
     * Returns one ray param representing the intersection
     * of this ray against the plane defined by the given ray.
     *
     * @param plane - The plane to intersect with.
     * @return - The return value.
     */
    intersectRayPlane(plane: Ray): number;
    /**
     * Determines if this Box3 intersects a ray.
     *
     * @param box3 - The box to check for intersection against.
     * @param tolerance - The tolerance of the test.
     * @return - The return value.
     */
    intersectRayBox3(box3: Box3, tolerance?: number): boolean;
    /**
     * Clones this Ray and returns a new Ray.
     *
     * @return - Returns a new Ray.
     */
    clone(): Ray;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, Record<string, number>>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object.
     */
    fromJSON(j: Record<string, Record<string, number>>): void;
    /**
     * Calls `toJSON` method and stringifies it.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { Ray };
