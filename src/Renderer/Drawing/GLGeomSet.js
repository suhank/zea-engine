import { EventEmitter } from '../../Utilities/index'
import { Allocator1D } from '../../Utilities/Allocator1D.js'
import { GLGeomItemSet } from './GLGeomItemSet.js'
import { generateShaderGeomBinding } from './GeomShaderBinding.js'

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

    this.attributesAllocator = new Allocator1D()
    this.dirtyGeomIndices = []
    this.numVertexAttributes = 0

    // If the allocator ever resizes, then we need to re-upload everything.
    this.attributesAllocator.on('resize', () => {
      this.dirtyGeomIndices = []
      for (let i = o; i < this.geoms.size; i++) this.dirtyGeomIndices.push(i)
    })
    this.attributesAllocator.on('dataReallocated', (event) => {
      // during allocation, a defragment might occur, which means
      // we need to re-upload some of our data.
      const id = event.id
      const allocation = event.allocation
      this.dirtyGeomIndices.push(id)

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

    this.drawIdsArray = null
    this.drawIdsBuffer = null
    this.drawIdsBufferDirty = true

    this.highlightedIdsArray = null
    this.highlightedIdsBuffer = null
    this.highlightedIdsBufferDirty = true
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
      this.dirtyGeomIndices.push(index)
    }
    const geomDataTopologyChanged = (event) => {
      this.dirtyGeomIndices.push(index)
    }
    geom.on('geomDataChanged', geomDataChanged)
    geom.on('geomDataTopologyChanged', geomDataTopologyChanged)

    this.geoms.push({
      geom,
      geomDataChanged,
      geomDataTopologyChanged,
    })
    this.dirtyGeomIndices.push(index)

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
      this.instanceCountsDraw[index] += event.count
      this.drawCount += event.count
      this.drawIdsBufferDirty = true
    }
    const highlightCountChanged = (event) => {
      this.instanceCountsHighlight[index] += event.count
      this.highlightedCount += event.count
      this.highlightedIdsBufferDirty = true
    }
    const destructing = () => {
      glGeomItemSet.off('drawCountChanged', drawCountChanged)
      glGeomItemSet.off('highlightCountChanged', highlightCountChanged)
      glGeomItemSet.off('destructing', destructing)

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
    glGeomItemSet.on('highlightCountChanged', highlightCountChanged)
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
   * The genBuffers method.
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
      this.geomBuffersTmp[index] = geomBuffers
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
  }

  /**
   * The genBuffers method.
   */
  genBuffers() {
    const length = this.attributesAllocator.reservedSpace
    if (this.numVertexAttributes != length) {
      const gl = this.__gl

      // eslint-disable-next-line guard-for-in
      for (const attrName in this.shaderAttrSpec) {
        const attrSpec = this.shaderAttrSpec[attrName]
        const numValues = length * attrSpec.dimension
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
        }

        if (attrName == 'textureCoords') this.glattrbuffers['texCoords'] = this.glattrbuffers['textureCoords']
      }

      this.numVertexAttributes = length
    }
  }

  /**
   * The uploadBuffers method.
   * @param {number} index - The index of the geom to upload
   */
  uploadBuffers(index) {
    const geomBuffers = this.geomBuffersTmp[index]

    const count = this.geomVertexCounts[index]
    if (count != geomBuffers.numRenderVerts) {
      throw new Error('Invalid allocation for this geom')
    }
    const gl = this.__gl

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]

      gl.bindBuffer(gl.ARRAY_BUFFER, this.glattrbuffers[attrName].buffer)
      const dstByteOffsetInBytes = this.geomVertexOffsets[index] * 4
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
    const dirtyGeomIndices = [...this.dirtyGeomIndices]
    dirtyGeomIndices.forEach((index) => {
      this.allocateBuffers(index)
    })

    this.genBuffers()

    this.dirtyGeomIndices.forEach((index) => {
      this.uploadBuffers(index)
    })

    this.dirtyGeomIndices = []
    this.geomBuffersTmp = []
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
    if (this.drawIdsBuffer && this.drawCount != this.drawIdsArray.length) {
      this.gl.deleteBuffer(this.drawIdsBuffer)
      this.drawIdsBuffer = null
    }
    if (!this.drawIdsBuffer) {
      this.drawIdsArray = new Float32Array(this.drawCount)
      this.drawIdsBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.drawIdsBuffer)
    }

    // Collect all visible geom ids into the instanceIds array.
    // Note: the draw count can be less than the number of instances
    // we re-use the same buffer and simply invoke fewer draw calls.
    let offset = 0
    this.glGeomItemSets.forEach((glGeomItemSet) => {
      const drawIdsArray = glGeomItemSet.getDrawIdsArray()
      this.drawIdsArray.set(drawIdsArray, offset)
      offset += drawIdsArray.length
    })
    gl.bindBuffer(gl.ARRAY_BUFFER, this.drawIdsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.drawIdsArray, gl.STATIC_DRAW)

    this.drawIdsBufferDirty = false
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   */
  updateHighlightedIDsBuffer() {
    const gl = this.gl
    if (this.highlightedIdsBuffer && this.highlightedCount > this.highlightedIdsArray.length) {
      this.gl.deleteBuffer(this.highlightedIdsBuffer)
      this.highlightedIdsBuffer = null
    }

    if (!this.highlightedIdsBuffer) {
      this.highlightedIdsArray = new Float32Array(this.highlightedCount)
      this.highlightedIdsBuffer = gl.createBuffer()
    }

    let offset = 0
    this.glGeomItemSets.forEach((glGeomItemSet) => {
      const highlightedIdsArray = glGeomItemSet.getHighlightedIdsArray()
      this.highlightedIdsArray.set(highlightedIdsArray, offset)
      offset += highlightedIdsArray.length
    })

    gl.bindBuffer(gl.ARRAY_BUFFER, this.highlightedIdsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.highlightedIdsArray, gl.STATIC_DRAW)

    this.highlightedIdsBufferDirty = false
  }

  // /////////////////////////////////////
  // Binding

  /**
   * The bindGeomBuffers method.
   * @param {object} renderstate - The renderstate value.
   */
  bindGeomBuffers(renderstate) {
    if (this.dirtyGeomIndices.length > 0) {
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
   * @param {WebGLBuffer} drawIdsBuffer - The renderstate value.
   */
  bindDrawIds(renderstate, drawIdsBuffer) {
    const gl = this.__gl

    // Specify an instanced draw to the shader so it knows how
    // to retrieve the modelmatrix.
    gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)

    // The instanced transform ids are bound as an instanced attribute.
    const location = renderstate.attrs.instancedIds.location
    gl.enableVertexAttribArray(location)
    gl.bindBuffer(gl.ARRAY_BUFFER, drawIdsBuffer)
    gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1 * 4, 0)
    gl.vertexAttribDivisor(location, 1) // This makes it instanced
  }

  /**
   * The unbind method.
   * @param {any} renderstate - The renderstate value.
   */
  unbind(renderstate) {
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

  multiDrawInstanced(renderstate) {}

  /**
   * The draw method.
   */
  draw(renderstate) {
    this.bindGeomBuffers(renderstate)
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer()
    }
    this.bindDrawIds(renderstate, this.drawIdsBuffer)
    this.multiDrawInstanced(this.instanceCountsDraw)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
    this.bindGeomBuffers(renderstate)
    if (this.highlightedIdsBufferDirty) {
      this.updateDrawIDsBuffer()
    }
    this.bindDrawIds(renderstate, this.highlightedIdsBuffer)
    this.multiDrawInstanced(this.instanceCountsHighlight)
  }

  /**
   * The drawGeomData method.
   * @param {any} renderstate - The renderstate value.
   */
  drawGeomData(renderstate) {
    this.bindGeomBuffers(renderstate)
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer()
    }
    this.bindDrawIds(renderstate, this.drawIdsBuffer)
    this.multiDrawInstanced(this.instanceCountsDraw)
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
