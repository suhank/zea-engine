import { EventEmitter } from '../../Utilities/index'
import { GLGeomItem } from './GLGeomItem'

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
   * @param {GLMaterial} glMaterial - The glMaterial value.
   * @return {boolean} - The return value.
   */
  findMaterialGeomItemSets(glMaterial) {
    for (const matGeomItemSet of this.glMaterialGeomItemSets) {
      if (matGeomItemSet.glMaterial == glMaterial) return matGeomItemSet
    }
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   * @param {GLGeom} glGeom - The glGeomItem value.
   * @param {GLMaterial} glMaterial - The glMaterial value.
   */
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
   * @param {GLMaterialGeomItemSets} glMaterialGeomItemSets - The glMaterialGeomItemSets value.
   */
  removeMaterialGeomItemSets(glMaterialGeomItemSets) {
    const index = this.glMaterialGeomItemSets.indexOf(glMaterialGeomItemSets)
    this.glMaterialGeomItemSets.splice(index, 1)
  }

  /**
   * The getMaterialGeomItemSets method.
   * @return {GLMaterialGeomItemSets} - The return value.
   */
  getMaterialGeomItemSets() {
    return this.glMaterialGeomItemSets
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLMaterialGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  bindDrawItemsTexture(renderstate) {
    const gl = renderstate.gl
    const unifs = renderstate.unifs
    const drawItemsTexture = renderstate.drawItemsTexture
    if (drawItemsTexture && unifs.instancesTexture) {
      drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture)
      gl.uniform1i(unifs.instancesTextureSize.location, drawItemsTexture.width)
    }
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLMaterialGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
    const glShader = this.glShader
    if (!this.glShader.bind(renderstate)) return
    this.bindDrawItemsTexture(renderstate)

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.draw(renderstate)
    }
    glShader.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
    if (!this.glselectedshader || !this.glselectedshader.bind(renderstate)) return
    this.bindDrawItemsTexture(renderstate)

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.drawHighlighted(renderstate)
    }
  }

  /**
   * The drawGeomData method.
   * @param {any} renderstate - The renderstate value.
   */
  drawGeomData(renderstate) {
    if (!this.glgeomdatashader || !this.glgeomdatashader.bind(renderstate)) return
    this.bindDrawItemsTexture(renderstate)

    {
      const unif = renderstate.unifs.floatGeomBuffer
      if (unif) {
        gl.uniform1i(unif.location, gl.floatGeomBuffer ? 1 : 0)
      }
    }
    {
      const unif = renderstate.unifs.passId
      if (unif) {
        gl.uniform1i(unif.location, this.__passIndex)
      }
    }

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.drawGeomData(renderstate)
    }
  }
}

export { GLShaderMaterials }
