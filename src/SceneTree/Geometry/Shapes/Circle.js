import { Lines } from '../Lines.js';

class Circle extends Lines {
    constructor(radius = 1.0, numSegments=32) {
        super();

        if(isNaN(radius) || isNaN(numSegments))
            throw("Invalid geom args");

        this.__radius = radius;
        this.__numSegments = numSegments;
        this.__rebuild();
    }

    get radius() {
        return this.__radius
    }

    set radius(val) {
        this.__radius = val;
        this.__resize();
    }

    get numSegments() {
        return this.__numSegments
    }

    set numSegments(val) {
        this.__numSegments = val;
        this.__rebuild();
    }

    __rebuild() {
        this.setNumVertices(this.__numSegments+1);
        this.setNumSegments(this.__numSegments);
        for(let i=0; i<this.__numSegments; i++)
            this.setSegment(i, i, (i+1)%this.__numSegments);
        this.__resize();
    }

    __resize() {
        let angle = (Math.PI * 2.0) / this.__numSegments;
        for(let i=0; i<this.__numSegments; i++)
            this.getVertex(i).set(Math.sin(angle * i) * this.__radius, Math.cos(angle * i) * this.__radius, 0.0);
        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['radius'] = this.__radius;
        json['numSegments'] = this.__numSegments;
        return json
    }
};

export {
    Circle
};
//export default Circle;