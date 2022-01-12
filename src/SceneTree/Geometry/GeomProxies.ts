import { Material } from '..'
import { Box3 } from '../../Math/index'
import { EventEmitter } from '../../Utilities/EventEmitter'
import { MaterialLibrary } from '../MaterialLibrary'

/** ProxyGeometries are pupulated from data unpacked using a webworker while loading zcad files.
 * These geometries represent readonly geometries with very basic topologies.
 * @extends EventEmitter
 * @private
 */
class BaseProxy extends EventEmitter {
  protected name: string
  __buffers: any
  protected boundingBox: Box3
  protected __metaData: any

  /**
   * Create a base proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super()
    this.name = data.name
    this.__buffers = data.geomBuffers
    if (this.__buffers.attrBuffers) {
      // eslint-disable-next-line guard-for-in
      // for (const attrName in this.__buffers.attrBuffers) {
      //   const attrData = this.__buffers.attrBuffers[attrName]
      //   const dataType = Registry.getBlueprint(attrData.dataType)
      //   attrData.dataType = dataType
      // }
    }

    this.boundingBox = new Box3()
    this.boundingBox.p0.__data = data.bbox.p0.__data
    this.boundingBox.p1.__data = data.bbox.p1.__data

    this.__metaData = new Map()
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return - The return value.
   */
  getNumVertices(): number {
    return <number>this.__buffers.numVertices // TODO: check cast
  }

  /**
   * Returns the bounding box for geometry.
   * @return - The return value.
   */
  getBoundingBox(): Box3 {
    return this.boundingBox
  }

  /**
   * The genBuffers method.
   * @return - The return value.
   */
  genBuffers(): any {
    return this.__buffers
  }

  // ////////////////////////////////////////
  // Metadata

  /**
   * The getMetadata method.
   * @param key - The key value.
   * @return - The return value.
   */
  getMetadata(key: string): any {
    return this.__metaData.get(key)
  }

  /**
   * The hasMetadata method.
   * @param key - The key value.
   * @return - The return value.
   */
  hasMetadata(key: string): any {
    return this.__metaData.has(key)
  }

  /**
   * The setMetadata method.
   * @param key - The key value.
   * @param metaData - The metaData value.
   */
  setMetadata(key: string, metaData: any): void {
    this.__metaData.set(key, metaData)
  }

  /**
   * Removes metadata for a given key.
   *
   * @param key - The key value.
   */
  deleteMetadata(key: string): void {
    this.__metaData.delete(key)
  }
}

/** Class representing a points proxy.
 * @extends BaseProxy
 * @private
 */
class PointsProxy extends BaseProxy {
  /**
   * Create a points proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
  }
}

/** Class representing a lines proxy.
 * @extends BaseProxy
 * @private
 */
class LinesProxy extends BaseProxy {
  /**
   * Create a lines proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
  }

  /**
   * Returns the number line segments in this lines proxy geometry
   *
   * @return - The return value.
   */
  getNumLineSegments(): number {
    return this.__buffers.indices.length / 2
  }
}

/** Class representing a mesh proxy.
 * @extends BaseProxy
 * @private
 */
class MeshProxy extends BaseProxy {
  /**
   * Create a mesh proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
  }

  /**
   * Returns the number of triangles in this mesh proxy geometry.
   *
   * @return - The return value.
   */
  getNumTriangles(): number {
    return this.__buffers.indices.length / 3
  }
}

/** Class representing a mesh proxy.
 * @extends BaseProxy
 * @private
 */
class CompoundGeomProxy extends BaseProxy {
  private offsets: Record<string, number>
  private counts: Record<string, number>
  private subGeomOffsets: Record<string, Uint32Array>
  private subGeomCounts: Record<string, Uint8Array | Uint16Array | Uint32Array>
  private materials: Array<Material> = []
  protected subGeomMaterialIndices: Uint8Array = new Uint8Array(0)
  /**
   * Create a mesh proxy.
   * @param data - The data value.
   */
  constructor(data: any, materialLibrary: MaterialLibrary) {
    super(data)

    this.counts = data.geomBuffers.counts
    this.offsets = data.geomBuffers.offsets
    this.subGeomOffsets = data.geomBuffers.subGeomOffsets
    this.subGeomCounts = data.geomBuffers.subGeomCounts

    // Now use the indices in the geom to look up the actual materials
    // that will be used in rendering.
    const materials = materialLibrary.getMaterials()
    data.geomBuffers.materialLibraryIndices.forEach((materialIndex: number, index: number) => {
      this.materials[index] = materials[materialIndex]
    })
    this.subGeomMaterialIndices = data.geomBuffers.subGeomMaterialIndices

    this.__buffers.materials = this.materials
  }

  /**
   * Returns the number line segments in this lines proxy geometry
   *
   * @return - The return value.
   */
  getNumPoints() {
    return this.counts['POINTS']
  }

  /**
   * Returns the number line segments in this lines proxy geometry
   *
   * @return - The return value.
   */
  getNumLineSegments() {
    return this.counts['LINES'] / 2
  }

  /**
   * Returns the number of triangles in this mesh proxy geometry.
   *
   * @return - The return value.
   */
  getNumTriangles() {
    return this.counts['TRIANGLES'] / 3
  }
}

export { BaseProxy, PointsProxy, LinesProxy, MeshProxy, CompoundGeomProxy }
