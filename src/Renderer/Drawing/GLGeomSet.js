import { generateShaderGeomBinding } from './GeomShaderBinding.js'

/** Class representing a GL geom.
 * @private
 */
class GLGeomSet {
  /**
   * Create a GL geom.
   * @param {any} gl - The gl value.
   * @param {any} geom - The geom value.
   */
  constructor(gl, shaderAttrSpec) {
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

    this.geomVertexCounts = []
    this.geomVertexOffsets = []

    this.glGeomItemSets = []
    this.drawCount = 0
    this.highlightedCount = 0
    this.instanceCountsDraw = []
    this.instanceCountsHighlight = []

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

    geom.addMetadata('glgeomset', this)
    this.geoms.push({
      geom,
      geomDataChanged,
      geomDataTopologyChanged,
    })
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
   * @param {number} index - The index of the geomm in the geomset to build the GeomITemSet for.
   */
  addGeomItemSet(index) {
    glGeomItemSet = new GLGeomItemSet()
    this.glGeomItemSets[index] = glGeomItemSet
    this.instanceCounts[index] = 0
    const drawCountChanged = (event) => {
      this.instanceCounts[index] += event.count
      this.drawCount += change.count
      this.drawIdsBufferDirty = true
    }
    const highlightCountChanged = (event) => {
      this.instanceCounts[index] += event.count
      this.highlightedCount += change.count
      this.highlightedIdsBufferDirty = true
    }

    glGeomItemSet.on('drawCountChanged')
    glGeomItemSet.on('highlightCountChanged')
    glGeomItemSet.on('destructing', () => {
      glGeomItemSet.off('drawCountChanged', drawCountChanged)
      glGeomItemSet.off('highlightCountChanged', highlightCountChanged)

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
    })
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    const geom = glGeomItem.geomItem.getParameter('Geometry').getValue()

    const index = this.addGeom(geom)
    if (!this.glGeomItemSets[index]) {
      this.addGeomItemSet(index)
    }
    this.glGeomItemSets[index].addGLGeomItem()
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

    if (this.geomVertexCounts[index] != geomBuffers.numVertices) {
      const allocation = this.attributesAllocator.allocate(index, geomBuffers.numVertices)

      this.geomBuffersTmp[index] = geomBuffers
      this.geomVertexOffsets[index] = allocation.start
      this.geomVertexCounts[index] = allocation.size
    }
  }

  /**
   * The genBuffers method.
   */
  genBuffers() {
    const length = this.attributesAllocator.reservedSpace
    if (this.numVertexAttributes != length) {
      // eslint-disable-next-line guard-for-in
      for (const attrName in this.shaderAttrSpec) {
        const attrSpec = this.shaderAttrSpec[attrName]

        if (this.glattrbuffers[attrName] && this.glattrbuffers[attrName].buffer) {
          gl.deleteBuffer(this.glattrbuffers[attrName].buffer)
        }

        const attrBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, length, gl.STATIC_DRAW)

        this.glattrbuffers[attrName] = {
          buffer: attrBuffer,
          dataType: attrSpec.dataType,
          normalized: attrSpec.normalized,
          length,
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

    const count = this.geomVertexOffsets[index]
    if (count != geomBuffers.numVertices) {
      throw new Error('Invalid allocation for this geom')
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]

      gl.bindBuffer(gl.ARRAY_BUFFER, this.glattrbuffers[attrName].buffer)
      gl.bufferSubData(gl.ARRAY_BUFFER, this.geomVertexOffsets[index], attrData.values, 0, attrData.values.length)
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
    const gl = this.gl
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
   * The bind method.
   * @param {any} renderstate - The renderstate value.
   * @return {any} - The return value.
   */
  bindDrawIds(renderstate, drawIdsBuffer) {
    if (this.dirtyGeomIndices.length > 0) {
      this.cleanGeomBuffers()
    }

    // Specify an instanced draw to the shader so it knows how
    // to retrieve the modelmatrix.
    gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)

    // The instanced transform ids are bound as an instanced attribute.
    const location = renderstate.attrs.instancedIds.location
    gl.enableVertexAttribArray(location)
    gl.bindBuffer(gl.ARRAY_BUFFER, drawIdsBuffer)
    gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1 * 4, 0)
    gl.vertexAttribDivisor(location, 1) // This makes it instanced

    return true
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
  draw() {
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer()
    }
    this.bindDrawIds(renderstate, this.drawIdsBufferDirty)
    this.multiDrawInstanced(this.instanceCountsDraw)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
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
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer()
    }
    this.bindDrawIds(renderstate, this.drawIdsBufferDirty)
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

export { GLGeomSet }
