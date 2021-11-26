import { Vec3 } from './Vec3';
import { Mat3 } from './Mat3';
import { Mat4 } from './Mat4';
import { EulerAngles } from './EulerAngles';
import { BinReader } from '../SceneTree/BinReader';
/**
 * Class representing a quaternion. Quaternions are used to represent 3 dimensional rotations.
 *
 * While Quaternions are difficult to understand they have important mathematical properties that make them very useful in 3d engines.
 * They can be directly multiplied together in the same was as matrices.
 * They can be interpolated from one value to another while maintaining constant angular velocity.
 * They can be converted to other more easily understood representations such as EulerAngles or Matrices.
 *

 */
declare class Quat {
    __data: Float32Array;
    /**
     * Creates a quaternion.
     *
     * @param x - The angle of the x axis. Default is 0.
     * @param y - The angle of the y axis. Default is 0.
     * @param z - The angle of the z axis. Default is 0.
     * @param w - The w value. Default is 1.
     */
    constructor(x?: number | ArrayBuffer, y?: number, z?: number, w?: number);
    /**
     * Getter for `x` axis rotation.
     *
     * @return - Returns the x axis rotation.
     */
    get x(): number;
    /**
     * Setter for `x` axis rotation.
     *
     * @param val - The val param.
     */
    set x(val: number);
    /**
     * Getter for `y` axis rotation.
     *
     * @return - Returns the y axis rotation.
     */
    get y(): number;
    /**
     * Setter for `y` axis rotation.
     *
     * @param val - The val param.
     */
    set y(val: number);
    /**
     * Getter for `z` axis rotation.
     *
     * @return - Returns the z axis rotation.
     */
    get z(): number;
    /**
     * Setter for `z` axis rotation.
     *
     * @param val - The val param.
     */
    set z(val: number);
    /**
     * Getter for `w` value.
     *
     * @return - Returns the w value.
     */
    get w(): number;
    /**
     * Setter for `w`.
     * @param val - The val param.
     */
    set w(val: number);
    /**
     * Setter from scalar components.
     *
     * @param x - The x axis rotation.
     * @param y  - The y axis rotation.
     * @param z  - The z axis rotation.
     * @param w  - The w value.
     */
    set(x: number, y: number, z: number, w: number): void;
    /**
     * Sets the state of the Quat class using a Float32Array.
     *
     * @param float32Array - The float32Array value.
     */
    setDataArray(float32Array: Float32Array): void;
    /**
     * Setter from another vector.
     *
     * @param other - The other vector to set from.
     */
    setFromOther(other: Quat): void;
    /**
     * Set this Quat from a euler rotation.
     *
     * @param eulerAngles - The euler angles rotation.
     */
    setFromEulerAngles(eulerAngles: EulerAngles): void;
    /**
     * Converts Quat to an EulerAngles
     *
     * @param rotationOrder - The order in which the rotations are applied.
     * @return - The return value.
     */
    toEulerAngles(rotationOrder: number | string): EulerAngles;
    /**
     * Set this Quat to a rotation defined by an axis and an angle (in radians).
     *
     * @param axis - The axis around which to rotate.
     * @param angle - The angle to rotate
     */
    setFromAxisAndAngle(axis: Vec3, angle: number): void;
    /**
     * Sets the state of the Quat to look in a particular direction along the z axis.
     * > The camera looks down the negative z axis, so to set a rotation value
     * > for the camera, remember to negate the direction vector.
     *
     * @param dir - The direction value.
     * @param up - The up vector.
     */
    setFromDirectionAndUpvector(dir: Vec3, up: Vec3): void;
    /**
     * Sets the state of the `Quat` from two `Vec3`. The quaternion would then represent the rotation from v0 to v1 in 3d space.
     *
     * @param v0 - The v0 unit vector.
     * @param v1 - The v1 unit vector.
     */
    setFrom2Vectors(v0: Vec3, v1: Vec3): void;
    /**
     * Set the Quat from a Mat3.
     *
     * @param mat3 - The mat3 value.
     */
    setFromMat3(mat3: Mat3): void;
    /**
     * Set the Quat from a Mat4.
     *
     * @param mat4 - The mat4 value.
     */
    setFromMat4(mat4: Mat4): void;
    /**
     * Checks if the angle of the Quat is less that ` Number.EPSILON`
     *
     * @return - Returns true or false.
     */
    isIdentity(): boolean;
    /**
     * Return the angle of the Quat.
     *
     * @return - The return value.
     */
    getAngle(): number;
    /**
     * Checks if this Quat contains the same values as the other Quat.
     *
     * @param other - The other Quat to compare with.
     * @return - Returns `true` if are the same Vector, otherwise, `false`.
     */
    isEqual(other: Quat): boolean;
    /**
     * Returns true if this Quat is NOT exactly the same other.
     *
     * @param other - The other Quat to compare with.
     * @return - Returns true or false.
     */
    notEquals(other: Quat): boolean;
    /**
     * Returns true if this Quat is approximately the same as other
     *
     * @param other - The other Quat to compare with.
     * @param precision - The precision to which the values must match.
     * @return - Returns true or false.
     */
    approxEqual(other: Quat, precision?: number): boolean;
    /**
     * Adds other to this Quat and return the result as a new Quat.
     *
     * @param other - The other Quat to add.
     * @return - Returns a new Quat.
     */
    add(other: Quat): Quat;
    /**
     * Adds other to this Quat.
     *
     * @param other - The other Quat to add.
     */
    addInPlace(other: Quat): void;
    /**
     * Subtracts other from this Quat and returns the result as a new Quat.
     *
     * @param other - The other Quat to subtract.
     * @return - Returns a new Quat.
     */
    subtract(other: Quat): Quat;
    /**
     * Scales this Quat by scalar and returns the result as a new Quat.
     *
     * @param scalar - The scalar value.
     * @return - Returns a new Vec3.
     */
    scale(scalar: number): Quat;
    /**
     * Scales this Quat by scalar.
     *
     * @param scalar - The scalar value.
     */
    scaleInPlace(scalar: number): void;
    /**
     * Calculates the length of this Quat.
     *
     * @return - Returns the length.
     */
    length(): number;
    /**
     * Calculates the squared length of this Quat.
     *
     * @return - Returns the length.
     */
    lengthSquared(): number;
    /**
     * Normalizes the Quat and returns it as a new Quat.
     *
     * @return - Returns the Quat normalized.
     */
    normalize(): Quat;
    /**
     * Normalizes the Quat, modifying its values in place.
     */
    normalizeInPlace(): void;
    /**
     * Calculates the dot product of this quat against another.
     *
     * @param other - The other Quat to compare with.
     * @return - Returns the dot product.
     */
    dot(other: Quat): number;
    /**
     * Calculates the cross product of two Quats and returns the result as a new Quat.
     *
     * @param other - The other Quat to calculate with.
     * @return - Returns the cross product as a new Quat.
     */
    cross(other: Quat): Quat;
    /**
     * Returns the rotational conjugate of this Quat.
     * Conjugation represents the same rotation of the Quat but
     * in the opposite direction around the rotational axis.
     *
     * @return - the return value.
     */
    conjugate(): Quat;
    /**
     * Return the inverse of the `Quat`
     *
     * @return - Returns a new Quat.
     */
    inverse(): Quat;
    /**
     * Aligns this quaternion with another one ensuring that the delta between
     * the Quat values is the shortest path over the hyper-sphere.
     *
     *  @param other - The other Quat to divide by.
     */
    alignWith(other: Quat): void;
    /**
     * Multiplies two this quat by another returning the result as a new Quat.
     *
     * @param other - The other Quat to multiply.
     * @return - Returns a new Quat.
     */
    multiply(other: Quat): Quat;
    /**
     * Multiplies this quat by another, modifying its values in place.
     *
     * @param other - The other Quat to multiply.
     */
    multiplyInPlace(other: Quat): void;
    /**
     * Rotates a vector by this quaternion.
     * Don't forget to normalize the quaternion unless
     * you want axial translation as well as rotation.
     *
     * @param vec3 - The vec3 value.
     * @return - Returns a new Vec3.
     */
    rotateVec3(vec3: Vec3): Vec3;
    /**
     * Sets this quaternion to a rotation by the given angle about the X axis.
     *
     * @param rad - Angle (in radians) to rotate.
     */
    rotateX(rad: number): void;
    /**
     * Sets this quaternion to a rotation by the given angle about the Y axis.
     *
     * @param rad - Angle (in radians) to rotate.
     */
    rotateY(rad: number): void;
    /**
     * Sets this quaternion to a rotation by the given angle about the Z axis.
     *
     * @param rad - Angle (in radians) to rotate.
     */
    rotateZ(rad: number): void;
    /**
     * Converts this Quat to a Mat3 (a 3x3 matrix).
     *
     * @return - TReturns a new Mat3.
     */
    toMat3(): Mat3;
    /**
     * Calculates a Vec3 value aligned with the X axis of this quaternion.
     *
     * @return - The resulting Vec3 value
     */
    getXaxis(): Vec3;
    /**
     * Calculates a Vec3 value aligned with the Y axis of this quaternion.
     *
     * @return - The resulting Vec3 value
     */
    getYaxis(): Vec3;
    /**
     * Calculates a Vec3 value aligned with the Z axis of this quaternion.
     *
     * @return - The resulting Vec3 value
     */
    getZaxis(): Vec3;
    /**
     * Reflects this quaternion according to the axis provided.
     *
     * @param axisIndex - An integer with value of 0 for the X axis, 1 for the Y axis, and 2 for the Z axis.
     * @return - Returns a new Quat.
     */
    mirror(axisIndex: number): Quat;
    /**
     * Converts this Quat to a Mat4 (a 4x4 matrix).
     *
     * @return - Returns a new Mat4.
     */
    toMat4(): Mat4;
    /**
     * Performs a linear interpolation of this Quat towards another Quat, returning the result as a new Quat.
     *
     * @param other  - The other Quat to interpolate towards.
     * @param t - Interpolation amount between the two inputs.
     * @return - Returns a new Quat.
     */
    lerp(other: Quat, t: number): Quat;
    /**
     * Performs a spherical linear interpolation of this Quat towards another Quat, returning the result as a new Quat.
     *
     * @param other - The other Quat to interpolate towards.
     * @param t - Interpolation amount between the two inputs.
     * @return - Returns a new Quat.
     */
    slerp(other: Quat, t: number): Quat;
    /**
     * Clones this Quat and returns a new Quat.
     *
     * @return - Returns a new Quat.
     */
    clone(): Quat;
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
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, number>;
    /**
     * The fromJSON method decodes a json object for this type.
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
}
export { Quat };
