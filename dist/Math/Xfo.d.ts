import { Vec3 } from './Vec3';
import { Mat4 } from './Mat4';
import { Quat } from './Quat';
import { BinReader } from '../SceneTree/BinReader';
/**
 * Class representing an Xfo transform, which is a transformation decomposed into 3 component values. Translation, Orientation, and Scaling.
 */
declare class Xfo {
    ori: Quat;
    sc: Vec3;
    tr: Vec3;
    /**
     * Initializes the Xfo object.
     *
     * **Note:** You can leave it empty and use other methods ti set the state of the class.
     *
     * @see [`setFromOther`](#setFromOther) [`setFromMat4`](#setFromMat4) [`setFromFloat32Array`](#setFromFloat32Array) [`fromJSON`](#fromJSON)
     *
     * @param tr - The translation value.
     * @param ori - The orientation value.
     * @param sc - The scaling value.
     */
    constructor(tr?: Float32Array | Vec3 | Quat, ori?: Quat, sc?: Vec3);
    /**
     * Sets the state of the Xfo object.
     *
     * @param tr - The translation value.
     * @param ori - The orientation value.
     * @param sc - The scaling value.
     */
    set(tr: Vec3, ori: Quat, sc?: Vec3): void;
    /**
     * Sets the state of the Xfo object using another Xfo object.
     *
     * @param other - The other Xfo to set from.
     */
    setFromOther(other: Xfo): void;
    /**
     * Verifies that the Xfo object is an `identity`, checking that the translation, orientation and scaling attributes are in their initial state.
     *
     * @return - The return value.
     */
    isIdentity(): boolean;
    /**
     * Checks if this Vec3 contains the same values as the other Vec3.
     *
     * @param other - The other Vec3 to compare with.
     * @return - Returns `true` if are the same Vector, otherwise, `false`.
     */
    isEqual(other: Xfo): boolean;
    /**
     * Returns true if this Vec2 is approximately the same as other.
     *
     * @param other - The other Vec3 to compare with.
     * @param precision - The precision to which the values must match.
     * @return - Returns true or false.
     */
    approxEqual(other: Xfo, precision?: number): boolean;
    /**
     * The setLookAt method.
     * @param pos - The position value.
     * @param target - The target value.
     * @param up - The up value.
     */
    setLookAt(pos: Vec3, target: Vec3, up: Vec3): void;
    /**
     * Multiplies two Xfo transforms.
     *
     * @param xfo - The xfo to multiply with.
     * @return - Returns an Xfo.
     */
    multiply(xfo: Xfo): Xfo;
    /**
     * Returns the inverse of the Xfo object, but returns. the result as a new Xfo.
     *
     * @return - Returns a new Xfo.
     */
    inverse(): Xfo;
    /**
     * Transforms Xfo object using a `Vec3` object. First scaling it, then rotating and finally adding the result to current translation object.
     *
     * @param vec3 - The vec3 value.
     * @return - The return value.
     */
    transformVec3(vec3: Vec3): Vec3;
    /**
     * Converts this Xfo to a Mat4 (a 4x4 matrix).
     *
     * @return - Returns a new Mat4.
     */
    toMat4(): Mat4;
    /**
     * Sets the state of the Xfo object using Mat4.
     * @param mat4 - The mat4 value.
     */
    setFromMat4(mat4: Mat4): void;
    /**
     * Sets the state of the Xfo object using an `Float32array`.
     *
     * **Note:** You can set the byteOffset in your `Float32array` object
     *
     * @param float32array - The float32array value.
     */
    setFromFloat32Array(float32array: Float32Array): void;
    /**
     * Clones this Xfo and returns a new Xfo.
     *
     * @return - Returns a new Xfo.
     */
    clone(): Xfo;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object.
     */
    fromJSON(j: Record<string, any>): void;
    /**
     * Loads the state of the value from a binary reader.
     *
     * @param reader - The reader value.
     */
    readBinary(reader: BinReader): void;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { Xfo };
