import {
    Vec2,
    Vec3
} from '../Math/Math.js';

class BinReader {
    constructor(data, byteOffset=0, littleEndian=true) {
        this.__data = data;
        this.__byteOffset = byteOffset;
        this.__dataView = new DataView(this.__data);
        this.__littleEndian = true;//littleEndian;
    }

    get isLittleEndian(){
        return this.__littleEndian;
    }

    get data(){
        return this.__data;
    }

    pos(){
        return this.__byteOffset;
    }

    seek(byteOffset){
        this.__byteOffset = byteOffset;
    }

    loadUInt32() {
        let result = this.__dataView.getUint32(this.__byteOffset, this.__littleEndian);
        this.__byteOffset += 4;
        return result;
    }

    loadFloat32() {
        let result = this.__dataView.getFloat32(this.__byteOffset, this.__littleEndian);
        this.__byteOffset += 4;
        return result;
    }

    loadUInt8Array(size=undefined, clone=false) {
        if(size==undefined)
            size = this.loadUInt32();
        let result = new Uint8Array(this.__data, this.__byteOffset, size);
        this.__byteOffset += size;
        let padd = size % 4;
        if (padd != 0)
            this.__byteOffset += 4 - padd;
        return result;
    }


    loadUInt16Array(size=undefined, clone=false) {
        if(size==undefined)
            size = this.loadUInt32();
        let result;
        if(!this.__littleEndian){
            result = new Uint16Array(size);
            for(let i=0;i<size; i++){
                result[i] = this.__dataView.getUint16(this.__byteOffset, this.__littleEndian);
                this.__byteOffset += 2;
            }
        }
        else{
            result = new Uint16Array(this.__data, this.__byteOffset, size);
        }
        this.__byteOffset += size * 2;
        let padd = (size * 2) % 4;
        if (padd != 0)
            this.__byteOffset += 4 - padd;
        return result;
    }

    loadUInt32Array(size=undefined, clone=false) {
        if(size==undefined)
            size = this.loadUInt32();
        let result;
        if(!this.__littleEndian){
            result = new Uint32Array(size);
            for(let i=0;i<size; i++){
                result[i] = this.__dataView.getUint32(this.__byteOffset, this.__littleEndian);
                this.__byteOffset += 4;
            }
        }
        else{
            result = new Uint32Array(this.__data, this.__byteOffset, size);
        }
        this.__byteOffset += size * 4;
        return result;
    }


    loadFloat32Array(size=undefined, clone=false) {
        if(size==undefined)
            size = this.loadUInt32();
        let result;
        if(!this.__littleEndian){
            result = new Uint16Array(size);
            for(let i=0;i<size; i++){
                result[i] = this.__dataView.getFloat32(this.__byteOffset, this.__littleEndian);
                this.__byteOffset += 4;
            }
        }
        else{
            result = new Float32Array(this.__data, this.__byteOffset, size);
        }
        this.__byteOffset += size * 4;
        return result;
    }

    loadStr(){
        let numChars = this.loadUInt32();
        console.log("BinReader.loadStr numChars:" + numChars);
        let chars = new Uint8Array(this.__data, this.__byteOffset, numChars); 
        console.log("chars:" + chars);
        this.__byteOffset+=numChars;
        let result = '';
        for (let i = 0; i<numChars; i++)
            result = result + String.fromCharCode(chars[i]);
        if(numChars % 4 != 0)
            this.__byteOffset+=4 - (numChars % 4);
        console.log("result:" + result);
        return result;
    }

    loadUInt32Vec2(){
        let array = new Uint32Array(this.__data, this.__byteOffset, 2); 
        this.__byteOffset+=8;
        return new Vec2(array);
    }

    loadFloat32Vec3(){
        let result = new Vec3(this.__data, this.__byteOffset); 
        this.__byteOffset+=12;
        return result;
    }

}

export {
    BinReader
};


