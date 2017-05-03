import BaseGeom from './BaseGeom.js';

class Lines extends BaseGeom {
    constructor(name) {
        super(name);
        this.__indices = new Uint32Array();
        this.__segmentAttributes = new Map();
        this.lineThickness = 0.0;
    }

    getIndices() {
        return this.__indices;
    }

    getNumSegments() {
        return this.__indices.length / 2;
    }

    setNumSegments(count) {
        let indices = new Uint32Array(count * 2);
        for (let i=0;i<this.__indices.length; i++) {
            indices[i] = this.__indices[i];
        }
        this.__indices = indices;
    }

    setSegment(index, p0, p1) {
        if (index >= (this.__indices.length / 2))
            throw ("Invalid line index:" + index + ". Num Segments:" + (this.__indices.length / 2));
        this.__indices[(index * 2) + 0] = p0;
        this.__indices[(index * 2) + 1] = p1;
    }

    getSegmentVertexIndex(line, linevertex) {
        let numLines = this.numLines;
        if (line < numLines)
            return this.__indices[(line * 2) + linevertex];
    }

    addSegmentAttribute(name, dataType, count = undefined) {
        let attr = new Attribute(dataType, (count != undefined) ? count : this.polygonCount);
        this.__segmentAttributes.set(name, attr);
        return attr;
    }

    hasSegmentAttribute(name) {
        return this.__segmentAttributes.has(name);
    }

    getSegmentAttribute(name) {
        return this.__segmentAttributes.get(name)
    }

    toJSON() {
        let json = super.toJSON();
        json['indices'] = this.__indices.length;
        return json;
    };
};

export default Lines;