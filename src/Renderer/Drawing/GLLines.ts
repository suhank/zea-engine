import { Vec2, Vec3 } from '../../Math/index'
import { GLGeom } from './GLGeom'
import { generateShaderGeomBinding } from './GeomShaderBinding'
import { GLTexture2D } from '../GLTexture2D'
import { Lines } from '../../SceneTree/Geometry/Lines'
import { Vec3Attribute } from '../../SceneTree/Geometry/Vec3Attribute'
import { BaseGeom } from '../../SceneTree'

/** Class representing GL lines.
 * @extends GLGeom
 * @private
 */
class GLLines extends GLGeom {
  protected __numSegIndices: number
  protected __numVertices: number
  protected __fatBuffersNeedUpload: boolean
  protected fatBuffers: any
  protected __buffersNeedUpload: boolean
  protected __indexDataType: number
  /**
   * Create a GL line.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {BaseGeom} lines - The geom value.
   */
  constructor(gl: WebGL12RenderingContext, lines: BaseGeom) {
    super(gl, lines)

    this.__numSegIndices = 0
    this.__numVertices = 0
    this.__fatBuffersNeedUpload = true
  }

  /**
   * The dirtyBuffers method.
   * @param {Record<any,any>} opts - options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool)
   */
  dirtyBuffers(opts: Record<any, any>) {
    super.dirtyBuffers(opts)
    this.__fatBuffersNeedUpload = true
    this.emit('updated')
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers() {
    const gl = this.__gl
    gl.deleteBuffer(this.__indexBuffer)
    this.__indexBuffer = null

    if (this.fatBuffers && this.fatBuffers.positionsTexture) {
      if (this.fatBuffers.positionsTexture) {
        this.fatBuffers.positionsTexture.destroy()
        this.fatBuffers.positionsTexture = null
      }
      if (this.fatBuffers.glattrbuffers.segmentIndices.buffer) {
        gl.deleteBuffer(this.fatBuffers.glattrbuffers.segmentIndices.buffer)
        this.fatBuffers.glattrbuffers.segmentIndices = null
      }
    }

    super.clearBuffers()
  }

  /**
   * The genFatBuffers method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  genFatBuffers(renderstate: RenderState) {
    const gl = this.__gl

    const geomBuffers = this.__geom.genBuffers()
    const indices = geomBuffers.indices
    const numVertsChanged = geomBuffers.numVertices != this.__numVertices

    if (!gl.__quadVertexIdsBuffer) {
      gl.setupInstancedQuad()
    }
    if (!this.fatBuffers) {
      this.fatBuffers = { glattrbuffers: {} }
      this.fatBuffers.glattrbuffers.vertexIDs = gl.__quadattrbuffers.vertexIDs
    }

    const unit = renderstate.boundTextures++
    gl.activeTexture(this.__gl.TEXTURE0 + unit)

    this.fatBuffers.drawCount = indices.length / 2

    const vertexAttributes = this.__geom.getVertexAttributes()
    const positions = <Vec3Attribute>vertexAttributes.positions
    const lineThicknessAttr = vertexAttributes.lineThickness

    const stride = 4 // The number of floats per draw item.
    const dataArray = new Float32Array(positions.asArray().length * stride)
    for (let i = 0; i < positions.asArray().length; i++) {
      const pos = Vec3.createFromBuffer(dataArray.buffer, i * stride * 4)
      pos.setFromOther(positions.getValueRef(i))

      // The thickness of the line.
      if (lineThicknessAttr) dataArray[i * 4 + 3] = lineThicknessAttr.getFloat32Value(i)
      else dataArray[i * 4 + 3] = 1.0
    }

    if (numVertsChanged && this.fatBuffers.positionsTexture) {
      this.fatBuffers.positionsTexture.destroy()
      this.fatBuffers.positionsTexture = null
    }
    if (!this.fatBuffers.positionsTexture) {
      this.fatBuffers.positionsTexture = new GLTexture2D(this.__gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: positions.asArray().length,
        /* each pixel has 4 floats*/
        height: 1,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        data: dataArray,
        mipMapped: false,
      })
    } else {
      this.fatBuffers.positionsTexture.bufferData(dataArray, positions.asArray().length, 1)
    }

    const makeIndices = () => {
      const indexArray = new Float32Array(indices.length)
      for (let i = 0; i < indices.length; i++) {
        let seqentialIndex
        if (i % 2 == 0) {
          seqentialIndex = i > 0 ? indices[i] == indices[i - 1] : indices[i] == indices[indices.length - 1]
        } else {
          seqentialIndex = i < indices.length - 1 ? indices[i] == indices[i + 1] : indices[i] == indices[0]
        }
        // encode the flag into the indices values.
        // this flag is decoded in GLSL.
        indexArray[i] = (seqentialIndex ? 1 : 0) + indices[i] * 2
      }
      return indexArray
    }

    if (!this.fatBuffers.glattrbuffers.segmentIndices) {
      const indexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, makeIndices(), gl.STATIC_DRAW)

      this.fatBuffers.glattrbuffers.segmentIndices = {
        buffer: indexBuffer,
        dimension: 2,
        dataType: Vec2,
      }
    } else {
      if (!this.genBufferOpts || (this.genBufferOpts && this.genBufferOpts.topologyChanged)) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.fatBuffers.glattrbuffers.segmentIndices.buffer)
        gl.bufferData(gl.ARRAY_BUFFER, makeIndices(), gl.STATIC_DRAW)
      }
    }
    this.__numSegIndices = indices.length
    this.__numVertices = geomBuffers.numVertices

    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--

    this.__fatBuffersNeedUpload = false
  }

  /**
   * The genBuffers method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  genBuffers(renderstate?: RenderState) {
    const gl = this.__gl

    const geomBuffers = this.__geom.genBuffers()
    const indices = geomBuffers.indices
    const numVertsChanged = geomBuffers.numVertices != this.__numVertices
    {
      if (!this.__indexBuffer) {
        this.__indexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
      } else {
        // Note: the topology can change without the number of vertices changing
        // and vice versa.
        if (!this.genBufferOpts || (this.genBufferOpts && this.genBufferOpts.topologyChanged)) {
          if (this.__numSegIndices != indices.length) {
            gl.deleteBuffer(this.__indexBuffer)
            this.__indexBuffer = gl.createBuffer()
          }
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
          this.__numSegIndices = indices.length
        }
      }

      // eslint-disable-next-line guard-for-in
      for (const attrName in geomBuffers.attrBuffers) {
        const attrData = geomBuffers.attrBuffers[attrName]
        if (!this.__glattrbuffers[attrName]) {
          const attrBuffer = gl.createBuffer()
          gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)
          gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)

          this.__glattrbuffers[attrName] = {
            buffer: attrBuffer,
            dataType: attrData.dataType,
            normalized: attrData.normalized,
          }
        } else {
          const glattr = this.__glattrbuffers[attrName]
          if (numVertsChanged) {
            gl.deleteBuffer(glattr.buffer)
            glattr.buffer = gl.createBuffer()
          }
          gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer)
          gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)
        }
      }

      // Cache the size so we know later if it changed
      this.__numSegIndices = indices.length
      this.__numVertices = geomBuffers.numVertices
      this.__buffersNeedUpload = false
    }

    if (indices instanceof Uint8Array) this.__indexDataType = this.__gl.UNSIGNED_BYTE
    if (indices instanceof Uint16Array) this.__indexDataType = this.__gl.UNSIGNED_SHORT
    if (indices instanceof Uint32Array) this.__indexDataType = this.__gl.UNSIGNED_INT
  }

  /**
   * The bind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @return {any} - The return value.
   */
  bind(renderstate: RenderState) {
    const gl = this.__gl
    const unifs = renderstate.unifs
    if (unifs.LineThickness && gl.floatTexturesSupported) {
      if (this.__fatBuffersNeedUpload) this.genFatBuffers(renderstate) // (renderstate, true)

      let shaderBinding = this.__shaderBindings[renderstate.shaderkey]
      if (!shaderBinding) {
        shaderBinding = generateShaderGeomBinding(
          this.__gl,
          renderstate.attrs,
          this.fatBuffers.glattrbuffers,
          gl.__quadIndexBuffer
        )
        this.__shaderBindings[renderstate.shaderkey] = shaderBinding
      }
      shaderBinding.bind(renderstate)

      const usePositionsTexture = true
      if (usePositionsTexture) {
        if (unifs.positionsTexture) {
          this.fatBuffers.positionsTexture.bindToUniform(renderstate, unifs.positionsTexture)
          gl.uniform1i(unifs.positionsTextureSize.location, this.fatBuffers.positionsTexture.width)
        }
      }

      return true
    } else {
      return super.bind(renderstate)
    }
  }

  // ////////////////////////////////
  // Drawing Lines Points.

  /**
   * The drawPoints method.
   */
  drawPoints() {
    this.__gl.drawArrays(this.__gl.POINTS, 0, this.__geom.numVertices())
  }

  // ////////////////////////////////
  // Regular Drawing.

  /**
   * The draw method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    const gl = this.__gl
    if (renderstate.unifs.LineThickness && gl.floatTexturesSupported) {
      gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.fatBuffers.drawCount)

      // Note: We don't have a solution for drawing fat lines to the geom data buffer.
    } else {
      gl.drawElements(this.__gl.LINES, this.__numSegIndices, this.__indexDataType, 0)
    }
  }

  /**
   * The drawInstanced method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @param {number} instanceCount - The instanceCount value.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number) {
    const gl = this.__gl
    const { occluded } = renderstate.unifs
    if (occluded) {
      gl.uniform1i(occluded.location, 0)
    }
    gl.drawElementsInstanced(this.__gl.LINES, this.__numSegIndices, this.__indexDataType, 0, instanceCount)

    if (occluded) {
      gl.uniform1i(occluded.location, 1)
      gl.depthFunc(gl.GREATER)
      gl.drawElementsInstanced(this.__gl.LINES, this.__numSegIndices, this.__indexDataType, 0, instanceCount)
      gl.depthFunc(gl.LEQUAL)
    }
  }
}

export { GLLines }
