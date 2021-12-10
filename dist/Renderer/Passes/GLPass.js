import { ParameterOwner } from '../../SceneTree/ParameterOwner';
import { BooleanParameter } from '../../SceneTree/Parameters/index';
const PassType = {
    OPAQUE: 1 << 0,
    TRANSPARENT: 1 << 1,
    OVERLAY: 1 << 2,
};
/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends ParameterOwner
 */
class GLPass extends ParameterOwner {
    /**
     * Create a GL pass.
     */
    constructor() {
        super();
        this.enabled = true;
        this.passIndex = -1;
        this.__gl = null;
        this.renderer = null;
        this.__renderer = null;
        this.enabledParam = new BooleanParameter('Enabled', true);
        this.enabled = true;
        this.passIndex = 0;
        this.addParameter(this.enabledParam);
        this.enabledParam.on('valueChanged', () => (this.enabled = this.enabledParam.value));
    }
    /**
     * The __parameterValueChanged method.
     * @param event - The event object.
     * @private
     */
    parameterValueChanged(event) {
        super.parameterValueChanged(event);
        if (this.renderer)
            this.renderer.requestRedraw();
    }
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer, passIndex) {
        if (passIndex == undefined)
            throw new Error('Missing constructor argument.'); // Type checking. Seomthing that TypeScript will do for us.
        this.__gl = renderer.gl;
        this.renderer = renderer;
        this.__renderer = renderer;
        this.passIndex = passIndex;
    }
    /**
     * The setPassIndex method.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    setPassIndex(passIndex) {
        this.passIndex = passIndex;
    }
    /**
     * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
     * @return - The pass type value.
     */
    getPassType() {
        return PassType.OPAQUE;
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
    itemAddedToScene(treeItem, rargs) {
        throw Error(`${this.constructor.name} must implement itemAddedToScene and itemRemovedFromScene`);
        return false;
    }
    /**
     * The itemRemovedFromScene method is called on each pass when aa item
     * is removed to the scene, and the pass must handle cleaning up any resources.
     * @param treeItem - The treeItem value.
     * @param rargs - Extra return values are passed back in this object.
     * @return - The return value.
     */
    itemRemovedFromScene(treeItem, rargs) {
        throw Error(`${this.constructor.name} must implement itemAddedToScene and itemRemovedFromScene`);
        return false;
    }
    /**
     * The startPresenting method.
     */
    startPresenting() { }
    /**
     * The stopPresenting method.
     */
    stopPresenting() { }
    // ///////////////////////////////////
    // Rendering
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate) {
        throw Error('draw not implemented on GLPass');
    }
    /**
     * The drawHighlightedGeoms method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawHighlightedGeoms(renderstate) { }
    /**
     * The drawGeomData method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawGeomData(renderstate) { }
    /**
     * The getGeomItemAndDist method.
     * @param geomData - The geomData value.
     */
    getGeomItemAndDist(geomData) {
        throw Error('getGeomItemAndDist not implemented on GLPass');
    }
}
export { GLPass, PassType };
//# sourceMappingURL=GLPass.js.map