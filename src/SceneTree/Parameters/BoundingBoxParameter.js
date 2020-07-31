import { Parameter } from './Parameter'
import { Box3 } from '../../Math/Box3'

/**
 * Represents a specific type of parameter, that only stores Vec3(three-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec3Param = new Vec3Parameter('MyVec3', new Vec3(1.2, 3.4, 1))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec3Param)
 * ```
 * @extends Parameter
 */
class BoundingBoxParameter extends Parameter {
  /**
   * Create a Vec3 parameter.
   * @param {treeItem} treeItem - The tree item to compute the bounding box for.
   * @param {Vec3} value - The value of the parameter.
   * @param {array} range - The range value is an array of two `Vec2` objects.
   */
  constructor(name, treeItem) {
    super(name, new Box3(), 'Box3')
    this.treeItem = treeItem
    this.dirty = true
  }

  setDirty() {
    this.dirty = true
    this.emit('valueChanged')
  }

  /**
   * Returns bounding box value
   *
   * @return {Box3} - The return value.
   */
  getValue() {
    if (this.dirty) {
      this.__value = this.treeItem._cleanBoundingBox(this.__value)
    }
    return this.__value
  }
}

export { BoundingBoxParameter }
