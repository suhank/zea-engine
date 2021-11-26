/**
 * Class representing the red, green, blue and alpha channel of a color as 8bit values.
 *
 */
declare class RGBA {
    __data: Uint8Array;
    /**
     * Create a RGBA.
     * @param r - The red channel of a color.
     * @param g - The green channel of a color.
     * @param b - The blue channel of a color.
     * @param a - The alpha (transparency) channel of a color.
     */
    constructor(r?: number | string | Uint8Array | ArrayBuffer, g?: number, b?: number, a?: number);
    /**
     * Getter for red channel.
     *
     * @return - Returns the red channel.
     */
    get r(): number;
    /**
     * Setter for red channel.
     *
     * @param val - The val param.
     */
    set r(val: number);
    /**
     * Getter for green channel.
     *
     * @return - Returns the green channel.
     */
    get g(): number;
    /**
     * Setter for green channel.
     *
     * @param val - The val param.
     */
    set g(val: number);
    /**
     * Getter for blue channel.
     *
     * @return - Returns the blue channel.
     */
    get b(): number;
    /**
     * Setter for blue channel.
     *
     * @param val - The val param.
     */
    set b(val: number);
    /**
     * Getter for alpha channel.
     *
     * @return - Returns the alpha channel.
     */
    get a(): number;
    /**
     * Setter for alpha value.
     *
     * @param val - The val param.
     */
    set a(val: number);
    /**
     * Setter from scalar components.
     *
     * @param r - The red channel.
     * @param g  - The green channel.
     * @param b  - The blue channel.
     * @param a  - The alpha channel.
     */
    set(r: number, g: number, b: number, a?: number): void;
    /**
     * Setter from another RGBA color.
     *
     * @param other - The other RGBA to set from.
     */
    setFromOther(other: RGBA): void;
    /**
     * Setter from a scalar array.
     *
     * @param values - The array of values.
     */
    setFromArray(values: number[]): void;
    /**
     * Setter from a hexadecimal value.
     * E.g. #ff0000
     *
     * @param hex - The hex value.
     */
    setFromHex(hex: string): void;
    /**
     * Setter from a CSS color name.
     * E.g. "red"
     *
     * @param name - The CSS color name.
     */
    setFromCSSColorName(name: string): void;
    /**
     * Returns the hexadecimal value of this RGBA color.
     *
     * @return - Returns the hex value.
     */
    toHex(): string;
    /**
     * Returns true if this RGBA color is exactly the same as other.
     *
     * @param other - The other RGBA to compare with.
     * @return - Returns true or false.
     */
    equal(other: RGBA): boolean;
    /**
     * Returns true if this RGBA color is NOT exactly the same as other.
     *
     * @param other -  The other RGBA to compare with.
     * @return - Returns true or false.
     */
    notEquals(other: RGBA): boolean;
    /**
     * Returns true if this RGBA color is approximately the same as other.
     *
     * @param other - The other RGBA to compare with.
     * @param precision - The precision to which the values must match.
     * @return - Returns true or false.
     */
    approxEqual(other: RGBA, precision?: number): boolean;
    /**
     * Returns a new RGBA color which is this RGBA color added to other.
     *
     * @param other - The other RGBA to add.
     * @return - Returns a new RGBA.
     */
    add(other: RGBA): RGBA;
    /**
     * Returns a new RGBA color which is this RGBA color subtracted from other.
     *
     * @param other - The other RGBA to subtract.
     * @return - Returns a new RGBA.
     */
    subtract(other: RGBA): RGBA;
    /**
     * Returns a new RGBA color which is this vector scaled by scalar.
     *
     * @param scalar - The scalar value.
     * @return - Returns a new RGBA.
     */
    scale(scalar: number): RGBA;
    /**
     * Scales this RGBA color by scalar.
     *
     * @param scalar - The scalar value.
     */
    scaleInPlace(scalar: number): void;
    /**
     * Apply gamma correction to this RGBA color.
     *
     * @param gamma - The gamma value.
     */
    applyGamma(gamma: number): void;
    /**
     * Converts to linear color space and returns a new color.
     * @param gamma - The gamma value.
     * @return - Returns a new RGBA.
     */
    toLinear(gamma?: number): RGBA;
    /**
     * Converts to gamma color space and returns a new RGBA color.
     *
     * @param gamma - The gamma value.
     * @return - Returns a new RGBA.
     */
    toGamma(gamma?: number): RGBA;
    /**
     * Calculates and returns the relative luminance of the linear RGB component.
     *
     * @return - The return value.
     */
    luminance(): number;
    /**
     * Performs a linear interpolation between this RGBA color and other.
     *
     * @param other - The other RGBA to interpolate between.
     * @param t - Interpolation amount between the two inputs.
     * @return - Returns a new RGBA.
     */
    lerp(other: RGBA, t: number): RGBA;
    /**
     * Creates a random RGBA.
     *
     * @param gammaOffset - The gamma offset.
     * @param randomAlpha - Determines whether the alpha channel is random.
     * @return - Returns a new random RGBA.
     */
    static random(gammaOffset?: number, randomAlpha?: boolean): RGBA;
    /**
     * Clones this RGBA color and returns a new RGBA color.
     *
     * @return - Returns a new RGBA.
     */
    clone(): RGBA;
    /**
     * Returns the type as an array. Often used to pass types to the GPU.
     *
     * @return - Returns as an array.
     */
    asArray(): Uint8Array;
    /**
     * Returns the type as a 3 component array. Often used to pass types to the GPU.
     *
     * @return - Returns as a 3 component array.
     */
    as3ComponentArray(): number[];
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
     * Returns the CSS rgba string.
     *
     * @return - The return value.
     */
    toCSSString(): string;
}
export { RGBA };
