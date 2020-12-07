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
    this.geomBufferStats = [] // for each geom, these are the buffer
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
      this.dirtyGeomIndices.push(id)
    })
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
    const item = this.geoms.fine((item) => {
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

    if (!this.geomBufferStats[index] || this.geomBufferStats[index].numVertices != geomBuffers.numVertices) {
      this.attributesAllocator.allocate(index, geomBuffers.numVertices)

      this.geomBuffersTmp[index] = geomBuffers
      if (!this.geomBufferStats[index]) {
        this.geomBufferStats[index] = {
          numVertices: geomBuffers.numVertices,
        }
      } else {
        this.geomBufferStats[index].numVertices = geomBuffers.numVertices
      }
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

    const allocation = this.attributesAllocator.allocations[index]
    if (allocation.size != geomBuffers.numVertices) {
      throw new Error('Invalid allocation for this geom')
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]

      gl.bindBuffer(gl.ARRAY_BUFFER, this.glattrbuffers[attrName].buffer)
      gl.bufferSubData(gl.ARRAY_BUFFER, allocation.start, attrData.values, 0, attrData.values.length)
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

  // /////////////////////////////////////
  // Binding

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate value.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    if (this.dirtyGeomIndices.length > 0) {
      this.cleanGeomBuffers()
    }

    let shaderBinding = this.shaderBindings[renderstate.shaderkey]
    if (!shaderBinding) {
      const gl = this.__gl
      shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.glattrbuffers, this.__indexBuffer)
      this.shaderBindings[renderstate.shaderkey] = shaderBinding
    }
    shaderBinding.bind(renderstate)
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

  /**
   * The draw method.
   */
  draw() {
    throw new Error('Not implemented. Implement this method in a derived class.')
  }

  /**
   * The bindAndDraw method.
   * @param {any} renderstate - The renderstate value.
   */
  bindAndDraw(renderstate) {
    this.bind(renderstate)
    this.draw(renderstate)
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
