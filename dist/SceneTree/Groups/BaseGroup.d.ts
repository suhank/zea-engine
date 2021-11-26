import { ItemSetParameter } from '../Parameters/index';
import { TreeItem } from '../TreeItem';
/**
 * BaseGroup are a special type of `TreeItem` that allows you to gather/classify/organize/modify
 * multiple items contained within the group. Items can be added to the group directly, or using
 * its path.
 * All parameters set to the group are also set to the children; in other words, it's a faster way
 * to apply common things to multiple items.
 *
 * **Parameters**
 * * **Items(`ItemSetParameter`):** _todo_
 *
 * @extends TreeItem
 */
declare class BaseGroup extends TreeItem {
    /**
     * @member itemsParam - TODO
     */
    itemsParam: ItemSetParameter;
    protected __itemsEventHandlers: Array<Record<string, number>>;
    searchRoot?: TreeItem;
    /**
     * Creates an instance of a group.
     *
     * @param name - The name of the group.
     */
    constructor(name?: string);
    /**
     *  sets the root item to be used as the search root.
     * @param treeItem
     */
    setSearchRoot(treeItem: TreeItem): void;
    /**
     * The setOwner method assigns a new owner to the item. The owner of a group becomes its search root unless another search root is already set.
     *
     * @param ownerItem - The new owner item.
     */
    setOwner(ownerItem: TreeItem): void;
    /**
     * The __bindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    protected bindItem(item: TreeItem, index: number): void;
    /**
     * The unbindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    protected unbindItem(item: TreeItem, index: number): void;
    /**
     * Adds an item to the group(See `Items` parameter).
     *
     * @param item - The item value.
     * @param emit - The emit value.
     */
    addItem(item: TreeItem, emit?: boolean): void;
    /**
     * Removes an item from the group(See `Items` parameter).
     *
     * @param item - The item value.
     * @param emit - The emit value.
     */
    removeItem(item: TreeItem, emit?: boolean): void;
    /**
     * Removes all items from the group.
     *
     * @param emit - `true` triggers `valueChanged` event.
     */
    clearItems(emit?: boolean): void;
    /**
     * Returns the list of `TreeItem` objects owned by the group.
     *
     * @return - The return value.
     */
    getItems(): Set<TreeItem> | undefined;
    /**
     * Sets an entire new array of items to the BaseGroup replacing any previous items.
     *
     * @param items - List of `TreeItem` you want to add to the group
     */
    setItems(items: Set<TreeItem>): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * called once loading is done. Some derived classes override this method.
     * @private
     */
    protected loadDone(): void;
    /**
     * Copies current BaseGroup with all owned items.
     *
     * @param src - The group to copy from.
     * @param context - The group to copy from.
     */
    copyFrom(src: BaseGroup, context?: Record<string, any>): void;
}
export { BaseGroup };
