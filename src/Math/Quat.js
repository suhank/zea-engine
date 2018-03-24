import { AttrValue } from './AttrValue.js';
import { Vec3 } from './Vec3.js';
import { Mat3 } from './Mat3.js';
import { Mat4 } from './Mat4.js';
import { EulerAngles } from './EulerAngles.js';
import { typeRegistry } from './TypeRegistry.js';

class Quat extends AttrValue {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        super();

        if (x instanceof ArrayBuffer) {
            let buffer = x;
            let byteOffset = y;
            this.__data = new Float32Array(buffer, byteOffset, 4);
        } else {
            this.__data = new Float32Array(4);
            if (typeof x === 'object') {
                this.__data[0] = 0;
                this.__data[1] = 0;
                this.__data[2] = 0;
                this.__data[3] = 1;
                for(let key in x) {
                    if(Array.isArray(x[key]))
                        this[key].call(this, ...x[key]);
                    else
                        this[key].call(this, x[key] );

                }
            } else {
                this.__data[0] = x;
                this.__data[1] = y;
                this.__data[2] = z;
                this.__data[3] = w;
            }
        }
    }

    get x() {
        return this.__data[0];
    }

    set x(val) {
        this.__data[0] = val;
    }

    get y() {
        return this.__data[1];
    }

    set y(val) {
        this.__data[1] = val;
    }

    get z() {
        return this.__data[2];
    }

    set z(val) {
        this.__data[2] = val;
    }

    get w() {
        return this.__data[3];
    }

    set w(val) {
        this.__data[3] = val;
    }

    // Setter from scalar components
    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    setDataArray(float32Array) {
        this.__data = float32Array;
    }

    // Setter from scalar components
    setFromOther(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;
    }

    /// Set this quat from a euler rotation
    setFromEulerAngles(eulerAngles) {
        let ordered = new Vec3();

        switch (eulerAngles.order) {
            case 0:
                /*' XYZ' */
                ordered.set(eulerAngles.x, -eulerAngles.y, eulerAngles.z);
                break;
            case 1:
                /* 'YZX' */
                ordered.set(eulerAngles.y, -eulerAngles.z, eulerAngles.x);
                break;
            case 2:
                /* 'ZXY' */
                ordered.set(eulerAngles.z, -eulerAngles.x, eulerAngles.y);
                break;
            case 3:
                /* 'XZY' */
                ordered.set(eulerAngles.x, eulerAngles.z, eulerAngles.y);
                break;
            case 4:
                /* 'ZYX' */
                ordered.set(eulerAngles.z, eulerAngles.y, eulerAngles.x);
                break;
            case 5:
                /* 'YXZ' */
                ordered.set(eulerAngles.y, eulerAngles.x, eulerAngles.z);
                break;
            default:
                throw ("sdrty");
        }

        let ti = ordered.x * 0.5;
        let tj = ordered.y * 0.5;
        let tk = ordered.z * 0.5;
        let ci = Math.cos(ti),
            cj = Math.cos(tj),
            ck = Math.cos(tk);
        let si = Math.sin(ti),
            sj = Math.sin(tj),
            sk = Math.sin(tk);
        let cc = ci * ck,
            cs = ci * sk,
            sc = si * ck,
            ss = si * sk;
        let ai, aj, ak;
        ai = cj * sc - sj * cs;
        aj = cj * ss + sj * cc;
        ak = cj * cs - sj * sc;

        this.w = cj * cc + sj * ss;

        switch (eulerAngles.order) {
            case 0:
                /*' XYZ' */
                this.x = ai;
                this.y = -aj;
                this.z = ak;
                break;
            case 1:
                /* 'YZX' */
                this.x = ak;
                this.y = ai;
                this.z = -aj;
                break;
            case 2:
                /* 'ZXY' */
                this.x = -aj;
                this.y = ak;
                this.z = ai;
                break;
            case 3:
                /* 'XZY' */
                this.x = ai;
                this.y = ak;
                this.z = aj;
                break;
            case 4:
                /* 'ZYX' */
                this.x = ak;
                this.y = aj;
                this.z = ai;
                break;
            case 5:
                /* 'YXZ' */
                this.x = aj;
                this.y = ai;
                this.z = ak;
                break;
            default:
                throw ("sdrty");
        }
    }


    toEulerAngles(rotationOrder) {
        let ordered = new Vec3();
        switch (rotationOrder) {
            case 0:
                /*' XYZ' */
                ordered.set(this.z, this.x, this.y);
                break;
            case 1:
                /* 'YZX' */
                ordered.set(this.x, this.y, this.z);
                break;
            case 2:
                /* 'ZXY' */
                ordered.set(this.y, this.z, this.x);
                break;
            case 3:
                /* 'XZY' */
                ordered.set(this.y, -this.x, this.z);
                break;
            case 4:
                /* 'ZYX' */
                ordered.set(this.x, -this.z, this.y);
                break;
            case 5:
                /* 'YXZ' */
                ordered.set(this.z, -this.y, this.x);
                break;
            default:
                throw ("Invalid rotation order:" + rotationOrder);
        }

        let euler = new Vec3();
        let test = ordered.x * ordered.y + ordered.z * this.w;
        if (test > 0.49999) { // singularity at north pole
            euler.y = 2.0 * atan2(ordered.x, this.w);
            euler.z = Math.PI * 0.5;
            euler.x = 0.0;
        } else if (test < -0.49999) { // singularity at south pole
            euler.y = -2.0 * atan2(ordered.x, this.w);
            euler.z = Math.PI * -0.5;
            euler.x = 0.0;
        } else {
            let sqx = ordered.x * ordered.x;
            let sqy = ordered.y * ordered.y;
            let sqz = ordered.z * ordered.z;
            euler.y = Math.atan2(2.0 * ordered.y * this.w - 2.0 * ordered.x * ordered.z, 1.0 - 2.0 * sqy - 2.0 * sqz);
            euler.z = Math.asin(2.0 * test);
            euler.x = Math.atan2(2.0 * ordered.x * this.w - 2.0 * ordered.y * ordered.z, 1.0 - 2.0 * sqx - 2.0 * sqz);
        }

        switch (rotationOrder) {
            case 0:
                /*' XYZ' */
                return Euler(euler.y, euler.z, euler.x, rotationOrder);
            case 1:
                /* 'YZX' */
                return Euler(euler.x, euler.y, euler.z, rotationOrder);
            case 2:
                /* 'ZXY' */
                return Euler(euler.z, euler.x, euler.y, rotationOrder);
            case 3:
                /* 'XZY' */
                return Euler(-euler.y, euler.x, euler.z, rotationOrder);
            case 4:
                /* 'ZYX' */
                return Euler(euler.x, euler.z, -euler.y, rotationOrder);
            case 5:
                /* 'YXZ' */
                return Euler(euler.z, -euler.y, euler.x, rotationOrder);
        }

    }


    /// Set this quat to a rotation defined by an axis and an angle (in radians)
    setFromAxisAndAngle(axis, angle) {
        let halfAngle = angle / 2.0;
        let vec = axis.normalize().scale(Math.sin(halfAngle));
        this.set(vec.x, vec.y, vec.z, Math.cos(halfAngle));
    }

    setFromDirectionAndUpvector(dir, up) {
        let mat3 = new Mat3();
        mat3.setFromDirectionAndUpvector(dir, up);
        this.setFromMat3(mat3);
    }

    setFromMat3(mat3) {

        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        let fTrace = mat3.__data[0] + mat3.__data[4] + mat3.__data[8];
        let fRoot;

        if (fTrace > 0.0) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.); // 2w
            this.__data[3] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot; // 1/(4w)
            this.__data[0] = (mat3.__data[5] - mat3.__data[7]) * fRoot;
            this.__data[1] = (mat3.__data[6] - mat3.__data[2]) * fRoot;
            this.__data[2] = (mat3.__data[1] - mat3.__data[3]) * fRoot;
        } else {
            // |w| <= 1/2
            let i = 0;
            if (mat3.__data[4] > mat3.__data[0])
                i = 1;
            if (mat3.__data[8] > mat3.__data[i * 3 + i])
                i = 2;
            let j = (i + 1) % 3;
            let k = (i + 2) % 3;

            fRoot = Math.sqrt(mat3.__data[i * 3 + i] - mat3.__data[j * 3 + j] - mat3.__data[k * 3 + k] + 1.0);
            this.__data[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            this.__data[3] = (mat3.__data[j * 3 + k] - mat3.__data[k * 3 + j]) * fRoot;
            this.__data[j] = (mat3.__data[j * 3 + i] + mat3.__data[i * 3 + j]) * fRoot;
            this.__data[k] = (mat3.__data[k * 3 + i] + mat3.__data[i * 3 + k]) * fRoot;
        }
        this.normalizeInPlace();
    }

    isIdentity() {
        return this.getAngle() < Number.EPSILON;
    }

    getAngle() {
        return Math.acos(this.w) * 2.0;
    }


    // Returns true if this vector is the same as another one
    equal(other, precision) {
        return (this.x == other.x) &&
            (this.y == other.y) &&
            (this.z == other.z) &&
            (this.w == other.w);
    }


    // Returns true if this vector is the same as another one
    notequals(other, precision) {
        return (this.x != other.x) &&
            (this.y != other.y) &&
            (this.z != other.z) &&
            (this.w != other.w);
    }


    // Returns true if this vector is the same as another one
    // (given a precision)
    approxEqual(other) {
        return (Math.abs(this.x - other.x) < Number.EPSILON) &&
            (Math.abs(this.y - other.y) < Number.EPSILON) &&
            (Math.abs(this.z - other.z) < Number.EPSILON) &&
            (Math.abs(this.w - other.w) < Number.EPSILON);
    }


    // Returns a new vector which is this vector added to other
    add(other) {
        return new Quat(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
            this.w + other.w
        );
    }


    // Returns a new vector which is this vector subtracted from other
    subtract(other) {
        return new Quat(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z,
            this.w - other.w
        );
    }


    // Returns a new vector which is this vector scaled by scalar
    scale(scalar) {
        return new Quat(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar
        );
    }

    /**
     * Calculates the length of a vec4
     *
     * @param {vec4} a vector to calculate length of
     * @returns {Number} length of a
     */
    length() {
        const x = this.__data[0],
            y = this.__data[1],
            z = this.__data[2],
            w = this.__data[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    /**
     * Calculates the squared length of a vec4
     *
     * @param {vec4} a vector to calculate squared length of
     * @returns {Number} squared length of a
     */
    lengthSquared() {
        let x = this.__data[0],
            y = this.__data[1],
            z = this.__data[2],
            w = this.__data[3];
        return x * x + y * y + z * z + w * w;
    }

    /**
     * Returns the vector normalized
     *
     */
    normalize() {
        let x = this.__data[0],
            y = this.__data[1],
            z = this.__data[2],
            w = this.__data[3];
        let len = x * x + y * y + z * z + w * w;
        if (len < Number.EPSILON) {
            return new Quat();
        }

        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        return new Quat(x * len, y * len, z * len);
    }

    normalizeInPlace() {
        let x = this.__data[0],
            y = this.__data[1],
            z = this.__data[2],
            w = this.__data[3];
        let len = x * x + y * y + z * z + w * w;
        if (len < Number.EPSILON) {
            return;
        }
        len = 1 / Math.sqrt(len);
        this.set(x * len, y * len, z * len, w * len);
    }

    /**
     * Calculates the dot product of two vec4's
     *
     * @param {vec4} a the first operand
     * @param {vec4} b the second operand
     * @returns {Number} dot product of a and b
     */
    dot(b) {
        return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
    }

    /**
     * Computes the cross product of two vec4's
     *
     * @param {vec4} b the second operand
     * @returns {vec4}
     */
    cross(b) {
        let ax = this.x,
            ay = this.y,
            az = this.z,
            at = this.w,
            bx = b.x,
            by = b.y,
            bz = b.z,
            bt = b.w;

        return new Quat(
            ay * bz - az * by,
            az * bt - at * bz,
            at * bx - ax * bt,
            ax * by - ay * bx);
    }


    conjugate() {
        return new Quat(-this.x, -this.y, -this.z, this.w);
    }

    inverse() {
        return this.conjugate();
    }

    /// Aligns this quaternion with another one ensuring that the delta between
    /// the Quat values is the shortest path over the hypersphere.
    alignWith(other) {
        if (this.dot(other) < 0.0) {
            this.set(-this.x, -this.y, -this.z, -this.w);
        }
    }

    // multiply(quat) {
    //     return new Quat(
    //         this.x * quat.w + this.w * quat.x + this.y * quat.z - this.z * quat.y,
    //         this.y * quat.w + this.w * quat.y + this.z * quat.x - this.x * quat.z,
    //         this.z * quat.w + this.w * quat.z + this.x * quat.y - this.y * quat.x,
    //         this.w * quat.w - this.x * quat.x - this.y * quat.y - this.z * quat.z
    //     );
    // }

    multiply(quat) {
        let ax = this.__data[0],
            ay = this.__data[1],
            az = this.__data[2],
            aw = this.__data[3],
            bx = quat.__data[0],
            by = quat.__data[1],
            bz = quat.__data[2],
            bw = quat.__data[3];
            
        return new Quat(
            ax * bw + aw * bx + ay * bz - az * by,
            ay * bw + aw * by + az * bx - ax * bz,
            az * bw + aw * bz + ax * by - ay * bx,
            aw * bw - ax * bx - ay * by - az * bz
        );
    };

    multiplyInPlace(quat) {
        let ax = this.__data[0],
            ay = this.__data[1],
            az = this.__data[2],
            aw = this.__data[3],
            bx = quat.__data[0],
            by = quat.__data[1],
            bz = quat.__data[2],
            bw = quat.__data[3];

        this.set(
            ax * bw + aw * bx + ay * bz - az * by,
            ay * bw + aw * by + az * bx - ax * bz,
            az * bw + aw * bz + ax * by - ay * bx,
            aw * bw - ax * bx - ay * by - az * bz
        );
    };

    /// Rotates a vector by this quaterion.
    /// Don't forget to normalize the quaternion unless 
    /// you want axial translation as well as rotation.
    rotateVec3(vec3) {
        let vq = new Quat(vec3.x, vec3.y, vec3.z, 0.0);
        let pq = this.multiply(vq).multiply(this.conjugate());
        return new Vec3(pq.x, pq.y, pq.z);
    }


    /**
     * Rotates a quaternion by the given angle about the X axis
     *
     * @param {number} rad angle (in radians) to rotate
     * @returns {quat} out
     */
    rotateX(rad) {
        rad *= 0.5;

        let ax = this.x,
            ay = this.y,
            az = this.z,
            aw = this.w,
            bx = Math.sin(rad),
            bw = Math.cos(rad);

        this.x = ax * bw + aw * bx;
        this.y = ay * bw + az * bx;
        this.z = az * bw - ay * bx;
        this.w = aw * bw - ax * bx;
    };

    /**
     * Rotates a quaternion by the given angle about the Y axis
     *
     * @param {number} rad angle (in radians) to rotate
     * @returns {quat} out
     */
    rotateY(rad) {
        rad *= 0.5;

        let ax = this.x,
            ay = this.y,
            az = this.z,
            aw = this.w,
            by = Math.sin(rad),
            bw = Math.cos(rad);

        this.x = ax * bw - az * by;
        this.y = ay * bw + aw * by;
        this.z = az * bw + ax * by;
        this.w = aw * bw - ay * by;
    };

    /**
     * Rotates a quaternion by the given angle about the Z axis
     *
     * @param {number} rad angle (in radians) to rotate
     * @returns {quat} out
     */
    rotateZ(rad) {
        rad *= 0.5;

        let ax = this.x,
            ay = this.y,
            az = this.z,
            aw = this.w,
            bz = Math.sin(rad),
            bw = Math.cos(rad);

        this.x = ax * bw + ay * bz;
        this.y = ay * bw - ax * bz;
        this.z = az * bw + aw * bz;
        this.w = aw * bw - az * bz;
    };

    toMat3() {
        let x = this.x,
            y = this.y,
            z = this.z,
            w = this.w,
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            yx = y * x2,
            yy = y * y2,
            zx = z * x2,
            zy = z * y2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        let mat3 = new Mat3();
        mat3.__data[0] = 1 - yy - zz;
        mat3.__data[3] = yx - wz;
        mat3.__data[6] = zx + wy;

        mat3.__data[1] = yx + wz;
        mat3.__data[4] = 1 - xx - zz;
        mat3.__data[7] = zy - wx;

        mat3.__data[2] = zx - wy;
        mat3.__data[5] = zy + wx;
        mat3.__data[8] = 1 - xx - yy;

        return mat3;
    };


    /// Returns the X axis of this quaternion
    getXaxis() {
        let xy = this.x * this.y;
        let xz = this.x * this.z;
        let yy = this.y * this.y;
        let yw = this.y * this.w;
        let zz = this.z * this.z;
        let zw = this.z * this.w;

        return new Vec3(
            1.0 - 2.0 * (zz + yy),
            2.0 * (xy + zw),
            2.0 * (xz - yw)
        );
    }

    /// Returns the Y axis of this quaternion
    getYaxis() {
        let xx = this.x * this.x;
        let xy = this.x * this.y;
        let xw = this.x * this.w;
        let yz = this.y * this.z;
        let zz = this.z * this.z;
        let zw = this.z * this.w;

        return new Vec3(
            2.0 * (xy - zw),
            1.0 - 2.0 * (zz + xx),
            2.0 * (yz + xw)
        );
    }

    /// Returns the Z axis of this quaternion
    getZaxis() {
        let xx = this.x * this.x;
        let xz = this.x * this.z;
        let xw = this.x * this.w;

        let yy = this.y * this.y;
        let yz = this.y * this.z;
        let yw = this.y * this.w;
        let temp = new Vec3();

        return new Vec3(
            2.0 * (yw + xz),
            2.0 * (yz - xw),
            1.0 - 2.0 * (yy + xx)
        );
    }

    /// Reflects this Quaternion according to the axis provided.
    /// \param axisIndex An integer with value of 0 for the X axis, 1 for the Y axis, and 2 for the Z axis.
    mirror(axisIndex) {
        switch (axisIndex) {
            case 0:
                return new Quat(
                    this.z,
                    this.w,
                    this.x,
                    this.y);
            case 1:
                return new Quat(-this.w,
                    this.z,
                    this.y, -this.x);
            case 2:
                return new Quat(
                    this.x,
                    this.y,
                    this.z, -this.w);
        }
    }

    toMat4() {
        let x = this.x,
            y = this.y,
            z = this.z,
            w = this.w,
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            yx = y * x2,
            yy = y * y2,
            zx = z * x2,
            zy = z * y2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        // Set the columns
        let mat4 = new Mat4();
        mat4.__data[0] = 1 - yy - zz;
        mat4.__data[4] = yx - wz;
        mat4.__data[8] = zx + wy;

        mat4.__data[1] = yx + wz;
        mat4.__data[5] = 1 - xx - zz;
        mat4.__data[9] = zy - wx;

        mat4.__data[2] = zx - wy;
        mat4.__data[6] = zy + wx;
        mat4.__data[10] = 1 - xx - yy;

        return mat4;
    };


    getXaxis() {
        let xy = this.x * this.y;
        let xz = this.x * this.z;
        let yy = this.y * this.y;
        let yw = this.y * this.w;
        let zz = this.z * this.z;
        let zw = this.z * this.w;

        return new Vec3(
            1.0 - 2.0 * (zz + yy),
            2.0 * (xy + zw),
            2.0 * (xz - yw)
        );
    }

    getYaxis() {
        let xx = this.x * this.x;
        let xy = this.x * this.y;
        let xw = this.x * this.w;
        let yz = this.y * this.z;
        let zz = this.z * this.z;
        let zw = this.z * this.w;

        return new Vec3(
            2.0 * (xy - zw),
            1.0 - 2.0 * (zz + xx),
            2.0 * (yz + xw)
        );
    }

    getZaxis() {
        let xx = this.x * this.x;
        let xz = this.x * this.z;
        let xw = this.x * this.w;

        let yy = this.y * this.y;
        let yz = this.y * this.z;
        let yw = this.y * this.w;

        return new Vec3(
            2.0 * (yw + xz),
            2.0 * (yz - xw),
            1.0 - 2.0 * (yy + xx)
        );
    }

    /**
     * Performs a linear interpolation between two vec4's
     *
     * @param {vec4} out the receiving vector
     * @param {vec4} a the first operand
     * @param {vec4} b the second operand
     * @param {Number} w interpolation amount between the two inputs
     * @returns {vec4} out
     */
    lerp(b, w) {
        let result = new Quat(
            this.x + (w * (b.x - this.x)),
            this.y + (w * (b.y - this.y)),
            this.z + (w * (b.z - this.z)),
            this.w + (w * (b.w - this.w))
        );
        result.normalizeInPlace();
        return result;
    }

    // /**
    //  * Generates a random vector with the given scale
    //  *
    //  * @param {vec4} out the receiving vector
    //  * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
    //  * @returns {vec4} out
    //  */
    // random(scale = 1.0) {
    //     let r = glMatrix.RANDOM() * 2.0 * Math.PI;
    //     let z = (glMatrix.RANDOM() * 2.0) - 1.0;
    //     let zScale = Math.sqrt(1.0 - z * z) * scale;

    //     out[0] = Math.cos(r) * zScale;
    //     out[1] = Math.sin(r) * zScale;
    //     out[2] = z * scale;
    //     return out;
    // }

    //////////////////////////////////////////
    // Static Methods

    static create(...args) {
        return new Quat(...args);
    }

    // Creates a new Mat4 to wrap existing memory in a buffer.
    static createFromFloat32Buffer(buffer, offset = 0) {
        return new Quat(buffer, offset * 4) // 4 bytes per 32bit float
    }

    static numFloat32Elements() {
        return 4;
    }

    clone() {
        return new Quat(
            this.__data[0],
            this.__data[1],
            this.__data[2],
            this.__data[3]
        );
    }

    /////////////////////////////
    // Persistence
    
    toJSON() {
        return {
            "x": this.x,
            "y": this.y,
            "z": this.z,
            "w": this.w
        }
    }

    fromJSON(j) {
        this.x = j['x'];
        this.y = j['y'];
        this.z = j['z'];
        this.w = j['w'];
    }

};

typeRegistry.registerType('Quat', Quat);

export {
    Quat
};