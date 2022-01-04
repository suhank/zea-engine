// import { GLPass, TreeItem } from '@zeainc/zea-engine'
import { GLPass } from "../../Renderer/Passes/GLPass";
/**
 * Class representing a GL CAD pass.
 *
 * **Events**
 * * **updated**
 * @extends GLPass
 */
class GLCADPass extends GLPass {
    /**
     * Create a GL CAD pass.
     * @param {boolean} debugMode - If true, then puts the GLCADPass rendering into debug mode.
     */
    constructor(debugMode = false) {
        super();
        console.warn('GLCADPass is deprecated. No need to install this pass in the renderer.');
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
        return false;
    }
    /**
     * The itemRemovedFromScene method is called on each pass when aa item
     * is removed to the scene, and the pass must handle cleaning up any resources.
     * @param {TreeItem} treeItem - The treeItem value.
     * @param {object} rargs - Extra return values are passed back in this object.
     * @return {Boolean} - The return value.
     */
    itemRemovedFromScene(treeItem, rargs) {
        return false;
    }
}
export { GLCADPass };
//# sourceMappingURL=GLCADPass.js.map