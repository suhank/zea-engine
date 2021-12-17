import { EventEmitter } from '../../Utilities/index'
import { GLShader } from '../GLShader'
import { GLPass } from '../Passes'
import { RenderState, GeomDataRenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
import { GLGeom } from './GLGeom'
import { GLGeomItem } from './GLGeomItem'
import { GLMaterial } from './GLMaterial'
import { GLMaterialGeomItemSets } from './GLMaterialGeomItemSets'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderMaterials extends EventEmitter {
  protected gl: WebGL12RenderingContext
  protected pass: any
  protected glShader: GLShader
  protected glgeomdatashader: any
  protected glselectedshader: any
  protected glMaterialGeomItemSets: any[]
  /**
   * Create a GL shader material.
   * @param gl - The WebGL Context value.
   * @param pass - The pass that owns this GLShaderMaterials object.
   * @param shaders - The shaders value.
   */
  constructor(gl: WebGL12RenderingContext, pass: GLPass, shaders: Record<string, any>) {
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
   * @param glMaterial - The glMaterial value.
   * @return - The return value.
   */
  findMaterialGeomItemSets(glMaterial: GLMaterial) {
    for (const matGeomItemSet of this.glMaterialGeomItemSets) {
      if (matGeomItemSet.glMaterial == glMaterial) return matGeomItemSet
    }
  }

  /**
   * The addGLGeomItem method.
   * @param glGeomItem - The glGeomItem value.
   * @param glGeom - The glGeomItem value.
   * @param glMaterial - The glMaterial value.
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
   * @param glMaterialGeomItemSets - The glMaterialGeomItemSets value.
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
   * @param glMaterialGeomItemSets - The glMaterialGeomItemSets value.
   */
  removeMaterialGeomItemSets(glMaterialGeomItemSets: GLMaterialGeomItemSets) {
    const index = this.glMaterialGeomItemSets.indexOf(glMaterialGeomItemSets)
    this.glMaterialGeomItemSets.splice(index, 1)
  }

  /**
   * The getMaterialGeomItemSets method.
   * @return - The return value.
   */
  getMaterialGeomItemSets() {
    return this.glMaterialGeomItemSets
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLMaterialGeomItemSets
   * @param renderstate - The render state for the current draw traversal
   */
  draw(renderstate: RenderState) {
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
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawHighlightedGeoms(renderstate: RenderState) {
    if (!this.glselectedshader || !this.glselectedshader.bind(renderstate, 'highlight')) return

    this.pass.renderer.glGeomItemLibrary.bind(renderstate)

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.drawHighlighted(renderstate)
    }
  }

  /**
   * The drawGeomData method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState) {
    if (!this.glgeomdatashader || !this.glgeomdatashader.bind(renderstate, 'geomData')) return

    this.pass.renderer.glGeomItemLibrary.bind(renderstate)

    const gl = this.gl

    const { floatGeomBuffer, passId } = renderstate.unifs
    if (floatGeomBuffer) {
      gl.uniform1i(floatGeomBuffer.location, renderstate.floatGeomBuffer ? 1 : 0)
    }
    if (passId) {
      gl.uniform1i(passId.location, renderstate.passIndex)
    }

    for (const glMaterialGeomItemSet of this.glMaterialGeomItemSets) {
      glMaterialGeomItemSet.drawGeomData(renderstate)
    }
  }
}

export { GLShaderMaterials }
