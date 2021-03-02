import { RefCounted } from '../../SceneTree/index'
import { generateShaderGeomBinding } from './GeomShaderBinding.js'
import { GLGeomLibrary } from './GLGeomLibrary.js'

/** Class representing a GL geom.
 * @private
 */
class GLGeom extends RefCounted {
  /**
   * Create a GL geom.
   * @param {GLGeomLibrary} glGeomLibrary - The library that owns all the geometry data.
   * @param {BaseGeom} geom - A geometry object
   * @param {number} geomIndex - The index of the geom in the geom library.
   */
  constructor(glGeomLibrary, geom, geomIndex) {
    super()

    if (glGeomLibrary instanceof GLGeomLibrary) {
      this.glGeomLibrary = glGeomLibrary
      this.__gl = glGeomLibrary.renderer.gl
      this.__geom = geom
      this.geomIndex = geomIndex
    } else {
      this.__gl = glGeomLibrary
      this.glGeomLibrary = GLGeomLibrary.getInstance()
      this.__geom = geom
      this.geomIndex = this.glGeomLibrary.addGeom(geom)
    }

    /*
    this.__glattrbuffers = {}
    this.__shaderBindings = {}
    this.buffersDirty = true

    const geomDataChanged = (opts) => {
      this.dirtyBuffers(opts)
    }
    this.__geom.on('geomDataChanged', geomDataChanged)

    const geomDataTopologyChanged = (opts) => {
      this.clearBuffers()
      this.dirtyBuffers(opts)
    }
    this.__geom.on('geomDataTopologyChanged', geomDataTopologyChanged)
    */
  }

  /**
   * Returns the owned Geometry object
   * @return {BaseGeom} - The geometry object.
   */
  getGeom() {
    return this.__geom
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * The dirtyBuffers method.
   * @param {object} opts - options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool)
   * /
  dirtyBuffers(opts) {
    this.genBufferOpts = opts
    this.buffersDirty = true
    this.emit('updated')
  }

  /**
   * The genBuffers method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * /
  genBuffers(renderstate) {}

  /**
   * The updateBuffers method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * /
  updateBuffers(renderstate) {
    this.genBuffers(renderstate)
  }
  */

  // /////////////////////////////////////
  // Binding

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @return {boolean} - Returns true if binding was successful
   */
  bind(renderstate) {
    // if (this.__destroyed) throw new Error('Error binding a destroyed geom')

    // if (this.buffersDirty) this.updateBuffers()

    // let shaderBinding = this.__shaderBindings[renderstate.shaderkey]
    // if (!shaderBinding) {
    //   const gl = this.__gl
    //   shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, this.__indexBuffer)
    //   this.__shaderBindings[renderstate.shaderkey] = shaderBinding
    // }
    // shaderBinding.bind(renderstate)
    // return true

    return this.glGeomLibrary.bind(renderstate)
  }

  /**
   * The unbind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  unbind(renderstate) {
    // Unbinding a geom is important as it puts back some important
    // GL state. (vertexAttribDivisor)
    // const shaderBinding = this.__shaderBindings[renderstate.shaderkey]
    // if (shaderBinding) {
    //   shaderBinding.unbind(renderstate)
    // }
  }

  // /////////////////////////////////////
  // Drawing
  // Draw an item to screen.

  /**
   * The draw method.
   */
  draw() {
    throw new Error('Not implemented. Implement this method in a derived class.')
  }

  /**
   * The drawInstanced method.
   * @param {any} instanceCount - The instanceCount param.
   */
  drawInstanced(instanceCount) {
    throw new Error('Not implemented. Implement this method in a derived class.')
  }

  /**
   * The bindAndDraw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  bindAndDraw(renderstate) {
    this.bind(renderstate)
    this.draw(renderstate)
  }

  /**
   * The clearBuffers method.
  clearBuffers() {
    const gl = this.__gl
    // eslint-disable-next-line guard-for-in
    for (const attrName in this.__glattrbuffers) {
      const glbuffer = this.__glattrbuffers[attrName]
      if (glbuffer.shared) continue /* This buffer is shared between geoms. do not destroy * /
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
   */

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    // this.__geom.deleteMetadata('glgeom')

    // this.clearBuffers()

    this.__destroyed = true

    //  Note: PoTree listens to this event. If moved up into RefCounted, make sure it is still emitted.
    this.emit('destructing', {})
  }
}

export { GLGeom }
