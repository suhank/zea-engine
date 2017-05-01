import {
	Color,
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

        this.image2d = image2d;
        this.scale = 0.01;
        this.color = Color.random(0.2);
    }

};

export {
    BillboardItem
};