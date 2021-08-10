import { Xfo } from '../../Math/Xfo'
import { TreeItem } from '../TreeItem'
import { ListParameter } from './ListParameter'
import { TreeItemParameter } from './TreeItemParameter'
import { XfoParameter } from './XfoParameter'

/** This class is deprecated. Use Groups instead.
 * Class representing a kinematic group parameter.
 * @extends ListParameter
 * @private
 */
class KinematicGroupParameter extends ListParameter {
  protected __globalXfoParams: KinematicGroupParameter[] // XfoParameter[]
  protected __initialXfos: Xfo[]
  protected __deltaXfos: Xfo[]
  protected __value: any
  protected __cleanerFn: any
  protected __name: any
  protected __dataType: any
  /**
   * Create a kinematic group parameter.
   * @param {string} name - The name of the kinematic group parameter.
   */
  constructor(name: string) {
    console.error('This class is deprecated. Use Groups instead.')
    super(name, typeof TreeItemParameter)
    this.__globalXfoParams = []
    this.__initialXfos = []
    this.__deltaXfos = []
    this.on('elementAdded', (event: any) => {
      const globaXfoParam = event.elem.getParameter('GlobalXfo')
      this.__globalXfoParams[event.index] = globaXfoParam
      this.__initialXfos[event.index] = globaXfoParam.getValue()
      if (event.index > 0)
        this.__deltaXfos[event.index] = this.__initialXfos[0].inverse().multiply(this.__initialXfos[event.index])
    })
    this.on('elementRemoved', (event: any) => {
      this.__globalXfoParams.splice(event.index, 1)
      this.__initialXfos.splice(event.index, 1)
      this.__deltaXfos.splice(event.index, 1)
    })
  }

  /**
   * The __filter method.
   * @param {any} item - The item value.
   * @return {any} - The return value.
   * @private
   */
  __filter(item: any) {
    // console.log(item.getPath())
    return !this.__value.includes(item)
  }

  /**
   * The getInitialXfo method.
   * @return {any} - The return value.
   */
  getInitialXfo() {
    if (this.__value.length > 0) return this.__initialXfos[0]
  }

  /**
   * The getXfo method.
   * @return {Xfo} - The xfo value.
   */
  getXfo() {
    if (this.__value.length > 0) return this.__value[0].getParameter('GlobalXfo').getValue()
  }

  /**
   * The getXfo method.
   * @param {Xfo} xfo - The xfo value.
   */
  setXfo(xfo: Xfo) {
    if (this.__value.length > 0) {
      this.__value[0].getParameter('GlobalXfo').setValue(xfo)
      for (let i = 1; i < this.__value.length; i++) {
        this.__value[i].getParameter('GlobalXfo').setValue(xfo.multiply(this.__deltaXfos[i]))
      }
    }
  }

  /**
   * The setDirty method.
   * @param {any} cleanerFn - The cleanerFn value.
   * @return {any} - The return value.
   */
  setDirty(cleanerFn: any): any {
    this.__cleanerFn = cleanerFn
    for (const p of this.__globalXfoParams) {
      p.setDirty(cleanerFn)
    }
    return true
  }

  /**
   * The removeCleanerFn method.
   * @param {any} cleanerFn - The cleanerFn value.
   */
  removeCleanerFn(cleanerFn: any) {
    for (const p of this.__globalXfoParams) {
      p.removeCleanerFn(cleanerFn) // TODO
      // console.warn("removeCleanerFn does not exist on ")
    }
    this.__cleanerFn = undefined
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @param {Record<any,any>} context - The context value.
   * @return {Record<any,any>} - Returns the json object.
   */
  toJSON(context: Record<any, any>) {
    // return super.toJSON(context);
    const treeItems = []
    for (const p of this.__value) treeItems.push(context.makeRelative(p.getPath()))
    return {
      treeItems,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {Record<any,any>} j - The json object this item must decode.
   * @param {Record<any,any>} context - The context value.
   */
  fromJSON(j: Record<any, any>, context: Record<any, any>) {
    if (j.treeItems == undefined) {
      console.warn('Invalid Parameter JSON')
      return
    }

    for (let i = 0; i < j.treeItems.length; i++) {
      context.resolvePath(
        j.treeItems[i],
        (treeItem: TreeItem) => {
          this.__value.push(treeItem)
          this.emit('elementAdded', {
            elem: treeItem,
            index: this.__value.length - 1,
          })
        },
        () => {
          console.warn('Unable to resolve Kinematic Group Member:' + j.paramPath)
        }
      )
    }
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new kinematic group parameter,
   * copies its values from this parameter and returns it.
   * @return {FilePathParameter} - Returns a new cloned kinematic group parameter.
   */
  clone() {
    // const clonedParam = new KinematicGroupParameter(this.__name, clonedValue, this.__dataType)
    const clonedParam = new KinematicGroupParameter(this.__name) // TODO: check for correctness/intention
    return clonedParam
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    for (let i = 0; i < this.__value.length; i++) {
      this.removeElement(i)
    }
  }
}

export { KinematicGroupParameter }