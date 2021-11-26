import { BaseGroup } from './BaseGroup';
import { MaterialParameter } from '../Parameters/MaterialParameter';
import { BaseItem } from '../BaseItem';
/**
 *
 * **Parameters**
 * * **Material(`MaterialParameter`):** _todo_
 *
 * @extends BaseGroup
 */
declare class MaterialGroup extends BaseGroup {
    /**
     * @member materialParam - The Material to use when rendering this GeomItem
     */
    materialParam: MaterialParameter;
    private __backupMaterials;
    /**
     * Creates an instance of a group.
     *
     * @param name - The name of the group.
     */
    constructor(name?: string);
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
     * The __updateMaterial method.
     * @private
     */
    __updateMaterial(): void;
    /**
     * The __updateMaterial method.
     * @private
     */
    __updateMaterialHelper(): void;
    /**
     * The __bindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    bindItem(item: BaseItem, index: number): void;
    /**
     * The __unbindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    __unbindItem(item: BaseItem, index: number): void;
    /**
     * The clone method constructs a new group,
     * copies its values and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned group.
     */
    clone(context: Record<string, unknown>): MaterialGroup;
}
export { MaterialGroup };
