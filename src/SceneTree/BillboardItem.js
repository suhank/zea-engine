import {
    Color
} from '../Math';
import {
    Parameter,
    ColorParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';

class BillboardItem extends TreeItem {
    constructor(name, image) {
        super(name);
        this.addParameter(new Parameter('image', image, 'BaseImage'));
        this.addParameter('scale', 0.01);
        this.addParameter('alpha', 1.0);
        this.addParameter('color', new Color(1.0, 1.0, 1.0));
        this.addParameter('alignedToCamera', false);
    }
};

export {
    BillboardItem
};