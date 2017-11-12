import { AttrValue } from './AttrValue.js';
import { typeRegistry } from './TypeRegistry.js';

class EulerAngles extends AttrValue {
    constructor(x = 0, y = 0, z = 0, order = 0) {
        super();

        this.order = order;
        if (x instanceof ArrayBuffer) {
            let buffer = x;
            let byteOffset = y;
            this.__data = new Float32Array(buffer, byteOffset, 4);
        } else {
            this.__data = new Float32Array(3);
            this.__data[0] = x;
            this.__data[1] = y;
            this.__data[2] = z;
        }
    }

    get x() {
        return this.__data[0];
    }

    set x(val) {
        this.__data[0] = val;
    }

    get y() {
        return this.__data[1];
    }

    set y(val) {
        this.__data[1] = val;
    }

    get z() {
        return this.__data[2];
    }

    set z(val) {
        this.__data[2] = val;
    }

};

typeRegistry.registerType('EulerAngles', EulerAngles);

export {
    EulerAngles
};