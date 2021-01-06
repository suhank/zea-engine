/* eslint-disable guard-for-in */
import { EventEmitter, MathFunctions, Allocator1D } from '../../Utilities/index'
import { GLGeomItemSet } from './GLGeomItemSet.js'
import { generateShaderGeomBinding } from './GeomShaderBinding.js'
import { GLTexture2D } from '../GLTexture2D.js'

const resizeIntArray = (intArray, newSize) => {
  const newArray = new Int32Array(newSize)
  newArray.set(intArray)
  return newArray
}

/** Class representing a GL geom.
 * @private
 */
class GLGeomSet extends EventEmitter {
  /**
   * Create a GLGeomSet.
   * @param {WebGL2RenderingContext} gl - The list of attributes to be uploaded
   * @param {object} shaderAttrSpec - The list of attributes to be uploaded
   */
  constructor(gl, shaderAttrSpec) {
    super()

    this.__gl = gl
    this.shaderAttrSpec = shaderAttrSpec

    this.geoms = []
    this.geomBuffersTmp = [] // for each geom, these are the buffer
    this.glattrbuffers = {}
    this.shaderBindings = {}
    this.bufferNeedsRealloc = false
    this.attributesAllocator = new Allocator1D()
    this.dirtyGeomIndices = new Set()

    // If the allocator ever resizes, then we need to re-upload everything.
    this.attributesAllocator.on('resized', () => {
      this.dirtyGeomIndices = new Set(Array.from({ length: this.geoms.length }, (_, i) => i))
      this.bufferNeedsRealloc = true
    })
    this.attributesAllocator.on('dataReallocated', (event) => {
      // during allocation, a defragment might occur, which means
      // we need to re-upload some of our data.
      const id = event.id
      const allocation = event.allocation
      this.dirtyGeomIndices.add(id)

      this.geomVertexOffsets[id] = allocation.start
      this.geomVertexCounts[id] = allocation.size
    })

    this.geomVertexCounts = new Int32Array(0)
    this.geomVertexOffsets = new Int32Array(0)

    this.glGeomItemSets = []
    this.drawCount = 0
    this.maxGeomItemSetDrawCount = 0
    this.highlightedCount = 0
    this.instanceCountsDraw = new Int32Array(0)
    this.instanceCountsHighlight = new Int32Array(0)

    this.drawIdsAllocator = new Allocator1D()
    this.drawIdsTexture = null
    this.dirtyDrawIndexIndices = new Set()

    this.highlightedIdsAllocator = new Allocator1D()
    this.highlightedIdsTexture = null
    this.dirtyDrawHighlightIndices = []
  }

  /**
   * Adds a geom to the GLGeomSet.
   *
   * @param {BaseGeom} geom - The geom to be managed by this GLGeomSet.
   * @return {number} - The index of the geom in the GLGeomSet
   */
  addGeom(geom) {
    const index = this.geoms.length

    const geomDataChanged = (event) => {
      this.dirtyGeomIndices.add(index)
    }
    const geomDataTopologyChanged = (event) => {
      this.dirtyGeomIndices.add(index)
    }
    geom.on('geomDataChanged', geomDataChanged)
    geom.on('geomDataTopologyChanged', geomDataTopologyChanged)

    this.geoms.push({
      geom,
      geomDataChanged,
      geomDataTopologyChanged,
    })
    this.dirtyGeomIndices.add(index)

    this.geomVertexCounts = resizeIntArray(this.geomVertexCounts, this.geomVertexCounts.length + 1)
    this.geomVertexOffsets = resizeIntArray(this.geomVertexOffsets, this.geomVertexOffsets.length + 1)

    this.geomVertexCounts[index] = 0
    this.geomVertexOffsets[index] = 0
    return index
  }

  /**
   * Removes a geom from the GLGeomSet.
   *
   * @param {BaseGeom} geom - The geom to be removed from this GLGeomSet.
   * @return {number} - The index of the geom in the GLGeomSet
   */
  removeGeom(geom) {
    const item = this.geoms.find((item) => {
      return item.geom == geom
    })
    geom.off('geomDataChanged', item.geomDataChanged)
    geom.off('geomDataTopologyChanged', item.geomDataTopologyChanged)

    geom.deleteMetadata('glgeomset', this)
    this.geoms.splice(index, 1)
    return index
  }

  /**
   * Returns a Geom managed by this GLGeomSet.
   * @param {number} index - The index of the geom to remove
   * @return {BaseGeom} - The return value.
   */
  getGeom(index) {
    return this.geoms[index].geom
  }

  /**
   * The addGeomItemSet method.
   * @param {number} index - The index for the new glGeomItemSet
   */
  addGeomItemSet(index) {
    const glGeomItemSet = new GLGeomItemSet()
    this.glGeomItemSets[index] = glGeomItemSet
    this.instanceCountsDraw = resizeIntArray(this.instanceCountsDraw, this.instanceCountsDraw.length + 1)
    this.instanceCountsHighlight = resizeIntArray(this.instanceCountsHighlight, this.instanceCountsHighlight.length + 1)
    const drawCountChanged = (event) => {
      this.instanceCountsDraw[index] += event.change
      this.drawCount += event.change
      if (this.maxGeomItemSetDrawCount < event.count) this.maxGeomItemSetDrawCount = event.count

      this.dirtyDrawIndexIndices.add(index)

      this.drawIdsAllocator.allocate(index, event.count)

      this.emit('updated')
    }
    const highlightedCountChanged = (event) => {
      this.instanceCountsHighlight[index] += event.change
      this.highlightedCount += event.change
      this.dirtyDrawHighlightIndices.push(index)

      this.highlightedIdsAllocator.allocate(index, event.count)

      this.emit('updated')
    }
    const destructing = () => {
      glGeomItemSet.off('drawCountChanged', drawCountChanged)
      glGeomItemSet.off('highlightedCountChanged', highlightedCountChanged)
      glGeomItemSet.off('destructing', destructing)

      this.drawIdsAllocator.deallocate(index)
      this.highlightedIdsAllocator.deallocate(index)

      const index = this.glGeomItemSets.indexOf(glGeomItemSet)
      this.glGeomItemSets.splice(index, 1)
      if (this.glGeomItemSets.length == 0) {
        // Remove the listeners.
        // const material = this.glMaterial.getMaterial()
        // const baseColorParam = material.getParameter('BaseColor')
        // if (baseColorParam) {
        //   baseColorParam.off('valueChanged', this.__materialChanged)
        // }
        // const opacityParam = material.getParameter('Opacity')
        // if (opacityParam) {
        //   opacityParam.off('valueChanged', this.__materialChanged)
        // }

        this.emit('destructing')
      }
    }

    glGeomItemSet.on('drawCountChanged', drawCountChanged)
    glGeomItemSet.on('highlightedCountChanged', highlightedCountChanged)
    glGeomItemSet.on('destructing', destructing)
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    const geom = glGeomItem.geomItem.getParameter('Geometry').getValue()

    let index
    if (geom.hasMetadata('glgeomset_index')) {
      index = geom.getMetadata('glgeomset_index')
    } else {
      index = this.addGeom(geom)
      geom.setMetadata('glgeomset_index', index)
    }
    if (!this.glGeomItemSets[index]) {
      this.addGeomItemSet(index)
    }
    this.glGeomItemSets[index].addGLGeomItem(glGeomItem)
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  removeGLGeomItem(glGeomItem) {
    throw new Error('TODO')
    // const geom = glGeomItem.geomItem.getParameter('Geometry').getValue()
    // const glGeomItemSet = geom.getMetadata('glGeomItemSet')
    // glGeomItemSet.removeGLGeomItem(glGeomItem)
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * Allocates space for the geomBuffers for the specified geometry
   * @param {number} index - The index of the geom to upload
   * @param {object} opts - The opts value.
   */
  allocateBuffers(index) {
    const geom = this.getGeom(index)
    const geomBuffers = geom.genBuffers()

    if (this.geomVertexCounts[index] != geomBuffers.numRenderVerts) {
      const allocation = this.attributesAllocator.allocate(index, geomBuffers.numRenderVerts)

      this.geomVertexOffsets[index] = allocation.start
      this.geomVertexCounts[index] = allocation.size
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      if (!this.shaderAttrSpec[attrName]) {
        const attrData = geomBuffers.attrBuffers[attrName]
        this.shaderAttrSpec[attrName] = {
          dataType: attrData.dataType,
          normalized: attrData.normalized,
          dimension: attrData.dimension,
        }
      }
    }
    this.geomBuffersTmp[index] = geomBuffers
  }

  /**
   * Generates the GPU buffers required to store all the geometries
   */
  genBuffers() {
    const reservedSpace = this.attributesAllocator.reservedSpace
    // console.log('GeomSet GPU buffers resized:', reservedSpace)
    const gl = this.__gl

    // eslint-disable-next-line guard-for-in
    for (const attrName in this.shaderAttrSpec) {
      const attrSpec = this.shaderAttrSpec[attrName]
      const numValues = reservedSpace * attrSpec.dimension
      attrSpec.numValues = numValues // cache for debugging only

      if (this.glattrbuffers[attrName] && this.glattrbuffers[attrName].buffer) {
        gl.deleteBuffer(this.glattrbuffers[attrName].buffer)
      }

      const attrBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)

      const elementSize = 4 // assuming floats for now. (We also need to support RGB Byte values.)
      const sizeInBytes = numValues * elementSize
      gl.bufferData(gl.ARRAY_BUFFER, sizeInBytes, gl.STATIC_DRAW)

      this.glattrbuffers[attrName] = {
        buffer: attrBuffer,
        dataType: attrSpec.dataType,
        normalized: attrSpec.normalized,
        length: numValues,
        dimension: attrSpec.dimension,
      }

      if (attrName == 'textureCoords') this.glattrbuffers['texCoords'] = this.glattrbuffers['textureCoords']
    }
  }

  /**
   * The uploadBuffers method.
   * @param {number} index - The index of the geom to upload
   */
  uploadBuffers(index) {
    let geomBuffers = this.geomBuffersTmp[index]
    if (!geomBuffers) {
      const geom = this.getGeom(index)
      geomBuffers = geom.genBuffers()
      this.geomBuffersTmp[index] = geomBuffers
    }

    const count = this.geomVertexCounts[index]
    if (count != geomBuffers.numRenderVerts) {
      throw new Error('Invalid allocation for this geom')
    }
    const gl = this.__gl

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]
      const glattrbuffer = this.glattrbuffers[attrName]

      gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer)
      const elementSize = 4 // assuming floats for now. (We also need to support RGB Byte values.)
      const dstByteOffsetInBytes = this.geomVertexOffsets[index] * elementSize * glattrbuffer.dimension
      gl.bufferSubData(gl.ARRAY_BUFFER, dstByteOffsetInBytes, attrData.values, 0)
    }
  }

  /**
   * Cleans the state of this GeomSet during rendering.
   */
  cleanGeomBuffers() {
    // First we alocate all memory needed to clean the GeomSet,
    // and then we start uploading all the data.
    // Note: during allocation, some buffers that were not dirty may
    // need to be uploaded because of re-allocation
    // Note: copy the source array as new dirty items may be added during
    // allocation.
    const dirtyGeomIndices = new Set(this.dirtyGeomIndices)
    dirtyGeomIndices.forEach((index) => {
      this.allocateBuffers(index)
    })

    if (this.bufferNeedsRealloc) {
      // If the geom buffers are re-allocated, we need to regenerate
      // all the shader bindings.
      for (const shaderkey in this.shaderBindings) {
        const shaderBinding = this.shaderBindings[shaderkey]
        shaderBinding.destroy()
      }
      this.shaderBindings = {}

      this.genBuffers()
      this.bufferNeedsRealloc = false
    }

    this.dirtyGeomIndices.forEach((index) => {
      this.uploadBuffers(index)
    })

    this.dirtyGeomIndices = new Set()
    this.geomBuffersTmp = []

    // eslint-disable-next-line guard-for-in
    for (const shaderkey in this.shaderBindings) {
      const shaderBinding = this.shaderBindings[shaderkey]
      shaderBinding.destroy()
    }
    this.shaderBindings = {}
  }

  // ////////////////////////////////////
  // Instance Ids

  /**
   * The updateDrawIDsBuffer method.
   * The culling system will specify a subset of the total number of items for
   * drawing.
   */
  updateDrawIDsBuffer() {
    const gl = this.__gl
    let texResized = false

    // console.log('updateDrawIDsBuffer', this.dirtyDrawIndexIndices)

    // Note: non POT textures caused strange problems here
    // It appears like texSubImage2D may assume a POT texture in the background.
    // Calls to texSubImage2D would generate the error: GL_INVALID_VALUE: Offset overflows texture dimensions
    // even if the coordinates appears to be correct.
    const drawIdsLayoutTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.glGeomItemSets.length)))
    // const drawIdsLayoutTextureSize = Math.ceil(Math.sqrt(this.glGeomItemSets.length))

    if (!this.drawIdsLayoutTexture) {
      this.drawIdsLayoutTexture = new GLTexture2D(gl, {
        format: 'RED',
        internalFormat: 'R32F',
        type: 'FLOAT',
        width: drawIdsLayoutTextureSize,
        height: drawIdsLayoutTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
    } else if (this.drawIdsLayoutTexture.width < drawIdsLayoutTextureSize) {
      this.drawIdsLayoutTexture.resize(drawIdsLayoutTextureSize, drawIdsLayoutTextureSize)
      texResized = true
    }

    const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.drawIdsAllocator.reservedSpace)))
    // const drawIdsTextureSize = Math.ceil(Math.sqrt(this.drawIdsAllocator.reservedSpace))

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
      texResized = true
    }

    if (texResized) {
      this.dirtyDrawIndexIndices = new Set(Array.from({ length: this.glGeomItemSets.length }, (_, i) => i))
    }

    {
      const tex = this.drawIdsLayoutTexture
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      this.dirtyDrawIndexIndices.forEach((index) => {
        const allocation = this.drawIdsAllocator.getAllocation(index)
        const data = Float32Array.of(allocation.start)
        const level = 0
        const xoffset = index % this.drawIdsLayoutTexture.width
        const yoffset = Math.floor(index / this.drawIdsLayoutTexture.width)
        const width = 1
        const height = 1
        const format = tex.__format
        const type = tex.__type
        gl.texSubImage2D(gl.TEXTURE_2D, level, xoffset, yoffset, width, height, format, type, data)
      })
    }
    {
      const tex = this.drawIdsTexture
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      this.dirtyDrawIndexIndices.forEach((index) => {
        const allocation = this.drawIdsAllocator.getAllocation(index)
        const drawIdsArray = this.glGeomItemSets[index].getDrawIdsArray()
        const level = 0
        const xoffset = allocation.start % this.drawIdsTexture.width
        // const yoffset = Math.floor(allocation.start / this.drawIdsTexture.width)
        const height = 1
        const format = tex.__format
        const type = tex.__type
        const rows = Math.ceil((xoffset + allocation.size) / this.drawIdsTexture.width)

        let consumed = 0
        let remaining = allocation.size
        let rowStart = xoffset
        for (let i = 0; i < rows; i++) {
          let width
          if (rowStart + remaining > this.drawIdsTexture.width) {
            width = this.drawIdsTexture.width - rowStart
            rowStart = 0
          } else {
            width = remaining
          }
          const x = (allocation.start + consumed) % this.drawIdsTexture.width
          const y = Math.floor((allocation.start + consumed) / this.drawIdsTexture.width)
          const data = drawIdsArray.subarray(consumed, consumed + width)
          gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
          consumed += width
          remaining -= width
        }
      })
    }

    this.dirtyDrawIndexIndices = new Set()
    gl.bindTexture(gl.TEXTURE_2D, null)

    // Note: after uploading new data to the GPU, the immediate draw fails to receive the new data
    // we need to trigger another redraw.
    this.emit('updated')
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   */
  updateHighlightedIDsBuffer() {
    const gl = this.__gl
    if (!this.highlightedIdsTexture) {
      this.highlightedIdsTexture = new GLTexture2D(gl, {
        format: 'RED',
        internalFormat: 'R32F',
        type: 'FLOAT',
        width: this.maxGeomItemSetDrawCount,
        height: this.glGeomItemSets.length,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
      // this.highlightedIdsTexture.clear()
    } else if (
      this.highlightedIdsTexture.width < this.maxGeomItemSetDrawCount ||
      this.highlightedIdsTexture.height < this.glGeomItemSets.length
    ) {
      const width = this.maxGeomItemSetDrawCount
      const height = this.glGeomItemSets.length
      this.highlightedIdsTexture.resize(width, height)
      this.dirtyDrawHighlightIndices = Array(this.glGeomItemSets.length)
        .fill()
        .map((v, i) => i)
    }

    const tex = this.highlightedIdsTexture
    gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
    this.dirtyDrawHighlightIndices.forEach((index) => {
      const highlightedIdsArray = this.glGeomItemSets[index].getHighlightedIdsArray()
      const level = 0
      const xoffset = 0
      const yoffset = index
      const width = highlightedIdsArray.length
      const height = 1
      const format = tex.__format
      const type = tex.__type
      gl.texSubImage2D(gl.TEXTURE_2D, level, xoffset, yoffset, width, height, format, type, highlightedIdsArray)
    })

    this.dirtyDrawHighlightIndices = []

    // Note: after uploading new data to the GPU, the immediate draw fails to receive the new data
    // we need to trigger another redraw.
    this.emit('updated')
  }

  // /////////////////////////////////////
  // Binding

  /**
   * The bindGeomBuffers method.
   * @param {object} renderstate - The renderstate value.
   */
  bindGeomBuffers(renderstate) {
    if (this.dirtyGeomIndices.size > 0) {
      this.cleanGeomBuffers()
    }

    let shaderBinding = this.shaderBindings[renderstate.shaderkey]
    if (!shaderBinding) {
      const gl = this.__gl
      shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.glattrbuffers)
      this.shaderBindings[renderstate.shaderkey] = shaderBinding
    }
    shaderBinding.bind(renderstate)
  }

  /**
   * The bindDrawIds method.
   * @param {object} renderstate - The renderstate value.
   * @param {WebGLBuffer} drawIdsLayoutTexture - The renderstate value.
   * @param {WebGLBuffer} drawIdsTexture - The renderstate value.
   */
  bindDrawIds(renderstate, drawIdsLayoutTexture, drawIdsTexture) {
    drawIdsLayoutTexture.bindToUniform(renderstate, renderstate.unifs.drawIdsLayoutTexture)
    drawIdsTexture.bindToUniform(renderstate, renderstate.unifs.drawIdsTexture)
  }

  /**
   * The unbind method.
   * @param {any} renderstate - The renderstate value.
   */
  unbind(renderstate) {
    renderstate.boundTextures-- // drawIdsTexture

    // Unbinding a geom is important as it puts back some important
    // GL state. (vertexAttribDivisor)
    const shaderBinding = this.shaderBindings[renderstate.shaderkey]
    if (shaderBinding) {
      shaderBinding.unbind(renderstate)
    }
  }

  // /////////////////////////////////////
  // Drawing
  // Draw an item to screen.

  multiDrawInstanced(instanceCounts) {}

  /**
   * The draw method.
   */
  draw(renderstate) {
    if (this.dirtyDrawIndexIndices.size > 0) {
      this.updateDrawIDsBuffer()
    }
    this.bindGeomBuffers(renderstate)
    this.bindDrawIds(renderstate, this.drawIdsLayoutTexture, this.drawIdsTexture)

    renderstate.bindViewports(renderstate.unifs, () => {
      this.multiDrawInstanced(this.instanceCountsDraw)
    })

    this.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
    if (this.highlightedCount == 0) return
    if (this.dirtyDrawHighlightIndices.size > 0) {
      this.updateHighlightedIDsBuffer()
    }
    this.bindGeomBuffers(renderstate)
    this.bindDrawIds(renderstate, this.highlightedIdsTexture)
    renderstate.bindViewports(renderstate.unifs, () => {
      this.multiDrawInstanced(this.instanceCountsHighlight)
    })
    this.unbind(renderstate)
  }

  /**
   * The drawGeomData method.
   * @param {any} renderstate - The renderstate value.
   */
  drawGeomData(renderstate) {
    if (this.dirtyDrawIndexIndices.size > 0) {
      this.updateDrawIDsBuffer()
    }
    this.bindGeomBuffers(renderstate)
    this.bindDrawIds(renderstate, this.drawIdsLayoutTexture, this.drawIdsTexture)
    renderstate.bindViewports(renderstate.unifs, () => {
      this.multiDrawInstanced(this.instanceCountsDraw)
    })
    this.unbind(renderstate)
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers() {
    const gl = this.__gl
    // eslint-disable-next-line guard-for-in
    for (const attrName in this.glattrbuffers) {
      const glbuffer = this.glattrbuffers[attrName]
      if (glbuffer.shared) continue /* This buffer is shared between geoms. do not destroy */
      gl.deleteBuffer(glbuffer.buffer)
    }
    this.glattrbuffers = {}

    // eslint-disable-next-line guard-for-in
    for (const shaderkey in this.shaderBindings) {
      const shaderBinding = this.shaderBindings[shaderkey]
      shaderBinding.destroy()
    }
    this.shaderBindings = {}
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    this.geoms.forEach((geom) => this.removeGeom(geom))

    this.clearBuffers()

    this.__destroyed = true

    //  Note: PoTree listens to this event. If moved up into RefCounted, make sure it is still emitted.
    this.emit('destructing', {})
  }
}

export { GLGeomSet, resizeIntArray }
