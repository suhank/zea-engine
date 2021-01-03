import { PassType } from './GLPass.js'
import { GLStandardGeomsPass } from './GLStandardGeomsPass.js'
import { GLRenderer } from '../GLRenderer.js'

import { MathFunctions } from '../../Utilities/MathFunctions'
import { GeomItem, Material, Mesh, MeshProxy } from '../../SceneTree/index.js'
import { GLShaderMaterials } from '../Drawing/GLShaderMaterials.js'
import { GLShaderGeomSets } from '../Drawing/GLShaderGeomSets.js'

/** Class representing a GL opaque geoms pass.
 * @extends GLStandardGeomsPass
 * @private
 */
class GLOpaqueGeomsPass extends GLStandardGeomsPass {
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
   * @param {any} renderer - The renderer value.
   * @param {any} passIndex - The passIndex value.
   */
  init(renderer, passIndex) {
    super.init(renderer, passIndex)
  }

  // ///////////////////////////////////
  // Bind to Render Tree

  /**
   * The filterGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {boolean} - The return value.
   */
  filterGeomItem(geomItem) {
    const material = geomItem.getParameter('Material').getValue()
    return this.checkMaterial(material)
  }

  /**
   * Checks the material to see if it is not transparent.
   * @param {Material} material - The geomItem value.
   * @return {boolean} - The return value.
   */
  checkMaterial(material) {
    const shaderClass = material.getShaderClass()
    if (shaderClass) {
      if (shaderClass.isTransparent()) return false
      if (shaderClass.isOverlay()) return false

      const baseColorParam = material.getParameter('BaseColor')
      if (baseColorParam && baseColorParam.getValue().a < 1.0) {
        return false
      }

      const opacityParam = material.getParameter('Opacity')
      if (opacityParam && opacityParam.getValue() < 1.0) {
        return false
      }

      return true
    }
    return false
  }

  /**
   * Removes the GeomITem from this pass, and then asks the renderer to re-add it.
   * @param {GeomItem} geomItem - The geomItem value.
   */
  removeAndReAddGeomItem(geomItem) {
    this.removeGeomItem(geomItem)
    this.__renderer.assignTreeItemToGLPass(geomItem)
  }

  /**
   * The addGeomItem method.
   * @param {any} geomItem - The geomItem value.
   * @return {boolean} - The return value.
   */
  addGeomItem(geomItem) {
    if (this.__gl.multiDrawElementsInstanced) {
      const geom = geomItem.getParameter('Geometry').getValue()
      if (geom instanceof Mesh || geom instanceof MeshProxy) {
        const materialParam = geomItem.getParameter('Material')
        const material = materialParam.getValue()
        const shaderName = material.getShaderName()

        let glShaderGeomSets = this.__glShaderGeomSets[shaderName]
        if (!glShaderGeomSets) {
          const shaders = this.constructShaders(shaderName)
          glShaderGeomSets = new GLShaderGeomSets(this.__gl, shaders)
          glShaderGeomSets.on('updated', () => {
            this.__renderer.requestRedraw()
          })
          this.__glShaderGeomSets[shaderName] = glShaderGeomSets
        }

        const glGeomItem = this.constructGLGeomItem(geomItem)
        glShaderGeomSets.addGLGeomItem(glGeomItem)
        return true
      }
    }

    const glGeom = this.constructGLGeom(geomItem.getParameter('Geometry').getValue())

    const glGeomItem = this.constructGLGeomItem(geomItem)

    const materialParam = geomItem.getParameter('Material')
    const material = materialParam.getValue()

    // ////////////////////////////////////
    // Tracking Material Transparency changes...
    // In the case that a geometry material changes, we may need to
    // select a different pass. e.g. if the new material is transparent.

    const materialChanged = () => {
      this.removeGeomItem(geomItem)
      this.__renderer.assignTreeItemToGLPass(geomItem)
    }
    materialParam.on('valueChanged', materialChanged)
    geomItem.setMetadata('materialChanged', materialChanged)

    // ////////////////////////////////////
    // Shaders
    const shaderName = material.getShaderName()
    const glMaterial = this.constructGLMaterial(material)

    let glshaderMaterials = this.__glshadermaterials[shaderName]
    if (!glshaderMaterials) {
      const shaders = this.constructShaders(shaderName)
      glshaderMaterials = new GLShaderMaterials(this.__gl, this, shaders)
      this.__glshadermaterials[shaderName] = glshaderMaterials
    }

    glshaderMaterials.addGLGeomItem(glGeomItem, glGeom, glMaterial)

    // let glMaterialGeomItemSets = glshaderMaterials.findMaterialGeomItemSets(glMaterial)
    // if (!glMaterialGeomItemSets) {
    //   glMaterialGeomItemSets = new GLMaterialGeomItemSets(this, glMaterial)
    //   glshaderMaterials.addMaterialGeomItemSets(glMaterialGeomItemSets)
    // }

    // let geomItemSet = glMaterialGeomItemSets.findGeomItemSet(glGeomItem.glGeom)
    // if (!geomItemSet) {
    //   geomItemSet = new GLGeomItemSet(this.__gl, glGeomItem.glGeom)
    //   glMaterialGeomItemSets.addGeomItemSet(geomItemSet)
    // }

    // geomItem.setMetadata('geomItemSet', geomItemSet)

    // geomItemSet.addGLGeomItem(glGeomItem)

    return true
  }

  /**
   * The removeGeomItem method.
   * @param {any} geomItem - The geomItem value.
   * @return {boolean} - The return value.
   */
  removeGeomItem(geomItem) {
    const glGeomItem = super.removeGeomItem(geomItem)
    if (!glGeomItem) return false

    const geomItemSet = geomItem.getMetadata('geomItemSet')
    if (geomItemSet) {
      // Note: for now leave the material and geom in place. Multiple
      // GeomItems can reference a given material/geom, so we simply wait
      // for them to be destroyed.
      geomItemSet.removeGeomItem(glGeomItem)
      geomItem.deleteMetadata('geomItemSet')
    }

    const materialParam = geomItem.getParameter('Material')
    const materialChanged = geomItem.getMetadata('materialChanged')
    if (materialParam && materialChanged) {
      materialParam.off('valueChanged', materialChanged)
      geomItem.deleteMetadata('materialChanged')
    }

    return true
  }

  /**
   * The removeMaterial method.
   * @param {any} material - The material value.
   */
  removeMaterial(material) {
    const glshaderMaterials = this.__glshadermaterials[material.hash]
    if (!glshaderMaterials || glshaderMaterials != material.getMetadata('glshaderMaterials')) {
      console.warn('Material not found in pass')
      return
    }

    const glMaterialGeomItemSets = material.getMetadata('glMaterialGeomItemSets')
    glshaderMaterials.removeMaterialGeomItemSets(glMaterialGeomItemSets)
  }

  /**
   * The __traverseTreeAndDraw method.
   * @param {object} renderstate - The renderstate value.
   * @private
   */
  __traverseTreeAndDraw(renderstate) {
    renderstate.drawItemsTexture = this.__drawItemsTexture

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
   * @param {any} renderstate - The renderstate value.
   */
  draw(renderstate) {
    if (this.newItemsReadyForLoading()) this.finalize()
    renderstate.drawItemsTexture = this.__drawItemsTexture

    const gl = this.__gl
    gl.disable(gl.BLEND)

    if (true)
      // 2-sided rendering.
      gl.disable(gl.CULL_FACE)
    // 2-sided rendering.
    else {
      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)
    }

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LESS)
    gl.depthMask(true)

    this.__traverseTreeAndDraw(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
    const gl = this.__gl
    gl.disable(gl.CULL_FACE) // 2-sided rendering.

    renderstate.drawItemsTexture = this.__drawItemsTexture

    if (this.__gl.multiDrawElementsInstanced) {
      // eslint-disable-next-line guard-for-in
      for (const shaderName in this.__glShaderGeomSets) {
        this.__glShaderGeomSets[shaderName].drawHighlightedGeoms(renderstate)
      }
    } else {
      // eslint-disable-next-line guard-for-in
      for (const shaderName in this.__glshadermaterials) {
        const glshaderMaterials = this.__glshadermaterials[shaderName]
        glshaderMaterials.drawHighlightedGeoms(renderstate)
      }
    }

    if (renderstate.glGeom) {
      renderstate.glGeom.unbind(renderstate)
    }
  }

  /**
   * The getGeomItemAndDist method.
   * @param {any} geomData - The geomData value.
   * @return {any} - The return value.
   */
  getGeomItemAndDist(geomData) {
    let itemId
    let dist
    const gl = this.__gl
    if (gl.floatGeomBuffer) {
      itemId = Math.round(geomData[1])
      dist = geomData[3]
    } else {
      itemId = geomData[0] + ((geomData[1] & 63) << 8)
      dist = MathFunctions.decode16BitFloatFrom2xUInt8([geomData[2], geomData[3]])
    }

    const glGeomItem = this.__drawItems[itemId]
    if (glGeomItem) {
      return {
        geomItem: glGeomItem.getGeomItem(),
        dist,
      }
    }
  }

  /**
   * The drawGeomData method.
   * @param {any} renderstate - The renderstate value.
   */
  drawGeomData(renderstate) {
    if (this.newItemsReadyForLoading()) this.finalize()
    renderstate.drawItemsTexture = this.__drawItemsTexture

    renderstate.passIndex = this.__passIndex

    const gl = this.__gl
    gl.disable(gl.BLEND)
    gl.disable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LESS)
    gl.depthMask(true)

    if (this.__gl.multiDrawElementsInstanced) {
      // eslint-disable-next-line guard-for-in
      for (const shaderName in this.__glShaderGeomSets) {
        this.__glShaderGeomSets[shaderName].drawGeomData(renderstate)
      }
    } else {
      // eslint-disable-next-line guard-for-in
      for (const shaderName in this.__glshadermaterials) {
        const glshaderMaterials = this.__glshadermaterials[shaderName]
        glshaderMaterials.drawGeomData(renderstate)
      }
    }

    if (renderstate.glGeom) {
      renderstate.glGeom.unbind(renderstate)
    }
  }
}

GLRenderer.registerPass(GLOpaqueGeomsPass, PassType.OPAQUE)

export { GLOpaqueGeomsPass }
