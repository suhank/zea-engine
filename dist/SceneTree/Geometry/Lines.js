/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseGeom } from './BaseGeom';
import { Registry } from '../../Registry';
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
class Lines extends BaseGeom {
    /**
     * Create lines.
     */
    constructor() {
        super();
        this.__indices = new Uint32Array();
    }
    /**
     * The clear method.
     */
    clear() {
        this.setNumSegments(0);
        this.setNumVertices(0);
        this.emit('geomDataTopologyChanged');
    }
    /**
     * Returns the specified indices(Vertex connectors)
     *
     * @return - The indices index array.
     */
    getIndices() {
        return this.__indices;
    }
    /**
     * Returns the number of line segments.
     *
     * @return - Returns the number of segments.
     */
    getNumSegments() {
        return this.__indices.length / 2;
    }
    /**
     * Sets the number of line segments in the lines geometry.
     * **Important:** It resets indices values.
     *
     * @param numOfSegments - The count value.
     */
    setNumSegments(numOfSegments) {
        if (numOfSegments > this.getNumSegments()) {
            const indices = new Uint32Array(numOfSegments * 2);
            indices.set(this.__indices);
            this.__indices = indices;
        }
        else {
            this.__indices = this.__indices.slice(0, numOfSegments * 2);
        }
    }
    /**
     * Sets segment values in the specified index.
     *
     * @param index - The index value.
     * @param p0 - The p0 value.
     * @param p1 - The p1 value.
     */
    setSegmentVertexIndices(index, p0, p1) {
        if (index >= this.__indices.length / 2)
            throw new Error('Invalid line index:' + index + '. Num Segments:' + this.__indices.length / 2);
        this.__indices[index * 2 + 0] = p0;
        this.__indices[index * 2 + 1] = p1;
    }
    /**
     * The getSegmentVertexIndex method.
     *
     * @param line - The line value.
     * @param lineVertex - The lineVertex value.
     * @return - The return value.
     * @private
     */
    getSegmentVertexIndex(line, lineVertex) {
        const numSegments = this.getNumSegments();
        if (line < numSegments)
            return this.__indices[line * 2 + lineVertex];
        return -1;
    }
    // ////////////////////////////////////////
    // Memory
    /**
     * Returns vertex attributes buffers and its count.
     *
     * @return - The return value.
     */
    genBuffers(opts) {
        const buffers = super.genBuffers();
        let indices;
        if (buffers.numVertices < Math.pow(2, 8)) {
            indices = new Uint8Array(this.__indices);
        }
        else if (buffers.numVertices < Math.pow(2, 16)) {
            indices = new Uint16Array(this.__indices);
        }
        else {
            indices = this.__indices;
        }
        ;
        buffers.indices = indices;
        return buffers;
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * Sets state of current geometry(Including line segments) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        super.loadBaseGeomBinary(reader);
        this.setNumSegments(reader.loadUInt32());
        const bytes = reader.loadUInt8();
        if (bytes == 1)
            this.__indices = reader.loadUInt8Array();
        else if (bytes == 2)
            this.__indices = reader.loadUInt16Array();
        else if (bytes == 4)
            this.__indices = reader.loadUInt32Array();
        this.emit('geomDataChanged');
    }
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        const j = super.toJSON(context);
        if (!context || !context.skipTopology)
            j.indices = Array.from(this.__indices);
        return j;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        super.fromJSON(j, context);
        if (j.indices)
            this.__indices = Uint32Array.from(j.indices);
    }
}
Registry.register('Lines', Lines);
export { Lines };
//# sourceMappingURL=Lines.js.map