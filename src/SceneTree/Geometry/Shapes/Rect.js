import { Lines } from '../Lines.js';

class Rect extends Lines {
    constructor(x = 1.0, y = 1.0) {
        super();

        this.__x = x;
        this.__y = y;
        this.__rebuild();
    }

    get x() {
        return this.__x
    }

    set x(val) {
        this.__x = val;
        this.__resize();
    }

    get y() {
        return this.__y
    }

    set y(val) {
        this.__y = val;
        this.__resize();
    }

    setSize(x, y) {
        this.__x = x;
        this.__y = y;
        this.__resize();
    }

    __rebuild() {
        this.setNumVertices(4);
        this.setNumSegments(4);
        this.setSegment(0, 0, 1);
        this.setSegment(1, 1, 2);
        this.setSegment(2, 2, 3);
        this.setSegment(3, 3, 0);
        this.__resize();
    }

    __resize() {
        this.getVertex(0).set(-0.5 * this.__x, -0.5 * this.__y, 0.0);
        this.getVertex(1).set(0.5 * this.__x, -0.5 * this.__y, 0.0);
        this.getVertex(2).set(0.5 * this.__x,  0.5 * this.__y, 0.0);
        this.getVertex(3).set(-0.5 * this.__x,  0.5 * this.__y, 0.0);
        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['x'] = this.__x;
        json['y'] = this.__y;
        return json
    }
};

export {
    Rect
};
//export default Rect;