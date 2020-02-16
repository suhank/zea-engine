import { EventEmitter } from '../Utilities'

import '../SceneTree/GeomItem.js'

const GLGeomItemChangeType = {
  GEOMITEM_CHANGED: 0,
  GEOM_CHANGED: 1,
  VISIBILITY_CHANGED: 2,
  HIGHLIGHT_CHANGED: 3,
}

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 */
class GLGeomItem extends EventEmitter {
  /**
   * Create a GL geom item.
   * @param {any} gl - The gl value.
   * @param {any} geomItem - The geomItem value.
   * @param {any} glGeom - The glGeom value.
   * @param {any} id - The id value.
   * @param {number} flags - The flags value.
   */
  constructor(gl, geomItem, glGeom, id, flags = null) {
    super()
    this.gl = gl
    this.geomItem = geomItem
    this.glGeom = glGeom
    this.id = id
    this.flags = flags
    this.visible = this.geomItem.getVisible()
    this.culled = false

    // if(glGeom.__numTriangles) {
    //   numSceneMeshTriangles += glGeom.__numTriangles
    //   console.log(this.geomItem.getName(), glGeom.__numTriangles, numSceneMeshTriangles)
    // }

    this.lightmapName = geomItem.getLightmapName()

    this.updateVisibility = this.updateVisibility.bind(this)
    this.updateVisibility = this.updateVisibility.bind(this)
    this.destroy = this.destroy.bind(this)

    if (!gl.floatTexturesSupported) {
      this.updateXfo = () => {
        this.updateGeomMatrix()
      }
    } else {
      this.updateXfo = () => {
        this.emitEvent('updated', { type: GLGeomItemChangeType.GEOMITEM_CHANGED })
      }
    }

    const cutAwayChanged = () => {
      this.emitEvent('updated', { type: GLGeomItemChangeType.GEOMITEM_CHANGED })
    }
    const highlightChanged = () => {
      this.emitEvent('updated', { type: GLGeomItemChangeType.HIGHLIGHT_CHANGED })
    }
    const glGeomUpdated = () => {
      this.emitEvent('updated', { type: GLGeomItemChangeType.GEOM_CHANGED })
    }

    this.geomItem.addEventListener('geomXfoChanged', this.updateXfo)
    this.geomItem.addEventListener('visibilityChanged', this.updateVisibility)
    this.geomItem.addEventListener('cutAwayChanged', cutAwayChanged)
    this.geomItem.addEventListener('destructing', this.destroy)
    this.highlightChangedId = this.geomItem.addEventListener('highlightChanged', highlightChanged)
    this.glGeom.addEventListener('updated', glGeomUpdated)

    const lightmapCoordsOffset = this.geomItem.getLightmapCoordsOffset()
    const materialId = 0
    const geomId = 0
    this.geomData = [
      lightmapCoordsOffset.x,
      lightmapCoordsOffset.y,
      materialId,
      geomId,
    ]
  }

  /**
   * The getGeomItem method.
   * @return {any} - The return value.
   */
  getGeomItem() {
    return this.geomItem
  }

  /**
   * The getGLGeom method.
   * @return {any} - The return value.
   */
  getGLGeom() {
    return this.glGeom
  }

  /**
   * The getVisible method.
   * @return {any} - The return value.
   */
  getVisible() {
    return this.geomItem.getVisible()
  }

  /**
   * The getId method.
   * @return {any} - The return value.
   */
  getId() {
    return this.id
  }

  /**
   * The getFlags method.
   * @return {any} - The return value.
   */
  getFlags() {
    return this.flags
  }

  /**
   * The updateVisibility method.
   */
  updateVisibility() {
    const geomVisible = this.geomItem.getVisible()
    const visible = geomVisible && !this.culled
    if (this.visible != visible) {
      this.visible = visible
      this.emitEvent('visibilityChanged', { visible })
      this.emitEvent('updated', {})
    }
  }

  /**
   * The setCullState method.
   * @param {any} culled - The culled value.
   */
  setCullState(culled) {
    this.culled = culled
    this.updateVisibility()
  }

  /**
   * The updateGeomMatrix method.
   */
  updateGeomMatrix() {
    // Pull on the GeomXfo param. This will trigger the lazy evaluation of the operators in the scene.
    this.modelMatrixArray = this.geomItem.getGeomMat4().asArray()
  }

  /**
   * The getGeomMatrixArray method.
   * @return {any} - The return value.
   */
  getGeomMatrixArray() {
    return this.modelMatrixArray
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate value.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    const gl = this.gl
    const unifs = renderstate.unifs

    if (!gl.floatTexturesSupported) {
      const modelMatrixunif = unifs.modelMatrix
      if (modelMatrixunif) {
        gl.uniformMatrix4fv(
          modelMatrixunif.location,
          false,
          this.modelMatrixArray
        )
      }
      const drawItemDataunif = unifs.drawItemData
      if (drawItemDataunif) {
        gl.uniform4f(drawItemDataunif.location, this.geomData)
      }
    }

    const unif = unifs.transformIndex
    if (unif) {
      gl.uniform1i(unif.location, this.id)
    }

    if (renderstate.lightmaps && unifs.lightmap) {
      if (renderstate.boundLightmap != this.lightmapName) {
        const gllightmap = renderstate.lightmaps[this.lightmapName]
        if (gllightmap && gllightmap.glimage.isLoaded()) {
          gllightmap.glimage.bindToUniform(renderstate, unifs.lightmap)
          gl.uniform2fv(
            unifs.lightmapSize.location,
            gllightmap.atlasSize.asArray()
          )
          if (unifs.lightmapConnected) {
            gl.uniform1i(unifs.lightmapConnected.location, true)
          }
          renderstate.boundLightmap = this.lightmapName
        } else {
          // disable lightmaps. Revert to default lighting.
          if (unifs.lightmapConnected) {
            gl.uniform1i(unifs.lightmapConnected.location, false)
          }
        }
      }
    }

    return true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    this.geomItem.removeEventListener('visibilityChanged', this.updateVisibility)
    this.geomItem.removeEventListener('geomXfoChanged', this.updateXfo)
    this.geomItem.removeEventListenerById('highlightChanged', this.highlightChangedId)

    // this.geomItem.removeEventListenerById('destructing', this.destroy)
    // this.emitEvent('destructing', {})
  }
}

export { GLGeomItemChangeType, GLGeomItem }
