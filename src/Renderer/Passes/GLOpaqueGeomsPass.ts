import { PassType } from './GLPass'
import { GLStandardGeomsPass } from './GLStandardGeomsPass'
import { GLRenderer } from '../GLRenderer'

import { GeomItem, Material } from '../../SceneTree/index'
import { GLShaderMaterials } from '../Drawing/GLShaderMaterials'
import { GLShaderGeomSets } from '../Drawing/GLShaderGeomSets'
import { GLMaterialGeomItemSets } from '../Drawing/GLMaterialGeomItemSets'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { GLGeomItem } from '../Drawing'
import { RenderState, GeomDataRenderState, ColorRenderState } from '../types/renderer'

/** Class representing a GL opaque geoms pass.
 * @extends GLStandardGeomsPass
 * @private
 */
class GLOpaqueGeomsPass extends GLStandardGeomsPass {
  protected __glshadermaterials: Record<string, GLShaderMaterials>
  protected __glShaderGeomSets: Record<string, GLShaderGeomSets>
  /**
   * Create a GL opaque geoms pass.
   */
  constructor() {
    super()

    // Optimized Render Tree
    // Structured like so for efficient render traversial.
    // {GLShaders}[GLMaterials][GLGeoms][GLGeomItems]
    this.__glshadermaterials = {}
    this.__glShaderGeomSets = {}
  }

  /**
   * The init method.
   * @param renderer - The renderer value.
   * @param passIndex - The index of the pass in the GLBAseRenderer
   */
  init(renderer: GLBaseRenderer, passIndex: number): void {
    super.init(renderer, passIndex)
  }

  /**
   * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
   * @return - The pass type value.
   */
  getPassType(): number {
    return PassType.OPAQUE
  }

  // ///////////////////////////////////
  // Bind to Render Tree

  /**
   * The filterGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The return value.
   */
  filterGeomItem(geomItem: GeomItem): boolean {
    const material = geomItem.materialParam.value
    return this.checkMaterial(material)
  }

  /**
   * Checks the material to see if it is not transparent.
   * @param material - The geomItem value.
   * @return - The return value.
   */
  checkMaterial(material: Material): boolean {
    return !material.isTransparent()
  }

  /**
   * Removes the GeomITem from this pass, and then asks the renderer to re-add it.
   * @param geomItem - The geomItem value.
   */
  removeAndReAddGeomItem(geomItem: GeomItem): void {
    this.removeGeomItem(geomItem)
    this.__renderer!.assignTreeItemToGLPass(geomItem)
  }

  /**
   * The addGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The return value.
   */
  addGeomItem(geomItem: GeomItem): boolean {
    const materialParam = geomItem.materialParam
    const material = materialParam.value
    const glGeomLibrary = this.renderer!.glGeomLibrary
    const glGeomItemLibrary = this.renderer!.glGeomItemLibrary

    if (!material.isTextured()) {
      if (material.getShaderClass().supportsInstancing()) {
        const shaderName = material.getShaderName()
        let glShaderGeomSets = this.__glShaderGeomSets[shaderName]
        if (!glShaderGeomSets) {
          const shaders = this.constructShaders(shaderName)
          glShaderGeomSets = new GLShaderGeomSets(this, this.__gl!, shaders)
          glShaderGeomSets.on('updated', () => {
            this.__renderer!.requestRedraw()
          })
          this.__glShaderGeomSets[shaderName] = glShaderGeomSets
        }

        // const glGeomItem = this.constructGLGeomItem(geomItem)
        const glGeomItem = <Record<string, any>>this.renderer!.glGeomItemLibrary.getGLGeomItem(geomItem)
        glShaderGeomSets.addGLGeomItem(<GLGeomItem>glGeomItem)

        glGeomItem.GLShaderGeomSets = glShaderGeomSets
        this.emit('updated')
        return true
      }
    }

    const glGeom = glGeomLibrary.constructGLGeom(geomItem.geomParam.value)
    const glGeomItem = glGeomItemLibrary.getGLGeomItem(geomItem)!

    // ////////////////////////////////////
    // Tracking Material Transparency changes...
    // In the case that a geometry material changes, we may need to
    // select a different pass. e.g. if the new material is transparent.

    const materialChanged = () => {
      this.removeGeomItem(geomItem)
      this.__renderer!.assignTreeItemToGLPass(geomItem)
    }
    materialParam.on('valueChanged', materialChanged)
    ;(<Record<string, any>>glGeomItem).materialChanged = materialChanged

    // ////////////////////////////////////
    // Shaders
    const shaderName = material.getShaderName()
    const glMaterial = this.renderer!.glMaterialLibrary.getGLMaterial(material)

    let glshaderMaterials = this.__glshadermaterials[shaderName]
    if (!glshaderMaterials) {
      const shaders = this.constructShaders(shaderName)
      glshaderMaterials = new GLShaderMaterials(this.__gl!, this, shaders)
      this.__glshadermaterials[shaderName] = glshaderMaterials

      glshaderMaterials.on('updated', () => {
        this.__renderer!.requestRedraw()
      })
    }

    glshaderMaterials.addGLGeomItem(glGeomItem, glGeom, glMaterial)

    return true
  }

  /**
   * The removeGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The return value.
   */
  removeGeomItem(geomItem: GeomItem): boolean {
    const glGeomItem = (<Record<string, any>>this).renderer.glGeomItemLibrary.getGLGeomItem(geomItem)

    if (glGeomItem.GLShaderGeomSets) {
      const glShaderGeomSets = glGeomItem.GLShaderGeomSets
      glShaderGeomSets.removeGLGeomItem(glGeomItem)
      glGeomItem.GLShaderGeomSets = null
      return true
    }

    const materialParam = geomItem.materialParam
    const materialChanged = glGeomItem.materialChanged
    if (materialParam && materialChanged) {
      materialParam.off('valueChanged', materialChanged)
      glGeomItem.materialChanged = null
    }

    if (glGeomItem.GLGeomItemSet) {
      const glGeomItemSet = glGeomItem.GLGeomItemSet
      glGeomItemSet.removeGLGeomItem(glGeomItem)
      glGeomItem.GLGeomItemSet = null
      return true
    }

    return true
  }

  /**
   * The removeMaterial method.
   * @param material - The material value.
   */
  removeMaterial(material: Material): void {
    const shaderName = material.getShaderName()
    const glshaderMaterials = this.__glshadermaterials[shaderName]
    if (!glshaderMaterials || glshaderMaterials != material.getMetadata('glshaderMaterials')) {
      console.warn('Material not found in pass')
      return
    }

    const glMaterialGeomItemSets = <GLMaterialGeomItemSets>material.getMetadata('glMaterialGeomItemSets')
    glshaderMaterials.removeMaterialGeomItemSets(glMaterialGeomItemSets)
  }

  /**
   * The __traverseTreeAndDraw method.
   * @param renderstate - The renderstate value.
   * @private
   */
  __traverseTreeAndDraw(renderstate: ColorRenderState): void {
    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__glShaderGeomSets) {
      this.__glShaderGeomSets[shaderName].draw(renderstate)
    }
    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__glshadermaterials) {
      this.__glshadermaterials[shaderName].draw(renderstate)
    }

    if (renderstate.glGeom) {
      renderstate.glGeom.unbind(renderstate)
    }
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: ColorRenderState): void {
    const gl = this.__gl!
    gl.disable(gl.BLEND)

    // Note: our zcad files can contain surfaces with flipped normals.
    // This is due to re-using geoms on various sides of a mesh, while applying
    // a -1 scale on one of the axes to flip. We need 2-sided rendering enabled
    // by default.
    if (true) {
      // 2-sided rendering.
      gl.disable(gl.CULL_FACE)
    } else {
      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)
    }

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    this.__traverseTreeAndDraw(renderstate)

    renderstate.viewport.drawSilhouettes(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawHighlightedGeoms(renderstate: RenderState): void {
    const gl = this.__gl!
    gl.disable(gl.CULL_FACE) // 2-sided rendering.

    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__glShaderGeomSets) {
      this.__glShaderGeomSets[shaderName].drawHighlightedGeoms(renderstate)
    }
    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__glshadermaterials) {
      const glshaderMaterials = this.__glshadermaterials[shaderName]
      glshaderMaterials.drawHighlightedGeoms(renderstate)
    }

    if (renderstate.glGeom) {
      renderstate.glGeom.unbind(renderstate)
    }
  }

  /**
   * The drawGeomData method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState): void {
    renderstate.passIndex = this.passIndex

    const gl = this.__gl!
    gl.disable(gl.BLEND)
    gl.disable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__glShaderGeomSets) {
      this.__glShaderGeomSets[shaderName].drawGeomData(renderstate)
    }
    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__glshadermaterials) {
      const glshaderMaterials = this.__glshadermaterials[shaderName]
      glshaderMaterials.drawGeomData(renderstate)
    }

    if (renderstate.glGeom) {
      renderstate.glGeom.unbind(renderstate)
    }
  }
}

GLRenderer.registerPass(GLOpaqueGeomsPass, PassType.OPAQUE)

export { GLOpaqueGeomsPass }
