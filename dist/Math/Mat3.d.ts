import { Vec3 } from './Vec3';
import { BinReader } from '../SceneTree/BinReader';
/**
 * A class representing a 3x3 matrix.
 * This matrix class is based on GLM, and is column major.
 *
 */
declare class Mat3 {
    __data: Float32Array;
    /**
     * Initializes the Mat3 class with given data.
     *
     * @param m00 - Row 0, column 0.
     * @param m01 - Row 0, column 1.
     * @param m02 - Row 0, column 2.
     * @param m10 - Row 1, column 0.
     * @param m11 - Row 1, column 1.
     * @param m12 - Row 1, column 2.
     * @param m20 - Row 2, column 0.
     * @param m21 - Row 2, column 1.
     * @param m22 - Row 2, column 2.
     */
    constructor(m00?: number | Vec3 | Float32Array, m01?: number | Vec3, m02?: number | Vec3, m10?: number, m11?: number, m12?: number, m20?: number, m21?: number, m22?: number);
    /**
     * Getter for row 0, column 0.
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
     * Getter for row 1, column 1
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
     * Setter for row 2, column 1.
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
     * * @return - Returns the `y` axis as a Vec3.
     */
    get yAxis(): Vec3;
    /**
     * Setter for the `y` axis.
     * @param vec3 - The vec3 value.
     */
    set yAxis(vec3: Vec3);
    /**
     * Getter for the `z` axis.
     * * @return - Returns the `z` axis as a Vec3.
     */
    get zAxis(): Vec3;
    /**
     * Setter for the `z` axis.
     * @param vec3 - The vec3 value.
     */
    set zAxis(vec3: Vec3);
    /**
     * Sets the state of the Mat3 class
     *
     * @param m00 - Row 0, column 0.
     * @param m01 - Row 0, column 1.
     * @param m02 - Row 0, column 2.
     * @param m10 - Row 1, column 0.
     * @param m11 - Row 1, column 1.
     * @param m12 - Row 1, column 2.
     * @param m20 - Row 2, column 0.
     * @param m21 - Row 2, column 1.
     * @param m22 - Row 2, column 2.
     */
    set(m00?: number, m01?: number, m02?: number, m10?: number, m11?: number, m12?: number, m20?: number, m21?: number, m22?: number): void;
    /**
     * Sets state of the Mat3 with the identity  Matrix
     */
    setIdentity(): void;
    /**
     * Sets state of the Mat3 from another Mat3
     *
     * Note: works with either Mat3 or Mat4.
     *
     * @param mat - The mat value.
     */
    setFromMat(mat: Mat3): void;
    /**
     * Scales and calculates the cross product of the `Vec3` and sets the result in the Mat3
     * Note: the resulting matrix +Z axis is aligned with the provided direction value.
     *
     * @param dir - The dir value.
     * @param up - The up value.
     */
    setFromDirectionAndUpvector(dir: Vec3, up: Vec3): void;
    /**
     * Inverts a Mat3 and returns the result as a new instance.
     *
     * @return - Returns a new Mat3.
     */
    inverse(): Mat3;
    /**
     * Inverts a Mat3 in place modifying its values.
     *
     * @return - The return value.
     */
    invertInPlace(): boolean;
    /**
     * Transposes (exchanges columns with rows) this matrix
     * and returns the result as a new instance.
     *
     * @return - Return a new transposed Mat3.
     */
    transpose(): Mat3;
    /**
     * Transposes (exchanges columns with rows) this matrix modifying its values.
     */
    transposeInPlace(): void;
    /**
     * Transforms the Vec3 with a Mat3.
     *
     * @param vec3 - The vec3 value.
     * @return - Return the result as a new Vec3.
     */
    transformVec3(vec3: Vec3): Vec3;
    /**
     * Clones this Mat3 returning a new instance.
     *
     * @return - Returns a new Mat3.
     */
    clone(): Mat3;
    /**
     * Loads the state of the value from a binary reader.
     *
     * @param reader - The reader value.
     */
    readBinary(reader: BinReader): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
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
     * Converts this Vec3 to a string in JSON format.
     *
     * @return - The return value.
     */
    toString(): string;
    /**
     * Returns current Math type data as array. Often used to pass types to the GPU.
     *
     * @return - Returns the result as an array.
     */
    asArray(): Float32Array | Uint32Array;
}
export { Mat3 };
