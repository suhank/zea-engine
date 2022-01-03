/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParameterOwner } from './ParameterOwner';
import { BaseEvent } from '../Utilities/BaseEvent';
import { SelectabilityChangedEvent } from '../Utilities/Events/SelectabilityChangedEvent';
import { SelectedEvent } from '../Utilities/Events/SelectedEvent';
let numBaseItems = 0;
class NameChangedEvent extends BaseEvent {
    constructor(oldName, newName) {
        super();
        this.oldName = oldName;
        this.newName = newName;
    }
}
/**
 * Base class for Items in the scene. It can be parameterized and can emit events.
 *
 * **Events**
 * * **nameChanged:** Emitted every time the Item's name is change. mostly in `setName` method.
 * * **selectedChanged:** Emitted `selected` status changes, mostly in `setSelected` method.
 *
 * @extends {ParameterOwner}
 */
class BaseItem extends ParameterOwner {
    /**
     * Create a base item by defining its name.
     *
     * @param name - The name of the base item.
     */
    constructor(name = '') {
        super();
        this.__ownerItem = undefined;
        this.__selectable = true;
        this.__selected = false;
        this.__metaData = {};
        this.__name = name;
        this.__path = [this.__name];
        numBaseItems++;
    }
    // ////////////////////////////////////////
    // Static Methods
    /**
     * The getNumBaseItems method returns the total number of base items created.
     * This method is used in debugging memory consumption.
     *
     * @return - Returns the total number of base items created.
     */
    static getNumBaseItems() {
        return numBaseItems;
    }
    // ////////////////////////////////////////
    // Name and Path
    /**
     * Returns the name of the base item.
     *
     * @return - Returns the base item name.
     */
    getName() {
        return this.__name;
    }
    /**
     * Sets the name of the base item(Updates path).
     *
     * @emits `nameChanged` with `newName` and `oldName` data.
     * @param name - The base item name.
     */
    setName(name) {
        if (this.__name != name) {
            const oldName = this.__name;
            this.__name = name;
            this.updatePath();
            const event = new NameChangedEvent(oldName, name);
            this.emit('nameChanged', event);
        }
    }
    /**
     * When the name or the hierarchy changes, this method
     * recomputes and caches the path of this item.
     * @private
     */
    updatePath() {
        if (this.__ownerItem == undefined)
            this.__path = [this.__name];
        else {
            this.__path = [...this.__ownerItem.getPath(), this.__name];
        }
    }
    /**
     * Returns the current path of the item in the tree as an array of names.
     *
     * @return - Returns an array.
     */
    getPath() {
        return this.__path;
    }
    // Path Traversal
    /**
     * The resolvePath method traverses the subtree from this item down
     * matching each name in the path with a child until it reaches the
     * end of the path.
     *
     * @param path - The path value.
     * @param index - The index value.
     * @return - The return value.
     */
    resolvePath(path, index = 0) {
        if (index == 0) {
            if (path[0] == '.' || path[0] == this.__name)
                index++;
        }
        if (index == path.length) {
            return this;
        }
        if (path[index] == '>' && index == path.length - 1) {
            return this.getParameter(path[index + 1]);
        }
        // Maybe the name is a parameter name.
        const param = this.getParameter(path[index]);
        if (param) {
            return param;
        }
        throw new Error('Invalid path:' + path + '[' + index + '] member not found');
    }
    // ////////////////////////////////////////
    // Owner Item
    /**
     * The getOwner method returns the current owner of the item.
     * The item is a child of the current owner.
     *
     * @return - Returns the current owner.
     */
    getOwner() {
        // return this.__private.get('ownerItem');
        return this.__ownerItem;
    }
    /**
     * The setOwner method assigns a new owner to the item.
     *
     * @param ownerItem - The new owner item.
     */
    setOwner(ownerItem) {
        // this.__private.set(ownerItem, ownerItem);
        if (this.__ownerItem !== ownerItem) {
            this.__ownerItem = ownerItem;
            this.updatePath();
        }
        else if (!ownerItem) {
            this.__ownerItem = undefined;
            this.updatePath();
        }
    }
    // ////////////////////////////////////////
    // Selectability and Selection
    /**
     * Returns a boolean indicating if this item is selectable.
     *
     * @return - Returns a boolean indicating if the item is selectable.
     */
    isSelectable() {
        return this.__selectable;
    }
    /**
     * Modifies the selectability of this item.
     *
     * @param val - A boolean indicating the selectability of the item.
     * @return - Returns true if value changed.
     */
    setSelectable(val) {
        if (this.__selectable != val) {
            this.__selectable = val;
            let event = new SelectabilityChangedEvent(this.__selectable);
            this.emit('selectabilityChanged', event);
            return true;
        }
        return false;
    }
    /**
     * The isSelected method.
     * @return - The return value.
     */
    isSelected() {
        return this.__selected;
    }
    /**
     * Changes the current state of the selection of this item.
     *
     * @emits `selectedChanged` with selected state
     * @param sel - Boolean indicating the new selection state.
     */
    setSelected(sel) {
        this.__selected = sel;
        let event = new SelectedEvent(this.__selected);
        this.emit('selectedChanged', event);
    }
    // ////////////////////////////////////////
    // Metadata
    /**
     * Gets Item's meta-data value by passing the `key` string.
     *
     * @param key - The key value under which to check for metadata.
     * @return - Returns the metadata associated with the given key.
     */
    getMetadata(key) {
        return this.__metaData[key];
    }
    /**
     * Checks to see if there is metadata for a given key.
     *
     * @param key - The key value under which to check for metadata.
     * @return - Returns `true` if metadata exists under the given key, otherwise returns `false`.
     */
    hasMetadata(key) {
        return key in this.__metaData;
    }
    /**
     * Assigns metadata to a given key.
     *
     * @param key - The key value under which the metadata is is going to be saved.
     * @param metaData - The metaData value.
     */
    setMetadata(key, metaData) {
        this.__metaData[key] = metaData;
    }
    /**
     * Removes metadata for a given key.
     *
     * @param key - The key value.
     */
    deleteMetadata(key) {
        delete this.__metaData[key];
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * Encodes the current object as a json object.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        const json = super.toJSON(context);
        json.name = this.__name;
        return json;
    }
    /**
     * Decodes a json object for this type.
     *
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json, context) {
        if (json.name)
            this.__name = json.name;
        super.fromJSON(json, context);
    }
    /**
     * Sets state of current Item(Including parameters) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        // read the type, but don't use it. This line must not be removed.
        // as the binary pointer is incremented.
        /*const type = */ reader.loadStr();
        this.setName(reader.loadStr());
        // Note: parameters follow name...
        super.readBinary(reader, context);
    }
    // ////////////////////////////////////////
    // Clone and Destroy
    /**
     * Clones this base item and returns a new base item.
     *
     * **Note:** Each class should implement clone to be clonable.
     * @param context - The context value.
     */
    clone(context) {
        throw new Error(this.constructor.name + ' does not implement its clone method');
    }
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
    copyFrom(src, context) {
        super.copyFrom(src, context);
        this.setName(src.getName());
        this.setSelectable(src.isSelectable());
    }
}
export { BaseItem };
//# sourceMappingURL=BaseItem.js.map