import { BaseClass } from '../../Utilities/BaseClass';
import { Mesh } from './Mesh';
import { BinReader } from '../../SceneTree/BinReader';
declare class Attribute extends BaseClass {
    dataTypeName: string;
    stride: number;
    protected normalized: boolean;
    protected data: Float32Array;
    protected mesh: Mesh;
    protected splitValues: Array<Float32Array>;
    protected splits: Record<number, Record<number, number>>;
    constructor(dataTypeName: string, stride: number);
    /**
     * Sets the Mesh reference to the VertexAttribute. This is needed for attributes
     * assigned to meshes, and is used to calculate face vertex indices.
     * > Note: the mesh automatically calls this method when a vertex attribute is assigned.
     *
     * @param mesh - The mesh object
     */
    setMesh(mesh: Mesh): void;
    /**
     * Returns the backing array for this attribute
     *
     * @return - The return value.
     */
    asArray(): Float32Array;
    /**
     * Returns the name of the math type this attribute stores.
     *
     * @return - The return value.
     */
    getDataTypeName(): string;
    /**
     * Returns the count of attribute values in the data.
     *
     * @return - The return value.
     */
    getCount(): number;
    /**
     * Sets the count of attribute values in the data.
     *
     * @param size - The size value.
     */
    setCount(count: number): void;
    /**
     * Fills up data values with default ones starting from the specified index.
     *
     * @param start - The start value.
     */
    private initRange;
    /**
     * Returns the number of elements stored in each `T`.
     *
     * @return - The return value.
     */
    get numElements(): number;
    /**
     * Returns data value of the specified index.
     *
     * @param index - The index value.
     * @return - The return value.
     */
    getFloat32Value(index: number): number;
    /**
     * Sets data value in the specified index.
     *
     * @param index - The index value.
     * @param value - The value param.
     */
    setFloat32Value(index: number, value: number): void;
    /**
     * The getSplits method.
     * @return - The return value.
     */
    getSplits(): Record<number, Record<number, number>>;
    /**
     * Gets the value of a corner vertex of a face.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @return - The return value.
     */
    getFaceVertexValueRef_array(face: number, faceVertex: number): Float32Array;
    /**
     * Sets the value of a corner vertex of a face.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @param value - The value value.
     */
    setFaceVertexValue_array(face: number, faceVertex: number, value: Float32Array): void;
    /**
     * The setFaceVertexValue_ByVertexIndex method.
     * @param face - The face index.
     * @param vertex - The vertex value.
     * @param value - The value value.
     */
    setFaceVertexValue_ByVertexIndex(face: number, vertex: number, value: Float32Array): void;
    /**
     * The setSplitVertexValue method.
     * @param vertex - The vertex value.
     * @param face - The face index.
     * @param value - The value value.
     */
    setSplitVertexValue_array(vertex: number, face: number, value: Float32Array): void;
    /**
     * The setSplitVertexValues method.
     * @param vertex - The vertex value.
     * @param faceGroup - The faceGroup value.
     * @param value - The value value.
     */
    setSplitVertexValues(vertex: number, faceGroup: number[], value: Float32Array): void;
    /**
     * The generateSplitValues method.
     * @param splitIndices - The splitIndices value.
     * @param splitCount - The splitCount value.
     * @return - The return value.
     */
    generateSplitValues(splitIndices: Record<number, Record<number, number>>, splitCount: number): Float32Array;
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
     */
    fromJSON(j: Record<string, any>): void;
    /**
     * The loadSplitValues method.
     * @param reader - The reader value.
     */
    loadSplitValues(reader: BinReader): void;
    /**
     * Returns the string representation of the object's state.
     *
     * @return - The return value.
     */
    toString(): string;
    /**
     * Returns vertex attributes buffers and its count.
     *
     * @return - The return value.
     */
    genBuffer(): Record<string, any>;
}
export { Attribute };
