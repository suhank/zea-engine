/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { GLOpaqueGeomsPass } from '../Passes'
import { RenderState, GeomDataRenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
import { GLGeom } from './GLGeom'
import { GLGeomItem } from './GLGeomItem'
import { GLGeomItemSet } from './GLGeomItemSet'
import { GLMaterial } from './GLMaterial'

/** Class representing GL material geom item sets.
 * @private
 */
class GLMaterialGeomItemSets extends EventEmitter {
  protected pass: GLOpaqueGeomsPass // TODO: check, used to be GLPass
  protected __gl: WebGL12RenderingContext
  glMaterial: GLMaterial
  protected glGeomItemSets: Record<string, any> = {}
  protected drawCount: number
  /**
   * Create a GL material geom item set.
   * @param pass - The pass that owns the GLMaterialGeomItemSets.
   * @param glMaterial - The glMaterial value.
   */
  constructor(pass: GLOpaqueGeomsPass, glMaterial: GLMaterial) {
    super()
    this.pass = pass
    this.__gl = pass.renderer!.gl
    this.glMaterial = glMaterial
    this.glGeomItemSets = {}
    this.drawCount = 0

    const material = glMaterial.getMaterial()
    const materialChanged = (event: Record<string, any>) => {
      material.off('transparencyChanged', materialChanged)
      for (const key in this.glGeomItemSets) {
        const glGeomItemSet = this.glGeomItemSets[key]
        for (const glGeomItem of glGeomItemSet.glGeomItems) {
          const geomItem = glGeomItem.geomItem
          this.pass.removeGeomItem(geomItem)
          this.pass.renderer!.assignTreeItemToGLPass(geomItem)
        }
      }
    }
    material.on('transparencyChanged', materialChanged)
  }

  /**
   * The getGLMaterial method.
   * @return - The return value.
   */
  getGLMaterial() {
    return this.glMaterial
  }

  /**
   * The addGLGeomItem method.
   * @param glGeomItem - The glGeomItem value.
   * @param glGeom - The glGeomItem value.
   * @private
   */
  addGLGeomItem(glGeomItem: GLGeomItem, glGeom: GLGeom) {
    const id = glGeom.getGeom().getId()
    let geomItemSet = this.glGeomItemSets[id]
    if (!geomItemSet) {
      geomItemSet = new GLGeomItemSet(this.__gl, glGeom)
      this.addGeomItemSet(geomItemSet)
    }
    geomItemSet.addGLGeomItem(glGeomItem)
  }

  /**
   * The drawCountChanged method.
   * @param event - The change value.
   * @private
   */
  drawCountChanged(event: Record<string, any>) {
    this.drawCount += event.change
    this.emit('updated')
  }

  /**
   * The __materialChanged method.
   * @private
   */
  __materialChanged() {
    const material = this.glMaterial.getMaterial()
    if (!this.pass.checkMaterial(material)) {
      for (const key in this.glGeomItemSets) {
        const glGeomItemSet = this.glGeomItemSets[key]
        for (const glGeomItem of glGeomItemSet.glGeomItems) {
          const geomItem = glGeomItem.geomItem
          this.pass.removeGeomItem(geomItem)
          this.pass.renderer!.assignTreeItemToGLPass(geomItem)
        }
      }
    }
  }

  /**
   * The addGeomItemSet method.
   * @param glGeomItemSet - The glGeomItemSet value.
   */
  addGeomItemSet(glGeomItemSet: any) {
    const id = glGeomItemSet.getGLGeom().getGeom().getId()
    this.glGeomItemSets[id] = glGeomItemSet
    const listenerID = glGeomItemSet.on('drawCountChanged', (event: any) => {
      this.drawCountChanged(event)
    })
    glGeomItemSet.once('destructing', () => {
      glGeomItemSet.removeListenerById('drawCountChanged', listenerID)
      delete this.glGeomItemSets[id]
      if (Object.keys(this.glGeomItemSets).length == 0) {
        // Remove the listeners.
        // const material = this.glMaterial.getMaterial()
        // const baseColorParam = material.getParameter('BaseColor')
        // if (baseColorParam) {
        //   baseColorParam.off('valueChanged', this.__materialChanged)
        // }
        // const opacityParam = material.getParameter('Opacity')
        // if (opacityParam) {
        //   opacityParam.off('valueChanged', this.__materialChanged)
        // }

        this.emit('destructing')
      }
    })
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGeomItemSet
   * @param renderstate - The render state for the current draw traversal
   */
  draw(renderstate: RenderState) {
    if (this.drawCount == 0) return
    const warnMissingUnifs = true
    this.glMaterial.bind(renderstate, warnMissingUnifs)
    for (const key in this.glGeomItemSets) {
      const glGeomItemSet = this.glGeomItemSets[key]
      glGeomItemSet.draw(renderstate)
    }
  }

  /**
   * The drawHighlighted method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate: RenderState) {
    this.glMaterial.bind(renderstate, false)
    for (const key in this.glGeomItemSets) {
      const glGeomItemSet = this.glGeomItemSets[key]
      glGeomItemSet.drawHighlighted(renderstate)
    }
  }

  /**
   * The drawHighlightedGeoms method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState) {
    this.glMaterial.bind(renderstate, false)
    for (const key in this.glGeomItemSets) {
      const glGeomItemSet = this.glGeomItemSets[key]
      glGeomItemSet.draw(renderstate)
    }
  }
}

export { GLMaterialGeomItemSets }
