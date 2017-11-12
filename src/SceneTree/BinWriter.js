import {
    Vec2,
    Vec3,
    Quat,
    Color,
    Box2,
    Box3
} from '../Math';

class BinWriter {
    constructor(dataSize) {
        this.__data = new ArrayBuffer(dataSize);
        this.__byteOffset = 0;
        this.__dataSize = dataSize;
        this.__reserved = dataSize;
        this.__dataView = new DataView(this.__data);
    }
    pos() {
        return this.__byteOffset;
    }

    seek(byteOffset) {
        this.__byteOffset = byteOffset;
    }

    seekEnd() {
        this.__byteOffset = byteOffset;
    }

    getBuffer() {
        return this.__data;
    }

    __reserve(offset) {
        if (this.__byteOffset + offset > this.__reserved) {
            const newSize = this.__dataSize * 2;
            const data = new ArrayBuffer(newSize);
            const unit8Array = new Uint8Array(data);
            const old_unit8Array = new Uint8Array(this.__data);
            unit8Array.set(old_unit8Array);
            this.__data = data;
            this.__dataView = new DataView(this.__data);
            this.__reserved = newSize;
        }
    }

    __offset(byteCount) {
        this.__byteOffset += byteCount;
        if(this.__byteOffset > this.__dataSize)
            this.__dataSize = this.__byteOffset;
    }

    writeUInt8(value) {
        this.__reserve(1);
        this.__dataView.setUint8(this.__byteOffset, value);
        this.__offset(1);
    }

    writeUInt16(value) {
        this.__reserve(2);
        this.__dataView.setUint16(this.__byteOffset, value, true);
        this.__offset(2);
    }

    writeUInt32(value) {
        this.__reserve(4);
        this.__dataView.setUint32(this.__byteOffset, value, true);
        this.__offset(4);
    }

    writeSInt32(value) {
        this.__reserve(4);
        this.__dataView.setInt32(this.__byteOffset, value, true);
        this.__offset(4);
    }

    writeFloat32(value) {
        this.__reserve(4);
        this.__dataView.setFloat32(this.__byteOffset, value, true);
        this.__offset(4);
    }

    writeUInt8Array(value, writeSize = true) {
        const count = value.size ? value.size : value.length;
        this.__reserve(count + (writeSize ? 4 : 0));
        if (writeSize)
            this.writeUInt32(count);
        for (let i = 0; i < count; i++) {
            this.writeUInt8(value[i]);
        }
    }


    writeUInt16Array(value, writeSize = true) {
        const count = value.size ? value.size : value.length;
        this.__reserve(count * 2 + (writeSize ? 4 : 0));
        if (writeSize)
            this.writeUInt32(count);
        for (let i = 0; i < count; i++) {
            this.writeUInt16(value[i]);
        }
    }

    writeUInt32Array(value, writeSize = true) {
        const count = value.size ? value.size : value.length;
        this.__reserve(count * 4 + (writeSize ? 4 : 0));
        if (writeSize)
            this.writeUInt32(count);
        for (let i = 0; i < count; i++) {
            this.writeUInt32(value[i]);
        }
    }

    writeFloat32Array(value, writeSize = true) {
        const count = value.size ? value.size : value.length;
        this.__reserve(count * 4 + (writeSize ? 4 : 0));
        if (writeSize)
            this.writeUInt32(count);
        for (let i = 0; i < count; i++) {
            this.writeFloat32(value[i]);
        }
    }

    writeStr(str, writeSize = true) {
        const count = value.length;
        this.__reserve(count * 4 + (writeSize ? 4 : 0));
        if (writeSize)
            this.writeUInt32(count);
        for (let i = 0; i < count; i++) {
            this.writeFloat32(value.charCodeAt(i));
        }
    }

    writeSInt32Vec2(value) {
        this.writeSInt32(value.x);
        this.writeSInt32(value.y);
    }

    writeUInt32Vec2(value) {
        this.writeUInt32(value.x);
        this.writeUInt32(value.y);
    }

    writeFloat32Vec2(value) {
        this.writeFloat32(value.x);
        this.writeFloat32(value.y);
    }

    writeFloat32Vec3(value) {
        this.writeFloat32(value.x);
        this.writeFloat32(value.y);
        this.writeFloat32(value.z);
    }

    writeFloat32Quat(value) {
        this.writeFloat32(value.x);
        this.writeFloat32(value.y);
        this.writeFloat32(value.z);
        this.writeFloat32(value.w);
    }

    writeRGBFloat32Color(value) {
        this.writeFloat32(value.r);
        this.writeFloat32(value.g);
        this.writeFloat32(value.b);
    }

    writeRGBAFloat32Color(value) {
        this.writeFloat32(value.r);
        this.writeFloat32(value.g);
        this.writeFloat32(value.b);
        this.writeFloat32(value.a);
    }

    writeRGBUInt8Color(value) {
        this.writeUInt8(value.r);
        this.writeUInt8(value.g);
        this.writeUInt8(value.b);
    }

    writeRGBAUInt8Color(value) {
        this.writeUInt8(value.r);
        this.writeUInt8(value.g);
        this.writeUInt8(value.b);
        this.writeUInt8(value.a);
    }

    writeBox2(value) {
        this.writeFloat32Vec2(value.p0);
        this.writeFloat32Vec2(value.p1);
    }

    writeBox3(value) {
        this.writeFloat32Vec3(value.p0);
        this.writeFloat32Vec3(value.p1);
    }

    writePadd(size) {
        this.__reserve(size - this.__byteOffset);
    }

};

export {
    BinWriter
};