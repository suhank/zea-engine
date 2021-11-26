/* eslint-disable new-cap */
import { StringFunctions } from '../Utilities/StringFunctions';
import { Vec3 } from './Vec3';
/**
 * Class representing a mathematical sphere, as opposed to the Sphere class derived from ProceduralMesh.
 *
 */
class SphereType {
    /**
     * Create a sphere.
     * @param pos - The position of the sphere.
     * @param radius - The radius of the sphere.
     */
    constructor(pos = new Vec3(), radius = 0) {
        if (pos instanceof Vec3) {
            this.pos = pos;
        }
        else {
            this.pos = new Vec3();
        }
        this.radius = radius;
    }
    /**
     * Clones this sphere and returns a new sphere.
     *
     * @return - Returns a new sphere.
     */
    clone() {
        return new SphereType(this.pos.clone(), this.radius);
    }
    /**
     * Checks if this sphere intersects a box.
     *
     * @param box - The box value.
     * @return - The return value.
     */
    intersectsBox(box) {
        return box.intersectsSphere(this);
    }
    // ///////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON() {
        return {
            pos: this.pos.toJSON(),
            radius: this.radius,
        };
    }
    /**
     * Calls `toJSON` method and stringifies it.
     *
     * @return - The return value.
     */
    toString() {
        return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON());
    }
}
export { SphereType };
//# sourceMappingURL=SphereType.js.map