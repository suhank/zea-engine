import { Vec3 } from '../../Math/Vec3'
import { Plane } from '../../SceneTree'
import '../../SceneTree/GeomItem'

import { EventEmitter, MathFunctions, Allocator1D } from '../../Utilities/index'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { checkFramebuffer } from '../GLFbo'
import { GLTexture2D } from '../GLTexture2D'
import { FattenLinesShader } from '../Shaders/FattenLinesShader'
import { GeomDataRenderState, RenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
import { GLGeomItem } from './GLGeomItem'
import { GLMesh } from './GLMesh'

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
class GLGeomItemSetMultiDrawCompoundGeom extends EventEmitter {
  protected renderer: GLBaseRenderer
  protected gl: WebGL12RenderingContext
  protected glGeomItems: Array<GLGeomItem | null> = []
  protected glGeomIdsMapping: Record<string, any> = {}
  protected glgeomItemEventHandlers: any[] = []
  protected freeIndices: number[] = []
  protected visibleItems: GLGeomItem[] = []
  protected dirtyGeomItems: Set<number> = new Set()
  protected drawIdsBufferDirty: boolean = true

  // protected drawCounts: Record<string, number> = {}
  protected drawIdsArraysAllocators: Record<string, Allocator1D> = {}
  protected drawIdsArrays: Record<string, Float32Array> = {}
  protected drawIdsTextures: Record<string, GLTexture2D> = {}
  protected drawElementCounts: Record<string, Int32Array> = {}
  protected drawElementOffsets: Record<string, Int32Array> = {}

  protected highlightedItems: Record<number, number> = {}
  protected highlightedIdsArraysAllocators: Record<string, Allocator1D> = {}
  // protected highlightedDrawCounts: Record<string, number> = {}
  protected highlightElementCounts: Record<string, Int32Array> = {}
  protected highlightElementOffsets: Record<string, Int32Array> = {}
  protected highlightedIdsArray?: Record<string, Float32Array> = {}
  protected highlightedIdsTextures: Record<string, GLTexture2D> = {}
  protected dirtyHighlightedGeomItems: Set<number> = new Set()
  protected highlightedIdsBufferDirty: boolean = true

  protected linesGeomDataBuffer: GLTexture2D | null = null
  protected fattenLinesShader: FattenLinesShader | null = null
  protected quad: GLMesh | null = null
  protected fbo: WebGLFramebuffer | null = null

  /**
   * Create a GL geom item set.
   * @param {GLBaseRenderer} renderer - The renderer object.
   */
  constructor(renderer: GLBaseRenderer) {
    super()
    this.renderer = renderer
    this.gl = <WebGL12RenderingContext>renderer.gl

    this.renderer.glGeomLibrary.on('geomDataChanged', (event: any) => {
      const geomItemIndices = this.glGeomIdsMapping[event.index]
      if (geomItemIndices != undefined) {
        geomItemIndices.forEach((index: number) => {
          this.dirtyGeomItems.add(index)
          if (!this.drawIdsBufferDirty) {
            this.drawIdsBufferDirty = true
            this.emit('updated')
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
      this.visibleItems.push(glGeomItem)
      this.dirtyGeomItems.add(index)
    }
    eventHandlers.visibilityChanged = (event: Record<string, any>) => {
      if (event.visible) {
        this.visibleItems.push(glGeomItem)
      } else {
        this.visibleItems.splice(this.visibleItems.indexOf(glGeomItem), 1)
      }
      this.dirtyGeomItems.add(index)
      // console.log(this.constructor.name, ' visibleItems', this.visibleItems.length)
      if (!this.drawIdsBufferDirty) {
        this.drawIdsBufferDirty = true
        this.emit('updated')
      }
    }
    glGeomItem.on('visibilityChanged', eventHandlers.visibilityChanged)

    // //////////////////////////////
    // Highlighted
    const addItemToHighlight = (highlightName: string) => {
      // Check to see if the highlight key contains
      // a subGeomIndex at the end separated by a ':'
      const subGeomIndexIndex = highlightName.indexOf(':')
      let subGeomIndex = -1
      if (subGeomIndexIndex != -1) {
        subGeomIndex = Number.parseInt(highlightName.substring(subGeomIndexIndex + 1))
      }
      // Note: highlightChanged is fired when the color changes
      // or another highlight is added over the top. We avoid
      // adding the same index again here. (TODO: use Set?)
      if (this.highlightedItems[index] && this.highlightedItems[index] == subGeomIndex) return
      this.highlightedItems[index] = subGeomIndex
      this.highlightedIdsBufferDirty = true
      this.emit('updated')
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      addItemToHighlight(glGeomItem.geomItem.getHighlightName())
    }

    eventHandlers.highlightChanged = (event: Record<string, any>) => {
      if (event && event.name) {
        addItemToHighlight(event.name)
      } else {
        delete this.highlightedItems[index]
        // console.log("highlightChanged:", glGeomItem.geomItem.getName(), glGeomItem.geomItem.isHighlighted(), this.highlightedItems)
        this.highlightedIdsBufferDirty = true
        this.emit('updated')
      }
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
    if (geomItemIndices.length == 0) {
      delete this.glGeomIdsMapping[glGeomItem.geomId]
    }

    const eventHandlers = this.glgeomItemEventHandlers[index]
    glGeomItem.geomItem.off('highlightChanged', eventHandlers.highlightChanged)
    glGeomItem.off('visibilityChanged', eventHandlers.visibilityChanged)

    this.glGeomItems[index] = null
    this.glgeomItemEventHandlers[index] = null
    delete this.drawIdsArrays[index]
    delete this.drawElementOffsets[index]
    delete this.drawElementCounts[index]
    this.freeIndices.push(index)

    if (glGeomItem.isVisible()) {
      const visibleItemIndex = this.visibleItems.indexOf(glGeomItem)
      this.visibleItems.splice(visibleItemIndex, 1)
      this.drawIdsBufferDirty = true
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      delete this.highlightedItems[index]
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
   * @param {RenderState} renderstate - The object used to track state changes during rendering.
   */
  updateDrawIDsBuffer(renderstate: RenderState) {
    this.dirtyGeomItems.forEach((index) => {
      const glGeomItem = this.glGeomItems[index]!
      if (glGeomItem.isVisible()) {
        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
        let drawCounts: Record<string, number> = {}
        if (true) {
          // for shattered geoms, we draw once for each subgeom for each element type
          drawCounts['TRIANGLES'] = geomBuffers.subGeomCounts['TRIANGLES'].length
          drawCounts['LINES'] = geomBuffers.subGeomCounts['LINES'].length
        } else {
          // for non-shattered geoms, we just draw once for each element type per GeomItem.
          for (let key in geomBuffers.counts) {
            if (geomBuffers.counts[key] > 0) drawCounts[key] = 1
          }
        }
        for (let key in drawCounts) {
          const drawCount = drawCounts[key]
          // if (drawCount == 0) continue

          if (!this.drawIdsArraysAllocators[key]) {
            this.drawIdsArraysAllocators[key] = new Allocator1D()
          }
          const prevAllocation = this.drawIdsArraysAllocators[key].getAllocation(index)
          const newAllocation = this.drawIdsArraysAllocators[key].allocate(index, drawCount)
          if (prevAllocation && prevAllocation.start != newAllocation.start && this.drawIdsArrays[key]) {
            // Clear the previous allocation to remove any rendering.
            for (let i = 0; i < prevAllocation.size; i++) {
              this.drawIdsArrays[key][prevAllocation.start + i] = 0
              this.drawElementOffsets[key][prevAllocation.start + i] = 0
              this.drawElementCounts[key][prevAllocation.start + i] = 0
            }
          }
        }
      } else {
        for (let key in this.drawIdsArraysAllocators) {
          if (this.drawIdsArraysAllocators[key]) {
            this.drawIdsArraysAllocators[key].deallocate(index)
          }
        }
      }
    })

    let regen = false
    for (let key in this.drawIdsArraysAllocators) {
      const allocator = this.drawIdsArraysAllocators[key]
      if (!this.drawElementCounts[key] || allocator.reservedSpace > this.drawElementCounts[key].length) {
        if (this.drawElementCounts[key] && allocator.reservedSpace > this.drawElementCounts[key].length) regen = true
        this.drawIdsArrays[key] = new Float32Array(allocator.reservedSpace * 4) // one RGBA pixel per drawn geometry.
        this.drawElementOffsets[key] = new Int32Array(allocator.reservedSpace)
        this.drawElementCounts[key] = new Int32Array(allocator.reservedSpace)
      }
    }
    if (regen) {
      for (let i = 0; i < this.visibleItems.length; i++) this.dirtyGeomItems.add(i)
    }

    const elementSize = 4 //  Uint32Array for UNSIGNED_INT
    this.dirtyGeomItems.forEach((index) => {
      const glGeomItem = this.glGeomItems[index]!
      const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
      const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)

      if (true) {
        let subIndex = 0
        const addSubGeoms = (offsets: Uint32Array, counts: Uint8Array | Uint16Array | Uint32Array, type: string) => {
          const allocator = this.drawIdsArraysAllocators[type]
          const drawIdsArray = this.drawIdsArrays[type]
          const drawElementOffsets = this.drawElementOffsets[type]
          const drawElementCounts = this.drawElementCounts[type]
          const allocation = allocator.getAllocation(index)

          const materials = geomBuffers.materials

          for (let i = 0; i < offsets.length; i++) {
            // The draw id within this element type. (e.g. TRIANGLES, LINES, POINTS)
            const drawId = allocation.start + i

            drawElementOffsets[drawId] = offsetAndCount[0] + offsets[i] * elementSize
            drawElementCounts[drawId] = counts[i]
            drawIdsArray[drawId * 4 + 0] = glGeomItem.geomItemId
            // Note: a zero value means no sub-geom was being drawn.
            drawIdsArray[drawId * 4 + 1] = subIndex + 1

            if (materials.length > 0) {
              // Note: subGeomMaterialIndices is Uint8Array, and 0 means no custom
              // material is assigned to the subGeom.
              const materialId = geomBuffers.subGeomMaterialIndices[i] - 1
              if (materialId >= 0) {
                const material = geomBuffers.materials[materialId]
                // @ts-ignore
                this.renderer!.glMaterialLibrary.addMaterial(material)
                const materialAddr = this.renderer!.glMaterialLibrary.getMaterialAllocation(material)
                drawIdsArray[drawId * 4 + 2] = materialAddr.start
              } else {
                drawIdsArray[drawId * 4 + 2] = 0.0
              }
            } else {
              drawIdsArray[drawId * 4 + 2] = 0.0
            }
            drawIdsArray[drawId * 4 + 3] = 0 // spare
            subIndex++
          }
        }
        addSubGeoms(geomBuffers.subGeomOffsets['TRIANGLES'], geomBuffers.subGeomCounts['TRIANGLES'], 'TRIANGLES')
        addSubGeoms(geomBuffers.subGeomOffsets['LINES'], geomBuffers.subGeomCounts['LINES'], 'LINES')
      } else {
        for (let key in geomBuffers.offsets) {
          const count = geomBuffers.counts[key]
          if (count == 0) continue
          const offset = geomBuffers.offsets[key]
          const allocator = this.drawIdsArraysAllocators[key]
          const allocation = allocator.getAllocation(index)
          const drawId = allocation.start
          this.drawElementOffsets[key][drawId] = offsetAndCount[0] + offset * elementSize
          this.drawElementCounts[key][drawId] = count
          this.drawIdsArrays[key][drawId * 4 + 0] = glGeomItem.geomItemId
          this.drawIdsArrays[key][drawId * 4 + 1] = 0
        }
      }
    })

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const updateDrawIdsTexture = (key: string) => {
      const drawIdsArray = this.drawIdsArrays[key]
      let drawIdsTexture = this.drawIdsTextures[key]
      const reservedSpaceDrawCount = this.drawIdsArraysAllocators[key].reservedSpace
      const unit = renderstate.boundTextures++
      gl.activeTexture(gl.TEXTURE0 + unit)

      const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(reservedSpaceDrawCount)))
      if (!drawIdsTexture) {
        drawIdsTexture = new GLTexture2D(this.gl, {
          format: 'RGBA',
          type: 'FLOAT',
          width: drawIdsTextureSize,
          height: drawIdsTextureSize,
          filter: 'NEAREST',
          wrap: 'CLAMP_TO_EDGE',
          mipMapped: false,
        })
        this.drawIdsTextures[key] = drawIdsTexture
      } else if (drawIdsTexture.width < drawIdsTextureSize || drawIdsTexture.height < drawIdsTextureSize) {
        drawIdsTexture.resize(drawIdsTextureSize, drawIdsTextureSize)
      }
      {
        const tex = drawIdsTexture
        const texWidth = drawIdsTexture.width
        gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
        const level = 0
        const xoffset = 0
        const height = 1
        const format = tex.getFormat()
        const type = tex.getType()

        const drawCount = this.drawIdsArraysAllocators[key].allocatedSpace
        const rows = Math.ceil((xoffset + drawCount) / texWidth)

        let consumed = 0
        let remaining = drawCount
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
          const data = drawIdsArray.subarray(consumed * 4, (consumed + width) * 4)
          if (data.length != width * 4) {
            throw new Error('Invalid drawIds subarray :' + data.length + ' width:' + width)
          }
          gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
          consumed += width
          remaining -= width
        }
      }

      gl.bindTexture(gl.TEXTURE_2D, null)
      renderstate.boundTextures--
    }
    for (let key in this.drawIdsArrays) {
      // TODO: Only re-upload the dirty items.
      updateDrawIdsTexture(key)
    }

    this.drawIdsBufferDirty = false
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   * @param {RenderState} renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate: RenderState) {
    if (this.highlightedIdsBufferDirty) {
      // Clear all previous highlight buffers.
      // Note: we could considerably simplify the following code if we don't plan on
      // incrementally updating the highlight code.
      this.highlightedIdsArraysAllocators = {}
      this.highlightedIdsArray = {}
      this.highlightElementOffsets = {}
      this.highlightElementCounts = {}

      for (let key in this.highlightedItems) {
        const index = Number.parseInt(key)
        const subGeomIndex = this.highlightedItems[key]
        const glGeomItem = this.glGeomItems[index]!
        // if (glGeomItem.isVisible()) {
        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
        let drawCounts: Record<string, number> = {
          TRIANGLES: 0,
          LINES: 0,
          POINTS: 0,
        }
        if (subGeomIndex != -1) {
          // for shattered geoms, we draw once for each subgeom for each element type
          if (subGeomIndex < geomBuffers.subGeomCounts['TRIANGLES'].length) drawCounts['TRIANGLES'] = 1
          else {
            const linesSubGeomIndex = subGeomIndex - geomBuffers.subGeomCounts['TRIANGLES'].length
            if (linesSubGeomIndex < geomBuffers.subGeomCounts['LINES'].length) drawCounts['LINES'] = 1
            else {
              const pointsSubGeomIndex = linesSubGeomIndex - geomBuffers.subGeomCounts['LINES'].length
              if (pointsSubGeomIndex < geomBuffers.subGeomCounts['POINTS'].length) drawCounts['POINTS'] = 1
            }
          }
        } else {
          // for non-shattered geoms, we just draw once for each element type per GeomItem.
          for (let key in geomBuffers.counts) {
            if (geomBuffers.counts[key] > 0) drawCounts[key] = 1
          }
        }
        for (let key in drawCounts) {
          const drawCount = drawCounts[key]
          // if (drawCount == 0) continue

          if (!this.highlightedIdsArraysAllocators[key]) {
            this.highlightedIdsArraysAllocators[key] = new Allocator1D()
          }
          const prevAllocation = this.highlightedIdsArraysAllocators[key].getAllocation(index)
          // if (drawCount == 0 && prevAllocation) {
          //   this.highlightedIdsArraysAllocators[key].deallocate(index)
          // }

          const newAllocation = this.highlightedIdsArraysAllocators[key].allocate(index, drawCount)
          // if (prevAllocation && prevAllocation.start != newAllocation.start && this.drawIdsArrays[key]) {
          //   // Clear the previous allocation to remove any rendering.
          //   for (let i = 0; i < prevAllocation.size; i++) {
          //     this.highlightedIdsArray[key][prevAllocation.start + i] = 0
          //     this.highlightElementOffsets[key][prevAllocation.start + i] = 0
          //     this.highlightElementCounts[key][prevAllocation.start + i] = 0
          //   }
          // }
        }
        // } else {
        //   for (let key in this.highlightedIdsArraysAllocators) {
        //     if (this.highlightedIdsArraysAllocators[key]) {
        //       this.highlightedIdsArraysAllocators[key].deallocate(index)
        //     }
        //   }
        // }
      }

      // let regen = false
      for (let key in this.highlightedIdsArraysAllocators) {
        const allocator = this.highlightedIdsArraysAllocators[key]
        if (!this.highlightElementCounts[key] || allocator.reservedSpace > this.highlightElementCounts[key].length) {
          // if (this.highlightElementCounts[key] && allocator.reservedSpace > this.highlightElementCounts[key].length) regen = true
          this.highlightedIdsArray[key] = new Float32Array(allocator.reservedSpace * 4) // one RGBA pixel per drawn geometry.
          this.highlightElementOffsets[key] = new Int32Array(allocator.reservedSpace)
          this.highlightElementCounts[key] = new Int32Array(allocator.reservedSpace)
        }
      }
      // if (regen) {
      //   for (let i = 0; i < this.visibleItems.length; i++) this.dirtyGeomItems.add(i)
      // }

      const elementSize = 4 //  Uint32Array for UNSIGNED_INT
      for (let key in this.highlightedItems) {
        const index = Number.parseInt(key)
        const subGeomIndex = this.highlightedItems[key]
        const glGeomItem = this.glGeomItems[index]!
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)

        if (subGeomIndex != -1) {
          // let subIndex = 0
          const addSubGeom = (
            offsets: Uint32Array,
            counts: Uint8Array | Uint16Array | Uint32Array,
            type: string,
            subIndex: number
          ) => {
            const allocator = this.highlightedIdsArraysAllocators[type]
            const drawIdsArray = this.highlightedIdsArray[type]
            const drawElementOffsets = this.highlightElementOffsets[type]
            const drawElementCounts = this.highlightElementCounts[type]
            const allocation = allocator.getAllocation(index)

            // for (let i = 0; i < offsets.length; i++) {
            const drawId = allocation.start

            drawElementOffsets[drawId] = offsetAndCount[0] + offsets[subIndex] * elementSize
            drawElementCounts[drawId] = counts[subIndex]
            drawIdsArray[drawId * 4 + 0] = glGeomItem.geomItemId
            drawIdsArray[drawId * 4 + 1] = subGeomIndex + 1
            // drawIdsArray[drawId * 4 + 2] = subGeom.materialId ? subGeom.materialId : -1.0
            drawIdsArray[drawId * 4 + 3] = 0.0 // spare
            //   subIndex++
            // }
          }
          if (subGeomIndex < geomBuffers.subGeomCounts['TRIANGLES'].length) {
            addSubGeom(
              geomBuffers.subGeomOffsets['TRIANGLES'],
              geomBuffers.subGeomCounts['TRIANGLES'],
              'TRIANGLES',
              subGeomIndex
            )
          } else {
            const linesSubGeomIndex = subGeomIndex - geomBuffers.subGeomCounts['TRIANGLES'].length
            if (linesSubGeomIndex < geomBuffers.subGeomCounts['LINES'].length) {
              addSubGeom(
                geomBuffers.subGeomOffsets['LINES'],
                geomBuffers.subGeomCounts['LINES'],
                'LINES',
                linesSubGeomIndex
              )
            } else {
              const pointsSubGeomIndex = linesSubGeomIndex - geomBuffers.subGeomCounts['LINES'].length
              if (pointsSubGeomIndex < geomBuffers.subGeomCounts['POINTS'].length) {
                // addSubGeoms(geomBuffers.subGeomOffsets['LINES'], geomBuffers.subGeomCounts['LINES'], 'LINES', pointsSubGeomIndex)
              }
            }
          }
        } else {
          for (let key in geomBuffers.offsets) {
            const count = geomBuffers.counts[key]
            if (count == 0) continue
            const offset = geomBuffers.offsets[key]
            const allocator = this.highlightedIdsArraysAllocators[key]
            const allocation = allocator.getAllocation(index)
            const drawId = allocation.start
            this.highlightElementOffsets[key][drawId] = offsetAndCount[0] + offset * elementSize
            this.highlightElementCounts[key][drawId] = count
            this.highlightedIdsArray[key][drawId * 4 + 0] = glGeomItem.geomItemId
          }
        }
      }

      this.highlightedIdsBufferDirty = false
    }

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const updateDrawIdsTexture = (key: string) => {
      const drawIdsArray = this.highlightedIdsArray[key]
      if (!drawIdsArray || drawIdsArray.length == 0) return
      let drawIdsTexture = this.highlightedIdsTextures[key]
      const reservedSpaceDrawCount = this.highlightedIdsArraysAllocators[key].reservedSpace
      const unit = renderstate.boundTextures++
      gl.activeTexture(gl.TEXTURE0 + unit)

      const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(reservedSpaceDrawCount)))
      if (!drawIdsTexture) {
        drawIdsTexture = new GLTexture2D(this.gl, {
          format: 'RGBA',
          type: 'FLOAT',
          width: drawIdsTextureSize,
          height: drawIdsTextureSize,
          filter: 'NEAREST',
          wrap: 'CLAMP_TO_EDGE',
          mipMapped: false,
        })
        this.highlightedIdsTextures[key] = drawIdsTexture
      } else if (drawIdsTexture.width < drawIdsTextureSize || drawIdsTexture.height < drawIdsTextureSize) {
        drawIdsTexture.resize(drawIdsTextureSize, drawIdsTextureSize)
      }
      {
        const tex = drawIdsTexture
        const texWidth = drawIdsTexture.width
        gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
        const level = 0
        const xoffset = 0
        const height = 1
        const format = tex.getFormat()
        const type = tex.getType()

        const drawCount = this.highlightedIdsArraysAllocators[key].allocatedSpace
        const rows = Math.ceil((xoffset + drawCount) / texWidth)

        let consumed = 0
        let remaining = drawCount
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
          const data = drawIdsArray.subarray(consumed * 4, (consumed + width) * 4)
          if (data.length != width * 4) {
            throw new Error('Invalid drawIds subarray :' + data.length + ' width:' + width)
          }
          gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
          consumed += width
          remaining -= width
        }
      }

      gl.bindTexture(gl.TEXTURE_2D, null)
      renderstate.boundTextures--
    }
    for (let key in this.highlightedIdsArray) {
      // TODO: Only re-upload the dirty items.
      updateDrawIdsTexture(key)
    }
  }
  // ////////////////////////////////////
  // Drawing

  /**
   * The draw method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    if (this.visibleItems.length == 0) {
      return
    }
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer(renderstate)
    }

    this.bindAndRender(
      renderstate,
      this.drawIdsArrays,
      this.drawElementCounts,
      this.drawElementOffsets,
      this.drawIdsTextures,
      this.drawIdsArraysAllocators
    )
  }

  /**
   * The drawGeomData method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState) {
    const gl = this.renderer.gl
    const unifs = renderstate.unifs

    gl.depthFunc(gl.LEQUAL)

    const { drawIdsTexture } = unifs
    this.renderer.glGeomLibrary.bind(renderstate)

    const { geomType } = unifs

    const counts: Record<string, Int32Array> = this.drawElementCounts
    const offsets: Record<string, Int32Array> = this.drawElementOffsets
    const drawIdsTextures: Record<string, GLTexture2D> = this.drawIdsTextures
    const allocators: Record<string, Allocator1D> = this.drawIdsArraysAllocators
    const drawIdsArray: Record<string, Float32Array> = this.drawIdsArrays

    renderstate.bindViewports(unifs, () => {
      if (drawIdsArray['TRIANGLES'] && allocators['TRIANGLES'].allocatedSpace > 0) {
        drawIdsTextures['TRIANGLES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, 2)

        this.multiDrawMeshes(
          renderstate,
          drawIdsArray['TRIANGLES'],
          counts['TRIANGLES'],
          offsets['TRIANGLES'],
          allocators['TRIANGLES'].allocatedSpace
        )
      }
    })

    //  Note: lines in VR are not fattened...
    if (renderstate.geomDataFbo) {
      if (!this.linesGeomDataBuffer) {
        this.linesGeomDataBuffer = new GLTexture2D(gl, {
          type: this.renderer.floatGeomBuffer ? 'FLOAT' : 'UNSIGNED_BYTE',
          format: 'RGBA',
          filter: 'NEAREST',
          width: 1,
          height: 2,
        })
        this.fattenLinesShader = new FattenLinesShader(gl)
        this.quad = new GLMesh(gl, new Plane(1, 1))
      }

      const geomDataFbo = renderstate.geomDataFbo
      const width = geomDataFbo.width
      const height = geomDataFbo.height

      if (this.linesGeomDataBuffer.width != width || this.linesGeomDataBuffer.height != height) {
        if (this.fbo) {
          gl.deleteFramebuffer(this.fbo)
          this.fbo = null
        }

        this.linesGeomDataBuffer.resize(width, height)

        this.fbo = gl.createFramebuffer()

        const colorTex = this.linesGeomDataBuffer.glTex
        const depthBuffer = geomDataFbo.__depthTexture // Share the existing depth buffer.
        if (gl.name == 'webgl2') {
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo)
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0)
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthBuffer, 0)
        } else {
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0)
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthBuffer, 0)
        }
        checkFramebuffer(gl, width, height)
      } else {
        if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo)
        else gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
      }

      gl.colorMask(true, true, true, true)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }

    // this.bindAndRender(
    //   renderstate,
    //   this.drawIdsArrays,
    //   this.drawElementCounts,
    //   this.drawElementOffsets,
    //   this.drawIdsTextures,
    //   this.drawIdsArraysAllocators
    // )
    renderstate.bindViewports(unifs, () => {
      if (drawIdsArray['LINES'] && allocators['LINES'].allocatedSpace > 0) {
        drawIdsTextures['LINES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, 1)

        this.multiDrawLines(
          renderstate,
          drawIdsArray['LINES'],
          counts['LINES'],
          offsets['LINES'],
          allocators['LINES'].allocatedSpace
        )
      }
      if (drawIdsArray['POINTS'] && allocators['POINTS'].allocatedSpace > 0) {
        drawIdsTextures['POINTS'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, 0)

        this.multiDrawPoints(
          renderstate,
          drawIdsArray['POINTS'],
          counts['POINTS'],
          offsets['POINTS'],
          allocators['POINTS'].allocatedSpace
        )
      }
    })

    if (renderstate.geomDataFbo) {
      renderstate.geomDataFbo.bindForWriting(renderstate)

      this.fattenLinesShader!.bind(renderstate)

      const { colorTexture, screenSize } = renderstate.unifs
      this.linesGeomDataBuffer!.bindToUniform(renderstate, colorTexture)

      const geomDataFbo = renderstate.geomDataFbo
      gl.uniform2f(screenSize.location, geomDataFbo.width, geomDataFbo.height)

      this.quad!.bindAndDraw(renderstate)
    }
  }

  /**
   * The drawHighlighted method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate: RenderState) {
    if (Object.keys(this.highlightedItems).length == 0) {
      return
    }
    if (this.highlightedIdsBufferDirty) {
      this.updateHighlightedIDsBuffer(renderstate)
    }
    // console.log(this.highlightedIdsArray)
    // console.log(this.highlightElementCounts)
    // console.log(this.highlightElementOffsets)

    this.bindAndRender(
      renderstate,
      this.highlightedIdsArray,
      this.highlightElementCounts,
      this.highlightElementOffsets,
      this.highlightedIdsTextures,
      this.highlightedIdsArraysAllocators
    )
  }

  /**
   * The bindAndRender method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @param {Array} counts - the counts for each element drawn in by this draw call.
   * @param {Array} offsets - the offsets for each element drawn in by this draw call.
   * @private
   */
  bindAndRender(
    renderstate: RenderState,
    drawIdsArray: Record<string, Float32Array>,
    counts: Record<string, Int32Array>,
    offsets: Record<string, Int32Array>,
    drawIdsTextures: Record<string, GLTexture2D>,
    allocators: Record<string, Allocator1D>
  ) {
    const gl = this.gl
    const unifs = renderstate.unifs

    // Specify an instanced draw to the shader so it knows how
    // to retrieve the geomItemId.
    // if (unifs.instancedDraw) {
    //   gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)
    // }

    gl.depthFunc(gl.LEQUAL)

    const { drawIdsTexture } = renderstate.unifs
    this.renderer.glGeomLibrary.bind(renderstate)

    const { geomType } = renderstate.unifs
    renderstate.bindViewports(unifs, () => {
      if (drawIdsArray['TRIANGLES'] && allocators['TRIANGLES'].allocatedSpace > 0) {
        drawIdsTextures['TRIANGLES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, 0)

        this.multiDrawMeshes(
          renderstate,
          drawIdsArray['TRIANGLES'],
          counts['TRIANGLES'],
          offsets['TRIANGLES'],
          allocators['TRIANGLES'].allocatedSpace
        )
      }
      if (drawIdsArray['LINES'] && allocators['LINES'].allocatedSpace > 0) {
        drawIdsTextures['LINES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, 1)

        this.multiDrawLines(
          renderstate,
          drawIdsArray['LINES'],
          counts['LINES'],
          offsets['LINES'],
          allocators['LINES'].allocatedSpace
        )
      }
      if (drawIdsArray['POINTS'] && allocators['POINTS'].allocatedSpace > 0) {
        drawIdsTextures['POINTS'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, 2)

        this.multiDrawPoints(
          renderstate,
          drawIdsArray['POINTS'],
          counts['POINTS'],
          offsets['POINTS'],
          allocators['POINTS'].allocatedSpace
        )
      }
    })

    // Reset to drawing triangles in case the shader is used
    // to draw a regular mesh next.
    if (geomType) gl.uniform1i(geomType.location, 0)
  }

  multiDrawMeshes(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    const gl = this.gl
    if (gl.multiDrawElements) {
      gl.multiDrawElements(gl.TRIANGLES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
    } else {
      const { drawId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i * 4])
        gl.drawElements(gl.TRIANGLES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }
    }
  }

  multiDrawLines(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    const gl = this.gl

    // // don't rely on z-Buffer for line, disable depth check
    // gl.disable(gl.DEPTH_TEST)

    // // enable stencil buffer check instead
    // gl.enable(gl.STENCIL_TEST)

    // gl.stencilMask(0x00)

    // // render line only where stencil buffer was incremented exactly twice
    // gl.stencilFunc(gl.EQUAL, 2, 0xff)

    if (gl.multiDrawElements) {
      const { occluded } = renderstate.unifs
      if (occluded) {
        gl.uniform1i(occluded.location, 0)
      }

      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)

      if (occluded) {
        gl.uniform1i(occluded.location, 1)
        gl.depthFunc(gl.GREATER)
        gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
        gl.depthFunc(gl.LEQUAL)
      }
    } else {
      const { drawId, occluded } = renderstate.unifs
      if (occluded) {
        gl.uniform1i(occluded.location, 0)
      }

      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i * 4])
        gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }

      if (occluded) {
        gl.uniform1i(occluded.location, 1)
        gl.depthFunc(gl.GREATER)
        for (let i = 0; i < drawCount; i++) {
          gl.uniform1i(drawId.location, drawIds[i * 4])
          gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
        }
        gl.depthFunc(gl.LEQUAL)
      }
    }

    // restore flags to initial order
    // gl.disable(gl.STENCIL_TEST)
    // gl.enable(gl.DEPTH_TEST)
  }

  multiDrawPoints(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    const gl = this.gl
    if (gl.multiDrawElements) {
      gl.multiDrawElements(gl.POINTS, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
      // gl.multiDrawArrays(gl.POINTS, offsets, 0, counts, 0, drawCount)
    } else {
      const { drawId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i * 4])
        gl.drawElements(gl.POINTS, counts[i], gl.UNSIGNED_INT, offsets[i])
      }
    }
  }

  // /**
  //  * Draw an item to screen.
  //  * @param {RenderState} renderstate - The object tracking the current state of the renderer
  //  * @param {Float32Array} drawIds - the draw id for each element drawn in by this draw call.
  //  * @param {Int32Array} counts - the geom element count for each element drawn in by this draw call.
  //  * @param {Int32Array} offsets - the geom element offset for each element drawn in by this draw call.
  //  * @param {number} drawCount - the number of active draw calls for this invocation
  //  */
  // abstract multiDraw(
  //   renderstate: RenderState,
  //   drawIds: Float32Array,
  //   counts: Int32Array,
  //   offsets: Int32Array,
  //   drawCount: number
  // ): void

  /**
   * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
   * @param {Vec3} viewPos - The position of the camera that we are sorting relative to.
   */
  sortItems(viewPos: Vec3) {
    const distances: any[] = []
    const indices: any[] = []
    this.visibleItems.forEach((glGeomItem, index) => {
      if (glGeomItem) {
        const mat4 = glGeomItem.geomItem.geomMatParam.value
        const dist = mat4.translation.distanceTo(viewPos)
        distances.push(dist)
        indices.push(index)
      }
    })
    indices.sort((a, b) => distances[b] - distances[a])

    // TODO:

    // const visibleItems: any[] = []
    // const drawElementCounts = new Int32Array(this.drawElementCounts['TRIANGLES'].length)
    // const drawElementOffsets = new Int32Array(this.drawElementOffsets['TRIANGLES'].length)
    // indices.forEach((tgtIndex, srcIndex) => {
    //   visibleItems[srcIndex] = this.visibleItems[tgtIndex]
    //   drawElementCounts[srcIndex] = this.drawElementCounts['TRIANGLES'][tgtIndex]
    //   drawElementOffsets[srcIndex] = this.drawElementOffsets['TRIANGLES'][tgtIndex]
    //   this.drawIdsArrays['TRIANGLES'][srcIndex] = this.visibleItems[tgtIndex].geomItemId
    // })
    // this.visibleItems = visibleItems
    // this.drawElementCounts['TRIANGLES'] = drawElementCounts
    // this.drawElementOffsets['TRIANGLES'] = drawElementOffsets
    // this.drawIdsBufferDirty = true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    for (let key in this.drawIdsTextures) {
      this.drawIdsTextures[key].destroy()
    }
    for (let key in this.highlightedIdsTextures) {
      this.highlightedIdsTextures[key].destroy()
    }

    this.emit('destructing')
  }
}

export { GLGeomItemSetMultiDrawCompoundGeom }
