import { BinReader } from '../SceneTree/BinReader';
/**
 * Representing a Vec2(two-dimensional floating point vector). A Vec2 is for representing 2 dimensional values, such as screen coordinates or pixel coordinates within an image.
 *
 * Math types internally store values in {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array} and
 * expose getters and setters for the component values.
 *
 */
declare class Vec2 {
    __data: Float32Array | Uint32Array | Int32Array;
    /**
     * Creates a Vec2.
     *
     * The type of values of the `(x, y)` coordinates can be {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array},
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array|Uint32Array},
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array|Int32Array} and
     * {@link https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer|ArrayBuffer}.
     *
     *
     * ```javascript
     *  const myVec2 = new Vec2(1.2, 3.4)
     * ```
     *
     * Given an array of floats, create a Vec2 that wraps some part of it.
     * ```javascript
     *  const floatArray = new Float32Array(6)
     *  floatArray[0] = 1.2
     *  floatArray[1] = 3.4
     *  const myVec2 = new Vec2(floatArray)
     *  console.log(myVec2.toJSON())
     * ```
     * The resulting output
     * ```json
     *  > { x:1.2, y:3.4 }
     * ```
     *
     * Given an array of floats, create a Vec2 that wraps some part of it.
     * ```javascript
     *  const floatArray = new Float32Array(6)
     *  floatArray[0] = 1.2
     *  floatArray[1] = 3.4
     *  floatArray[2] = 5.6
     *  floatArray[3] = 7.8
     *  floatArray[4] = 9.0
     *  floatArray[5] = 1.9
     *  const myVec2 = new Vec2(floatArray.buffer, 8)
     *  console.log(myVec2.toJSON())
     * ```
     * The resulting output
     * ```json
     *  > { x:5.6, y:7.8 }
     * ```
     *
     * You can also pass one JSON object parameter.
     * ```javascript
     *  const myVec2 = new Vec2({ x:1.2, y:3.4 })
     * ```
     *
     * @param x - The x value. Default is 0.
     * @param y - The y value. Default is 0.
     */
    constructor(x?: number | Float32Array | Uint32Array | Int32Array, y?: number);
    /**
     * Getter for `x` component.
     * @return - Returns the x component.
     */
    get x(): number;
    /**
     * Setter for `x` component.
     * @param val - The val param.
     */
    set x(val: number);
    /**
     * Getter for `y` component.
     * @return - Returns the y component.
     */
    get y(): number;
    /**
     * Setter for `y` component.
     * @param val - The val param.
     */
    set y(val: number);
    /**
     * Setter from scalar components.
     * @param x - The x component.
     * @param y  - The y component.
     */
    set(x: number, y: number): void;
    /**
     * Replaces this Vec2 data with the Vec2 data passed as parameter.
     *
     * @param other - The other Vec2 to set from.
     */
    setFromOther(other: Vec2): void;
    /**
     * Checks if this Vec2 contains the same values as the other Vec2.
     *
     * @param other - The other Vec2 to compare with.
     * @return - Returns `true` if are the same Vector, otherwise, `false`.
     */
    isEqual(other: Vec2): boolean;
    /**
     * Checks if this Vec2 is different from another Vec2.
     *
     * @param other - The other Vec2 to compare with.
     * @return - Returns `true` if the Vec2s are different, otherwise, `false`.
     */
    notEqual(other: Vec2): boolean;
    /**
     * Returns true if this Vec2 is approximately the same as other.
     *
     * @param other - The other Vec2 to compare with.
     * @param precision - The precision to which the values must match.
     * @return - Returns true or false.
     */
    approxEqual(other: Vec2, precision?: number): boolean;
    /**
     * Adds other to this Vec2 and returns the result as a new Vec2.
     *
     * @param other - The other Vec2 to add.
     * @return - Returns a new Vec2.
     */
    add(other: Vec2): Vec2;
    /**
     * Adds a Vec2 to this Vec2.
     *
     * @param other - The other Vec2 to add.
     */
    addInPlace(other: Vec2): void;
    /**
     * Subtracts a Vec2 from this Vec2 and returns the result as a new Vec2.
     *
     * @param other - The other Vec2 to subtract.
     * @return - Returns a new Vec2.
     */
    subtract(other: Vec2): Vec2;
    /**
     * Subtracts a Vec2 from this Vec2.
     *
     * @param other - The other Vec2 to subtract.
     * @return - Returns a new Vec2.
     */
    subtractInPlace(other: Vec2): Vec2;
    /**
     * Scales this Vec2 by scalar and returns the result as a new Vec2.
     *
     * @param scalar - The scalar value.
     * @return - Returns a new Vec2.
     */
    scale(scalar: number): Vec2;
    /**
     * Scales this Vec2 by scalar.
     *
     * @param scalar - The scalar value.
     */
    scaleInPlace(scalar: number): void;
    /**
     * Inverts this Vec2 and returns the result as a new Vec2.
     *
     * @return - Returns a new Vec2.
     */
    invert(): Vec2;
    /**
     * Inverts this Vec2.
     *
     * @return - The return value.
     */
    invertInPlace(): Vec2;
    /**
     * Multiplies a Vec2 with this Vec2 and returns the result as a new Vec2.
     *
     * @param other - The other Vec2 to multiply with.
     * @return - Returns a new Vec2.
     */
    multiply(other: Vec2): Vec2;
    /**
     * Multiplies a Vec2 with this Vec2.
     *
     * @param other - The other Vec2 to multiply with.
     */
    multiplyInPlace(other: Vec2): void;
    /**
     * Calculates the squared length of this Vec2.
     *
     * @return - Returns the length squared.
     */
    lengthSquared(): number;
    /**
     * Calculates the length of this Vec2.
     *
     * @return - Returns the length.
     */
    length(): number;
    /**
     * Calculates the distance to another vector.
     *
     * @param other - The other value.
     * @return - Returns the distance between vectors.
     */
    distanceTo(other: Vec2): number;
    /**
     * Normalizes the Vec2 and returns it as a new Vec2.
     * Multiplies coordinates value by the inverse of the vector length.
     *
     * @return - Returns the Vec2 normalized.
     */
    normalize(): Vec2;
    /**
     * Normalizes this Vec2 multiplying coordinate values by the inverse of the vector length.
     */
    normalizeInPlace(): void;
    /**
     * Calculates the dot product of this Vec2 against another Vec2.
     *
     * @param other - The other Vec2 to compare with.
     * @return - Returns the dot product.
     */
    dot(other: Vec2): number;
    /**
     * Calculates the cross product of this Vec2 against another Vec2.
     *
     * @param other - The other Vec2 to compare with.
     * @return - Returns the cross product.
     */
    cross(other: Vec2): number;
    /**
     * Gets the angle between this Vec2 and other assuming both are normalized vectors.
     *
     * @param other - The other Vec2 to compare with.
     * @return - Returns the angle in radians.
     */
    angleTo(other: Vec2): number;
    /**
     * Gets the angle between this Vec2 and other.
     *
     * @param other - The other Vec2 to compare with.
     * @return - Returns the angle in radians.
     */
    signedAngleTo(other: Vec2): number;
    /**
     * Rotates a Vec2 in a clockwise direction and returns a new rotated Vec2.
     *
     * @param angle - The angle of rotation.
     * @return - Returns the rotated vector.
     */
    rotate(angle: number): Vec2;
    /**
     * Performs a linear interpolation between this Vec2 and other Vec2.
     *
     * @param other - The other Vec2 to interpolate between.
     * @param t - Interpolation amount between the two inputs.
     * @return - Returns a new Vec2.
     */
    lerp(other: Vec2, t: number): Vec2;
    /**
     * Generates a random vector with the given scale.
     *
     * @param scale - Length of the resulting vector. If omitted, a unit vector will be returned.
     * @return - The return value.
     */
    setRandomDir(scale?: number): Vec2;
    /**
     * Randomizes the scale of this Vec2 coordinates.
     *
     * @param scale - The scale value.
     * @return - The return value.
     */
    setRandom(scale?: number): Vec2;
    /**
     * Clones this Vec2 and returns a new Vec2.
     *
     * @return - Returns a new Vec2.
     */
    clone(): Vec2;
    /**
     * Returns current Vec2 data as array. Often used to pass types to the GPU.
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
     * Encodes Vec2 Class as a JSON object for persistence.
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
    /**
     * Calculate the intersection point of 2 2d lines, returning the parameters values for each line.
     *
     * @param p0 - The point of the first line
     * @param d0 - The direction of the first line
     * @param p1 - The point of the second line
     * @param d1 - The direction of the second line
     * @return - Returns an array containing 2 parameter values for the 2 lines.
     */
    static intersectionOfLines(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2): Vec2 | null;
    isValid(): boolean;
}
export { Vec2 };
