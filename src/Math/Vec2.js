import {
    AttrValue
} from './AttrValue.js';
import {
    typeRegistry
} from './TypeRegistry.js';


class Vec2 extends AttrValue {
    constructor(x = 0, y = 0) {
        super();

        if (x instanceof Float32Array || x instanceof Uint32Array || x instanceof Int32Array) {
            this.__data = x;
        } else if (x instanceof ArrayBuffer) {
            let buffer = x
            let byteOffset = y
            this.__data = new Float32Array(buffer, byteOffset, 2);
        } else {
            this.__data = new Float32Array(2);
            this.__data[0] = x;
            this.__data[1] = y;
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

    // Setter from scalar components
    set(x, y) {
        this.x = x;
        this.y = y;
    }


    // Setter from scalar components
    setFromOther(other) {
        this.x = other.x;
        this.y = other.y;
    }


    // Returns true if this vector is the same as another one
    equal(other) {
        return (this.x == other.x) && (this.y == other.y);
    }


    // Returns true if this vector is the same as another one
    notequals(other) {
        return (this.x != other.x) && (this.y != other.y);
    }


    // Returns true if this vector is the same as another one
    // (given a precision)
    approxEqual(other) {
        return (Math.abs(this.x - other.x) < Number.EPSILON) && (Math.abs(this.y - other.y) < Number.EPSILON);
    }


    // Returns a new vector which is this vector added to other
    add(other) {
        return new Vec2(
            this.x + other.x,
            this.y + other.y
        );
    }

    addInPlace(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }


    // Returns a new vector which is this vector subtracted from other
    subtract(other) {
        return new Vec2(
            this.x - other.x,
            this.y - other.y
        );
    }

    subtractInPlace(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    // Returns a new vector which is this vector scaled by scalar
    scale(scalar) {
        return new Vec2(
            this.x * scalar,
            this.y * scalar
        );
    }

    // scales the vector modifying its values.
    scaleInPlace(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    invert() {
        return new Vec2(
            1.0 / this.x,
            1.0 / this.y
        );
    }

    invertInPlace() {
        this.x = 1.0 / this.x;
        this.y = 1.0 / this.y;
        return this;
    }


    multiply(vec2) {
        return new Vec2(
            this.x * vec2.x,
            this.y * vec2.y
        );
    }

    /**
     * Calculates the length of a vec2
     *
     * @returns {Number} length of a
     */
    lengthSquared() {
        let x = this.__data[0],
            y = this.__data[1];
        return x * x + y * y;
    }

    /**
     * Calculates the length of a vec2
     *
     * @returns {Number} length of a
     */
    length() {
        return Math.sqrt(this.lengthSquared());
    }

    /**
     * Returns the vector normalized
     *
     */
    normalize() {
        let x = this.__data[0],
            y = this.__data[1];
        let len = x * x + y * y;
        if (len < Number.EPSILON) {
            return new Vec2();
        }

        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        return new Vec2(x * len, y * len);
    }

    normalizeInPlace() {
        let x = this.__data[0],
            y = this.__data[1];
        let len = x * x + y * y;
        if (len < Number.EPSILON) {
            return;
        }
        len = 1 / Math.sqrt(len);
        this.set(x * len, y * len);
    }

    /**
     * Calculates the dot product of two vec2's
     *
     * @param {vec2} a the first operand
     * @param {vec2} b the second operand
     * @returns {Number} dot product of a and b
     */
    dot(b) {
        return this.x * b.x + this.y * b.y;
    }


    /**
     * Get the angle between two 3D vectors
     * @param {vec3} b The second operand
     * @returns {Number} The angle in radians
     */
    angle(b) {
        return Math.Atan2(b.x - this.x, b.y - this.y);
    }

    /**
     * Performs a linear interpolation between two vec2's
     *
     * @param {vec2} out the receiving vector
     * @param {vec2} a the first operand
     * @param {vec2} b the second operand
     * @param {Number} t interpolation amount between the two inputs
     * @returns {vec2} out
     */
    lerp(b, t) {
        let ax = this.x,
            ay = this.y;
        return new Vec2(
            ax + t * (b.x - ax),
            ay + t * (b.y - ay));
    }

    // Creates a new Mat4 to wrap existing memory in a buffer.
    static createFromFloat32Buffer(buffer, offset = 0) {
        return new Vec2(buffer, offset * 4); // 4 bytes per 32bit float
    }

    static numFloat32Elements() {
        return 2;
    }

    clone() {
        return new Vec2(
            this.__data[0],
            this.__data[1]
        );
    }

    //////////////////////////////////////////
    // Static Methods

    static create(...args) {
        return new Vec2(...args);
    }

    /////////////////////////////
    // Persistence

    toJSON() {
        return {
            "x": this.x,
            "y": this.y
        }
    }

    fromJSON(j) {
        this.x = j['x'];
        this.y = j['y'];
    }
};

typeRegistry.registerType('Vec2', Vec2);

export {
    Vec2
};