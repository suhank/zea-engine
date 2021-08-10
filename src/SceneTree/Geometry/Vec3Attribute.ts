import { Attribute } from './Attribute'
import { Vec3 } from '../../Math/Vec3'
import { Registry } from '../../Registry'

/**
 * Class representing an attribute.
 */
class Vec3Attribute extends Attribute {
  /**
   * Create a Vec3Attribute.
   */
  constructor() {
    super('Vec3', 3)
    this.normalized = false
  }

  /**
   * Returns the Vec3 value at the specified index.
   *
   * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
   * > The components of the value can be changed causing the attributes data is changed.
   * > No need to call 'setValue'.
   *
   * @param {number} index - The index value.
   * @returns Vec3 - The value at the specified index.
   */
  getValueRef(index: number): Vec3 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, offset + this.stride)
    return new Vec3(valueData)
  }

  /**
   * Returns a copy of the Vec3 value at the specified index.
   *
   * @param {number} index - The index value.
   * @return Vec3 - The value at the specified index.
   */
  getValue(index: number): Vec3 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, offset + this.stride)
    return new Vec3(valueData)
  }

  /**
   * Sets Vec3 at the specified index.
   *
   * @param {number} index - The index value.
   * @param {Vec3} value - The value param.
   */
  setValue(index: number, value: Vec3): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    this.data.set(value.asArray(), offset)
  }

  /**
   * Gets the value of a corner vertex of a face.
   * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
   * > The components of the value can be changed causing the attributes data is changed.
   * > No need to call 'setFaceVertexValue'.
   * @param {number} face - The face index.
   * @param {number} faceVertex - The index of vertex within the face. [0... num face vertices]
   * @return {Vec3} - The return value.
   */
  getFaceVertexValueRef(face: number, faceVertex: number): any {
    const array = this.getFaceVertexValueRef_array(face, faceVertex)
    return new Vec3(array)
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param {number} face - The face index.
   * @param {number} faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param {Vec3} value - The value value.
   */
  setFaceVertexValue(face: number, faceVertex: number, value: Vec3): void {
    this.setFaceVertexValue_array(face, faceVertex, value.asArray())
  }

  /**
   * The setSplitVertexValue method.
   * @param {number} vertex - The vertex value.
   * @param {number} face - The face index.
   * @param {any} value - The value value.
   */
  setSplitVertexValue(vertex: number, face: number, value: Vec3): void {
    this.setSplitVertexValue_array(vertex, face, value.asArray())
  }
}

export { Vec3Attribute }
