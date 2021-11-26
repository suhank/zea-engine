import { Vec3 } from '../../Math/Vec3';
import { BaseGeom } from './BaseGeom';
import { Attribute } from './Attribute';
import { Vec3Attribute } from './Vec3Attribute';
import { BinReader } from '../BinReader';
/**
 * The Mesh class provides a flexible and fast polygon mesh representation. It supports polygons of arbitrary complexity,
 * from basic triangles and quads to pentagons more.
 * It supports storing per face attributes, and per edge attributes.
 * The Mesh class handles converting its internal representation of polygons into a simpler triangles representation for rendering.
 *
 * ```
 * const mesh = new Mesh()
 * ```
 *
 * **Events**
 * * **geomDataTopologyChanged:** Triggered when the topology of the mesh has been changed.
 * * **geomDataChanged:** Triggered when the vertices of the mesh have changed, but not necessarily the topology.
 *
 * @extends BaseGeom
 */
declare class Mesh extends BaseGeom {
    protected faceCounts: Array<number>;
    protected __faceVertexIndices: Uint32Array;
    protected __logTopologyWarnings: boolean;
    protected __edgeAttributes: Map<string, Attribute>;
    protected __faceAttributes: Map<string, Attribute>;
    protected numEdges: number;
    edgeVerts: Array<number>;
    protected edgeAngles: Float32Array;
    protected edgeVecs: Array<Vec3>;
    protected edgeFaces: Array<number>;
    protected faceEdges: Array<Array<number>>;
    protected vertexEdges: Array<Set<number>>;
    /**
     * Creates an instance of Mesh.
     */
    constructor();
    /**
     * The init method.
     * @private
     */
    init(): void;
    /**
     * The clear method.
     */
    clear(): void;
    /**
     * Adds a new vertex attribute to the geometry.
     *
     * @param name - The name of the vertex attribute.
     * @param attr - The attribute to add to the geometry
     */
    addVertexAttribute(name: string, attr: Attribute): void;
    /**
     * The getFaceCounts method.
     * @return - The return value.
     */
    getFaceCounts(): Array<number>;
    /**
     * The getNumFaces method.
     * @return - The return value.
     */
    getNumFaces(): number;
    /**
     * Sets the number of faces on the mesh using an array specifying the counts per polygon size.
     * The first item in the array specifies the number of triangles, the second, the number of quads, the 3rd, the number of 5 sided polygons etc..
     * e.g. to specify 2 triangles, and 7 quads, we would pass [2, 7]
     * @param faceCounts - The faceCounts value.
     */
    setFaceCounts(faceCounts: Array<number>): void;
    /**
     * Returns the number of vertices indexed by this face
     * @param faceIndex - The faceIndex value.
     * @return - The return value.
     */
    getFaceVertexCount(faceIndex: number): number;
    /**
     * Returns the offset of the face indices within the entire index array.
     * @param faceIndex - The faceIndex value.
     * @return - The return value.
     */
    getFaceVertexOffset(faceIndex: number): number;
    /**
     * The setFaceVertexIndices method.
     * @param faceIndex - The faceIndex value.
     * @param vertexIndices - The array of vertex indices for this face value.
     */
    setFaceVertexIndices(faceIndex: number, vertexIndices: Array<number>): void;
    /**
     * Adds a new face to the mesh
     * @param vertexIndices - The vertex indices of the face.
     * @return - The index of the face in the mesh.
     */
    addFace(vertexIndices: number[]): number;
    /**
     * Returns the vertex indices of the specified face.
     * @param faceIndex - The index of the specified face
     * @return - An array of indices into the vertex attributes
     */
    getFaceVertexIndices(faceIndex: number): number[];
    /**
     * Returns a single vertex index for a given face and faceVertex.
     * @param faceIndex - The faceIndex value.
     * @param faceVertex - The face vertex is the index within the face. So the first vertex index is 0.
     * @return - The vertex index
     */
    getFaceVertexIndex(faceIndex: number, faceVertex: number): number;
    /**
     * The addFaceAttribute method.
     * @param name - The name of the face attribute to add.
     * @param attr - The attr value
     */
    addFaceAttribute(name: string, attr: Attribute): Attribute;
    /**
     * The hasFaceAttribute method.
     * @param name - The name of the face attribute.
     * @return - The return value.
     */
    hasFaceAttribute(name: string): boolean;
    /**
     * The getFaceAttribute method.
     * @param name - The name of the face attribute.
     * @return - The return value.
     */
    getFaceAttribute(name: string): Attribute;
    /**
     * The addEdgeAttribute method.
     * @param name - The name of the edge attribute to add.
     * @param attr - The attr value
     */
    addEdgeAttribute(name: string, attr: Attribute): void;
    /**
     * The hasEdgeAttribute method.
     * @param name - The name of the edge attribute.
     * @return - The return value.
     */
    hasEdgeAttribute(name: string): boolean;
    /**
     * The getEdgeAttribute method.
     * @param name - The name of the edge attribute.
     * @return - The return value.
     */
    getEdgeAttribute(name: string): Attribute | undefined;
    /**
     * The genTopologyInfo method.
     */
    genTopologyInfo(): void;
    /**
     * Computes a normal value per face by averaging the triangle normals of the face.
     */
    computeFaceNormals(): void;
    /**
     * Calculates the angles at each edge between the adjoining faces
     */
    calculateEdgeAngles(): void;
    /**
     * Compute vertex normals.
     * @param hardAngle - The hardAngle value in radians.
     * @return - The return value.
     */
    computeVertexNormals(hardAngle?: number): Vec3Attribute;
    /**
     * The computeHardEdgesIndices method.
     * @param hardAngle - The hardAngle value in radians.
     * @return - The return value.
     */
    computeHardEdgesIndices(hardAngle?: number): Uint32Array;
    /**
     * The genBuffers method.
     * @param opts - The opts value.
     * @return - The return value.
     */
    genBuffers(opts?: Record<string, any>): Record<string, any>;
    /**
     * Compute the number of triangles. For higher degree polygons, they are divided into multiple triangles for rendering.
     * @return - Returns the number of triangles.
     */
    computeNumTriangles(): number;
    /**
     * To prepare data for rendering, the indices for the polygons is used to compute a new index buffer based on
     * only triangles. This is used during rendering and the resulting indices uploaded ot the GPU  by GLMesh class.
     *
     * @param totalNumVertices - The total number of vertices.
     * @param numUnSplitVertices - The total number of un-split vertices.
     * @param splitIndices - The splitIndices value.
     * @return - Returns a typed array containing the triangulated indices.
     */
    generateTriangulatedIndices(totalNumVertices: number, numUnSplitVertices: number, splitIndices: Record<number, Record<number, number>>): Uint8Array | Uint16Array | Uint32Array;
    /**
     * Restores mesh properties from a binary reader.
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
    toJSON(context?: Record<string, any>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * e.g. to load data into the mesh class, provide a json structure similar to the following.
     * Note: faceCounts is an array of count values, starting with the number of triangles, then the number of quads. See #setFaceCounts
     * The faceVertexIndices array should also be sorted to contain all the triangles first, followed by the quads, and then the pentagons etc..
     * ```json
     * // This code will define a mesh made up of 2 triangles and then a quad.
     * const mesh = new Mesh()
     * mesh.fromJSON({
     *   faceCounts:[2, 1],
     *   faceVertexIndices: [0, 1, 2, 0, 2, 3, 3, 2, 4, 5],
     *   numVertices: 6,
     *   vertexAttributes: {
     *     positions: {
     *       dataType: 'Vec3'
     *       defaultScalarValue: 0.0,
     *       data: [0,0,0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 2, 1, 0, 2, 0, 0]
     *     }
     *   }
     * }
     * ```
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
}
export { Mesh };
