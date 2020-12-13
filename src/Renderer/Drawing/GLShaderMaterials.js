import { EventEmitter } from '../../Utilities/index'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderMaterials extends EventEmitter {
  /**
   * Create a GL shader material.
   * @param {any} glShader - The glShader value.
   * @param {any} glgeomdatashader - The glgeomdatashader value.
   * @param {any} glselectedshader - The glselectedshader value.
   */
  constructor(shaders) {
    super()
    this.glShader = shaders.glShader
    this.glgeomdatashader = shaders.glgeomdatashader
    this.glselectedshader = shaders.glselectedshader
    this.glMaterialGeomItemSets = []
  }

  /**
   * The findMaterialGeomItemSets method.
   * @param {any} glMaterial - The glMaterial value.
   * @return {any} - The return value.
   */
  findMaterialGeomItemSets(glMaterial) {
    for (const matGeomItemSet of this.glMaterialGeomItemSets) {
      if (matGeomItemSet.glMaterial == glMaterial) return matGeomItemSet
    }
  }

  addGLGeomItem(glGeomItem, glGeom, glMaterial) {
    let glMaterialGeomItemSets = this.findMaterialGeomItemSets(glMaterial)
    if (!glMaterialGeomItemSets) {
      glMaterialGeomItemSets = new GLMaterialGeomItemSets(this, glMaterial)
      this.addMaterialGeomItemSets(glMaterialGeomItemSets)
    }

    glMaterialGeomItemSets.addGLGeomItem(glGeomItem, glGeom)
  }

  /**
   * The addMaterialGeomItemSets method.
   * @param {any} glMaterialGeomItemSets - The glMaterialGeomItemSets value.
   */
  addMaterialGeomItemSets(glMaterialGeomItemSets) {
    this.glMaterialGeomItemSets.push(glMaterialGeomItemSets)
    glMaterialGeomItemSets.on('destructing', () => {
      const index = this.glMaterialGeomItemSets.indexOf(glMaterialGeomItemSets)
      this.glMaterialGeomItemSets.splice(index, 1)
      if (this.glMaterialGeomItemSets.length == 0) {
        // TODO: clean up the shader... maybe.
        this.emit('destructing')
      }
    })
  }

  /**
   * The removeMaterialGeomItemSets method.
   * @param {any} glMaterialGeomItemSets - The glMaterialGeomItemSets value.
   */
  removeMaterialGeomItemSets(glMaterialGeomItemSets) {
    const index = this.glMaterialGeomItemSets.indexOf(glMaterialGeomItemSets)
    this.glMaterialGeomItemSets.splice(index, 1)
  }

  /**
   * The getMaterialGeomItemSets method.
   * @return {any} - The return value.
   */
  getMaterialGeomItemSets() {
    return this.glMaterialGeomItemSets
  }
}

export { GLShaderMaterials }
