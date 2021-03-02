/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { Vec4 } from '../../Math/index'
import { GLGeomItemChangeType, GLGeomItem } from './GLGeomItem.js'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GLTexture2D } from '../GLTexture2D.js'
// import { GLMaterialLibrary } from './GLMaterialLibrary.js'
// import { GLGeomLibrary } from './GLGeomLibrary.js'

const pixelsPerItem = 6 // The number of RGBA pixels per draw item.

/** Class for managing all the GeomItems discovered in the SceneTree.
 * @private
 */
class GLGeomItemLibrary extends EventEmitter {
  /**
   * Create a GLGeomItemLibrary.
   * @param {GLBaseRenderer} renderer - The renderer object
   */
  constructor(renderer) {
    super()

    this.renderer = renderer
    this.glGeomItems = [undefined]
    this.glGeomItemsMap = {}
    this.glGeomItemsIndexFreeList = []
    this.dirtyItemIndices = []
  }

  /**
   * The addGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {number} - The index of GLGeomItem
   */
  addGeomItem(geomItem) {
    let index = this.glGeomItemsMap[geomItem.getId()]
    if (index != undefined) {
      // Increment the ref count for the GLGeom
      return this.glGeomItems[index]
    }

    const material = geomItem.getParameter('Material').getValue()

    // Add the material here so that when we populate the GeomItem texture.
    // the material already has an Id.
    if (material.getShaderClass().getPackedMaterialData) {
      this.renderer.glMaterialLibrary.addMaterial(material)
    }

    const geom = geomItem.getParameter('Geometry').getValue()
    const geomIndex = this.renderer.glGeomLibrary.addGeom(geom)

    // Use recycled indices if there are any available...
    if (this.glGeomItemsIndexFreeList.length > 0) {
      index = this.glGeomItemsIndexFreeList.pop()
    } else {
      index = this.glGeomItems.length
      this.glGeomItems.push(null)
    }
    this.dirtyItemIndices.push(index)

    const gl = this.renderer.gl
    const supportInstancing = gl.floatTexturesSupported
    const glGeomItem = new GLGeomItem(gl, geomItem, index, geomIndex, matIndex, supportInstancing)

    glGeomItem.on('updated', (event) => {
      if (!event) {
        // On mobile devices without support for floating point textures
        // we just need to redraw.
        this.renderer.drawItemChanged()
        return
      }
      switch (event.type) {
        case GLGeomItemChangeType.GEOMITEM_CHANGED:
          if (this.dirtyItemIndices.includes(index)) return
          this.dirtyItemIndices.push(index)
          break
        case GLGeomItemChangeType.GEOM_CHANGED:
        case GLGeomItemChangeType.VISIBILITY_CHANGED:
          break
        case GLGeomItemChangeType.HIGHLIGHT_CHANGED:
          if (this.dirtyItemIndices.includes(index)) return
          this.dirtyItemIndices.push(index)
          break
      }
      this.renderer.drawItemChanged()
    })

    this.glGeomItems[index] = glGeomItem
    this.glGeomItemsMap[geomItem.getId()] = index

    // Note: before the renderer is disabled, this is a  no-op.
    this.renderer.requestRedraw()

    return glGeomItem
  }

  /**
   * The removeGeomItem method.
   * @param {any} geomItem - The geomItem value.
   * @return {any} - The return value.
   */
  removeGeomItem(geomItem) {
    const glGeomItem = geomItem.getMetadata('glGeomItem')

    const index = this.glGeomItemsMap[geomItem.getId()]
    this.glGeomItems[index] = null
    this.glGeomItemsIndexFreeList.push(index)
    delete this.glGeomItemsMap[geomItem.getId()]

    // TODO: review signal disconnections
    // glGeomItem.transformChanged.disconnectScope(this);

    // this.emit('renderTreeUpdated', {});
    this.renderer.requestRedraw()

    return glGeomItem
  }

  /**
   * The getGeomItem method.
   * @param {number} index - The index value.
   * @return {GLGeomItem} - The GLGeomItem that wraps the provided GeomItem
   */
  getGeomItem(index) {
    if (index >= this.glGeomItems.length) {
      console.warn('Invalid Draw Item id:' + index + ' NumItems:' + (this.glGeomItems.length - 1))
      return undefined
    }
    return this.glGeomItems[index].geomItem
  }

  /**
   * The getGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {GLGeomItem} - The GLGeomItem that wraps the provided GeomItem
   */
  getGLGeomItem(geomItem) {
    const index = this.glGeomItemsMap[geomItem.getId()]
    if (index != undefined) {
      // Increment the ref count for the GLGeom
      return this.glGeomItems[index]
    }
    return null
  }

  // ////////////////////////////////////////////////
  // Data Uploading

  /**
   * The populateDrawItemDataArray method.
   * @param {any} geomItem - The geomItem value.
   * @param {number} index - The index value.
   * @param {any} dataArray - The dataArray value.
   * @private
   */
  populateDrawItemDataArray(geomItem, index, dataArray) {
    const stride = pixelsPerItem * 4 // The number of floats per draw item.
    const offset = index * stride

    // /////////////////////////
    // Geom Item Params
    const materialId = 0
    let flags = 0
    if (geomItem.isCutawayEnabled()) {
      const GEOMITEM_FLAG_CUTAWAY = 1 // 1<<0;
      flags |= GEOMITEM_FLAG_CUTAWAY
    }

    const pix0 = Vec4.createFromBuffer(dataArray.buffer, (offset + 0) * 4)
    pix0.set(flags, materialId, 0, 0)

    const material = geomItem.getParameter('Material').getValue()
    // const coords = material.getMetadata('glmaterialcoords')
    const allocation = this.renderer.glMaterialLibrary.getMaterialAllocation(material)
    if (allocation) {
      pix0.z = allocation.start
      pix0.w = allocation.size
    }

    // /////////////////////////
    // Geom Matrix
    const mat4 = geomItem.getGeomMat4()
    const pix1 = Vec4.createFromBuffer(dataArray.buffer, (offset + 4) * 4)
    const pix2 = Vec4.createFromBuffer(dataArray.buffer, (offset + 8) * 4)
    const pix3 = Vec4.createFromBuffer(dataArray.buffer, (offset + 12) * 4)
    pix1.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x)
    pix2.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y)
    pix3.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z)

    // /////////////////////////
    // Hilight
    const pix4 = Vec4.createFromBuffer(dataArray.buffer, (offset + 16) * 4)
    if (geomItem.isHighlighted()) {
      const highlight = geomItem.getHighlight()
      pix4.set(highlight.r, highlight.g, highlight.b, highlight.a)
    }

    // /////////////////////////
    // Cutaway
    const pix5 = Vec4.createFromBuffer(dataArray.buffer, (offset + 20) * 4)
    if (geomItem.isCutawayEnabled()) {
      const cutAwayVector = geomItem.getCutVector()
      const cutAwayDist = geomItem.getCutDist()
      // console.log(geomItem.getName(), geomItem.isCutawayEnabled(), flags, pix0.toString())
      pix5.set(cutAwayVector.x, cutAwayVector.y, cutAwayVector.z, cutAwayDist)
    }
  }

  /**
   * The newItemsReadyForLoading method.
   * @return {any} - The return value.
   */
  newItemsReadyForLoading() {
    return this.dirtyItemIndices.length > 0
  }

  /**
   * The uploadGeomItems method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  uploadGeomItems(renderstate) {
    const gl = this.renderer.gl
    if (!gl.floatTexturesSupported) {
      // During rendering, the GeomMat will be Pplled.
      // This will trigger the lazy evaluation of the operators in the scene.
      this.dirtyItemIndices = []
      // this.emit('renderTreeUpdated', {});
      return
    }

    let size = Math.round(Math.sqrt(this.glGeomItems.length * pixelsPerItem) + 0.5)
    // Only support power 2 textures. Else we get strange corruption on some GPUs
    // in some scenes.
    size = MathFunctions.nextPow2(size)
    // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
    // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
    if (size % pixelsPerItem != 0) size += pixelsPerItem - (size % pixelsPerItem)

    if (!this.glGeomItemsTexture) {
      this.glGeomItemsTexture = new GLTexture2D(gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: size,
        height: size,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
      this.glGeomItemsTexture.clear()
    } else if (this.glGeomItemsTexture.width != size) {
      this.glGeomItemsTexture.resize(size, size)
      this.dirtyItemIndices = Array((size * size) / pixelsPerItem)
        .fill()
        .map((v, i) => i)
    }

    gl.bindTexture(gl.TEXTURE_2D, this.glGeomItemsTexture.glTex)
    const typeId = this.glGeomItemsTexture.getTypeID()

    for (let i = 0; i < this.dirtyItemIndices.length; i++) {
      const indexStart = this.dirtyItemIndices[i]
      const yoffset = Math.floor((indexStart * pixelsPerItem) / size)
      let indexEnd = indexStart + 1
      for (let j = i + 1; j < this.dirtyItemIndices.length; j++) {
        const index = this.dirtyItemIndices[j]
        if (Math.floor((index * pixelsPerItem) / size) != yoffset) {
          break
        }
        if (index != indexEnd) {
          break
        }
        indexEnd++
      }

      // TODO: for contiguous blcoks, we create larger arrays and populate
      // and upload them in one step.
      const uploadCount = indexEnd - indexStart
      const xoffset = (indexStart * pixelsPerItem) % size
      const width = pixelsPerItem * uploadCount
      const height = 1
      const dataArray = new Float32Array(pixelsPerItem * 4 * uploadCount) // 4==RGBA pixels.

      for (let j = indexStart; j < indexEnd; j++) {
        const glGeomItem = this.glGeomItems[j]
        // When an item is deleted, we allocate its index to the free list
        // and null this item in the array. skip over null items.
        if (!glGeomItem) continue
        this.populateDrawItemDataArray(glGeomItem.getGeomItem(), j - indexStart, dataArray)
      }

      if (typeId == gl.FLOAT) {
        this.glGeomItemsTexture.populate(dataArray, width, height, xoffset, yoffset, false)
      } else {
        const unit16s = MathFunctions.convertFloat32ArrayToUInt16Array(dataArray)
        this.glGeomItemsTexture.populate(unit16s, width, height, xoffset, yoffset, false)
      }

      i += uploadCount - 1
    }

    this.dirtyItemIndices = []
  }

  /**
   * Updates the GPU state if any update is needed.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate) {
    if (this.dirtyItemIndices.length > 0) this.uploadGeomItems(renderstate)
    // renderstate.drawItemsTexture = this.glGeomItemsTexture

    const gl = this.renderer.gl
    const { instancesTexture, instancesTextureSize } = renderstate.unifs
    if (instancesTexture) {
      this.glGeomItemsTexture.bindToUniform(renderstate, instancesTexture)
      gl.uniform1i(instancesTextureSize.location, this.glGeomItemsTexture.width)
    }
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {}
}

export { GLGeomItemLibrary }
