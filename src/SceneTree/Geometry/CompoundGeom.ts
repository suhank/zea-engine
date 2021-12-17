import { BaseGeom } from './BaseGeom'
import { Registry } from '../../Registry'
import { BinReader } from '../BinReader'
import { Vec3 } from '../../Math/Vec3'
import { Quat } from '../../Math/Quat'
import { Xfo } from '../../Math/Xfo'
// import { Box3 } from '../../Math/Box3'
// import { Vec3Attribute } from './Vec3Attribute'

const copyIndicesArray = (
  intArray: Uint8Array | Uint16Array | Uint32Array,
  newArray: Uint8Array | Uint16Array | Uint32Array
) => {
  for (let i = 0; i < intArray.length; i++) {
    newArray[i] += intArray[i]
  }
}

const resizeIndicesArray = (intArray: Uint8Array | Uint16Array | Uint32Array, newSize: number, numVertices: number) => {
  let newArray
  if (numVertices <= 255) {
    newArray = new Uint8Array(newSize)
    if (intArray instanceof Uint32Array) newArray.set(intArray)
    else copyIndicesArray(intArray, newArray)
  } else if (numVertices <= 65536) {
    newArray = new Uint16Array(newSize)
    if (intArray instanceof Uint32Array) newArray.set(intArray)
    else copyIndicesArray(intArray, newArray)
  } else {
    newArray = new Uint32Array(newSize)
    if (intArray instanceof Uint32Array) newArray.set(intArray)
    else copyIndicesArray(intArray, newArray)
  }
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
  protected indices: Uint8Array | Uint16Array | Uint32Array = new Uint8Array(0)
  private offsets: Record<string, number> = {}
  private counts: Record<string, number> = {}
  private subGeomOffsets: Record<string, Uint32Array> = {}
  private subGeomCounts: Record<string, Uint8Array | Uint16Array | Uint32Array> = {}
  protected subGeoms: Array<SubGeomData> = []
  /**
   * Create points.
   */
  constructor() {
    super()

    // this.indices = {}
  }

  /**
   * The clear method.
   */
  clear() {
    this.setNumVertices(0)
    this.emit('geomDataTopologyChanged')
  }

  setNumVertices(numVertices: number) {
    super.setNumVertices(numVertices)
  }

  addSubGeomIndices(type: string, indices: Uint32Array, offset = 0) {
    const numVertices = this.numVertices()
    const prevLength = this.indices.length
    this.indices = resizeIndicesArray(this.indices, prevLength + indices.length, numVertices)
    if (offset > 0) {
      for (let i = 0; i < indices.length; i++) {
        this.indices[prevLength + i] += offset
      }
    }

    this.counts[type] += indices.length
    if (type == 'POINTSS') {
      this.offsets['LINES'] += indices.length
      this.offsets['TRIANGLES'] += indices.length
    } else if (type == 'LINES') {
      this.offsets['TRIANGLES'] += indices.length
    }

    const subGeomIndex = this.subGeoms.length
    this.subGeoms.push({
      type,
      start: prevLength,
      count: indices.length,
      metadata: {},
    })
    return subGeomIndex
  }

  setSubGeomMetadata(index: number, key: string, value: string | number | Vec3 | Quat | Xfo) {
    this.subGeoms[index].metadata[key] = value
  }

  genBuffers() {
    const attrBuffers: Record<string, any> = {}
    for (const [attrName, attr] of this.__vertexAttributes) {
      attrBuffers[attrName] = attr.genBuffer()
    }

    const numVertices = this.numVertices()
    const result = {
      numVertices,
      numRenderVerts: numVertices,
      indices: this.indices,
      attrBuffers,
      offsets: this.offsets,
      counts: this.counts,
      subGeomOffsets: this.subGeomOffsets,
      subGeomCounts: this.subGeomCounts,
      subGeoms: this.subGeoms,
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

    const geomCountsByType = reader.loadUInt32Array(3)
    this.offsets['TRIANGLES'] = 0
    this.counts['TRIANGLES'] = geomCountsByType[0]
    this.offsets['LINES'] = geomCountsByType[0]
    this.counts['LINES'] = geomCountsByType[1]
    this.offsets['POINTS'] = geomCountsByType[0] + geomCountsByType[1]
    this.counts['POINTS'] = geomCountsByType[2]

    const bytes = reader.loadUInt8()
    if (bytes == 1) this.indices = reader.loadUInt8Array(undefined, true)
    else if (bytes == 2) this.indices = reader.loadUInt16Array(undefined, true)
    else if (bytes == 4) this.indices = reader.loadUInt32Array(undefined, true)

    // /////////////////////////////////
    // TRIANGLES subgeoms
    const bytesMeshSubGeoms = reader.loadUInt8()
    let subGeomCountsMesh: Uint8Array | Uint16Array | Uint32Array
    if (bytesMeshSubGeoms == 1) subGeomCountsMesh = reader.loadUInt8Array()
    else if (bytesMeshSubGeoms == 2) subGeomCountsMesh = reader.loadUInt16Array()
    else if (bytesMeshSubGeoms == 4) subGeomCountsMesh = reader.loadUInt32Array()
    else {
      throw Error('subGeomOffsets undefined')
    }
    const subGeomOffsetsMesh = new Uint32Array(subGeomCountsMesh.length)
    let offset = 0
    for (let i = 0; i < subGeomCountsMesh.length; i++) {
      subGeomOffsetsMesh[i] = offset
      offset += subGeomCountsMesh[i]
    }
    this.subGeomOffsets['TRIANGLES'] = subGeomOffsetsMesh
    this.subGeomCounts['TRIANGLES'] = subGeomCountsMesh

    // /////////////////////////////////
    // LINES subgeoms
    const bytesLinesSubGeoms = reader.loadUInt8()
    let subGeomCountsLines: Uint8Array | Uint16Array | Uint32Array
    if (bytesLinesSubGeoms == 1) subGeomCountsLines = reader.loadUInt8Array()
    else if (bytesLinesSubGeoms == 2) subGeomCountsLines = reader.loadUInt16Array()
    else if (bytesLinesSubGeoms == 4) subGeomCountsLines = reader.loadUInt32Array()
    else {
      throw Error('subGeomOffsets undefined')
    }
    const subGeomOffsetsLines = new Uint32Array(subGeomCountsLines.length)
    for (let i = 0; i < subGeomCountsLines.length; i++) {
      subGeomOffsetsLines[i] = offset
      offset += subGeomCountsLines[i]
    }
    this.subGeomOffsets['LINES'] = subGeomOffsetsLines
    this.subGeomCounts['LINES'] = subGeomCountsLines

    this.emit('geomDataChanged', {})
  }
}

Registry.register('CompoundGeom', CompoundGeom)

export { CompoundGeom }
