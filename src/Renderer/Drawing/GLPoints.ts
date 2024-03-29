import { GLGeom } from './GLGeom'
import { generateShaderGeomBinding } from './GeomShaderBinding'
import { WebGL12RenderingContext } from '../types/webgl'
import { RenderState } from '../types/renderer'

/** Class representing GL points.
 * @extends GLGeom
 * @private
 */
class GLPoints extends GLGeom {
  protected __numVertices: number = 9
  protected __vboState: number = -1
  /**
   * Create a GL point.
   * @param gl - The webgl rendering context.
   * @param points - The points value.
   */
  constructor(gl: WebGL12RenderingContext, points: any) {
    super(gl, points)
    this.genBuffers()
  }

  /**
   * The genBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  genBuffers(renderstate?: RenderState): void {
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
  }

  /**
   * The updateBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  updateBuffers(renderstate?: RenderState): void {
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
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  bind(renderstate: RenderState): boolean {
    if (renderstate.unifs.PointSize) {
      const gl = this.__gl
      let shaderBinding = this.__shaderBindings[renderstate.shaderkey!]
      if (!shaderBinding) {
        if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()

        // Merge the points attrs with the quad attrs.
        const attrbuffers = Object.assign(this.__glattrbuffers, gl.__quadattrbuffers)

        shaderBinding = generateShaderGeomBinding(this.__gl, renderstate.attrs, attrbuffers, gl.__quadIndexBuffer)
        this.__shaderBindings[renderstate.shaderkey!] = shaderBinding
      }
      shaderBinding.bind(renderstate)
      return true
    } else {
      return super.bind(renderstate)
    }
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState): void {
    const gl = this.__gl
    if (renderstate.unifs.PointSize) {
      gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__numVertices)
    } else {
      gl.drawArrays(gl.POINTS, 0, this.__numVertices)
    }
  }

  /**
   * The drawInstanced method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param instanceCount - The instanceCount value.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number): void {
    const gl = this.__gl
    gl.drawArraysInstanced(this.__gl.POINTS, 0, this.__numVertices, instanceCount)
  }
}
export { GLPoints }
// GLPoints;
