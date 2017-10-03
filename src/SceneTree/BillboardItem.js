import { Color } from '../Math';
import { TreeItem } from './TreeItem.js';

class BillboardItem extends TreeItem {
    constructor(name, image2d) {
        super(name);
        this.image2d = image2d;
        this.scale = 0.01;// Mapping of image pixels to scene units..
        this.alpha = 1.0;
        this.gradient = 0.0;
        this.color = new Color(1.0, 1.0, 1.0);
        this.alignedToCamera = false;
    }
};

export {
    BillboardItem
};