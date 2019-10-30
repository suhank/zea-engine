import { Vec2 } from '../../../Math/Vec2'
import { Vec3 } from '../../../Math/Vec3'
import { Mesh } from '../Mesh.js'

/** Class representing a plane.
 * @extends Mesh
 */
class Plane extends Mesh {
  /**
   * Create a plane.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} xDivisions - The xDivisions value.
   * @param {number} yDivisions - The yDivisions value.
   * @param {boolean} addNormals - The addNormals value.
   * @param {boolean} addTextureCoords - The addTextureCoords value.
   */
  constructor(
    x = 1.0,
    y = 1.0,
    xDivisions = 1,
    yDivisions = 1,
    addNormals = true,
    addTextureCoords = true
  ) {
    super()

    if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions))
      throw new Error('Invalid geom args')

    this.__x = x
    this.__y = y
    this.__xDivisions = xDivisions
    this.__yDivisions = yDivisions
    if (addNormals) this.addVertexAttribute('normals', Vec3)
    if (addTextureCoords) this.addVertexAttribute('texCoords', Vec2)
    this.__rebuild()
  }

  /**
   * Getter for x.
   */
  get x() {
    console.warn("getter is deprectated. Please use 'getX'")
    return this.getX()
  }

  /**
   * Setter for x.
   * @param {number} val - The val param.
   */
  set x(val) {
    console.warn("getter is deprectated. Please use 'setX'")
    this.setX(val)
  }

  /**
   * Getter for y.
   */
  get y() {
    console.warn("getter is deprectated. Please use 'getY'")
    return this.getY()
  }

  /**
   * Setter for y.
   * @param {number} val - The val param.
   */
  set y(val) {
    console.warn("getter is deprectated. Please use 'setY'")
    this.setY(val)
  }

  /**
   * The getX method.
   * @return {any} - The return value.
   */
  getX() {
    return this.__x
  }

  /**
   * The setX method.
   * @param {any} val - The val param.
   */
  setX(val) {
    this.__x = val
    this.__resize()
  }

  /**
   * The getY method.
   * @return {any} - The return value.
   */
  getY() {
    return this.__y
  }

  /**
   * The setY method.
   * @param {any} val - The val param.
   */
  setY(val) {
    this.__y = val
    this.__resize()
  }

  /**
   * The setY method.
   * @param {number} x - The x param.
   * @param {number} y - The y param.
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
    this.setNumVertices((this.__xDivisions + 1) * (this.__yDivisions + 1))
    this.setFaceCounts([0, this.__xDivisions * this.__yDivisions])

    let quadId = 0
    for (let i = 0; i < this.__yDivisions; i++) {
      for (let j = 0; j < this.__xDivisions; j++) {
        const v0 = (this.__xDivisions + 1) * (i + 1) + j
        const v1 = (this.__xDivisions + 1) * (i + 1) + (j + 1)
        const v2 = (this.__xDivisions + 1) * i + (j + 1)
        const v3 = (this.__xDivisions + 1) * i + j
        this.setFaceVertexIndices(quadId, v0, v1, v2, v3)
        quadId = quadId + 1
      }
    }

    let voff = 0
    const normals = this.getVertexAttribute('normals')
    if (normals) {
      for (let i = 0; i <= this.__yDivisions; i++) {
        for (let j = 0; j <= this.__xDivisions; j++) {
          normals.getValueRef(voff).set(0, 0, 1)
          voff++
        }
      }
    }

    voff = 0
    const texCoords = this.getVertexAttribute('texCoords')
    if (texCoords) {
      for (let i = 0; i <= this.__yDivisions; i++) {
        const y = i / this.__yDivisions
        for (let j = 0; j <= this.__xDivisions; j++) {
          const x = j / this.__xDivisions
          texCoords.getValueRef(voff).set(x, y)
          voff++
        }
      }
    }

    this.__resize()
  }

  /**
   * The __resize method.
   * @private
   */
  __resize() {
    let voff = 0
    for (let i = 0; i <= this.__yDivisions; i++) {
      const y = (i / this.__yDivisions - 0.5) * this.__y
      for (let j = 0; j <= this.__xDivisions; j++) {
        const x = (j / this.__xDivisions - 0.5) * this.__x
        this.getVertex(voff).set(x, y, 0.0)
        voff++
      }
    }

    this.setBoundingBoxDirty()
  }

  /**
   * The toJSON method.
   * @return {any} - The return value.
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

export { Plane }
