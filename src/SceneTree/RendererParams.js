

import {
  Color
} from '../Math';
import {
  BaseItem
} from './BaseItem.js';
import {
  ColorParameter,
  ImageParameter
} from './Parameters';

class RendererParams extends BaseItem {
  constructor(name) {
    super(name);
    this.addParameter(new ColorParameter('BackgroundColor', new Color('#808080')));
    this.addParameter(new ImageParameter('EnvMap'));
  }
};

export {
  RendererParams
};