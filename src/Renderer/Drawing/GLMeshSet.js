import { GLGeomSet } from './GLGeomSet.js'
import '../../SceneTree/Geometry/Mesh.js'
import { Allocator1D } from '../../Utilities/Allocator1D.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLMeshSet extends GLGeomSet {
  /**
   * Create a GL mesh.
   * @param {WebGL2RenderingContext} gl - The gl value.
   * @param {object} shaderAttrSpec - The attributes required by the shader
   */
  constructor(gl, shaderAttrSpec) {
    super(gl, shaderAttrSpec)

    this.indicesAllocator = new Allocator1D()
    this.geomVertexIndicesCounts = []
    this.geomVertexIndicesOffsets = []

    this.numIndices = 0

    this.indicesAllocator.on('resize', () => {
      this.dirtyGeomIndices = []
      for (let i = o; i < this.geoms.size; i++) this.dirtyGeomIndices.push(i)
    })
    this.indicesAllocator.on('dataReallocated', (event) => {
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
    const index = super.addGeom(geom)
    this.geomVertexIndicesCounts[index] = 0
    this.geomVertexIndicesOffsets[index] = 0
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
    if (this.geomVertexIndicesCounts[index] != numIndices) {
      const allocation = this.indicesAllocator.allocate(index, numIndices)
      this.geomVertexIndicesOffsets[index] = allocation.start
      this.geomVertexIndicesCounts[index] = allocation.size
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
      const elementSize = 2 //  Uint16Array for UNSIGNED_SHORT
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

    const allocation = this.indicesAllocator.allocations[index]
    if (allocation.size != indices.length) {
      throw new Error('Invalid allocation for this geom')
    }

    const attributesAllocation = this.attributesAllocator.allocations[index]
    // The indices need to be offset so they they index the new attributes array.
    const offsetIndices = new Uint16Array(allocation.size)
    for (let i = 0; i < indices.length; i++) {
      offsetIndices[i] = geomBuffers.indices[i] + attributesAllocation.start
    }

    const gl = this.__gl
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    const elementSize = 2 //  Uint16Array
    const dstByteOffsetInBytes = allocation.start * elementSize
    gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, dstByteOffsetInBytes, offsetIndices, allocation.start)
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers() {
    const gl = this.__gl
    gl.deleteBuffer(this.indexBuffer)
    this.indexBuffer = null

    super.clearBuffers()
  }

  // ////////////////////////////////
  // Regular Drawing.

  /**
   * Draw an item to screen.
   * @param {Array} - instanceCounts the instance counts for this draw call.
   */
  multiDrawInstanced(instanceCounts) {
    // multiDrawElementsInstanced variant.
    // Assumes that the indices which have been previously uploaded to the
    // ELEMENT_ARRAY_BUFFER are to be treated as UNSIGNED_SHORT.
    const gl = this.__gl
    gl.multiDrawElementsInstanced(
      gl.TRIANGLES,
      this.geomVertexCounts,
      0,
      gl.UNSIGNED_SHORT,
      this.geomVertexOffsets,
      0,
      instanceCounts,
      0,
      this.geomVertexCounts.length
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
    // if (this.__wireframesVao)
    //     gl.deleteVertexArray(this.__wireframesVao);
    // if (this.__hardEdgesVao)
    //     gl.deleteVertexArray(this.__hardEdgesVao);
  }
}

export { GLMeshSet }
