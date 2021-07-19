/* eslint-disable no-unused-vars */
import { Registry } from '../../Registry'
import { BaseGroup } from './BaseGroup'
import { MaterialParameter } from '../Parameters/MaterialParameter'
import { TreeItem } from '../TreeItem'

import { Parameter } from '../Parameters/Parameter'
import { Material } from '../../SceneTree/Material'
import { Color } from '../../Math/Color'
import { CodeParameter } from '../Parameters'
import { BaseItem } from '../BaseItem'
import { ParameterOwner } from '../ParameterOwner'
/**
 *
 * **Parameters**
 * * **Material(`MaterialParameter`):** _todo_
 *
 * @extends BaseGroup
 */
class MaterialGroup extends BaseGroup {
  __materialParam: Parameter<Material> // or MaterialParameter?
  name: string
  /**
   * Creates an instance of a group.
   *
   * @param {string} name - The name of the group.
   */

  constructor(name: string) {
    super(name)
    this.name = name
    this.__materialParam = this.addParameter(new MaterialParameter('Material'))
    this.__materialParam.on('valueChanged', () => {
      this.__updateMaterial()
    })
  }

  // /////////////////////////////

  /**
   * The __updateHighlight method.
   * @private
   */
  __updateHighlight() {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.
    const highlight = new Promise((resolve) => {
      let highlighted = false
      let color: Color | undefined = this.getHighlight()
      if (this.isSelected()) {
        highlighted = true
        if (color) {
          color.a = 0.2
        } else {
          console.warn('color is undefined')
        }
      }

      const key = 'kinematicGroupItemHighlight' + this.getId()
      Array.from(this.__itemsParam.getValue()).forEach((item) => {
        if (item instanceof TreeItem) {
          if (highlighted && color) item.addHighlight(key, color, true)
          else item.removeHighlight(key, true)
        }
      })
      resolve(highlight)
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
    const update = new Promise((resolve) => {
      //const material = this.getParameter('Material').getValue()
      let material: Material
      const paramMaterial = this.getParameter('Material')
      if (paramMaterial) {
        material = paramMaterial.getValue()
      } else {
        console.warn('cannot set Material, paramMaterial is null')
      }

      // TODO: Bind an operator
      Array.from(this.__itemsParam.getValue()).forEach((item) => {
        ;(<TreeItem>item).traverse((treeItem) => {
          if (treeItem instanceof TreeItem && treeItem.hasParameter('Material')) {
            const p: Parameter<Material> | null = treeItem.getParameter('Material')
            // TODO:(refactor?) since getParameter can return null, we need to do this check.
            if (p) {
              if (material) {
                const m = p.getValue()

                // TODO: How do we filter material assignments? this is a nasty hack.
                // but else we end up assigning surface materials to our edges.
                if (m != material && (!m || m.getShaderName() != 'LinesShader')) {
                  p.__backupMaterial = m
                  p.setValue(material)
                }
              } else if (p.__backupMaterial) {
                p.setValue(p.__backupMaterial)
              }
            } else {
              console.warn('p: Parameter<Material> is null')
            }
          }
        })
      })
      resolve(update)
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
  __bindItem(item: BaseItem, index: number) {
    super.bindItem(<TreeItem>item, index)

    if (!(item instanceof TreeItem)) return

    // ///////////////////////////////
    // Update the highlight
    const hightlight = this.getHighlight()
    if (this.isSelected()) {
      const color = this.getHighlight()
      if (color) {
        color.a = 0.2
      } else {
        console.warn('color is undefined')
      }
      const key = 'materialGroupItemHighlight' + this.getId()
      if (color) item.addHighlight(key, color, true)
    }

    // ///////////////////////////////
    // Update the Material
    let material: Material
    const paramMaterial = this.getParameter('Material')
    if (!paramMaterial) {
      console.error('paramMaterial is null')
      return
    }
    material = paramMaterial.getValue()
    if (material) {
      // TODO: Bind an operator instead
      item.traverse((treeItem) => {
        if (treeItem instanceof TreeItem && treeItem.hasParameter('Material')) {
          const p = treeItem.getParameter('Material')
          if (material && p) {
            const m = p.getValue()
            // TODO: How do we filter material assignments? this is a nasty hack.
            // but else we end up assigning surface materials to our edges.
            if (m != material && (!m || m.getShaderName() != 'LinesShader')) {
              p.__backupMaterial = m
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
   * @param {object} context - The context value.
   * @return {MaterialGroup} - Returns a new cloned group.
   */
  clone(context: object) {
    const cloned = new MaterialGroup(this.name + 'clone')
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('MaterialGroup', MaterialGroup) // TODO: MaterialGroup current doesn't extend baseclass

export { MaterialGroup }
