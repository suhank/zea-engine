import {
    Vec2,
    Vec3
} from '../../../Math';
import {
    Lines
} from '../Lines.js';


class Grid extends Lines {
    constructor(name, x = 1.0, z = 1.0, xDivisions = 10, zDivisions = 10) {
        super(name);

        this.__x = x;
        this.__z = z;
        this.__xDivisions = xDivisions;
        this.__zDivisions = zDivisions;
        this.__rebuild();
    }

    get sizeX() {
        return this.__x;
    }

    set sizeX(val) {
        this.__x = val;
        this.__resize();
    }

    get sizeZ() {
        return this.__z;
    }

    set sizeZ(val) {
        this.__z = val;
        this.__resize();
    }

    get divisionsX() {
        return this.__xDivisions;
    }

    set divisionsX(val) {
        this.__xDivisions = val;
        this.__rebuild();
    }

    get divisionsZ() {
        return this.__zDivisions;
    }

    set divisionsZ(val) {
        this.__zDivisions = val;
        this.__rebuild();
    }

    setSize(x, z) {
        this.__x = x;
        this.__z = z;
        this.__resize();
    }

    __rebuild() {
        this.setNumVertices((this.__xDivisions + this.__zDivisions + 2) * 2);
        this.setNumSegments(this.__xDivisions + this.__zDivisions + 2);
        let idx = 0;
        for (let i = 0; i <= this.__xDivisions; i++) {
            let v0 = (idx*2);
            let v1 = ((idx*2) + 1);
            this.setSegment(idx, v0, v1);
            idx++;
        }
        for (let i=0; i <= this.__zDivisions; i++) {
            let v0 = (idx*2);
            let v1 = ((idx*2) + 1);
            this.setSegment(idx, v0, v1);
            idx++;
        }
        this.__resize();
    }

    __resize() {
        let idx = 0;
        for (let i = 0; i <= this.__xDivisions; i++) {
            let v0 = (idx*2);
            let v1 = ((idx*2) + 1);
            let x = ((i / (this.__xDivisions) - 0.5)) * this.__x;
            this.getVertex(v0).set(x, 0.0, -0.5 * this.__z);
            this.getVertex(v1).set(x, 0.0,  0.5 * this.__z);
            idx++;
        }
        for (let i = 0; i <= this.__zDivisions; i++) {
            let v0 = (idx*2);
            let v1 = ((idx*2) + 1);
            let z = ((i / (this.__zDivisions) - 0.5)) * this.__z;
            this.getVertex(v0).set(-0.5 * this.__x, 0.0, z);
            this.getVertex(v1).set( 0.5 * this.__x, 0.0, z);
            idx++;
        }

        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['x'] = this.__x;
        json['z'] = this.__z;
        json['xDivisions'] = this.__xDivisions;
        json['zDivisions'] = this.__zDivisions;
        return json
    }
};

export {
    Grid
};