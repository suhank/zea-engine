import {
    JSON_stringify_fixedPrecision
} from './Common.js';
import {
    Vec3
} from './Vec3.js';
import {
    Mat4
} from './Mat4.js';

class Box3 {
    constructor(p0 = undefined, p1 = undefined) {
        if (p0 instanceof Vec3) {
            this.p0 = p0;
        } else {
            this.p0 = new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        }
        if (p1 instanceof Vec3) {
            this.p1 = p1;
        } else {
            this.p1 = new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
    }

    set(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;
    }

    reset(){
        this.p0.x = Number.POSITIVE_INFINITY; this.p1.x = Number.NEGATIVE_INFINITY;
        this.p0.y = Number.POSITIVE_INFINITY; this.p1.y = Number.NEGATIVE_INFINITY;
        this.p0.z = Number.POSITIVE_INFINITY; this.p1.z = Number.NEGATIVE_INFINITY;
    }

    isValid() {
        return  this.p0.x != Number.POSITIVE_INFINITY && this.p1.x != Number.NEGATIVE_INFINITY &&
                this.p0.y != Number.POSITIVE_INFINITY && this.p1.y != Number.NEGATIVE_INFINITY &&
                this.p0.z != Number.POSITIVE_INFINITY && this.p1.z != Number.NEGATIVE_INFINITY;
    }

    addPoint(point) {
        if (point.x != Number.POSITIVE_INFINITY && point.x != Number.NEGATIVE_INFINITY) {
            if (point.x < this.p0.x)
                this.p0.x = point.x;
            if (point.x > this.p1.x)
                this.p1.x = point.x;
        }
        if (point.y != Number.POSITIVE_INFINITY && point.y != Number.NEGATIVE_INFINITY) {
            if (point.y < this.p0.y)
                this.p0.y = point.y;
            if (point.y > this.p1.y)
                this.p1.y = point.y;
        }
        if (point.z != Number.POSITIVE_INFINITY && point.z != Number.NEGATIVE_INFINITY) {
            if (point.z < this.p0.z)
                this.p0.z = point.z;
            if (point.z > this.p1.z)
                this.p1.z = point.z;
        }
    }

    addBox3(box, mat4 = undefined) {
        if (mat4) {
            // transform each corner of the box3 into the new coord sys
            this.addPoint(mat4.transformVec3(box.p0));
            this.addPoint(mat4.transformVec3(new Vec3(box.p0.x,box.p0.y, box.p1.z)));
            this.addPoint(mat4.transformVec3(new Vec3(box.p0.x,box.p1.y, box.p0.z)));
            this.addPoint(mat4.transformVec3(new Vec3(box.p1.x,box.p0.y, box.p0.z)));
            this.addPoint(mat4.transformVec3(new Vec3(box.p0.x,box.p1.y, box.p1.z)));
            this.addPoint(mat4.transformVec3(new Vec3(box.p1.x,box.p0.y, box.p1.z)));
            this.addPoint(mat4.transformVec3(new Vec3(box.p1.x,box.p1.y, box.p0.z)));
            this.addPoint(mat4.transformVec3(box.p1));
        } else {
            this.addPoint(box.p0);
            this.addPoint(box.p1);
        }
    }

    size() {
        return this.p1.subtract(this.p0);
    }

    center() {
        let result = this.p1.subtract(this.p0);
        result.scaleInPlace(0.5);
        result.addInPlace(this.p0);
        return result;
    }

    toMat4() {
        let sc_x = this.p1.x - this.p0.x;
        let sc_y = this.p1.y - this.p0.y;
        let sc_z = this.p1.z - this.p0.z;
        return new Mat4(
            sc_x, 0, 0, 0,
            0, sc_y, 0, 0,
            0, 0, sc_z, 0,
            this.p0.x, this.p0.y, this.p0.z, 1.0);
    }


    clone() {
        return new Box3(
            this.p0.clone(),
            this.p1.clone()
        );
    }

    //////////////////////////////////////////
    // Persistence

    toJSON() {
        return {
            "p0": this.p0.toJSON(),
            "p1": this.p1.toJSON()
        }
    }

    loadBin(data, byteOffset) {
        this.p0.loadBin(data, byteOffset);
        this.p0.loadBin(data, byteOffset + 12);
    }

    toString() {
        return JSON_stringify_fixedPrecision(this.toJSON())
    }
};

export {
    Box3
};