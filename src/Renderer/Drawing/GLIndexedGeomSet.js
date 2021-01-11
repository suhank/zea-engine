import { GLGeomSet, resizeIntArray } from './GLGeomSet.js'
import '../../SceneTree/Geometry/Mesh.js'
import { Allocator1D } from '../../Utilities/Allocator1D.js'
import { generateShaderGeomBinding } from './GeomShaderBinding.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLIndexedGeomSet extends GLGeomSet {
  /**
   * Create a GL mesh.
   * @param {WebGL2RenderingContext} gl - The gl value.
   * @param {object} shaderAttrSpec - The attributes required by the shader
   */
  constructor(gl, shaderAttrSpec) {
    super(gl, shaderAttrSpec)

    this.numIndices = 0

    this.indicesAllocator = new Allocator1D()
    this.indicesCounts = new Int32Array(0)
    this.indicesOffsets = new Int32Array(0)

    this.indicesAllocator.on('resize', () => {
      this.dirtyGeomIndices = new Set(Array.from({ length: this.geoms.length }, (_, i) => i))
    })
    this.indicesAllocator.on('dataReallocated', (event) => {
      // during allocation, a defragment might occur, which means
      // we need to re-upload some of our data.
      const id = event.id
      this.dirtyGeomIndices.add(id)
    })
  }
  /**
   * Adds a geom to the GLGeomSet.
   *
   * @param {BaseGeom} geom - The geom to be managed by this GLGeomSet.
   * @return {number} - The index of the geom in the GLGeomSet
   */
  addGeom(geom) {
    const index = super.addGeom(geom)
    this.indicesCounts = resizeIntArray(this.indicesCounts, this.indicesCounts.length + 1)
    this.indicesOffsets = resizeIntArray(this.indicesOffsets, this.indicesOffsets.length + 1)
    this.indicesCounts[index] = 0
    this.indicesOffsets[index] = 0
    return index
  }

  // /////////////////////////////////////
  // Buffers
  /**
   * The genBuffers method.
   * @param {number} index - The index of the geom to upload
   */
  allocateBuffers(index) {
    super.allocateBuffers(index)

    const geomBuffers = this.geomBuffersTmp[index]
    const numIndices = geomBuffers.indices.length
    if (this.indicesCounts[index] != numIndices) {
      const allocation = this.indicesAllocator.allocate(index, numIndices)
      const elementSize = 4 //  Uint32Array for UNSIGNED_INT
      this.indicesOffsets[index] = allocation.start * elementSize // offset is in bytes
      this.indicesCounts[index] = allocation.size
    }
  }

  /**
   * The genBuffers method.
   */
  genBuffers() {
    super.genBuffers()

    const length = this.indicesAllocator.reservedSpace
    if (this.numIndices != length) {
      const gl = this.__gl
      if (this.indexBuffer) {
        gl.deleteBuffer(this.indexBuffer)
      }

      this.indexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)

      const length = this.indicesAllocator.reservedSpace
      const elementSize = 4 //  Uint32Array for UNSIGNED_INT
      const sizeInBytes = length * elementSize
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sizeInBytes, gl.STATIC_DRAW)

      this.numIndices = length
    }
  }

  /**
   * The uploadBuffers method.
   * @param {number} index - The index of the geom to upload
   */
  uploadBuffers(index) {
    super.uploadBuffers(index)

    const geomBuffers = this.geomBuffersTmp[index]
    const indices = geomBuffers.indices

    const allocation = this.indicesAllocator.getAllocation(index)
    if (allocation.size != indices.length) {
      throw new Error('Invalid allocation for this geom')
    }

    const attributesAllocation = this.attributesAllocator.allocations[index]
    // The indices need to be offset so they they index the new attributes array.
    const offsettedIndices = new Uint32Array(allocation.size)
    for (let i = 0; i < indices.length; i++) {
      offsettedIndices[i] = geomBuffers.indices[i] + attributesAllocation.start
    }

    const gl = this.__gl
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    const elementSize = 4 //  Uint32Array
    const dstByteOffsetInBytes = allocation.start * elementSize
    gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, dstByteOffsetInBytes, offsettedIndices, 0)
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers() {
    const gl = this.__gl
    if (this.indexBuffer) {
      gl.deleteBuffer(this.indexBuffer)
      this.indexBuffer = null
    }

    super.clearBuffers()
  }

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
      shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.glattrbuffers, this.indexBuffer)
      this.shaderBindings[renderstate.shaderkey] = shaderBinding
    }
    shaderBinding.bind(renderstate)
  }

  // ////////////////////////////////
  // Regular Drawing.

  /**
   * Draw an item to screen.
   * @param {Array} - instanceCounts the instance counts for this draw call.
   */
  multiDrawInstanced(instanceCounts) {
    const gl = this.__gl
    gl.multiDrawElementsInstanced(
      gl.TRIANGLES,
      this.indicesCounts,
      0,
      gl.UNSIGNED_INT,
      this.indicesOffsets,
      0,
      instanceCounts,
      0,
      instanceCounts.length
    )
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
    const gl = this.__gl
    gl.deleteBuffer(this.indexBuffer)
    this.indexBuffer = undefined
  }
}

export { GLIndexedGeomSet }