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
    this.geomItemSets = []
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
      for (const glGeomItemSet of this.geomItemSets) {
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
    if (!this.geomItemSets.includes(geomItemSet)) {
      this.geomItemSets.push(geomItemSet)
      geomItemSet.on('drawCountChanged', this.__drawCountChanged)
      geomItemSet.on('destructing', () => {
        geomItemSet.off('drawCountChanged', this.__drawCountChanged)

        const index = this.geomItemSets.indexOf(geomItemSet)
        this.geomItemSets.splice(index, 1)
        if (this.geomItemSets.length == 0) {
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
    } else {
      console.warn('geomItemSet already added to GLMaterialGeomItemSets')
    }
  }

  /**
   * The removeGeomItemSet method.
   * @param {any} geomItemSet - The geomItemSet value.
   */
  removeGeomItemSet(geomItemSet) {
    const index = this.geomItemSets.indexOf(geomItemSet)
    this.geomItemSets.splice(index, 1)
    geomItemSet.off('drawCountChanged', this.__drawCountChanged)
  }

  /**
   * The removeGeomItemSet method.
   * @param {any} glgeom - The glgeom value.
   * @return {any} - The return value.
   */
  findGeomItemSet(glgeom) {
    for (const geomItemSet of this.geomItemSets) {
      if (geomItemSet.getGLGeom() == glgeom) return geomItemSet
    }
    return null
  }

  /**
   * The getGeomItemSets method.
   * @return {any} - The return value.
   */
  getGeomItemSets() {
    return this.geomItemSets
  }
}

export { GLMaterialGeomItemSets }
