import {
    Color
} from '../Math';
import {
    Parameter,
    BooleanParameter,
    NumberParameter,
    ColorParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';

class BillboardItem extends TreeItem {
    constructor(name, image) {
        super(name);
        this.addParameter(new Parameter('image', image, 'BaseImage'));
        this.addParameter(new NumberParameter('scale', 0.01));
        this.addParameter(new NumberParameter('alpha', 1.0));
        this.addParameter(new ColorParameter('color', new Color(1.0, 1.0, 1.0)));
        this.addParameter(new BooleanParameter('alignedToCamera', false));
    }
};

export {
    BillboardItem
};