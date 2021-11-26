import { Vec3 } from './Vec3';
import { Box3 } from './Box3';
/**
 * Class representing a mathematical sphere, as opposed to the Sphere class derived from ProceduralMesh.
 *
 */
declare class SphereType {
    pos: Vec3;
    radius: number;
    /**
     * Create a sphere.
     * @param pos - The position of the sphere.
     * @param radius - The radius of the sphere.
     */
    constructor(pos?: Vec3, radius?: number);
    /**
     * Clones this sphere and returns a new sphere.
     *
     * @return - Returns a new sphere.
     */
    clone(): SphereType;
    /**
     * Checks if this sphere intersects a box.
     *
     * @param box - The box value.
     * @return - The return value.
     */
    intersectsBox(box: Box3): boolean;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, number | Record<string, number>>;
    /**
     * Calls `toJSON` method and stringifies it.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { SphereType };
