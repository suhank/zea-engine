import { Vec3 } from '../Math/Vec3';
import { TreeItem } from './TreeItem';
import { BinReader } from './BinReader';
import { MaterialParameter } from '../SceneTree/Parameters/MaterialParameter';
import { AssetLoadContext } from './AssetLoadContext';
/**
 * Base class that represents geometry items with layering, overlaying and cut away features.
 *
 * **Events**
 * * **cutAwayChanged:** Triggered when the cutaway variables change(if enabled or not, the vector and the distance).
 * @extends TreeItem
 */
declare class BaseGeomItem extends TreeItem {
    protected overlay: boolean;
    protected __cutAway: boolean;
    protected __cutAwayVector: Vec3;
    protected __cutAwayDist: number;
    protected __layers: string[];
    /**
     * @member materialParam - The Material to use when rendering this GeomItem
     */
    materialParam: MaterialParameter;
    /**
     * Create a base geometry item.
     * @param name - The name of the base geom item.
     */
    constructor(name?: string);
    /**
     * Sets overlay value.
     *
     * @todo Need to find the layer and add this item to it.
     * @param val - `true` to enable it.
     */
    setOverlay(val: boolean): void;
    /**
     * Returns `true` if overlay is enabled for current item.
     *
     * @return - The return value.
     */
    isOverlay(): boolean;
    /**
     * Adds a layer to current item.
     *
     * @todo Need to find the layer and add this item to it.
     * @param name - The name of the layer.
     */
    addLayer(name: string): void;
    /**
     * Returns all layers in current item.
     *
     * @return - The return value.
     */
    getLayers(): string[];
    /**
     * Checks if cutaway is enabled.
     *
     * @return - Returns `true` if enabled.
     */
    isCutawayEnabled(): boolean;
    /**
     * Sets cutaway state.
     *
     * @param state - `true` to enable it, otherwise `false`.
     */
    setCutawayEnabled(state: boolean): void;
    /**
     * Returns cutaway vector value.
     *
     * @return - `Vec3` when it is set, `false` on default.
     */
    getCutVector(): Vec3;
    /**
     * Sets cutaway vector value.
     *
     * @param cutAwayVector - The cutAwayVector value.
     */
    setCutVector(cutAwayVector: Vec3): void;
    /**
     * Getter for the cutaway distance.
     *
     * @return - The return value.
     */
    getCutDist(): number;
    /**
     * Sets cutaway distance value.
     *
     * @param cutAwayDist - The cutAwayDist value.
     */
    setCutDist(cutAwayDist: number): void;
    /**
     * Sets state of current Item(Including layers & material) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
}
export { BaseGeomItem };
