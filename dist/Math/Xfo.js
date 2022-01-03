/* eslint-disable no-unused-vars */
import { StringFunctions } from '../Utilities/StringFunctions';
import { Vec3 } from './Vec3';
import { Mat4 } from './Mat4';
import { Quat } from './Quat';
/**
 * Class representing an Xfo transform, which is a transformation decomposed into 3 component values. Translation, Orientation, and Scaling.
 */
class Xfo {
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
    constructor(tr, ori, sc) {
        if (tr instanceof Float32Array) {
            this.setFromFloat32Array(tr);
            return;
        }
        if (tr instanceof Vec3) {
            this.tr = tr;
        }
        else if (tr instanceof Quat && ori == undefined && sc == undefined) {
            this.tr = new Vec3();
            this.ori = tr; // Xfo constructor with just a Quat.
            this.sc = new Vec3(1, 1, 1);
            return;
        }
        else {
            this.tr = new Vec3();
        }
        if (ori instanceof Quat) {
            this.ori = ori;
        }
        else {
            this.ori = new Quat();
        }
        if (sc instanceof Vec3) {
            this.sc = sc;
        }
        else {
            this.sc = new Vec3(1, 1, 1);
        }
    }
    /**
     * Sets the state of the Xfo object.
     *
     * @param tr - The translation value.
     * @param ori - The orientation value.
     * @param sc - The scaling value.
     */
    set(tr, ori, sc) {
        this.tr = tr;
        this.ori = ori;
        if (sc instanceof Vec3)
            this.sc = sc;
    }
    /**
     * Sets the state of the Xfo object using another Xfo object.
     *
     * @param other - The other Xfo to set from.
     */
    setFromOther(other) {
        this.tr = other.tr;
        this.ori = other.ori;
        this.sc = other.sc;
    }
    /**
     * Verifies that the Xfo object is an `identity`, checking that the translation, orientation and scaling attributes are in their initial state.
     *
     * @return - The return value.
     */
    isIdentity() {
        return this.tr.isNull() && this.ori.isIdentity() && this.sc.is111();
    }
    /**
     * Checks if this Vec3 contains the same values as the other Vec3.
     *
     * @param other - The other Vec3 to compare with.
     * @return - Returns `true` if are the same Vector, otherwise, `false`.
     */
    isEqual(other) {
        return this.tr.isEqual(other.tr) && this.ori.isEqual(other.ori) && this.sc.isEqual(other.sc);
    }
    /**
     * Returns true if this Vec2 is approximately the same as other.
     *
     * @param other - The other Vec3 to compare with.
     * @param precision - The precision to which the values must match.
     * @return - Returns true or false.
     */
    approxEqual(other, precision = Number.EPSILON) {
        return ((other.tr ? this.tr.approxEqual(other.tr, precision) : true) &&
            (other.ori ? this.ori.approxEqual(other.ori, precision) : true) &&
            (other.sc ? this.sc.approxEqual(other.sc, precision) : true));
    }
    /**
     * The setLookAt method.
     * @param pos - The position value.
     * @param target - The target value.
     * @param up - The up value.
     */
    setLookAt(pos, target, up) {
        // Note: We look along the -z axis. Negate the direction.
        const dir = pos.subtract(target);
        const dirLen = dir.length();
        if (dirLen < Number.EPSILON) {
            throw new Error('Invalid dir');
            return;
        }
        this.ori.setFromDirectionAndUpvector(dir, up);
        this.tr = pos;
    }
    /**
     * Multiplies two Xfo transforms.
     *
     * @param xfo - The xfo to multiply with.
     * @return - Returns an Xfo.
     */
    multiply(xfo) {
        let this_sc = this.sc;
        if (this.sc.x != this.sc.y || this.sc.x != this.sc.z) {
            this_sc = xfo.ori.rotateVec3(this.sc);
            if (Math.sign(this_sc.x) != Math.sign(this.sc.x))
                this_sc.x = -this_sc.x;
            if (Math.sign(this_sc.y) != Math.sign(this.sc.y))
                this_sc.y = -this_sc.y;
            if (Math.sign(this_sc.z) != Math.sign(this.sc.z))
                this_sc.z = -this_sc.z;
        }
        const result = new Xfo(this.tr.add(this.ori.rotateVec3(this_sc.multiply(xfo.tr))), this.ori.multiply(xfo.ori), this_sc.multiply(xfo.sc));
        return result;
    }
    /**
     * Returns the inverse of the Xfo object, but returns. the result as a new Xfo.
     *
     * @return - Returns a new Xfo.
     */
    inverse() {
        const result = new Xfo();
        result.ori = this.ori.inverse();
        if (this.sc.x != this.sc.y || this.sc.x != this.sc.z) {
            // Note: the following code has not been tested and
            // may not be quite correct. We need to setup
            // unit tests for this kind of sample.
            // An example would be to lay out some boxes on different rotations
            // and with non-uniform scale. Then parent them together. If they
            // remain stationary, after parenting, then this math is correct.
            result.sc = result.ori.rotateVec3(this.sc);
            if (Math.sign(result.sc.x) != Math.sign(this.sc.x))
                result.sc.x = -result.sc.x;
            if (Math.sign(result.sc.y) != Math.sign(this.sc.y))
                result.sc.y = -result.sc.y;
            if (Math.sign(result.sc.z) != Math.sign(this.sc.z))
                result.sc.z = -result.sc.z;
        }
        else {
            result.sc = this.sc.inverse();
        }
        result.tr = result.ori.rotateVec3(this.tr.negate().multiply(result.sc));
        return result;
    }
    /**
     * Transforms Xfo object using a `Vec3` object. First scaling it, then rotating and finally adding the result to current translation object.
     *
     * @param vec3 - The vec3 value.
     * @return - The return value.
     */
    transformVec3(vec3) {
        return this.tr.add(this.ori.rotateVec3(this.sc.multiply(vec3)));
    }
    /**
     * Converts this Xfo to a Mat4 (a 4x4 matrix).
     *
     * @return - Returns a new Mat4.
     */
    toMat4() {
        const scl = new Mat4(this.sc.x, 0, 0, 0, 0, this.sc.y, 0, 0, 0, 0, this.sc.z, 0, 0, 0, 0, 1.0);
        const rot = this.ori.toMat4();
        const trn = new Mat4();
        trn.translation = this.tr;
        return trn.multiply(rot).multiply(scl);
    }
    /**
     * Sets the state of the Xfo object using Mat4.
     * @param mat4 - The mat4 value.
     */
    setFromMat4(mat4) {
        this.tr = mat4.translation;
        this.ori.setFromMat4(mat4);
    }
    /**
     * Sets the state of the Xfo object using an `Float32array`.
     *
     * **Note:** You can set the byteOffset in your `Float32array` object
     *
     * @param float32array - The float32array value.
     */
    setFromFloat32Array(float32array) {
        if (float32array.length == 7) {
            this.tr = new Vec3(new Float32Array(float32array.buffer, float32array.byteOffset, 3));
            this.ori = new Quat(new Float32Array(float32array.buffer, float32array.byteOffset + 12, 4));
            this.sc = new Vec3(1, 1, 1);
            return;
        }
        else if (float32array.length == 8) {
            this.tr = new Vec3(new Float32Array(float32array.buffer, float32array.byteOffset, 3));
            this.ori = new Quat(new Float32Array(float32array.buffer, float32array.byteOffset + 12, 4));
            const scl = float32array[7];
            this.sc = new Vec3(scl, scl, scl);
            return;
        }
        else if (float32array.length == 10) {
            this.tr = new Vec3(new Float32Array(float32array.buffer, float32array.byteOffset, 3));
            this.ori = new Quat(new Float32Array(float32array.buffer, float32array.byteOffset + 12, 4));
            this.sc = new Vec3(new Float32Array(float32array.buffer, float32array.byteOffset + 21, 3));
            return;
        }
        else {
            console.warn('unitialized: float32array.length == ', float32array.length);
        }
    }
    /**
     * Clones this Xfo and returns a new Xfo.
     *
     * @return - Returns a new Xfo.
     */
    clone() {
        return new Xfo(this.tr.clone(), this.ori.clone(), this.sc.clone());
    }
    // ///////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @return - The json object.
     */
    toJSON() {
        const j = {
            tr: this.tr.toJSON(),
            ori: this.ori.toJSON(),
            sc: this.sc.toJSON(),
        };
        return j;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object.
     */
    fromJSON(j) {
        this.tr.fromJSON(j.tr);
        this.ori.fromJSON(j.ori);
        if (j.sc) {
            this.sc.fromJSON(j.sc);
        }
    }
    /**
     * Loads the state of the value from a binary reader.
     *
     * @param reader - The reader value.
     */
    readBinary(reader) {
        this.tr.readBinary(reader);
        this.ori.readBinary(reader);
        this.sc.readBinary(reader);
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @return - The return value.
     */
    toString() {
        // eslint-disable-next-line new-cap
        return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON());
    }
}
export { Xfo };
//# sourceMappingURL=Xfo.js.map