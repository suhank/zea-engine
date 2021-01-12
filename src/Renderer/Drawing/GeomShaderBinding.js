/* eslint-disable guard-for-in */
import { Color, Vec2, Vec3, Vec4, RGBA } from '../../Math/index'
import { UInt8, SInt8, UInt16, SInt16, UInt32, SInt32, Float32 } from '../../Utilities/MathFunctions'

/**
 * Returns a descriptor for the provided geom attribute.
 * @param {WebGLContext} gl - The wbegl context
 * @param {object} geomAttrBuffer - The geometry attribute value.
 *
 * @return {object}
 */
const genDataTypeDesc = (gl, attrDataType) => {
  let dimension
  let elementSize
  let dataType
  switch (attrDataType) {
    case UInt8:
      dimension = 1
      elementSize = 4
      dataType = gl.UNSIGNED_BYTE
      break
    case SInt8:
      dimension = 1
      elementSize = 4
      dataType = gl.BYTE
      break
    case UInt16:
      dimension = 1
      elementSize = 4
      dataType = gl.UNSIGNED_SHORT
      break
    case SInt16:
      dimension = 1
      elementSize = 4
      dataType = gl.SHORT
      break
    case UInt32:
      dimension = 1
      elementSize = 4
      dataType = gl.UNSIGNED_INT
      break
    case SInt32:
      dimension = 1
      elementSize = 4
      dataType = gl.INT
      break
    case Float32:
      dimension = 1
      elementSize = 4
      dataType = gl.FLOAT
      break
    case Vec2:
      dimension = 2
      elementSize = 4
      dataType = gl.FLOAT
      break
    case Vec3:
      dimension = 3
      elementSize = 4
      dataType = gl.FLOAT
      break
    case Vec4:
    case Color:
      dimension = 4
      elementSize = 4
      dataType = gl.FLOAT
      break
    case RGBA:
      dimension = 4
      elementSize = 1
      dataType = gl.UNSIGNED_BYTE
      break
    default:
      throw 'Unhandled Type'
  }

  return {
    dimension,
    elementSize,
    dataType,
  }
}

/** Class representing a geom shader binding.
 * @private
 */
class GeomShaderBinding {
  /**
   * Create a geom shader binding.
   * @param {any} gl - The gl value.
   * @param {any} shaderAttrs - The shader attributes.
   * @param {any} geomAttrBuffers - The geomAttrBuffers value.
   * @param {any} indexBuffer - The index buffer.
   */
  constructor(gl, shaderAttrs, geomAttrBuffers, indexBuffer) {
    this.__gl = gl
    this.__shaderAttrs = shaderAttrs
    this.__glattrbuffers = geomAttrBuffers
    this.__indexBuffer = indexBuffer
  }

  /**
   * The bind method.
   * @param {any} renderstate - The render state.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    const gl = this.__gl

    for (const attrName in this.__shaderAttrs) {
      if (attrName == 'instancedIds') continue
      const shaderAttrDesc = this.__shaderAttrs[attrName]
      const location = shaderAttrDesc.location
      if (location == -1) continue
      const geomAttrBuffer = this.__glattrbuffers[attrName]
      if (!geomAttrBuffer) {
        gl.disableVertexAttribArray(location)
        continue
      }

      const geomAttrDesc = genDataTypeDesc(gl, geomAttrBuffer.dataType)

      const stride = geomAttrDesc.dimension * geomAttrDesc.elementSize
      const offset =
        geomAttrBuffer.offset != undefined
          ? geomAttrBuffer.offset * geomAttrDesc.dimension * geomAttrDesc.elementSize
          : 0
      const normalized = geomAttrBuffer.normalized == true
      const instanced = shaderAttrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, geomAttrBuffer.buffer)
      gl.vertexAttribPointer(location, geomAttrDesc.dimension, geomAttrDesc.dataType, normalized, stride, offset)

      if (gl.vertexAttribDivisor) {
        if (instanced == true) {
          gl.vertexAttribDivisor(location, 1) // This makes it instanced
        } else {
          gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
        }
      }

      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)

    return true
  }

  /**
   * The unbind method.
   */
  unbind() {
    const gl = this.__gl
    for (const attrName in this.__shaderAttrs) {
      const shaderAttrDesc = this.__shaderAttrs[attrName]
      const location = shaderAttrDesc.location
      if (location == -1) {
        gl.enableVertexAttribArray(location)
      }
      if (shaderAttrDesc.instanced) {
        gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
      }
      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {}
}

/** Class representing vertex array objects (VAO) geom shader binding.
 * @private
 */
class VAOGeomShaderBinding {
  /**
   * Create VAO geom shader binding.
   * @param {any} gl - The gl value.
   * @param {any} shaderAttrs - The shaderAttrs value.
   * @param {any} geomAttrBuffers - The geomAttrBuffers value.
   * @param {any} indexBuffer - The indexBuffer value.
   */
  constructor(gl, shaderAttrs, geomAttrBuffers, indexBuffer) {
    this.__gl = gl
    this.__vao = gl.createVertexArray()
    gl.bindVertexArray(this.__vao)

    for (const attrName in shaderAttrs) {
      if (attrName == 'instancedIds') continue

      const shaderAttrDesc = shaderAttrs[attrName]
      const location = shaderAttrDesc.location
      if (location == -1) continue
      const geomAttrBuffer = geomAttrBuffers[attrName]
      if (!geomAttrBuffer) {
        // console.warn("geomAttrBuffer missing:" + attrName + " location:" + location);
        gl.disableVertexAttribArray(location)
        continue
      }

      const geomAttrDesc = genDataTypeDesc(gl, geomAttrBuffer.dataType)

      const stride = geomAttrDesc.dimension * geomAttrDesc.elementSize
      const offset =
        geomAttrBuffer.offset != undefined
          ? geomAttrBuffer.offset * geomAttrDesc.dimension * geomAttrDesc.elementSize
          : 0
      const normalized = geomAttrBuffer.normalized == true
      const instanced = shaderAttrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, geomAttrBuffer.buffer)
      gl.vertexAttribPointer(location, geomAttrDesc.dimension, geomAttrDesc.dataType, normalized, stride, offset)

      if (gl.vertexAttribDivisor) {
        if (instanced == true) {
          gl.vertexAttribDivisor(location, 1) // This makes it instanced
        } else {
          gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
        }
      }
      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    gl.bindVertexArray(null)

    this.__indexBuffer = indexBuffer
  }

  /**
   * The bind method.
   * @param {any} renderstate - The render state.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    this.__gl.bindVertexArray(this.__vao)
    if (this.__indexBuffer) this.__gl.bindBuffer(this.__gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
    return true
  }

  /**
   * The unbind method.
   */
  unbind() {
    const gl = this.__gl
    gl.bindVertexArray(null)
    if (this.__indexBuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    this.__gl.deleteVertexArray(this.__vao)
  }
}

function generateShaderGeomBinding(gl, shaderAttrs, geomAttrBuffers, indexBuffer) {
  if (gl.createVertexArray == null) {
    return new GeomShaderBinding(gl, shaderAttrs, geomAttrBuffers, indexBuffer)
  } else {
    return new VAOGeomShaderBinding(gl, shaderAttrs, geomAttrBuffers, indexBuffer)
  }
}

export { generateShaderGeomBinding, genDataTypeDesc }
