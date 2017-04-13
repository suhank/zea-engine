import {
    Vec2,
    Vec3,
    Quat,
    Color
} from '../Math';

class BinReader {
    constructor(data, byteOffset = 0, isMobileDevice = true) {
        this.__data = data;
        this.__byteOffset = byteOffset;
        this.__dataView = new DataView(this.__data);
        this.__isMobileDevice = isMobileDevice;
    }

    seek(pos){
        this.__byteOffset = pos;
    }

    get isMobileDevice() {
        return this.__isMobileDevice;
    }

    get data() {
        return this.__data;
    }

    pos() {
        return this.__byteOffset;
    }

    seek(byteOffset) {
        this.__byteOffset = byteOffset;
    }

    loadUInt8() {
        let result = this.__dataView.getUint8(this.__byteOffset);
        this.__byteOffset += 1;
        return result;
    }

    loadUInt16() {
        let result = this.__dataView.getUint16(this.__byteOffset);
        this.__byteOffset += 2;
        return result;
    }

    loadUInt32() {
        let result = this.__dataView.getUint32(this.__byteOffset, true);
        this.__byteOffset += 4;
        return result;
    }

    loadFloat32() {
        let result = this.__dataView.getFloat32(this.__byteOffset, true);
        this.__byteOffset += 4;
        return result;
    }

    loadUInt8Array(size = undefined, clone = false) {
        if (size == undefined)
            size = this.loadUInt32();
        let result = new Uint8Array(this.__data, this.__byteOffset, size);
        this.__byteOffset += size;
        let padd = this.__byteOffset % 4;
        //this.readPadd();
        return result;
    }

    loadUInt16Array(size = undefined, clone = false) {
        if (size == undefined)
            size = this.loadUInt32();
        this.readPadd(2);
        let result;
        if (this.__isMobileDevice) {
            result = new Uint16Array(size);
            for (let i = 0; i < size; i++) {
                result[i] = this.__dataView.getUint16(this.__byteOffset, true);
                this.__byteOffset += 2;
            }
        } else {
            result = new Uint16Array(this.__data, this.__byteOffset, size);
            this.__byteOffset += size * 2;
        }
        //this.readPadd();
        return result;
    }

    loadUInt32Array(size = undefined, clone = false) {
        if (size == undefined)
            size = this.loadUInt32();
        this.readPadd(4);
        let result;
        if (this.__isMobileDevice) {
            result = new Uint32Array(size);
            for (let i = 0; i < size; i++) {
                result[i] = this.__dataView.getUint32(this.__byteOffset, true);
                this.__byteOffset += 4;
            }
        } else {
            result = new Uint32Array(this.__data, this.__byteOffset, size);
            this.__byteOffset += size * 4;
        }
        return result;
    }


    loadFloat32Array(size = undefined, clone = false) {
        if (size == undefined)
            size = this.loadUInt32();
        this.readPadd(4);
        let result;
        if (this.__isMobileDevice) {
            result = new Float32Array(size);
            for (let i = 0; i < size; i++) {
                result[i] = this.__dataView.getFloat32(this.__byteOffset, true);
                this.__byteOffset += 4;
            }
        } else {
            result = new Float32Array(this.__data, this.__byteOffset, size);
            this.__byteOffset += size * 4;
        }
        return result;
    }

    loadStr() {
        let numChars = this.loadUInt32();
        let chars = new Uint8Array(this.__data, this.__byteOffset, numChars);
        this.__byteOffset += numChars;
        let result = '';
        for (let i = 0; i < numChars; i++)
            result = result + String.fromCharCode(chars[i]);
        return result;
    }

    loadSInt32Vec2() {
        let x = this.__dataView.getInt32(this.__byteOffset, true);
        this.__byteOffset += 4;
        let y = this.__dataView.getInt32(this.__byteOffset, true);
        this.__byteOffset += 4;
        return new Vec2(x, y);
        // let array = new Int32Array(this.__data, this.__byteOffset, 2);
        // this.__byteOffset += 8;
        // return new Vec2(array);
    }

    loadUInt32Vec2() {
        let x = this.__dataView.getUint32(this.__byteOffset, true);
        this.__byteOffset += 4;
        let y = this.__dataView.getUint32(this.__byteOffset, true);
        this.__byteOffset += 4;
        return new Vec2(x, y);
        // let array = new Uint32Array(this.__data, this.__byteOffset, 2);
        // this.__byteOffset += 8;
        // return new Vec2(array);
    }

    loadFloat32Vec2() {
        let result;
        //if (this.__isMobileDevice) {
            let x = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let y = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            result = new Vec2(x, y);
        // } else {
        //     result = new Vec2(this.__data, this.__byteOffset);
        //     this.__byteOffset += 8;
        // }
        return result;
    }

    loadFloat32Vec3() {
        let result;
        //if (this.__isMobileDevice) {
            let x = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let y = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let z = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            result = new Vec3(x, y, z);
        // } else {
        //     result = new Vec3(this.__data, this.__byteOffset);
        //     this.__byteOffset += 12;
        // }
        return result;
    }

    loadFloat32Quat() {
        let result;
        // if (this.__isMobileDevice) {
            let x = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let y = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let z = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let w = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            result = new Quat(x, y, z, w);
        // } else {
        //     result = new Quat(this.__data, this.__byteOffset);
        //     this.__byteOffset += 12;
        // }
        return result;
    }

    loadFloat32Color() {
        let result;
        // if (this.__isMobileDevice) {
            let r = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let g = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let b = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            let a = this.__dataView.getFloat32(this.__byteOffset, true);
            this.__byteOffset += 4;
            result = new Color(r, g, b, a);
        // } else {
        //     result = new Quat(this.__data, this.__byteOffset);
        //     this.__byteOffset += 12;
        // }
        return result;
    }

    readPadd(stride){
        let padd = this.__byteOffset % stride;
        if (padd != 0)
            this.__byteOffset += stride - padd;
    }

}

export {
    BinReader
};