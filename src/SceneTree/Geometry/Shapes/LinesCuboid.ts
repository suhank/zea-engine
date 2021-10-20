import { NumberParameter } from '../../Parameters/NumberParameter'
import { Registry } from '../../../Registry'
import { ProceduralLines } from './ProceduralLines'
import { BooleanParameter } from '../../../SceneTree/Parameters'
import { Vec3Attribute } from '../Vec3Attribute'

/**
 * A class for generating a lines cuboid shape(Without faces).
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the line cuboid along the `X` axis
 * * **Y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
 * * **Z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
 * * **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends {ProceduralLines}
 */
class LinesCuboid extends ProceduralLines {
  /**
   * @member {BooleanParameter} baseZAtZeroParam - Property to start or not `Z` axis from position `0.
   */
  baseZAtZeroParam: BooleanParameter

  /**
   * @member {NumberParameter} sizeXParam - Length of the line cuboid along the `X` axis
   */
  sizeXParam: NumberParameter

  /**
   * @member {NumberParameter} sizeYParam - Length of the line cuboid along the `Y` axis
   */
  sizeYParam: NumberParameter

  /**
   * @member {NumberParameter} sizeZParam - Length of the line cuboid along the `Z` axis
   */
  sizeZParam: NumberParameter

  /**
   * Create a lines cuboid.
   * @param {number} x - The length of the line cuboid along the X axis.
   * @param {number} y - The length of the line cuboid along the Y axis.
   * @param {number} z - The length of the line cuboid along the Z axis.
   * @param {boolean} baseZAtZero - The baseZAtZero value.
   */
  constructor(x = 1.0, y = 1.0, z = 1.0, baseZAtZero = false) {
    super()

    this.sizeXParam = this.addParameter(new NumberParameter('X', x)) as NumberParameter
    this.sizeYParam = this.addParameter(new NumberParameter('Y', y)) as NumberParameter
    this.sizeZParam = this.addParameter(new NumberParameter('Z', z)) as NumberParameter

    this.baseZAtZeroParam = this.addParameter(new BooleanParameter('BaseZAtZero', baseZAtZero)) as BooleanParameter
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    this.setNumVertices(8)
    this.setNumSegments(12)
    this.setSegmentVertexIndices(0, 0, 1)
    this.setSegmentVertexIndices(1, 1, 2)
    this.setSegmentVertexIndices(2, 2, 3)
    this.setSegmentVertexIndices(3, 3, 0)

    this.setSegmentVertexIndices(4, 4, 5)
    this.setSegmentVertexIndices(5, 5, 6)
    this.setSegmentVertexIndices(6, 6, 7)
    this.setSegmentVertexIndices(7, 7, 4)

    this.setSegmentVertexIndices(8, 0, 4)
    this.setSegmentVertexIndices(9, 1, 5)
    this.setSegmentVertexIndices(10, 2, 6)
    this.setSegmentVertexIndices(11, 3, 7)
    this.resize()
  }

  /**
   * The resize method.
   *
   * @private
   */
  resize(): void {
    const x = this.sizeXParam.value || 1.0
    const y = this.sizeYParam.value || 1.0
    const z = this.sizeZParam.value || 1.0
    const baseZAtZero = this.baseZAtZeroParam.value

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) {
      let zoff = 0.5
      if (baseZAtZero) zoff = 1.0
      positions.getValueRef(0).set(0.5 * x, -0.5 * y, zoff * z)
      positions.getValueRef(1).set(0.5 * x, 0.5 * y, zoff * z)
      positions.getValueRef(2).set(-0.5 * x, 0.5 * y, zoff * z)
      positions.getValueRef(3).set(-0.5 * x, -0.5 * y, zoff * z)

      zoff = -0.5
      if (baseZAtZero) zoff = 0.0
      positions.getValueRef(4).set(0.5 * x, -0.5 * y, zoff * z)
      positions.getValueRef(5).set(0.5 * x, 0.5 * y, zoff * z)
      positions.getValueRef(6).set(-0.5 * x, 0.5 * y, zoff * z)
      positions.getValueRef(7).set(-0.5 * x, -0.5 * y, zoff * z)
    }
  }
}

Registry.register('LinesCuboid', LinesCuboid)
export { LinesCuboid }
