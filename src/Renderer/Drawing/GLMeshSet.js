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
   * @param {any} gl - The gl value.
   * @param {any} shaderAttrSpec - The attributes required by the shader
   */
  constructor(gl, shaderAttrSpec) {
    super(gl, shaderAttrSpec)
    // this.genBuffers()

    this.indicesAllocator = new Allocator1D()

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
    if (!this.geomBufferStats[index] || this.geomBufferStats[index].numIndices != numIndices) {
      this.indicesAllocator.allocate(index, numIndices)

      if (!this.geomBufferStats[index]) {
        this.geomBufferStats[index] = {
          numIndices,
        }
      } else {
        this.geomBufferStats[index].numIndices = numIndices
      }
    }
  }

  /**
   * The genBuffers method.
   */
  genBuffers() {
    super.genBuffers()

    const length = this.indicesAllocator.reservedSpace
    if (this.numIndices != length) {
      if (this.indexBuffer) {
        gl.deleteBuffer(this.indexBuffer)
      }

      this.indexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)

      const length = this.indicesAllocator.reservedSpace
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, length, gl.STATIC_DRAW)

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
    const offsetIndices = new Uint32Array(allocation.size)
    for (let i = 0; i < indices.length; i++) {
      offsetIndices[i] = geomBuffers.indices[i] + attributesAllocation.start
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, allocation.start, offsetIndices, allocation.start, indices.length)
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
    this.ext.multiDrawElementsInstancedWEBGL(
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
