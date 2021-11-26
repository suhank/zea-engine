import { BinReader } from '../SceneTree/BinReader';
/**
 * Class representing a color as 4 floating point values.
 */
declare class Color {
    __data: Float32Array;
    /**
     * Creates a `Color` object with an RGBA structure.
     *
     * @param r - The red channel of a color.
     * @param g - The green channel of a color.
     * @param b - The blue channel of a color.
     * @param a - The alpha (transparency) channel of a color.
     */
    constructor(r?: number | string | Float32Array | ArrayBuffer, g?: number, b?: number, a?: number);
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
     * Sets current color state with another `Color` object.
     *
     * @param other - The other color to set from.
     */
    setFromOther(other: Color): void;
    /**
     * Setter from a scalar array.
     *
     * @param vals - The vals param.
     */
    setFromScalarArray(vals: Float32Array): void;
    /**
     * Getter from an RGB array.
     *
     * @return - The return value.
     */
    getAsRGBArray(): number[];
    /**
     * Getter from an RGB dict.
     *
     * @return - The return value.
     */
    getAsRGBDict(): Record<string, number>;
    /**
     * Setter from a RGB value.
     *
     * @param r - The red channel.
     * @param g  - The green channel.
     * @param b  - The blue channel.
     * @param a  - The alpha channel.
     */
    setFromRGB(r: number, g: number, b: number, a?: number): void;
    /**
     * Setter from an RGB array.
     *
     * @param vals - The vals param.
     */
    setFromRGBArray(vals: Float32Array): void;
    /**
     * Setter from an RGB dict.
     *
     * @param vals - The vals param.
     */
    setFromRGBDict(vals: Record<string, number>): void;
    /**
     * Setter from a hexadecimal value.
     * E.g. #ff0000
     * @param hex - The hex value.
     */
    setFromHex(hex: string): void;
    /**
     * Sets the Color values from a CSS color name.
     * E.g. "red"
     * @param name - The CSS color name.
     */
    setFromCSSColorName(name: string): void;
    /**
     * Returns the hexadecimal value of this color, including the leading "#" character.
     *
     * @return - Returns the hex value.
     */
    toHex(): string;
    /**
     * Checks if this Color  contains the same values as the other.
     *
     * @param other - The other Color to compare with.
     * @return - Returns `true` if the values are the same, otherwise, `false`.
     */
    isEqual(other: Color): boolean;
    /**
     * Returns true if this color is NOT exactly the same as other.
     *
     * @param other - The other color to compare with.
     * @return - Returns true or false.
     */
    notEquals(other: Color): boolean;
    /**
     * Returns true if this color is approximately the same as other.
     *
     * @param other - The other color to compare with.
     * @param precision - The precision to which the values must match.
     * @return - Returns true or false.
     */
    approxEqual(other: Color, precision?: number): boolean;
    /**
     * Returns a new Color which is this Color added to other.
     *
     * @param other - The other color to add.
     * @return - Returns a new color.
     */
    add(other: Color): Color;
    /**
     * Updates this Color by adding the values from the other color.
     *
     * @param other - The other color to add.
     */
    addInPlace(other: Color): void;
    /**
     * Returns a new color which is this color subtracted from other.
     *
     * @param other - The other color to subtract.
     * @return - Returns a new color.
     */
    subtract(other: Color): Color;
    /**
     * Scales this color by scalar and return the result as a new Vec4.
     *
     * @param scalar - The scalar value.
     * @return - Returns a new color.
     */
    scale(scalar: number): Color;
    /**
     * Scales this color by scalar.
     *
     * @param scalar - The scalar value.
     */
    scaleInPlace(scalar: number): void;
    /**
     * Apply gamma correction to this color
     *
     * @param gamma - The gamma value.
     */
    applyGamma(gamma: number): void;
    /**
     * Converts to linear color space and returns a new color
     *
     * @param gamma - The gamma value.
     * @return - Returns a new color.
     */
    toLinear(gamma?: number): Color;
    /**
     * returns a new color value value is mapped into a gamma curve
     *
     * @param gamma - The gamma value.
     * @return - Returns a new color.
     */
    toGamma(gamma?: number): Color;
    /**
     * Calculates and returns the luminance of the linear RGB components.
     *
     * @return - The return value.
     */
    luminance(): number;
    /**
     * Performs a linear interpolation between this color and other.
     *
     * @param other - The other color to interpolate between.
     * @param t - Interpolation amount between the two inputs.
     * @return - Returns a new color.
     */
    lerp(other: Color, t: number): Color;
    /**
     * Creates a random color.
     *
     * @param gammaOffset - The gamma offset. Values between 0 and 1 increase the average brightness of the generated color. Values between 0 and -1 darken the generated color values.
     * @param randomAlpha - Determines whether the alpha channel is random. If not, the alpha values will be 1.0.
     * @return - The new random color.
     */
    static random(gammaOffset?: number, randomAlpha?: boolean): Color;
    /**
     * Clones this color and returns a new color.
     *
     * @return - Returns a new color.
     */
    clone(): Color;
    /**
     * Returns the type as an array. Often used to pass types to the GPU.
     *
     * @return - Returns as an array.
     */
    asArray(): Float32Array;
    /**
     * Returns the type as a 3 component array. Often used to pass types to the GPU.
     *
     * @return - Returns as a 3 component array.
     * @private
     */
    as3ComponentArray(): Array<number>;
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
    /**
     * Returns the CSS rgba string.
     *
     * @return - The return value.
     */
    toCSSString(): string;
}
export { Color };
