import { Vec2, Vec3, Quat, Color, Box2, Box3 } from '../Math/index';
/**
 * Reads binary data in a specific encoding. Used in loading binary data such as zcad files.
 */
declare class BinReader {
    protected __data: ArrayBuffer;
    protected __byteOffset: number;
    protected __dataView: DataView;
    protected __isMobileDevice: boolean;
    protected utf8decoder: TextDecoder;
    /**
     * Create a bin reader.
     *
     * @param data - The data buffer.
     * @param byteOffset - The byte offset value to start reading the buffer.
     * @param isMobileDevice - The isMobileDevice value.
     */
    constructor(data: ArrayBuffer, byteOffset?: number, isMobileDevice?: boolean);
    /**
     * Returns state of whether or not the `BinReader` object was instantiated from a mobile device.
     *
     * @return - Returns true is a mobile device is detected.
     */
    get isMobileDevice(): boolean;
    /**
     * Returns the data buffer we're reading from.
     *
     * @return - The data buffer we are reading from,
     */
    get data(): ArrayBuffer;
    /**
     * Returns the length of the buffer.
     *
     * @return - The total length of the buffer
     */
    get byteLength(): number;
    /**
     * Returns remaining length of the buffer to read.
     *
     * @return - The remaining length of the buffer to read.
     */
    get remainingByteLength(): number;
    /**
     * Returns current byte offset in the buffer.
     * @return - The current offset in the binary buffer
     */
    pos(): number;
    /**
     * Sets the byte offset value.
     * @param byteOffset - The byteOffset param.
     */
    seek(byteOffset: number): void;
    /**
     * Adds offset bytes to current offset value.
     *
     * @param byteOffset - The byte Offset amount.
     */
    advance(byteOffset: number): void;
    /**
     * Returns the unsigned Uint8 value at current byte offset position,
     * and adds one byte to the offset.
     *
     * @return - The return value.
     */
    loadUInt8(): number;
    /**
     * Returns the unsigned Uint16 value at current byte offset position,
     * and adds two bytes to the offset.
     *
     * @return - The return value.
     */
    loadUInt16(): number;
    /**
     * Returns the unsigned Uint32 value at current byte offset position,
     * and adds four bytes to the offset.
     *
     * @return - The return value.
     */
    loadUInt32(): number;
    /**
     * Returns the signed Int32 value at current byte offset position,
     * and adds four bytes to the offset.
     *
     * @return - The return value.
     */
    loadSInt32(): number;
    /**
     * Returns the Float16 value at current byte offset position,
     * and adds four bytes to the offset.
     *
     * @return - The return value.
     */
    loadFloat16(): number;
    /**
     * Returns the Float16 value at current byte offset position,
     * and adds two bytes to the offset.
     *
     * @return - The return value.
     */
    loadUFloat16(): number;
    /**
     * Returns a single signed Float16 value at current byte offset position from 2 unsigned Int8 values,
     * and adds two bytes to the offset.
     *
     * @return - The return value.
     */
    loadFloat16From2xUInt8(): void;
    /**
     * Loads and returns a single Signed integer value from 2 Unsigned Float16 values.
     * @return - The return value.
     */
    loadUInt32From2xUFloat16(): number;
    /**
     * Loads and returns a single Signed integer value from 2 signed Float16 values.
     * @return - The return value.
     */
    loadSInt32From2xFloat16(): number;
    /**
     * Returns the Float32 value at current byte offset position,
     * and adds four bytes to the offset.
     *
     * @return - The return value.
     */
    loadFloat32(): number;
    /**
     * Reads buffer and return an unsigned Int8 array with the specified size,
     * starting from current byte offset.
     * Byte offset is increased by the specified byte size.
     *
     * @param size - The size param.
     * @param clone - The clone param.
     * @return - The return value.
     */
    loadUInt8Array(size?: number, clone?: boolean): Uint8Array;
    /**
     * Reads buffer and return an unsigned Int16 array with the specified size,
     * starting from current byte offset.
     * Byte offset is increased by the specified byte size x 2.
     *
     * @param size - The size param.
     * @param clone - The clone param.
     * @return - The return value.
     */
    loadUInt16Array(size?: number, clone?: boolean): Uint16Array;
    /**
     * Reads buffer and return an unsigned Int32 array with the specified size,
     * starting from current byte offset.
     * Byte offset is increased by the specified byte size x 4.
     *
     * @param size - The size param.
     * @param clone - The clone param.
     * @return - The return value.
     */
    loadUInt32Array(size?: number, clone?: boolean): Uint32Array;
    /**
     * Reads buffer and return a Float32 array with the specified size,
     * starting from current byte offset.
     * Byte offset is increased by the specified byte size x 4.
     *
     * @param size - The size param.
     * @param clone - The clone param.
     * @return - The return value.
     */
    loadFloat32Array(size?: number, clone?: boolean): Float32Array;
    /**
     * Returns next string.
     * First looks for the string length description in the next four bytes in the buffer(Starting from byte offset).
     *
     * @return - The return value.
     */
    loadStr(): string;
    /**
     * Returns an array of strings.
     * First reading the size of the array then reading each string.
     *
     * @return - The return value.
     */
    loadStrArray(): string[];
    /**
     * Creates and returns a `Vec2` object with the next two signed Int32 values in the buffer.
     *
     * @return - Returns a Vec2.
     */
    loadSInt32Vec2(): Vec2;
    /**
     * Creates and returns a `Vec2` object with the next two unsigned Int32 values in the buffer.
     * @return - Returns a Vec2.
     */
    loadUInt32Vec2(): Vec2;
    /**
     * Creates and returns a `Vec2` object with the next two Float16 values in the buffer.
     *
     * @return - Returns a Vec2.
     */
    loadFloat16Vec2(): Vec2;
    /**
     * Creates and returns a `Vec2` object with the next two Float32 values in the buffer.
     * @return - Returns a Vec2.
     */
    loadFloat32Vec2(): Vec2;
    /**
     * Creates and returns a `Vec3` object with the next three Float16 values in the buffer.
     *
     * @return - Returns a Vec3.
     */
    loadFloat16Vec3(): Vec3;
    /**
     * Creates and returns a `Vec3` object with the next three Float32 values in the buffer.
     *
     * @return - Returns a Vec3.
     */
    loadFloat32Vec3(): Vec3;
    /**
     * Creates and returns a `Quat` object with the next four Float16 values in the buffer.
     *
     * @return - Returns a Quat.
     */
    loadFloat16Quat(): Quat;
    /**
     * Creates and returns a `Quat` object with the next four Float32 values in the buffer.
     * @return - Returns a Quat.
     */
    loadFloat32Quat(): Quat;
    /**
     * Creates and returns a `Color` object with the next three Float32 values in the buffer.
     *
     * @return - Returns a Color.
     */
    loadRGBFloat32Color(): Color;
    /**
     * Creates and returns a RGBA `Color` object with the next four Float32 values in the buffer.
     * @return - Returns a Color.
     */
    loadRGBAFloat32Color(): Color;
    /**
     * Creates and returns a `Color` object with the next three unsigned Int8 values in the buffer.
     * @return - Returns a Color.
     */
    loadRGBUInt8Color(): Color;
    /**
     * Creates and returns a RGBA `Color` object with the next four unsigned Int8 values in the buffer.
     * @return - Returns a Color.
     */
    loadRGBAUInt8Color(): Color;
    /**
     * Creates and returns a `Box2` object with the next four Float32 values in the buffer.
     * Next four because it creates two Vec2.
     *
     * @return - Returns a Box2.
     */
    loadBox2(): Box2;
    /**
     * Creates and returns a `Box2` object with the next six Float32 values in the buffer.
     * Next four because it creates two Vec3.
     *
     * @return - Returns a Box3.
     */
    loadBox3(): Box3;
    /**
     * Given a stridee value, advance the pointer to the end of the current stride.
     * @param stride - The stride param.
     */
    readPad(stride: number): void;
}
export { BinReader };
