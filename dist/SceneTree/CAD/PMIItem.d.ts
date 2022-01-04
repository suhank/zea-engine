import { Color } from "../../Math/Color";
import { CloneContext } from "../CloneContext";
import { TreeItem } from "../TreeItem";
/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends TreeItem
 */
declare class PMIItem extends TreeItem {
    /**
     * Creates an instance of PMIItem setting up the initial configuration for Material and Color parameters.
     *
     * @param {string} name - The name value.
     */
    constructor(name?: string);
    /**
     * The clone method constructs a new PMIItem, copies its values
     * from this item and returns it.
     *
     * @param {number} flags - The flags param.
     * @return {PMIItem} - The return value.
     */
    clone(context?: CloneContext): PMIItem;
    /**
     * Changes the current state of the selection of this item.
     * Note: the PMIItem also activates the PMI linking when selected.
     *
     * @emits `selectedChanged` with selected state
     * @param sel - Boolean indicating the new selection state.
     */
    setSelected(sel: boolean): void;
    /**
     * Activates the PMIView, adjusting visibility of the PMI items and the camera Xfo
     */
    activate(): void;
    /**
     * Deactivates the PMIItem
     */
    deactivate(): void;
    /**
     * Adds a highlight to the tree item.
     *
     * @param {string} name - The name of the tree item.
     * @param {Color} color - The color of the highlight.
     * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
     */
    addHighlight(name?: string, color?: Color, propagateToChildren?: boolean): void;
    /**
     * Removes a highlight to the tree item.
     *
     * @param {string} name - The name of the tree item.
     * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
     */
    removeHighlight(name: string, propagateToChildren?: boolean): void;
}
export { PMIItem };
