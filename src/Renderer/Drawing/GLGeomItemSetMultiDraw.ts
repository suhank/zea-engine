import { VisibilityChangedEvent } from '../..'
import { Vec3 } from '../../Math/Vec3'
import '../../SceneTree/GeomItem'

import { EventEmitter, MathFunctions } from '../../Utilities/index'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { GLTexture2D } from '../GLTexture2D'
import { RenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
import { GLGeomItem } from './GLGeomItem'

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
abstract class GLGeomItemSetMultiDraw extends EventEmitter {
  protected renderer: GLBaseRenderer
  protected gl: WebGL12RenderingContext
  protected glGeomItems: Array<GLGeomItem | null>
  protected glGeomIdsMapping: Record<string, any>
  protected glgeomItemEventHandlers: any[]
  protected freeIndices: number[] = []

  // Mapping from the array of glGeomItems, to the actual rendering
  // order. When rendering transparent geoms, we sort this array.
  protected drawElementCounts: Int32Array = new Int32Array(0)
  protected drawElementOffsets: Int32Array = new Int32Array(0)
  protected highlightElementCounts: Int32Array = new Int32Array(0)
  protected highlightElementOffsets: Int32Array = new Int32Array(0)
  protected drawOrderIndices: number[] = []
  protected drawIdsArray: Float32Array = new Float32Array(0)
  protected drawIdsBufferDirty: boolean = true
  protected drawIdsTexture: GLTexture2D | null = null
  protected highlightedItems: GLGeomItem[]
  protected highlightedIdsArray: any
  protected highlightedIdsTexture: GLTexture2D | null = null
  protected highlightedIdsBufferDirty: boolean

  /**
   * Create a GL geom item set.
   * @param renderer - The renderer object.
   */
  constructor(renderer: GLBaseRenderer) {
    super()
    this.renderer = renderer
    this.gl = <WebGL12RenderingContext>renderer.gl
    this.glGeomItems = []
    this.glGeomIdsMapping = {}
    this.glgeomItemEventHandlers = []

    this.highlightedItems = []
    this.highlightedIdsArray = null
    this.highlightedIdsTexture = null
    this.highlightedIdsBufferDirty = true

    this.renderer.glGeomLibrary.on('geomDataChanged', (event: any) => {
      const geomItemIndices = this.glGeomIdsMapping[event.index]
      if (geomItemIndices != undefined) {
        geomItemIndices.forEach((index: number) => {
          const glGeomItem = this.glGeomItems[index]!
          if (glGeomItem.isVisible()) {
            const drawIndex = this.drawOrderIndices.indexOf(index)
            const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)

            this.drawElementOffsets[drawIndex] = offsetAndCount[0]
            this.drawElementCounts[drawIndex] = offsetAndCount[1]
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
   * @param glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem: GLGeomItem): void {
    const index: number = this.freeIndices.length > 0 ? this.freeIndices.pop()! : this.glGeomItems.length

    // Keep track of which geomitems use which geoms, so we can update the offset and count array if they change.
    if (!this.glGeomIdsMapping[glGeomItem.geomId]) {
      this.glGeomIdsMapping[glGeomItem.geomId] = [index]
    } else {
      this.glGeomIdsMapping[glGeomItem.geomId].push(index)
    }

    const eventHandlers: Record<string, any> = {}

    // //////////////////////////////
    // Visibility
    if (glGeomItem.visible) {
      this.drawOrderIndices.push(index)
    }
    eventHandlers.visibilityChanged = (event: Record<string, any>) => {
      if (event.visible) {
        this.drawOrderIndices.push(index)
      } else {
        this.drawOrderIndices.splice(this.drawOrderIndices.indexOf(index), 1)
      }
      // console.log(this.constructor.name, ' drawOrderIndices', this.drawOrderIndices.length)
      if (!this.drawIdsBufferDirty) {
        this.drawIdsBufferDirty = true
        this.emit('updated')
      }
    }
    glGeomItem.on('visibilityChanged', eventHandlers.visibilityChanged)

    eventHandlers.cullStateChanged = (event: VisibilityChangedEvent) => {
      if (event.visible) {
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        this.drawElementCounts[index] = offsetAndCount[1]
      } else {
        this.drawElementCounts[index] = 0
      }
      this.emit('updated')
    }
    glGeomItem.on('cullStateChanged', eventHandlers.cullStateChanged)

    // //////////////////////////////
    // Highlighted
    if (glGeomItem.geomItem.isHighlighted()) {
      this.highlightedItems.push(glGeomItem)
      this.highlightedIdsBufferDirty = true
    }

    eventHandlers.highlightChanged = (event: Record<string, any>) => {
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
   * @param glGeomItem - The glGeomItem value.
   */
  removeGLGeomItem(glGeomItem: GLGeomItem): void {
    const index = this.glGeomItems.indexOf(glGeomItem)
    const geomItemIndices = this.glGeomIdsMapping[glGeomItem.geomId]
    geomItemIndices.splice(geomItemIndices.indexOf(index), 1)
    if (geomItemIndices.length == 0) {
      delete this.glGeomIdsMapping[glGeomItem.geomId]
    }

    const eventHandlers = this.glgeomItemEventHandlers[index]
    glGeomItem.geomItem.off('highlightChanged', eventHandlers.highlightChanged)
    glGeomItem.off('visibilityChanged', eventHandlers.visibilityChanged)
    glGeomItem.off('cullStateChanged', eventHandlers.cullStateChanged)

    this.glGeomItems[index] = null
    this.glgeomItemEventHandlers[index] = null
    this.drawIdsArray[index] = 0
    this.drawElementOffsets[index] = 0
    this.drawElementCounts[index] = 0
    this.freeIndices.push(index)

    if (glGeomItem.isVisible()) {
      const drawIndex = this.drawOrderIndices.indexOf(index)
      this.drawOrderIndices.splice(drawIndex, 1)
      this.drawIdsBufferDirty = true
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      const highlightIndex = this.highlightedItems.indexOf(glGeomItem)
      this.highlightedItems.splice(highlightIndex, 1)
      this.highlightedIdsBufferDirty = true
    }
    this.emit('updated')
  }

  // ////////////////////////////////////
  // Draw Ids

  /**
   * The updateDrawIDsBuffer method.
   * @param renderstate - The object used to track state changes during rendering.
   */
  updateDrawIDsBuffer(renderstate: RenderState): void {
    {
      if (!this.drawIdsArray || this.drawOrderIndices.length > this.drawIdsArray.length) {
        this.drawIdsArray = new Float32Array(this.drawOrderIndices.length)
        this.drawElementOffsets = new Int32Array(this.drawOrderIndices.length)
        this.drawElementCounts = new Int32Array(this.drawOrderIndices.length)
      }

      this.drawOrderIndices.forEach((itemIndex, drawIndex) => {
        const glGeomItem = this.glGeomItems[itemIndex]!
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        this.drawElementOffsets[drawIndex] = offsetAndCount[0]
        this.drawElementCounts[drawIndex] = offsetAndCount[1]
        this.drawIdsArray[drawIndex] = glGeomItem.drawItemId
      })
    }

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)

    const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.drawOrderIndices.length))) * 2
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
      const format = tex.getFormat()
      const type = tex.getType()
      const rows = Math.ceil((xoffset + this.drawOrderIndices.length) / texWidth)

      let consumed = 0
      let remaining = this.drawOrderIndices.length
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
   * @param renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate: RenderState): void {
    if (this.highlightedIdsBufferDirty) {
      if (!this.highlightedIdsArray || this.highlightedItems.length > this.highlightedIdsArray.length) {
        this.highlightedIdsArray = new Float32Array(this.highlightedItems.length)
        this.highlightElementOffsets = new Int32Array(this.highlightedItems.length)
        this.highlightElementCounts = new Int32Array(this.highlightedItems.length)
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
      const format = tex.getFormat()
      const type = tex.getType()
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
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState): void {
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer(renderstate)
    }
    // Note: updateDrawIDsBuffer first, as this avoids a case where the buffers stay dirty
    // because the last item was removed.
    if (this.drawOrderIndices.length == 0) {
      return
    }
    if (this.drawIdsTexture) {
      const { drawIdsTexture } = renderstate.unifs
      this.drawIdsTexture.bindToUniform(renderstate, drawIdsTexture)
    }

    this.bindAndRender(
      renderstate,
      this.drawIdsArray,
      this.drawElementCounts,
      this.drawElementOffsets,
      this.drawOrderIndices.length
    )
  }

  /**
   * The drawHighlighted method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate: RenderState): void {
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

    this.bindAndRender(
      renderstate,
      this.highlightedIdsArray,
      this.highlightElementCounts,
      this.highlightElementOffsets,
      this.highlightedItems.length
    )
  }

  /**
   * The bindAndRender method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param counts - the counts for each element drawn in by this draw call.
   * @param offsets - the offsets for each element drawn in by this draw call.
   * @private
   */
  bindAndRender(
    renderstate: RenderState,
    drawIdsArray: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ): void {
    const gl = this.gl
    const unifs = renderstate.unifs

    // Specify an instanced draw to the shader so it knows how
    // to retrieve the modelmatrix.
    if (unifs.instancedDraw) {
      gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)
    }

    renderstate.bindViewports(unifs, () => {
      this.multiDraw(renderstate, drawIdsArray, counts, offsets, drawCount)
    })
  }

  /**
   * Draw an item to screen.
   * @param renderstate - The object tracking the current state of the renderer
   * @param drawIds - the draw id for each element drawn in by this draw call.
   * @param counts - the geom element count for each element drawn in by this draw call.
   * @param offsets - the geom element offset for each element drawn in by this draw call.
   * @param drawCount - the number of active draw calls for this invocation
   */
  abstract multiDraw(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ): void

  /**
   * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
   * @param viewPos - The position of the camera that we are sorting relative to.
   */
  sortItems(viewPos: Vec3): void {
    const distances: number[] = []
    this.drawOrderIndices.forEach((itemIndex, drawIndex) => {
      const glGeomItem = this.glGeomItems[itemIndex]
      if (glGeomItem) {
        const mat4 = glGeomItem.geomItem.geomMatParam.value
        const dist = mat4.translation.distanceTo(viewPos)
        // distances.push(dist)
        distances[drawIndex] = dist
        // this.drawOrderIndices[index] = index
      }
    })
    this.drawOrderIndices.sort((a, b) => distances[b] - distances[a])

    const drawElementCounts = new Int32Array(this.drawElementCounts.length)
    const drawElementOffsets = new Int32Array(this.drawElementOffsets.length)
    this.drawOrderIndices.forEach((itemIndex, drawIndex) => {
      const glGeomItem = this.glGeomItems[itemIndex]
      if (glGeomItem) {
        drawElementCounts[drawIndex] = this.drawElementCounts[itemIndex]
        drawElementOffsets[drawIndex] = this.drawElementOffsets[itemIndex]
        this.drawIdsArray[drawIndex] = glGeomItem.drawItemId
      }
    })
    this.drawElementCounts = drawElementCounts
    this.drawElementOffsets = drawElementOffsets
    this.drawIdsBufferDirty = true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
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
