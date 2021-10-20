/* eslint-disable no-unused-vars */
import { Vec4, Color, Box3, Xfo } from '../../Math/index'
import { Registry } from '../../Registry'
import { BooleanParameter, Vec4Parameter, XfoParameter } from '../Parameters/index'
import { Material } from '../Material'
import { GeomItem } from '../GeomItem'
import { BaseGroup } from './BaseGroup'
import { TreeItem } from '../TreeItem'
import { Plane } from '../Geometry/Shapes/Plane'
import { Rect } from '../Geometry/Shapes/Rect'
import { BaseGeomItem } from '../BaseGeomItem'
import { CuttingPlaneOperator } from '../Operators/CuttingPlaneOperator'
import { BaseItem } from '../BaseItem'

/**
 * Groups are a special type of `BaseGroup` that allows you to gather/classify/organize/modify
 * multiple items contained within the group. Items can be added to the group directly, or using
 * its path.
 * All parameters set to the group are also set to the children; in other words, it's a faster way
 * to apply common things to multiple items.
 *
 * **Parameters**
 * * **CutAwayEnabled(`BooleanParameter`):** _todo_
 * * **CutPlaneNormal(`Vec3Parameter`):** _todo_
 * * **CutPlaneDist(`NumberParameter`):** _todo_
 *
 * @extends BaseGroup
 */
class CuttingPlane extends BaseGroup {
  cutPlaneOp: CuttingPlaneOperator
  /**
   * Creates an instance of a group.
   *
   * @param {string} name - The name of the group.
   */
  constructor(name: string = '') {
    super(name)

    const booleanParam = new BooleanParameter('CutAwayEnabled', false)
    const vec4Parameter = new Vec4Parameter('CutPlane', new Vec4(1, 0, 0))
    booleanParam.on('valueChanged', (event) => {
      this.__updateCutaway(event)
    })
    vec4Parameter.on('vec4Parameter', (event) => {
      this.__updateCutaway(event)
    })
    this.addParameter(booleanParam)
    this.addParameter(vec4Parameter)

    this.cutPlaneOp = new CuttingPlaneOperator(
      <XfoParameter>this.getParameter('GlobalXfo'),
      <XfoParameter>this.getParameter('CutPlane')
    )

    // Create the geometry to display the plane.
    const material = new Material('plane', 'FlatSurfaceShader')
    material.getParameter('BaseColor')!.setValue(new Color(1, 1, 1, 0.2))
    const plane = new GeomItem(`PlaneGeom`, new Plane(1, 1), material)
    plane.setSelectable(false) // used to be: plane.getSelectable(false)
    this.addChild(plane)

    const borderMaterial = new Material('border', 'LinesShader')
    borderMaterial.getParameter('BaseColor')!.setValue(new Color(1, 0, 0, 1))
    const border = new GeomItem(`BorderGeom`, new Rect(1, 1), borderMaterial)
    border.setSelectable(false) // used to be: border.getSelectable(false)
    this.addChild(border)
  }

  // ////////////////////////////////////////
  // Cutaways

  /**
   * The __updateCutaway method.
   * @param {TreeITem} item - The item in the group.
   * @private
   */
  __updateCutaway(item: TreeItem): void {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.

    // TODO: make async
    this.__updateCutawayHelper(item)
    // setTimeout(() => {}, 0)
  }

  /**
   * The __updateCutaway method.
   * @param {TreeITem} item - The item in the group.
   * @private
   */
  __updateCutawayHelper(item: TreeItem): void {
    const cutEnabled = this.getParameter('CutAwayEnabled')!.getValue()
    const cutPlane = this.getParameter('CutPlane')!.getValue()
    const cutAwayVector = cutPlane.xyz
    const cutAwayDist = cutPlane.w

    if (item instanceof BaseGeomItem) {
      item.setCutawayEnabled(cutEnabled)
      item.setCutVector(cutAwayVector)
      item.setCutDist(cutAwayDist)
    } else {
      Array.from(this.__itemsParam.getValue()).forEach((item: any) => {
        item.traverse((item: any) => {
          if (item instanceof BaseGeomItem) {
            item.setCutawayEnabled(cutEnabled)
            item.setCutVector(cutAwayVector)
            item.setCutDist(cutAwayDist)
          }
        }, true)
      })
    }
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
    if (!(item instanceof TreeItem)) return

    // ///////////////////////////////
    // Update the item cutaway
    const cutEnabled = this.getParameter('CutAwayEnabled')!.getValue()
    if (cutEnabled) {
      this.__updateCutaway(item)
    }

    const bbox = new Box3()
    // const xfo = this.getParameter('GlobalXfo')!.getValue()
    // const invxfo = xfo.inverse()
    Array.from(this.__itemsParam.getValue()).forEach((item) => {
      if (item instanceof TreeItem) {
        // const itemxfo = invxfo.multiply(item.getParameter('GlobalXfo')!.getValue())
        // bbox.addBox3(item.getParameter('BoundingBox')!.getValue(), itemxfo.toMat4())
        bbox.addBox3(item.getParameter('BoundingBox')!.getValue())
      }
    })
    {
      const sizex = bbox.p1.x - bbox.p0.x
      const sizey = bbox.p1.y - bbox.p0.y
      const xfo = new Xfo()
      xfo.sc.set(sizex, sizey, 1)
      this.getChild(0).getParameter('LocalXfo')!.setValue(xfo)
      this.getChild(1).getParameter('LocalXfo')!.setValue(xfo)
      // this.getParameter('GlobalXfo')!.setValue(xfo)
    }
  }

  /**
   * The unbindItem method.
   * @param {BaseItem} item - The item value.
   * @param {number} index - The index value.
   * @private
   */
  unbindItem(item: BaseItem, index: number) {
    if (!(item instanceof TreeItem)) return

    // ///////////////////////////////
    // Update the item cutaway
    item.traverse((treeItem) => {
      if (treeItem instanceof BaseGeomItem) {
        treeItem.setCutawayEnabled(false)
      }
    }, true)
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new group,
   * copies its values and returns it.
   *
   * @param {Record<any,any>} context - The context value.
   * @return {CuttingPlane} - Returns a new cloned group.
   */
  clone(context: Record<string, any>): CuttingPlane {
    const cloned = new CuttingPlane()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('CuttingPlane', CuttingPlane)

export { CuttingPlane }