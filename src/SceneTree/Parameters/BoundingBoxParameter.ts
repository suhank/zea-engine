/* eslint-disable @typescript-eslint/no-unused-vars */
import { Parameter } from './Parameter'
import { Box3 } from '../../Math/Box3'
import { BinReader } from '../BinReader'
import { TreeItem } from '../TreeItem'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { AssetLoadContext } from '../AssetLoadContext'

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
class BoundingBoxParameter extends Parameter<Box3> implements IBinaryReader {
  // protected dirty: boolean, value, name
  protected treeItem: TreeItem
  /**
   * Creates an instance of BoundingBoxParameter.
   * @param name - Name of the parameter
   * @param treeItem - `TreeItem` that contains `Box3` representing the Bounding Box
   */
  constructor(name: string = '', treeItem: TreeItem) {
    super(name, new Box3(), 'Box3')
    this.treeItem = treeItem
    this.dirty = true
  }

  setParameterAsDirty(): void {
    this.dirty = true
  }

  /**
   * Makes parameter value be dirty, so when `getValue` is called,
   * an evaluation is then executed to re-calculate the BoundingBox
   *
   * @memberof BoundingBoxParameter
   */
  setDirty(index: number): boolean {
    const result = super.setDirty(index)
    if (result) {
      this.dirty = true
    }
    // console.warn('check this if this method needs to be overloaded')
    return result
  }

  /**
   * Returns bounding box value
   *
   * @return - The return value.
   */
  getValue(): Box3 {
    if (this.dirty) {
      this.__value = this.treeItem._cleanBoundingBox(this.__value)
    }
    return this.__value
  }

  toJSON(context?: Record<string, unknown>): Record<string, any> {
    return {
      value: this.__value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, any>, context?: Record<string, unknown>): void {
    // if (j.value.type) this.__value = Registry.constructClass('Box3') as Box3 // TODO: this is now broken
    this.__value?.fromJSON(j.value)
  }

  readBinary(reader: BinReader, context?: AssetLoadContext): void {
    throw new Error('Method not implemented.')
  }

  clone(): BoundingBoxParameter {
    const bBox3Clone = new BoundingBoxParameter(this.name, this.treeItem)
    bBox3Clone.value = this.__value?.clone()

    return bBox3Clone
  }
}

export { BoundingBoxParameter }
