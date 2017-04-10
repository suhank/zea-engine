
import {
    AttrValue
} from './AttrValue.js';

class Color extends AttrValue {
    constructor(r = 0, g = 0, b = 0, a = 1.0) {
        super();

        if (r instanceof Float32Array) {
            this.__data = r;
        } else if (r instanceof ArrayBuffer) {
            let buffer = r;
            let byteOffset = g;
            this.__data = new Float32Array(buffer, byteOffset, 4);
        } else {
            this.__data = new Float32Array(4);
            this.__data[0] = r;
            this.__data[1] = g;
            this.__data[2] = b;
            this.__data[3] = a;
        }
    }

    get r() {
        return this.__data[0];
    }

    set r(val) {
        this.__data[0] = val;
    }

    get g() {
        return this.__data[1];
    }

    set g(val) {
        this.__data[1] = val;
    }

    get b() {
        return this.__data[2];
    }

    set b(val) {
        this.__data[2] = val;
    }

    get a() {
        return this.__data[3];
    }

    set a(val) {
        this.__data[3] = val;
    }

    // Setter from scalar components
    set(r, g, b, a=1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    setFromOther(other) {
        this.r = other.r;
        this.g = other.g;
        this.b = other.b;
        this.a = other.a;
    }

    setFromScalarArray(vals) {
        this.r = vals[0];
        this.g = vals[1];
        this.b = vals[2];
        this.a = vals.length == 4 ? vals[3] : 1.0;
    }

    getAsRGBArray() {
        let vals = [];
        vals.push(this.r * 255);
        vals.push(this.g * 255);
        vals.push(this.b * 255);
        return vals;
    }
    setFromRGB(r, g, b, a) {
        this.r = r / 255;
        this.g = g / 255;
        this.b = b / 255;
        this.a = a ? (a / 255) : 1.0;
    }
    setFromRGBArray(vals) {
        this.r = vals[0] / 255;
        this.g = vals[1] / 255;
        this.b = vals[2] / 255;
        this.a = vals.length == 4 ? (vals[3] / 255) : 1.0;
    }

    // Returns true if this vector is the same as another one
    equal(other, precision) {
        return (this.r == other.r) &&
            (this.g == other.g) &&
            (this.b == other.b) &&
            (this.a == other.a);
    }

    // Returns true if this vector is the same as another one
    notequals(other, precision) {
        return (this.r != other.r) &&
            (this.g != other.g) &&
            (this.b != other.b) &&
            (this.a != other.a);
    }

    // Returns true if this vector is the same as another one
    // (given a precision)
    almostEqual(other) {
        return (Math.abs(this.r - other.r) < Number.EPSILON) &&
            (Math.abs(this.g - other.g) < Number.EPSILON) &&
            (Math.abs(this.b - other.b) < Number.EPSILON) &&
            (Math.abs(this.a - other.a) < Number.EPSILON);
    }

    // Returns a new vector which is this vector added to other
    add(other) {
        return new Color(
            this.r + other.r,
            this.g + other.g,
            this.b + other.b,
            this.a + other.a
        );
    }

    // Returns a new vector which is this vector subtracted from other
    subtract(other) {
        return new Color(
            this.r - other.r,
            this.g - other.g,
            this.b - other.b,
            this.a - other.a
        );
    }

    luminance() {
        return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
    }

    /**
     * Performs a linear interpolation between two colors
     *
     * @param {color} out the receiving vector
     * @param {color} a the first operand
     * @param {color} b the second operand
     * @param {Number} a interpolation amount between the two inputs
     * @returns {color} out
     */
    lerp(b, a) {
        let ax = this.r,
            ay = this.g,
            az = this.b;
        at = this.a;
        return new Color(
            ax + a * (b.r - ax),
            ay + a * (b.g - ay),
            az + a * (b.b - az),
            at + a * (b.a - at));
    }

    /**
     * Generates a random vector with the given scale
     *
     * @param {color} out the receiving vector
     * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
     * @returns {color} out
     */
    static random(gammaOffset = 0.0, randomAlpha = false) {
        if (gammaOffset > 0.0) {
            return new Color(
                gammaOffset + Math.random() * (1.0 - gammaOffset),
                gammaOffset + Math.random() * (1.0 - gammaOffset),
                gammaOffset + Math.random() * (1.0 - gammaOffset),
                randomAlpha ? (gammaOffset + Math.random() * (1.0 - gammaOffset)) : 1.0
            );
        } else if (gammaOffset < 0.0) {
            return new Color(
                Math.random() * (1.0 + gammaOffset),
                Math.random() * (1.0 + gammaOffset),
                Math.random() * (1.0 + gammaOffset),
                randomAlpha ? (Math.random() * (1.0 + gammaOffset)) : 1.0
            );

        } else {
            return new Color(
                Math.random(),
                Math.random(),
                Math.random(),
                randomAlpha ? Math.random() : 1.0
            );
        }
    }

    // Creates a new Mat4 to wrap existing memory in a buffer.
    static createFromFloat32Buffer(buffer, offset = 0) {
        return new Color(buffer, offset * 4) // 4 bytes per 32bit float
    }

    static numFloat32Elements() {
        return 4;
    }

    asArray() {
        return this.__data;
    }

    as3ComponentArray() {
        return [this.__data[0], this.__data[1], this.__data[2]];
    }

    toJSON() {
        return {
            "r": this.r,
            "g": this.g,
            "b": this.b,
            "a": this.a
        }
    }


    fromJSON(j) {
        this.r = j.r;
        this.g = j.g;
        this.b = j.b;
        this.a = j.a;
    }

};

export {
    Color
};