/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { GLGeomItemSet } from './GLGeomItemSet'

/** Class representing GL material geom item sets.
 * @private
 */
class GLMaterialGeomItemSets extends EventEmitter {
  /**
   * Create a GL material geom item set.
   * @param {GLPass} pass - The pass that owns the GLMaterialGeomItemSets.
   * @param {GLMaterial} glMaterial - The glMaterial value.
   */
  constructor(pass, glMaterial = undefined) {
    super()
    this.pass = pass
    this.__gl = pass.__gl
    this.glMaterial = glMaterial
    this.glGeomItemSets = {}
    this.drawCount = 0
    this.drawCountChanged = this.drawCountChanged.bind(this)

    const material = glMaterial.getMaterial()
    const materialChanged = (event) => {
      material.off('transparencyChanged', materialChanged)
      for (const key in this.glGeomItemSets) {
        const glGeomItemSet = this.glGeomItemSets[key]
        for (const glGeomItem of glGeomItemSet.glGeomItems) {
          const geomItem = glGeomItem.geomItem
          this.pass.removeGeomItem(geomItem)
          this.pass.__renderer.assignTreeItemToGLPass(geomItem)
        }
      }
    }
    material.on('transparencyChanged', materialChanged)
  }

  /**
   * The getGLMaterial method.
   * @return {any} - The return value.
   */
  getGLMaterial() {
    return this.glMaterial
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   * @param {GLGeom} glGeom - The glGeomItem value.
   * @private
   */
  addGLGeomItem(glGeomItem, glGeom) {
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
   * @param {Event} event - The change value.
   * @private
   */
  drawCountChanged(event) {
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
          this.pass.__renderer.assignTreeItemToGLPass(geomItem)
        }
      }
    }
  }

  /**
   * The addGeomItemSet method.
   * @param {any} glGeomItemSet - The glGeomItemSet value.
   */
  addGeomItemSet(glGeomItemSet) {
    const id = glGeomItemSet.getGLGeom().getGeom().getId()
    this.glGeomItemSets[id] = glGeomItemSet
    glGeomItemSet.on('drawCountChanged', this.drawCountChanged)
    glGeomItemSet.on('destructing', () => {
      glGeomItemSet.off('drawCountChanged', this.drawCountChanged)

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
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
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
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate) {
    this.glMaterial.bind(renderstate, false)
    for (const key in this.glGeomItemSets) {
      const glGeomItemSet = this.glGeomItemSets[key]
      glGeomItemSet.drawHighlighted(renderstate)
    }
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate) {
    this.glMaterial.bind(renderstate, false)
    for (const key in this.glGeomItemSets) {
      const glGeomItemSet = this.glGeomItemSets[key]
      glGeomItemSet.draw(renderstate)
    }
  }
}

export { GLMaterialGeomItemSets }
