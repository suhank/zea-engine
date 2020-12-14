/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { GeomItem, Points, Lines, Mesh, PointsProxy, LinesProxy, MeshProxy } from '../../SceneTree/index'
import { GLMeshSet, GLGeomItem } from '../Drawing/index.js'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderGeomSets extends EventEmitter {
  /**
   * Create a GL shader material.
   * @param {WebGL2RenderingContext} gl - The glShader value.
   * @param {object} shaders - The shader value.
   */
  constructor(gl, shaders) {
    super()
    this.__gl = gl
    this.shaderAttrSpec = {}
    this.glShader = shaders.glShader
    this.glgeomdatashader = shaders.glgeomdatashader
    this.glselectedshader = shaders.glselectedshader
    this.glGeomSets = {}
    // this.glMaterialLibrary = new GLMaterialLibrary()
  }

  /**
   * Given a BaseGeom, constructs the GLGeom that manages the state of the geometry in the GPU.
   * @param {BaseGeom} geom - The geom value.
   * @return {GLGeom} - The return value.
   */
  getOrCreateGLGeomSet(geom) {
    let glGeomSet
    if (geom instanceof Mesh || geom instanceof MeshProxy) {
      if (this.glGeomSets['GLMesh']) return this.glGeomSets['GLMesh']
      glGeomSet = new GLMeshSet(this.__gl, this.shaderAttrSpec)
      this.glGeomSets['GLMesh'] = glGeomSet
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      if (this.glGeomSets['GLLines']) return this.glGeomSets['GLLines']
      glGeomSet = new GLLinesSet(this.__gl, this.shaderAttrSpec)
      this.glGeomSets['GLLines'] = glGeomSet
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      if (this.glGeomSets['GLPoints']) return this.glGeomSets['GLPoints']
      glGeomSet = new GLPointsSet(this.__gl, this.shaderAttrSpec)
      this.glGeomSets['GLPoints'] = glGeomSet
    } else {
      throw new Error('Unsupported geom type:' + geom.constructor.name)
    }

    geom.setMetadata('glGeomSet', glGeomSet)
    glGeomSet.on('updated', () => {
      this.__renderer.requestRedraw()
    })
    return glGeomSet
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    const geom = glGeomItem.geomItem.getParameter('Geometry').getValue()

    let glGeomSet = geom.getMetadata('glGeomSet')
    if (!glGeomSet) {
      glGeomSet = this.getOrCreateGLGeomSet(geom)
    }

    glGeomSet.addGLGeomItem(glGeomItem)

    // const materialParam = geomItem.getParameter('Material')
    // const material = materialParam.getValue()

    // new GLGeomSetGeomItemSets(glGeomSet)
    // glMaterialGeomItemSets.addGLGeomItem(glGeomItem, glGeom)
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
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
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
    const glShader = this.glShader
    if (!this.glShader.bind(renderstate)) return
    this.bindDrawItemsTexture(renderstate)

    for (const elementType in this.glGeomSets) {
      this.glGeomSets[elementType].draw(renderstate)
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

    for (const elementType in this.glGeomSets) {
      this.glGeomSets[elementType].drawHighlighted(renderstate)
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

    for (const elementType in this.glGeomSets) {
      this.glGeomSets[elementType].drawGeomData(renderstate)
    }
  }
}

export { GLShaderGeomSets }
