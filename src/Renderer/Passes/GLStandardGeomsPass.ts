import { GLPass } from './GLPass'

import { Vec4 } from '../../Math/index'

import {
  GeomItem,
  Points,
  Lines,
  Mesh,
  PointsProxy,
  LinesProxy,
  MeshProxy,
  TreeItem,
  BaseGeomItem,
} from '../../SceneTree/index'
import { GLPoints, GLLines, GLMesh, GLMaterial, GLGeomItemChangeType, GLGeomItem } from '../Drawing/index'
import { GLTexture2D } from '../GLTexture2D'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { GLShader } from '../GLShader'

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
  }

  /**
   * The init method.
   * @param {GLBaseRenderer} renderer - The renderer value.
   * @param {number} passIndex - The index of the pass in the GLBAseRenderer
   */
  init(renderer: GLBaseRenderer, passIndex: number) {
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
   * @return {Boolean} - Returns true if the item is now added to the pass.
   */
  itemAddedToScene(treeItem: TreeItem, rargs: Record<any, any>) {
    if (treeItem instanceof GeomItem) {
      const geomItem = treeItem
      {
        {
          if (this.filterGeomItem(geomItem)) {
            this.addGeomItem(geomItem)

            geomItem.setMetadata('glpass', this)
            return true
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
  itemRemovedFromScene(treeItem: TreeItem, rargs: Record<any, any>): boolean {
    if (treeItem instanceof GeomItem && treeItem.getMetadata('glpass') == this) {
      return this.removeGeomItem(treeItem)
    }
    return false
  }

  /**
   * The filterGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {any} - The return value.
   */
  filterGeomItem(geomItem: GeomItem) {
    return true
  }

  /**
   * The addGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   */
  addGeomItem(geomItem: GeomItem) {}

  /**
   * The removeGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   */
  removeGeomItem(geomItem: GeomItem): boolean {
    return false
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
  constructShaders(shaderName: string) {
    let glgeomdatashader
    let glselectedshader

    const glShader = this.__renderer.getOrCreateShader(shaderName)
    if (glShader.getGeomDataShaderName()) {
      glgeomdatashader = this.__renderer.getOrCreateShader(glShader.getGeomDataShaderName())
    } else {
      glgeomdatashader = glShader
    }
    if (glShader.getSelectedShaderName()) {
      glselectedshader = this.__renderer.getOrCreateShader(glShader.getSelectedShaderName())
    } else {
      glselectedshader = glShader
    }
    return {
      glShader,
      glgeomdatashader,
      glselectedshader,
    }
  }

  /**
   * The getGeomItemAndDist method.
   * @param {any} geomData - The geomData value.
   * @return {any} - The return value.
   */
  getGeomItemAndDist(geomData: Uint8Array) {
    let itemId
    let dist
    const gl = this.__gl // TODO: refactor to avoid casts?
    if (gl.floatGeomBuffer) {
      itemId = Math.round(geomData[1])
      dist = geomData[3]
    } else {
      itemId = geomData[0] + ((geomData[1] & 63) << 8)
      dist = MathFunctions.decode16BitFloatFrom2xUInt8(Uint8Array.from([geomData[2], geomData[3]]))
    }

    const geomItem = this.renderer.glGeomItemLibrary.getGeomItem(itemId)
    if (geomItem) {
      return {
        geomItem,
        dist,
      }
    }
  }
}

export { GLStandardGeomsPass }
