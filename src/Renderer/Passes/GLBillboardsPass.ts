import { Color, Mat4, Vec3, Vec4 } from '../../Math/index'
import { BillboardItem, TreeItem } from '../../SceneTree/index'
import { BillboardShader } from '../Shaders/BillboardShader'
import { GLPass, PassType } from './GLPass'
import { GLImageAtlas } from '../GLImageAtlas'
import { GLTexture2D } from '../GLTexture2D'
import { GLRenderer } from '../GLRenderer'
import { generateShaderGeomBinding, IGeomShaderBinding } from '../Drawing/index'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { GLShader } from '../GLShader'
import { GeomItemAndDist } from '../../Utilities/IntersectionData'
import { RenderState, GeomDataRenderState } from '../types/renderer'

const pixelsPerItem = 7 // The number of pixels per draw item.

/** Class representing a GL billboards pass.
 * @extends GLPass
 * @private
 */
class GLBillboardsPass extends GLPass {
  protected billboards: any[]
  protected dirtyBillboards: Set<any>
  protected freeIndices: Array<number>
  protected drawCount: number
  protected threshold: number
  protected updateRequested: boolean
  protected prevSortCameraPos: Vec3
  protected atlas: GLImageAtlas | null = null
  protected indexArrayUpdateNeeded: boolean = false
  protected instanceIdsBuffer: WebGLBuffer | null = null
  protected indexArray: Float32Array = new Float32Array(0)

  protected glshader: GLShader | null = null
  protected shaderComp: Record<string, any> = {}

  protected shaderBinding: IGeomShaderBinding | null = null

  protected modelMatrixArray: Array<Float32Array> = []
  protected billboardDataArray: Array<any[]> = [] // TODO: map vs array? refactor
  protected tintColorArray: Array<Array<number>> = []

  protected width: number = 0
  protected drawItemsTexture: GLTexture2D | null = null
  /**
   * Create a GL billboards pass.
   */
  constructor() {
    super()

    this.billboards = []
    this.dirtyBillboards = new Set()
    this.freeIndices = []
    this.drawCount = 0
    this.threshold = 0.0
    this.updateRequested = false

    this.prevSortCameraPos = new Vec3()
  }

  /**
   * The init method.
   * @param renderer - The renderer value.
   * @param passIndex - The index of the pass in the GLBAseRenderer
   */
  init(renderer: GLBaseRenderer, passIndex: number): void {
    super.init(renderer, passIndex)

    // TODO: this.atlas = new GLImageAtlas(this.renderer.gl, 'Billboards', 'RGBA', 'UNSIGNED_BYTE', [1, 1, 1, 0]) // TODO: Check if last arg was for color
    this.atlas = new GLImageAtlas(this.renderer!.gl, 'Billboards', 'RGBA', 'UNSIGNED_BYTE')
    this.atlas!.clearColor = new Color(1, 1, 1, 0)

    const emitUpdated = (event: Record<string, any>) => this.emit('updated', event)
    this.atlas!.on('loaded', emitUpdated)
    this.atlas!.on('updated', emitUpdated)
  }

  /**
   * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
   * @return - The pass type value.
   */
  getPassType(): number {
    return PassType.TRANSPARENT
  }

  /**
   * The itemAddedToScene method is called on each pass when a new item
   * is added to the scene, and the renderer must decide how to render it.
   * It allows Passes to select geometries to handle the drawing of.
   * @param treeItem - The treeItem value.
   * @param rargs - Extra return values are passed back in this object.
   * The object contains a parameter 'continueInSubTree', which can be set to false,
   * so the subtree of this node will not be traversed after this node is handled.
   * @return - The return value.
   */
  itemAddedToScene(treeItem: TreeItem, rargs: Record<string, any>) {
    if (treeItem instanceof BillboardItem) {
      this.addBillboard(treeItem)
      return true
    }
    return false
  }

  /**
   * The itemRemovedFromScene method is called on each pass when aa item
   * is removed to the scene, and the pass must handle cleaning up any resources.
   * @param treeItem - The treeItem value.
   * @param rargs - Extra return values are passed back in this object.
   * @return - The return value.
   */
  itemRemovedFromScene(treeItem: TreeItem, rargs: Record<string, any>): boolean {
    if (treeItem instanceof BillboardItem) {
      this.removeBillboard(treeItem)
      return true
    }
    return false
  }

  // ///////////////////////////////////
  // Bind to Render Tree

  /**
   * The addBillboard method.
   * @param billboard - The billboard value.
   */
  addBillboard(billboard: any): void {
    const imageParam = billboard.imageParam
    const image = imageParam.value
    if (!image) {
      imageParam.on('valueChanged', () => this.addBillboard(billboard))
      return
    }
    let index: any
    if (this.freeIndices.length > 0) index = this.freeIndices.pop()
    else index = this.billboards.length

    const imageIndex = this.atlas!.addSubImage(image)
    billboard.setMetadata('GLBillboardsPass_Index', index)

    const visibilityChanged = () => {
      if (billboard.isVisible()) {
        this.drawCount++
        // The billboard Xfo might have changed while it was
        // not visible. We need to update here.
        this.dirtyBillboards.add(index)
      } else this.drawCount--
      this.reqUpdateIndexArray()
    }
    billboard.on('visibilityChanged', visibilityChanged)

    const updateBillboard = () => {
      if (billboard.isVisible()) {
        this.dirtyBillboards.add(index)
        this.emit('updated')
      }
    }
    billboard.globalXfoParam.on('valueChanged', updateBillboard)
    billboard.alphaParam.on('valueChanged', updateBillboard)
    billboard.on('highlightChanged', updateBillboard)

    if (billboard.isVisible()) this.drawCount++

    this.billboards[index] = {
      billboard,
      imageIndex,
      visibilityChanged,
      updateBillboard,
    }

    this.indexArrayUpdateNeeded = true
    this.requestUpdate()
  }

  /**
   * The removeBillboard method.
   * @param billboard - The billboard value.
   */
  removeBillboard(billboard: any): void {
    const index = billboard.getMetadata('GLBillboardsPass_Index')
    if (index == -1) {
      console.warn('Billboard already removed.')
      return
    }
    const billboardData = this.billboards[index]

    // Currently we are getting errors when trying to re-generate the Fbo
    // after removing and then adding images back to the atlas.
    // I don't have time to figure it out, so simply adding images
    // to the atlas. (for the Zahner demo)
    // Eventually we need to clean up the atlas, so debug this using the
    // survey-point-calibration 190528_Dummy_Srvy_Data.vlexe test
    const image = billboardData.billboard.imageParam.value
    this.atlas!.removeSubImage(image)

    billboard.off('visibilityChanged', billboardData.visibilityChanged)
    billboard.off('highlightChanged', billboardData.updateBillboard)
    billboard.globalXfoParam.off('valueChanged', billboardData.updateBillboard)
    billboard.alphaParam.off('valueChanged', billboardData.updateBillboard)

    this.billboards[index] = null
    this.freeIndices.push(index)

    if (billboard.isVisible()) this.drawCount--

    this.indexArrayUpdateNeeded = true
    this.requestUpdate()
  }

  /**
   * The populateBillboardDataArray method.
   * @param billboardData - The billboardData value.
   * @param index - The index value.
   * @param dataArray - The dataArray value.
   * @private
   */
  populateBillboardDataArray(billboardData: any, index: number, dataArray: any): void {
    const billboard = billboardData.billboard
    const mat4 = billboard.globalXfoParam.value.toMat4()
    const ppm = billboard.pixelsPerMeterParam.value
    const pivot = billboard.pivotParam.value
    const scale = 1 / ppm

    // Until webgl2 is standard, we will avoid using bit flags.
    // instead, we will use decimals.
    let flags = 0
    if (billboard.alignedToCameraParam.value) flags |= 1 << 2
    if (billboard.drawOnTopParam.value) flags |= 1 << 3
    if (billboard.fixedSizeOnscreenParam.value) flags |= 1 << 4
    const alpha = billboard.alphaParam.value
    const color = billboard.colorParam.value
    const offset = index * pixelsPerItem * 4
    const col0 = new Vec4(new Float32Array(dataArray.buffer, offset * 4, 4))
    const col1 = new Vec4(new Float32Array(dataArray.buffer, (offset + 4) * 4, 4))
    const col2 = new Vec4(new Float32Array(dataArray.buffer, (offset + 8) * 4, 4))
    const col3 = new Vec4(new Float32Array(dataArray.buffer, (offset + 12) * 4, 4))
    col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x)
    col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y)
    col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z)
    col3.set(scale, flags, billboardData.imageIndex, alpha)

    const col4 = new Vec4(new Float32Array(dataArray.buffer, (offset + 16) * 4, 4))
    col4.set(pivot.x, pivot.y, 0, 0)

    const col5 = new Vec4(new Float32Array(dataArray.buffer, (offset + 20) * 4, 4))
    col5.set(color.r, color.g, color.b, color.a)

    // /////////////////////////
    // Highlight
    if (billboard.isHighlighted()) {
      const highlight = billboard.getHighlight()
      const col6 = new Vec4(new Float32Array(dataArray.buffer, (offset + 24) * 4, 4))
      col6.set(highlight.r, highlight.g, highlight.b, highlight.a)
    }
  }

  /**
   * The requestUpdate method.
   * @private
   */
  requestUpdate(): void {
    if (!this.updateRequested) {
      this.updateRequested = true
      this.emit('updated')
    }
  }

  /**
   * The reqUpdateIndexArray method.
   * @private
   */
  reqUpdateIndexArray(): void{
    if (this.indexArrayUpdateNeeded) return
    this.indexArrayUpdateNeeded = true
    this.emit('updated')
  }

  // eslint-disable-next-line require-jsdoc
  updateIndexArray(): void {
    const gl = this.__gl!
    // Note: When the camera moves, this array is sorted and re-upload.
    if (this.indexArray && this.indexArray.length != this.drawCount) {
      gl.deleteBuffer(this.instanceIdsBuffer)
      this.instanceIdsBuffer = null
    }

    this.indexArray = new Float32Array(this.drawCount)
    let offset = 0
    for (let i = 0; i < this.billboards.length; i++) {
      if (this.billboards[i] && this.billboards[i].billboard.isVisible()) {
        this.indexArray[offset] = i
        offset++
      }
    }
    if (!this.instanceIdsBuffer) this.instanceIdsBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceIdsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.indexArray, gl.STATIC_DRAW)
    this.indexArrayUpdateNeeded = false
  }

  /**
   * The updateBillboards method.
   * @param renderstate - The object tracking the current state of the renderer
   * @private
   */
  updateBillboards(renderstate: RenderState): void {
    const doIt = () => {
      if (this.indexArrayUpdateNeeded) this.updateIndexArray()

      const gl = this.__gl!
      if (!this.glshader) {
        if (!gl.__quadVertexIdsBuffer) {
          gl.setupInstancedQuad()
        }
        this.glshader = new BillboardShader(gl)
        const shaderComp = this.glshader.compileForTarget('GLBillboardsPass', renderstate.shaderopts)

        this.shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer)
      }

      // Note: Maybe the atlas is alreadu up to date. It should
      // maintain its own coherencey by listening to the sub images.
      this.atlas!.renderAtlas()

      if (!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
        this.modelMatrixArray = []
        this.billboardDataArray = []
        this.tintColorArray = []
        this.indexArray.forEach((index: number) => {
          // if (index == -1) return;
          const billboardData = this.billboards[index]
          const billboard = billboardData.billboard
          const mat4: Mat4 = billboard.globalXfoParam.value.toMat4()
          const ppm = billboard.pixelsPerMeterParam.value
          const scale: number = 1 / ppm
          let flags: number = 0
          if (billboard.alignedToCameraParam.value) flags |= 1 << 2
          if (billboard.drawOnTopParam.value) flags |= 1 << 3
          if (billboard.fixedSizeOnscreenParam.value) flags |= 1 << 4
          const alpha = billboard.alphaParam.value
          const color = billboard.colorParam.value

          this.modelMatrixArray[index] = mat4.asArray()
          this.billboardDataArray[index] = [scale, flags, billboardData.imageIndex, alpha]
          this.tintColorArray[index] = [color.r, color.g, color.b, color.a]
        })
        this.updateRequested = false
        return
      }

      let size = Math.round(Math.sqrt((this.billboards.length - this.freeIndices.length) * pixelsPerItem) + 0.5)
      // Note: the following few lines need a cleanup.
      // We should be using power of 2 textures. The problem is that pot texture sizes don't
      // align with the 6 pixels per draw item. So we need to upload a slightly bigger texture
      // but upload the 'usable' size.

      // Only support power 2 textures. Else we get strange corruption on some GPUs
      // in some scenes.
      // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
      // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
      // size = Math.nextPow2(size);

      if (size % pixelsPerItem != 0) size += pixelsPerItem - (size % pixelsPerItem)

      this.width = size
      // if((this.width % pixelsPerItem) != 0)
      //     this.width -= (this.width % pixelsPerItem);

      if (!this.drawItemsTexture) {
        const params = {
          format: 'RGBA',
          type: 'FLOAT',
          width: size,
          height: size,
          filter: 'NEAREST',
          wrap: 'CLAMP_TO_EDGE',
          mipMapped: false,
        }
        this.drawItemsTexture = new GLTexture2D(gl, params)
        this.drawItemsTexture.clear()
      } else {
        this.drawItemsTexture.resize(size, size)
      }

      this.indexArray.forEach((index: any) => {
        if (index != -1) this.updateBillboard(index)
      })

      this.updateRequested = false
    }

    if (this.atlas!.isLoaded()) {
      doIt()
    } else {
      this.atlas!.on('loaded', doIt)
    }
  }

  /**
   * The updateBillboard method.
   * @param index - The index of the Billboard to update .
   * @private
   */
  updateBillboard(index: number): void {
    if (this.drawCount == 0 || !this.drawItemsTexture) {
      return
    }

    const billboardData = this.billboards[index]
    if (!billboardData.billboard.isVisible()) return

    const gl = this.__gl!

    const dataArray = new Float32Array(pixelsPerItem * 4)
    this.populateBillboardDataArray(billboardData, 0, dataArray)

    gl.bindTexture(gl.TEXTURE_2D, this.drawItemsTexture.glTex)
    const xoffset = (index * pixelsPerItem) % this.width
    const yoffset = Math.floor((index * pixelsPerItem) / this.width)

    const width = pixelsPerItem
    const height = 1
    const type = this.drawItemsTexture.getType()
    const format = this.drawItemsTexture.getFormat()

    if (type == gl.FLOAT) {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, format, type, dataArray)
    } else {
      const unit16s = MathFunctions.convertFloat32ArrayToUInt16Array(dataArray)
      gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, format, type, unit16s)
    }
  }

  /**
   * The sort method.
   * @param cameraPos - The cameraPos value.
   */
  sort(cameraPos: any): void {
    for (const billboardData of this.billboards) {
      const { billboard } = billboardData
      if (billboard && billboard.isVisible()) {
        const xfo = billboard.globalXfoParam.value
        billboardData.dist = xfo.tr.distanceTo(cameraPos)
      }
    }
    this.indexArray.sort((a: number, b: number) => {
      if (a == -1) return 1
      if (b == -1) return -1
      return this.billboards[a].dist > this.billboards[b].dist
        ? -1
        : this.billboards[a].dist < this.billboards[b].dist
        ? 1
        : 0
    })

    const gl = this.__gl!
    if (gl.floatTexturesSupported && this.instanceIdsBuffer) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceIdsBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, this.indexArray, gl.STATIC_DRAW)
    }
  }

  /**
   * Invoke the drawing of each item, compiling the shader using the provided key.
   * @param renderstate - The object tracking the current state of the renderer
   * @param key - The key to cache the compiler results against.
   */
  __draw(renderstate: RenderState, key: string): void {
    const gl = this.__gl
    if (!this.glshader) return
    this.glshader.bind(renderstate, key)
    this.shaderBinding.bind(renderstate)

    const unifs = renderstate.unifs

    const { atlasBillboards, passId, floatGeomBuffer, inVR } = renderstate.unifs

    if (atlasBillboards) {
      this.atlas.bindToUniform(renderstate, unifs.atlasBillboards)
    }

    if (floatGeomBuffer) {
      gl.uniform1i(floatGeomBuffer.location, (<GeomDataRenderState>renderstate).floatGeomBuffer ? 1 : 0)
    }
    if (passId) {
      gl.uniform1i(passId.location, this.passIndex)
    }
    if (inVR) {
      gl.uniform1i(inVR.location, renderstate.vrPresenting ? 1 : 0)
    }

    if (!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
      const { modelMatrix, billboardData, tintColor, layoutData } = renderstate.unifs
      const len = this.indexArray.length
      for (let i = 0; i < len; i++) {
        gl.uniformMatrix4fv(modelMatrix.location, false, this.modelMatrixArray[i])
        gl.uniform4fv(billboardData.location, this.billboardDataArray[i])
        gl.uniform4fv(tintColor.location, this.tintColorArray[i])
        gl.uniform4fv(layoutData.location, this.atlas.getLayoutData(this.billboards[i].imageIndex))

        renderstate.bindViewports(unifs, () => {
          gl.drawQuad()
        })
      }
    } else {
      const { instancesTexture, instancesTextureSize } = renderstate.unifs
      this.drawItemsTexture.bindToUniform(renderstate, instancesTexture)
      gl.uniform1i(instancesTextureSize.location, this.width)

      {
        // The instance billboard ids are bound as an instanced attribute.
        const location = renderstate.attrs.instanceIds.location
        gl.enableVertexAttribArray(location)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceIdsBuffer)
        gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 4, 0)
        gl.vertexAttribDivisor(location, 1) // This makes it instanced
      }

      renderstate.bindViewports(unifs, () => {
        gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.drawCount)
      })
    }
  }

  /**
   * The sort method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState): void {
    if (this.drawCount == 0) return
    if (this.updateRequested) {
      this.updateBillboards(renderstate)
    }

    if (this.dirtyBillboards.size > 0) {
      this.dirtyBillboards.forEach((index) => {
        this.updateBillboard(index)
      })
      this.dirtyBillboards.clear()
    }

    if (this.indexArrayUpdateNeeded) this.updateIndexArray()

    if (!this.glshader) return

    const cameraPos = renderstate.viewXfo.tr
    const dist = cameraPos.distanceTo(this.prevSortCameraPos)
    // Avoid sorting if the camera did not move more than 3 meters.
    if (dist > this.threshold) {
      this.sort(cameraPos)
      this.prevSortCameraPos = cameraPos.clone()
      if (this.drawCount > 1) {
        const idx0 = this.indexArray[this.indexArray.length - 1]
        const idx1 = this.indexArray[this.indexArray.length - 2]
        const billboard0 = this.billboards[idx0].billboard
        const billboard1 = this.billboards[idx1].billboard
        const tr0 = billboard0.globalXfoParam.value.tr
        const tr1 = billboard1.globalXfoParam.value.tr
        this.threshold = tr0.distanceTo(tr1)
      } else {
        this.threshold = 9999
      }
    }

    const gl = this.__gl

    gl.depthMask(false)
    gl.disable(gl.CULL_FACE)

    gl.enable(gl.BLEND)
    gl.blendEquation(gl.FUNC_ADD)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    this.__draw(renderstate, 'DRAW_COLOR')

    gl.disable(gl.BLEND)
    gl.depthMask(true)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawHighlightedGeoms(renderstate: RenderState): void {
    if (this.drawCount == 0) return
    this.__draw(renderstate, 'DRAW_HIGHLIGHT')
  }

  /**
   * The drawGeomData method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState): void {
    if (this.drawCount == 0) return
    this.__draw(renderstate, 'DRAW_GEOMDATA')
  }

  /**
   * The getGeomItemAndDist method.
   * @param geomData - The geomData value.
   * @return - The return value.
   */
  getGeomItemAndDist(geomData: Float32Array | Uint8Array): GeomItemAndDist | undefined {
    let itemId
    let dist
    if (geomData instanceof Float32Array) {
      itemId = Math.round(geomData[1])
      dist = geomData[3]
    } else {
      itemId = geomData[0] + ((geomData[1] & 63) << 8)
      dist = MathFunctions.decode16BitFloatFrom2xUInt8(geomData.slice(2, 3))
    }

    if (itemId >= this.billboards.length) {
      console.warn('Invalid Draw Item id:' + itemId + ' NumBillboards:' + (this.billboards.length - 1))
      return undefined
    }
    return {
      geomItem: this.billboards[itemId].billboard,
      dist,
    }
  }
}

GLRenderer.registerPass(GLBillboardsPass, PassType.TRANSPARENT)

export { GLBillboardsPass }
