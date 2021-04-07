/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { Vec4 } from '../../Math/index'
import { Cuboid } from '../../SceneTree/index'
import { GLGeomItem } from './GLGeomItem.js'
import { GLMesh } from './GLMesh.js'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GLTexture2D } from '../GLTexture2D.js'
import { GLRenderTarget } from '../GLRenderTarget.js'
import { ReductionShader } from '../Shaders/ReductionShader.js'
import { pixelsPerGLGeomItem } from '../GLSLConstants.js'
import { BoundingBoxShader } from '../Shaders/BoundingBoxShader.js'

// import { handleMessage } from './GLGeomItemLibraryCullingWorker.js'
import GLGeomItemLibraryCullingWorker from 'web-worker:./GLGeomItemLibraryCullingWorker.js'

/** Class for managing all the GeomItems discovered in the SceneTree.
 * @private
 */
class GLGeomItemLibrary extends EventEmitter {
  /**
   * Create a GLGeomItemLibrary.
   * @param {GLBaseRenderer} renderer - The renderer object
   */
  constructor(renderer) {
    super()

    this.renderer = renderer
    // Note: Index 0 is left unused so we can easily recognize uninitialized indices.
    this.glGeomItems = [undefined]
    this.glGeomItemEventHandlers = [undefined]
    this.glGeomItemsMap = {}
    this.glGeomItemsIndexFreeList = []
    this.dirtyItemIndices = []

    // this.worker = {
    //   postMessage: (message) => {},
    // }

    this.worker = new GLGeomItemLibraryCullingWorker()
    // this.worker = {
    //   postMessage: (message) => {
    //     handleMessage(message, (message) => {
    //       this.worker.onmessage({data: message })
    //     })
    //   },
    // }

    let workerReady = true
    this.worker.onmessage = (message) => {
      if (message.data.type == 'FrustumCullResults') {
        // this.applyCullResults(message.data)
        this.calculateOcclusionCulling(message.data.inFrustumIndices)
      }
      if (message.data.type == 'OcclusionCullResults') {
        this.applyCullResults(message.data, false)
      } else {
        // No Frustum Culling results. Now we check for occlusion culling.
        // this.calculateOcclusionCulling()
        // Used mostly to make our unit testing robust.
        // Also to help display render stats.
        // TODO: Bundle render stats.
        // this.renderer.emit('CullingUpdated')
      }
      workerReady = true
    }

    const viewportChanged = () => {
      const aspectRatio = renderer.getWidth() / renderer.getHeight()
      const frustumHalfAngleY = renderer.getViewport().getCamera().getFov() * 0.5
      const frustumHalfAngleX = Math.atan(Math.tan(frustumHalfAngleY) * aspectRatio)
      this.worker.postMessage({
        type: 'ViewportChanged',
        frustumHalfAngleX,
        frustumHalfAngleY,
      })
    }
    renderer.on('resized', viewportChanged)
    viewportChanged()

    renderer.once('xrViewportSetup', (event) => {
      const xrvp = event.xrViewport
      xrvp.on('presentingChanged', (event) => {
        if (event.state) {
          // Note: We approximate the culling viewport to be
          // a wider version of the 2 eye frustums merged together.
          // Wider, so that items are considered visible before the are in view.
          // Note each VR headset comes with its own FOV, and I can't seem to be
          // able to get it from the WebXR API, so I am putting in some guesses
          // based on this diagram: https://blog.mozvr.com/content/images/2016/02/human-visual-field.jpg
          const degToRad = Math.PI / 180
          const frustumHalfAngleY = 62 * degToRad
          const frustumHalfAngleX = 50 * degToRad
          this.worker.postMessage({
            type: 'ViewportChanged',
            frustumHalfAngleX,
            frustumHalfAngleY,
          })
        }
      })
    })

    let tick = 0
    renderer.on('viewChanged', (event) => {
      // Calculate culling every Nth frame.
      if (workerReady) {
        if (tick % 5 == 0) {
          workerReady = false
          const pos = event.viewXfo.tr
          const ori = event.viewXfo.ori
          this.worker.postMessage({
            type: 'ViewChanged',
            viewPos: pos.asArray(),
            viewOri: ori.asArray(),
          })
        }
        tick++
      }
    })

    const forceViewChanged = () => {
      const camera = renderer.getViewport().getCamera()
      const viewXfo = camera.getParameter('GlobalXfo').getValue()
      const pos = viewXfo.tr
      const ori = viewXfo.ori
      this.worker.postMessage({
        type: 'ViewChanged',
        viewPos: pos.asArray(),
        viewOri: ori.asArray(),
      })
      tick = 0
    }

    // If a movement finishes, we should update the culling results
    // based on the last position. (we might have skipped it in the viewChanged handler above)
    renderer.getViewport().getCamera().on('movementFinished', forceViewChanged)

    // Initialize the view values on the worker.
    forceViewChanged()

    // ////////////////////////////////////////
    // Occlusion Culling
    if (true) {
      const gl = this.renderer.gl
      this.floatOcclusionBuffer = gl.floatTexturesSupported
      const occlusionDataBufferWidth = 8 // Math.ceil(renderer.getWidth() * 0.25)
      const occlusionDataBufferHeight = 8 // Math.ceil(renderer.getHeight() * 0.25)
      if (this.floatOcclusionBuffer) {
        this.occlusionDataBuffer = new GLRenderTarget(gl, {
          type: gl.FLOAT,
          format: gl.RGBA,
          minFilter: gl.NEAREST,
          magFilter: gl.NEAREST,
          width: occlusionDataBufferWidth,
          height: occlusionDataBufferHeight,
          depthType: gl.FLOAT,
          depthFormat: gl.DEPTH_COMPONENT,
          depthInternalFormat: gl.DEPTH_COMPONENT32F,
        })
      } else {
        this.occlusionDataBuffer = new GLRenderTarget(gl, {
          type: gl.UNSIGNED_BYTE,
          format: gl.RGBA,
          minFilter: gl.NEAREST,
          magFilter: gl.NEAREST,
          width: occlusionDataBufferWidth,
          height: occlusionDataBufferHeight,
          depthType: gl.UNSIGNED_SHORT,
          depthFormat: gl.DEPTH_COMPONENT,
          depthInternalFormat: gl.DEPTH_COMPONENT16,
        })
      }
      this.renderer.on('resized', (event) => {
        this.occlusionDataBuffer.resize(Math.ceil(event.width * 0.25), Math.ceil(event.height * 0.25))
      })
      this.reductionDataBuffer = new GLRenderTarget(gl, {
        type: gl.UNSIGNED_BYTE,
        internalFormat: gl.R8,
        format: gl.name == 'webgl2' ? gl.RED : gl.RGBA,
        minFilter: gl.NEAREST,
        magFilter: gl.NEAREST,
        width: 4,
        height: 4,
        depthType: gl.UNSIGNED_SHORT,
        depthFormat: gl.DEPTH_COMPONENT,
        depthInternalFormat: gl.DEPTH_COMPONENT16,
      })

      this.bbox = new GLMesh(gl, new Cuboid(1, 1, 1, false, false, false))
      this.reductionShader = new ReductionShader(gl)
      this.boundingBoxShader = new BoundingBoxShader(gl)
      this.boundingBoxShader.compileForTarget('GLGeomItemLibrary')
      this.inFrustumIndicesCount = 0
    }
  }

  /**
   * The addGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {number} - The index of GLGeomItem
   */
  addGeomItem(geomItem) {
    let index = this.glGeomItemsMap[geomItem.getId()]
    if (index != undefined) {
      // Increment the ref count for the GLGeom
      return this.glGeomItems[index]
    }

    const material = geomItem.getParameter('Material').getValue()

    // Add the material here so that when we populate the GeomItem texture.
    // the material already has an Id.
    let matIndex = -1
    if (material.getShaderClass().getPackedMaterialData) {
      matIndex = this.renderer.glMaterialLibrary.addMaterial(material)
    }

    const geom = geomItem.getParameter('Geometry').getValue()
    const geomIndex = this.renderer.glGeomLibrary.addGeom(geom)

    // Use recycled indices if there are any available...
    if (this.glGeomItemsIndexFreeList.length > 0) {
      index = this.glGeomItemsIndexFreeList.pop()
    } else {
      index = this.glGeomItems.length
      this.glGeomItems.push(null)
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
    geomItem.getParameter('Material').on('valueChanged', geomItemChanged)
    geomItem.getParameter('GeomMat').on('valueChanged', geomItemChanged)
    geomItem.on('cutAwayChanged', geomItemChanged)
    geomItem.on('highlightChanged', geomItemChanged)

    this.glGeomItems[index] = glGeomItem
    this.glGeomItemEventHandlers[index] = geomItemChanged
    this.glGeomItemsMap[geomItem.getId()] = index

    // Note: before the renderer is disabled, this is a  no-op.
    this.renderer.requestRedraw()

    return glGeomItem
  }

  /**
   * Handles applying the culling results received from the GLGeomItemLibraryCullingWorker
   * @param {object} data - The object containing the newlyCulled and newlyUnCulled results.
   */
  applyCullResults(data, triggerOcclusionCulling = true) {
    data.newlyCulled.forEach((index) => {
      this.glGeomItems[index].setCulled(true)
    })
    data.newlyUnCulled.forEach((index) => {
      this.glGeomItems[index].setCulled(false)
    })
    this.renderer.requestRedraw()

    // if (triggerOcclusionCulling) {
    //   this.calculateOcclusionCulling()
    // }

    // Used mostly to make our unit testing robust.
    // Also to help display render stats.
    // TODO: Bundle render stats.
    this.renderer.emit('CullingUpdated')
  }

  /**
   * The updateDrawIDsBuffer method.
   * The culling system will specify a subset of the total number of items for
   * drawing.
   */
  updateCulledDrawIDsBuffer(inFrustumIndices) {
    const gl = this.renderer.gl
    if (!gl.floatTexturesSupported) {
      this.drawIdsBufferDirty = false
      return
    }
    if (this.culledDrawIdsBuffer && this.inFrustumIndicesCount != inFrustumIndices.length) {
      gl.deleteBuffer(this.culledDrawIdsBuffer)
      this.culledDrawIdsBuffer = null
    }
    if (!this.culledDrawIdsBuffer) {
      this.culledDrawIdsBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.culledDrawIdsBuffer)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.culledDrawIdsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, inFrustumIndices, gl.STATIC_DRAW)

    this.inFrustumIndicesCount = inFrustumIndices.length
    this.drawIdsBufferDirty = false
  }

  /**
   * Handles calculating the GPU occlusion of the current frame by rendering a special GeomData buffer.
   */
  calculateOcclusionCulling(inFrustumIndices) {
    if (inFrustumIndices && inFrustumIndices.length > 0) {
      this.updateCulledDrawIDsBuffer(inFrustumIndices)
    }
    if (this.inFrustumIndicesCount == 0) {
      return
    }

    const gl = this.renderer.gl

    gl.disable(gl.BLEND)
    gl.disable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LESS)
    gl.depthMask(true)

    const renderstate = {}
    // renderstate.directives = [...this.renderer.directives, '#define DRAW_GEOMDATA']
    // renderstate.shaderopts.directives = renderstate.directives
    this.renderer.bindGLBaseRenderer(renderstate)

    this.occlusionDataBuffer.bindForWriting(renderstate, true)
    this.renderer.getViewport().initRenderState(renderstate)
    // this.renderer.drawSceneGeomData(renderstate)
    const drawSceneGeomData = (renderstate) => {
      const opaqueGeomsPass = this.renderer.getPass(0)
      opaqueGeomsPass.drawGeomData(renderstate)
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
    }
    drawSceneGeomData(renderstate)

    // Now perform a reduction to calculate the indices of visible items.
    const reduce = (renderstate) => {
      this.reductionDataBuffer.bindForWriting(renderstate, true)

      this.reductionShader.bind(renderstate)

      const { geomDataTexture, reductionTextureWidth, floatGeomBuffer } = renderstate.unifs
      if (geomDataTexture) this.occlusionDataBuffer.bindToUniform(renderstate, geomDataTexture)
      if (reductionTextureWidth) gl.uniform1i(reductionTextureWidth.location, this.reductionDataBuffer.width)
      if (floatGeomBuffer) gl.uniform1i(floatGeomBuffer.location, 1)

      // Draw one point for each pixel in the occlusion buffer.
      // This point will color a single pixel in the reduction buffer.
      const numReductionPoints = this.occlusionDataBuffer.width * this.occlusionDataBuffer.height
      gl.drawArrays(gl.POINTS, 0, numReductionPoints)

      this.reductionDataBuffer.unbindForWriting(renderstate)
    }

    reduce(renderstate)

    const drawCulledBBoxes = () => {
      // Now clear the color buffer, but not the depth buffer
      // and draw the bounding boxes of occluded items.
      this.occlusionDataBuffer.bindForWriting(renderstate, false)
      // this.occlusionDataBuffer.clear(false)

      this.boundingBoxShader.bind(renderstate, 'GLGeomItemLibrary')
      this.bbox.bind(renderstate)

      // Read each Matrix and Bbox settings from the Texture.
      const { instancesTexture, instancesTextureSize, instancedDraw, reductionDataTexture } = renderstate.unifs
      this.glGeomItemsTexture.bindToUniform(renderstate, instancesTexture)
      gl.uniform1i(instancesTextureSize.location, this.glGeomItemsTexture.width)
      gl.uniform1i(instancedDraw.location, 1)

      this.reductionDataBuffer.bindColorTexture(renderstate, reductionDataTexture)

      // The instanced transform ids are bound as an instanced attribute.
      const location = renderstate.attrs.instancedIds.location
      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.culledDrawIdsBuffer)
      gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1 * 4, 0)
      gl.vertexAttribDivisor(location, 1) // This makes it instanced

      // Now draw all the bounding boxes to make sure we catch anything.
      renderstate.bindViewports(renderstate.unifs, () => {
        this.bbox.drawInstanced(this.inFrustumIndicesCount)
      })
    }

    drawCulledBBoxes()

    reduce(renderstate)

    // //////////////////////////////////////////
    // Pull down the reduction values from the GPU for processing.

    this.reductionDataBuffer.bindForReading()

    const numReductionValues = this.reductionDataBuffer.width * this.reductionDataBuffer.height
    const visibleItems = new Uint8Array(numReductionValues)
    gl.readPixels(
      0,
      0,
      this.reductionDataBuffer.width * (gl.name == 'webgl2' ? 1 : 4),
      this.reductionDataBuffer.height,
      gl.name == 'webgl2' ? gl.RED : gl.RGBA,
      gl.UNSIGNED_BYTE,
      visibleItems
    )
    // console.log(visibleItems)
    this.reductionDataBuffer.unbindForReading()

    this.worker.postMessage(
      {
        type: 'OcclusionData',
        visibleItems,
      },
      [visibleItems.buffer]
    )
  }

  /**
   * The removeGeomItem method.
   * @param {any} geomItem - The geomItem value.
   * @return {any} - The return value.
   */
  removeGeomItem(geomItem) {
    const index = this.glGeomItemsMap[geomItem.getId()]
    const glGeomItem = this.glGeomItems[index]

    const geomItemChanged = this.glGeomItemEventHandlers[index]
    geomItem.getParameter('Material').off('valueChanged', geomItemChanged)
    geomItem.getParameter('GeomMat').off('valueChanged', geomItemChanged)
    geomItem.off('cutAwayChanged', geomItemChanged)
    geomItem.off('highlightChanged', geomItemChanged)

    this.glGeomItems[index] = null
    this.glGeomItemsIndexFreeList.push(index)
    delete this.glGeomItemsMap[geomItem.getId()]

    this.renderer.requestRedraw()

    return glGeomItem
  }

  /**
   * The getGeomItem method.
   * @param {number} index - The index value.
   * @return {GLGeomItem} - The GLGeomItem that wraps the provided GeomItem
   */
  getGeomItem(index) {
    if (index >= this.glGeomItems.length) {
      console.warn('Invalid Draw Item id:' + index + ' NumItems:' + (this.glGeomItems.length - 1))
      return undefined
    }
    return this.glGeomItems[index].geomItem
  }

  /**
   * The getGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {GLGeomItem} - The GLGeomItem that wraps the provided GeomItem
   */
  getGLGeomItem(geomItem) {
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
   * @param {number} index - The index of the item in the library.
   * @param {number} subIndex - The index of the item within the block being uploaded.
   * @param {Float32Array} dataArray - The dataArray value.
   * @param {array} cullingWorkerData - The array of values that will be uploaded to the culling worker..
   * @private
   */
  populateDrawItemDataArray(index, subIndex, dataArray, cullingWorkerData) {
    const glGeomItem = this.glGeomItems[index]
    // When an item is deleted, we allocate its index to the free list
    // and null this item in the array. skip over null items.
    if (!glGeomItem) return
    const { geomItem, geomId } = glGeomItem

    const stride = pixelsPerGLGeomItem * 4 // The number of floats per draw item.
    const offset = subIndex * stride

    // /////////////////////////
    // Geom Item Params
    const materialId = 0
    let flags = 0
    if (geomItem.isCutawayEnabled()) {
      const GEOMITEM_FLAG_CUTAWAY = 1 // 1<<0;
      flags |= GEOMITEM_FLAG_CUTAWAY
    }

    const pix0 = Vec4.createFromBuffer(dataArray.buffer, (offset + 0) * 4)
    pix0.set(flags, materialId, 0, 0)

    const material = geomItem.getParameter('Material').getValue()
    // const coords = material.getMetadata('glmaterialcoords')
    const allocation = this.renderer.glMaterialLibrary.getMaterialAllocation(material)
    if (allocation) {
      pix0.z = allocation.start
    }

    // Store the geomId for debugging purposes.
    // see: DEBUG_GEOM_ID
    pix0.w = geomId

    // /////////////////////////
    // Geom Matrix
    const mat4 = geomItem.getGeomMat4()
    const pix1 = Vec4.createFromBuffer(dataArray.buffer, (offset + 1 * 4) * 4)
    const pix2 = Vec4.createFromBuffer(dataArray.buffer, (offset + 2 * 4) * 4)
    const pix3 = Vec4.createFromBuffer(dataArray.buffer, (offset + 3 * 4) * 4)
    pix1.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x)
    pix2.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y)
    pix3.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z)

    // /////////////////////////
    // Highlight
    const pix4 = Vec4.createFromBuffer(dataArray.buffer, (offset + 4 * 4) * 4)
    if (geomItem.isHighlighted()) {
      const highlight = geomItem.getHighlight()
      pix4.set(highlight.r, highlight.g, highlight.b, highlight.a)
    }

    // /////////////////////////
    // Cutaway
    const pix5 = Vec4.createFromBuffer(dataArray.buffer, (offset + 5 * 4) * 4)
    if (geomItem.isCutawayEnabled()) {
      const cutAwayVector = geomItem.getCutVector()
      const cutAwayDist = geomItem.getCutDist()
      // console.log(geomItem.getName(), geomItem.isCutawayEnabled(), flags, pix0.toString())
      pix5.set(cutAwayVector.x, cutAwayVector.y, cutAwayVector.z, cutAwayDist)
    }

    // /////////////////////////
    // Bounding Box
    const bbox = geomItem.getParameter('BoundingBox').getValue()
    const pix6 = Vec4.createFromBuffer(dataArray.buffer, (offset + 6 * 4) * 4)
    const pix7 = Vec4.createFromBuffer(dataArray.buffer, (offset + 7 * 4) * 4)
    pix6.set(bbox.p0.x, bbox.p0.y, bbox.p0.z, 0.0)
    pix7.set(bbox.p1.x, bbox.p1.y, bbox.p1.z, 0.0)

    // /////////////////////////
    // Update the culling worker
    const boundingRadius = bbox.size() * 0.5
    const pos = bbox.center()
    cullingWorkerData.push({
      id: index,
      boundingRadius,
      pos: pos.asArray(),
    })
  }

  /**
   * The newItemsReadyForLoading method.
   * @return {any} - The return value.
   */
  newItemsReadyForLoading() {
    return this.dirtyItemIndices.length > 0
  }

  /**
   * The uploadGeomItems method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  uploadGeomItems(renderstate) {
    const gl = this.renderer.gl
    if (!gl.floatTexturesSupported) {
      // During rendering, the GeomMat will be Pplled.
      // This will trigger the lazy evaluation of the operators in the scene.
      this.dirtyItemIndices = []
      // this.emit('renderTreeUpdated', {});
      return
    }

    let size = Math.round(Math.sqrt(this.glGeomItems.length * pixelsPerGLGeomItem) + 0.5)
    // Only support power 2 textures. Else we get strange corruption on some GPUs
    // in some scenes.
    size = MathFunctions.nextPow2(size)
    // Size should be a multiple of pixelsPerGLGeomItem, so each geom item is always contiguous
    // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
    if (size % pixelsPerGLGeomItem != 0) size += pixelsPerGLGeomItem - (size % pixelsPerGLGeomItem)

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
      this.dirtyItemIndices = Array((size * size) / pixelsPerGLGeomItem)
        .fill()
        .map((v, i) => i)
    }

    gl.bindTexture(gl.TEXTURE_2D, this.glGeomItemsTexture.glTex)
    const typeId = this.glGeomItemsTexture.getTypeID()

    const geomItemsUpdateToCullingWorker = []

    for (let i = 0; i < this.dirtyItemIndices.length; i++) {
      const indexStart = this.dirtyItemIndices[i]
      const yoffset = Math.floor((indexStart * pixelsPerGLGeomItem) / size)
      let indexEnd = indexStart + 1
      for (let j = i + 1; j < this.dirtyItemIndices.length; j++) {
        const index = this.dirtyItemIndices[j]
        if (Math.floor((index * pixelsPerGLGeomItem) / size) != yoffset) {
          break
        }
        if (index != indexEnd) {
          break
        }
        indexEnd++
      }

      // TODO: for contiguous blcoks, we create larger arrays and populate
      // and upload them in one step.
      const uploadCount = indexEnd - indexStart
      const xoffset = (indexStart * pixelsPerGLGeomItem) % size
      const width = pixelsPerGLGeomItem * uploadCount
      const height = 1
      const dataArray = new Float32Array(pixelsPerGLGeomItem * 4 * uploadCount) // 4==RGBA pixels.

      for (let j = indexStart; j < indexEnd; j++) {
        this.populateDrawItemDataArray(j, j - indexStart, dataArray, geomItemsUpdateToCullingWorker)
      }

      if (typeId == gl.FLOAT) {
        this.glGeomItemsTexture.populate(dataArray, width, height, xoffset, yoffset, false)
      } else {
        const unit16s = MathFunctions.convertFloat32ArrayToUInt16Array(dataArray)
        this.glGeomItemsTexture.populate(unit16s, width, height, xoffset, yoffset, false)
      }

      i += uploadCount - 1
    }

    // /////////////////////////
    // Update the culling worker
    this.worker.postMessage({
      type: 'UpdateGeomItems',
      geomItems: geomItemsUpdateToCullingWorker,
    })

    this.dirtyItemIndices = []
  }

  /**
   * Updates the GPU state if any update is needed.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate) {
    if (this.dirtyItemIndices.length > 0) this.uploadGeomItems(renderstate)
    // renderstate.drawItemsTexture = this.glGeomItemsTexture

    const gl = this.renderer.gl
    const { instancesTexture, instancesTextureSize } = renderstate.unifs
    if (instancesTexture) {
      this.glGeomItemsTexture.bindToUniform(renderstate, instancesTexture)
      gl.uniform1i(instancesTextureSize.location, this.glGeomItemsTexture.width)
    }
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {}
}

export { GLGeomItemLibrary }
