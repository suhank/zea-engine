import { EventEmitter } from '../../Utilities/index'

/** Class representing GL material geom item sets.
 * @private
 */
class GLMaterialGeomItemSets extends EventEmitter {
  /**
   * Create a GL material geom item set.
   * @param {any} glMaterial - The glMaterial value.
   */
  constructor(pass, glMaterial = undefined) {
    super()
    this.pass = pass
    this.glMaterial = glMaterial
    this.glGeomItemSets = []
    this.drawCount = 0
    this.visibleInGeomDataBuffer = glMaterial.getMaterial().visibleInGeomDataBuffer
    this.__drawCountChanged = this.__drawCountChanged.bind(this)

    this.__materialChanged = this.__materialChanged.bind(this)
    const material = glMaterial.getMaterial()
    const baseColorParam = material.getParameter('BaseColor')
    if (baseColorParam) {
      baseColorParam.on('valueChanged', this.__materialChanged)
    }
    const opacityParam = material.getParameter('Opacity')
    if (opacityParam) {
      opacityParam.on('valueChanged', this.__materialChanged)
    }
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
    let geomItemSet = this.findGeomItemSet(glGeom)
    if (!geomItemSet) {
      geomItemSet = new GLGeomItemSet(this.__gl, glGeom)
      this.addGeomItemSet(geomItemSet)
    }
    geomItemSet.addGLGeomItem(glGeomItem)
  }

  /**
   * The __drawCountChanged method.
   * @param {any} change - The change value.
   * @private
   */
  __drawCountChanged(change) {
    this.drawCount += change.count
  }

  /**
   * The __materialChanged method.
   * @private
   */
  __materialChanged() {
    const material = this.glMaterial.getMaterial()
    if (!this.pass.checkMaterial(material)) {
      for (const glGeomItemSet of this.glGeomItemSets) {
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
   * @param {any} geomItemSet - The geomItemSet value.
   */
  addGeomItemSet(geomItemSet) {
    this.glGeomItemSets.push(geomItemSet)
    geomItemSet.on('drawCountChanged', this.__drawCountChanged)
    geomItemSet.on('destructing', () => {
      geomItemSet.off('drawCountChanged', this.__drawCountChanged)

      const index = this.glGeomItemSets.indexOf(geomItemSet)
      this.glGeomItemSets.splice(index, 1)
      if (this.glGeomItemSets.length == 0) {
        // Remove the listeners.
        const material = this.glMaterial.getMaterial()
        const baseColorParam = material.getParameter('BaseColor')
        if (baseColorParam) {
          baseColorParam.off('valueChanged', this.__materialChanged)
        }
        const opacityParam = material.getParameter('Opacity')
        if (opacityParam) {
          opacityParam.off('valueChanged', this.__materialChanged)
        }

        this.emit('destructing')
      }
    })
  }

  /**
   * The removeGeomItemSet method.
   * @param {any} geomItemSet - The geomItemSet value.
   */
  removeGeomItemSet(geomItemSet) {
    const index = this.glGeomItemSets.indexOf(geomItemSet)
    this.glGeomItemSets.splice(index, 1)
    geomItemSet.off('drawCountChanged', this.__drawCountChanged)
  }

  /**
   * Finds a GeomItemSet using a glGeom
   * @param {any} glGeom - The glGeom value.
   * @return {any} - The return value.
   */
  findGeomItemSet(glGeom) {
    for (const geomItemSet of this.glGeomItemSets) {
      if (geomItemSet.getGLGeom() == glGeom) return geomItemSet
    }
    return null
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGeomItemSet
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
    if (this.drawCount == 0) return
    this.glMaterial.bind(renderstate, warnMissingUnifs)
    for (const glGeomItemSet of this.glGeomItemSets) {
      glGeomItemSet.draw(renderstate)
    }
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
    const gl = this.__gl
    gl.disable(gl.CULL_FACE) // 2-sided rendering.

    if (!this.glselectedshader || !this.glselectedshader.bind(renderstate) || !this.bindDrawItemsTexture(renderstate))
      return

    for (const glGeomItemSet of this.glGeomItemSets) {
      glGeomItemSet.drawHighlighted(renderstate)
    }
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawGeomData(renderstate) {
    const gl = this.__gl
    gl.disable(gl.CULL_FACE) // 2-sided rendering.

    if (!this.glgeomdatashader || !this.glgeomdatashader.bind(renderstate) || !this.bindDrawItemsTexture(renderstate))
      return

    for (const glGeomItemSet of this.glGeomItemSets) {
      glGeomItemSet.drawGeomData(renderstate)
    }
  }
}

export { GLMaterialGeomItemSets }
