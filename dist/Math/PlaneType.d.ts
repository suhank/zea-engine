import { Vec3 } from './Vec3';
/**
 * Class representing a plane.
 */
declare class PlaneType {
    normal: Vec3;
    w: number;
    /**
     * Create a plane.
     *
     * @param normal - The normal of the plane.
     * @param w - The w value.
     */
    constructor(normal?: Vec3, w?: number);
    /**
     * Setter from scalar components.
     *
     * @param x - The x value.
     * @param y - The y value.
     * @param z - The z value.
     * @param w - The w value.
     */
    set(x: number, y: number, z: number, w: number): void;
    /**
     * The divideScalar method
     *
     * @param value - The value value.
     */
    divideScalar(value: number): void;
    /**
     * Calculates the distance from a point to this plane.
     *
     * @param point - The point value.
     * @return - The return value.
     */
    distanceToPoint(point: Vec3): number;
    /**
     * Normalize this plane in place modifying its values.
     */
    normalizeInPlace(): void;
    /**
     * Clones this plane and returns a new plane.
     *
     * @return - Returns a new plane.
     */
    clone(): PlaneType;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, unknown>;
    fromJSON(json: Record<string, any>): void;
    /**
     * Calls `toJSON` method and stringifies it.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { PlaneType };
