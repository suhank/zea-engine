import { Lines } from '../Lines.js'

import { BooleanParameter, NumberParameter } from '../../Parameters/index'
import { sgFactory } from '../../SGFactory.js'

/**
 * Represents a network of lines that cross each other to form a series of squares or rectangles.
 *
 * ```
 * const grid = new Grid(5, 5, 50, 50, true)
 * ```
 *
 * **Parameters**
 * * **x(`NumberParameter`):** Length of the grid along the `X` axis.
 * * **y(`NumberParameter`):** Length of the grid along the `Y` axis.
 * * **xDivisions(`NumberParameter`):** Number of divisions along `X` axis
 * * **yDivisions(`NumberParameter`):** Number of divisions along `Y` axis
 * * **skipCenterLines(`BooleanParameter`):** Property that indicates whether to display the center grid lines or not
 *
 * @extends Lines
 */
class Grid extends Lines {
  /**
   * Create a grid.
   * @param {number} x - The length of the grid along the `X` axis.
   * @param {number} y - The length of the grid along the `Y` axis.
   * @param {number} xDivisions - The number of divisions along `X` axis.
   * @param {number} yDivisions - The number of divisions along `Y` axis.
   * @param {boolean} skipCenterLines - A boolean indicating whether to display the center grid lines or not.
   */
  constructor(x = 1.0, y = 1.0, xDivisions = 10, yDivisions = 10, skipCenterLines = false) {
    super()

    if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions)) throw new Error('Invalid geom args')

    this.__xParam = this.addParameter(new NumberParameter('x', x))
    this.__yParam = this.addParameter(new NumberParameter('y', y))
    this.__xDivisionsParam = this.addParameter(new NumberParameter('xDivisions', xDivisions))
    this.__yDivisionsParam = this.addParameter(new NumberParameter('yDivisions', yDivisions))
    this.__skipCenterLinesParam = this.addParameter(new BooleanParameter('skipCenterLines', skipCenterLines))

    this.__rebuild()
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
    const xDivisions = this.__xDivisionsParam.getValue()
    const yDivisions = this.__yDivisionsParam.getValue()

    const skipCenterLines = this.__skipCenterLinesParam.getValue() && xDivisions % 2 == 0 && yDivisions % 2 == 0
    this.setNumVertices((xDivisions + yDivisions + 2 - (skipCenterLines ? 1 : 0)) * 2)
    this.setNumSegments(xDivisions + yDivisions + 2 - (skipCenterLines ? 1 : 0))
    let idx = 0
    for (let i = 0; i <= xDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      this.setSegmentVertexIndices(idx, v0, v1)
      idx++
    }
    for (let i = 0; i <= yDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      this.setSegmentVertexIndices(idx, v0, v1)
      idx++
    }
    this.__resize()
  }

  /**
   * The __resize method.
   * @private
   */
  __resize() {
    const positions = this.getVertexAttribute('positions')
    const xDivisions = this.__xDivisionsParam.getValue()
    const yDivisions = this.__yDivisionsParam.getValue()
    const xSize = this.__xParam.getValue()
    const ySize = this.__yParam.getValue()

    const skipCenterLines = this.__skipCenterLinesParam.getValue() && xDivisions % 2 == 0 && yDivisions % 2 == 0
    let idx = 0
    for (let i = 0; i <= xDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      const x = (i / xDivisions - 0.5) * xSize
      positions.getValueRef(v0).set(x, -0.5 * ySize, 0.0)
      positions.getValueRef(v1).set(x, 0.5 * ySize, 0.0)
      idx++
    }
    for (let i = 0; i <= yDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      const y = (i / yDivisions - 0.5) * ySize
      positions.getValueRef(v0).set(-0.5 * xSize, y, 0.0)
      positions.getValueRef(v1).set(0.5 * xSize, y, 0.0)
      idx++
    }

    this.setBoundingBoxDirty()
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return {object} - Returns the json object.
   */
  toJSON() {
    const json = super.toJSON()
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

    this.__xParam.fromJSON(j.x)
    this.__yParam.fromJSON(j.z)
    this.__xDivisionsParam.fromJSON(j.xDivisions)
    this.__yDivisionsParam.fromJSON(j.yDivisions)
    this.__skipCenterLinesParam.fromJSON(j.skipCenterLines)
  }
}

sgFactory.registerClass('Grid', Grid)

export { Grid }
