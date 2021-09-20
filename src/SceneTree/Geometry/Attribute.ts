/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
import { BaseClass } from '../../Utilities/BaseClass'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { Mesh } from './Mesh'
import { BinReader } from '../../SceneTree/BinReader'

function approxEqual(a: Float32Array, b: Float32Array) {
  return !a.some((value, index) => Math.abs(b[index] - value) > 0.001)
}
function isValid(a: Float32Array, defaultElementValue: number) {
  return !a.some(value => value == defaultElementValue)
}

class Attribute extends BaseClass {
  protected normalized!: boolean
  protected data: Float32Array
  protected dataTypeName: string
  protected stride: number
  protected defaultElementValue: number

  protected mesh!: Mesh
  protected splitValues: Array<Float32Array>
  protected splits: Record<number, Record<number, number>>

  constructor(dataTypeName: string, stride: number, defaultElementValue: number = 0) {
    super()

    this.data = new Float32Array(0)
    this.dataTypeName = dataTypeName
    this.stride = stride
    this.defaultElementValue = defaultElementValue
    this.initRange(0)

    this.splits = {}
    this.splitValues = []
  }

  /**
   * Sets the Mesh reference to the VertexAttribute. This is needed for attributes
   * assigned to meshes, and is used to calculate face vertex indices.
   * > Note: the mesh automatically calls this method when a vertex attribute is assigned.
   *
   * @param {Mesh} mesh - The mesh object
   */
  setMesh(mesh: Mesh) {
    this.mesh = mesh
  }

  /**
   * Returns the backing array for this attribute
   *
   * @return {string} - The return value.
   */
  asArray() {
    return this.data
  }

  /**
   * Returns the name of the math type this attribute stores.
   *
   * @return {string} - The return value.
   */
  getDataTypeName() {
    return this.dataTypeName
  }

  /**
   * Returns the count of attribute values in the data.
   *
   * @return {number} - The return value.
   */
  getCount(): number {
    return this.data.length / this.stride
  }

  /**
   * Sets the count of attribute values in the data.
   *
   * @param {number} size - The size value.
   */
  setCount(count: number): void {
    const prevLength = this.data.length
    const newLength = count * this.stride

    if (newLength > prevLength) {
      const data = new Float32Array(newLength)
      data.set(this.data, 0)
      this.data = data
      this.initRange(prevLength)
    } else if (newLength < prevLength) {
      this.data = this.data.slice(0, newLength)
    } else {
      // No change in size. (this can happen when an attribute was already loaded with data.)
    }

    this.splits = {}
    this.splitValues = []
  }

  /**
   * Resizes current data array to to a new size.
   * In case the new size is bigger than current size, the new values are filled up with default ones.
   * @deprecated
   * @param {number} size - The size value.
   */
  resize(size: number): void {
    this.setCount(size)
  }

  /**
   * Fills up data values with default ones starting from the specified index.
   *
   * @param {number} start - The start value.
   */
  private initRange(start: number): void {
    // Initialize the values to invalid values.
    for (let i = start; i < this.data.length; i++) {
      this.data[i] = this.defaultElementValue
    }
  }

  /**
   * Returns the number of elements stored in each `T`.
   *
   * @return {number} - The return value.
   */
  get numElements(): number {
    return this.stride
  }

  /**
   * Returns data value of the specified index.
   *
   * @param {number} index - The index value.
   * @return {number} - The return value.
   */
  getFloat32Value(index: number): number {
    return this.data[index]
  }

  /**
   * Sets data value in the specified index.
   *
   * @param {number} index - The index value.
   * @param {number} value - The value param.
   */
  setFloat32Value(index: number, value: number): void {
    this.data[index] = value
  }

  // //////////////////////////////////////////////////
  // Face Vertex Values

  /**
   * The getSplits method.
   * @return {array} - The return value.
   */
  getSplits(): Record<number, Record<number, number>> {
    return this.splits
  }

  /**
   * Gets the value of a corner vertex of a face.
   * @param {number} face - The face index.
   * @param {number} faceVertex - The index of vertex within the face. [0... num face vertices]
   * @return {Float32Array} - The return value.
   */
  getFaceVertexValueRef_array(face: number, faceVertex: number): Float32Array {
    const vertex = this.mesh.getFaceVertexIndex(face, faceVertex)
    if (vertex in this.splits && face in this.splits[vertex]) {
      return this.splitValues[this.splits[vertex][face]]
    }
    return this.data.subarray(vertex * this.numElements, (vertex + 1) * this.numElements)
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param {number} face - The face index.
   * @param {number} faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param {Float32Array} value - The value value.
   */
  setFaceVertexValue_array(face: number, faceVertex: number, value: Float32Array): void {
    const vertex = this.mesh.getFaceVertexIndex(face, faceVertex)
    this.setFaceVertexValue_ByVertexIndex(face, vertex, value)
  }

  /**
   * The setFaceVertexValue_ByVertexIndex method.
   * @param {number} face - The face index.
   * @param {number} vertex - The vertex value.
   * @param {any} value - The value value.
   */
  setFaceVertexValue_ByVertexIndex(face: number, vertex: number, value: Float32Array): void {
    const currValue = this.data.subarray(vertex * this.numElements, (vertex + 1) * this.numElements)
    if (!isValid(currValue, this.defaultElementValue)) {
      // the value is uninitialized. Initialize it.
      currValue.set(value)
    } else if (approxEqual(currValue, value)) {
      // Reusing vertex value. Do nothing
    } else {
      // The new value is different from the existing value

      if (vertex in this.splits) {
        // Now check if any existing splits for this vertex match the value being set.
        // i.e. for faces around a vertex, there will often be a seam along 2 edges
        // where the values differ. On each side of the seam, all faces can use the same
        // value. We should see then only one split value for the vertex.
        const vertexSplitIds = this.splits[vertex]
        for (const fid in vertexSplitIds) {
          const splitId = vertexSplitIds[fid]
          if (approxEqual(this.splitValues[splitId], value)) {
            // re-use this split value
            vertexSplitIds[face] = splitId
            return
          }
        }

        // If a split already exists for this face, re-use it.
        if (face in this.splits[vertex]) {
          this.splitValues[this.splits[vertex][face]] = value
          return
        }
      } else {
        this.splits[vertex] = {}
      }
      this.splits[vertex][face] = this.splitValues.length
      this.splitValues.push(value)
    }
  }

  /**
   * The setSplitVertexValue method.
   * @param {number} vertex - The vertex value.
   * @param {number} face - The face index.
   * @param {any} value - The value value.
   */
  setSplitVertexValue_array(vertex: number, face: number, value: Float32Array): void {
    if (!(vertex in this.splits)) this.splits[vertex] = {}
    if (face in this.splits[vertex]) {
      const currValue = this.splitValues[this.splits[vertex][face]]
      if (approxEqual(currValue, value)) return
      console.warn('Face Vertex Already Split with different value')
    }
    this.splits[vertex][face] = this.splitValues.length
    this.splitValues.push(value)
  }

  /**
   * The setSplitVertexValues method.
   * @param {number} vertex - The vertex value.
   * @param {array} faceGroup - The faceGroup value.
   * @param {any} value - The value value.
   */
  setSplitVertexValues(vertex: number, faceGroup: number[], value: Float32Array): void {
    if (!(vertex in this.splits)) this.splits[vertex] = {}
    const splitIndex = this.splitValues.length
    this.splitValues.push(value)
    for (const face of faceGroup) {
      // if (face in this.splits[vertex]) {
      //     let currValue = this.splitValues[this.splits[vertex][face]];
      //     if (currValue.approxEqual(value))
      //         return;
      //     console.warn("Face Vertex Already Split with different value");
      // }
      this.splits[vertex][face] = splitIndex
    }
  }

  /**
   * The generateSplitValues method.
   * @param {Record<number, Record<number, number>>} splitIndices - The splitIndices value.
   * @param {number} splitCount - The splitCount value.
   * @return {Float32Array} - The return value.
   */
  generateSplitValues(splitIndices: Record<number, Record<number, number>>, splitCount: number): TypedArray {
    if (splitCount == 0) return this.data

    const numUnSplitValues = this.getCount()
    const data = new Float32Array(this.getCount() + splitCount * this.numElements)
    data.set(this.data)

    // Now duplicate the split values to generate an attributes array
    // using the shared splits across all attributes.
    // eslint-disable-next-line guard-for-in
    for (const vertex in splitIndices) {
      const faces = splitIndices[vertex]
      // eslint-disable-next-line guard-for-in
      for (const face in faces) {
        const tgt = numUnSplitValues + faces[face]
        if (vertex in this.splits && face in this.splits[vertex]) {
          // this attribute has a split value in its array.
          // we must use that value...
          const src = this.splits[vertex][face]
          this.splitValues[src].forEach((value, index) => {
            data[tgt * this.numElements + index] = value
          })
        } else {
          // Copy each scalar value to the new place in the array.
          const src = parseInt(vertex)
          for (let e = 0; e < this.numElements; e++) {
            data[tgt * this.numElements + e] = this.data[src * this.numElements + e]
          }
        }
      }
    }
    return data
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    return {
      data: this.data,
      dataType: this.dataTypeName,
      defaultValue: this.defaultElementValue,
      length: this.data.length / this.stride
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   */
  fromJSON(j: Record<string, any>): void {
    const data = j.data.map((dataElement: any) =>
      MathFunctions.isNumeric(dataElement) ? dataElement : Number.POSITIVE_INFINITY
    )
    this.data = Float32Array.from(data)
  }

  /**
   * The loadSplitValues method.
   * @param {BinReader} reader - The reader value.
   */
  loadSplitValues(reader: BinReader) {
    const splitIndices = reader.loadUInt32Array()
    if (splitIndices.length == 0) return
    let offset = 0
    let numSplitValues = 0
    while (true) {
      const vertexId = splitIndices[offset++]
      const numSplits = splitIndices[offset++]

      const splits: Record<number, number> = {}
      for (let i = 0; i < numSplits; i++) {
        const faceId = splitIndices[offset++]
        const splitId = splitIndices[offset++]
        splits[faceId] = splitId
        if (splitId >= numSplitValues) numSplitValues = splitId + 1
      }
      this.splits[vertexId] = splits
      if (offset >= splitIndices.length) break
    }
    const dim = this.stride
    const splitValues = reader.loadFloat32Array(numSplitValues * dim)
    this.splitValues = []
    for (let i = 0; i < numSplitValues; i++) {
      const val = splitValues.slice(i * dim, i * dim + dim)
      this.splitValues.push(val)
    }
  }

  /**
   * Returns the string representation of the object's state.
   *
   * @return {string} - The return value.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }

  // ////////////////////////////////////////
  // Memory

  /**
   * Returns vertex attributes buffers and its count.
   *
   * @return {Record<string, any>} - The return value.
   */
  genBuffer(): Record<string, any> {
    return {
      values: this.data,
      count: this.getCount(),
      dataType: this.dataTypeName,
      normalized: this.normalized
    }
  }
}

export { Attribute }
