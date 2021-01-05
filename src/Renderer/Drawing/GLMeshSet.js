import { GLGeomSet, resizeIntArray } from './GLGeomSet.js'
import '../../SceneTree/Geometry/Mesh.js'
import { Allocator1D } from '../../Utilities/Allocator1D.js'
import { generateShaderGeomBinding } from './GeomShaderBinding.js'

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

    // this.numIndices = 0

    // this.indicesAllocator = new Allocator1D()
    // this.indicesCounts = new Int32Array(0)
    // this.indicesOffsets = new Int32Array(0)

    // this.indicesAllocator.on('resize', () => {
    //   this.dirtyGeomIndices = []
    //   for (let i = o; i < this.geoms.size; i++) this.dirtyGeomIndices.push(i)
    // })
    // this.indicesAllocator.on('dataReallocated', (event) => {
    //   // during allocation, a defragment might occur, which means
    //   // we need to re-upload some of our data.
    //   const id = event.id
    //   this.dirtyGeomIndices.push(id)
    // })
  }
  /**
   * Adds a geom to the GLGeomSet.
   *
   * @param {BaseGeom} geom - The geom to be managed by this GLGeomSet.
   * @return {number} - The index of the geom in the GLGeomSet
   */
  addGeom(geom) {
    const index = super.addGeom(geom)
    // this.indicesCounts = resizeIntArray(this.indicesCounts, this.indicesCounts.length + 1)
    // this.indicesOffsets = resizeIntArray(this.indicesOffsets, this.indicesOffsets.length + 1)
    // this.indicesCounts[index] = 0
    // this.indicesOffsets[index] = 0
    return index
  }

  // /////////////////////////////////////
  // Buffers
  /**
   * The genBuffers method.
   * @param {number} index - The index of the geom to upload
   */
  allocateBuffers(index) {
    // super.allocateBuffers(index)

    // const geomBuffers = this.geomBuffersTmp[index]
    // const numIndices = geomBuffers.indices.length
    // if (this.indicesCounts[index] != numIndices) {
    //   const allocation = this.indicesAllocator.allocate(index, numIndices)
    //   const elementSize = 2 //  Uint16Array for UNSIGNED_SHORT
    //   this.indicesOffsets[index] = allocation.start * elementSize // offset is in bytes
    //   this.indicesCounts[index] = allocation.size
    // }

    const geom = this.getGeom(index)
    const geomBuffers = geom.genBuffers()

    const vertexCount = geomBuffers.indices.length
    if (this.geomVertexCounts[index] != vertexCount) {
      const allocation = this.attributesAllocator.allocate(index, vertexCount)

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
    super.genBuffers()

    // const length = this.indicesAllocator.reservedSpace
    // if (this.numIndices != length) {
    //   const gl = this.__gl
    //   if (this.indexBuffer) {
    //     gl.deleteBuffer(this.indexBuffer)
    //   }

    //   this.indexBuffer = gl.createBuffer()
    //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)

    //   const length = this.indicesAllocator.reservedSpace
    //   const elementSize = 2 //  Uint16Array for UNSIGNED_SHORT
    //   const sizeInBytes = length * elementSize
    //   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sizeInBytes, gl.STATIC_DRAW)

    //   this.numIndices = length
    // }
  }

  /**
   * The uploadBuffers method.
   * @param {number} index - The index of the geom to upload
   */
  uploadBuffers(index) {
    // super.uploadBuffers(index)

    // const geomBuffers = this.geomBuffersTmp[index]
    // const indices = geomBuffers.indices

    // const allocation = this.indicesAllocator.allocations[index]
    // if (allocation.size != indices.length) {
    //   throw new Error('Invalid allocation for this geom')
    // }

    // const attributesAllocation = this.attributesAllocator.allocations[index]
    // // The indices need to be offset so they they index the new attributes array.
    // const offsettedIndices = new Uint16Array(allocation.size)
    // for (let i = 0; i < indices.length; i++) {
    //   offsettedIndices[i] = geomBuffers.indices[i] + attributesAllocation.start
    // }

    // const gl = this.__gl
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    // const elementSize = 2 //  Uint16Array
    // const dstByteOffsetInBytes = allocation.start * elementSize
    // gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, dstByteOffsetInBytes, offsettedIndices, 0)

    let geomBuffers = this.geomBuffersTmp[index]
    if (!geomBuffers) {
      const geom = this.getGeom(index)
      geomBuffers = geom.genBuffers()
    }

    const gl = this.__gl

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const indexedAttrData = geomBuffers.attrBuffers[attrName]
      const glattrbuffer = this.glattrbuffers[attrName]
      let attrData
      if (false) {
        attrData = indexedAttrData.values
      } else {
        attrData = new Float32Array(geomBuffers.indices.length * glattrbuffer.dimension)
        for (let i = geomBuffers.indices.length - 1; i >= 0; i--) {
          const srcIndex = geomBuffers.indices[i]
          const subarray = indexedAttrData.values.subarray(
            srcIndex * glattrbuffer.dimension,
            (srcIndex + 1) * glattrbuffer.dimension
          )
          attrData.set(subarray, i * glattrbuffer.dimension)
        }
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer)
      const elementSize = 4 // assuming floats for now. (We also need to support RGB Byte values.)
      const dstByteOffsetInBytes = this.geomVertexOffsets[index] * elementSize * glattrbuffer.dimension
      gl.bufferSubData(gl.ARRAY_BUFFER, dstByteOffsetInBytes, attrData, 0)
    }
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers() {
    // const gl = this.__gl
    // if (this.indexBuffer) {
    //   gl.deleteBuffer(this.indexBuffer)
    //   this.indexBuffer = null
    // }

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
    // multiDrawElementsInstanced variant.
    // Assumes that the indices which have been previously uploaded to the
    // ELEMENT_ARRAY_BUFFER are to be treated as UNSIGNED_SHORT.
    const gl = this.__gl
    // const numTriangles = this.numIndices / 3
    // gl.multiDrawElementsInstanced(
    //   gl.TRIANGLES,
    //   this.indicesCounts,
    //   0,
    //   gl.UNSIGNED_SHORT,
    //   this.indicesOffsets,
    //   0,
    //   instanceCounts,
    //   0,
    //   instanceCounts.length
    // )
    gl.multiDrawArraysInstanced(
      gl.TRIANGLES,
      this.geomVertexOffsets,
      0,
      this.geomVertexCounts,
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
    // if (this.__wireframesVao)
    //     gl.deleteVertexArray(this.__wireframesVao);
    // if (this.__hardEdgesVao)
    //     gl.deleteVertexArray(this.__hardEdgesVao);
  }
}

export { GLMeshSet }
