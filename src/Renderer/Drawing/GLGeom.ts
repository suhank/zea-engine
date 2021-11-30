import { BaseGeom, Mesh, RefCounted } from '../../SceneTree/index'
import { RenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
import { generateShaderGeomBinding } from './GeomShaderBinding'

/** Class representing a GL geom.
 * @private
 */
class GLGeom extends RefCounted {
  protected __gl: WebGL12RenderingContext
  protected __geom: BaseGeom | Mesh
  protected __glattrbuffers: Record<string, any>
  protected __shaderBindings: Record<string, any>
  protected buffersDirty: boolean
  protected genBufferOpts: Record<string, any> = {}
  protected __indexBuffer: WebGLBuffer | null = null
  /**
   * Create a GL geom.
   * @param gl - The webgl rendering context.
   * @param geom - A geometry object
   */
  constructor(gl: WebGL12RenderingContext, geom: BaseGeom) {
    super()
    this.__gl = gl
    this.__geom = geom

    this.__glattrbuffers = {}
    this.__shaderBindings = {}
    this.buffersDirty = true

    const geomDataChanged = (opts: Record<string, any>) => {
      this.dirtyBuffers(opts)
    }
    this.__geom.on('geomDataChanged', geomDataChanged)

    const geomDataTopologyChanged = (opts: Record<string, any>) => {
      this.clearBuffers()
      this.dirtyBuffers(opts)
    }
    this.__geom.on('geomDataTopologyChanged', geomDataTopologyChanged)
  }

  /**
   * Returns the owned Geometry object
   * @return - The geometry object.
   */
  getGeom(): BaseGeom {
    return this.__geom
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * The dirtyBuffers method.
   * @param opts - options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool)
   */
  dirtyBuffers(opts: Record<string, any>): void {
    this.genBufferOpts = opts
    this.buffersDirty = true
    this.emit('updated')
  }

  /**
   * The genBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  genBuffers(renderstate?: RenderState): any {}

  /**
   * The updateBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  updateBuffers(renderstate?: RenderState) {
    this.genBuffers(renderstate)
    this.buffersDirty = false
  }

  // /////////////////////////////////////
  // Binding

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - returns false if the binding failed.
   */
  bind(renderstate: RenderState) {
    if (this.__destroyed) throw new Error('Error binding a destroyed geom')

    if (this.buffersDirty) this.updateBuffers()

    let shaderBinding = this.__shaderBindings[renderstate.shaderkey!]
    if (!shaderBinding) {
      const gl = this.__gl
      shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, this.__indexBuffer)
      this.__shaderBindings[renderstate.shaderkey!] = shaderBinding
    }
    shaderBinding.bind(renderstate)
    return true
  }

  /**
   * The unbind method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  unbind(renderstate: RenderState) {
    // Unbinding a geom is important as it puts back some important
    // GL state. (vertexAttribDivisor)
    const shaderBinding = this.__shaderBindings[renderstate.shaderkey!]
    if (shaderBinding) {
      shaderBinding.unbind(renderstate)
    }
  }

  // /////////////////////////////////////
  // Drawing
  // Draw an item to screen.

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    throw new Error('Not implemented. Implement this method in a derived class.')
  }

  /**
   * The drawInstanced method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param instanceCount - The instanceCount param.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number) {
    throw new Error('Not implemented. Implement this method in a derived class.')
  }

  /**
   * The bindAndDraw method.
   * @param renderstate - The object tracking the current state of the renderer
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
      const shaderBinding = this.__shaderBindings[shaderkey!]
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
