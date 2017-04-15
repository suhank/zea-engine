import {
    Signal
} from '../Math';
import {
    TreeItem
} from './TreeItem.js';
import {
    Image2D
} from './Image2D.js';

class BillboardItem extends TreeItem {
    constructor(name, image2d) {
        super(name);

        this.image2d = undefined;
    }

};

export {
    BillboardItem
};