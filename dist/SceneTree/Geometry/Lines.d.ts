import { BaseGeom } from './BaseGeom';
import { BinReader } from '../../SceneTree/BinReader';
/**
 *
 * Class representing lines primitive drawing type, connecting vertices using the specified indices.
 * i.e. We have 4 points(vertices) but we don't know how they connect to each other,
 * and that's why we need indices(Numbers indicating which vertex connects to which).
 * In this case if we say that `indices` is `[0,1,2,3]`, it would connect the first vertex to the second,
 * and the third to the fourth.
 *
 * ```
 * const lines = new Lines()
 * ```
 *
 * **Events**
 * * **geomDataChanged:** Triggered when the data value of the geometry is set(This includes reading binary)
 *
 * @extends BaseGeom
 */
declare class Lines extends BaseGeom {
    protected __indices: Float32Array | Int32Array | Int16Array | Int8Array | Uint8Array | Uint16Array | Uint32Array;
    /**
     * Create lines.
     */
    constructor();
    /**
     * The clear method.
     */
    clear(): void;
    /**
     * Returns the specified indices(Vertex connectors)
     *
     * @return - The indices index array.
     */
    getIndices(): Float32Array | Int32Array | Int16Array | Int8Array | Uint8Array | Uint16Array | Uint32Array;
    /**
     * Returns the number of line segments.
     *
     * @return - Returns the number of segments.
     */
    getNumSegments(): number;
    /**
     * Sets the number of line segments in the lines geometry.
     * **Important:** It resets indices values.
     *
     * @param numOfSegments - The count value.
     */
    setNumSegments(numOfSegments: number): void;
    /**
     * Sets segment values in the specified index.
     *
     * @param index - The index value.
     * @param p0 - The p0 value.
     * @param p1 - The p1 value.
     */
    setSegmentVertexIndices(index: number, p0: number, p1: number): void;
    /**
     * The getSegmentVertexIndex method.
     *
     * @param line - The line value.
     * @param lineVertex - The lineVertex value.
     * @return - The return value.
     * @private
     */
    getSegmentVertexIndex(line: number, lineVertex: number): number;
    /**
     * Returns vertex attributes buffers and its count.
     *
     * @return - The return value.
     */
    genBuffers(opts?: Record<string, any>): Record<string, any>;
    /**
     * Sets state of current geometry(Including line segments) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, any>): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
}
export { Lines };
