import { Parameter } from './Parameter'
import { Box3 } from '../../Math/Box3'

/**
 * Represents a specific type of parameter, that only stores `Box3` values.
 *
 * i.e.:
 * ```javascript
 * const boundingBox = new BoundingBoxParameter('MyBBox', new TreeItem())
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(boundingBox)
 * ```
 * @extends Parameter
 */
class BoundingBoxParameter extends Parameter {
  /**
   * Creates an instance of BoundingBoxParameter.
   * @param {string} name - Name of the parameter
   * @param {TreeItem} treeItem - `TreeItem` that contains `Box3` representing the Bounding Box
   */
  constructor(name, treeItem) {
    super(name, new Box3(), 'Box3')
    this.treeItem = treeItem
    this.dirty = true
  }

  /**
   * Makes parameter value be dirty, so when `getValue` is called,
   * an evaluation is then executed to re-calculate the BoundingBox
   *
   * @memberof BoundingBoxParameter
   */
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
