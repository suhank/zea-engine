import { BaseGeom, RefCounted } from '../../SceneTree/index'
import { generateShaderGeomBinding } from './GeomShaderBinding'

/** Class representing a GL geom.
 * @private
 */
class GLGeom extends RefCounted {
  protected __gl: WebGL12RenderingContext
  protected __geom: BaseGeom
  protected __glattrbuffers: Record<any, any>
  protected __shaderBindings: Record<any, any>
  protected buffersDirty: boolean
  protected genBufferOpts: Record<any, any>
  protected __indexBuffer: WebGLBuffer
  /**
   * Create a GL geom.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {BaseGeom} geom - A geometry object
   */
  constructor(gl: WebGL12RenderingContext, geom: BaseGeom) {
    super()
    this.__gl = gl
    this.__geom = geom

    this.__glattrbuffers = {}
    this.__shaderBindings = {}
    this.buffersDirty = true

    const geomDataChanged = (opts: Record<any, any>) => {
      this.dirtyBuffers(opts)
    }
    this.__geom.on('geomDataChanged', geomDataChanged)

    const geomDataTopologyChanged = (opts: Record<any, any>) => {
      this.clearBuffers()
      this.dirtyBuffers(opts)
    }
    this.__geom.on('geomDataTopologyChanged', geomDataTopologyChanged)
  }

  /**
   * Returns the owned Geometry object
   * @return {BaseGeom} - The geometry object.
   */
  getGeom(): BaseGeom {
    return this.__geom
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * The dirtyBuffers method.
   * @param {Record<any,any>} opts - options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool)
   */
  dirtyBuffers(opts: Record<any, any>) {
    this.genBufferOpts = opts
    this.buffersDirty = true
    this.emit('updated')
  }

  /**
   * The genBuffers method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  genBuffers(renderstate?: RenderState) {
    throw new Error('genBuffers Not implemented')
  }

  /**
   * The updateBuffers method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  updateBuffers(renderstate?: RenderState) {
    this.genBuffers(renderstate)
  }

  // /////////////////////////////////////
  // Binding

  /**
   * The bind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @return {boolean} - returns false if the binding failed.
   */
  bind(renderstate: RenderState) {
    if (this.__destroyed) throw new Error('Error binding a destroyed geom')

    if (this.buffersDirty) this.updateBuffers()

    let shaderBinding = this.__shaderBindings[renderstate.shaderkey]
    if (!shaderBinding) {
      const gl = this.__gl
      shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, this.__indexBuffer)
      this.__shaderBindings[renderstate.shaderkey] = shaderBinding
    }
    shaderBinding.bind(renderstate)
    return true
  }

  /**
   * The unbind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  unbind(renderstate: RenderState) {
    // Unbinding a geom is important as it puts back some important
    // GL state. (vertexAttribDivisor)
    const shaderBinding = this.__shaderBindings[renderstate.shaderkey]
    if (shaderBinding) {
      shaderBinding.unbind(renderstate)
    }
  }

  // /////////////////////////////////////
  // Drawing
  // Draw an item to screen.

  /**
   * The draw method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    throw new Error('Not implemented. Implement this method in a derived class.')
  }

  /**
   * The drawInstanced method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {number} instanceCount - The instanceCount param.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number) {
    throw new Error('Not implemented. Implement this method in a derived class.')
  }

  /**
   * The bindAndDraw method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  bindAndDraw(renderstate: RenderState) {
    this.bind(renderstate)
    this.draw(renderstate)
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers() {
    const gl = this.__gl
    // eslint-disable-next-line guard-for-in
    for (const attrName in this.__glattrbuffers) {
      const glbuffer = this.__glattrbuffers[attrName]
      if (glbuffer.shared) continue /* This buffer is shared between geoms. do not destroy */
      gl.deleteBuffer(glbuffer.buffer)
    }
    this.__glattrbuffers = {}

    // eslint-disable-next-line guard-for-in
    for (const shaderkey in this.__shaderBindings) {
      const shaderBinding = this.__shaderBindings[shaderkey]
      shaderBinding.destroy()
    }
    this.__shaderBindings = {}
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    this.__geom.deleteMetadata('glgeom')

    this.clearBuffers()

    this.__destroyed = true

    //  Note: PoTree listens to this event. If moved up into RefCounted, make sure it is still emitted.
    this.emit('destructing')
  }
}

export { GLGeom }
