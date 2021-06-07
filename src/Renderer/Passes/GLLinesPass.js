import { PassType } from './GLPass.js'
import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass.js'
import { GLRenderer } from '../GLRenderer.js'
import { Lines, LinesProxy, Points, PointsProxy } from '../../SceneTree/index'

/** Class representing a GL opaque geoms pass.
 * @extends GLOpaqueGeomsPass
 * @private
 */
class GLLinesPass extends GLOpaqueGeomsPass {
  /**
   * Create a GL opaque geoms pass.
   */
  constructor() {
    super()
  }

  /**
   * The init method.
   * @param {GLBaseRenderer} renderer - The renderer value.
   * @param {number} passIndex - The index of the pass in the GLBAseRenderer
   */
  init(renderer, passIndex) {
    super.init(renderer, passIndex)

    this.__geomDataBuffer = new GLTexture2D(this.__gl, {
      type: renderer.__floatGeomBuffer ? 'FLOAT' : 'UNSIGNED_BYTE',
      format: 'RGBA',
      filter: 'NEAREST',
      width: 1,
      height: 2,
    })
    this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true)
    this.__geomDataBufferFbo.setClearColor([0, 0, 0, 0])
    this.fattenLinesShader = new FattenLinesShader(gl)
  }
  /**
   * The filterGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {boolean} - The return value.
   */
  filterGeomItem(geomItem) {
    const geom = geomItem.getParameter('Geometry').getValue()
    if (geom instanceof Lines || geom instanceof LinesProxy || geom instanceof Points || geom instanceof PointsProxy) {
      return true
    }
  }

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate) {
    const gl = this.__gl

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    this.__traverseTreeAndDraw(renderstate)

    gl.disable(gl.BLEND)
  }
  /**
   * The drawGeomData method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate) {
    if (this.__geomDataBufferFbo) {
      const { region } = renderstate
      if (this.__geomDataBuffer.width != region[2] || this.__geomDataBuffer.height != region[3]) {
        this.__geomDataBuffer.resize(region[2], region[3])

        this.fbo = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture.glTex, 0)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      }
      this.__geomDataBufferFbo.bindForWriting(renderstate)
    }
    super.drawGeomData(renderstate)

    if (this.__geomDataBufferFbo) {
      this.__geomDataBufferFbo.unbindForWriting(renderstate)

      this.fattenLinesShader.bind(renderstate)

      const unifs = renderstate.unifs

      this.depthTexture.bindToUniform(renderstate, unifs.depthTexture)

      if (!gl.renderbufferStorageMultisample) {
        this.offscreenBuffer.bindToUniform(renderstate, unifs.colorTexture)
      }

      gl.uniform2f(unifs.screenSize.location, this.__width, this.__height)
      gl.uniform1f(unifs.outlineThickness.location, this.renderer.outlineThickness)
      gl.uniform4f(unifs.outlineColor.location, ...this.renderer.outlineColor.asArray())
      gl.uniform1f(unifs.outlineDepthMultiplier.location, renderstate.outlineDepthMultiplier)
      gl.uniform1f(unifs.outlineDepthBias.location, this.renderer.outlineDepthBias)

      gl.uniform2f(unifs.depthRange.location, renderstate.depthRange[0], renderstate.depthRange[1])

      this.quad.bindAndDraw(renderstate)
    }
  }
}

GLRenderer.registerPass(GLLinesPass, PassType.OPAQUE)

export { GLLinesPass }
