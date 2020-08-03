import { Lines } from '../Lines.js'
import { NumberParameter } from '../../Parameters/NumberParameter.js'
import { sgFactory } from '../../SGFactory.js'

/**
 * A class for generating a rectangle shape.
 *
 * ```
 * const rect = new Rect(1.5, 2.0)
 * ```
 *
 * **Parameters**
 * * **x(`NumberParameter`):** Length of the rectangle along the `X` axis.
 * * **y(`NumberParameter`):** Length of the rectangle along the `Y` axis.
 *
 *
 * @extends Lines
 */
class Rect extends Lines {
  /**
   * Create a rect.
   * @param {number} x - The length of the rect along the `X` axis.
   * @param {number} y - The length of the rect along the `Y` axis.
   */
  constructor(x = 1.0, y = 1.0) {
    super()

    if (isNaN(x) || isNaN(y)) throw new Error('Invalid geom args')

    this.__x = this.addParameter(new NumberParameter('x', x))
    this.__x.on('valueChanged', this.__resize.bind(this))
    this.__y = this.addParameter(new NumberParameter('y', y))
    this.__y.on('valueChanged', this.__resize.bind(this))
    this.__rebuild()
  }

  /**
   * Getter for the length of the rect along the `X` axis.
   *
   * @return {number} - Returns the length.
   */
  get x() {
    return this.__x.getValue()
  }

  /**
   * Setter for the length of the rect along the `X` axis.
   *
   * @param {number} val - The length along the `X` axis.
   */
  set x(val) {
    this.__x.setValue(val)
  }

  /**
   * Getter for the length of the rect along the `Y` axis.
   *
   * @return {number} - Returns the length.
   */
  get y() {
    return this.__y.getValue()
  }

  /**
   * Setter for the length of the rect along the U axis.
   *
   * @param {number} val - The length along the `Y` axis.
   */
  set y(val) {
    this.__y.setValue(val)
  }

  /**
   * Setter for the size of the rect.
   *
   * @param {number} x - The length along the `X` axis.
   * @param {number} y - The length along the `Y` axis.
   */
  setSize(x, y) {
    this.__x.setValue(x, -1)
    this.__y.setValue(y, -1)
    this.__resize()
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
    this.setNumVertices(4)
    this.setNumSegments(4)
    this.setSegmentVertexIndices(0, 0, 1)
    this.setSegmentVertexIndices(1, 1, 2)
    this.setSegmentVertexIndices(2, 2, 3)
    this.setSegmentVertexIndices(3, 3, 0)
    this.__resize(false)
    this.emit('geomDataTopologyChanged', {})
  }

  /**
   * The __resize method.
   * @param {number} emit - emit a 'geomDataChanged' event.
   * @private
   */
  __resize(emit) {
    const x = this.__x.getValue()
    const y = this.__y.getValue()

    const positions = this.getVertexAttribute('positions')
    positions.getValueRef(0).set(-0.5 * x, -0.5 * y, 0.0)
    positions.getValueRef(1).set(0.5 * x, -0.5 * y, 0.0)
    positions.getValueRef(2).set(0.5 * x, 0.5 * y, 0.0)
    positions.getValueRef(3).set(-0.5 * x, 0.5 * y, 0.0)
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
    json['x'] = this.__x.toJSON()
    json['y'] = this.__y.toJSON()
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags)

    this.__x.fromJSON(j.x)
    this.__y.fromJSON(j.y)
  }
}
sgFactory.registerClass('Rect', Rect)

export { Rect }
