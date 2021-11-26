import { StringFunctions } from '../Utilities/StringFunctions';
/**
 * Class representing euler angles. Euler angles describe rotating an object
 * around its various axis in a specified axis order.
 *
 */
class EulerAngles {
    /**
     * Create a euler angle. Receives the xyz values in radians and the order that the rotations are applied.
     *
     * Order parameter values: `XYZ: 0`, `YZX: 1`, `ZXY: 2`, `XZY: 3`, `ZYX: 4`, `YXZ: 5`
     *
     * It could be either the `string` or the `number` value.
     *
     * @param x - The angle of the x axis in degrees. Default is 0.
     * @param y - The angle of the y axis in degrees. Default is 0.
     * @param z - The angle of the z axis in degrees. Default is 0.
     * @param order - The order in which the rotations are applied.
     */
    constructor(x = 0, y = 0, z = 0, order = 0) {
        if (typeof order === 'number' && !isNaN(order))
            this.order = order;
        else {
            switch (order) {
                case 'XYZ':
                    this.order = 0;
                    break;
                case 'YZX':
                    this.order = 1;
                    break;
                case 'ZXY':
                    this.order = 2;
                    break;
                case 'XZY':
                    this.order = 3;
                    break;
                case 'ZYX':
                    this.order = 4;
                    break;
                case 'YXZ':
                    this.order = 5;
                    break;
                default:
                    throw new Error('Invalid Euler Angles Order:' + order);
            }
        }
        if (x instanceof ArrayBuffer) {
            const buffer = x;
            const byteOffset = y;
            this.__data = new Float32Array(buffer, byteOffset, 4);
        }
        else {
            this.__data = new Float32Array(3);
            this.__data[0] = x;
            this.__data[1] = y;
            this.__data[2] = z;
        }
    }
    /**
     * Getter for x axis rotation.
     *
     * @return - Returns the x axis rotation.
     */
    get x() {
        return this.__data[0];
    }
    /**
     * Setter for x axis rotation.
     *
     * @param val - The val param.
     */
    set x(val) {
        this.__data[0] = val;
    }
    /**
     * Getter for y axis rotation.
     *
     * @return - Returns the y axis rotation.
     */
    get y() {
        return this.__data[1];
    }
    /**
     * Setter for y axis rotation.
     *
     * @param val - The val param.
     */
    set y(val) {
        this.__data[1] = val;
    }
    /**
     * Getter for z axis rotation.
     *
     * @return - Returns the z axis rotation.
     */
    get z() {
        return this.__data[2];
    }
    /**
     * Setter for z axis rotation.
     *
     * @param val - The val param.
     */
    set z(val) {
        this.__data[2] = val;
    }
    /**
     * Sets the EulerAngles
     *
     * @param x - The x axis rotation in radians.
     * @param y - The y axis rotation in radians.
     * @param z - The z axis rotation in radians.
     */
    set(x, y, z) {
        this.__data[0] = x;
        this.__data[1] = y;
        this.__data[2] = z;
    }
    // ///////////////////////////
    // Persistence
    /**
     * Converts this Vec3 to a string in JSON format.
     *
     * @return - The return value.
     */
    toString() {
        // eslint-disable-next-line new-cap
        return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON());
    }
    toJSON() {
        return {
            x: this.__data[0],
            y: this.__data[1],
            z: this.__data[2],
            order: this.order,
        };
    }
    fromJSON(json) {
        this.__data[0] = json.x;
        this.__data[1] = json.y;
        this.__data[2] = json.z;
        this.order = json.order;
    }
}
export { EulerAngles };
//# sourceMappingURL=EulerAngles.js.map