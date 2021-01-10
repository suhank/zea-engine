/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { GeomItem, Points, Lines, Mesh, PointsProxy, LinesProxy, MeshProxy } from '../../SceneTree/index'
import { GLMeshSet, GLLinesSet, GLPointsSet } from '../Drawing/index.js'
import { GLMaterialLibrary } from '../GLMaterialLibrary.js'

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
    this.glGeomDataShader = shaders.glgeomdatashader
    this.glHighlightShader = shaders.glselectedshader
    this.glGeomSets = {}
    this.glMaterialLibrary = new GLMaterialLibrary(gl)
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
      this.emit('updated')
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

    const material = glGeomItem.geomItem.getParameter('Material').getValue()
    this.glMaterialLibrary.addMaterial(material)
  }

  /**
   * Binds one of its shaders for rendering, and also the other textures and values needed.
   * @param {object} glShader - The shader to bind
   * @param {object} renderstate - The render state for the current draw traversal
   * @param {string} key - The key to use to cache the shader binding.
   * @private
   */
  bindShader(glShader, renderstate, key) {
    if (!glShader.isCompiledForTarget(key)) {
      renderstate.shaderopts.directives.push('#define ENABLE_MULTI_DRAW 1\n#extension GL_ANGLE_multi_draw : enable')
      glShader.compileForTarget(key, renderstate.shaderopts)
      renderstate.shaderopts.directives.pop()
    }

    if (!glShader.bind(renderstate, key)) {
      return false
    }

    const gl = renderstate.gl
    const unifs = renderstate.unifs

    const drawItemsTexture = renderstate.drawItemsTexture
    if (drawItemsTexture && unifs.instancesTexture) {
      drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture)
      gl.uniform1i(unifs.instancesTextureSize.location, drawItemsTexture.width)
    }

    this.glMaterialLibrary.bind(renderstate)
    return true
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
    if (!this.bindShader(this.glShader, renderstate, 'multidraw')) {
      return
    }

    for (const elementType in this.glGeomSets) {
      this.glGeomSets[elementType].draw(renderstate)
    }

    this.glShader.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
    if (!this.glHighlightShader) return
    this.bindShader(this.glHighlightShader, renderstate, 'multidraw-highlight')

    for (const elementType in this.glGeomSets) {
      this.glGeomSets[elementType].drawHighlightedGeoms(renderstate)
    }
    this.glHighlightShader.unbind(renderstate)
  }

  /**
   * The drawGeomData method.
   * @param {any} renderstate - The renderstate value.
   */
  drawGeomData(renderstate) {
    if (!this.glGeomDataShader) return
    this.bindShader(this.glGeomDataShader, renderstate, 'multidraw-geomdata')

    const gl = renderstate.gl
    const unifs = renderstate.unifs
    if (unifs.floatGeomBuffer) {
      gl.uniform1i(unifs.floatGeomBuffer.location, 1)
    }
    if (unifs.passId) {
      gl.uniform1i(unifs.passId.location, renderstate.passIndex)
    }

    for (const elementType in this.glGeomSets) {
      this.glGeomSets[elementType].drawGeomData(renderstate)
    }
  }
}

export { GLShaderGeomSets }
