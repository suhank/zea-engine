/* eslint-disable guard-for-in */
import { EventEmitter, MathFunctions, Allocator1D } from '../../Utilities/index'
import { GLGeomItemSet } from './GLGeomItemSet.js'
import { generateShaderGeomBinding, genDataTypeDesc } from './GeomShaderBinding.js'
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

    // Note: a geom can be in multiple GeomSets (Once in an opaque pass, and again in a transparent pass)
    this.glgeomset_indexKey = 'glgeomset_index' + this.getId()
    this.freeGeomIndices = []
    this.geoms = []
    this.geomBuffersTmp = [] // for each geom, these are the buffer
    this.glattrbuffers = {}
    this.shaderBindings = {}
    this.bufferNeedsRealloc = false
    this.attributesAllocator = new Allocator1D()
    this.dirtyGeomIndices = new Set()

    // If the allocator ever resizes, then we need to re-upload everything.
    this.attributesAllocator.on('resized', () => {
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
    this.highlightedCount = 0
    this.instanceCountsDraw = new Int32Array(0)
    this.instanceCountsHighlight = new Int32Array(0)

    this.drawIdsAllocator = new Allocator1D()
    this.drawIdsTexture = null
    this.dirtyDrawIndexIndices = new Set()

    this.highlightedIdsAllocator = new Allocator1D()
    this.highlightedIdsTexture = null
    this.highlightIndices = new Set()
    this.dirtyDrawHighlightIndices = new Set()
  }

  /**
   * Adds a geom to the GLGeomSet.
   *
   * @param {BaseGeom} geom - The geom to be managed by this GLGeomSet.
   * @return {number} - The index of the geom in the GLGeomSet
   */
  addGeom(geom) {
    let index
    if (this.freeGeomIndices.length) {
      index = this.freeGeomIndices.pop()
    } else {
      index = this.geoms.length

      this.geomVertexCounts = resizeIntArray(this.geomVertexCounts, index + 1)
      this.geomVertexOffsets = resizeIntArray(this.geomVertexOffsets, index + 1)
      this.instanceCountsDraw = resizeIntArray(this.instanceCountsDraw, index + 1)
      this.instanceCountsHighlight = resizeIntArray(this.instanceCountsHighlight, index + 1)
    }

    this.geomVertexCounts[index] = 0
    this.geomVertexOffsets[index] = 0
    this.instanceCountsDraw[index] = 0
    this.instanceCountsHighlight[index] = 0

    geom.setMetadata(this.glgeomset_indexKey, index)

    const geomDataChanged = () => {
      this.dirtyGeomIndices.add(index)
      this.emit('updated')
    }
    const geomDataTopologyChanged = () => {
      this.dirtyGeomIndices.add(index)
      this.emit('updated')
    }
    geom.on('geomDataChanged', geomDataChanged)
    geom.on('geomDataTopologyChanged', geomDataTopologyChanged)

    this.geoms[index] = geom
    this.dirtyGeomIndices.add(index)

    const glGeomItemSet = new GLGeomItemSet()
    this.glGeomItemSets[index] = glGeomItemSet
    const drawCountChanged = (event) => {
      this.instanceCountsDraw[index] += event.change
      this.drawCount += event.change
      this.dirtyDrawIndexIndices.add(index)
      this.emit('updated')
    }
    const highlightedCountChanged = (event) => {
      this.instanceCountsHighlight[index] += event.change
      this.highlightedCount += event.change
      this.dirtyDrawHighlightIndices.add(index)
      this.emit('updated')
    }
    const destructing = () => {
      glGeomItemSet.off('drawCountChanged', drawCountChanged)
      glGeomItemSet.off('highlightedCountChanged', highlightedCountChanged)
      glGeomItemSet.off('destructing', destructing)

      geom.off('geomDataChanged', geomDataChanged)
      geom.off('geomDataTopologyChanged', geomDataTopologyChanged)

      this.removeGeom(index)
      this.emit('updated')
    }

    glGeomItemSet.on('drawCountChanged', drawCountChanged)
    glGeomItemSet.on('highlightedCountChanged', highlightedCountChanged)
    glGeomItemSet.on('destructing', destructing)

    return index
  }

  /**
   * Removes a Geom managed by this GLGeomSet.
   * @param {number} index - The index of the geom to remove
   */
  removeGeom(index) {
    const geom = this.geoms[index]

    // If the geom was never drawn, and we are already removing it, there may be no allocation.
    if (this.attributesAllocator.getAllocation(index)) {
      this.attributesAllocator.deallocate(index)
    }
    if (this.dirtyGeomIndices.has(index)) {
      this.dirtyGeomIndices.delete(index)
    }

    // Note: geoms that were always invisible have no allocations yet.
    if (this.drawIdsAllocator.getAllocation(index)) {
      this.drawIdsAllocator.deallocate(index)
    }
    // Note: geoms that were never highlighted have no allocations yet.
    if (this.highlightIndices.has(index)) {
      this.highlightIndices.delete(index)
    }
    if (this.highlightedIdsAllocator.getAllocation(index)) {
      this.highlightedIdsAllocator.deallocate(index)
    }
    if (this.dirtyDrawIndexIndices.has(index)) {
      this.dirtyDrawIndexIndices.delete(index)
    }

    this.geomVertexCounts[index] = 0
    this.geomVertexOffsets[index] = 0
    this.instanceCountsDraw[index] = 0
    this.instanceCountsHighlight[index] = 0

    geom.deleteMetadata(this.glgeomset_indexKey)
    this.geoms[index] = null
    this.glGeomItemSets[index] = null
    this.freeGeomIndices.push(index)
  }

  /**
   * Returns a Geom managed by this GLGeomSet.
   * @param {number} index - The index of the geom to retrieve
   * @return {BaseGeom} - The return value.
   */
  getGeom(index) {
    return this.geoms[index]
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    const geom = glGeomItem.geomItem.getParameter('Geometry').getValue()

    let index
    if (geom.hasMetadata(this.glgeomset_indexKey)) {
      index = geom.getMetadata(this.glgeomset_indexKey)
    } else {
      index = this.addGeom(geom)
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

    const numVerts = geomBuffers.numRenderVerts ? geomBuffers.numRenderVerts : geomBuffers.numVertices
    if (this.geomVertexCounts[index] != numVerts) {
      const allocation = this.attributesAllocator.allocate(index, numVerts)

      this.geomVertexOffsets[index] = allocation.start
      this.geomVertexCounts[index] = allocation.size
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      if (!this.shaderAttrSpec[attrName]) {
        const attrData = geomBuffers.attrBuffers[attrName]
        const geomAttrDesc = genDataTypeDesc(this.__gl, attrData.dataType)

        this.shaderAttrSpec[attrName] = {
          dataType: attrData.dataType,
          normalized: attrData.normalized,
          dimension: geomAttrDesc.dimension,
          elementSize: geomAttrDesc.elementSize,
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

      const sizeInBytes = numValues * attrSpec.elementSize
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
    const gl = this.__gl

    let geomBuffers = this.geomBuffersTmp[index]
    if (!geomBuffers) {
      const geom = this.getGeom(index)
      geomBuffers = geom.genBuffers()
      this.geomBuffersTmp[index] = geomBuffers
    }

    const count = this.geomVertexCounts[index]
    const numVerts = geomBuffers.numRenderVerts ? geomBuffers.numRenderVerts : geomBuffers.numVertices
    if (count != numVerts) {
      throw new Error('Invalid allocation for this geom')
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrSpec = this.shaderAttrSpec[attrName]
      const attrData = geomBuffers.attrBuffers[attrName]
      const glattrbuffer = this.glattrbuffers[attrName]
      // Some geoms might not have all the attributes.
      // and some geoms have more attributes than others.
      if (!attrData || !glattrbuffer) continue

      gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer)
      const elementSize = attrSpec.elementSize
      const dstByteOffsetInBytes = this.geomVertexOffsets[index] * elementSize * attrSpec.dimension
      gl.bufferSubData(gl.ARRAY_BUFFER, dstByteOffsetInBytes, attrData.values, 0)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
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

      for (let i = 0; i < this.geoms.length; i++) {
        if (this.geoms[i]) this.dirtyGeomIndices.add(i)
      }

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
   * @param {object} renderstate - The object used to track state changes during rendering.
   */
  updateDrawIDsBuffer(renderstate) {
    const gl = this.__gl

    let texResized = false
    const unit = renderstate.boundTextures++
    gl.activeTexture(this.__gl.TEXTURE0 + unit)

    this.dirtyDrawIndexIndices.forEach((index) => {
      const drawIdsArray = this.glGeomItemSets[index].getDrawIdsArray()
      if (drawIdsArray.length == 0) {
        if (this.drawIdsAllocator.getAllocation(index)) {
          this.drawIdsAllocator.deallocate(index)
        }
      } else {
        this.drawIdsAllocator.allocate(index, drawIdsArray.length)
      }
    })

    // Note: non POT textures caused strange problems here
    // It appears like texSubImage2D may assume a POT texture in the background.
    // Calls to texSubImage2D would generate the error: GL_INVALID_VALUE: Offset overflows texture dimensions
    // even if the coordinates appears to be correct.
    const drawIdsLayoutTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.geoms.length)))

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
      for (let i = 0; i < this.geoms.length; i++) {
        // This can happen for an invisible object added to the GLGeomItemSet.
        // Note: soon invisible items will be held by the renderer until visible.
        if (this.geoms[i] && this.drawIdsAllocator.getAllocation(i)) {
          this.dirtyDrawIndexIndices.add(i)
        }
      }
    }

    {
      const tex = this.drawIdsLayoutTexture
      const texWidth = this.drawIdsLayoutTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      this.dirtyDrawIndexIndices.forEach((index) => {
        const allocation = this.drawIdsAllocator.getAllocation(index)
        const data = Float32Array.of(allocation.start)
        const level = 0
        const xoffset = index % texWidth
        const yoffset = Math.floor(index / texWidth)
        const width = 1
        const height = 1
        const format = tex.__format
        const type = tex.__type
        gl.texSubImage2D(gl.TEXTURE_2D, level, xoffset, yoffset, width, height, format, type, data)
      })
    }
    {
      const tex = this.drawIdsTexture
      const texWidth = this.drawIdsTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      this.dirtyDrawIndexIndices.forEach((index) => {
        const allocation = this.drawIdsAllocator.getAllocation(index)
        const drawIdsArray = this.glGeomItemSets[index].getDrawIdsArray()
        const level = 0
        const xoffset = allocation.start % texWidth
        // const yoffset = Math.floor(allocation.start / texWidth)
        const height = 1
        const format = tex.__format
        const type = tex.__type
        const rows = Math.ceil((xoffset + allocation.size) / texWidth)

        let consumed = 0
        let remaining = allocation.size
        let rowStart = xoffset
        for (let i = 0; i < rows; i++) {
          let width
          if (rowStart + remaining > texWidth) {
            width = texWidth - rowStart
            rowStart = 0
          } else {
            width = remaining
          }
          const x = (allocation.start + consumed) % texWidth
          const y = Math.floor((allocation.start + consumed) / texWidth)
          const data = drawIdsArray.subarray(consumed, consumed + width)
          gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
          consumed += width
          remaining -= width
        }
      })
    }

    this.dirtyDrawIndexIndices = new Set()
    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   * @param {object} renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate) {
    const gl = this.__gl
    let texResized = false

    const unit = renderstate.boundTextures++
    gl.activeTexture(this.__gl.TEXTURE0 + unit)

    this.dirtyDrawHighlightIndices.forEach((index) => {
      const highlightedIdsArray = this.glGeomItemSets[index].getHighlightedIdsArray()
      if (highlightedIdsArray.length == 0) {
        this.highlightIndices.delete(index)
        if (this.highlightedIdsAllocator.getAllocation(index)) {
          this.highlightedIdsAllocator.deallocate(index)
        }
      } else {
        this.highlightIndices.add(index)
        this.highlightedIdsAllocator.allocate(index, highlightedIdsArray.length)
      }
    })

    // Note: non POT textures caused strange problems here
    // It appears like texSubImage2D may assume a POT texture in the background.
    // Calls to texSubImage2D would generate the error: GL_INVALID_VALUE: Offset overflows texture dimensions
    // even if the coordinates appears to be correct.
    const highlightIdsLayoutTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.geoms.length)))

    if (!this.highlightIdsLayoutTexture) {
      this.highlightIdsLayoutTexture = new GLTexture2D(gl, {
        format: 'RED',
        internalFormat: 'R32F',
        type: 'FLOAT',
        width: highlightIdsLayoutTextureSize,
        height: highlightIdsLayoutTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
    } else if (this.highlightIdsLayoutTexture.width < highlightIdsLayoutTextureSize) {
      this.highlightIdsLayoutTexture.resize(highlightIdsLayoutTextureSize, highlightIdsLayoutTextureSize)
      texResized = true
    }

    const highlightIdsTextureSize = MathFunctions.nextPow2(
      Math.ceil(Math.sqrt(this.highlightedIdsAllocator.reservedSpace))
    )

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
      texResized = true
    }

    if (texResized) {
      this.dirtyDrawHighlightIndices = new Set(this.highlightIndices)
    }

    {
      const tex = this.highlightIdsLayoutTexture
      const texWidth = this.highlightIdsLayoutTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      this.dirtyDrawHighlightIndices.forEach((index) => {
        const allocation = this.highlightedIdsAllocator.getAllocation(index)
        const data = Float32Array.of(allocation.start)
        const level = 0
        const xoffset = index % texWidth
        const yoffset = Math.floor(index / texWidth)
        const width = 1
        const height = 1
        const format = tex.__format
        const type = tex.__type
        gl.texSubImage2D(gl.TEXTURE_2D, level, xoffset, yoffset, width, height, format, type, data)
      })
    }
    {
      const tex = this.highlightedIdsTexture
      const texWidth = this.highlightedIdsTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      this.dirtyDrawHighlightIndices.forEach((index) => {
        const allocation = this.highlightedIdsAllocator.getAllocation(index)
        const highlightedIdsArray = this.glGeomItemSets[index].getHighlightedIdsArray()
        const level = 0
        const xoffset = allocation.start % texWidth
        // const yoffset = Math.floor(allocation.start / texWidth)
        const height = 1
        const format = tex.__format
        const type = tex.__type
        const rows = Math.ceil((xoffset + allocation.size) / texWidth)

        let consumed = 0
        let remaining = allocation.size
        let rowStart = xoffset
        for (let i = 0; i < rows; i++) {
          let width
          if (rowStart + remaining > texWidth) {
            width = texWidth - rowStart
            rowStart = 0
          } else {
            width = remaining
          }
          const x = (allocation.start + consumed) % texWidth
          const y = Math.floor((allocation.start + consumed) / texWidth)
          const data = highlightedIdsArray.subarray(consumed, consumed + width)
          gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
          consumed += width
          remaining -= width
        }
      })
    }

    this.dirtyDrawHighlightIndices = new Set()
    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--
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
   * @param {object} renderstate - The object tracking the current state of the renderer
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
    if (this.drawCount == 0) return
    if (this.dirtyDrawIndexIndices.size > 0) {
      this.updateDrawIDsBuffer(renderstate)
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
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawHighlightedGeoms(renderstate) {
    if (this.highlightedCount == 0) return
    if (this.dirtyDrawHighlightIndices.size > 0) {
      this.updateHighlightedIDsBuffer(renderstate)
    }
    this.bindGeomBuffers(renderstate)
    this.bindDrawIds(renderstate, this.highlightIdsLayoutTexture, this.highlightedIdsTexture)
    renderstate.bindViewports(renderstate.unifs, () => {
      this.multiDrawInstanced(this.instanceCountsHighlight)
    })
    this.unbind(renderstate)
  }

  /**
   * The drawGeomData method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate) {
    if (this.drawCount == 0) return
    if (this.dirtyDrawIndexIndices.size > 0) {
      this.updateDrawIDsBuffer(renderstate)
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
    // this.geoms.forEach((geom) => this.removeGeom(geom))

    this.clearBuffers()

    this.__destroyed = true

    //  Note: PoTree listens to this event. If moved up into RefCounted, make sure it is still emitted.
    this.emit('destructing', {})
  }
}

export { GLGeomSet, resizeIntArray }
