/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { Mat4, Vec2, Vec3, Vec4, Xfo } from '../../Math/index'
import { DataImage, FlatSurfaceMaterial, Plane } from '../../SceneTree/index'
import { GLGeomItemFlags, GLGeomItem } from './GLGeomItem'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GLTexture2D } from '../GLTexture2D'
import { GLRenderTarget } from '../GLRenderTarget'
import { ReductionShader } from '../Shaders/ReductionShader'
import { BoundingBoxShader } from '../Shaders/BoundingBoxShader'

// import { handleMessage } from './GLGeomItemLibraryCullingWorker'
// @ts-ignore
import GLGeomItemLibraryCullingWorker from 'web-worker:./GLGeomItemLibraryCulling-worker'
import { GeomItem } from '../../SceneTree/GeomItem'
import { GLBaseRenderer, RendererOptions } from '../GLBaseRenderer'
import { Material } from '../../SceneTree/Material'
import { GeomDataRenderState, RenderState } from '../types/renderer'
import { StateChangedEvent } from '../../Utilities/Events/StateChangedEvent'

import { pixelsPerItem } from '../GLSLConstants'
import { readPixelsAsync } from './readPixelsAsync.js'
import { XRViewport } from '../VR/XRViewport'
import { XrViewportEvent } from '../../Utilities/Events/XrViewportEvent'
import { BBoxOcclusionLinesCuboid } from './BBoxOcclusionLinesCuboid'
import { GLLines } from './GLLines'
import { GLGeom } from './GLGeom'

// This enabled a visual HUD in the view to display the occlusion buffer.
// The is the only way to debug the occlusion system in VR.
// BEcause we are rendering the geomdata buffer, we must also disable material
// binding in the GLMaterialGeomItemSets.drawGeomData function
const displayOcclusionBuffer = false
/*
   drawGeomData(renderstate: GeomDataRenderState) {
-    this.glMaterial.bind(renderstate, false)
+    // this.glMaterial.bind(renderstate, false)
     for (const key in this.glGeomItemSets) {
       const glGeomItemSet = this.glGeomItemSets[key]
       glGeomItemSet.draw(renderstate)
     }
-    this.glMaterial.unbind(renderstate)
+    // this.glMaterial.unbind(renderstate)
   }
*/

/** Class for managing all the GeomItems discovered in the SceneTree.
 * @private
 */
class GLGeomItemLibrary extends EventEmitter {
  protected renderer: GLBaseRenderer
  // Note: item 0 is always null.
  // The reduction shader reads pixel values, and assumes 0 is an empty pixel.
  protected glGeomItems: Array<GLGeomItem | null> = [null]
  protected glGeomItemEventHandlers: any[] = []
  protected glGeomItemsMap: Record<number, number> = {}
  protected glGeomItemsIndexFreeList: number[] = []
  protected dirtyItemIndices: number[] = []
  protected dirtyWorkerItemIndices: Set<number> = new Set()
  protected removedItemIndices: number[]
  protected glGeomItemsTexture: GLTexture2D | null = null
  protected enableFrustumCulling: boolean

  protected xrViewport?: XRViewport
  protected xrPresenting: boolean = false
  protected xrFovY: number = 0.0
  protected xrProjectionMatrix = new Mat4()

  // Occlusion Culling
  protected enableOcclusionCulling: boolean
  protected debugOcclusionBuffer: boolean = false
  protected occlusionDataBuffer: GLRenderTarget
  protected occlusionImage: DataImage
  protected occlusionImageItem: GeomItem
  protected reductionDataBuffer: GLRenderTarget
  protected bbox: GLGeom
  protected reductionShader: ReductionShader
  protected boundingBoxShader: BoundingBoxShader
  protected inFrustumIndicesCount: number = 0
  protected drawIdsBufferDirty: boolean = false
  protected inFrustumDrawIdsBuffer: WebGLBuffer
  protected reductionDataArray: Uint8Array

  private timer_query_ext: any = null

  private worker: GLGeomItemLibraryCullingWorker

  /**
   * Create a GLGeomItemLibrary.
   * @param renderer - The renderer instance
   * @param options - The options object passed to the GLRenderer constructor.
   */
  constructor(renderer: GLBaseRenderer, options: RendererOptions) {
    super()

    this.renderer = renderer

    // Items that have transform or bounding box changes and need to be updated in the worker.
    this.dirtyWorkerItemIndices = new Set()
    this.removedItemIndices = []
    this.enableFrustumCulling = options.enableFrustumCulling || options.enableOcclusionCulling

    // Note: while it would be possible to get Occlusion Culling working in WebGL1,
    // we would need to jump through a lot of hoops.
    // - setup a vertex attribute to emulate gl_VertexID (in the Reduction shader)
    // - implement bit masking so we can extract the geomItemId from the Uint8 geom data buffer.
    // - clean up all the code to not use the building % , << & operators
    // - pass uniform values for the texture sizes.
    const gl = this.renderer.gl
    this.enableOcclusionCulling = options.enableOcclusionCulling && gl.name == 'webgl2'
    this.debugOcclusionBuffer = options.debugOcclusionBuffer ?? false

    // https://www.khronos.org/registry/webgl/extensions/EXT_disjoint_timer_query_webgl2/
    this.timer_query_ext = gl.getExtension('EXT_disjoint_timer_query_webgl2')

    if (this.enableFrustumCulling) {
      this.setupCullingWorker(renderer)
    }
  }

  /**
   * Sets up the Culling Worker to start calculating frustum culling.
   * @param renderer - The renderer instance
   */
  setupCullingWorker(renderer: GLBaseRenderer): void {
    this.worker = new GLGeomItemLibraryCullingWorker()
    // This is a mock web worker to use when testing.
    // this.worker = {
    //   postMessage: (message) => {
    //     handleMessage(message, (message) => {
    //       this.worker.onmessage({data: message })
    //     })
    //   },
    // }
    this.worker.postMessage({
      type: 'Init',
      enableOcclusionCulling: this.enableOcclusionCulling,
    })

    let workerReady = true
    this.worker.onmessage = (message: Record<string, any>) => {
      if (message.data.type == 'InFrustumIndices') {
        if (this.enableOcclusionCulling) {
          // First full the items that the frustum culling removed.
          if (message.data.newlyCulled) {
            this.applyCullResults({
              newlyCulled: message.data.newlyCulled,
            })
          }
          this.calculateOcclusionCulling(message.data.inFrustumIndices)
        } else {
          this.applyCullResults(message.data)
          workerReady = true
        }
      } else if (message.data.type == 'CullResults') {
        this.applyCullResults(message.data)
        workerReady = true
      } else if (message.data.type == 'Done') {
        // Used mostly to make our unit testing robust.
        this.renderer.emit('CullingUpdated')
      }
      workerReady = true
    }

    const viewportChanged = () => {
      const viewport = renderer.getViewport()
      const camera = renderer.getViewport().getCamera()
      const aspectRatio = viewport.getWidth() / viewport.getHeight()
      if (camera.isOrthographic()) {
        const frustumHeight = camera.getFrustumHeight()
        const frustumWidth = frustumHeight * aspectRatio
        this.worker.postMessage({
          type: 'ViewportChanged',
          frustumHeight,
          frustumWidth,
          isOrthographic: true,
          solidAngleLimit: renderer.solidAngleLimit,
        })
      } else {
        const frustumHalfAngleY = camera.getFov() * 0.5
        const frustumHalfAngleX = Math.atan(Math.tan(frustumHalfAngleY) * aspectRatio)
        this.worker.postMessage({
          type: 'ViewportChanged',
          frustumHalfAngleX,
          frustumHalfAngleY,
          isOrthographic: false,
          solidAngleLimit: renderer.solidAngleLimit,
        })
      }
    }
    renderer.on('resized', viewportChanged)
    const camera = renderer.getViewport().getCamera()
    camera.on('projectionParamChanged', (event: Record<string, any>) => {
      if (camera.isOrthographic()) {
        viewportChanged()
      }
    })
    viewportChanged()

    renderer.once('xrViewportSetup', (event: XrViewportEvent) => {
      this.xrViewport = event.xrViewport
      const xrvp = event.xrViewport
      xrvp.on('presentingChanged', (event: StateChangedEvent) => {
        this.xrPresenting = event.state
        if (event.state) {
          cullFreq = 10
          // Note: We approximate the culling viewport to be
          // a wider version of the 2 eye frustums merged together.
          // Wider, so that items are considered visible before the are in view.
          // Note each VR headset comes with its own FOV, and I can't seem to be
          // able to get it from the WebXR API, so I am putting in some guesses
          // based on this diagram: https://blog.mozvr.com/content/images/2016/02/human-visual-field.jpg
          const degToRad = Math.PI / 180
          let frustumHalfAngleY = 62 * degToRad
          let frustumHalfAngleX = 50 * degToRad

          // Note: adding the * 0.5 while debugging the occlusion culling
          // I rendered the view using this frustum and then displayed it back in the view.
          // Initially it was far too wide, so adding a * 0.5 it appears to match perfectly now.
          // This range may differ based on the HMD. Need to test this.
          switch (xrvp.getHMDName()) {
            case 'Vive':
              frustumHalfAngleY *= 0.6
              frustumHalfAngleX *= 0.6
              break
            case 'Oculus':
              frustumHalfAngleY *= 0.5
              frustumHalfAngleX *= 0.5
              break

            default:
              frustumHalfAngleY *= 0.5
              frustumHalfAngleX *= 0.5
              break
          }

          this.xrFovY = frustumHalfAngleY * 2.0
          const aspect = 62 / 50

          // @ts-ignore
          const near = xrvp.depthRange[0]
          // @ts-ignore
          const far = xrvp.depthRange[1]
          this.xrProjectionMatrix.setPerspectiveMatrix(this.xrFovY, aspect, near, far)

          this.worker.postMessage({
            type: 'ViewportChanged',
            frustumHalfAngleX,
            frustumHalfAngleY,
            isOrthographic: false,
            solidAngleLimit: renderer.solidAngleLimit,
          })
        } else {
          cullFreq = 5
          viewportChanged()
          // push the camera xfo to the worker.
          forceViewChanged()
        }
      })
    })

    let tick = 0
    let cullFreq = 5
    renderer.on('viewChanged', (event) => {
      // Calculate culling every Nth frame.
      if (workerReady) {
        if (tick % cullFreq == 0) {
          workerReady = false
          const pos = event.viewXfo.tr
          const ori = event.viewXfo.ori
          this.worker.postMessage({
            type: 'ViewChanged',
            cameraPos: pos.asArray(),
            cameraOri: ori.asArray(),
            solidAngleLimit: renderer.solidAngleLimit,
          })
        }
        tick++
      }
    })

    const forceViewChanged = () => {
      const camera = renderer.getViewport().getCamera()
      const viewXfo = camera.globalXfoParam.value
      const pos = viewXfo.tr
      const ori = viewXfo.ori
      this.worker.postMessage({
        type: 'ViewChanged',
        cameraPos: pos.asArray(),
        cameraOri: ori.asArray(),
        solidAngleLimit: renderer.solidAngleLimit,
      })
    }

    // If a movement finishes, we should update the culling results
    // based on the last position. (we might have skipped it in the viewChanged handler above)
    renderer.getViewport().getCamera().on('movementFinished', forceViewChanged)

    // Initialize the view values on the worker.
    forceViewChanged()

    {
      // ////////////////////////////////////////
      // Occlusion Culling
      if (this.enableOcclusionCulling) {
        const gl = this.renderer.gl
        let occlusionDataBufferSizeFactor = 1
        const occlusionDataBufferWidth = Math.ceil(this.renderer.getWidth() * occlusionDataBufferSizeFactor)
        const occlusionDataBufferHeight = Math.ceil(this.renderer.getHeight() * occlusionDataBufferSizeFactor)
        this.occlusionDataBuffer = new GLRenderTarget(gl, {
          type: gl.FLOAT,
          format: gl.RGBA,
          minFilter: gl.NEAREST,
          magFilter: gl.NEAREST,
          width: occlusionDataBufferWidth,
          height: occlusionDataBufferHeight,
          depthType: gl.UNSIGNED_SHORT,
          depthFormat: gl.DEPTH_COMPONENT,
          depthInternalFormat: gl.DEPTH_COMPONENT16,
        })
        // this.occlusionDataBuffer.clearColor.set(0.1, 0, 0, 1)

        this.renderer.on('resized', (event) => {
          if (!this.xrPresenting) {
            this.occlusionDataBuffer.resize(
              Math.ceil(event.width * occlusionDataBufferSizeFactor),
              Math.ceil(event.height * occlusionDataBufferSizeFactor)
            )

            if (displayOcclusionBuffer) {
              if (!this.occlusionImage) {
                const material = new FlatSurfaceMaterial('Material')
                const image = new DataImage('LDRImage')
                image.mipMapped = false
                image.format = 'RGB'
                material.baseColorParam.setImage(image)
                const xfo = new Xfo(new Vec3(0, -3, 0))
                xfo.sc.set(5, 5, 1)
                const geomItem = new GeomItem('geomItem2', new Plane(1, 1), material, xfo)
                geomItem.setSelectable(false)
                this.renderer.addTreeItem(geomItem)
                this.occlusionImage = image
                this.occlusionImageItem = geomItem
              }
              this.occlusionImage.setData(
                this.occlusionDataBuffer.width,
                this.occlusionDataBuffer.height,
                // @ts-ignore
                this.occlusionDataBuffer.textureTargets[0]
              )
            }
          }
        })

        // Do we resize the occlusion buffer to match the screen resolution of the HMD?
        // So far we are not seeing great performance in XR with culling enabled.
        // For some reason, reduction is already 10x more costly in VR with the same
        // resolution occlusion buffer.
        // renderer.once('xrViewportSetup', (event: XrViewportEvent) => {
        //   console.log('xrViewportSetup')
        //   const xrvp = event.xrViewport

        //   xrvp.on('presentingChanged', (event: StateChangedEvent) => {
        //     if (event.state) {
        //       occlusionDataBufferSizeFactor = 0.2
        //       this.occlusionDataBuffer.resize(
        //         Math.ceil(xrvp.getWidth() * occlusionDataBufferSizeFactor),
        //         Math.ceil(xrvp.getWidth() * occlusionDataBufferSizeFactor)
        //       )
        //     } else {
        //       occlusionDataBufferSizeFactor = 1
        //       this.occlusionDataBuffer.resize(
        //         Math.ceil(this.renderer.getWidth() * occlusionDataBufferSizeFactor),
        //         Math.ceil(this.renderer.getWidth() * occlusionDataBufferSizeFactor)
        //       )
        //     }
        //     this.occlusionImage.setData(
        //       this.occlusionDataBuffer.width,
        //       this.occlusionDataBuffer.height,
        //       this.occlusionDataBuffer.textureTargets[0]
        //     )
        //   })
        // })

        this.reductionDataBuffer = new GLRenderTarget(gl, {
          type: gl.UNSIGNED_BYTE,
          internalFormat: gl.R8,
          format: gl.RED,
          minFilter: gl.NEAREST,
          magFilter: gl.NEAREST,
          width: 1,
          height: 1,
          depthType: gl.UNSIGNED_SHORT,
          depthFormat: gl.DEPTH_COMPONENT,
          depthInternalFormat: gl.DEPTH_COMPONENT16,
        })

        this.bbox = new GLLines(gl, new BBoxOcclusionLinesCuboid())
        this.reductionShader = new ReductionShader(gl)
        this.boundingBoxShader = new BoundingBoxShader(gl)
        this.boundingBoxShader.compileForTarget('GLGeomItemLibrary', {
          directives: this.renderer.directives,
        })
        this.inFrustumIndicesCount = 0
      }
    }
  }

  /**
   * Handles applying the culling results received from the GLGeomItemLibraryCullingWorker
   * @param {object} data - The object containing the newlyCulled and newlyUnCulled results.
   */
  applyCullResults(data: Record<string, any>): void {
    // return
    if (data.newlyCulled) {
      data.newlyCulled.forEach((index: number) => {
        // console.log('newlyCulled:', this.glGeomItems[index].geomItem.getName())
        if (!this.glGeomItems[index]) {
          if (this.removedItemIndices.indexOf(index) == -1) {
            console.warn('Culling worker has items that are deleted.')
          }
          // oddly, the culling worker generates indices that are out of range
          // on the first cull and after that behaves itself.
          // until I can figure out why, just ignoring this issue.
          console.warn(`Culling index our of range: ${index}`)
          return
        }
        this.glGeomItems[index].setCulled(true)
      })
    }
    if (data.newlyUnCulled) {
      data.newlyUnCulled.forEach((index: number) => {
        // console.log('newlyUnCulled:', this.glGeomItems[index].geomItem.getName())
        this.glGeomItems[index].setCulled(false)
      })
    }
    this.renderer.requestRedraw()
    // Used mostly to make our unit testing robust.
    // Also to help display render stats.
    // TODO: Bundle render stats.
    // console.log(`visible: ${data.visible} / total: ${data.total}`)
    this.renderer.emit('CullingUpdated', {
      visible: data.visible,
      total: data.total,
    })
  }

  /**
   * Given the IDs of the items we know are in the frustum, setup an instanced attribute we can use
   * to render bounding boxes for these items if they do not show up in the initial GPU buffer.
   * @param {Float32Array} inFrustumIndices - The array of indices of items we know are in the frustum.
   */
  updateCulledDrawIDsBuffer(inFrustumIndices: Float32Array) {
    const gl = this.renderer.gl
    if (!gl.floatTexturesSupported) {
      this.drawIdsBufferDirty = false
      return
    }
    if (this.inFrustumDrawIdsBuffer && this.inFrustumIndicesCount != inFrustumIndices.length) {
      gl.deleteBuffer(this.inFrustumDrawIdsBuffer)
      this.inFrustumDrawIdsBuffer = null
    }
    if (!this.inFrustumDrawIdsBuffer) {
      this.inFrustumDrawIdsBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.inFrustumDrawIdsBuffer)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.inFrustumDrawIdsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, inFrustumIndices, gl.STATIC_DRAW)

    this.inFrustumIndicesCount = inFrustumIndices.length
    this.drawIdsBufferDirty = false

    // Note: we get errors trying to read data back from images less than 4x4 pixels.
    const size = Math.max(4, MathFunctions.nextPow2(Math.round(Math.sqrt(this.glGeomItems.length) + 0.5)))

    if (this.reductionDataBuffer.width != size) {
      this.reductionDataBuffer.resize(size, size)
      this.reductionDataArray = new Uint8Array(size * size)
    }
  }

  /**
   * Calculate a further refinement of the culling by using the GPU to see which items are actually visible.
   * @param inFrustumIndices - The array of indices of items we know are in the frustum.
   */
  calculateOcclusionCulling(inFrustumIndices: Float32Array) {
    if (inFrustumIndices && inFrustumIndices.length > 0) {
      this.updateCulledDrawIDsBuffer(inFrustumIndices)
    }
    if (this.inFrustumIndicesCount == 0) {
      this.worker.postMessage({
        type: 'OcclusionData',
        visibleItems: [],
      })
      return
    }

    const gl = this.renderer.gl

    const renderstate: GeomDataRenderState = <GeomDataRenderState>{ shaderopts: {} }
    renderstate.directives = [...this.renderer.directives, '#define DRAW_GEOMDATA']
    renderstate.shaderopts.directives = renderstate.directives
    renderstate.floatGeomBuffer = true
    renderstate.occlusionCulling = 1

    this.renderer.bindGLBaseRenderer(renderstate)
    if (this.xrPresenting) {
      this.xrViewport.initCullingRenderState(renderstate)
      renderstate.viewports[0].fovY = this.xrFovY
      renderstate.viewports[0].projectionMatrix = this.xrProjectionMatrix
    } else {
      this.renderer.getViewport().initRenderState(renderstate)
    }

    // this.renderer.drawSceneGeomData(renderstate)
    const drawSceneGeomData = (renderstate: GeomDataRenderState) => {
      this.occlusionDataBuffer.bindForWriting(renderstate, true)

      gl.disable(gl.BLEND)
      gl.disable(gl.CULL_FACE)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LESS)
      gl.depthMask(true)

      // For now, just rendering the main opaque geoms.
      const opaqueGeomsPass = this.renderer.getPass(0)
      opaqueGeomsPass.drawGeomData(renderstate)
      const linesPass = this.renderer.getPass(1)
      linesPass.drawGeomData(renderstate)
      // for (const key in this.__passes) {
      //   // Skip pass categories that do not match
      //   // the mask. E.g. we may not want to hit
      //   // "Overlay" geoms such as labels,
      //   // or we might be trying to move labels and don't
      //   // want to grab normal geoms.
      //   if ((Number.parseInt(key) & mask) == 0) continue
      //   const passSet = this.__passes[key]
      //   for (const pass of passSet) {
      //     if (pass.enabled) pass.drawGeomData(renderstate)
      //   }
      // }
      this.occlusionDataBuffer.unbindForWriting(renderstate)
    }

    // Draw one point for each pixel in the occlusion buffer.
    // This point will color a single pixel in the reduction buffer.
    const numReductionPoints = this.occlusionDataBuffer.width * this.occlusionDataBuffer.height

    const ext = this.timer_query_ext

    // Now perform a reduction to calculate the indices of visible items.
    const reduce = (renderstate: GeomDataRenderState, clear: boolean, query: WebGLQuery) => {
      this.reductionDataBuffer.bindForWriting(renderstate, clear)

      // The second time we reduce into the reductionDataBuffer, we want to
      // keep the values that were already there. The first reduction counted
      // the items visible after the scene was drawn. The second one adds items
      // visible due to the bounding boxes being visible.
      if (!clear) {
        gl.enable(gl.BLEND)
        gl.blendEquation(gl.FUNC_ADD)
        gl.blendFunc(gl.SRC_COLOR, gl.DST_COLOR)
      }

      this.reductionShader.bind(renderstate)

      const { geomDataTexture, reductionTextureWidth } = renderstate.unifs
      if (geomDataTexture) this.occlusionDataBuffer.bindToUniform(renderstate, geomDataTexture)
      if (reductionTextureWidth) gl.uniform1i(reductionTextureWidth.location, this.reductionDataBuffer.width)

      if (ext) gl.beginQuery(ext.TIME_ELAPSED_EXT, query)

      gl.drawArrays(gl.POINTS, 0, numReductionPoints)

      if (ext) gl.endQuery(ext.TIME_ELAPSED_EXT)

      if (!clear) {
        gl.disable(gl.BLEND)
      }
      this.reductionDataBuffer.unbindForWriting(renderstate)
    }

    const drawCulledBBoxes = () => {
      this.occlusionDataBuffer.bindForWriting(renderstate, false)

      // Now clear the color buffer, but not the depth buffer
      // and draw the bounding boxes of occluded items.
      // This means the second reduction only count fragments
      // rasterized by the bounding boxes, and not the initial
      // scene geometry.(which was counted in the first reduce)
      // Note: disable this code to see the full occlusion buffer in debugging.
      if (!this.debugOcclusionBuffer) {
        gl.colorMask(true, true, true, true)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT) // do _not_ clear depth.
      }

      this.boundingBoxShader.bind(renderstate, 'GLGeomItemLibrary')
      this.bbox.bind(renderstate)
      gl.disable(gl.CULL_FACE)

      // Read each Matrix and Bbox settings from the Texture.
      const { instancesTexture, instancesTextureSize, instancedDraw, reductionDataTexture, occlusionCulling } =
        renderstate.unifs
      this.glGeomItemsTexture.bindToUniform(renderstate, instancesTexture)
      gl.uniform1i(instancesTextureSize.location, this.glGeomItemsTexture.width)
      gl.uniform1i(instancedDraw.location, 1)
      gl.uniform1i(occlusionCulling.location, 1)

      this.reductionDataBuffer.bindColorTexture(renderstate, reductionDataTexture)

      // The instanced transform ids are bound as an instanced attribute.
      const location = renderstate.attrs.instancedIds.location
      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.inFrustumDrawIdsBuffer)
      gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1 * 4, 0)
      gl.vertexAttribDivisor(location, 1) // This makes it instanced

      // Now draw all the bounding boxes to make sure we catch anything.
      // Note: If the geometry is listed visibility buffer, we skip it.
      // Do this draws only the bounding boxes for non-visible geometries.
      renderstate.bindViewports(renderstate.unifs, () => {
        this.bbox.drawInstanced(renderstate, this.inFrustumIndicesCount)
      })

      this.occlusionDataBuffer.unbindForWriting(renderstate)
    }

    let queryDrawScene: WebGLQuery
    let queryReduceSceneGeoms: WebGLQuery
    let queryDrawCulledBBoxes: WebGLQuery
    let queryReduceBBoxes: WebGLQuery
    if (ext) {
      queryDrawScene = gl.createQuery()
      gl.beginQuery(ext.TIME_ELAPSED_EXT, queryDrawScene)
    }
    drawSceneGeomData(renderstate)
    if (ext) gl.endQuery(ext.TIME_ELAPSED_EXT)

    // We render the scene geometry, reduce, then render
    // the boxes, reduce again. The bounding boxes displayed
    // are based on the results of the first reduce.

    if (ext) queryReduceSceneGeoms = gl.createQuery()
    reduce(renderstate, true, queryReduceSceneGeoms)

    if (ext) {
      queryDrawCulledBBoxes = gl.createQuery()
      gl.beginQuery(ext.TIME_ELAPSED_EXT, queryDrawCulledBBoxes)
    }

    //
    drawCulledBBoxes()

    if (ext) gl.endQuery(ext.TIME_ELAPSED_EXT)

    if (ext) queryReduceBBoxes = gl.createQuery()
    reduce(renderstate, false, queryReduceBBoxes)

    const queryResults = {
      numReductionPoints,
    }
    const checkQuery = (name: string, query: WebGLQuery) => {
      const available = gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE)
      const disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT)

      if (available && !disjoint) {
        // See how much time the rendering of the object took in nanoseconds.
        const timeElapsed = gl.getQueryParameter(query, gl.QUERY_RESULT)
        queryResults[name] = timeElapsed / 1000000

        // Clean up the query object.
        gl.deleteQuery(query)
      }
    }

    // //////////////////////////////////////////
    // Pull down the reduction values from the GPU for processing.

    const w = this.reductionDataBuffer.width
    const h = this.reductionDataBuffer.height
    const format = gl.RED
    const type = gl.UNSIGNED_BYTE
    this.reductionDataBuffer.bindForReading()
    readPixelsAsync(gl, 0, 0, w, h, format, type, this.reductionDataArray).then(() => {
      this.reductionDataBuffer.unbindForReading()

      if (ext) {
        checkQuery('queryDrawScene', queryDrawScene)
        checkQuery('queryDrawCulledBBoxes', queryDrawCulledBBoxes)
        checkQuery('queryReduceSceneGeoms', queryReduceSceneGeoms)
        checkQuery('queryReduceBBoxes', queryReduceBBoxes)
        this.renderer.emit('occlusionCullingProfilingData', queryResults)
      }

      // console.log(this.reductionDataArray)
      // Now send the buffer to the worker, where it will determine what culling
      // needs to be applied on top of the frustum culling.
      this.worker.postMessage({
        type: 'OcclusionData',
        visibleItems: this.reductionDataArray,
      })
    })
  }

  /**
   * The addGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The index of GLGeomItem
   */
  addGeomItem(geomItem: GeomItem) {
    let index = this.glGeomItemsMap[geomItem.getId()] //  number | undefined
    if (index != undefined) {
      // Increment the ref count for the GLGeom
      return this.glGeomItems[index]
    }

    // ///////////////////////////////////////////
    // Material
    const materialParam = geomItem.materialParam
    let material = materialParam.value!

    // Add the material here so that when we populate the GeomItem texture.
    // the material already has an Id.
    let matIndex: number = -1
    {
      matIndex = this.renderer.glMaterialLibrary.addMaterial(material)
    }
    const materialChanged = () => {
      // Ref count the materials in the material library.
      this.renderer.glMaterialLibrary.removeMaterial(material)
      material.off('transparencyChanged', geomItemChanged)
      material = materialParam.value!
      glGeomItem.materialId = this.renderer.glMaterialLibrary.addMaterial(material)
      material.on('transparencyChanged', geomItemChanged)

      workerItemDataChanged()
      geomItemChanged()
    }
    materialParam.on('valueChanged', materialChanged)

    // ///////////////////////////////////////////
    // Geometry
    const geomParam = geomItem.geomParam
    let geom = geomParam.value!
    const geomIndex = this.renderer.glGeomLibrary.addGeom(geom)

    const geomChanged = () => {
      this.renderer.glGeomLibrary.removeGeom(geom)
      geom = geomParam.value!
      glGeomItem.geomId = this.renderer.glGeomLibrary.addGeom(geom)

      if (this.enableFrustumCulling) this.dirtyWorkerItemIndices.add(index)

      geomItemChanged()
    }
    geomParam.on('valueChanged', geomChanged)

    // ///////////////////////////////////////////
    // GeomItem
    // Use recycled indices if there are any available...
    if (this.glGeomItemsIndexFreeList.length > 0) {
      index = this.glGeomItemsIndexFreeList.pop()!
    } else {
      index = this.glGeomItems.length
      this.glGeomItems.push(null)
    }
    // If an item is removed and re-added immediately, we avoid removing the item from the culling worker.
    if (this.removedItemIndices.includes(index)) {
      this.removedItemIndices.splice(this.removedItemIndices.indexOf(index), 1)
    }

    this.dirtyItemIndices.push(index)

    const gl = this.renderer.gl
    const supportInstancing = gl.floatTexturesSupported
    const glGeomItem = new GLGeomItem(gl, geomItem, index, geomIndex, matIndex, supportInstancing)

    const geomItemChanged = () => {
      if (this.dirtyItemIndices.includes(index)) return
      this.dirtyItemIndices.push(index)
      this.renderer.drawItemChanged()
    }
    geomItem.geomMatParam.on('valueChanged', geomItemChanged)
    geomItem.on('cutAwayChanged', geomItemChanged)
    geomItem.on('highlightChanged', geomItemChanged)
    geomItem.on('selectabilityChanged', geomItemChanged)
    material.on('transparencyChanged', geomItemChanged)

    const workerItemDataChanged = () => {
      if (this.enableFrustumCulling) {
        if (!this.dirtyWorkerItemIndices.has(index)) {
          this.dirtyWorkerItemIndices.add(index)
          this.renderer.drawItemChanged()
        }
      }
    }
    if (this.enableFrustumCulling) {
      this.dirtyWorkerItemIndices.add(index)
    }

    geomItem.on('visibilityChanged', workerItemDataChanged)
    geomItem.geomMatParam.on('valueChanged', workerItemDataChanged)
    geomParam.on('boundingBoxChanged', workerItemDataChanged)

    this.glGeomItems[index] = glGeomItem
    this.glGeomItemEventHandlers[index] = {
      geomItemChanged,
      materialChanged,
      geomChanged,
      workerItemDataChanged,
    }
    this.glGeomItemsMap[geomItem.getId()] = index

    // Note: before the renderer is disabled, this is a  no-op.
    this.renderer.requestRedraw()

    return glGeomItem
  }

  /**
   * The removeGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The return value.
   */
  removeGeomItem(geomItem: GeomItem): GLGeomItem {
    const index = this.glGeomItemsMap[geomItem.getId()]

    // This GeomItem may not yet have been added to the Renderer.
    // This may be because it is part of an asset that is still loading
    // and has not yet received its geometry.
    if (index == undefined) return null

    const glGeomItem = this.glGeomItems[index]

    const geom = geomItem.geomParam.value!
    this.renderer.glGeomLibrary.removeGeom(geom)

    const material = geomItem.materialParam.value!
    this.renderer.glMaterialLibrary.removeMaterial(material)

    const handlers = this.glGeomItemEventHandlers[index]
    const geomParam = geomItem.geomParam
    const materialParam = geomItem.materialParam

    materialParam.off('valueChanged', handlers.materialChanged)
    geomParam.off('valueChanged', handlers.geomChanged)

    geomItem.geomMatParam.off('valueChanged', handlers.geomItemChanged)
    geomItem.off('cutAwayChanged', handlers.geomItemChanged)
    geomItem.off('highlightChanged', handlers.geomItemChanged)
    geomItem.off('selectabilityChanged', handlers.geomItemChanged)
    material.off('transparencyChanged', handlers.geomItemChanged)

    geomItem.off('visibilityChanged', handlers.workerItemDataChanged)
    geomItem.geomMatParam.on('valueChanged', handlers.workerItemDataChanged)
    geomParam.off('boundingBoxChanged', handlers.workerItemDataChanged)

    this.glGeomItems[index] = null
    this.glGeomItemEventHandlers[index] = null
    this.glGeomItemsIndexFreeList.push(index)
    delete this.glGeomItemsMap[geomItem.getId()]

    this.removedItemIndices.push(index)

    this.renderer.requestRedraw()

    return glGeomItem
  }

  /**
   * The getGeomItem method.
   * @param index - The index value.
   * @return - The GLGeomItem that wraps the provided GeomItem
   */
  getGeomItem(index: number): GeomItem | undefined {
    if (index >= this.glGeomItems.length) {
      console.warn('Invalid Draw Item id:' + index + ' NumItems:' + (this.glGeomItems.length - 1))
      return undefined
    }
    return this.glGeomItems[index]?.geomItem
  }

  /**
   * The getGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The GLGeomItem that wraps the provided GeomItem
   */
  getGLGeomItem(geomItem: GeomItem): GLGeomItem | null {
    const index = this.glGeomItemsMap[geomItem.getId()]
    if (index != undefined) {
      // Increment the ref count for the GLGeom
      return this.glGeomItems[index]
    }
    return null
  }

  // ////////////////////////////////////////////////
  // Data Uploading

  /**
   * The populateDrawItemDataArray method.
   * @param index - The index of the item in the library.
   * @param subIndex - The index of the item within the block being uploaded.
   * @param dataArray - The dataArray value.
   * @private
   */
  populateDrawItemDataArray(index: number, subIndex: number, dataArray: Float32Array): void {
    const glGeomItem = this.glGeomItems[index]
    // When an item is deleted, we allocate its index to the free list
    // and null this item in the array. skip over null items.
    if (!glGeomItem) return
    const { geomItem, geomId } = glGeomItem
    const material = geomItem.materialParam.value!

    const stride = pixelsPerItem * 4 // The number of floats per draw item.
    const offset = subIndex * stride

    // /////////////////////////
    // Geom Item Params
    let flags = 0
    if (geomItem.isCutawayEnabled()) {
      flags |= GLGeomItemFlags.GEOMITEM_FLAG_CUTAWAY
    }
    if (!geomItem.isSelectable()) {
      flags |= GLGeomItemFlags.GEOMITEM_INVISIBLE_IN_GEOMDATA
    }
    if (material.isTransparent()) {
      flags |= GLGeomItemFlags.GEOMITEM_TRANSPARENT
    }

    const pix0 = new Vec4(new Float32Array(dataArray.buffer, (offset + 0) * 4, 4))
    pix0.set(flags, 0, 0, 0)

    const allocation = this.renderer.glMaterialLibrary.getMaterialAllocation(material)
    if (allocation) {
      pix0.z = allocation.start
    }

    // Store the geomId for debugging purposes.
    // see: DEBUG_GEOM_ID
    pix0.w = geomId

    // /////////////////////////
    // Geom Matrix
    const mat4 = geomItem.geomMatParam.value
    const pix1 = new Vec4(new Float32Array(dataArray.buffer, (offset + 1 * 4) * 4, 4))
    const pix2 = new Vec4(new Float32Array(dataArray.buffer, (offset + 2 * 4) * 4, 4))
    const pix3 = new Vec4(new Float32Array(dataArray.buffer, (offset + 3 * 4) * 4, 4))
    pix1.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x)
    pix2.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y)
    pix3.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z)

    // /////////////////////////
    // Highlight
    const pix4 = new Vec4(new Float32Array(dataArray.buffer, (offset + 4 * 4) * 4, 4))
    if (geomItem.isHighlighted()) {
      const highlight = geomItem.getHighlight()
      pix4.set(highlight.r, highlight.g, highlight.b, highlight.a)
    }

    // /////////////////////////
    // Cutaway
    const pix5 = new Vec4(new Float32Array(dataArray.buffer, (offset + 5 * 4) * 4, 4))
    if (geomItem.isCutawayEnabled()) {
      const cutAwayVector = geomItem.getCutVector()
      const cutAwayDist = geomItem.getCutDist()
      // console.log(geomItem.getName(), geomItem.isCutawayEnabled(), flags, pix0.toString())
      pix5.set(cutAwayVector.x, cutAwayVector.y, cutAwayVector.z, cutAwayDist)
    }

    // /////////////////////////
    // Bounding Box
    const bbox = geomItem.boundingBoxParam.value
    const pix6 = new Vec4(new Float32Array(dataArray.buffer, (offset + 6 * 4) * 4))
    const pix7 = new Vec4(new Float32Array(dataArray.buffer, (offset + 7 * 4) * 4))
    pix6.set(bbox.p0.x, bbox.p0.y, bbox.p0.z, 0.0)
    pix7.set(bbox.p1.x, bbox.p1.y, bbox.p1.z, 0.0)
  }

  /**
   * Gathers data to pass to the culling worker.
   * @param geomItem - The GeomItem to gether the data for.
   * @param material - The material of GeomItem.
   * @param index - The index of the item to gether the data for.
   * @return - the JSON data that will be passed to the worker.
   */
  getCullingWorkerData(geomItem: GeomItem, material: Material, index: number): Record<string, any> {
    const bbox = geomItem.boundingBoxParam.value
    const boundingRadius = bbox.size() * 0.5
    const pos = bbox.center()

    // Some items can't be culled, if they calculate the size in the GPU.
    // Handles with a fixed size on screen, or points with a fixed size on
    // screen simply cannot be culled, as they
    let cullable = geomItem.cullable != false
    const fixedSizeParam = material.getParameter('MaintainScreenSize')
    if (fixedSizeParam && fixedSizeParam.value) {
      cullable = false
    }
    if (material.getShaderName().startsWith('ScreenSpace')) {
      cullable = false
    }
    if (material.hasParameter('PointSize')) {
      cullable = false
    }
    // Occlusion culling uses the geomdata rendering
    // TODO: this could eventually be improved ir the number of 'nonSelectable' objects
    // in a scene is high, this could become a perf loss.
    // *  When rendering the occlusion buffer, we could ignore this 'isSelectable' property
    //    and render geomdata for non-selectable items.
    if (this.enableOcclusionCulling && !geomItem.isSelectable()) {
      cullable = false
    }

    const isTransparent = geomItem.materialParam.value.isTransparent()

    return {
      id: index,
      boundingRadius,
      pos: pos.asArray(),
      cullable,
      visible: geomItem.isVisible(),
      isTransparent,
    }
  }

  /**
   * Any items that need to be updated on the worker are now pushed.
   */
  uploadGeomItemsToWorker(): void {
    if (this.enableFrustumCulling) {
      const geomItemsUpdateToCullingWorker: any[] = []
      this.dirtyWorkerItemIndices.forEach((index) => {
        const glGeomItem = this.glGeomItems[index]
        // When an item is deleted, we allocate its index to the free list
        // and null this item in the array. skip over null items.
        if (!glGeomItem) return
        const { geomItem } = glGeomItem
        const material = geomItem.materialParam.value!
        geomItemsUpdateToCullingWorker.push(this.getCullingWorkerData(geomItem, material, index))
      })

      // /////////////////////////
      // Update the culling worker
      this.worker.postMessage({
        type: 'UpdateGeomItems',
        geomItems: geomItemsUpdateToCullingWorker,
        removedItemIndices: this.removedItemIndices,
      })

      this.dirtyWorkerItemIndices.clear()
      this.removedItemIndices = []
    }
  }

  /**
   * The uploadGeomItems method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  uploadGeomItems(renderstate: RenderState): void {
    const gl = this.renderer.gl
    if (!gl.floatTexturesSupported) {
      return
    }

    let size = Math.round(Math.sqrt(this.glGeomItems.length * pixelsPerItem) + 0.5)
    // Only support power 2 textures. Else we get strange corruption on some GPUs
    // in some scenes.
    size = MathFunctions.nextPow2(size)
    // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
    // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
    if (size % pixelsPerItem != 0) size += pixelsPerItem - (size % pixelsPerItem)

    if (!this.glGeomItemsTexture) {
      this.glGeomItemsTexture = new GLTexture2D(gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: size,
        height: size,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
      this.glGeomItemsTexture.clear()
    } else if (this.glGeomItemsTexture.width != size) {
      this.glGeomItemsTexture.resize(size, size)
      this.dirtyItemIndices = Array((size * size) / pixelsPerItem)
        .fill(0) // TODO: check, is 0 ok as an argument here?
        .map((v, i) => i)
    }

    gl.bindTexture(gl.TEXTURE_2D, this.glGeomItemsTexture.glTex)
    const typeId = this.glGeomItemsTexture.getType()

    for (let i = 0; i < this.dirtyItemIndices.length; i++) {
      const indexStart = this.dirtyItemIndices[i]
      const yoffset = Math.floor((indexStart * pixelsPerItem) / size)
      let indexEnd = indexStart + 1
      for (let j = i + 1; j < this.dirtyItemIndices.length; j++) {
        const index = this.dirtyItemIndices[j]
        if (Math.floor((index * pixelsPerItem) / size) != yoffset) {
          break
        }
        if (index != indexEnd) {
          break
        }
        indexEnd++
      }

      // TODO: for contiguous blocks, we create larger arrays and populate
      // and upload them in one step.
      const uploadCount = indexEnd - indexStart
      const xoffset = (indexStart * pixelsPerItem) % size
      const width = pixelsPerItem * uploadCount
      const height = 1
      const dataArray = new Float32Array(pixelsPerItem * 4 * uploadCount) // 4==RGBA pixels.

      for (let j = indexStart; j < indexEnd; j++) {
        this.populateDrawItemDataArray(j, j - indexStart, dataArray)
      }

      if (typeId == gl.FLOAT) {
        this.glGeomItemsTexture.populate(dataArray, width, height, xoffset, yoffset, false)
      } else {
        const unit16s = MathFunctions.convertFloat32ArrayToUInt16Array(dataArray)
        this.glGeomItemsTexture.populate(unit16s, width, height, xoffset, yoffset, false)
      }

      i += uploadCount - 1
    }

    this.removedItemIndices = []
    this.dirtyItemIndices = []
  }

  /**
   * Updates the GPU state if any update is needed.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate: RenderState): void {
    if (this.dirtyWorkerItemIndices.size > 0 || this.removedItemIndices.length > 0) {
      this.uploadGeomItemsToWorker()
    }
    if (this.dirtyItemIndices.length > 0) {
      this.uploadGeomItems(renderstate)
    }

    const gl = this.renderer.gl
    const { instancesTexture, instancesTextureSize } = renderstate.unifs
    if (instancesTexture) {
      this.glGeomItemsTexture!.bindToUniform(renderstate, instancesTexture)
      gl.uniform1i(instancesTextureSize.location, this.glGeomItemsTexture!.width)
    }
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {}
}

export { GLGeomItemLibrary }
