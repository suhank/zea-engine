import { Lines } from '../Lines.js'
import { NumberParameter } from '../../Parameters/NumberParameter.js'
import Registry from '../../../Registry'

/**
 * A class for generating a lines cuboid shape(Without faces).
 *
 * **Parameters**
 * * **x(`NumberParameter`):** Length of the line cuboid along the `X` axis
 * * **y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
 * * **z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
 * * **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends Lines
 */
class LinesCuboid extends Lines {
  /**
   * Create a lines cuboid.
   * @param {number} x - The length of the line cuboid along the X axis.
   * @param {number} y - The length of the line cuboid along the Y axis.
   * @param {number} z - The length of the line cuboid along the Z axis.
   * @param {boolean} baseZAtZero - The baseZAtZero value.
   */
  constructor(x = 1.0, y = 1.0, z = 1.0, baseZAtZero = false) {
    super()

    this.__x = this.addParameter(new NumberParameter('x', x))
    this.__y = this.addParameter(new NumberParameter('y', y))
    this.__z = this.addParameter(new NumberParameter('z', z))

    this.__baseZAtZero = this.addParameter(new NumberParameter('BaseZAtZero', baseZAtZero))
    this.__rebuild()

    const resize = () => {
      this.__resize()
    }
    const rebuild = () => {
      this.__rebuild()
    }
    this.__x.on('valueChanged', resize)
    this.__y.on('valueChanged', resize)
    this.__z.on('valueChanged', resize)
    this.__baseZAtZero.on('valueChanged', rebuild)
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
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
    this.__resize(false)
    this.emit('geomDataTopologyChanged', {})
  }

  /**
   * The __resize method.
   * @private
   */
  __resize() {
    const x = this.__x.getValue()
    const y = this.__y.getValue()
    const z = this.__z.getValue()
    const baseZAtZero = this.__baseZAtZero.getValue()

    const positions = this.getVertexAttribute('positions')
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

    this.setBoundingBoxDirty()
    if (emit) this.emit('geomDataChanged', {})
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return {object} - Returns the json object.
   */
  toJSON() {
    const json = super.toJSON()
    json['size'] = this.__size
    return json
  }
}

Registry.register('LinesCuboid', LinesCuboid)
export { LinesCuboid }
