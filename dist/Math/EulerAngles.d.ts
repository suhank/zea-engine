/**
 * Class representing euler angles. Euler angles describe rotating an object
 * around its various axis in a specified axis order.
 *
 */
declare class EulerAngles {
    order: number;
    __data: Float32Array;
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
    constructor(x?: number | ArrayBuffer, y?: number, z?: number, order?: number | string);
    /**
     * Getter for x axis rotation.
     *
     * @return - Returns the x axis rotation.
     */
    get x(): number;
    /**
     * Setter for x axis rotation.
     *
     * @param val - The val param.
     */
    set x(val: number);
    /**
     * Getter for y axis rotation.
     *
     * @return - Returns the y axis rotation.
     */
    get y(): number;
    /**
     * Setter for y axis rotation.
     *
     * @param val - The val param.
     */
    set y(val: number);
    /**
     * Getter for z axis rotation.
     *
     * @return - Returns the z axis rotation.
     */
    get z(): number;
    /**
     * Setter for z axis rotation.
     *
     * @param val - The val param.
     */
    set z(val: number);
    /**
     * Sets the EulerAngles
     *
     * @param x - The x axis rotation in radians.
     * @param y - The y axis rotation in radians.
     * @param z - The z axis rotation in radians.
     */
    set(x: number, y: number, z: number): void;
    /**
     * Converts this Vec3 to a string in JSON format.
     *
     * @return - The return value.
     */
    toString(): string;
    toJSON(): Record<string, number>;
    fromJSON(json: Record<string, number>): void;
}
export { EulerAngles };
