import {
    Color
} from '../Math/Math.js';
import {
    GeomItem
} from './GeomItem.js';
import {
    sgFactory
} from './SGFactory.js';

class GizmoItem extends GeomItem {
    constructor(name, geom = undefined, color = undefined) {
        super(name, geom);
        this.__color = color;
    }

    getColor() {
        return this.__color;
    }

    setColor(val) {
        this.__color = val;
    }

};

sgFactory.registerClass('GizmoItem', GizmoItem);

export {
    GizmoItem
};