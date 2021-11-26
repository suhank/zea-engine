import { ParameterOwner } from './ParameterOwner';
import { Owner } from './Owner';
import { BinReader } from './BinReader';
import { Parameter } from './Parameters/Parameter';
/**
 * Base class for Items in the scene. It can be parameterized and can emit events.
 *
 * **Events**
 * * **nameChanged:** Emitted every time the Item's name is change. mostly in `setName` method.
 * * **selectedChanged:** Emitted `selected` status changes, mostly in `setSelected` method.
 *
 * @extends {ParameterOwner}
 */
declare class BaseItem extends ParameterOwner implements Owner {
    protected __name: string;
    protected __ownerItem: Owner | undefined;
    protected __path: string[];
    protected __selectable: boolean;
    protected __selected: boolean;
    protected __metaData: Record<string, any>;
    /**
     * Create a base item by defining its name.
     *
     * @param name - The name of the base item.
     */
    constructor(name?: string);
    /**
     * The getNumBaseItems method returns the total number of base items created.
     * This method is used in debugging memory consumption.
     *
     * @return - Returns the total number of base items created.
     */
    static getNumBaseItems(): number;
    /**
     * Returns the name of the base item.
     *
     * @return - Returns the base item name.
     */
    getName(): string;
    /**
     * Sets the name of the base item(Updates path).
     *
     * @emits `nameChanged` with `newName` and `oldName` data.
     * @param name - The base item name.
     */
    setName(name: string): void;
    /**
     * When the name or the hierarchy changes, this method
     * recomputes and caches the path of this item.
     * @private
     */
    protected updatePath(): void;
    /**
     * Returns the current path of the item in the tree as an array of names.
     *
     * @return - Returns an array.
     */
    getPath(): string[];
    /**
     * The resolvePath method traverses the subtree from this item down
     * matching each name in the path with a child until it reaches the
     * end of the path.
     *
     * @param path - The path value.
     * @param index - The index value.
     * @return - The return value.
     */
    resolvePath(path: string[], index?: number): BaseItem | Parameter<any> | null;
    /**
     * The getOwner method returns the current owner of the item.
     * The item is a child of the current owner.
     *
     * @return - Returns the current owner.
     */
    getOwner(): Owner | undefined;
    /**
     * The setOwner method assigns a new owner to the item.
     *
     * @param ownerItem - The new owner item.
     */
    setOwner(ownerItem: BaseItem | Owner | undefined): void;
    /**
     * Returns a boolean indicating if this item is selectable.
     *
     * @return - Returns a boolean indicating if the item is selectable.
     */
    isSelectable(): boolean;
    /**
     * Modifies the selectability of this item.
     *
     * @param val - A boolean indicating the selectability of the item.
     * @return - Returns true if value changed.
     */
    setSelectable(val: boolean): boolean;
    /**
     * The isSelected method.
     * @return - The return value.
     */
    isSelected(): boolean;
    /**
     * Changes the current state of the selection of this item.
     *
     * @emits `selectedChanged` with selected state
     * @param sel - Boolean indicating the new selection state.
     */
    setSelected(sel: boolean): void;
    /**
     * Gets Item's meta-data value by passing the `key` string.
     *
     * @param key - The key value under which to check for metadata.
     * @return - Returns the metadata associated with the given key.
     */
    getMetadata(key: string): Record<string, any>;
    /**
     * Checks to see if there is metadata for a given key.
     *
     * @param key - The key value under which to check for metadata.
     * @return - Returns `true` if metadata exists under the given key, otherwise returns `false`.
     */
    hasMetadata(key: string): boolean;
    /**
     * Assigns metadata to a given key.
     *
     * @param key - The key value under which the metadata is is going to be saved.
     * @param metaData - The metaData value.
     */
    setMetadata(key: string, metaData: any): void;
    /**
     * Removes metadata for a given key.
     *
     * @param key - The key value.
     */
    deleteMetadata(key: string): void;
    /**
     * Encodes the current object as a json object.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * Decodes a json object for this type.
     *
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json: Record<string, any>, context?: Record<string, any>): void;
    /**
     * Sets state of current Item(Including parameters) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: Record<string, any>): void;
    /**
     * Clones this base item and returns a new base item.
     *
     * **Note:** Each class should implement clone to be clonable.
     * @param context - The context value.
     */
    clone(context?: Record<string, any>): BaseItem;
    /**
     * When a BaseItem is cloned, initially the constructor is
     * called to generate a new instance. This instance then copies
     * its values from the source using this method.
     * This method copies any relevant data from the source object to
     * ensure that it represents a valid clone.
     * Derived classes override this method to copy any relevant
     * data from the source object.
     *
     * @param src - The BaseItem to copy from.
     * @param context - The context value
     */
    copyFrom(src: BaseItem, context?: Record<string, any>): void;
}
export { BaseItem };
