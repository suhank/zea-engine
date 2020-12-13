import { PassType } from './GLPass.js'
import { GLStandardGeomsPass } from './GLStandardGeomsPass.js'
import { GLRenderer } from '../GLRenderer.js'

import { GLGeomItemSet } from '../Drawing/GLGeomItemSet.js'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GeomItem, Material } from '../../SceneTree/index.js'
import { GLShaderMaterials, GLMaterialGeomItemSets } from '../Drawing/index.js'

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
    const shaders = this.constructShaders(shaderName)
    // let glshader = shaders.glshader
    // let glgeomdatashader = shaders.glgeomdatashader
    // let glselectedshader = shaders.glselectedshader
    // const glshader = this.__renderer.getOrCreateShader(shaderName)
    // if (glshader.constructor.getGeomDataShaderName())
    //   glgeomdatashader = this.__renderer.getOrCreateShader(
    //     glshader.constructor.getGeomDataShaderName()
    //   )
    // if (glshader.constructor.getSelectedShaderName())
    //   glselectedshader = this.__renderer.getOrCreateShader(
    //     glshader.constructor.getSelectedShaderName()
    //   )
    const glmaterial = this.addMaterial(material)
    const glgeomItem = super.addGeomItem(geomItem)

    let glshaderMaterials = this.__glshadermaterials[shaderName]
    if (!glshaderMaterials) {
      glshaderMaterials = new GLShaderMaterials(shaders)
      this.__glshadermaterials[shaderName] = glshaderMaterials
    }

    // let glmaterialGeomItemSets = glshaderMaterials.findMaterialGeomItemSets(glmaterial)
    // if (!glmaterialGeomItemSets) {
    //   glmaterialGeomItemSets = new GLMaterialGeomItemSets(this, glmaterial)
    //   glshaderMaterials.addMaterialGeomItemSets(glmaterialGeomItemSets)
    // }

    // let geomItemSet = glmaterialGeomItemSets.findGeomItemSet(glgeomItem.glGeom)
    // if (!geomItemSet) {
    //   geomItemSet = new GLGeomItemSet(this.__gl, glgeomItem.glGeom)
    //   glmaterialGeomItemSets.addGeomItemSet(geomItemSet)
    // }

    // geomItem.setMetadata('geomItemSet', geomItemSet)

    // geomItemSet.addGeomItem(glgeomItem)

    return true
  }

  /**
   * The removeGeomItem method.
   * @param {any} geomItem - The geomItem value.
   * @return {boolean} - The return value.
   */
  removeGeomItem(geomItem) {
    const glgeomItem = super.removeGeomItem(geomItem)
    if (!glgeomItem) return false

    const geomItemSet = geomItem.getMetadata('geomItemSet')
    if (geomItemSet) {
      // Note: for now leave the material and geom in place. Multiple
      // GeomItems can reference a given material/geom, so we simply wait
      // for them to be destroyed.
      geomItemSet.removeGeomItem(glgeomItem)
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

    const glmaterialGeomItemSets = material.getMetadata('glmaterialGeomItemSets')
    glshaderMaterials.removeMaterialGeomItemSets(glmaterialGeomItemSets)
  }

  /**
   * The __traverseTreeAndDraw method.
   * @param {any} renderstate - The renderstate value.
   * @private
   */
  __traverseTreeAndDraw(renderstate) {
    for (const shaderName in this.__glshadermaterials) {
      const glshaderMaterials = this.__glshadermaterials[shaderName]
      const glshader = glshaderMaterials.glshader
      if (this.bindShader(renderstate, glshader)) {
        const glmaterialGeomItemSets = glshaderMaterials.getMaterialGeomItemSets()
        for (const glmaterialGeomItemSet of glmaterialGeomItemSets) {
          if (glmaterialGeomItemSet.drawCount == 0) continue
          if (this.bindMaterial(renderstate, glmaterialGeomItemSet.getGLMaterial(), true)) {
            const glgeomitemsets = glmaterialGeomItemSet.getGeomItemSets()
            for (const gldrawitemset of glgeomitemsets) {
              gldrawitemset.draw(renderstate)
            }
          }
        }
      }
      glshader.unbind(renderstate)
    }

    if (renderstate.glgeom) {
      renderstate.glgeom.unbind(renderstate)
    }
  }

  /**
   * The draw method.
   * @param {any} renderstate - The renderstate value.
   */
  draw(renderstate) {
    if (this.newItemsReadyForLoading()) this.finalize()

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

    // for (let glshaderMaterials of this.__glshadermaterials) {
    for (const shaderName in this.__glshadermaterials) {
      const glshaderMaterials = this.__glshadermaterials[shaderName]
      if (!glshaderMaterials.glselectedshader) continue
      if (!this.bindShader(renderstate, glshaderMaterials.glselectedshader)) continue

      const glmaterialGeomItemSets = glshaderMaterials.getMaterialGeomItemSets()
      for (const glmaterialGeomItemSet of glmaterialGeomItemSets) {
        const glgeomitemsets = glmaterialGeomItemSet.getGeomItemSets()
        for (const gldrawitemset of glgeomitemsets) {
          gldrawitemset.drawHighlighted(renderstate)
        }
      }
    }

    if (renderstate.glgeom) {
      renderstate.glgeom.unbind(renderstate)
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

    const glgeomItem = this.__drawItems[itemId]
    if (glgeomItem) {
      return {
        geomItem: glgeomItem.getGeomItem(),
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

    const gl = this.__gl
    gl.disable(gl.BLEND)
    gl.disable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LESS)
    gl.depthMask(true)

    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__glshadermaterials) {
      const glshaderMaterials = this.__glshadermaterials[shaderName]
      if (!glshaderMaterials.glgeomdatashader) continue
      if (!this.bindShader(renderstate, glshaderMaterials.glgeomdatashader)) continue

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

      const glmaterialGeomItemSets = glshaderMaterials.getMaterialGeomItemSets()
      for (const glmaterialGeomItemSet of glmaterialGeomItemSets) {
        if (glmaterialGeomItemSet.drawCount == 0) continue
        const material = glmaterialGeomItemSet.getGLMaterial().getMaterial()
        if (!material.visibleInGeomDataBuffer) continue
        // Sometimes materials contain params required for rendering.
        // e.g. PointSize.
        // Note: avoid generating warnings for missing uniforms.
        if (this.bindMaterial(renderstate, glmaterialGeomItemSet.getGLMaterial(), false)) {
          const glgeomitemsets = glmaterialGeomItemSet.getGeomItemSets()
          for (const gldrawitemset of glgeomitemsets) {
            gldrawitemset.draw(renderstate)
          }
        }
      }
    }

    if (renderstate.glgeom) {
      renderstate.glgeom.unbind(renderstate)
    }
  }
}

GLRenderer.registerPass(GLOpaqueGeomsPass, PassType.OPAQUE)

export { GLOpaqueGeomsPass }
