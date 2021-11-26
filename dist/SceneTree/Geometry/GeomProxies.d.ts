import { Box3 } from '../../Math/index';
import { EventEmitter } from '../../Utilities/EventEmitter';
/** ProxyGeometries are pupulated from data unpacked using a webworker while loading zcad files.
 * These geometries represent readonly geometries with very basic topologies.
 * @extends EventEmitter
 * @private
 */
declare class BaseProxy extends EventEmitter {
    protected name: string;
    __buffers: any;
    protected boundingBox: Box3;
    protected __metaData: any;
    /**
     * Create a base proxy.
     * @param data - The data value.
     */
    constructor(data: any);
    /**
     * Returns the number of vertex attributes.
     *
     * @return - The return value.
     */
    getNumVertices(): any;
    /**
     * Returns the bounding box for geometry.
     * @return - The return value.
     */
    getBoundingBox(): Box3;
    /**
     * The genBuffers method.
     * @return - The return value.
     */
    genBuffers(): any;
    /**
     * The getMetadata method.
     * @param key - The key value.
     * @return - The return value.
     */
    getMetadata(key: string): any;
    /**
     * The hasMetadata method.
     * @param key - The key value.
     * @return - The return value.
     */
    hasMetadata(key: string): any;
    /**
     * The setMetadata method.
     * @param key - The key value.
     * @param metaData - The metaData value.
     */
    setMetadata(key: string, metaData: any): void;
    /**
     * Removes metadata for a given key.
     *
     * @param key - The key value.
     */
    deleteMetadata(key: string): void;
}
/** Class representing a points proxy.
 * @extends BaseProxy
 * @private
 */
declare class PointsProxy extends BaseProxy {
    /**
     * Create a points proxy.
     * @param data - The data value.
     */
    constructor(data: any);
}
/** Class representing a lines proxy.
 * @extends BaseProxy
 * @private
 */
declare class LinesProxy extends BaseProxy {
    /**
     * Create a lines proxy.
     * @param data - The data value.
     */
    constructor(data: any);
    /**
     * Returns the number line segments in this lines proxy geometry
     *
     * @return - The return value.
     */
    getNumLineSegments(): number;
}
/** Class representing a mesh proxy.
 * @extends BaseProxy
 * @private
 */
declare class MeshProxy extends BaseProxy {
    /**
     * Create a mesh proxy.
     * @param data - The data value.
     */
    constructor(data: any);
    /**
     * Returns the number of triangles in this mesh proxy geometry.
     *
     * @return - The return value.
     */
    getNumTriangles(): number;
}
export { BaseProxy, PointsProxy, LinesProxy, MeshProxy };
