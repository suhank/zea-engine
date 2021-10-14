import { BaseGeom } from './BaseGeom'
import { Registry } from '../../Registry'
import { BinReader } from '../BinReader'
import { Vec3 } from '../../Math/Vec3'
import { Quat } from '../../Math/Quat'
import { Xfo } from '../../Math/Xfo'
// import { Box3 } from '../../Math/Box3'
// import { Vec3Attribute } from './Vec3Attribute'

const resizeUIntArray = (intArray: Uint32Array, newSize: number) => {
  const newArray = new Uint32Array(newSize)
  newArray.set(intArray)
  return newArray
}

interface SubGeomData {
  type: string
  start: number
  count: number
  metadata: Record<string, string | number | Vec3 | Quat | Xfo>
}

/**
 * Class representing a point primitive drawing type, every vertex specified is a point.
 *
 * ```
 * const compoundGeom = new CompoundGeom()
 * ```
 *
 * * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 *
 * @extends BaseGeom
 */
class CompoundGeom extends BaseGeom {
  protected indices: Record<string, Uint32Array>
  protected subGeoms: Array<SubGeomData> = []
  /**
   * Create points.
   */
  constructor() {
    super()

    this.indices = {}
  }

  /**
   * The clear method.
   */
  clear() {
    this.setNumVertices(0)
    this.emit('geomDataTopologyChanged')
  }

  addSubGeomIndices(type: string, indices: Uint32Array, offset = 0) {
    if (!this.indices[type]) this.indices[type] = new Uint32Array(0)
    const mergedIndices = this.indices[type]

    const prevLength = mergedIndices.length
    const newMergedIndices = resizeUIntArray(mergedIndices, prevLength + indices.length)
    newMergedIndices.set(indices, prevLength)
    if (offset > 0) {
      for (let i = 0; i < indices.length; i++) {
        newMergedIndices[prevLength + i] += offset
      }
    }

    let offsetWithinUnifiedIndices = 0
    for (let key in this.indices) {
      if (key == type) break
      offsetWithinUnifiedIndices += this.indices[key].length
    }
    this.indices[type] = newMergedIndices
    const subGeomIndex = this.subGeoms.length
    this.subGeoms.push({
      type,
      start: offsetWithinUnifiedIndices + prevLength,
      count: indices.length,
      metadata: {}
    })
    return subGeomIndex
  }

  setSubGeomMetadata(index: number, key: string, value: string | number | Vec3 | Quat | Xfo) {
    this.subGeoms[index].metadata[key] = value
  }

  genBuffers() {
    let indicesCount = 0
    for (let key in this.indices) indicesCount += this.indices[key].length
    const indices = new Uint32Array(indicesCount)

    let offset = 0
    const offsets: Record<string, number> = {}
    const counts: Record<string, number> = {}
    for (let key in this.indices) {
      indices.set(this.indices[key], offset)
      offsets[key] = offset
      counts[key] = this.indices[key].length
      offset += this.indices[key].length
    }

    const attrBuffers: Record<string, any> = {}
    for (const [attrName, attr] of this.__vertexAttributes) {
      attrBuffers[attrName] = attr.genBuffer()
    }

    const numVertices = this.numVertices()
    const result = {
      numVertices,
      numRenderVerts: numVertices,
      indices,
      attrBuffers,
      offsets,
      counts,
      subGeoms: this.subGeoms
    }
    return result
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current geometry(Including line segments) using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, unknown>) {
    super.loadBaseGeomBinary(reader)

    // this.computeVertexNormals();
    this.emit('geomDataChanged', {})
  }
}

Registry.register('CompoundGeom', CompoundGeom)

export { CompoundGeom }
