declare const UInt8 = 0;
declare const SInt8 = 1;
declare const UInt16 = 2;
declare const SInt16 = 3;
declare const UInt32 = 4;
declare const SInt32 = 5;
declare const Float32 = 6;
/**
 * Math Functions
 */
declare class MathFunctions {
    /**
     * Converts Radians to Degrees
     *
     * @static
     * @param rad - Radians value
     * @return - Degrees equivalent
     */
    static radToDeg(rad: number): number;
    /**
     * Converts Degrees to Radiants
     *
     * @static
     * @param deg - Degrees value
     * @return -  Radians equivalent
     */
    static degToRad(deg: number): number;
    /**
     * Verifies if the specified parameter is numeric.
     *
     * @static
     * @param number - Number to test
     * @return - `true` when is a valid number
     */
    static isNumeric(number: any): boolean;
    /**
     * Generates and returns a random integer within the specified range.
     *
     * @static
     * @param min - Lower value random int can be.
     * @param max - Highest value random int can be.
     * @return - Random number inside range.
     */
    static randomInt(min: number, max: number): number;
    /**
     * Calculates a lineal interpolation between two inputs for the specified parameter(t).
     *
     * @static
     * @param v0 -
     * @param v1 -
     * @param t -
     * @return -
     */
    static lerp(v0: number, v1: number, t: number): number;
    /**
     * Restricts the specified value between two numbers
     *
     * @static
     * @param value
     * @param min
     * @param max
     * @return
     */
    static clamp(value: number, min: number, max: number): number;
    /**
     * Returns the nearest pow of two value of the specified number.
     *
     * @static
     * @param value -
     * @return -
     */
    static nearestPow2(value: number): number;
    /**
     * Returns the nearest pow of ten value of the specified number.
     *
     * @static
     * @param value -
     * @return -
     */
    static nearestPow10(value: number): number;
    /**
     * Returns the next pow of two value of the specified number.
     *
     * @static
     * @param value -
     * @return -
     */
    static nextPow2(value: number): number;
    /**
     * Returns the fractional component of a number
     *
     * @static
     * @param value -
     * @return -
     */
    static fract(value: number): number;
    /**
     * Moves the specified value from one numeric domain(range) to another.
     *
     * @static
     * @param value -
     * @param start1 -
     * @param end1 -
     * @param start2 -
     * @param end2 -
     * @return -
     */
    static remap(value: number, start1: number, end1: number, start2: number, end2: number): number;
    /**
     * Perform Hermite interpolation between two values
     *
     * @static
     * @param edge0 -
     * @param edge1 -
     * @param x -
     * @return -
     */
    static smoothStep(edge0: number, edge1: number, x: number): number;
    /**
     * Performs - interpolation between two values
     *
     * @static
     * @param edge0 -
     * @param edge1 -
     * @param x -
     * @return -
     */
    static linStep(edge0: number, edge1: number, x: number): number;
    /**
     * Decodes a Float16 from two unsigned Int8
     *
     * @static
     * @param c - Array with the two UInt8
     * @return - Decoded Float16
     */
    static decode16BitFloatFrom2xUInt8(c: Uint8Array): number;
    /**
     * Encodes an array of two unsigned Int8 to a Float16
     *
     * @static
     * @param v - Float16 number
     * @return - Encoded Unsigned Int8 array
     */
    static encode16BitFloatInto2xUInt8(v: number): Uint8Array;
    /**
     * Transforms a 16 bit float to an encoded integer.
     *
     * @static
     * @param v - Float16 number to encode
     * @return - Encoded number
     */
    static encode16BitFloat(v: number): number;
    /**
     * As opposite of the `encode16BitFloat` method, this takes an encoded integer value,
     * and returns the 16 bit float.
     *
     * @static
     * @param h - Encoded integer
     * @return - Decoded 16 bit float.
     */
    static decode16BitFloat(h: number): number;
    /**
     * Transforms an array of Float 32 to an array of unsigned Int16.
     *
     * @static
     * @param float32Array -
     * @return - Unsigned Int16 array representative of the Float32Array
     */
    static convertFloat32ArrayToUInt16Array(float32Array: Float32Array): Uint16Array;
}
export { UInt8, SInt8, SInt16, UInt16, SInt32, UInt32, Float32, MathFunctions };
