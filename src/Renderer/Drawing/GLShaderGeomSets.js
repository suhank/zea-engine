/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { GeomItem, Points, Lines, Mesh, PointsProxy, LinesProxy, MeshProxy } from '../../SceneTree/index'
import { GLLinesItemSet } from '../Drawing/GLLinesItemSet.js'
import { GLPointsItemSet } from '../Drawing/GLPointsItemSet.js'
import { GLMeshItemSet } from '../Drawing/GLMeshItemSet.js'

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
    // this.shaderAttrSpec = {}
    this.glShader = shaders.glShader
    this.glGeomDataShader = shaders.glgeomdatashader
    this.glHighlightShader = shaders.glselectedshader
    this.glGeomItemSets = {}
  }

  /**
   * Given a GeomItem, constructs the GLGeomItemSet that handles drawing that type of geometry.
   * @param {BaseGeom} geom - The geomitem value.
   * @return {GLGeomItemSet} - The return value.
   * */
  getOrCreateGLGeomItemSet(geom) {
    let glGeomItemSet
    if (geom instanceof Mesh || geom instanceof MeshProxy) {
      if (this.glGeomItemSets['GLMesh']) return this.glGeomItemSets['GLMesh']
      glGeomItemSet = new GLMeshItemSet(this.pass.renderer)
      this.glGeomItemSets['GLMesh'] = glGeomItemSet
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      if (this.glGeomItemSets['GLLines']) return this.glGeomItemSets['GLLines']
      glGeomItemSet = new GLLinesItemSet(this.pass.renderer)
      this.glGeomItemSets['GLLines'] = glGeomItemSet
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      if (this.glGeomItemSets['GLPoints']) return this.glGeomItemSets['GLPoints']
      glGeomItemSet = new GLPointsItemSet(this.pass.renderer)
      this.glGeomItemSets['GLPoints'] = glGeomItemSet
    } else {
      throw new Error('Unsupported geom type:' + geom.constructor.name)
    }

    geom.setMetadata('glGeomItemSet', glGeomItemSet)
    glGeomItemSet.on('updated', () => {
      this.emit('updated')
    })
    return glGeomItemSet
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    const geomItem = glGeomItem.geomItem
    const geom = geomItem.getParameter('Geometry').getValue()
    const material = glGeomItem.geomItem.getParameter('Material').getValue()
    // this.glMaterialLibrary.addMaterial(material)
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

    const glGeomItemSet = this.getOrCreateGLGeomItemSet(geom)
    glGeomItemSet.addGLGeomItem(glGeomItem)
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

    this.pass.renderer.glGeomItemLibrary.bind(renderstate)
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
    this.bindShader(this.glShader, renderstate, 'multidraw-draw')

    for (const elementType in this.glGeomItemSets) {
      this.glGeomItemSets[elementType].draw(renderstate)
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

    for (const elementType in this.glGeomItemSets) {
      this.glGeomItemSets[elementType].drawHighlighted(renderstate)
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

    for (const elementType in this.glGeomItemSets) {
      this.glGeomItemSets[elementType].draw(renderstate)
    }

    this.glGeomDataShader.unbind(renderstate)
  }
}

export { GLShaderGeomSets }
