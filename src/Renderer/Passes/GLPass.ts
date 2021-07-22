import { ParameterOwner } from '../../SceneTree/ParameterOwner'
import { BooleanParameter } from '../../SceneTree/Parameters/index'

const PassType = {
  OPAQUE: 1 << 0,
  TRANSPARENT: 1 << 1,
  OVERLAY: 1 << 2,
}

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends ParameterOwner
 */
class GLPass extends ParameterOwner {
  /**
   * Create a GL pass.
   */
  constructor() {
    super()
    this.enabled = true
    this.passIndex = 0

    const enabledParam = this.addParameter(new BooleanParameter('Enabled', true))
    enabledParam.on('valueChanged', () => (this.enabled = enabledParam.getValue()))
  }

  /**
   * The __parameterValueChanged method.
   * @param {object} event - The event object.
   * @private
   */
  __parameterValueChanged(event) {
    super.__parameterValueChanged(event)
    if (this.renderer) this.renderer.requestRedraw()
  }

  /**
   * The init method.
   * @param {GLBaseRenderer} renderer - The renderer value.
   * @param {number} passIndex - The index of the pass in the GLBAseRenderer
   */
  init(renderer, passIndex) {
    if (passIndex == undefined) throw new Error('Missing constructor argument.') // Type checking. Seomthing that TypeScript will do for us.

    this.__gl = renderer.gl
    this.renderer = renderer
    this.__renderer = renderer
    this.passIndex = passIndex
    this.__passIndex = passIndex // for backwards compatibility
  }

  /**
   * The setPassIndex method.
   * @param {number} passIndex - The index of the pass in the GLBAseRenderer
   */
  setPassIndex(passIndex) {
    this.passIndex = passIndex
    this.__passIndex = passIndex // for backwards compatibility
  }

  /**
   * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
   * @return {number} - The pass type value.
   */
  getPassType() {
    return PassType.OPAQUE
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
    throw Error(`${this.constructor.name} must implement itemAddedToScene and itemRemovedFromScene`)
    return false
  }

  /**
   * The itemRemovedFromScene method is called on each pass when aa item
   * is removed to the scene, and the pass must handle cleaning up any resources.
   * @param {TreeItem} treeItem - The treeItem value.
   * @param {object} rargs - Extra return values are passed back in this object.
   * @return {Boolean} - The return value.
   */
  itemRemovedFromScene(treeItem, rargs) {
    throw Error(`${this.constructor.name} must implement itemAddedToScene and itemRemovedFromScene`)
    return false
  }

  /**
   * The startPresenting method.
   */
  startPresenting() {}

  /**
   * The stopPresenting method.
   */
  stopPresenting() {}

  // ///////////////////////////////////
  // Rendering

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate) {}

  /**
   * The drawHighlightedGeoms method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawHighlightedGeoms(renderstate) {}

  /**
   * The drawGeomData method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate) {}

  /**
   * The getGeomItemAndDist method.
   * @param {any} geomData - The geomData value.
   */
  getGeomItemAndDist(geomData) {}
}

export { GLPass, PassType }
