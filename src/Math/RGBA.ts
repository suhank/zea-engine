/* eslint-disable require-jsdoc */

/**
 * Class representing the red, green, blue and alpha channel of a color as 8bit values.
 *
 */
class RGBA {
  __data: Uint8Array
  /**
   * Create a RGBA.
   * @param r - The red channel of a color.
   * @param g - The green channel of a color.
   * @param b - The blue channel of a color.
   * @param a - The alpha (transparency) channel of a color.
   */
  constructor(r: number | string | Uint8Array | ArrayBuffer = 0, g = 0, b = 0, a = 255) {
    if (r instanceof Uint8Array) {
      this.__data = r
    } else if (r instanceof ArrayBuffer) {
      const buffer = r
      const byteOffset = g
      this.__data = new Uint8Array(buffer, byteOffset, 4)
    } else {
      this.__data = new Uint8Array(4)
      if (typeof r == 'string') {
        if ((r as any).startsWith('#')) {
          this.setFromHex(r)
        } else {
          this.setFromCSSColorName(r)
        }
      } else {
        this.__data[0] = r as number
        this.__data[1] = g
        this.__data[2] = b
        this.__data[3] = a
      }
    }
  }

  /**
   * Getter for red channel.
   *
   * @return - Returns the red channel.
   */
  get r(): number {
    return this.__data[0]
  }

  /**
   * Setter for red channel.
   *
   * @param val - The val param.
   */
  set r(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for green channel.
   *
   * @return - Returns the green channel.
   */
  get g(): number {
    return this.__data[1]
  }

  /**
   * Setter for green channel.
   *
   * @param val - The val param.
   */
  set g(val: number) {
    this.__data[1] = val
  }

  /**
   * Getter for blue channel.
   *
   * @return - Returns the blue channel.
   */
  get b(): number {
    return this.__data[2]
  }

  /**
   * Setter for blue channel.
   *
   * @param val - The val param.
   */
  set b(val: number) {
    this.__data[2] = val
  }

  /**
   * Getter for alpha channel.
   *
   * @return - Returns the alpha channel.
   */
  get a(): number {
    return this.__data[3]
  }
  /**
   * Setter for alpha value.
   *
   * @param val - The val param.
   */
  set a(val: number) {
    this.__data[3] = val
  }

  /**
   * Setter from scalar components.
   *
   * @param r - The red channel.
   * @param g  - The green channel.
   * @param b  - The blue channel.
   * @param a  - The alpha channel.
   */
  set(r: number, g: number, b: number, a = 255): void {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  /**
   * Setter from another RGBA color.
   *
   * @param other - The other RGBA to set from.
   */
  setFromOther(other: RGBA): void {
    this.r = other.r
    this.g = other.g
    this.b = other.b
    this.a = other.a
  }

  /**
   * Setter from a scalar array.
   *
   * @param values - The array of values.
   */
  setFromArray(values: number[]): void {
    this.r = values[0]
    this.g = values[1]
    this.b = values[2]
    this.a = values.length == 4 ? values[3] : 1.0
  }

  /**
   * Setter from a hexadecimal value.
   * E.g. #ff0000
   *
   * @param hex - The hex value.
   */
  setFromHex(hex: string): void {
    function hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null
    }
    const rgb = hexToRgb(hex)
    if (!rgb) {
      console.warn('Invalid hex code:' + hex)
      return
    }
    this.set(rgb.r, rgb.g, rgb.b)
  }

  /**
   * Setter from a CSS color name.
   * E.g. "red"
   *
   * @param name - The CSS color name.
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
        yellowgreen: '#9acd32',
      }

      return colors[colour.toLowerCase()]
    }
    if (name.startsWith('#')) {
      this.setFromHex(name)
    } else {
      const hexColor = colourNameToHex(name)
      if (hexColor) this.setFromHex(hexColor)
    }
  }

  /**
   * Returns the hexadecimal value of this RGBA color.
   *
   * @return - Returns the hex value.
   */
  toHex(): string {
    function componentToHex(int: number) {
      const hex = int.toString(16)
      return hex.length == 1 ? '0' + hex : hex
    }
    return '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b)
  }

  /**
   * Returns true if this RGBA color is exactly the same as other.
   *
   * @param other - The other RGBA to compare with.
   * @return - Returns true or false.
   */
  equal(other: RGBA): boolean {
    return this.r == other.r && this.g == other.g && this.b == other.b && this.a == other.a
  }

  /**
   * Returns true if this RGBA color is NOT exactly the same as other.
   *
   * @param other -  The other RGBA to compare with.
   * @return - Returns true or false.
   */
  notEquals(other: RGBA): boolean {
    return this.r != other.r && this.g != other.g && this.b != other.b && this.a != other.a
  }

  /**
   * Returns true if this RGBA color is approximately the same as other.
   *
   * @param other - The other RGBA to compare with.
   * @param precision - The precision to which the values must match.
   * @return - Returns true or false.
   */
  approxEqual(other: RGBA, precision: number = Number.EPSILON): boolean {
    return (
      Math.abs(this.r - other.r) < precision &&
      Math.abs(this.g - other.g) < precision &&
      Math.abs(this.b - other.b) < precision &&
      Math.abs(this.a - other.a) < precision
    )
  }

  /**
   * Returns a new RGBA color which is this RGBA color added to other.
   *
   * @param other - The other RGBA to add.
   * @return - Returns a new RGBA.
   */
  add(other: RGBA): RGBA {
    return new RGBA(this.r + other.r, this.g + other.g, this.b + other.b, this.a + other.a)
  }

  /**
   * Returns a new RGBA color which is this RGBA color subtracted from other.
   *
   * @param other - The other RGBA to subtract.
   * @return - Returns a new RGBA.
   */
  subtract(other: RGBA): RGBA {
    return new RGBA(this.r - other.r, this.g - other.g, this.b - other.b, this.a - other.a)
  }

  /**
   * Returns a new RGBA color which is this vector scaled by scalar.
   *
   * @param scalar - The scalar value.
   * @return - Returns a new RGBA.
   */
  scale(scalar: number): RGBA {
    return new RGBA(this.r * scalar, this.g * scalar, this.b * scalar, this.a * scalar)
  }

  /**
   * Scales this RGBA color by scalar.
   *
   * @param scalar - The scalar value.
   */
  scaleInPlace(scalar: number): void {
    this.r *= scalar
    this.g *= scalar
    this.b *= scalar
    this.a *= scalar
  }

  /**
   * Apply gamma correction to this RGBA color.
   *
   * @param gamma - The gamma value.
   */
  applyGamma(gamma: number): void {
    this.set(Math.pow(this.r, gamma), Math.pow(this.g, gamma), Math.pow(this.b, gamma), this.a)
  }

  /**
   * Converts to linear color space and returns a new color.
   * @param gamma - The gamma value.
   * @return - Returns a new RGBA.
   */
  toLinear(gamma = 2.2): RGBA {
    return new RGBA(Math.pow(this.r, gamma), Math.pow(this.g, gamma), Math.pow(this.b, gamma), this.a)
  }

  /**
   * Converts to gamma color space and returns a new RGBA color.
   *
   * @param gamma - The gamma value.
   * @return - Returns a new RGBA.
   */
  toGamma(gamma = 2.2): RGBA {
    return new RGBA(Math.pow(this.r, 1.0 / gamma), Math.pow(this.g, 1.0 / gamma), Math.pow(this.b, 1.0 / gamma), this.a)
  }

  /**
   * Calculates and returns the relative luminance of the linear RGB component.
   *
   * @return - The return value.
   */
  luminance(): number {
    return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b
  }

  /**
   * Performs a linear interpolation between this RGBA color and other.
   *
   * @param other - The other RGBA to interpolate between.
   * @param t - Interpolation amount between the two inputs.
   * @return - Returns a new RGBA.
   */
  lerp(other: RGBA, t: number): RGBA {
    const ar = this.r
    const ag = this.g
    const ab = this.b
    const aa = this.a
    return new RGBA(ar + t * (other.r - ar), ag + t * (other.g - ag), ab + t * (other.b - ab), aa + t * (other.a - aa))
  }

  /**
   * Creates a random RGBA.
   *
   * @param gammaOffset - The gamma offset.
   * @param randomAlpha - Determines whether the alpha channel is random.
   * @return - Returns a new random RGBA.
   */
  static random(gammaOffset = 0.0, randomAlpha = false): RGBA {
    if (gammaOffset > 0.0) {
      return new RGBA(
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        randomAlpha ? gammaOffset + Math.random() * (1.0 - gammaOffset) : 1.0
      )
    } else if (gammaOffset < 0.0) {
      return new RGBA(
        Math.random() * (1.0 + gammaOffset),
        Math.random() * (1.0 + gammaOffset),
        Math.random() * (1.0 + gammaOffset),
        randomAlpha ? Math.random() * (1.0 + gammaOffset) : 1.0
      )
    } else {
      return new RGBA(Math.random(), Math.random(), Math.random(), randomAlpha ? Math.random() : 1.0)
    }
  }

  /**
   * Clones this RGBA color and returns a new RGBA color.
   *
   * @return - Returns a new RGBA.
   */
  clone(): RGBA {
    return new RGBA(this.__data[0], this.__data[1], this.__data[2], this.__data[3])
  }

  /**
   * Returns the type as an array. Often used to pass types to the GPU.
   *
   * @return - Returns as an array.
   */
  asArray(): Uint8Array {
    return this.__data
  }

  /**
   * Returns the type as a 3 component array. Often used to pass types to the GPU.
   *
   * @return - Returns as a 3 component array.
   */
  as3ComponentArray(): number[] {
    return [this.__data[0], this.__data[1], this.__data[2]]
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return - The json object.
   */
  toJSON(): Record<string, number> {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object.
   */
  fromJSON(j: Record<string, number>): void {
    this.r = j.r
    this.g = j.g
    this.b = j.b
    this.a = j.a
  }

  /**
   * Returns the CSS rgba string.
   *
   * @return - The return value.
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

export { RGBA }
