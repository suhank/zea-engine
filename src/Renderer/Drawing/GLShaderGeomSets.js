/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { GeomItem, Points, Lines, Mesh, PointsProxy, LinesProxy, MeshProxy } from '../../SceneTree/index'
import { GLMeshSet, GLLinesSet, GLPointsSet } from '../Drawing/index.js'
import { GLMaterialLibrary } from '../GLMaterialLibrary.js'
import { GLPass } from '../Passes/GLPass'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderGeomSets extends EventEmitter {
  /**
   * Create a GL shader material.
   * @param {GLPass} pass - The pass that owns this object.
   * @param {WebGL2RenderingContext} gl - The glShader value.
   * @param {object} shaders - The shader value.
   */
  constructor(pass, gl, shaders) {
    super()
    this.pass = pass
    this.gl = gl
    this.shaderAttrSpec = {}
    this.glShader = shaders.glShader
    this.glGeomDataShader = shaders.glgeomdatashader
    this.glHighlightShader = shaders.glselectedshader
    this.glGeomSets = {}
    this.glMaterialLibrary = new GLMaterialLibrary(gl)
    this.glMaterialLibrary.on('updated', () => {
      this.emit('updated')
    })
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
      glGeomSet = new GLMeshSet(this.gl, this.shaderAttrSpec)
      this.glGeomSets['GLMesh'] = glGeomSet
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      if (this.glGeomSets['GLLines']) return this.glGeomSets['GLLines']
      glGeomSet = new GLLinesSet(this.gl, this.shaderAttrSpec)
      this.glGeomSets['GLLines'] = glGeomSet
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      if (this.glGeomSets['GLPoints']) return this.glGeomSets['GLPoints']
      glGeomSet = new GLPointsSet(this.gl, this.shaderAttrSpec)
      this.glGeomSets['GLPoints'] = glGeomSet
    } else {
      throw new Error('Unsupported geom type:' + geom.constructor.name)
    }
    //  else      return

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
    const geomItem = glGeomItem.geomItem
    const geom = geomItem.getParameter('Geometry').getValue()

    let glGeomSet = geom.getMetadata('glGeomSet')
    if (!glGeomSet) {
      glGeomSet = this.getOrCreateGLGeomSet(geom)
    }
    if (!glGeomSet) return

    glGeomSet.addGLGeomItem(glGeomItem)

    const material = glGeomItem.geomItem.getParameter('Material').getValue()
    this.glMaterialLibrary.addMaterial(material)
    const geomItemParamChanged = (event) => {
      if (geom instanceof Lines || geom instanceof Points || geom instanceof PointsProxy || geom instanceof LinesProxy)
        return
      material.off('transparencyChanged', geomItemParamChanged)
      geomItem.getParameter('Material').off('valueChanged', geomItemParamChanged)
      geomItem.getParameter('Geometry').off('valueChanged', geomItemParamChanged)
      // Note: the pass will remove the glgeomitem from the
      //  GLGeomItemSet which is owned by the GLGeomSet.
      this.pass.removeGeomItem(geomItem)
      this.pass.__renderer.assignTreeItemToGLPass(geomItem)
    }
    material.on('transparencyChanged', geomItemParamChanged)
    geomItem.getParameter('Material').on('valueChanged', geomItemParamChanged)
    geomItem.getParameter('Geometry').on('valueChanged', geomItemParamChanged)
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
      throw new Error('Unable to bind shader:' + glShader)
    }

    const gl = renderstate.gl
    const unifs = renderstate.unifs

    const drawItemsTexture = renderstate.drawItemsTexture
    if (drawItemsTexture && unifs.instancesTexture) {
      drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture)
      gl.uniform1i(unifs.instancesTextureSize.location, drawItemsTexture.width)
    }

    this.glMaterialLibrary.bind(renderstate)
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
    this.bindShader(this.glShader, renderstate, 'multidraw-draw')

    for (const elementType in this.glGeomSets) {
      this.glGeomSets[elementType].draw(renderstate)
    }

    this.glShader.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {object} renderstate - The object tracking the current state of the renderer
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
   * @param {object} renderstate - The object tracking the current state of the renderer
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

    this.glGeomDataShader.unbind(renderstate)
  }
}

export { GLShaderGeomSets }
