import { AttrValue } from './AttrValue.js';
import { typeRegistry } from './TypeRegistry.js';

/** Class representing a color.
 * @extends AttrValue
 */
class Color extends AttrValue {
  /**
   * Create a color.
   * @param {number} r - The r value.
   * @param {number} g - The g value.
   * @param {number} b - The b value.
   * @param {number} a - The a value.
   */
  constructor(r = 0, g = 0, b = 0, a = 1.0) {
    super();

    if (r instanceof Float32Array) {
      this.__data = r;
    } else if (r instanceof ArrayBuffer) {
      const buffer = r;
      const byteOffset = g;
      this.__data = new Float32Array(buffer, byteOffset, 4);
    } else {
      this.__data = new Float32Array(4);
      if (typeof r == 'string') {
        if (r.startsWith('#')) {
          this.setFromHex(r);
        } else {
          this.setFromCSSColorName(r);
        }
      } else {
        this.__data[0] = r;
        this.__data[1] = g;
        this.__data[2] = b;
        this.__data[3] = a;
      }
    }
  }

  /**
   * Getter for r.
   */
  get r() {
    return this.__data[0];
  }

  /**
   * Setter for r.
   * @param {number} val - The val param.
   */
  set r(val) {
    this.__data[0] = val;
  }

  /**
   * Getter for g.
   */
  get g() {
    return this.__data[1];
  }

  /**
   * Setter for g.
   * @param {number} val - The val param.
   */
  set g(val) {
    this.__data[1] = val;
  }

  /**
   * Getter for b.
   */
  get b() {
    return this.__data[2];
  }

  /**
   * Setter for b.
   * @param {number} val - The val param.
   */
  set b(val) {
    this.__data[2] = val;
  }

  /**
   * Getter for a.
   */
  get a() {
    return this.__data[3];
  }
  /**
   * Setter for a.
   * @param {number} val - The val param.
   */
  set a(val) {
    this.__data[3] = val;
  }

  /**
   * Setter from scalar components.
   * @param {number} r - The r param.
   * @param {number} g  - The g param.
   * @param {number} b  - The b param.
   * @param {number} a  - The a param.
   */
  set(r, g, b, a = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * The setFromOther method.
   * @param {any} other - The other param.
   */
  setFromOther(other) {
    this.r = other.r;
    this.g = other.g;
    this.b = other.b;
    this.a = other.a;
  }

  /**
   * The setFromScalarArray method.
   * @param {any} vals - The vals param.
   */
  setFromScalarArray(vals) {
    this.r = vals[0];
    this.g = vals[1];
    this.b = vals[2];
    this.a = vals.length == 4 ? vals[3] : 1.0;
  }

  /**
   * The getAsRGBArray method.
   * @return {any} - The return value.
   */
  getAsRGBArray() {
    return [this.r * 255, this.g * 255, this.b * 255];
  }

  /**
   * The getAsRGBDict method.
   * @return {any} - The return value.
   */
  getAsRGBDict() {
    return {
      r: this.r * 255,
      g: this.g * 255,
      b: this.b * 255,
    };
  }

  /**
   * The setFromRGB method.
   * @param {number} r - The r param.
   * @param {number} g  - The g param.
   * @param {number} b  - The b param.
   * @param {number} a  - The a param.
   */
  setFromRGB(r, g, b, a) {
    this.r = r / 255;
    this.g = g / 255;
    this.b = b / 255;
    this.a = a ? a / 255 : 1.0;
  }

  /**
   * The setFromRGBArray method.
   * @param {any} vals - The vals param.
   */
  setFromRGBArray(vals) {
    this.r = vals[0] / 255;
    this.g = vals[1] / 255;
    this.b = vals[2] / 255;
    this.a = vals.length == 4 ? vals[3] / 255 : 1.0;
  }

  /**
   * The setFromRGBDict method.
   * @param {any} vals - The vals param.
   */
  setFromRGBDict(vals) {
    this.r = vals.r / 255;
    this.g = vals.g / 255;
    this.b = vals.b / 255;
    this.a = vals.a == 4 ? vals.a / 255 : 1.0;
  }

  /**
   * The setFromHex method.
   * @param {any} hex - The hex param.
   */
  setFromHex(hex) {
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }
    const rgb = hexToRgb(hex);
    if (!rgb) {
      console.warn('Invalid hex code:' + hex);
      return;
    }
    this.setFromRGB(rgb.r, rgb.g, rgb.b);
  }

  /**
   * The setFromCSSColorName method.
   * @param {any} name - The name param.
   */
  setFromCSSColorName(name) {
    const colourNameToHex = colour => {
      const colors = {
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
      };

      if (typeof colors[colour.toLowerCase()] != 'undefined')
        return colors[colour.toLowerCase()];

      return false;
    };
    if (name.startsWith('#')) {
      this.setFromHex(name);
    } else {
      this.setFromHex(colourNameToHex(name));
    }
  }

  /**
   * The toHex method.
   * @return {any} - The return value.
   */
  toHex() {
    function componentToHex(c) {
      const int = Math.round(c * 255);
      const hex = int.toString(16);
      return hex.length == 1 ? '0' + hex : hex;
    }
    return (
      '#' +
      componentToHex(this.r) +
      componentToHex(this.g) +
      componentToHex(this.b)
    );
  }

  /**
   * Returns true if this vector is the same as another one.
   * @param {any} other - The other param.
   * @param {any} precision - The precision param.
   * @return {any} - The return value.
   */
  equal(other, precision) {
    return (
      this.r == other.r &&
      this.g == other.g &&
      this.b == other.b &&
      this.a == other.a
    );
  }

  /**
   * Returns true if this vector is not the same as another one.
   * @param {any} other - The other param.
   * @param {any} precision - The precision param.
   * @return {any} - The return value.
   */
  notequals(other, precision) {
    return (
      this.r != other.r &&
      this.g != other.g &&
      this.b != other.b &&
      this.a != other.a
    );
  }

  /**
   * Returns true if this vector is the same as another one
   * (given a precision).
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  approxEqual(other) {
    return (
      Math.abs(this.r - other.r) < Number.EPSILON &&
      Math.abs(this.g - other.g) < Number.EPSILON &&
      Math.abs(this.b - other.b) < Number.EPSILON &&
      Math.abs(this.a - other.a) < Number.EPSILON
    );
  }

  /**
   * Returns a new vector which is this vector added to other.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  add(other) {
    return new Color(
      this.r + other.r,
      this.g + other.g,
      this.b + other.b,
      this.a + other.a
    );
  }

  /**
   * Returns a new vector which is this vector subtracted from other.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  subtract(other) {
    return new Color(
      this.r - other.r,
      this.g - other.g,
      this.b - other.b,
      this.a - other.a
    );
  }

  /**
   * Returns a new vector which is this vector scaled by scalar.
   * @param {any} scalar - The scalar param.
   * @return {vec4} - The return value.
   */
  scale(scalar) {
    return new Vec4(
      this.r * scalar,
      this.g * scalar,
      this.b * scalar,
      this.a * scalar
    );
  }

  /**
   * The scaleInPlace method.
   * @param {any} scalar - The scalar param.
   */
  scaleInPlace(scalar) {
    this.r *= scalar;
    this.g *= scalar;
    this.b *= scalar;
    this.a *= scalar;
  }

  /**
   * The applyGamma method.
   * @param {any} gamma - The gamma param.
   */
  applyGamma(gamma) {
    this.set(
      Math.pow(this.r, gamma),
      Math.pow(this.g, gamma),
      Math.pow(this.b, gamma),
      this.a
    );
  }

  /**
   * The toLinear method.
   * @param {any} gamma - The gamma param.
   * @return {any} - The return value.
   */
  toLinear(gamma = 2.2) {
    return new Color(
      Math.pow(this.r, gamma),
      Math.pow(this.g, gamma),
      Math.pow(this.b, gamma),
      this.a
    );
  }

  /**
   * The toGamma method.
   * @param {any} gamma - The gamma param.
   * @return {color} - The return value.
   */
  toGamma(gamma = 2.2) {
    return new Color(
      Math.pow(this.r, 1.0 / gamma),
      Math.pow(this.g, 1.0 / gamma),
      Math.pow(this.b, 1.0 / gamma),
      this.a
    );
  }

  /**
   * The luminance method.
   * @return {number} - The return value.
   */
  luminance() {
    return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
  }

  /**
   * The lerp method.
   * @param {any} b - The b param.
   * @param {any} t - The t param.
   * @return {color} - The return value.
   */
  lerp(b, t) {
    const ar = this.r,
      ag = this.g,
      ab = this.b,
      aa = this.a;
    return new Color(
      ar + t * (b.r - ar),
      ag + t * (b.g - ag),
      ab + t * (b.b - ab),
      aa + t * (b.a - aa)
    );
  }

  /**
   * The random method.
   * @param {number} gammaOffset - The gammaOffset param.
   * @param {boolean} randomAlpha -The randomAlpha param.
   * @return {color} - The return value.
   */
  static random(gammaOffset = 0.0, randomAlpha = false) {
    if (gammaOffset > 0.0) {
      return new Color(
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        gammaOffset + Math.random() * (1.0 - gammaOffset),
        randomAlpha ? gammaOffset + Math.random() * (1.0 - gammaOffset) : 1.0
      );
    } else if (gammaOffset < 0.0) {
      return new Color(
        Math.random() * (1.0 + gammaOffset),
        Math.random() * (1.0 + gammaOffset),
        Math.random() * (1.0 + gammaOffset),
        randomAlpha ? Math.random() * (1.0 + gammaOffset) : 1.0
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

  /**
   * The clone method.
   * @return {color} - The return value.
   */
  clone() {
    return new Color(
      this.__data[0],
      this.__data[1],
      this.__data[2],
      this.__data[3]
    );
  }

  /**
   * The asArray method.
   * @return {any} - The return value.
   */
  asArray() {
    return this.__data;
  }

  /**
   * The asArray method.
   * @return {any} - The return value.
   */
  as3ComponentArray() {
    return [this.__data[0], this.__data[1], this.__data[2]];
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {color} - The return value.
   */
  static create(...args) {
    return new Color(...args);
  }

  /**
   * The createFromFloat32Buffer method.
   * @param {any} buffer - The buffer param.
   * @param {number} offset - The offset param.
   * @return {color} - The return value.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Color(buffer, offset * 4); // 4 bytes per 32bit float
  }

  /**
   * The numFloat32Elements method.
   * @return {number} - The return value.
   */
  static numFloat32Elements() {
    return 4;
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @return {any} - The return value.
   */
  toJSON() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   */
  fromJSON(j) {
    this.r = j.r;
    this.g = j.g;
    this.b = j.b;
    this.a = j.a;
  }

  /**
   * The toCSSString method.
   * @return {any} - The return value.
   */
  toCSSString() {
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
    );
  }
}

typeRegistry.registerType('Color', Color);

export { Color };
// export default Color;
