import { GLGeom } from './GLGeom.js'
import { generateShaderGeomBinding } from './GeomShaderBinding.js'

/** Class representing GL points.
 * @extends GLGeom
 * @private
 */
class GLPoints extends GLGeom {
  /**
   * Create a GL point.
   * @param {GLGeomLibrary} glGeomLibrary - The library that owns all the geometry data.
   * @param {Points} points - The points value.
   * @param {number} geomIndex - The index of the geom in the geom library.
   */
  constructor(glGeomLibrary, points, geomIndex) {
    super(glGeomLibrary, points, geomIndex)
    // this.genBuffers()
  }

  /**
   * The genBuffers method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   
  genBuffers(renderstate) {
    super.genBuffers(renderstate)

    const gl = this.__gl

    const geomBuffers = this.__geom.genBuffers()

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]

      const attrBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)

      this.__glattrbuffers[attrName] = {
        buffer: attrBuffer,
        dataType: attrData.dataType,
        normalized: attrData.normalized,
      }
    }

    this.__numVertices = geomBuffers.numVertices
    this.__vboState = 2
  }*/

  /**
   * The updateBuffers method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * /
  updateBuffers(renderstate) {
    const gl = this.__gl
    const geomBuffers = this.__geom.genBuffers()

    // Update the vertex attribute buffers
    const numVertsChanged = geomBuffers.numVertices != this.__numVertices
    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]
      const glattr = this.__glattrbuffers[attrName]
      if (numVertsChanged) {
        gl.deleteBuffer(glattr.buffer)
        glattr.buffer = gl.createBuffer()
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)
    }

    // Cache the size so we know later if it changed (see below)
    this.__numVertices = geomBuffers.numVertices
  }

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @return {any} - The return value.
   */
  bind(renderstate) {
    if (renderstate.unifs.PointSize) {
      const gl = this.__gl
      if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()
      this.glGeomLibrary.bindWithExtras(renderstate, gl.__quadattrbuffers, gl.__quadIndexBuffer)
      return true
    } else {
      return super.bind(renderstate)
    }
  }

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate) {
    const gl = this.__gl
    const offsetAndCount = this.glGeomLibrary.getGeomOffsetAndCount(this.geomIndex)
    if (renderstate.unifs.PointSize) {
      gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, offsetAndCount[1])
    } else {
      gl.drawArrays(gl.POINTS, offsetAndCount[0], offsetAndCount[1])
    }
  }

  /**
   * The drawInstanced method.
   * @param {any} instanceCount - The instanceCount value.
   */
  drawInstanced(instanceCount) {
    const gl = this.__gl
    const offsetAndCount = this.glGeomLibrary.getGeomOffsetAndCount(this.geomIndex)
    gl.drawArraysInstanced(gl.POINTS, offsetAndCount[0], offsetAndCount[1], instanceCount)
  }
}
export { GLPoints }
// GLPoints;
