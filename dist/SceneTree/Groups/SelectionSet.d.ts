import { BooleanParameter, NumberParameter, ColorParameter } from '../Parameters/index';
import { BaseGroup } from './BaseGroup';
import { BaseItem } from '../BaseItem';
/**
 *
 * **Parameters**
 * * **Highlighted(`BooleanParameter`):** _todo_
 * * **HighlightColor(`ColorParameter`):** _todo_
 * * **HighlightFill(`NumberParameter`):** _todo_
 *
 * @extends BaseGroup
 */
declare class SelectionSet extends BaseGroup {
    /**
     * @member highlightedParam - Whether or not the TreeItem should be highlighted.
     */
    highlightedParam: BooleanParameter;
    /**
     * @member highlightColorParam - The color of the highlight.
     */
    highlightColorParam: ColorParameter;
    /**
     * @member highlightFillParam - TODO
     */
    highlightFillParam: NumberParameter;
    /**
     * Creates an instance of a group.
     *
     * @param name - The name of the group.
     */
    constructor(name?: string);
    /**
     * The updateVisibility method.
     * @return - The return value.
     * @private
     */
    updateVisibility(): boolean;
    /**
     * The updateHighlight method.
     * @private
     */
    updateHighlight(): void;
    /**
     * The updateHighlight method.
     * @private
     */
    __updateHighlightHelper(): void;
    /**
     * Changes selection's state of the group with all items it owns.
     *
     * @param sel - Boolean indicating the new selection state.
     */
    setSelected(sel: boolean): void;
    /**
     * The __bindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    bindItem(item: BaseItem, index: number): void;
    /**
     * The unbindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    unbindItem(item: BaseItem, index: number): void;
    /**
     * The clone method constructs a new group,
     * copies its values and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned group.
     */
    clone(context: Record<string, any>): SelectionSet;
}
export { SelectionSet };
