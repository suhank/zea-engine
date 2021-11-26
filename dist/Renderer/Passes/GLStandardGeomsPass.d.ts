import { GLPass } from './GLPass';
import { GeomItem, TreeItem } from '../../SceneTree/index';
import { GLBaseRenderer } from '../GLBaseRenderer';
import { GeomItemAndDist } from '../../Utilities/IntersectionData';
/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends GLPass
 */
declare class GLStandardGeomsPass extends GLPass {
    /**
     * Create a GL pass.
     */
    constructor();
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer: GLBaseRenderer, passIndex: number): void;
    /**
     * The itemAddedToScene method is called on each pass when a new item
     * is added to the scene, and the renderer must decide how to render it.
     * It allows Passes to select geometries to handle the drawing of.
     * @param treeItem - The treeItem value.
     * @param rargs - Extra return values are passed back in this object.
     * The object contains a parameter 'continueInSubTree', which can be set to false,
     * so the subtree of this node will not be traversed after this node is handled.
     * @return - Returns true if the item is now added to the pass.
     */
    itemAddedToScene(treeItem: TreeItem, rargs: Record<string, any>): boolean;
    /**
     * The itemRemovedFromScene method is called on each pass when aa item
     * is removed to the scene, and the pass must handle cleaning up any resources.
     * @param treeItem - The treeItem value.
     * @param rargs - Extra return values are passed back in this object.
     * @return - The return value.
     */
    itemRemovedFromScene(treeItem: TreeItem, rargs: Record<string, any>): boolean;
    /**
     * The filterGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    filterGeomItem(geomItem: GeomItem): boolean;
    /**
     * The addGeomItem method.
     * @param geomItem - The geomItem value.
     */
    addGeomItem(geomItem: GeomItem): void;
    /**
     * The removeGeomItem method.
     * @param geomItem - The geomItem value.
     */
    removeGeomItem(geomItem: GeomItem): boolean;
    /**
     * The constructShaders method.
     * Given a material, generate the various shaders required to render objects
     * using this material. There should always be at least a single glShader
     * and optionally a glgeomdatashader for rendering the goem data buffer
     * and a glselectedshader for rendering selection hilghlights
     * @param shaderName - The name of the base shader.
     * @return - The object containing the shader instances.
     */
    constructShaders(shaderName: string): Record<string, any>;
    /**
     * The getGeomItemAndDist method.
     * @param geomData - The geomData value.
     * @return - The return value.
     */
    getGeomItemAndDist(geomData: Float32Array | Uint8Array): GeomItemAndDist | undefined;
}
export { GLStandardGeomsPass };
