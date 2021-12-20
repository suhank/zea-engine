import { PassType } from './GLPass'
import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass'
import { GLRenderer } from '../GLRenderer'
import { GLTexture2D } from '../GLTexture2D'
import { GeomItem, Lines, LinesProxy, Points, PointsProxy } from '../../SceneTree/index'
import { FattenLinesShader } from '../Shaders/FattenLinesShader'
import { Plane } from '../../SceneTree/index'
import { GLMesh } from '../Drawing/GLMesh'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { RenderState, GeomDataRenderState } from '../types/renderer'
import { checkFramebuffer } from '../GLFbo'

/** Class representing a GL opaque geoms pass.
 * @extends GLOpaqueGeomsPass
 * @private
 */
class GLLinesPass extends GLOpaqueGeomsPass {
  protected linesGeomDataBuffer: GLTexture2D | null = null
  protected fattenLinesShader: FattenLinesShader | null = null
  protected quad: GLMesh | null = null
  protected fbo: WebGLFramebuffer | null = null
  /**
   * Create a GL opaque geoms pass.
   */
  constructor() {
    super()
  }

  /**
   * The init method.
   * @param renderer - The renderer value.
   * @param passIndex - The index of the pass in the GLBAseRenderer
   */
  init(renderer: GLBaseRenderer, passIndex: number) {
    super.init(renderer, passIndex)
  }
  /**
   * The filterGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The return value.
   */
  filterGeomItem(geomItem: GeomItem): boolean {
    const geom = geomItem.geomParam.value
    if (geom instanceof Lines || geom instanceof LinesProxy || geom instanceof Points || geom instanceof PointsProxy) {
      return true
    }
    return false
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    const gl = this.__gl!

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
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState) {
    const gl = this.__gl!
    //  Note: lines in VR are not fattened...
    if (renderstate.geomDataFbo) {
      if (!this.linesGeomDataBuffer) {
        this.linesGeomDataBuffer = new GLTexture2D(gl, {
          type: this.__renderer.floatGeomBuffer ? 'FLOAT' : 'UNSIGNED_BYTE',
          format: 'RGBA',
          filter: 'NEAREST',
          width: 1,
          height: 2,
        })
        this.fattenLinesShader = new FattenLinesShader(gl)
        this.quad = new GLMesh(gl, new Plane(1, 1))
      }

      const geomDataFbo = renderstate.geomDataFbo
      const width = geomDataFbo.width
      const height = geomDataFbo.height

      if (this.linesGeomDataBuffer.width != width || this.linesGeomDataBuffer.height != height) {
        if (this.fbo) {
          gl.deleteFramebuffer(this.fbo)
          this.fbo = null
        }

        this.linesGeomDataBuffer.resize(width, height)

        this.fbo = gl.createFramebuffer()

        const colorTex = this.linesGeomDataBuffer.glTex
        const depthBuffer = geomDataFbo.__depthTexture // Share the existing depth buffer.
        if (gl.name == 'webgl2') {
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo)
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0)
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthBuffer, 0)
        } else {
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0)
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthBuffer, 0)
        }
        checkFramebuffer(gl, width, height)
      } else {
        if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo)
        else gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
      }

      gl.colorMask(true, true, true, true)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    super.drawGeomData(renderstate)

    if (renderstate.geomDataFbo) {
      renderstate.geomDataFbo.bindForWriting(renderstate)

      this.fattenLinesShader!.bind(renderstate)

      const { colorTexture, screenSize } = renderstate.unifs
      this.linesGeomDataBuffer!.bindToUniform(renderstate, colorTexture)

      const geomDataFbo = renderstate.geomDataFbo
      gl.uniform2f(screenSize.location, geomDataFbo.width, geomDataFbo.height)

      this.quad!.bindAndDraw(renderstate)
    }
  }
}

GLRenderer.registerPass(GLLinesPass, PassType.OPAQUE)

export { GLLinesPass }
