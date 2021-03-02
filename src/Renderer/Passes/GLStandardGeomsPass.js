import { GLPass } from './GLPass'

import { Vec4 } from '../../Math/index'

import { GeomItem, Points, Lines, Mesh, PointsProxy, LinesProxy, MeshProxy } from '../../SceneTree/index'
import { GLPoints, GLLines, GLMesh, GLMaterial, GLGeomItemChangeType, GLGeomItem } from '../Drawing/index.js'
import { GLTexture2D } from '../GLTexture2D.js'
import { MathFunctions } from '../../Utilities/MathFunctions'

const pixelsPerItem = 6 // The number of RGBA pixels per draw item.

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends GLPass
 */
class GLStandardGeomsPass extends GLPass {
  /**
   * Create a GL pass.
   */
  constructor() {
    super()

    // this.__drawItems = [undefined]
    // this.__drawItemsIndexFreeList = []
    // this.__dirtyItemIndices = []
  }

  /**
   * The init method.
   * @param {any} renderer - The renderer value.
   * @param {any} passIndex - The passIndex value.
   */
  init(renderer, passIndex) {
    super.init(renderer, passIndex)
  }

  /**
   * The itemAddedToScene method is called on each pass when a new item
   * is added to the scene, and the renderer must decide how to render it.
   * It allows Passes to select geometries to handle the drawing of.
   * @param {TreeItem} treeItem - The treeItem value.
   * @param {object} rargs - Extra return values are passed back in this object.
   * The object contains a parameter 'continueInSubTree', which can be set to false,
   * so the subtree of this node will not be traversed after this node is handled.
   * @return {Boolean} - The return value.
   */
  itemAddedToScene(treeItem, rargs) {
    if (treeItem instanceof GeomItem) {
      const geomItem = treeItem
      {
        {
          if (this.filterGeomItem(geomItem)) {
            this.addGeomItem(geomItem)
          } else {
            return false
          }
        }
      }
    } else {
      return false
    }
  }

  /**
   * The itemRemovedFromScene method is called on each pass when aa item
   * is removed to the scene, and the pass must handle cleaning up any resources.
   * @param {TreeItem} treeItem - The treeItem value.
   * @param {object} rargs - Extra return values are passed back in this object.
   * @return {Boolean} - The return value.
   */
  itemRemovedFromScene(treeItem, rargs) {
    if (treeItem instanceof GeomItem && treeItem.getMetadata('glpass') == this) {
      return this.removeGeomItem(treeItem)
    }
    return false
  }

  /**
   * The filterGeomItem method.
   * @param {any} geomItem - The geomItem value.
   * @return {any} - The return value.
   */
  filterGeomItem(geomItem) {
    return true
  }

  /**
   * The constructShaders method.
   * Given a material, generate the various shaders required to render objects
   * using this material. There should always be at least a single glShader
   * and optionally a glgeomdatashader for rendering the goem data buffer
   * and a glselectedshader for rendering selection hilghlights
   * @param {string} shaderName - The name of the base shader.
   * @return {object} - The object containing the shader instances.
   */
  constructShaders(shaderName) {
    let glgeomdatashader
    let glselectedshader

    const glShader = this.__renderer.getOrCreateShader(shaderName)
    if (glShader.constructor.getGeomDataShaderName()) {
      glgeomdatashader = this.__renderer.getOrCreateShader(glShader.constructor.getGeomDataShaderName())
    }
    if (glShader.constructor.getSelectedShaderName()) {
      glselectedshader = this.__renderer.getOrCreateShader(glShader.constructor.getSelectedShaderName())
    }
    return {
      glShader,
      glgeomdatashader,
      glselectedshader,
    }
  }

  /**
   * Given a BaseGeom, constructs the GLGeom that manages the state of the geometry in the GPU.
   * @param {BaseGeom} geom - The geom value.
   * @return {GLGeom} - The return value.
   */
  // constructGLGeom(geom) {
  //   let glgeom = geom.getMetadata('glgeom')
  //   if (glgeom) {
  //     glgeom.addRef(this)
  //     return glgeom
  //   }
  //   const gl = this.__gl
  //   if (geom instanceof Mesh || geom instanceof MeshProxy) {
  //     glgeom = new GLMesh(gl, geom)
  //   } else if (geom instanceof Lines || geom instanceof LinesProxy) {
  //     glgeom = new GLLines(gl, geom)
  //   } else if (geom instanceof Points || geom instanceof PointsProxy) {
  //     glgeom = new GLPoints(gl, geom)
  //   } else {
  //     throw new Error('Unsupported geom type:' + geom.constructor.name)
  //   }
  //   geom.setMetadata('glgeom', glgeom)
  //   glgeom.on('updated', () => {
  //     this.__renderer.requestRedraw()
  //   })
  //   glgeom.addRef(this)
  //   return glgeom
  // }

  /**
   * The removeGeom method.
   * @param {BaseGeom} geom - The geom value.
   */
  // removeGeom(geom) {
  //   const glgeom = geom.getMetadata('glgeom')
  //   if (glgeom) {
  //     glgeom.removeRef(this) // Should result in a destroy
  //   }
  // }

  /**
   * Given a GeomItem, constructs the GLGeomItem that manages the GPU state of the GeomItem.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {GLGeomItem} - The return value.
  constructGLGeomItem(geomItem) {
    let index
    // Use recycled indices if there are any available...
    if (this.__drawItemsIndexFreeList.length > 0) {
      index = this.__drawItemsIndexFreeList.pop()
    } else {
      index = this.__drawItems.length
      this.__drawItems.push(null)
    }
    this.__dirtyItemIndices.push(index)

    const gl = this.__gl
    const supportInstancing = gl.floatTexturesSupported
    const glGeomItem = new GLGeomItem(gl, geomItem, index, supportInstancing)

    glGeomItem.on('updated', (event) => {
      if (!event) {
        // On mobile devices without support for floating point textures
        // we just need to redraw.
        this.__renderer.drawItemChanged()
        return
      }
      switch (event.type) {
        case GLGeomItemChangeType.GEOMITEM_CHANGED:
          if (this.__dirtyItemIndices.includes(index)) return
          this.__dirtyItemIndices.push(index)
          break
        case GLGeomItemChangeType.GEOM_CHANGED:
        case GLGeomItemChangeType.VISIBILITY_CHANGED:
          break
        case GLGeomItemChangeType.HIGHLIGHT_CHANGED:
          if (this.__dirtyItemIndices.includes(index)) return
          this.__dirtyItemIndices.push(index)
          this.__renderer.requestRedraw()
          return
      }
      this.__renderer.drawItemChanged()
    })

    this.__drawItems[index] = glGeomItem

    // Note: before the renderer is disabled, this is a  no-op.
    this.__renderer.requestRedraw()

    geomItem.setMetadata('glpass', this)
    return glGeomItem
  }
   */

  /**
   * The removeGeomItem method.
   * @param {any} geomItem - The geomItem value.
   * @return {any} - The return value.
  removeGeomItem(geomItem) {
    if (geomItem.getMetadata('glpass') != this) return

    // TODO: Finish of ref counting GLGeoms.
    // I'm not sure if we ever clean up the renderer properly
    // when geoms are removed. (Run Instancing test and see if
    // GLGeom is ever destroyed when instance counts drop to zero.)
    // this.removeGeom(geomItem.getParameter('Geometry').getValue())

    const glGeomItem = geomItem.getMetadata('glGeomItem')

    const index = glGeomItem.getId()
    this.__drawItems[index] = null
    this.__drawItemsIndexFreeList.push(index)

    // TODO: review signal disconnections
    // glGeomItem.transformChanged.disconnectScope(this);

    // this.emit('renderTreeUpdated', {});
    this.__renderer.requestRedraw()

    geomItem.deleteMetadata('glpass')
    geomItem.deleteMetadata('glGeomItem')

    return glGeomItem
  }
   */

  // removeMaterial(material) {
  //     const glshaderMaterials = this.__glshadermaterials[material.hash];
  //     if (!glshaderMaterials || glshaderMaterials != material.getMetadata('glshaderMaterials')) {
  //         console.warn("Material not found in pass");
  //         return;
  //     }

  //     const glMaterialGeomItemSets = material.getMetadata('glMaterialGeomItemSets');
  //     glshaderMaterials.removeMaterialGeomItemSets(glMaterialGeomItemSets);
  // };

  /**
   * The removeGLGeom method.
   * @param {any} geomItemMapping - The geomItemMapping value.
   * @param {any} materialGeomMapping - The materialGeomMapping value.
   */
  // removeGLGeom(geomItemMapping, materialGeomMapping) {
  //   const index = materialGeomMapping.geomItemMappings.indexOf(geomItemMapping)
  //   materialGeomMapping.geomItemMappings.splice(index, 1)

  //   // Note: the GLMAterial cleans up iself now...
  //   // if(materialGeomMapping.geomItemMappings.length == 0 && !this.__explicitShader){
  //   //     this.removeMaterialGeomMapping(materialGeomMapping.glMaterial);
  //   // }
  // }

  // ////////////////////////////////////////////////////////
  // GeomItem IDs

  /**
   * The getGeomItem method.
   * @param {any} id - The id value.
   * @return {any} - The return value.
   */
  // getGeomItem(id) {
  //   if (id >= this.__drawItems.length) {
  //     console.warn('Invalid Draw Item id:' + id + ' NumItems:' + (this.__drawItems.length - 1))
  //     return undefined
  //   }
  //   return this.__drawItems[id]
  // }

  // ////////////////////////////////////////////////
  // Data Uploading

  /**
   * The __populateDrawItemDataArray method.
   * @param {any} geomItem - The geomItem value.
   * @param {number} index - The index value.
   * @param {any} dataArray - The dataArray value.
   * @private
  __populateDrawItemDataArray(geomItem, index, dataArray) {
    const stride = pixelsPerItem * 4 // The number of floats per draw item.
    const offset = index * stride

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
    const coords = material.getMetadata('glmaterialcoords')
    if (coords) {
      pix0.z = coords.x
      pix0.w = coords.y
    }

    // /////////////////////////
    // Geom Matrix
    const mat4 = geomItem.getGeomMat4()
    const pix1 = Vec4.createFromBuffer(dataArray.buffer, (offset + 4) * 4)
    const pix2 = Vec4.createFromBuffer(dataArray.buffer, (offset + 8) * 4)
    const pix3 = Vec4.createFromBuffer(dataArray.buffer, (offset + 12) * 4)
    pix1.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x)
    pix2.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y)
    pix3.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z)

    // /////////////////////////
    // Hilight
    const pix4 = Vec4.createFromBuffer(dataArray.buffer, (offset + 16) * 4)
    if (geomItem.isHighlighted()) {
      const highlight = geomItem.getHighlight()
      pix4.set(highlight.r, highlight.g, highlight.b, highlight.a)
    }

    // /////////////////////////
    // Cutaway
    const pix5 = Vec4.createFromBuffer(dataArray.buffer, (offset + 20) * 4)
    if (geomItem.isCutawayEnabled()) {
      const cutAwayVector = geomItem.getCutVector()
      const cutAwayDist = geomItem.getCutDist()
      // console.log(geomItem.getName(), geomItem.isCutawayEnabled(), flags, pix0.toString())
      pix5.set(cutAwayVector.x, cutAwayVector.y, cutAwayVector.z, cutAwayDist)
    }
  }
   */

  /**
   * The newItemsReadyForLoading method.
   * @return {any} - The return value.
   */
  // newItemsReadyForLoading() {
  //   return this.__dirtyItemIndices.length > 0
  // }

  /**
   * The uploadGeomItems method.
  uploadGeomItems() {
    const gl = this.__gl
    if (!gl.floatTexturesSupported) {
      // During rendering, the GeomMat will be Pplled.
      // This will trigger the lazy evaluation of the operators in the scene.
      this.__dirtyItemIndices = []
      // this.emit('renderTreeUpdated', {});
      return
    }

    let size = Math.round(Math.sqrt(this.__drawItems.length * pixelsPerItem) + 0.5)
    // Only support power 2 textures. Else we get strange corruption on some GPUs
    // in some scenes.
    size = MathFunctions.nextPow2(size)
    // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
    // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
    if (size % pixelsPerItem != 0) size += pixelsPerItem - (size % pixelsPerItem)

    if (!this.__drawItemsTexture) {
      this.__drawItemsTexture = new GLTexture2D(gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: size,
        height: size,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
      this.__drawItemsTexture.clear()
    } else if (this.__drawItemsTexture.width != size) {
      this.__drawItemsTexture.resize(size, size)
      this.__dirtyItemIndices = Array((size * size) / pixelsPerItem)
        .fill()
        .map((v, i) => i)
    }

    gl.bindTexture(gl.TEXTURE_2D, this.__drawItemsTexture.glTex)
    const typeId = this.__drawItemsTexture.getTypeID()

    for (let i = 0; i < this.__dirtyItemIndices.length; i++) {
      const indexStart = this.__dirtyItemIndices[i]
      const yoffset = Math.floor((indexStart * pixelsPerItem) / size)
      let indexEnd = indexStart + 1
      for (let j = i + 1; j < this.__dirtyItemIndices.length; j++) {
        const index = this.__dirtyItemIndices[j]
        if (Math.floor((index * pixelsPerItem) / size) != yoffset) {
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
      const xoffset = (indexStart * pixelsPerItem) % size
      const width = pixelsPerItem * uploadCount
      const height = 1
      const dataArray = new Float32Array(pixelsPerItem * 4 * uploadCount) // 4==RGBA pixels.

      for (let j = indexStart; j < indexEnd; j++) {
        const glGeomItem = this.__drawItems[j]
        // When an item is deleted, we allocate its index to the free list
        // and null this item in the array. skip over null items.
        if (!glGeomItem) continue
        this.__populateDrawItemDataArray(glGeomItem.getGeomItem(), j - indexStart, dataArray)
      }

      if (typeId == gl.FLOAT) {
        this.__drawItemsTexture.populate(dataArray, width, height, xoffset, yoffset, false)
      } else {
        const unit16s = MathFunctions.convertFloat32ArrayToUInt16Array(dataArray)
        this.__drawItemsTexture.populate(unit16s, width, height, xoffset, yoffset, false)
      }

      i += uploadCount - 1
    }

    this.__dirtyItemIndices = []
  }
   */

  /**
   * The finalize method.
   */
  // finalize() {
  //   if (this.__dirtyItemIndices.length == 0) return
  //   this.uploadGeomItems()
  // }
}

export { GLStandardGeomsPass }
