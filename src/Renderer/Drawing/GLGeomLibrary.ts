/* eslint-disable guard-for-in */
import { EventEmitter, Allocator1D } from '../../Utilities/index'
import { generateShaderGeomBinding, genDataTypeDesc } from './GeomShaderBinding'
import { Points, Lines, Mesh, PointsProxy, LinesProxy, MeshProxy, BaseGeom } from '../../SceneTree/index'
import { GLPoints, GLLines, GLMesh, GLGeom } from './index'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { IndexEvent } from '../../Utilities/Events/IndexEvent'

const resizeIntArray = (intArray: Int32Array, newSize: number) => {
  const newArray = new Int32Array(newSize)
  newArray.set(intArray)
  return newArray
}

/** Class representing a GL geom.
 * @private
 */
class GLGeomLibrary extends EventEmitter {
  protected renderer: GLBaseRenderer
  protected __gl: WebGL12RenderingContext
  protected shaderAttrSpec: Record<string, any>
  protected freeGeomIndices: number[]
  protected geoms: Array<BaseGeom | null>
  protected geomRefCounts: number[]
  protected geomsDict: Record<string, number>
  protected glGeomsDict: Record<string, GLGeom>
  protected geomBuffersTmp: any[] // for each geom, these are the buffer
  protected glattrbuffers: Record<string, any>
  protected shaderBindings: Record<string, any>
  protected bufferNeedsRealloc: boolean
  protected attributesAllocator: Allocator1D
  protected dirtyGeomIndices: Set<number>
  protected geomVertexOffsets: Int32Array
  protected geomVertexCounts: Int32Array
  protected numIndices: number
  protected indicesAllocator: Allocator1D
  protected indicesCounts: Int32Array
  protected indicesOffsets: Int32Array
  protected indexBuffer: WebGLBuffer | null = null
  protected __destroyed: boolean = false
  /**
   * Create a GLGeomLibrary.
   * @param {GLBaseRenderer} renderer - The renderer object
   */
  constructor(renderer: GLBaseRenderer) {
    super()

    this.renderer = renderer
    this.__gl = renderer.gl

    this.shaderAttrSpec = {}
    this.freeGeomIndices = []
    this.geoms = []
    this.geomRefCounts = []
    this.geomsDict = {}
    this.glGeomsDict = {}
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
    this.attributesAllocator.on('dataReallocated', (event: any) => {
      // during allocation, a defragment might occur, which means
      // we need to re-upload some of our data.
      const id = event.id
      const allocation = event.allocation
      this.dirtyGeomIndices.add(id)

      this.geomVertexOffsets[id] = allocation.start
      this.geomVertexCounts[id] = allocation.size
    })

    this.geomVertexCounts = new Int32Array(1)
    this.geomVertexOffsets = new Int32Array(1)
    this.indicesCounts = new Int32Array(1)
    this.indicesOffsets = new Int32Array(1)
    this.freeGeomIndices.push(0)

    // //////////////////////////////////////
    // Indices
    this.numIndices = 0
    this.indicesAllocator = new Allocator1D()

    this.indicesAllocator.on('resized', () => {
      this.bufferNeedsRealloc = true
    })
    this.indicesAllocator.on('dataReallocated', (event: any) => {
      // during allocation, a defragment might occur, which means
      // we need to re-upload some of our data.
      const id = event.id
      this.dirtyGeomIndices.add(id)
    })
  }

  /**
   * Given a BaseGeom, constructs the GLGeom that manages the state of the geometry in the GPU.
   * @param {BaseGeom} geom - The geom value.
   * @return {GLGeom} - The return value.
   */
  constructGLGeom(geom: BaseGeom) {
    let glgeom = this.glGeomsDict[geom.getId()]
    if (glgeom != undefined) {
      // Increment the ref count for the GLGeom
      // glgeom.addRef(this)
      return glgeom
    }
    const gl = this.__gl
    if (geom instanceof Mesh || geom instanceof MeshProxy) {
      glgeom = new GLMesh(gl, <Mesh>geom)
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      glgeom = new GLLines(gl, geom)
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      glgeom = new GLPoints(gl, geom)
    } else {
      throw new Error('Unsupported geom type:' + geom.constructor.name)
    }
    this.glGeomsDict[geom.getId()] = glgeom
    glgeom.on('updated', () => {
      this.renderer.requestRedraw()
    })
    glgeom.addRef(this)
    return glgeom
  }

  /**
   * Adds a geom to the GLGeomLibrary.
   *
   * @param {BaseGeom} geom - The geom to be managed by this GLGeomLibrary.
   * @return {number} - The index of the geom in the GLGeomLibrary
   */
  addGeom(geom: BaseGeom) {
    let index = this.geomsDict[geom.getId()]
    if (index != undefined) {
      // Increment the ref count for the GLGeom
      this.geomRefCounts[index]++
      return index
    }
    if (this.freeGeomIndices.length == 0) {
      const prevSize = this.geomVertexCounts.length
      const newSize = prevSize * 2
      this.geomVertexCounts = resizeIntArray(this.geomVertexCounts, newSize)
      this.geomVertexOffsets = resizeIntArray(this.geomVertexOffsets, newSize)
      this.indicesCounts = resizeIntArray(this.indicesCounts, newSize)
      this.indicesOffsets = resizeIntArray(this.indicesOffsets, newSize)
      for (let i = newSize - 1; i >= prevSize; i--) {
        this.freeGeomIndices.push(i)
      }
    }
    index = this.freeGeomIndices.pop()!

    this.geoms[index] = geom
    this.geomRefCounts[index] = 1
    this.geomsDict[geom.getId()] = index
    this.dirtyGeomIndices.add(index)

    this.geomVertexCounts[index] = 0
    this.geomVertexOffsets[index] = 0
    this.indicesCounts[index] = 0
    this.indicesOffsets[index] = 0

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

    return index
  }

  /**
   * Removes a Geom managed by this GLGeomLibrary.
   * @param {BaseGeom} geom - The geom to remove
   */
  removeGeom(geom: BaseGeom) {
    const index = this.geomsDict[geom.getId()]

    this.geomRefCounts[index]--

    // If there are still refs to this geom. (GeomItems that use it)
    // then we keep it in the renderer.
    if (this.geomRefCounts[index] > 0) {
      return
    }

    // If the geom was never drawn, and we are already removing it, there may be no allocation.
    if (this.attributesAllocator.getAllocation(index)) {
      this.attributesAllocator.deallocate(index)
    }
    if (this.indicesAllocator.getAllocation(index)) {
      this.indicesAllocator.deallocate(index)
    }
    if (this.dirtyGeomIndices.has(index)) {
      this.dirtyGeomIndices.delete(index)
    }

    this.geomVertexCounts[index] = 0
    this.geomVertexOffsets[index] = 0

    this.geoms[index] = null
    this.freeGeomIndices.push(index)
    delete this.geomsDict[geom.getId()]
    delete this.geomBuffersTmp[index]

    this.indicesCounts[index] = 0
    this.indicesOffsets[index] = 0
  }

  /**
   * Returns a Geom managed by this GLGeomLibrary.
   * @param {number} index - The index of the geom to retrieve
   * @return {BaseGeom} - The return value.
   */
  getGeom(index: number) {
    return this.geoms[index]
  }

  /**
   * Returns a Geom managed by this GLGeomLibrary.
   * @param {number} index - The index of the geom to retrieve
   * @return {array} - The return value.
   */
  getGeomOffsetAndCount(index: number) {
    return [this.indicesOffsets[index], this.indicesCounts[index]]
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * Allocates space for the geomBuffers for the specified geometry
   * @param {number} index - The index of the geom to upload
   */
  allocateBuffers(index: number) {
    const geom = this.geoms[index]
    if (!geom) return
    const geomBuffers = geom.genBuffers()

    const numVerts = geomBuffers.numRenderVerts ? geomBuffers.numRenderVerts : geomBuffers.numVertices
    if (this.geomVertexCounts[index] != numVerts) {
      if (numVerts == 0) {
        this.attributesAllocator.deallocate(index)
        this.geomVertexOffsets[index] = 0
        this.geomVertexCounts[index] = 0
      } else {
        const allocation = this.attributesAllocator.allocate(index, numVerts)

        this.geomVertexOffsets[index] = allocation.start
        this.geomVertexCounts[index] = allocation.size
      }
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      if (!this.shaderAttrSpec[attrName]) {
        const attrData = geomBuffers.attrBuffers[attrName]
        const geomAttrDesc: Record<string, any> = genDataTypeDesc(this.__gl, attrData.dataType)

        this.shaderAttrSpec[attrName] = {
          dataType: attrData.dataType,
          normalized: attrData.normalized,
          dimension: geomAttrDesc.dimension,
          elementSize: geomAttrDesc.elementSize,
        }
      }
    }

    // //////////////////////////////////////
    // Indices
    if (geomBuffers.indices) {
      const numIndices = geomBuffers.indices.length
      if (this.indicesCounts[index] != numIndices) {
        if (numIndices == 0) {
          this.indicesAllocator.deallocate(index)
          this.indicesOffsets[index] = 0
          this.indicesCounts[index] = 0
        } else {
          const allocation = this.indicesAllocator.allocate(index, numIndices)
          const elementSize = 4 //  Uint32Array for UNSIGNED_INT
          this.indicesOffsets[index] = allocation.start * elementSize // offset is in bytes
          this.indicesCounts[index] = allocation.size
        }
      }
    } else {
      // Note: for non-indexed data, like Points, we provide
      // the vertex data as offset and count in the method
      // getGeomOffsetAndCount.
      this.indicesOffsets[index] = this.geomVertexOffsets[index]
      this.indicesCounts[index] = this.geomVertexCounts[index]
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

    // //////////////////////////////////////
    // Indices
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
  uploadBuffers(index: number) {
    const gl = this.__gl

    // Note: when we allocate the buffers, we may resize the buffer, which
    // means we need to re-upload geoms that were not changed.
    let geomBuffers = this.geomBuffersTmp[index]
    if (!geomBuffers) {
      const geom = this.geoms[index]
      if (!geom) return
      geomBuffers = geom.genBuffers()
      this.geomBuffersTmp[index] = geomBuffers
    }

    const count = this.geomVertexCounts[index]
    const numVerts = geomBuffers.numRenderVerts ? geomBuffers.numRenderVerts : geomBuffers.numVertices
    if (count != numVerts) {
      throw new Error('Invalid allocation for this geom')
    }
    if (numVerts == 0) {
      const event = new IndexEvent(index)
      this.emit('geomDataChanged', event)
      return
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
      gl.bufferSubData(gl.ARRAY_BUFFER, dstByteOffsetInBytes, attrData.values)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    // //////////////////////////////////////
    // Indices
    // Note: we sometimes see geometries with zero vertices/indices which means
    // no allocation has yet been made. We can safely skip these.
    if (geomBuffers.indices && geomBuffers.indices.length > 0) {
      const indices = geomBuffers.indices

      const allocation = this.indicesAllocator.getAllocation(index)

      if (allocation.size != indices.length) {
        throw new Error('Invalid allocation for this geom')
      }

      const attributesAllocation = this.attributesAllocator.getAllocation(index)
      // The indices need to be offset so they they index the new attributes array.
      const offsettedIndices = new Uint32Array(allocation.size)
      for (let i = 0; i < indices.length; i++) {
        offsettedIndices[i] = geomBuffers.indices[i] + attributesAllocation.start
      }

      const gl = this.__gl
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
      const elementSize = 4 //  Uint32Array
      const dstByteOffsetInBytes = allocation.start * elementSize
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, dstByteOffsetInBytes, offsettedIndices)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    }
    let event = new IndexEvent(index)
    this.emit('geomDataChanged', event)
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
    dirtyGeomIndices.forEach((index: number) => {
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

    this.dirtyGeomIndices.forEach((index: number) => {
      this.uploadBuffers(index)
    })

    this.dirtyGeomIndices = new Set()
    this.geomBuffersTmp = []
  }

  // /////////////////////////////////////
  // Binding

  /**
   * The bind method.
   * @param {RenderState} renderstate - The renderstate value.
   * @return {boolean} - Returns true if binding was successful
   */
  bind(renderstate: RenderState) {
    if (this.dirtyGeomIndices.size > 0) {
      this.cleanGeomBuffers()
    }

    let shaderBinding = this.shaderBindings[renderstate.shaderkey!]
    if (!shaderBinding) {
      const gl = this.__gl
      shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.glattrbuffers, this.indexBuffer)
      this.shaderBindings[renderstate.shaderkey!] = shaderBinding
    } else {
      shaderBinding.bind(renderstate)
    }
    return true
  }

  /**
   * The unbind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  unbind(renderstate: RenderState) {
    // Unbinding a geom is important as it puts back some important
    // GL state. (vertexAttribDivisor)
    const shaderBinding = this.shaderBindings[renderstate.shaderkey!]
    if (shaderBinding) {
      shaderBinding.unbind(renderstate)
    }
  }

  // /////////////////////////////////////
  // Drawing

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

    if (this.indexBuffer) {
      gl.deleteBuffer(this.indexBuffer)
      this.indexBuffer = null
    }

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
    this.emit('destructing')
  }
}

export { GLGeomLibrary, resizeIntArray }
