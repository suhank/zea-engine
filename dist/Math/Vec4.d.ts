import { Vec3 } from './Vec3';
import { BinReader } from '../SceneTree/BinReader';
/**
 * Represents a four-dimensional coordinate.
 * Math types internally store values in {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array} and
 * expose getters and setters for the component values.
 *
 */
declare class Vec4 {
    __data: Float32Array | Uint32Array | Int32Array;
    /**
     * Creates a Vec4.
     *
     * The type of values of the `(x, y, z, t)` coordinates can be {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array},
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array|Uint32Array},
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array|Int32Array} and
     * {@link https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer|ArrayBuffer}.
     *
     * You can also pass one JSON object parameter.
     *
     * @param x - The x value. Default is 0.
     * @param y - The y value. Default is 0.
     * @param z - The y value. Default is 0.
     * @param t - The t value. Default is 0.
     */
    constructor(x?: number | Float32Array | ArrayBuffer, y?: number, z?: number, t?: number);
    /**
     * Getter for `x` value.
     *
     * @return - Returns the x value.
     */
    get x(): number;
    /**
     * Setter for `x` value.
     *
     * @param val - The val param.
     */
    set x(val: number);
    /**
     * Getter for `y` value.
     *
     * @return - Returns the y value.
     */
    get y(): number;
    /**
     * Setter for `y` value.
     *
     * @param val - The val param.
     */
    set y(val: number);
    /**
     * Getter for `z` value.
     *
     * @param val - The val param.
     */
    get z(): number;
    /**
     * Setter for `z` value.
     *
     * @param val - The val param.
     */
    set z(val: number);
    /**
     * Getter for `t` value.
     *
     * @param val - The val param.
     */
    get t(): number;
    /**
     * Setter for `t` value.
     *
     * @param val - The val param.
     */
    set t(val: number);
    /**
     * Getter for `w` value.
     *
     * @param val - The val param.
     */
    get w(): number;
    /**
     * Setter for `w` value.
     *
     * @param val - The val param.
     */
    set w(val: number);
    /**
     * Getter for `xyz` swizzel.
     *
     * @return - Returns the z value.
     */
    get xyz(): Vec3;
    /**
     * Setter from scalar components.
     *
     * @param x - The x value.
     * @param y  - The y value.
     * @param z  - The y value.
     * @param t  - The t value.
     */
    set(x: number, y: number, z: number, t: number): void;
    /**
     * Sets the state of a Vec4 Object from another Vec4.
     *
     * @param other - The other Vec4 to set from.
     */
    setFromOther(other: Vec4): void;
    /**
     * Checks if this Vec4 contains the same values as the other Vec4.
     *
     * @param other - The other Vec4 to compare with.
     * @return - Returns true or false.
     */
    isEqual(other: Vec4): boolean;
    /**
     * Checks if this Vec4 is different from another Vec4.
     *
     * @param other - The other Vec4 to compare with.
     * @return - Returns true or false.
     */
    notEqual(other: Vec4): boolean;
    /**
     * Returns true if this Vec4 is approximately the same as other.
     *
     * @param other - The other Vec4 to compare with.
     * @param precision - The precision to which the values must match.
     * @return - The return value.
     */
    approxEqual(other: Vec4, precision?: number): boolean;
    /**
     * Adds other to this Vec4 and returns the result as a new Vec4.
     *
     * @param other - The other Vec4 to add.
     * @return - Returns a new Vec4.
     */
    add(other: Vec4): Vec4;
    /**
     * Adds other to this Vec4 mutating the values of this instance
     *
     * @param other - The other Vec4 to add.
     */
    addInPlace(other: Vec4): void;
    /**
     * Subtracts other from this Vec4 and returns then result as a new Vec4.
     *
     * @param other - The other Vec4 to subtract.
     * @return - Returns a new Vec4.
     */
    subtract(other: Vec4): Vec4;
    /**
     * Subtracts other from this Vec4 mutating the values of this instance
     *
     * @param other - The other Vec4 to subtract.
     */
    subtractInPlace(other: Vec4): void;
    /**
     * Multiplies two Vec4s and returns the result as a new Vec4.
     *
     * @param other - The other Vec4 to multiply with.
     * @return - Returns a new Vec4.
     */
    multiply(other: Vec4): Vec4;
    /**
     * Multiplies two Vec4s mutating the values of this instance
     *
     * @param other - The other Vec4 to multiply with.
     */
    multiplyInPlace(other: Vec4): void;
    /**
     * Divides two Vec4s and returns the result as a new Vec4.
     *
     * @param other - The other Vec4 to divide by.
     * @return - Returns a new Vec4.
     */
    divide(other: Vec4): Vec4;
    /**
     * Divides two Vec4s.
     *
     * @param other - The other Vec4 to divide by.
     */
    divideInPlace(other: Vec4): void;
    /**
     * Scales this Vec4 by scalar and returns the result as a new Vec4.
     *
     * @param scalar - The scalar value.
     * @return - The return value.
     */
    scale(scalar: number): Vec4;
    /**
     * Scales this Vec4 by scalar.
     *
     * @param scalar - The scalar value.
     */
    scaleInPlace(scalar: number): void;
    /**
     * Calculates the length of this Vec4.
     *
     * @return - Returns the length.
     */
    length(): number;
    /**
     * Calculates the squared length of this Vec4.
     *
     * @return - Returns the length.
     */
    lengthSquared(): number;
    /**
     * Normalizes the Vec4 and returns it as a new Vec4.
     * Multiplies coordinates value by the inverse of the vector length.
     *
     * @return - Returns the Vec4 normalized.
     */
    normalize(): Vec4;
    /**
     * Normalizes this Vec4 multiplying coordinate values by the inverse of the vector length.
     */
    normalizeInPlace(): void;
    /**
     * Calculates the dot product of this Vec4 against another Vec4.
     *
     * @param other - The other Vec4 to compare with.
     * @return - Returns the dot product.
     */
    dot(other: Vec4): number;
    /**
     * Calculates the cross product of two Vec4s and returns the result as a new Vec4.
     *
     * @param other - The other Vec4 to calculate with.
     * @return - Returns the cross product as a new Vec4.
     */
    cross(other: Vec4): Vec4;
    /**
     * Gets the angle between this Vec4 and b.
     *
     * @param other - The other Vec4 to compare with.
     * @return - Returns the angle in radians.
     */
    angleTo(other: Vec4): number;
    /**
     * Performs a linear interpolation between this Vec4 and other.
     *
     * @param other - The other Vec4 to interpolate between.
     * @param t - Interpolation amount between the two inputs.
     * @return - Returns a new Vec4.
     */
    lerp(other: Vec4, t: number): Vec4;
    /**
     * Generates a random vector with the given scale.
     *
     * @param scale - Length of the resulting vector. If omitted, a unit vector will be returned.
     * @return - The return value.
     */
    /**
     * Clones this Vec4 and returns a new Vec4.
     *
     * @return - Returns a new Vec4.
     */
    clone(): Vec4;
    /**
     * Converts this Vec4 into a Vec3.
     *
     * @return - Returns the value as a new Vec3.
     */
    toVec3(): Vec3;
    /**
     * Returns the type as an array. Often used to pass types to the GPU.
     *
     * @return - Returns as an array.
     */
    asArray(): Float32Array | Uint32Array | Int32Array;
    /**
     * Converts this Vec3 to a string in JSON format.
     *
     * @return - The return value.
     */
    toString(): string;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @return - The json object.
     */
    toJSON(): Record<string, number>;
    /**
     * Decodes a JSON object to set the state of this class.
     *
     * @param j - The json object.
     */
    fromJSON(j: Record<string, number>): void;
    /**
     * Loads the state of the value from a binary reader.
     *
     * @param reader - The reader value.
     */
    readBinary(reader: BinReader): void;
    /**
     * Verifies if the values stored in this Math type are valid numeric values.
     * Returns `false` If at least one of the values is either {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/Infinity|Infinity} or
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/NaN|NaN}.
     *
     * @return - Returns the result as a boolean.
     */
    isValid(): boolean;
}
export { Vec4 };
