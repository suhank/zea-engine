import { Vec3 } from './Vec3';
import { Mat3 } from './Mat3';
import { Vec4 } from './Vec4';
import { BinReader } from '../SceneTree/BinReader';
/**
 * A class representing a 4x4 matrix.
 * This matrix class is based on GLM, and is column major.
 *
 */
declare class Mat4 {
    __data: Float32Array;
    /**
     * Initializes the Mat3 class with given data.
     *
     * @param m00 - Row 0, column 0.
     * @param m01 - Row 0, column 1.
     * @param m02 - Row 0, column 2.
     * @param m03 - Row 0, column 3.
     * @param m10 - Row 1, column 0.
     * @param m11 - Row 1, column 1.
     * @param m12 - Row 1, column 2.
     * @param m13 - Row 1, column 3.
     * @param m20 - Row 2, column 0.
     * @param m21 - Row 2, column 1.
     * @param m22 - Row 2, column 2.
     * @param m23 - Row 2, column 3.
     * @param m30 - Row 3, column 0.
     * @param m31 - Row 3, column 1.
     * @param m32 - Row 3, column 2.
     * @param m33 - Row 3, column 3.
     */
    constructor(m00?: number | Float32Array | ArrayBuffer, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number);
    /**
     * Getter for row 0, column 0.
     *
     * @return - Returns the m00 value.
     */
    get m00(): number;
    /**
     * Setter for row 0, column 0.
     *
     * @param val - The val param.
     */
    set m00(val: number);
    /**
     * Getter for row 0, column 1.
     *
     * @return - Returns the m01 value.
     */
    get m01(): number;
    /**
     * Setter for row 0, column 1.
     *
     * @param val - The val param.
     */
    set m01(val: number);
    /**
     * Getter for row 0, column 2.
     *
     * @return - Returns the m02 value.
     */
    get m02(): number;
    /**
     * Setter for row 0, column 2.
     *
     * @param val - The val param.
     */
    set m02(val: number);
    /**
     * Getter for row 0, column 3.
     *
     * @return - Returns the m03 value.
     */
    get m03(): number;
    /**
     * Setter for row 0, column 3.
     *
     * @param val - The val param.
     */
    set m03(val: number);
    /**
     * Getter for row 1, column 0.
     *
     * @return - Returns the m10 value.
     */
    get m10(): number;
    /**
     * Setter for row 1, column 0.
     *
     * @param val - The val param.
     */
    set m10(val: number);
    /**
     * Getter for row 1, column 1.
     *
     * @return - Returns the m11 value.
     */
    get m11(): number;
    /**
     * Setter for row 1, column 1.
     *
     * @param val - The val param.
     */
    set m11(val: number);
    /**
     * Getter for row 1, column 2.
     *
     * @return - Returns the m12 value.
     */
    get m12(): number;
    /**
     * Setter for row 1, column 2.
     *
     * @param val - The val param.
     */
    set m12(val: number);
    /**
     * Getter for row 1, column 3.
     *
     * @return - Returns the m13 value.
     */
    get m13(): number;
    /**
     * Setter for row 1, column 3.
     *
     * @param val - The val param.
     */
    set m13(val: number);
    /**
     * Getter for row 2, column 0.
     *
     * @return - Returns the m20 value.
     */
    get m20(): number;
    /**
     * Setter for row 2, column 0.
     *
     * @param val - The val param.
     */
    set m20(val: number);
    /**
     * Getter for row 2, column 1.
     *
     * @return - Returns the m21 value.
     */
    get m21(): number;
    /**
     * Setter for row 2, column 1
     *
     * @param val - The val param.
     */
    set m21(val: number);
    /**
     * Getter for row 2, column 2.
     *
     * @return - Returns the m22 value.
     */
    get m22(): number;
    /**
     * Setter for row 2, column 2.
     *
     * @param val - The val param.
     */
    set m22(val: number);
    /**
     * Getter for row 2, column 3.
     *
     * @return - Returns the m23 value.
     */
    get m23(): number;
    /**
     * Setter for row 2, column 3.
     *
     * @param val - The val param.
     */
    set m23(val: number);
    /**
     * Getter for row 3, column 0
     *
     * @return - Returns the m30 value.
     */
    get m30(): number;
    /**
     * Setter for row 3, column 0.
     *
     * @param val - The val param.
     */
    set m30(val: number);
    /**
     * Getter for row 3, column 1.
     *
     * @return - Returns the m31 value.
     */
    get m31(): number;
    /**
     * Setter for row 3, column 1.
     *
     * @param val - The val param.
     */
    set m31(val: number);
    /**
     * Getter for row 3, column 2.
     *
     * @return - Returns the m32 value.
     */
    get m32(): number;
    /**
     * Setter for row 3, column 2.
     *
     * @param val - The val param.
     */
    set m32(val: number);
    /**
     * Getter for row 3, column 3.
     *
     * @return - Returns the m33 value.
     */
    get m33(): number;
    /**
     * Setter for row 3, column 3.
     *
     * @param val - The val param.
     */
    set m33(val: number);
    /**
     * Getter for the `x` axis.
     *
     * @return - Returns the `x` axis as a Vec3.
     */
    get xAxis(): Vec3;
    /**
     * Setter for the `x` axis.
     *
     * @param vec3 - The vec3 value.
     */
    set xAxis(vec3: Vec3);
    /**
     * Getter for the `y` axis.
     *
     * @return - Returns the `y` axis as a Vec3.
     */
    get yAxis(): Vec3;
    /**
     * Setter for the `y` axis.
     *
     * @param vec3 - The vec3 value.
     */
    set yAxis(vec3: Vec3);
    /**
     * Getter for the `z` axis.
     *
     * @return - Returns the `z` axis as a Vec3.
     */
    get zAxis(): Vec3;
    /**
     * Setter for the `z` axis.
     *
     * @param vec3 - The vec3 value.
     */
    set zAxis(vec3: Vec3);
    /**
     * Getter for the translation of the matrix. Assumes the translation values are 12, 13, & 14.
     *
     * @return - Returns the translation.
     */
    get translation(): Vec3;
    /**
     * Setter for the translation of the matrix. Assumes the translation values are 12, 13, & 14.
     *
     * @param vec3 - The translation.
     */
    set translation(vec3: Vec3);
    /**
     * Sets the state of the Mat4 class
     *
     * @param m00 - Row 0, column 0.
     * @param m01 - Row 0, column 1.
     * @param m02 - Row 0, column 2.
     * @param m03 - Row 0, column 3.
     * @param m10 - Row 1, column 0.
     * @param m11 - Row 1, column 1.
     * @param m12 - Row 1, column 2.
     * @param m13 - Row 1, column 3.
     * @param m20 - Row 2, column 0.
     * @param m21 - Row 2, column 1.
     * @param m22 - Row 2, column 2.
     * @param m23 - Row 2, column 3.
     * @param m30 - Row 3, column 0.
     * @param m31 - Row 3, column 1.
     * @param m32 - Row 3, column 2.
     * @param m33 - Row 3, column 3.
     */
    set(m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number): void;
    /**
     * Sets state of the Mat4 with the identity  Matrix
     */
    setIdentity(): void;
    /**
     * Sets the state of the Mat4 Object.
     *
     * @param float32Array - The float32Array value.
     */
    setDataArray(float32Array: Float32Array): void;
    /**
     * Sets state of the Mat4 from another Mat4
     *
     * Note: works with either Mat3 or Mat4.
     *
     * @param mat4 - The mat4 value.
     */
    setFromMat4(mat4: Mat4): void;
    /**
     * Converts a Mat4 to a Mat3.
     *
     * @return - Returns a new Mat3.
     */
    toMat3(): Mat3;
    /**
     * Transposes (exchanges columns with rows) this matrix.
     */
    transposeInPlace(): void;
    /**
     * Transposes (exchanges columns with rows) this matrix
     * and returns the result as a new instance.
     *
     * @return - Return a new transposed Mat4.
     */
    transpose(): Mat4;
    /**
     * Inverts a Mat4 and returns the result as a new instance.
     *
     * @return - Returns a new Mat4.
     */
    inverse(): Mat4;
    /**
     * Inverts a Mat4.
     *
     * @return - The return value.
     */
    invertInPlace(): boolean;
    /**
     * Sets this matrix as the inverse of the given Mat4.
     *
     * @param mat4 - The mat4 value.
     * @return - In case the `determinant` can't be calculated, a `null` will be returned, otherwise, nothing is returned
     */
    setInverse(mat4: Mat4): void;
    /**
     * Multiplies two Mat4s and returns the result as a new instance.
     *
     * @param other - The other Mat4 to multiply with.
     * @return - Returns a new Mat4.
     */
    multiply(other: Mat4): Mat4;
    /**
     * Multiplies two Mat4s in place explicitly not using SIMD.
     *
     * @param other - The other Mat4 to multiply with.
     * @return - Returns a new Mat4.
     */
    multiplyInPlace(other: Mat4): Mat4;
    /**
     * Post multiplies two Mat4s in place explicitly not using SIMD.
     *
     * @param other - The other Mat4 to multiply with.
     * @return - Returns the result as a new Mat4.
     */
    postMultiplyInPlace(other: Mat4): Mat4;
    /**
     * Translate a Mat4 by the given vector not using SIMD.
     *
     * @param v3 - The given vector to translate along.
     * @return - The return value.
     */
    translateInPlace(v3: Vec3): Mat4;
    /**
     * Generates a look-at matrix with the given position, focal point, and up axis.
     *
     * @param pos - Position of the viewer.
     * @param target - Point the viewer is looking at.
     * @param up - Vec3 pointing up.
     */
    setLookAt(pos: Vec3, target: Vec3, up: Vec3): void;
    /**
     * Creates a matrix from a given angle around a given axis.
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotate(dest, dest, rad, axis);
     *
     * @param axis - The axis to rotate around.
     * @param rad - The angle to rotate the matrix by.
     * @return - The return value.
     */
    setRotation(axis: Vec3, rad: number): Mat4 | null;
    /**
     * Creates a matrix from the given angle around the X axis.
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateX(dest, dest, rad);
     *
     * @param rad - The angle to rotate the matrix by.
     * @return - The return value.
     */
    setXRotation(rad: number): Mat4;
    /**
     * Creates a matrix from the given angle around the Y axis.
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateY(dest, dest, rad);
     *
     * @param rad - The angle to rotate the matrix by.
     * @return - The return value.
     */
    setYRotation(rad: number): Mat4;
    /**
     * Creates a matrix from the given angle around the Z axis.
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateZ(dest, dest, rad);
     *
     * @param rad - The angle to rotate the matrix by.
     * @return - The return value.
     */
    setZRotation(rad: number): Mat4;
    /**
     * Transforms the Vec4 with a Mat4.
     *
     * @param vec - The vec value.
     * @return - Return the result as a new Vec4.
     */
    transformVec4(vec: Vec4): Vec4;
    /**
     * Transforms the Vec3 with a Mat4.
     *
     * @param vec - The vec value.
     * @return - Return the result as a new Vec3.
     */
    transformVec3(vec: Vec3): Vec3;
    /**
     * Rotates a given `Vec3` and the result is returned as a new `Vec3`, applying only the top left components of the matrix, so not applying any translation.
     * @param vec - The vec value.
     * @return - Return the result as a new Vec3.
     */
    rotateVec3(vec: Vec3): Vec3;
    /**
     * Set the perspective from a Mat4.
     *
     * @param fovY - The fovY value.
     * @param aspect - The aspect value.
     * @param near - The near value.
     * @param far - The far value.
     */
    setPerspectiveMatrix(fovy: number, aspect: number, near: number, far: number): void;
    /**
     * Calculates the orthographic matrix and sets the state of the Mat4 class
     *
     * @param left - The left value.
     * @param right - The right value.
     * @param bottom - The bottom value.
     * @param top - The top value.
     * @param near - The near value.
     * @param far - The far value.
     */
    setOrthographicMatrix(left: number, right: number, bottom: number, top: number, near: number, far: number): void;
    /**
     * Set the Matrix to be a scale matrix.
     *
     * @param x - The x value.
     * @param y - The y value.
     * @param z - The z value.
     */
    setScale(x: number | Vec3, y: number, z: number): void;
    /**
     * Transforms a 3x4 matrix into a 4x4 matrix and set the result to the Math4 state.
     *
     * @param m3x4 - The m3x4 value.
     */
    setFromMat3x4Array(m3x4: number[]): void;
    /**
     * Clones this Mat4 returning a new instance.
     *
     * @return - Returns a new Mat4.
     */
    clone(): Mat4;
    /**
     * Converts this Vec3 to a string in JSON format.
     *
     * @return - The return value.
     */
    toString(): string;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return {Float32Array} - The json object.
     */
    toJSON(): Float32Array;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param json - The json param.
     */
    fromJSON(json: number[]): void;
    /**
     * Loads the state of the value from a binary reader.
     *
     * @param reader - The reader value.
     */
    readBinary(reader: BinReader): void;
    /**
     * Returns current Math type data as array. Often used to pass types to the GPU.
     *
     * @return - Returns the result as an array.
     */
    asArray(): Float32Array;
}
export { Mat4 };
