import Vec2 from '../Math/Vec2';
import Vec3 from '../Math/Vec3';
import Quat from '../Math/Quat';
import Color from '../Math/Color';

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

    loadSInt32() {
        let result = this.__dataView.getInt32(this.__byteOffset, true);
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
        if(size == 0)
            return new Uint16Array();
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
        if(size == 0)
            return new Uint32Array();
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
        if(size == 0)
            return new Float32Array();
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
        let x = this.loadSInt32();
        let y = this.loadSInt32();
        return new Vec2(x, y);
    }

    loadUInt32Vec2() {
        let x = this.loadUInt32();
        let y = this.loadUInt32();
        return new Vec2(x, y);
    }

    loadFloat32Vec2() {
        let x = this.loadFloat32();
        let y = this.loadFloat32();
        return new Vec2(x, y);
    }

    loadFloat32Vec3() {
        let result;
        let x = this.loadFloat32();
        let y = this.loadFloat32();
        let z = this.loadFloat32();
        return new Vec3(x, y, z);
    }

    loadFloat32Quat() {
        let x = this.loadFloat32();
        let y = this.loadFloat32();
        let z = this.loadFloat32();
        let w = this.loadFloat32();
        return new Quat(x, y, z, w);
    }

    loadRGBFloat32Color() {
        let r = this.loadFloat32();
        let g = this.loadFloat32();
        let b = this.loadFloat32();
        return new Color(r, g, b);
    }

    loadRGBAFloat32Color() {
        let r = this.loadFloat32();
        let g = this.loadFloat32();
        let b = this.loadFloat32();
        let a = this.loadFloat32();
        return new Color(r, g, b, a);
    }

    loadRGBUInt8Color() {
        let result;
        let r = this.loadUInt8();
        let g = this.loadUInt8();
        let b = this.loadUInt8();
        return new Color(r/255, g/255, b/255);
    }

    loadRGBAUInt8Color() {
        let result;
        let r = this.loadUInt8();
        let g = this.loadUInt8();
        let b = this.loadUInt8();
        let a = this.loadUInt8();
        return new Color(r/255, g/255, b/255, a/255);
    }

    readPadd(stride){
        let padd = this.__byteOffset % stride;
        if (padd != 0)
            this.__byteOffset += stride - padd;
    }

};

export {
    BinReader
};
//export default BinReader;