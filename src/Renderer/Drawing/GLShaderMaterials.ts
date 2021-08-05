import { EventEmitter } from '../../Utilities/index'
import { GLGeom } from './GLGeom'
import { GLGeomItem } from './GLGeomItem'
import { GLMaterial } from './GLMaterial'
import { GLMaterialGeomItemSets } from './GLMaterialGeomItemSets'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderMaterials extends EventEmitter {
  protected gl: any
  protected pass: any
  protected glShader: any
  protected glgeomdatashader: any
  protected glselectedshader: any
  protected glMaterialGeomItemSets: any[]
  /**
   * Create a GL shader material.
   * @param {WebGLRenderingContext} gl - The WebGL Context value.
   * @param {GLPass} pass - The pass that owns this GLShaderMaterials object.
   * @param {object} shaders - The shaders value.
   */
  constructor(gl: any, pass: any, shaders: any) {
    super()
    this.gl = gl
    this.pass = pass
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
  findMaterialGeomItemSets(glMaterial: GLMaterial) {
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
  addGLGeomItem(glGeomItem: GLGeomItem, glGeom: GLGeom, glMaterial: GLMaterial) {
    let glMaterialGeomItemSets = this.findMaterialGeomItemSets(glMaterial)
    if (!glMaterialGeomItemSets) {
      glMaterialGeomItemSets = new GLMaterialGeomItemSets(this.pass, glMaterial)
      this.addMaterialGeomItemSets(glMaterialGeomItemSets)
    }

    glMaterialGeomItemSets.addGLGeomItem(glGeomItem, glGeom)
  }

  /**
   * The addMaterialGeomItemSets method.
   * @param {any} glMaterialGeomItemSets - The glMaterialGeomItemSets value.
   */
  addMaterialGeomItemSets(glMaterialGeomItemSets: any) {
    this.glMaterialGeomItemSets.push(glMaterialGeomItemSets)
    const updated = () => {
      this.emit('updated')
    }
    const destructing = () => {
      glMaterialGeomItemSets.off('updated', updated)
      glMaterialGeomItemSets.off('destructing', destructing)
      const index = this.glMaterialGeomItemSets.indexOf(glMaterialGeomItemSets)
      this.glMaterialGeomItemSets.splice(index, 1)
      if (this.glMaterialGeomItemSets.length == 0) {
        // TODO: clean up the shader... maybe.
        this.emit('destructing')
      }
    }
    glMaterialGeomItemSets.on('updated', updated)
    glMaterialGeomItemSets.on('destructing', destructing)
  }

  /**
   * The removeMaterialGeomItemSets method.
   * @param {GLMaterialGeomItemSets} glMaterialGeomItemSets - The glMaterialGeomItemSets value.
   */
  removeMaterialGeomItemSets(glMaterialGeomItemSets: GLMaterialGeomItemSets) {
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
   * @param {Record<any,any>} renderstate - The render state for the current draw traversal
   */
  draw(renderstate: Record<any, any>) {
    const glShader = this.glShader
    if (!this.glShader.bind(renderstate)) return

    this.pass.renderer.glGeomItemLibrary.bind(renderstate)

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.draw(renderstate)
    }
    glShader.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   */
  drawHighlightedGeoms(renderstate: Record<any, any>) {
    if (!this.glselectedshader || !this.glselectedshader.bind(renderstate)) return

    this.pass.renderer.glGeomItemLibrary.bind(renderstate)

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.drawHighlighted(renderstate)
    }
  }

  /**
   * The drawGeomData method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: Record<any, any>) {
    if (!this.glgeomdatashader || !this.glgeomdatashader.bind(renderstate)) return

    this.pass.renderer.glGeomItemLibrary.bind(renderstate)

    const gl = this.gl
    {
      const unif = renderstate.unifs.floatGeomBuffer
      if (unif) {
        gl.uniform1i(unif.location, gl.floatGeomBuffer ? 1 : 0)
      }
    }
    {
      const unif = renderstate.unifs.passId
      if (unif) {
        gl.uniform1i(unif.location, renderstate.passIndex)
      }
    }

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.drawGeomData(renderstate)
    }
  }
}

export { GLShaderMaterials }
