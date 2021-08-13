import { Vec3 } from '../../Math/Vec3'
import '../../SceneTree/GeomItem'

import { EventEmitter, MathFunctions } from '../../Utilities/index'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { GLTexture2D } from '../GLTexture2D'
import { GLGeomItem } from './GLGeomItem'

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
abstract class GLGeomItemSetMultiDraw extends EventEmitter {
  protected renderer: GLBaseRenderer
  protected gl: WebGL12RenderingContext
  protected glGeomItems: GLGeomItem[]
  protected glGeomIdsMapping: Record<any, any>
  protected glgeomItemEventHandlers: any[]
  protected freeIndices: any[]
  protected dirtyDrawGeomIds: any[]
  protected drawElementCounts: Uint32Array
  protected drawElementOffsets: Uint32Array
  protected highlightElementCounts: Uint32Array
  protected highlightElementOffsets: Uint32Array
  protected reserved: number
  protected visibleItems: any[]
  protected drawIdsArray: Float32Array
  protected drawIdsBufferDirty: boolean
  protected drawIdsTexture: any
  protected highlightedItems: any[]
  protected highlightedIdsArray: any
  protected highlightedIdsTexture: GLTexture2D
  protected highlightedIdsBufferDirty: boolean

  /**
   * Create a GL geom item set.
   * @param {GLBaseRenderer} renderer - The renderer object.
   */
  constructor(renderer: GLBaseRenderer) {
    super()
    this.renderer = renderer
    this.gl = <WebGL12RenderingContext>renderer.gl
    this.glGeomItems = []
    this.glGeomIdsMapping = {}
    this.glgeomItemEventHandlers = []
    this.freeIndices = []
    this.dirtyDrawGeomIds = []

    this.drawElementCounts = new Uint32Array(0)
    this.drawElementOffsets = new Uint32Array(0)
    this.highlightElementCounts = new Uint32Array(0)
    this.highlightElementOffsets = new Uint32Array(0)

    this.reserved = 0
    this.visibleItems = []
    this.drawIdsArray = new Float32Array(0)
    this.drawIdsBufferDirty = true
    this.drawIdsTexture = null

    this.highlightedItems = []
    this.highlightedIdsArray = null
    this.highlightedIdsTexture = null
    this.highlightedIdsBufferDirty = true

    this.renderer.glGeomLibrary.on('geomDataChanged', (event: any) => {
      const geomItemIndices = this.glGeomIdsMapping[event.index]
      if (geomItemIndices != undefined) {
        geomItemIndices.forEach((index: number) => {
          const glGeomItem = this.glGeomItems[index]
          if (glGeomItem.isVisible()) {
            const index = this.visibleItems.indexOf(glGeomItem)
            const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)

            this.drawElementOffsets[index] = offsetAndCount[0]
            this.drawElementCounts[index] = offsetAndCount[1]
            const highlightIndex = this.highlightedItems.indexOf(glGeomItem)
            if (highlightIndex != -1) {
              this.highlightElementOffsets[highlightIndex] = offsetAndCount[0]
              this.highlightElementCounts[highlightIndex] = offsetAndCount[1]
            }
          }
        })
      }
    })
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem: GLGeomItem) {
    const index: number = this.freeIndices.length > 0 ? this.freeIndices.pop() : this.glGeomItems.length

    // Keep track of which geomitems use which geoms, so we can update the offset and count array if they change.
    if (!this.glGeomIdsMapping[glGeomItem.geomId]) {
      this.glGeomIdsMapping[glGeomItem.geomId] = [index]
    } else {
      this.glGeomIdsMapping[glGeomItem.geomId].push(index)
    }

    const eventHandlers: Record<any, any> = {}

    // //////////////////////////////
    // Visibility
    if (glGeomItem.visible) {
      this.visibleItems.push(glGeomItem)
    }
    eventHandlers.visibilityChanged = (event: Record<any, any>) => {
      if (event.visible) {
        this.visibleItems.push(glGeomItem)
      } else {
        this.visibleItems.splice(this.visibleItems.indexOf(glGeomItem), 1)
      }
      this.drawIdsBufferDirty = true
      this.emit('updated')
    }
    glGeomItem.on('visibilityChanged', eventHandlers.visibilityChanged)

    // //////////////////////////////
    // Highlighted
    if (glGeomItem.geomItem.isHighlighted()) {
      this.highlightedItems.push(glGeomItem)
      this.highlightedIdsBufferDirty = true
    }

    eventHandlers.highlightChanged = (event: Record<any, any>) => {
      if (event && event.name) {
        // Note: highlightChanged is fired when the color changes
        // or another highlight is added over the top. We avoid
        // adding the same index again here. (TODO: use Set?)
        if (this.highlightedItems.includes(glGeomItem)) return
        this.highlightedItems.push(glGeomItem)
      } else {
        this.highlightedItems.splice(this.highlightedItems.indexOf(glGeomItem), 1)
      }
      // console.log("highlightChanged:", glGeomItem.geomItem.getName(), glGeomItem.geomItem.isHighlighted(), this.highlightedItems)
      this.highlightedIdsBufferDirty = true
      this.emit('updated')
    }
    glGeomItem.geomItem.on('highlightChanged', eventHandlers.highlightChanged)

    this.glGeomItems[index] = glGeomItem
    this.glgeomItemEventHandlers[index] = eventHandlers

    this.drawIdsBufferDirty = true

    this.emit('updated')
  }

  /**
   * The removeGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  removeGLGeomItem(glGeomItem: GLGeomItem) {
    const index = this.glGeomItems.indexOf(glGeomItem)
    const geomItemIndices = this.glGeomIdsMapping[glGeomItem.geomId]
    geomItemIndices.splice(geomItemIndices.indexOf(index), 1)

    const eventHandlers = this.glgeomItemEventHandlers[index]
    glGeomItem.geomItem.off('highlightChanged', eventHandlers.highlightChanged)
    glGeomItem.off('visibilityChanged', eventHandlers.visibilityChanged)

    this.glGeomItems[index] = null
    this.glgeomItemEventHandlers[index] = null
    this.drawElementOffsets[index] = 0
    this.drawElementCounts[index] = 0
    this.freeIndices.push(index)

    if (glGeomItem.isVisible()) {
      const visibleItemIndex = this.visibleItems.indexOf(glGeomItem)
      this.visibleItems.splice(visibleItemIndex, 1)
      this.drawIdsBufferDirty = true
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      const highlightIndex = this.visibleItems.indexOf(glGeomItem)
      this.highlightedItems.splice(highlightIndex, 1)
      this.highlightedIdsBufferDirty = true
    }
    this.emit('updated')
  }

  // ////////////////////////////////////
  // Draw Ids

  // ////////////////////////////////////
  // Instance Ids

  /**
   * The updateDrawIDsBuffer method.
   * @param {Record<any,any>} renderstate - The object used to track state changes during rendering.
   */
  updateDrawIDsBuffer(renderstate: RenderState) {
    {
      if (!this.drawIdsArray || this.visibleItems.length > this.drawIdsArray.length) {
        this.drawIdsArray = new Float32Array(this.visibleItems.length)
        this.drawElementOffsets = new Uint32Array(this.visibleItems.length)
        this.drawElementCounts = new Uint32Array(this.visibleItems.length)
      }

      this.visibleItems.forEach((glGeomItem, index) => {
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        this.drawElementOffsets[index] = offsetAndCount[0]
        this.drawElementCounts[index] = offsetAndCount[1]
        this.drawIdsArray[index] = glGeomItem.drawItemId
      })
      for (let i = this.visibleItems.length; i < this.drawElementCounts.length; i++) {
        this.drawElementOffsets[i] = 0
        this.drawElementCounts[i] = 0
      }
      this.dirtyDrawGeomIds = []
    }

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)

    const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.visibleItems.length))) * 2
    if (!this.drawIdsTexture) {
      this.drawIdsTexture = new GLTexture2D(this.gl, {
        format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
        type: 'FLOAT',
        width: drawIdsTextureSize,
        height: drawIdsTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
    } else if (this.drawIdsTexture.width < drawIdsTextureSize || this.drawIdsTexture.height < drawIdsTextureSize) {
      this.drawIdsTexture.resize(drawIdsTextureSize, drawIdsTextureSize)
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

    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--

    this.drawIdsBufferDirty = false
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   * @param {Record<any, any>} renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate: RenderState) {
    if (this.highlightedIdsBufferDirty) {
      if (!this.highlightedIdsArray || this.highlightedItems.length > this.highlightedIdsArray.length) {
        this.highlightedIdsArray = new Float32Array(this.highlightedItems.length)
        this.highlightElementOffsets = new Uint32Array(this.highlightedItems.length)
        this.highlightElementCounts = new Uint32Array(this.highlightedItems.length)
      }

      // Collect all visible geom ids into the instanceIds array.
      // Note: the draw count can be less than the number of instances
      // we re-use the same buffer and simply invoke fewer draw calls.
      this.highlightedItems.forEach((glGeomItem, index) => {
        this.highlightedIdsArray[index] = glGeomItem.drawItemId
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        this.highlightElementOffsets[index] = offsetAndCount[0]
        this.highlightElementCounts[index] = offsetAndCount[1]
      })
      for (let i = this.highlightedItems.length; i < this.highlightElementCounts.length; i++) {
        this.highlightElementOffsets[i] = 0
        this.highlightElementCounts[i] = 0
      }

      this.highlightedIdsBufferDirty = false
    }

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)
    const highlightIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.highlightedItems.length)))

    if (!this.highlightedIdsTexture) {
      this.highlightedIdsTexture = new GLTexture2D(this.gl, {
        format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
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
      const rows = Math.ceil((xoffset + this.highlightedIdsArray.length) / texWidth)

      let consumed = 0
      let remaining = this.highlightedIdsArray.length
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
        const data = this.highlightedIdsArray.subarray(consumed, consumed + width)
        gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
        consumed += width
        remaining -= width
      }
    }

    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--
  }
  // ////////////////////////////////////
  // Drawing

  /**
   * The draw method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    if (this.visibleItems.length == 0) {
      return
    }
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer(renderstate)
    }
    if (this.drawIdsTexture) {
      const { drawIdsTexture } = renderstate.unifs
      this.drawIdsTexture.bindToUniform(renderstate, drawIdsTexture)
    }

    this.__bindAndRender(renderstate, this.drawIdsArray, this.drawElementCounts, this.drawElementOffsets)
  }

  /**
   * The drawHighlighted method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate: RenderState) {
    if (this.highlightedItems.length == 0) {
      return
    }
    if (this.highlightedIdsBufferDirty) {
      this.updateHighlightedIDsBuffer(renderstate)
    }
    if (this.highlightedIdsTexture) {
      const { drawIdsTexture } = renderstate.unifs
      this.highlightedIdsTexture.bindToUniform(renderstate, drawIdsTexture)
    }

    this.__bindAndRender(
      renderstate,
      this.highlightedIdsArray,
      this.highlightElementCounts,
      this.highlightElementOffsets
    )
  }

  /**
   * The __bindAndRender method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   * @param {Array} counts - the counts for each element drawn in by this draw call.
   * @param {Array} offsets - the offsets for each element drawn in by this draw call.
   * @private
   */
  __bindAndRender(renderstate: RenderState, drawIdsArray: Float32Array, counts: Uint32Array, offsets: Uint32Array) {
    const gl = this.gl
    const unifs = renderstate.unifs

    // Specify an instanced draw to the shader so it knows how
    // to retrieve the modelmatrix.
    if (unifs.instancedDraw) {
      gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)
    }

    renderstate.bindViewports(unifs, () => {
      this.multiDraw(renderstate, drawIdsArray, counts, offsets)
    })
  }

  /**
   * Draw an item to screen.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   * @param {Float32Array} drawIds - the draw id for each element drawn in by this draw call.
   * @param {Uint32Array} counts - the geom element count for each element drawn in by this draw call.
   * @param {Uint32Array} offsets - the geom element offset for each element drawn in by this draw call.
   */
  abstract multiDraw(renderstate: RenderState, drawIds: Float32Array, counts: Uint32Array, offsets: Uint32Array): void

  /**
   * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
   * @param {Vec3} viewPos - The position of the camera that we are sorting relative to.
   */
  sortItems(viewPos: Vec3) {
    const distances: any[] = []
    const indices: any[] = []
    this.visibleItems.forEach((glGeomItem, index) => {
      if (glGeomItem) {
        const mat4 = glGeomItem.geomItem.getGeomMat4()
        const dist = mat4.translation.distanceTo(viewPos)
        distances.push(dist)
        indices.push(index)
      }
    })
    indices.sort((a, b) => distances[b] - distances[a])

    const visibleItems: any[] = []
    const drawElementCounts = new Uint32Array(this.drawElementCounts.length)
    const drawElementOffsets = new Uint32Array(this.drawElementOffsets.length)
    indices.forEach((tgtIndex, srcIndex) => {
      visibleItems[srcIndex] = this.visibleItems[tgtIndex]
      drawElementCounts[srcIndex] = this.drawElementCounts[tgtIndex]
      drawElementOffsets[srcIndex] = this.drawElementOffsets[tgtIndex]
      this.drawIdsArray[srcIndex] = this.visibleItems[tgtIndex].drawItemId
    })
    this.visibleItems = visibleItems
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
