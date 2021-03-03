import '../../SceneTree/GeomItem.js'

import { EventEmitter, MathFunctions } from '../../Utilities/index'
import { resizeIntArray } from './GLGeomLibrary.js'
import { GLTexture2D } from '../GLTexture2D.js'

const resizeFloat32Array = (intArray, newSize) => {
  const newArray = new Float32Array(newSize)
  newArray.set(intArray)
  return newArray
}

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
class GLGeomItemSetMultiDraw extends EventEmitter {
  /**
   * Create a GL geom item set.
   * @param {GLBaseRenderer} renderer - The renderer object.
   */
  constructor(renderer) {
    super()
    this.renderer = renderer
    this.gl = renderer.gl
    this.glGeomItems = []
    this.glgeomItems_freeIndices = []
    this.glgeomItemEventHandlers = []
    this.dirtyDrawGeomIds = []

    this.drawElementCounts = new Int32Array(0)
    this.drawElementOffsets = new Int32Array(0)
    this.highlightElementCounts = new Int32Array(0)
    this.highlightElementOffsets = new Int32Array(0)

    this.visibleItems = []
    this.drawIdsArray = new Float32Array(0)
    this.drawIdsBufferDirty = true
    this.drawIdsTexture = null
    this.dirtyDrawIndexIndices = new Set()

    this.highlightedItems = []
    this.highlightedIdsArray = null
    this.highlightedIdsTexture = null
    this.highlightedIdsBufferDirty = true
    this.highlightIndices = new Set()
    this.dirtyDrawHighlightIndices = new Set()
  }

  /**
   * The getDrawCount method.
   * @return {any} - The return value.
   */
  getDrawCount() {
    return this.visibleItems.length
  }

  /**
   * The addGLGeomItem method.
   * @param {any} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    let index
    if (this.glgeomItems_freeIndices.length > 0) {
      index = this.glgeomItems_freeIndices.pop()
    } else {
      index = this.glGeomItems.length
      this.glGeomItems.push(null)

      // //////////////////////////////////////
      // Indices
      this.drawElementOffsets = resizeIntArray(this.drawElementOffsets, index + 1)
      this.drawElementCounts = resizeIntArray(this.drawElementCounts, index + 1)
      this.drawIdsArray = resizeFloat32Array(this.drawIdsArray, index + 1)
    }
    console.log('addGLGeomItem:', glGeomItem.drawItemId)

    this.drawElementOffsets[index] = 0
    this.drawElementCounts[index] = 0
    this.dirtyDrawGeomIds.push(index)

    if (this.drawIdsArray.includes(glGeomItem.drawItemId)) console.error('addGLGeomItem:', glGeomItem.drawItemId)
    this.drawIdsArray[index] = glGeomItem.drawItemId

    const eventHandlers = {}
    eventHandlers.geomDataChanged = (event) => {
      if (event.index == glGeomItem.geomId) {
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)

        this.drawElementOffsets[index] = offsetAndCount[0]
        this.drawElementCounts[index] = offsetAndCount[1]
        if (this.highlightedItems.includes(index)) {
          this.highlightElementOffsets[index] = offsetAndCount[0]
          this.highlightElementCounts[index] = offsetAndCount[1]
        }
      }
    }
    this.renderer.glGeomLibrary.on('geomDataChanged', eventHandlers.geomDataChanged)

    if (glGeomItem.visible) {
      this.visibleItems.push(index)
      // this.emit('drawCountChanged', { change: 1, count: this.visibleItems.length })
    }
    if (glGeomItem.getGeomItem().isHighlighted()) {
      this.highlightedItems.push(index)
      this.highlightedIdsBufferDirty = true
    }

    eventHandlers.highlightChanged = () => {
      if (glGeomItem.getGeomItem().isHighlighted()) {
        // Note: highlightChanged is fired when the color changes
        // or another hilight is added over the top. We avoid
        // adding the same index again here. (TODO: use Set?)
        if (this.highlightedItems.includes(index)) return
        this.highlightedItems.push(index)
        // this.emit('highlightedCountChanged', { change: 1, count: this.highlightedItems.length })
      } else {
        this.highlightedItems.splice(this.highlightedItems.indexOf(index), 1)
        // this.emit('highlightedCountChanged', { change: -1, count: this.highlightedItems.length })
      }
      // console.log("highlightChanged:", glGeomItem.getGeomItem().getName(), glGeomItem.getGeomItem().isHighlighted(), this.highlightedItems)
      this.highlightedIdsBufferDirty = true
    }
    glGeomItem.on('highlightChanged', eventHandlers.highlightChanged)
    eventHandlers.visibilityChanged = (event) => {
      const visible = event.visible
      if (visible) {
        this.visibleItems.push(index)
        // this.emit('drawCountChanged', { change: 1, count: this.visibleItems.length })
      } else {
        this.visibleItems.splice(this.visibleItems.indexOf(index), 1)
        // this.emit('drawCountChanged', { change: -1, count: this.visibleItems.length })
      }
      this.drawIdsBufferDirty = true
    }
    glGeomItem.on('visibilityChanged', eventHandlers.visibilityChanged)

    this.glGeomItems[index] = glGeomItem
    this.glgeomItemEventHandlers[index] = eventHandlers

    glGeomItem.geomItem.setMetadata('geomItemSet', this)

    this.drawIdsBufferDirty = true
  }

  /**
   * The removeGLGeomItem method.
   * @param {any} glGeomItem - The glGeomItem value.
   */
  removeGLGeomItem(glGeomItem) {
    console.log('removeGLGeomItem:', glGeomItem.drawItemId)
    const index = this.glGeomItems.indexOf(glGeomItem)
    const eventHandlers = this.glgeomItemEventHandlers[index]
    glGeomItem.off('highlightChanged', eventHandlers.highlightChanged)
    glGeomItem.off('visibilityChanged', eventHandlers.visibilityChanged)
    this.renderer.glGeomLibrary.off('geomDataChanged', eventHandlers.geomDataChanged)

    this.glGeomItems[index] = null
    this.glgeomItemEventHandlers[index] = null
    this.drawElementCounts[index] = 0
    this.drawElementOffsets[index] = 0

    this.glgeomItems_freeIndices.push(index)

    if (glGeomItem.visible) {
      this.visibleItems.splice(this.visibleItems.indexOf(index), 1)
      // this.emit('drawCountChanged', { change: -1, count: this.visibleItems.length })
    }
    const highlighted = glGeomItem.getGeomItem().isHighlighted()
    if (highlighted) {
      this.highlightedItems.splice(this.highlightedItems.indexOf(index), 1)
      // this.emit('highlightedCountChanged', { change: -1, count: this.highlightedItems.length })
    }
    this.drawIdsBufferDirty = true
    // console.log("removeGLGeomItem:", glGeomItem.getGeomItem().getName(), this.glGeomItems.length)
    // if (this.glGeomItems.length == this.glgeomItems_freeIndices.length) {
    //   this.destroy()
    // }
  }

  // ////////////////////////////////////
  // Draw Ids

  /**
   * The getHighlightedIdsArray method.
   * @return {Float32Array} - The drawIds for each GeomItem packed into a Float32Array
   */
  getHighlightedIdsArray() {
    if (this.highlightedIdsBufferDirty) {
      if (!this.highlightedIdsArray || this.highlightedItems.length > this.highlightedIdsArray.length) {
        this.highlightedIdsArray = new Float32Array(this.highlightedItems.length)
        this.highlightElementOffsets = new Uint32Array(this.highlightedItems.length)
        this.highlightElementCounts = new Uint32Array(this.highlightedItems.length)
      }

      // Collect all visible geom ids into the instanceIds array.
      // Note: the draw count can be less than the number of instances
      // we re-use the same buffer and simply invoke fewer draw calls.
      this.highlightedItems.forEach((index, tgtIndex) => {
        const glGeomItem = this.glGeomItems[index]
        this.highlightedIdsArray[tgtIndex] = glGeomItem.drawItemId

        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        this.highlightElementOffsets[index] = offsetAndCount[0]
        this.highlightElementCounts[index] = offsetAndCount[1]
      })

      this.highlightedIdsBufferDirty = false
    }
    return this.highlightedIdsArray
  }

  // ////////////////////////////////////
  // Instance Ids

  /**
   * The updateDrawIDsBuffer method.
   * @param {object} renderstate - The object used to track state changes during rendering.
   */
  updateDrawIDsBuffer(renderstate) {
    const gl = this.renderer.gl

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)

    // const drawIdsArray = this.getDrawIdsArray()
    const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.visibleItems.length)))

    if (!this.drawIdsTexture) {
      this.drawIdsTexture = new GLTexture2D(gl, {
        format: 'RED',
        internalFormat: 'R32F',
        type: 'FLOAT',
        width: drawIdsTextureSize,
        height: drawIdsTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
    } else if (this.drawIdsTexture.width < drawIdsTextureSize || this.drawIdsTexture.height < drawIdsTextureSize) {
      this.drawIdsTexture.resize(drawIdsTextureSize, drawIdsTextureSize)
      // for (let i = 0; i < this.geoms.length; i++) {
      //   // This can happen for an invisible object added to the GLGeomItemSetMultiDraw.
      //   // Note: soon invisible items will be held by the renderer until visible.
      //   if (this.geoms[i] && this.drawIdsAllocator.getAllocation(i)) {
      //     this.dirtyDrawIndexIndices.add(i)
      //   }
      // }
    }
    {
      if (!this.drawIdsArray || this.visibleItems.length > this.drawIdsArray.length) {
        this.drawIdsArray = new Float32Array(this.glGeomItems.length)
      }
      this.dirtyDrawGeomIds.forEach((index) => {
        const glGeomItem = this.glGeomItems[index]
        if (glGeomItem) {
          const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
          this.drawElementOffsets[index] = offsetAndCount[0]
          this.drawElementCounts[index] = offsetAndCount[1]

          this.drawIdsArray[index] = this.glGeomItems[index].drawItemId
        }
      })
      this.dirtyDrawGeomIds = []
    }
    {
      const tex = this.drawIdsTexture
      const texWidth = this.drawIdsTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      const level = 0
      const xoffset = 0
      const height = 1
      const format = tex.__format
      const type = tex.__type
      const rows = Math.ceil((xoffset + this.drawIdsArray.length) / texWidth)

      let consumed = 0
      let remaining = this.drawIdsArray.length
      let rowStart = xoffset
      for (let i = 0; i < rows; i++) {
        let width
        if (rowStart + remaining > texWidth) {
          width = texWidth - rowStart
          rowStart = 0
        } else {
          width = remaining
        }
        const x = consumed % texWidth
        const y = Math.floor(consumed / texWidth)
        const data = this.drawIdsArray.subarray(consumed, consumed + width)
        gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
        consumed += width
        remaining -= width
      }
    }

    this.dirtyDrawIndexIndices = new Set()
    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--

    this.drawIdsBufferDirty = false
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   * @param {object} renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate) {
    const gl = this.renderer.gl

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)
    const highlightedIdsArray = this.getHighlightedIdsArray()

    const highlightIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.highlightedItems.length)))

    if (!this.highlightedIdsTexture) {
      this.highlightedIdsTexture = new GLTexture2D(gl, {
        format: 'RED',
        internalFormat: 'R32F',
        type: 'FLOAT',
        width: highlightIdsTextureSize,
        height: highlightIdsTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
    } else if (
      this.highlightedIdsTexture.width < highlightIdsTextureSize ||
      this.highlightedIdsTexture.height < highlightIdsTextureSize
    ) {
      this.highlightedIdsTexture.resize(highlightIdsTextureSize, highlightIdsTextureSize)
      // this.dirtyDrawHighlightIndices = new Set(this.highlightIndices)
    }
    {
      const tex = this.highlightedIdsTexture
      const texWidth = this.highlightedIdsTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)

      const level = 0
      const xoffset = 0
      const height = 1
      const format = tex.__format
      const type = tex.__type
      const rows = Math.ceil((xoffset + highlightedIdsArray.length) / texWidth)

      let consumed = 0
      let remaining = highlightedIdsArray.length
      let rowStart = xoffset
      for (let i = 0; i < rows; i++) {
        let width
        if (rowStart + remaining > texWidth) {
          width = texWidth - rowStart
          rowStart = 0
        } else {
          width = remaining
        }
        const x = consumed % texWidth
        const y = Math.floor(consumed / texWidth)
        const data = highlightedIdsArray.subarray(consumed, consumed + width)
        gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
        consumed += width
        remaining -= width
      }
    }

    // this.dirtyDrawHighlightIndices = new Set()
    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--
  }
  // ////////////////////////////////////
  // Drawing

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate) {
    if (this.visibleItems.length == 0) {
      return
    }
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer(renderstate)
    }
    this.drawIdsTexture.bindToUniform(renderstate, renderstate.unifs.drawIdsTexture)

    this.__bindAndRender(renderstate, this.drawElementCounts, this.drawElementOffsets)
  }

  /**
   * The drawHighlighted method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate) {
    if (this.highlightedItems.length == 0) {
      return
    }
    if (this.highlightedIdsBufferDirty) {
      this.updateHighlightedIDsBuffer(renderstate)
    }
    this.highlightedIdsTexture.bindToUniform(renderstate, renderstate.unifs.drawIdsTexture)

    this.__bindAndRender(renderstate, this.highlightElementCounts, this.highlightElementOffsets)
  }

  /**
   * The __bindAndRender method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {Array} counts - the counts for each element drawn in by this draw call.
   * @param {Array} offsets - the offsets for each element drawn in by this draw call.
   * @private
   */
  __bindAndRender(renderstate, counts, offsets) {
    const gl = this.gl
    const unifs = renderstate.unifs

    if (!gl.floatTexturesSupported || !gl.drawElementsInstanced || !renderstate.supportsInstancing) {
      if (renderstate.unifs.instancedDraw) {
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 0)
      }
      counts.forEach((index) => {
        this.glGeomItems[index].bind(renderstate)
        renderstate.bindViewports(unifs, () => {
          this.singleDraw(counts[index], offsets[index])
        })
      })
    } else {
      // console.log("draw:"+ this.drawIdsArray);

      // Specify an instanced draw to the shader so it knows how
      // to retrieve the modelmatrix.
      if (unifs.instancedDraw) {
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)
      }

      renderstate.bindViewports(unifs, () => {
        this.multiDraw(counts, offsets)
      })
    }
  }

  /**
   * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
   * @param {Vec3} viewPos - The position of the camera that we are sorting relative to.
   */
  sortItems(viewPos) {
    const distances = []
    const indices = []
    this.glGeomItems.forEach((glGeomItem, index) => {
      if (glGeomItem) {
        const mat4 = glGeomItem.geomItem.getGeomMat4()
        const dist = mat4.translation.distanceTo(viewPos)
        distances.push(dist)
        indices.push(index)
      }
    })
    indices.sort((a, b) => distances[b] - distances[a])

    const glGeomItems = []
    const glgeomItemEventHandlers = []
    const drawElementCounts = new Int32Array(this.drawElementCounts.length)
    const drawElementOffsets = new Int32Array(this.drawElementOffsets.length)
    indices.forEach((tgtIndex, srcIndex) => {
      glGeomItems[srcIndex] = this.glGeomItems[tgtIndex]
      glgeomItemEventHandlers[srcIndex] = this.glgeomItemEventHandlers[tgtIndex]
      drawElementCounts[srcIndex] = this.drawElementCounts[tgtIndex]
      drawElementOffsets[srcIndex] = this.drawElementOffsets[tgtIndex]
      this.drawIdsArray[srcIndex] = this.glGeomItems[tgtIndex].drawItemId
    })
    this.glGeomItems = glGeomItems
    this.glgeomItemEventHandlers = glgeomItemEventHandlers
    this.drawElementCounts = drawElementCounts
    this.drawElementOffsets = drawElementOffsets
    this.drawIdsBufferDirty = true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    if (this.drawIdsTexture) {
      this.drawIdsTexture.destroy()
    }

    if (this.highlightedIdsTexture) {
      this.highlightedIdsTexture.destroy()
    }

    this.emit('destructing')
  }
}

export { GLGeomItemSetMultiDraw }
