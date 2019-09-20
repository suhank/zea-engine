import { Vec4 } from '../Math';
import { Signal } from '../Utilities';
import { BaseItem } from './BaseItem.js';

import {
  Parameter,
  BooleanParameter,
  NumberParameter,
  ParameterSet,
} from './Parameters';

/** Class representing a base image.
 * @extends BaseItem
 */
class BaseImage extends BaseItem {
  /**
   * Create a base image.
   * @param {any} name - The name value.
   * @param {any} params - The params value.
   */
  constructor(name, params = {}) {
    super(name);
    this.width = 0;
    this.height = 0;
    this.format = 'RGB';
    this.type = 'UNSIGNED_BYTE';

    this.addParameter(new BooleanParameter('AlphaFromLuminance', false));
    this.addParameter(new BooleanParameter('Invert', false));
    this.addParameter(new BooleanParameter('FlipY', false));

    this.updated = this.parameterValueChanged;

    // Note: many parts of the code assume a 'loaded' signal.
    // We should probably deprecate and use only 'updated'.
    // Instead we should start using a loaded Promise.
    this.loaded = new Signal(true);
  }

  /**
   * The isLoaded method.
   * @return {boolean} - The return value.
   */
  isLoaded() {
    return true;
  }

  /**
   * The getMapping method.
   * @return {any} - The return value.
   */
  getMapping() {
    return this.__mapping;
  }

  /**
   * The setMapping method
   * @param {any} mapping - The mapping param.
   */
  setMapping(mapping) {
    this.__mapping = mapping;
  }

  /**
   * The isStream method.
   * @return {boolean} - The return value.
   */
  isStream() {
    return false;
  }

  /**
   * The isStreamAtlas method.
   * @return {any} - The return value.
   */
  isStreamAtlas() {
    return this.__streamAtlas;
  }

  /**
   * The getParams method.
   * @return {any} - The return value.
   */
  getParams() {
    return {
      type: this.type,
      format: this.format,
      width: this.width,
      height: this.height,
      flipY: this.getParameter('FlipY').getValue(),
      invert: this.getParameter('Invert').getValue(),
      alphaFromLuminance: this.getParameter('AlphaFromLuminance').getValue(),
    };
  }
}

export { BaseImage };
