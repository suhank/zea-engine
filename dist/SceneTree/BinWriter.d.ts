import { Vec2, Vec3, Quat, Color, Box2, Box3 } from '../Math/index';
/**
 * Writes `TypedArray` types in binary using a specific encoding.
 */
declare class BinWriter {
    protected __data: ArrayBuffer;
    protected __byteOffset: number;
    protected __reserved: number;
    protected __dataView: DataView;
    /**
     * Create a bin writer.
     * @param dataSize - The dataSize value.
     */
    constructor(dataSize?: number);
    /**
     * Returns the byte offset position.
     *
     * @return - The return value.
     */
    pos(): number;
    /**
     * Sets byte offset value.
     *
     * @param byteOffset - The byteOffset value.
     */
    seek(byteOffset: number): void;
    /**
     * The seekEnd method.
     */
    seekEnd(): void;
    /**
     * Returns written buffer data to current point.
     *
     * @return - Returns an array buffer.
     */
    getBuffer(): ArrayBufferLike;
    /**
     * The __grow method.
     * @private
     */
    __grow(): void;
    /**
     * The __reserve method.
     * @param offset - The offset value.
     * @private
     */
    __reserve(offset: number): void;
    /**
     * The __offset method.
     * @param byteCount - The byteCount value.
     * @private
     */
    __offset(byteCount: number): void;
    /**
     * Writes an unsigned Int8 value in current byte offset.
     *
     * @param value - The value param.
     */
    writeUInt8(value: number): void;
    /**
     * Writes an unsigned Int16 value in current byte offset.
     * @param value - The value param.
     */
    writeUInt16(value: number): void;
    /**
     * Writes an unsigned Int32 value in current byte offset.
     * @param value - The value param.
     */
    writeUInt32(value: number): void;
    /**
     * Writes a signed Int32 value in current byte offset.
     * @param value - The value param.
     */
    writeSInt32(value: number): void;
    /**
     * Writes a Float16 value in current byte offset.
     *
     * @param value - The value param.
     */
    writeFloat16(value: number): void;
    /**
     * Writes a Float32 value in current byte offset.
     *
     * @param value - The value param.
     */
    writeFloat32(value: number): void;
    /**
     * Writes an unsigned Int8 array value from current byte offset.
     *
     * @param value - The value param.
     * @param writeSize - The writeSize value.
     */
    writeUInt8Array(value: Uint8Array, writeSize?: boolean): void;
    /**
     * Writes an unsigned Int16 array value from current byte offset.
     *
     * @param value - The value param.
     * @param writeSize - The writeSize value.
     */
    writeUInt16Array(value: Uint16Array, writeSize?: boolean): void;
    /**
     * Writes an unsigned Int32 array value from current byte offset.
     *
     * @param value - The value param.
     * @param writeSize - The writeSize value.
     */
    writeUInt32Array(value: Uint32Array, writeSize?: boolean): void;
    /**
     * Writes a Float32 array value from current byte offset.
     *
     * @param value - The value param.
     * @param writeSize - The writeSize value.
     */
    writeFloat32Array(value: Float32Array, writeSize?: boolean): void;
    /**
     * Writes string value in current position, first writing an unsigned Int32 describing its length, then adding the string in Float32 values.
     *
     * @param str - The str value.
     * @param writeSize - The writeSize value.
     */
    writeStr(str: string, writeSize?: boolean): void;
    /**
     * Writes a `Vec2` in the buffer using signed Int32 values(In `x,y` order).
     * @param value - The Vec2 to write.
     */
    writeSInt32Vec2(value: Vec2): void;
    /**
     * Writes a `Vec2` in the buffer using unsigned Int32 values(In `x,y` order).
     *
     * @param value - The Vec2 to write.
     */
    writeUInt32Vec2(value: Vec2): void;
    /**
     * Writes a `Vec2` in the buffer using Float16 values(In `x,y` order).
     * @param value - The Vec2 to write.
     */
    writeFloat16Vec2(value: Vec2): void;
    /**
     * Writes a `Vec2` in the buffer using Float32 values(In `x,y` order).
     *
     * @param value - The Vec2 to write.
     */
    writeFloat32Vec2(value: Vec2): void;
    /**
     * Writes a `Vec3` in the buffer using Float16 values(In `x,y,z` order).
     *
     * @param value - The Vec3 to write.
     */
    writeFloat16Vec3(value: Vec3): void;
    /**
     * Writes a `Vec3` in the buffer using Float32 values(In `x,y,z` order).
     * @param value - The Vec3 to write.
     */
    writeFloat32Vec3(value: Vec3): void;
    /**
     * Writes a `Quat` in the buffer using Float16 values(In `x,y,z,w` order).
     *
     * @param value - The Quat to write.
     */
    writeFloat16Quat(value: Quat): void;
    /**
     * Writes a `Quat` in the buffer using Float32 values(In `x,y,z,w` order).
     *
     * @param value - The Quat to write.
     */
    writeFloat32Quat(value: Quat): void;
    /**
     * Writes a RGB `Color` in the buffer using Float32 values(In `r,g,b` order).
     *
     * @param value - The Color to write.
     */
    writeRGBFloat32Color(value: Color): void;
    /**
     * Writes a RGBA `Color` in the buffer using Float32 values(In `r,g,b,a` order).
     *
     * @param value - The Color to write.
     */
    writeRGBAFloat32Color(value: Color): void;
    /**
     * Writes a RGB `Color` in the buffer using unsigned Int8 values(In `r,g,b` order).
     *
     * @param value - The Color to write.
     */
    writeRGBUInt8Color(value: Color): void;
    /**
     * Writes a RGBA `Color` in the buffer using unsigned Int8 values(In `r,g,b,a` order).
     *
     * @param value - The Color to write.
     */
    writeRGBAUInt8Color(value: Color): void;
    /**
     * Writes a `Box2` in the buffer using Floar32 values(In `p0,p1` order).
     *
     * @param value - The Box2 to write.
     */
    writeBox2(value: Box2): void;
    /**
     * Writes a `Box3` in the buffer using Floar32 values(In `p0,p1` order).
     *
     * @param value - The Box3 to write.
     */
    writeBox3(value: Box3): void;
    /**
     * The writePadd method.
     * @param size - The size value.
     */
    writePadd(size: number): void;
    /**
     * The writeAlignment method.
     * @param numBytes - The numBytes value.
     */
    writeAlignment(numBytes: number): void;
}
export { BinWriter };
