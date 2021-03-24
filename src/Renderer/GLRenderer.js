import { Vec3, Xfo, Mat4, Ray } from '../Math/index'
import { Plane, EnvMap, BaseImage } from '../SceneTree/index'
import { GLFbo } from './GLFbo.js'
import { GLRenderTarget } from './GLRenderTarget.js'
import { GLHDRImage } from './GLHDRImage.js'
import { GLEnvMap } from './GLEnvMap.js'
import { GLBaseRenderer } from './GLBaseRenderer.js'
import { GLTexture2D } from './GLTexture2D.js'
import { PassType } from './Passes/GLPass.js'
import { EnvMapShader } from './Shaders/EnvMapShader.js'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding.js'

import { OutlinesShader } from './Shaders/OutlinesShader.js'
import { GLMesh } from './Drawing/GLMesh.js'
import logo from './logo-zea.svg'
import { GLViewport } from './GLViewport'

const ALL_PASSES = PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY

/** Class representing a GL renderer.
 * @extends GLBaseRenderer
 */
class GLRenderer extends GLBaseRenderer {
  /**
   * Create a GL renderer.
   * @param {canvas} $canvas - The $canvas value.
   * @param {object} options - The dictionary of options.
   */
  constructor($canvas, options = {}) {
    super($canvas, options)

    // ///////////////////////
    // Renderer Setup
    this.__exposure = 1.0
    this.__tonemap = true
    this.__gamma = 2.2

    this.__glEnvMap = undefined
    this.__glBackgroundMap = undefined

    this.__displayEnvironment = true
    this.__debugMode = 0
    this._planeDist = 0.0
    this.__cutPlaneNormal = new Vec3(1, 0, 0)
    this.rayCastDist = 0
    this.rayCastArea = 0

    const gl = this.__gl

    this.__debugTextures = [undefined]

    this.addShaderPreprocessorDirective('ENABLE_INLINE_GAMMACORRECTION')
    if (!options.disableTextures) {
      this.addShaderPreprocessorDirective('ENABLE_TEXTURES')
    }

    if (options.debugGeomIds) {
      this.addShaderPreprocessorDirective('DEBUG_GEOM_ID')
    }

    this.__outlineShader = new OutlinesShader(gl)
    this.quad = new GLMesh(gl, new Plane(1, 1))

    this.createSelectedGeomsFbo()
  }

  /**
   * The __bindEnvMap method.
   * @param {EnvMap|BaseImage} env - The env value.
   * @private
   */
  __bindEnvMap(env) {
    const gl = this.__gl
    if (env instanceof EnvMap) {
      // Note: Safari doesn't support rendering to floating
      // point textures, so our PBR lighting pipeline doesn't work.
      if (gl.name !== 'webgl2') {
        return
      }

      this.__glEnvMap = env.getMetadata('gltexture')
      if (!this.__glEnvMap) {
        if (env.type === 'FLOAT') {
          this.addShaderPreprocessorDirective('ENABLE_PBR')
          this.__glEnvMap = new GLEnvMap(this, env)
        } else if (env.isStreamAtlas()) {
          this.__glEnvMap = new GLImageStream(gl, env)
        } else {
          this.__glEnvMap = new GLTexture2D(gl, env)
        }
      }
    } else {
      // Note: The difference between an EnvMap and a BackgroundMap, is that
      // An EnvMap must be HDR, and can be convolved for reflections.
      // A Background map can be simply an image.
      const backgroundMap = env
      this.__glBackgroundMap = backgroundMap.getMetadata('gltexture')
      if (!this.__glBackgroundMap) {
        if (backgroundMap.type === 'FLOAT') {
          this.__glBackgroundMap = new GLHDRImage(gl, backgroundMap)
        } else {
          this.__glBackgroundMap = new GLTexture2D(gl, backgroundMap)
        }
      }
      this.__glBackgroundMap.on('loaded', this.requestRedraw)
      this.__glBackgroundMap.on('updated', this.requestRedraw)
      if (!this.__backgroundMapShader) {
        if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()
        this.__backgroundMapShader = new EnvMapShader(gl)
        // switch (backgroundMap.getMapping()) {
        //   case 'octahedral':
        //     break
        //   case 'latlong':
        //     break
        //   case 'steriolatlong':
        //     break
        //   case 'dualfisheye':
        //     break
        //   case 'uv':
        //   default:
        //     break
        // }
        const shaderComp = this.__backgroundMapShader.compileForTarget()
        this.__backgroundMapShaderBinding = generateShaderGeomBinding(
          gl,
          shaderComp.attrs,
          gl.__quadattrbuffers,
          gl.__quadIndexBuffer
        )
      }
      // console.warn('Unsupported EnvMap:' + env)
      return
    }
    this.__glEnvMap.on('loaded', this.requestRedraw)
    this.__glEnvMap.on('updated', this.requestRedraw)

    this.emit('envMapAssigned', { envMap: this.__glEnvMap })
  }

  /**
   * The getGLEnvMap method.
   * @return {GLEnvMap|GLHDRImage|GLTexture2D} - The return value.
   */
  getGLEnvMap() {
    return this.__glEnvMap
  }

  /**
   * The getEnvMapTex method.
   * @return {EnvMap|BaseImage} - The return value.
   */
  getEnvMapTex() {
    console.warn('Deprecated Function')
    return this.__glEnvMap
  }

  /**
   * The setScene method.
   * @param {Scene} scene - The scene value.
   */
  setScene(scene) {
    const envMapParam = scene.settings.getParameter('EnvMap')
    if (envMapParam.getValue() != undefined) {
      this.__bindEnvMap(envMapParam.getValue())
    }
    envMapParam.on('valueChanged', () => {
      this.__bindEnvMap(envMapParam.getValue())
    })

    const displayEnvMapParam = scene.settings.getParameter('Display EnvMap')
    this.__displayEnvironment = displayEnvMapParam.getValue()
    displayEnvMapParam.on('valueChanged', () => {
      this.__displayEnvironment = displayEnvMapParam.getValue()
      this.requestRedraw()
    })

    super.setScene(scene)
  }

  /**
   * The addViewport method.
   * @param {string} name - The name value.
   * @return {GLViewport} - The return value.
   */
  addViewport(name) {
    const vp = super.addViewport(name)
    // vp.createOffscreenFbo();
    return vp
  }

  // //////////////////////////
  // GUI

  /**
   * Getter for exposure.
   */
  get exposure() {
    return this.__exposure
  }

  /**
   * Setter for exposure.
   * @param {number} val - The val value.
   */
  set exposure(val) {
    this.__exposure = val
    this.requestRedraw()
  }

  /**
   * Getter for gamma.
   */
  get gamma() {
    return this.__gamma
  }

  /**
   * Setter for gamma.
   * @param {number} val - The val value.
   */
  set gamma(val) {
    this.__gamma = val
    this.requestRedraw()
  }

  /**
   * Getter for displayEnvironment.
   */
  get displayEnvironment() {
    return this.__displayEnvironment
  }

  /**
   * Setter for displayEnvironment.
   * @param {number} val - The val value.
   */
  set displayEnvironment(val) {
    this.__displayEnvironment = val
    this.requestRedraw()
  }

  /**
   * Getter for planeDist.
   */
  get planeDist() {
    return this._planeDist
  }

  /**
   * Setter for planeDist.
   * @param {number} val - The val value.
   */
  set planeDist(val) {
    this._planeDist = val
    this.requestRedraw()
  }

  /**
   * Getter for cutPlaneNormal.
   */
  get cutPlaneNormal() {
    return this.__cutPlaneNormal
  }

  /**
   * Setter for cutPlaneNormal.
   * @param {number} val - The val value.
   */
  set cutPlaneNormal(val) {
    this.__cutPlaneNormal = val
    this.requestRedraw()
  }

  // //////////////////////////
  // Fbos

  /**
   * The resizeFbos method.
   * @param {number} width - The width value.
   * @param {number} height - The height value.
   */
  resizeFbos(width, height) {
    super.resizeFbos()
    if (this.__fbo) {
      this.__fbo.resize(width, height)
    }
    if (this.__highlightedGeomsBuffer) {
      this.__highlightedGeomsBuffer.resize(width, height)
    }
  }

  // //////////////////////////
  // SelectedGeomsBuffer

  /**
   * The createSelectedGeomsFbo method.
   */
  createSelectedGeomsFbo() {
    const gl = this.__gl
    this.__highlightedGeomsBuffer = new GLTexture2D(gl, {
      type: 'UNSIGNED_BYTE',
      format: 'RGBA',
      filter: 'NEAREST',
      width: this.__glcanvas.width <= 1 ? 1 : this.__glcanvas.width,
      height: this.__glcanvas.height <= 1 ? 1 : this.__glcanvas.height,
    })
    this.__highlightedGeomsBufferFbo = new GLFbo(gl, this.__highlightedGeomsBuffer, true)
    this.__highlightedGeomsBufferFbo.setClearColor([0, 0, 0, 0])
  }

  /**
   * The getFbo method.
   * @return {GLFbo} - The return value.
   */
  getFbo() {
    return this.__fbo
  }

  /**
   * The createOffscreenFbo method.
   * @param {string} format - The format value.
   */
  createOffscreenFbo(format = 'RGB') {
    const targetWidth = this.__glcanvas.width
    const targetHeight = this.__glcanvas.height

    const gl = this.__gl
    this.__fwBuffer = new GLTexture2D(gl, {
      type: 'FLOAT',
      format,
      filter: 'NEAREST',
      width: targetWidth,
      height: targetHeight,
    })
    this.__fbo = new GLFbo(gl, this.__fwBuffer, true)
    this.__fbo.setClearColor(this.__backgroundColor.asArray())
  }

  // //////////////////////////
  // Raycasting

  /**
   * The raycastWithRay method.
   * @return {object} - The return value.
   */
  raycastWithRay(ray, dist, area = 0.01, mask = ALL_PASSES) {
    const xfo = new Xfo()
    xfo.setLookAt(ray.start, ray.start.add(ray.dir))
    return this.raycast(xfo, ray, dist, area, mask)
  }

  raycastWithXfo(xfo, dist, area = 0.01, mask = ALL_PASSES) {
    const ray = new Ray(xfo.tr, xfo.ori.getZaxis().negate())
    return this.raycast(xfo, ray, dist, area, mask)
  }

  /**
   * The raycast method.
   * @return {object} - The return value.
   */
  raycast(xfo, ray, dist, area = 0.01, mask = ALL_PASSES) {
    const gl = this.__gl

    if (!this.__rayCastRenderTarget) {
      this.__rayCastRenderTarget = new GLRenderTarget(gl, {
        type: 'FLOAT',
        format: 'RGBA',
        filter: 'NEAREST',
        width: 3,
        height: 3,
        numColorChannels: 1,
      })
      this.__rayCastRenderTargetProjMatrix = new Mat4()
    }

    if (this.rayCastDist != dist || this.rayCastArea != area) {
      this.__rayCastRenderTargetProjMatrix.setOrthographicMatrix(
        area * -0.5,
        area * 0.5,
        area * -0.5,
        area * 0.5,
        0.0,
        dist
      )
      this.rayCastDist = dist
      this.rayCastArea = area
    }

    const region = [0, 0, 3, 3]
    const renderstate = {
      cameraMatrix: xfo.toMat4(),
      viewports: [
        {
          region,
          viewMatrix: xfo.inverse().toMat4(),
          projectionMatrix: this.__rayCastRenderTargetProjMatrix,
          isOrthographic: true,
        },
      ],
    }

    this.__rayCastRenderTarget.bindForWriting(renderstate, true)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    this.drawSceneGeomData(renderstate, mask)
    gl.finish()
    this.__rayCastRenderTarget.unbindForWriting()
    this.__rayCastRenderTarget.bindForReading()

    const geomDatas = new Float32Array(4 * 9)
    gl.readPixels(0, 0, 3, 3, gl.RGBA, gl.FLOAT, geomDatas)
    this.__rayCastRenderTarget.unbindForReading()

    // ////////////////////////////////////
    // We have a 3x3 grid of pixels, and we
    // scan them to find if any geom was in the
    // frustum.
    // Starting with the center pixel (4),
    // then left and right (3, 5)
    // Then top bottom (1, 7)
    const checkPixel = (id) => geomDatas[id * 4 + 3] != 0
    const dataPixels = [4, 3, 5, 1, 7]
    let geomData
    for (const pixelID of dataPixels) {
      if (checkPixel(pixelID)) {
        geomData = geomDatas.subarray(pixelID * 4, pixelID * 4 + 4)
        break
      }
    }
    if (!geomData) return

    // Mask the pass id to be only the first 6 bits of the integer.
    const passId = Math.round(geomData[0]) & (64 - 1)
    const geomItemAndDist = this.getPass(passId).getGeomItemAndDist(geomData)

    if (geomItemAndDist) {
      const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist))

      return {
        ray,
        intersectionPos,
        geomItem: geomItemAndDist.geomItem,
        dist: geomItemAndDist.dist,
        geomData,
      }
    }
  }

  /**
   * The raycastCluster method.
   * @return {any} - The return value.
   */
  raycastCluster(xfo, ray, dist, area = 0.01, mask = ALL_PASSES) {
    const gl = this.__gl

    if (!this.__rayCastRenderTarget) {
      this.__rayCastRenderTarget = new GLRenderTarget(gl, {
        type: 'FLOAT',
        format: 'RGBA',
        filter: 'NEAREST',
        width: 3,
        height: 3,
        numColorChannels: 1,
      })
      this.__rayCastRenderTargetProjMatrix = new Mat4()
    }

    if (this.rayCastDist != dist || this.rayCastArea != area) {
      this.__rayCastRenderTargetProjMatrix.setOrthographicMatrix(
        area * -0.5,
        area * 0.5,
        area * -0.5,
        area * 0.5,
        0.0,
        dist
      )
      this.rayCastDist = dist
      this.rayCastArea = area
    }

    const region = [0, 0, 3, 3]
    const renderstate = {
      cameraMatrix: xfo.toMat4(),
      viewports: [
        {
          region,
          viewMatrix: xfo.inverse().toMat4(),
          projectionMatrix: this.__rayCastRenderTargetProjMatrix,
          isOrthographic: true,
        },
      ],
    }

    this.__rayCastRenderTarget.bindForWriting(renderstate, true)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    this.drawSceneGeomData(renderstate, mask)
    gl.finish()
    this.__rayCastRenderTarget.unbindForWriting()
    this.__rayCastRenderTarget.bindForReading()

    const geomDatas = new Float32Array(4 * 9)
    gl.readPixels(0, 0, 3, 3, gl.RGBA, gl.FLOAT, geomDatas)
    this.__rayCastRenderTarget.unbindForReading()

    // ////////////////////////////////////
    // We have a 3x3 grid of pixels, and we
    // scan them to find if any geom was in the
    // frustum.
    // Note: we return every intersection, because even multiple intersections
    // on the same geometry will be at different distances.
    // This method is often used to get an average distance.
    const checkPixel = (id) => geomDatas[id * 4 + 3] != 0
    const result = []
    for (let i = 0; i < 9; i++) {
      if (checkPixel(i)) {
        const geomData = geomDatas.subarray(i * 4, i * 4 + 4)
        // Mask the pass id to be only the first 6 bits of the integer.
        const passId = Math.round(geomData[0]) & (64 - 1)
        const geomItemAndDist = this.getPass(passId).getGeomItemAndDist(geomData)

        if (geomItemAndDist) {
          const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist))
          result.push({
            ray,
            intersectionPos,
            geomItem: geomItemAndDist.geomItem,
            dist: geomItemAndDist.dist,
            geomData,
          })
        }
      }
    }
    return result
  }

  // //////////////////////////
  // Rendering

  /**
   * The drawBackground method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawBackground(renderstate) {
    if (this.__glBackgroundMap) {
      if (!this.__glBackgroundMap.isLoaded()) return
      const gl = this.__gl
      gl.depthMask(false)
      this.__backgroundMapShader.bind(renderstate)
      const unifs = renderstate.unifs
      this.__glBackgroundMap.bindToUniform(renderstate, unifs.backgroundImage)
      this.__backgroundMapShaderBinding.bind(renderstate)
      gl.drawQuad()
    } else if (this.__glEnvMap && this.__glEnvMap.draw /* Note: video env maps cannot be drawn directly.*/) {
      this.__glEnvMap.draw(renderstate)
    }
  }

  /**
   * The bindGLRenderer method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  bindGLRenderer(renderstate) {
    super.bindGLBaseRenderer(renderstate)

    renderstate.envMap = this.__glEnvMap
    renderstate.exposure = this.__exposure
    renderstate.gamma = this.__gamma
  }

  /**
   * The drawScene method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawScene(renderstate) {
    this.bindGLRenderer(renderstate)

    if (this.__displayEnvironment) this.drawBackground(renderstate)

    super.drawScene(renderstate)
    // console.log("Draw Calls:" + renderstate['drawCalls']);

    if (this.__highlightedGeomsBufferFbo) {
      const gl = this.__gl

      this.__highlightedGeomsBufferFbo.bindForWriting(renderstate)
      this.__highlightedGeomsBufferFbo.clear()

      gl.disable(gl.BLEND)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LESS)
      gl.depthMask(true)
      renderstate.glShader = null // clear any bound shaders.

      this.drawHighlightedGeoms(renderstate)

      // Unbind and restore the bound fbo
      this.__highlightedGeomsBufferFbo.unbindForWriting(renderstate)

      // Now render the outlines to the entire screen.
      gl.viewport(...renderstate.region)

      // Turn this on to debug the highlight data buffer.
      // {
      //   gl.screenQuad.bindShader(renderstate)
      //   gl.screenQuad.draw(renderstate, this.__highlightedGeomsBuffer)
      // }

      this.__outlineShader.bind(renderstate)
      gl.enable(gl.BLEND)
      gl.blendEquation(gl.FUNC_ADD)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // For add

      const unifs = renderstate.unifs
      this.__highlightedGeomsBuffer.bindToUniform(renderstate, unifs.highlightDataTexture)
      gl.uniform2f(unifs.highlightDataTextureSize.location, renderstate.region[2], renderstate.region[3])
      this.quad.bindAndDraw(renderstate)

      gl.disable(gl.BLEND)
    }

    // /////////////////////////////////////
    // // Post processing.
    // if (this.__fbo) {
    //     const gl = this.__gl;

    //     // Bind the default framebuffer
    //     gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    //     gl.viewport(...this.region);
    //     // gl.disable(gl.SCISSOR_TEST);

    //     // this.__glshaderScreenPostProcess.bind(renderstate);

    //     // const unifs = renderstate.unifs;
    //     // if ('antialiase' in unifs)
    //     //     gl.uniform1i(unifs.antialiase.location, this.__antialiase ? 1 : 0);
    //     // if ('textureSize' in unifs)
    //     //     gl.uniform2fv(unifs.textureSize.location, fbo.size);
    //     // if ('gamma' in unifs)
    //     //     gl.uniform1f(unifs.gamma.location, this.__gamma);
    //     // if ('exposure' in unifs)
    //     //     gl.uniform1f(unifs.exposure.location, this.__exposure);
    //     // if ('tonemap' in unifs)
    //     //     gl.uniform1i(unifs.tonemap.location, this.__tonemap ? 1 : 0);

    //     gl.screenQuad.bindShader(renderstate);
    //     gl.screenQuad.draw(renderstate, this.__fbo.colorTexture);

    //     // Note: if the texture is left bound, and no textures are bound to slot 0 befor rendering
    //     // more goem int he next frame then the fbo color tex is being read from and written to
    //     // at the same time. (baaaad).
    //     // Note: any textures bound at all avoids this issue, and it only comes up when we have no env
    //     // map, background or textures params in the scene. When it does happen it can be a bitch to
    //     // track down.
    //     gl.bindTexture(gl.TEXTURE_2D, null);
    // }

    this.emit('redrawOccurred', {})
  }
}

export { GLRenderer }
