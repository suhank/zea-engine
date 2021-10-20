/* eslint-disable no-unused-vars */
import { Registry } from '../../Registry'
import { BaseGroup } from './BaseGroup'
import { MaterialParameter } from '../Parameters/MaterialParameter'
import { TreeItem } from '../TreeItem'

import { Material } from '../../SceneTree/Material'
import { Color } from '../../Math/Color'
import { BaseItem } from '../BaseItem'
import { BaseGeomItem } from '../BaseGeomItem'

/**
 *
 * **Parameters**
 * * **Material(`MaterialParameter`):** _todo_
 *
 * @extends BaseGroup
 */
class MaterialGroup extends BaseGroup {
  // TODO: should BaseGroup have the materialParam?
  /**
   * @member {MaterialParameter} materialParam - The Material to use when rendering this GeomItem
   */
  materialParam: MaterialParameter = new MaterialParameter('Material')

  private __backupMaterials: { [key: number]: Material } = {}

  /**
   * Creates an instance of a group.
   *
   * @param {string} name - The name of the group.
   */

  constructor(name?: string) {
    super(name)

    this.addParameter(this.materialParam)
    this.materialParam.on('valueChanged', () => {
      this.__updateMaterial()
    })
  }

  // /////////////////////////////

  /**
   * The __updateHighlight method.
   * @private
   */
  __updateHighlight(): void {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.

    // setTimeout(() => {}, 0)
    // TODO: make this async
    this.__updateHighlightHelper()
  }
  /**
   * The __updateHighlight method.
   * @private
   */
  __updateHighlightHelper(): void {
    let highlighted = false
    let color: Color
    if (this.isSelected()) {
      color = this.getHighlight()
      highlighted = true
      color.a = 0.2
    }

    const key = 'kinematicGroupItemHighlight' + this.getId()
    Array.from(this.itemsParam.value).forEach((item) => {
      if (item instanceof TreeItem) {
        if (highlighted) item.addHighlight(key, color, true)
        else item.removeHighlight(key, true)
      }
    })
  }
  /**
   * Changes selection's state of the group with all items it owns.
   *
   * @param {boolean} sel - Boolean indicating the new selection state.
   */
  setSelected(sel: boolean) {
    super.setSelected(sel)
    this.__updateHighlight()
  }

  // ////////////////////////////////////////
  // Materials

  /**
   * The __updateMaterial method.
   * @private
   */
  __updateMaterial() {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.

    // setTimeout(() => {}, 0)
    // TODO: make async
    this.__updateMaterialHelper()
  }

  /**
   * The __updateMaterial method.
   * @private
   */
  __updateMaterialHelper() {
    const material = this.materialParam.value

    // TODO: Bind an operator
    Array.from(this.itemsParam.value).forEach((item) => {
      ;(<TreeItem>item).traverse((treeItem) => {
        if (treeItem instanceof BaseGeomItem) {
          const baseGeomItem = treeItem
          const p = baseGeomItem.materialParam
          if (material) {
            const m = p.value
            // TODO: How do we filter material assignments? this is a nasty hack.
            // but else we end up assigning surface materials to our edges.
            if (m != material && (!m || m.getShaderName() != 'LinesShader')) {
              this.__backupMaterials[p.getId()] = m
              p.setValue(material)
            }
          } else if (this.__backupMaterials[p.getId()]) {
            p.setValue(this.__backupMaterials[p.getId()])
          }
        }
      })
    })
  }
  // ////////////////////////////////////////
  // Items

  /**
   * The __bindItem method.
   * @param {BaseItem} item - The item value.
   * @param {number} index - The index value.
   * @private
   */
  bindItem(item: BaseItem, index: number) {
    super.bindItem(<TreeItem>item, index)

    if (!(item instanceof TreeItem)) return

    // ///////////////////////////////
    // Update the highlight
    if (this.isSelected()) {
      const color = this.getHighlight()
      color.a = 0.2
      const key = 'materialGroupItemHighlight' + this.getId()
      item.addHighlight(key, color, true)
    }

    // ///////////////////////////////
    // Update the Material
    const material = this.materialParam.value
    if (material) {
      // TODO: Bind an operator instead
      item.traverse((treeItem) => {
        if (treeItem instanceof BaseGeomItem) {
          const baseGeomItem = treeItem
          const p = baseGeomItem.materialParam
          if (material) {
            const m = p.value
            // TODO: How do we filter material assignments? this is a nasty hack.
            // but else we end up assigning surface materials to our edges.
            if (m != material && (!m || m.getShaderName() != 'LinesShader')) {
              this.__backupMaterials[p.getId()] = m
              p.setValue(material)
            }
          }
        }
      }, true)
    }
  }

  /**
   * The __unbindItem method.
   * @param {BaseItem} item - The item value.
   * @param {number} index - The index value.
   * @private
   */
  __unbindItem(item: BaseItem, index: number) {
    super.unbindItem(<TreeItem>item, index)
    if (!(item instanceof TreeItem)) return

    if (this.isSelected()) {
      const key = 'materialGroupItemHighlight' + this.getId()
      item.removeHighlight(key, true)
    }
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new group,
   * copies its values and returns it.
   *
   * @param {Record<string, unknown>} context - The context value.
   * @return {MaterialGroup} - Returns a new cloned group.
   */
  clone(context: Record<string, unknown>) {
    const cloned = new MaterialGroup(this.__name + 'clone')
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('MaterialGroup', MaterialGroup)

export { MaterialGroup }
