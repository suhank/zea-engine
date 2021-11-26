import { Box3, Color } from '../../Math/index';
import { ParameterOwner } from '../ParameterOwner';
import { Attribute } from './Attribute';
import { Vec3Attribute } from './Vec3Attribute';
import { BinReader } from '../../SceneTree/BinReader';
/**
 * Represents a base class for 3D geometry items.
 *
 * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 * * **geomDataChanged:** Emitted when the geometry attributes have changed. The topology did not change. The Renderer will upload the new attributes to the GPU.
 * * **geomDataTopologyChanged:** Emitted when the geometry attributes and topology have changed.  The Renderer will upload the new attributes and topology to the GPU.
 *
 * @extends ParameterOwner
 */
declare class BaseGeom extends ParameterOwner {
    protected __boundingBox: Box3;
    protected __boundingBoxDirty: boolean;
    protected __metaData: Map<string, any>;
    protected __name: string;
    protected __numVertices: number;
    protected __vertexAttributes: Map<string, Attribute>;
    debugColor: Color;
    name: string;
    /**
     * Create a base geom.
     */
    constructor();
    /**
     * The clear method.
     */
    clear(): void;
    /**
     * Establishes a name for the geometry.
     *
     * @param name - The debug name value.
     */
    setDebugName(name: string): void;
    /**
     * Adds a new vertex attribute to the geometry.
     *
     * @param name - The name of the vertex attribute.
     * @param dataType - The dataType value. // TODO: is any ok vs. AttrValue | number. Unsure about how dataType is used
     * @return - Returns an attribute.
     */
    addVertexAttribute(name: string, attr: Attribute): void;
    /**
     * Checks if the the geometry has an attribute with the specified name.
     *
     * @param name - The name of the vertex attribute.
     * @return - The return value.
     */
    hasVertexAttribute(name: string): boolean;
    /**
     * Returns vertex attribute with the specified name.
     *
     * @param name - The name of the vertex attribute.
     * @return - The return value.
     */
    getVertexAttribute(name: string): Attribute | undefined;
    /**
     * Returns all vertex attributes in an object with their names.
     *
     * @return - The return value.
     */
    getVertexAttributes(): Record<string, Attribute>;
    /**
     * Returns 'positions' vertex attribute.
     */
    get positions(): Vec3Attribute;
    /**
     * Returns the number of vertex attributes.
     *
     * @return - The return value.
     */
    numVertices(): number;
    /**
     * Returns the number of vertex attributes.
     *
     * @return - The return value.
     */
    getNumVertices(): number;
    /**
     * Sets the number of vertices the geometry has.
     *
     * @param count - The count value.
     */
    setNumVertices(count: number): void;
    /**
     * Returns the bounding box for geometry.
     * @return - The return value.
     */
    getBoundingBox(): Box3;
    /**
     * The setBoundingBoxDirty method.
     */
    setBoundingBoxDirty(): void;
    /**
     * The updateBoundingBox method.
     */
    updateBoundingBox(): void;
    /**
     * Returns metadata value of the specified name.
     *
     * @param key - The key value.
     * @return - The return value.
     */
    getMetadata(key: string): any;
    /**
     * Verifies if geometry's metadata contains a value with the specified key.
     *
     * @param key - The key value.
     * @return - The return value.
     */
    hasMetadata(key: string): boolean;
    /**
     * Sets metadata value to the geometry.
     *
     * @param key - The key value.
     * @param metaData - The metaData value.
     */
    setMetadata(key: string, metaData: Record<string, any>): void;
    /**
     * Removes metadata value from the geometry with the specified key.
     *
     * @param key - The key value.
     */
    deleteMetadata(key: string): void;
    /**
     * Returns vertex attributes buffers and its count.
     * @return - The return value.
     */
    genBuffers(opts?: Record<string, any>): Record<string, any>;
    /**
     * Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.
     *
     * @param reader - The reader value.
     */
    loadBaseGeomBinary(reader: BinReader): void;
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
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json: Record<string, any>, context?: Record<string, any>): void;
    /**
     * Returns geometry data value in json format.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { BaseGeom };
