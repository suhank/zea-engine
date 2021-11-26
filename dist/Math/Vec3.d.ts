import { Vec2 } from './Vec2';
import { BinReader } from '../SceneTree/BinReader';
/**
 * Represents a three dimensional coordinate, such as 3D scene values, or mesh vertex positions.
 *
 * Math types internally store values in {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array} and
 * expose getters and setters for the component values.
 */
declare class Vec3 {
    __data: Float32Array | Uint32Array | Int32Array;
    /**
     * Creates a Vec3.
     *
     * The type of values of the `(x, y, z)` coordinates can be {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array},
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array|Uint32Array},
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array|Int32Array} and
     * {@link https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer|ArrayBuffer}.
     *
     * You can also pass one JSON object parameter.
     *
     * @param x - The x value. Default is 0.
     * @param y - The y value. Default is 0.
     * @param z - The z value. Default is 0.
     */
    constructor(x?: number | Float32Array | Uint32Array | ArrayBuffer, y?: number, z?: number);
    /**
     * Getter for `x` component.
     *
     * @return - Returns the x component.
     */
    get x(): number;
    /**
     * Setter for `x` component.
     *
     * @param val - The val param.
     */
    set x(val: number);
    /**
     * Getter for `y` component.
     *
     * @return - Returns the y component.
     */
    get y(): number;
    /**
     * Setter for `y` component.
     *
     * @param val - The val param.
     */
    set y(val: number);
    /**
     * Getter for `z` component.
     *
     * @return - Returns the z component.
     */
    get z(): number;
    /**
     * Setter for `z` component.
     *
     * @param val - The val param.
     */
    set z(val: number);
    /**
     * Getter for `xy` swizzel.
     *
     * @return - Returns the xy components as a Vec2.
     */
    get xy(): Vec2;
    /**
     * Getter for `yz` swizzel.
     *
     * @return - Returns the yz components as a Vec2.
     */
    get yz(): Vec2;
    /**
     * Setter from scalar components.
     *
     * @param x - The x component.
     * @param y - The y component.
     * @param z - The y component.
     */
    set(x: number, y: number, z: number): void;
    /**
     * Sets the state of a Vec3 Object.
     *
     * @param float32Array - The float32Array value.
     */
    setDataArray(float32Array: Float32Array): void;
    /**
     * Sets the state of a Vec3 Object from another Vec3.
     *
     * @param other - The other Vec3 to set from.
     */
    setFromOther(other: Vec3): void;
    /**
     * Checks if the coordinates of this Vec3 are 0 0 0.
     *
     * @return - Returns `true` if the coordinates are(0, 0, 0), otherwise, `false`.
     */
    isNull(): boolean;
    /**
     * Checks if the coordinates of this Vec3 are 1 1 1.
     *
     * @return - Returns `true` if the coordinates are(1, 1, 1), otherwise, `false`.
     */
    is111(): boolean;
    /**
     * Checks if this Vec3 contains the same values as the other Vec3.
     *
     * @param other - The other Vec3 to compare with.
     * @return - Returns `true` if the values are the same, otherwise, `false`.
     */
    isEqual(other: Vec3): boolean;
    /**
     * Checks if this Vec2 is different from another Vec2.
     *
     * @param other - The other Vec3 to compare with.
     * @return - Returns `true` if the Vec3s are different, otherwise, `false`.
     */
    notEqual(other: Vec3): boolean;
    /**
     * Returns true if this Vec2 is approximately the same as other.
     *
     * @param other - The other Vec3 to compare with.
     * @param precision - The precision to which the values must match.
     * @return - Returns true or false.
     */
    approxEqual(other: Vec3, precision?: number): boolean;
    /**
     * Adds other to this Vec3 and return the result as a new Vec3.
     *
     * @param other - The other Vec3 to add.
     * @return - Returns a new Vec3.
     */
    add(other: Vec3): Vec3;
    /**
     * Adds other to this Vec3.
     *
     * @param other - The other Vec3 to add.
     */
    addInPlace(other: Vec3): void;
    /**
     * Subtracts other from this Vec3 and returns the result as a new Vec3.
     *
     * @param other - The other Vec3 to subtract.
     * @return - Returns a new Vec3.
     */
    subtract(other: Vec3): Vec3;
    /**
     * Subtracts other from this Vec3.
     *
     * @param other - The other Vec3 to subtract.
     */
    subtractInPlace(other: Vec3): void;
    /**
     * Multiplies two Vec3s and returns the result as a new Vec3.
     *
     * @param other - The other Vec3 to multiply with.
     * @return - Returns a new Vec3.
     */
    multiply(other: Vec3): Vec3;
    /**
     * Multiplies two Vec3s.
     *
     * @param other - The other Vec3 to multiply with.
     */
    multiplyInPlace(other: Vec3): void;
    /**
     * Divides two Vec3s and returns the result as a new Vec3.
     *
     * @param vec3 - The other Vec3 to divide by.
     * @return - Returns a new Vec3.
     */
    divide(vec3: Vec3): Vec3;
    /**
     * Divides two Vec3s.
     *
     * @param vec3 - The other Vec3 to divide by.
     */
    divideInPlace(vec3: Vec3): void;
    /**
     * Scales this Vec3 by scalar and returns the result as a new Vec3.
     *
     * @param scalar - The scalar value.
     * @return - Returns a new Vec3.
     */
    scale(scalar: number): Vec3;
    /**
     * Scales this Vec3 by scalar.
     *
     * @param scalar - The scalar value.
     */
    scaleInPlace(scalar: number): void;
    /**
     * Negates this Vec3 (x = -x, y = -y and z = -z), but returns the result as a new Vec3.
     *
     * @return - Returns a new Vec3.
     */
    negate(): Vec3;
    /**
     * Returns the inverse of this Vec3, but returns. the result as a new Vec3
     *
     * @return - Returns a new Vec3.
     */
    inverse(): Vec3;
    /**
     * Calculates the squared length of this Vec3.
     *
     * @return - Returns the length.
     */
    lengthSquared(): number;
    /**
     * Calculates the length of this Vec3.
     *
     * @return - Returns the length.
     */
    length(): number;
    /**
     * Calculates the distance to another Vec3.
     *
     * @param other - The other Vec3 to calculate the distance to.
     * @return - Returns the distance between vectors.
     */
    distanceTo(other: Vec3): number;
    /**
     * Normalizes the Vec3 and returns it as a new Vec3.
     * Multiplies coordinates value by the inverse of the vector length.
     *
     * @return - Returns the Vec3 normalized.
     */
    normalize(): Vec3;
    /**
     * Normalizes this Vec3 multiplying coordinate values by the inverse of the vector length.
     *
     * @return - The return value.
     */
    normalizeInPlace(): number | void;
    /**
     * Creates and returns a new Vec3 with the new coordinates(calculated with this Vec3 coordinates and the specified length).
     *
     * @param length - The length value.
     * @return - The return value.
     */
    resize(length: number): Vec3 | void;
    /**
     * Modifies current coordinates using the specified length.
     *
     * @param length - The length value.
     */
    resizeInPlace(length: number): void;
    /**
     * Calculates the dot product of this Vec3 against another Vec3.
     *
     * @param other - The other Vec3 to compare with.
     * @return - Returns the dot product.
     */
    dot(other: Vec3): number;
    /**
     * Calculates the cross product of two Vec3s and returns the result as a new Vec3.
     *
     * @param other - The other Vec3 to calculate with.
     * @return - Returns the cross product as a new Vec3.
     */
    cross(other: Vec3): Vec3;
    /**
     * Gets the angle between this Vec3 and b.
     *
     * @param other - The other Vec3 to compare with.
     * @return - Returns the angle in radians.
     */
    angleTo(other: Vec3): number;
    /**
     * Performs a linear interpolation between this Vec3 and other.
     *
     * @param other - The other Vec3 to interpolate between.
     * @param t - Interpolation amount between the two inputs.
     * @return - Returns a new Vec3.
     */
    lerp(other: Vec3, t: number): Vec3;
    /**
     * Returns a new Vec3 whose component values are the abs of this Vec3s component values.
     *
     * @return - Returns a new Vec3.
     */
    abs(): Vec3;
    /**
     * Sets the vector a random vector on the surface of a sphere with the radius of the given scale value.
     *
     * @param scale - The radius of the surface sphere.
     * @return - The random Vec3.
     */
    setRandomDir(scale?: number): Vec3;
    /**
     * Generates a random vector anywhere in the sphere defined by the provided scale value.
     *
     * @param scale - The radius of the bounding sphere.
     * @return - The random Vec3.
     */
    setRandom(scale?: number): Vec3;
    /**
     * Clones this Vec3 and returns a new Vec3.
     *
     * @return - Returns a new Vec3.
     */
    clone(): Vec3;
    /**
     * Returns the type as an array. Often used to pass types to the GPU.
     *
     * @return - Returns as an array.
     */
    asArray(): Float32Array;
    /**
     * Converts this Vec3 to a string in JSON format.
     *
     * @return - The return value.
     */
    toString(): string;
    /**
     * Encodes Vec3 Class as a JSON object for persistence.
     *
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
    isValid(): boolean;
}
export { Vec3 };
