/* eslint-disable require-jsdoc */
import { BinReader } from '../SceneTree/BinReader'
/**
 * Class representing a color as 4 floating point values.
 */
class Color {
  __data: Float32Array | Uint32Array | Int32Array
  /**
   * Creates a `Color` object with an RGBA structure.
   *
   * @param {number | string | Float32Array | ArrayBuffer} r - The red channel of a color.
   * @param {number} g - The green channel of a color.
   * @param {number} b - The blue channel of a color.
   * @param {number} a - The alpha (transparency) channel of a color.
   */
  constructor(r: number | string | Float32Array | ArrayBuffer = 0, g = 0, b = 0, a = 1.0) {
    if (r instanceof Float32Array) {
      this.__data = r
    } else if (r instanceof ArrayBuffer) {
      console.warn(`deprecated, please use new Vec4(new Float32Array(buffer, byteOffset, 4))`)
      const buffer = r
      const byteOffset = g
      this.__data = new Float32Array(buffer, byteOffset, 4)
    } else {
      this.__data = new Float32Array(4)
      if (typeof r == 'string') {
        if ((r as string).startsWith('#')) {
          this.setFromHex(r)
        } else {
          this.setFromCSSColorName(r)
        }
      } else {
        this.__data[0] = r
        this.__data[1] = g
        this.__data[2] = b
        this.__data[3] = a
      }
    }
  }

  /**
   * Getter for red channel.
   *
   * @return {number} - Returns the red channel.
   */
  get r(): number {
    return this.__data[0]
  }

  /**
   * Setter for red channel.
   *
   * @param {number} val - The val param.
   */
  set r(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for green channel.
   *
   * @return {number} - Returns the green channel.
   */
  get g(): number {
    return this.__data[1]
  }

  /**
   * Setter for green channel.
   * @param {number} val - The val param.
   */
  set g(val: number) {
    this.__data[1] = val
  }

  /**
   * Getter for blue channel.
   *
   * @return {number} - Returns the blue channel.
   */
  get b(): number {
    return this.__data[2]
  }

  /**
   * Setter for blue channel.
   *
   * @param {number} val - The val param.
   */
  set b(val: number) {
    this.__data[2] = val
  }

  /**
   * Getter for alpha channel.
   *
   * @return {number} - Returns the alpha channel.
   */
  get a(): number {
    return this.__data[3]
  }
  /**
   * Setter for alpha value.
   *
   * @param {number} val - The val param.
   */
  set a(val: number) {
    this.__data[3] = val
  }

  /**
   * Setter from scalar components.
   *
   * @param {number} r - The red channel.
   * @param {number} g  - The green channel.
   * @param {number} b  - The blue channel.
   * @param {number} a  - The alpha channel.
   */
  set(r: number, g: number, b: number, a = 1.0): void {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  /**
   * Sets current color state with another `Color` object.
   *
   * @param {Color} other - The other color to set from.
   */
  setFromOther(other: Color): void {
    this.r = other.r
    this.g = other.g
    this.b = other.b
    this.a = other.a
  }

  /**
   * Setter from a scalar array.
   *
   * @param {Float32Array} vals - The vals param.
   */
  setFromScalarArray(vals: Float32Array): void {
    this.r = vals[0]
    this.g = vals[1]
    this.b = vals[2]
    this.a = vals.length == 4 ? vals[3] : 1.0
  }

  /**
   * Getter from an RGB array.
   *
   * @return {number[]} - The return value.
   */
  getAsRGBArray(): number[] {
    return [this.r * 255, this.g * 255, this.b * 255]
  }

  /**
   * Getter from an RGB dict.
   *
   * @return {Record<string, number>} - The return value.
   */
  getAsRGBDict(): Record<string, number> {
    return {
      r: this.r * 255,
      g: this.g * 255,
      b: this.b * 255
    }
  }

  /**
   * Setter from a RGB value.
   *
   * @param {number} r - The red channel.
   * @param {number} g  - The green channel.
   * @param {number} b  - The blue channel.
   * @param {number} a  - The alpha channel.
   */
  setFromRGB(r: number, g: number, b: number, a?: number): void {
    this.r = r / 255
    this.g = g / 255
    this.b = b / 255
    this.a = a ? a / 255 : 1.0
  }

  /**
   * Setter from an RGB array.
   *
   * @param {Float32Array} vals - The vals param.
   */
  setFromRGBArray(vals: Float32Array): void {
    this.r = vals[0] / 255
    this.g = vals[1] / 255
    this.b = vals[2] / 255
    this.a = vals.length == 4 ? vals[3] / 255 : 1.0
  }

  /**
   * Setter from an RGB dict.
   *
   * @param {Record<string, number>} vals - The vals param.
   */
  setFromRGBDict(vals: Record<string, number>): void {
    this.r = vals.r / 255
    this.g = vals.g / 255
    this.b = vals.b / 255
    this.a = vals.a == 4 ? vals.a / 255 : 1.0
  }

  /**
   * Setter from a hexadecimal value.
   * E.g. #ff0000
   * @param {number} hex - The hex value.
   */
  setFromHex(hex: string): void {
    function hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null
    }
    const rgb = hexToRgb(hex)
    if (!rgb) {
      console.warn('Invalid hex code:' + hex)
      return
    }

    this.setFromRGB(rgb.r, rgb.g, rgb.b)
  }

  /**
   * Sets the Color values from a CSS color name.
   * E.g. "red"
   * @param {string} name - The CSS color name.
   */
  setFromCSSColorName(name: string): void {
    const colourNameToHex = (colour: string): string | undefined => {
      const colors: Record<string, string> = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        'indianred ': '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgrey: '#d3d3d3',
        lightgreen: '#90ee90',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370d8',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#d87093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
      }
      return colors[colour.toLowerCase()]
      //  if (typeof colors[colour.toLowerCase()] != 'undefined') return colors[colour.toLowerCase()]

      // return false
    }
    if (name.startsWith('#')) {
      this.setFromHex(name)
    } else {
      const hexColor = colourNameToHex(name)
      if (hexColor) this.setFromHex(hexColor)
    }
  }

  /**
   * Returns the hexadecimal value of this color, including the leading "#" character.
   *
   * @return {string} - Returns the hex value.
   */
  toHex(): string {
    function componentToHex(c: number) {
      const int = Math.round(c * 255)
      const hex = int.toString(16)
      return hex.length == 1 ? '0' + hex : hex
    }
    return '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b)
  }

  /**
   * @deprecated
   * Returns true if this color contains the same values as the other.
   * Deprecated. Use #isEqual instead.
   *
   * @param {Color} other - The other color to compare with.
   * @return {boolean} - Returns true or false.
   */
  equal(other: Color): boolean {
    console.warn('Deprecated. Use #isEqual instead.')
    return this.isEqual(other)
  }

  /**
   * Checks if this Color  contains the same values as the other.
   *
   * @param {Color} other - The other Color to compare with.
   * @return {boolean} - Returns `true` if the values are the same, otherwise, `false`.
   */
  isEqual(other: Color): boolean {
    return this.r == other.r && this.g == other.g && this.b == other.b && this.a == other.a
  }

  /**
   * Returns true if this color is NOT exactly the same as other.
   *
   * @param {Color} other - The other color to compare with.
   * @return {boolean} - Returns true or false.
   */
  notEquals(other: Color): boolean {
    return this.r != other.r && this.g != other.g && this.b != other.b && this.a != other.a
  }

  /**
   * Returns true if this color is approximately the same as other.
   *
   * @param {Color} other - The other color to compare with.
   * @param {number} precision - The precision to which the values must match.
   * @return {boolean} - Returns true or false.
   */
  approxEqual(other: Color, precision: number = Number.EPSILON): boolean {
    return (
      Math.abs(this.r - other.r) < precision &&
      Math.abs(this.g - other.g) < precision &&
      Math.abs(this.b - other.b) < precision &&
      Math.abs(this.a - other.a) < precision
    )
  }

  /**
   * Returns a new Color which is this Color added to other.
   *
   * @param {Color} other - The other color to add.
   * @return {Color} - Returns a new color.
   */
  add(other: Color): Color {
    return new Color(this.r + other.r, this.g + other.g, this.b + other.b, this.a + other.a)
  }

  /**
   * Updates this Color by adding the values from the other color.
   *
   * @param {Color} other - The other color to add.
   */
  addInPlace(other: Color) {
    this.r += other.r
    this.g += other.g
    this.b += other.b
    this.a += other.a
  }

  /**
   * Returns a new color which is this color subtracted from other.
   *
   * @param {Color} other - The other color to subtract.
   * @return {Color} - Returns a new color.
   */
  subtract(other: Color): Color {
    return new Color(this.r - other.r, this.g - other.g, this.b - other.b, this.a - other.a)
  }

  /**
   * Scales this color by scalar and return the result as a new Vec4.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} - Returns a new color.
   */
  scale(scalar: number): Color {
    return new Color(this.r * scalar, this.g * scalar, this.b * scalar, this.a * scalar)
  }

  /**
   * Scales this color by scalar.
   *
   * @param {number} scalar - The scalar value.
   */
  scaleInPlace(scalar: number): void {
    this.r *= scalar
    this.g *= scalar
    this.b *= scalar
    this.a *= scalar
  }

  /**
   * Apply gamma correction to this color
   *
   * @param {number} gamma - The gamma value.
   */
  applyGamma(gamma: number): void {
    this.set(Math.pow(this.r, gamma), Math.pow(this.g, gamma), Math.pow(this.b, gamma), this.a)
  }

  /**
   * Converts to linear color space and returns a new color
   *
   * @param {number} gamma - The gamma value.
   * @return {Color} - Returns a new color.
   */
  toLinear(gamma = 2.2): Color {
    return new Color(Math.pow(this.r, gamma), Math.pow(this.g, gamma), Math.pow(this.b, gamma), this.a)
  }

  /**
   * returns a new color value value is mapped into a gamma curve
   *
   * @param {number} gamma - The gamma value.
   * @return {Color} - Returns a new color.
   */
  toGamma(gamma = 2.2): Color {
    return new Color(
      Math.pow(this.r, 1.0 / gamma),
      Math.pow(this.g, 1.0 / gamma),
      Math.pow(this.b, 1.0 / gamma),
      this.a
    )
  }

  /**
   * Calculates and returns the luminance of the linear RGB components.
   *
   * @return {number} - The return value.
   */
  luminance(): number {
    return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b
  }

  /**
   * Performs a linear interpolation between this color and other.
   *
   * @param {Color} other - The other color to interpolate between.
   * @param {number} t - Interpolation amount between the two inputs.
   * @return {Color} - Returns a new color.
   */
  lerp(other: Color, t: number): Color {
    const ar = this.r
    const ag = this.g
    const ab = this.b
    const aa = this.a
    return new Color(ar + t * (other.r - ar), ag + t * (other.g - ag), ab + t * (other.b - ab), aa + t * (other.a - aa))
  }

  /**
   * Creates a random color.
   *
   * @param {number} gammaOffset - The gamma offset. Values between 0 and 1 increase the average brightness of the generated color. Values between 0 and -1 darken the generated color values.
   * @param {boolean} randomAlpha - Determines whether the alpha channel is random. If not, the alpha values will be 1.0.
   * @return {Color} - The new random color.
   */
  static random(gammaOffset = 0.0, randomAlpha = false): Color {
    if (gammaOffset > 0.0) {
      return new Color(
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        randomAlpha ? gammaOffset + Math.random() * (1.0 - gammaOffset) : 1.0
      )
    }

    if (gammaOffset < 0.0) {
      return new Color(
        Math.random() * (1.0 + gammaOffset),
        Math.random() * (1.0 + gammaOffset),
        Math.random() * (1.0 + gammaOffset),
        randomAlpha ? Math.random() * (1.0 + gammaOffset) : 1.0
      )
    }

    return new Color(Math.random(), Math.random(), Math.random(), randomAlpha ? Math.random() : 1.0)
  }

  /**
   * Clones this color and returns a new color.
   *
   * @return {Color} - Returns a new color.
   */
  clone(): Color {
    return new Color(this.__data[0], this.__data[1], this.__data[2], this.__data[3])
  }

  /**
   * Returns the type as an array. Often used to pass types to the GPU.
   *
   * @return {Float32Array} - Returns as an array.
   */
  asArray(): Float32Array {
    return this.__data
  }

  /**
   * Returns the type as a 3 component array. Often used to pass types to the GPU.
   *
   * @return {Array<number>} - Returns as a 3 component array.
   * @private
   */
  as3ComponentArray(): Array<number> {
    return [this.__data[0], this.__data[1], this.__data[2]]
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new color.
   * @param {...args: any[]} ...args - The ...args param.
   * @return {Color} - Returns a new color.
   * @private
   */

  static create(...args: any[]): Color {
    return new Color(...args)
  }

  /**
   * The createFromFloat32Buffer method.
   * @param {ArrayBuffer} buffer - The buffer value.
   * @param {number} offset - The offset value.
   * @return {Color} - Returns a new color.
   * @deprecated
   * @private
   */
  static createFromFloat32Buffer(buffer: ArrayBuffer, offset = 0): Color {
    console.warn('Deprecated, use #createFromBuffer instead')
    return this.createFromBuffer(buffer, offset * 4)
  }

  /**
   * Creates an instance of a `Color` using an ArrayBuffer.
   *
   * @static
   * @param {ArrayBuffer} buffer - The buffer value.
   * @param {number} byteOffset - The offset value.
   * @return {Color} - Returns a new color.
   */
  static createFromBuffer(buffer: ArrayBuffer, byteOffset: number): Color {
    return new Color(new Float32Array(buffer, byteOffset, 4)) // 4 bytes per 32bit float
  }

  /**
   * Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.
   * @return {number} - The return value.
   * @private
   */
  static numElements(): number {
    return 4
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return {Record<string, number>} - The json object.
   */
  toJSON(): Record<string, number> {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, number>} j - The json object.
   */
  fromJSON(j: Record<string, number>): void {
    this.r = j.r
    this.g = j.g
    this.b = j.b
    this.a = j.a
  }

  /**
   * Loads the state of the value from a binary reader.
   *
   * @param {BinReader} reader - The reader value.
   */
  readBinary(reader: BinReader): void {
    this.r = reader.loadFloat32()
    this.g = reader.loadFloat32()
    this.b = reader.loadFloat32()
    this.a = reader.loadFloat32()
  }

  /**
   * Returns the CSS rgba string.
   *
   * @return {string} - The return value.
   */
  toCSSString(): string {
    return (
      'rgba(' +
      Math.round(this.r * 255) +
      ', ' +
      Math.round(this.g * 255) +
      ', ' +
      Math.round(this.b * 255) +
      ', ' +
      this.a +
      ')'
    )
  }
}

export { Color }
