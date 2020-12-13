import { EventEmitter } from '../../Utilities/index'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderMaterials extends EventEmitter {
  /**
   * Create a GL shader material.
   * @param {any} glshader - The glshader value.
   * @param {any} glgeomdatashader - The glgeomdatashader value.
   * @param {any} glselectedshader - The glselectedshader value.
   */
  constructor(shaders) {
    super()
    this.glshader = shaders.glshader
    this.glgeomdatashader = shaders.glgeomdatashader
    this.glselectedshader = shaders.glselectedshader
    this.glmaterialGeomItemSets = []
  }

  /**
   * The findMaterialGeomItemSets method.
   * @param {any} glmaterial - The glmaterial value.
   * @return {any} - The return value.
   */
  findMaterialGeomItemSets(glmaterial) {
    for (const matGeomItemSet of this.glmaterialGeomItemSets) {
      if (matGeomItemSet.glmaterial == glmaterial) return matGeomItemSet
    }
  }

  addGeomItem(glgeomItem, glGeom, glmaterial) {
    let glmaterialGeomItemSets = this.findMaterialGeomItemSets(glmaterial)
    if (!glmaterialGeomItemSets) {
      glmaterialGeomItemSets = new GLMaterialGeomItemSets(this, glmaterial)
      this.addMaterialGeomItemSets(glmaterialGeomItemSets)
    }

    glmaterialGeomItemSets.addGeomItem(glgeomItem, glGeom)
  }

  /**
   * The addMaterialGeomItemSets method.
   * @param {any} glmaterialGeomItemSets - The glmaterialGeomItemSets value.
   */
  addMaterialGeomItemSets(glmaterialGeomItemSets) {
    this.glmaterialGeomItemSets.push(glmaterialGeomItemSets)
    glmaterialGeomItemSets.on('destructing', () => {
      const index = this.glmaterialGeomItemSets.indexOf(glmaterialGeomItemSets)
      this.glmaterialGeomItemSets.splice(index, 1)
      if (this.glmaterialGeomItemSets.length == 0) {
        // TODO: clean up the shader... maybe.
        this.emit('destructing')
      }
    })
  }

  /**
   * The removeMaterialGeomItemSets method.
   * @param {any} glmaterialGeomItemSets - The glmaterialGeomItemSets value.
   */
  removeMaterialGeomItemSets(glmaterialGeomItemSets) {
    const index = this.glmaterialGeomItemSets.indexOf(glmaterialGeomItemSets)
    this.glmaterialGeomItemSets.splice(index, 1)
  }

  /**
   * The getMaterialGeomItemSets method.
   * @return {any} - The return value.
   */
  getMaterialGeomItemSets() {
    return this.glmaterialGeomItemSets
  }
}

export { GLShaderMaterials }
