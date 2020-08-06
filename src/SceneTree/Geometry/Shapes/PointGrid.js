import { Vec2 } from '../../../Math/Vec2'
import { Points } from '../Points.js'

/**
 * Represents an ordered grid of points along `X` and `Y` axes.
 *
 * ```
 * const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
 * ```
 *
 * @extends Points
 */
class PointGrid extends Points {
  /**
   * Creates an instance of PointGrid.
   *
   * @param {number} [x=1.0] - The length of the point grid along the X axis.
   * @param {number} [y=1.0] - The length of the point grid along the Y axis.
   * @param {number} [xDivisions=1] - The number of divisions along the X axis.
   * @param {number} [yDivisions=1] - The number of divisions along the Y axis.
   * @param {boolean} [addTextureCoords=false] - The addTextureCoords value.
   */
  constructor(x = 1.0, y = 1.0, xDivisions = 1, yDivisions = 1, addTextureCoords = false) {
    super()

    if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions)) throw new Error('Invalid geom args')

    this.__x = x
    this.__y = y
    this.__xDivisions = xDivisions
    this.__yDivisions = yDivisions
    if (addTextureCoords) this.addVertexAttribute('texCoords', Vec2)
    this.__rebuild()
  }

  /**
   * Getter for X.
   * Is deprecated. Please use "getX".
   *
   * @deprecated
   * @return {number} - Returns the length.
   */
  get x() {
    console.warn("getter is deprecated. Please use 'getX'")
    return this.getX()
  }

  /**
   * Setter for X.
   * Is deprecated. Please use "setX".
   *
   * @deprecated
   * @param {number} val - The length along the X axis.
   */
  set x(val) {
    console.warn("getter is deprecated. Please use 'setX'")
    this.setX(val)
  }

  /**
   * Getter for Y.
   * Is deprecated. Please use "getY".
   *
   * @deprecated
   * @return {number} - Returns the length.
   */
  get y() {
    console.warn("getter is deprecated. Please use 'getY'")
    return this.getY()
  }

  /**
   * Setter for Y.
   * Is deprecated. Please use "setY".
   *
   * @deprecated
   * @param {number} val - The length along the Y axis.
   */
  set y(val) {
    console.warn("getter is deprecated. Please use 'setY'")
    this.setY(val)
  }

  /**
   * Getter for the length of the point grid along the `X` axis.
   *
   * @return {number} - Returns the length.
   */
  getX() {
    return this.__x
  }

  /**
   * Setter for the length of the point grid along the `X` axis.
   *
   * @param {number} val - The length along the `X` axis.
   */
  setX(val) {
    this.__x = val
    this.__resize()
  }

  /**
   * Getter for the length of the point grid along the `Y` axis.
   *
   * @return {number} - Returns the length.
   */
  getY() {
    return this.__y
  }

  /**
   * Setter for the length of the point grid along the `Y` axis.
   *
   * @param {number} val - The length along the Y axis.
   */
  setY(val) {
    this.__y = val
    this.__resize()
  }

  /**
   * Setter for the size of the point grid.
   *
   * @param {number} x - The length along the `X` axis.
   * @param {number} y - The length along the `Y` axis.
   */
  setSize(x, y) {
    this.__x = x
    this.__y = y
    this.__resize()
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
    this.setNumVertices(this.__xDivisions * this.__yDivisions)

    const texCoords = this.getVertexAttribute('texCoords')
    if (texCoords) {
      for (let i = 0; i < this.__yDivisions; i++) {
        const y = i / (this.__yDivisions - 1)
        for (let j = 0; j < this.__xDivisions; j++) {
          const x = j / (this.__xDivisions - 1)
          texCoords.getValueRef(i * this.__xDivisions + j).set(x, y)
        }
      }
    }
    this.__resize(false)
    this.emit('geomDataTopologyChanged', {})
  }

  /**
   * The __resize method.
   * @param {number} emit - emit a 'geomDataChanged' event.
   * @private
   */
  __resize(emit = true) {
    const positions = this.getVertexAttribute('positions')
    for (let i = 0; i < this.__yDivisions; i++) {
      const y = (i / (this.__yDivisions - 1) - 0.5) * this.__y
      for (let j = 0; j < this.__xDivisions; j++) {
        const x = (j / (this.__xDivisions - 1) - 0.5) * this.__x
        positions.getValueRef(i * this.__xDivisions + j).set(x, y, 0.0)
      }
    }
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
    json['x'] = this.__x
    json['y'] = this.__y
    json['xDivisions'] = this.__xDivisions
    json['yDivisions'] = this.__yDivisions
    return json
  }
}

export { PointGrid }
