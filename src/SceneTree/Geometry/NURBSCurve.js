import { BaseGeom } from './BaseGeom.js';
import {
	UInt32,
    Float32,
    Vec2,
    Vec3,
    Xfo
} from '../../Math';

class NURBSCurve extends BaseGeom {
    constructor() {
        super();

        this.addVertexAttribute('weights', Float32, 1.0);
        this.addVertexAttribute('multiplicities', UInt32, 1);    }
};

export {
    NURBSCurve
};
//export default NURBSCurve;
