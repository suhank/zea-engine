/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable require-jsdoc */
import { TreeItem } from '../../SceneTree/TreeItem';
import { Registry } from '../../Registry';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores `TreeItem` values.
 *
 * i.e.:
 * ```javascript
 * const treeItem = new TreeItem('tree1')
 * const treeItemParam = new TreeItemParameter('MyTreeItem', treeItem)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(treeItemParam)
 * ```
 *
 * **Events**
 * * **treeItemGlobalXfoChanged:** Triggered when computed world Xfo of parameter's `TreeItem` changes.
 * * **valueChanged:** Triggered when parameter's value changes.
 *
 * @extends Parameter
 */
class TreeItemParameter extends Parameter {
    /**
     * Create a tree item parameter.
     * @param name - The name of the tree item parameter.
     * @param filterFn - The filterFn value.
     */
    constructor(name = '', filterFn) {
        super(name, undefined, 'TreeItem');
        this.listenerIDs = {};
        this.owner = new TreeItem(''); // TODO:(review) should this be initialize by arguments or is this ok?
        this.filterFn = filterFn;
    }
    emitTreeItemGlobalXfoChanged(event) {
        this.emit('treeItemGlobalXfoChanged', event);
    }
    /**
     * Sets parameter value's owner `TreeItem`.
     *
     * @param owner - The owner value.
     */
    setOwner(owner) {
        this.owner = owner;
    }
    /**
     * Returns parameter value's owner `TreeItem`.
     *
     * @return - The return value.
     */
    getOwner() {
        return this.owner;
    }
    /**
     * The setFilterFn method.
     * @param filterFn - The filterFn value.
     */
    setFilterFn(filterFn) {
        this.filterFn = filterFn;
    }
    /**
     * The getFilterFn method.
     * @return - The return value.
     */
    getFilterFn() {
        return this.filterFn;
    }
    /**
     * Sets parameter's `TreeItem` value.
     *
     * @param treeItem - The treeItem value
     * @return - The return value.
     */
    setValue(treeItem) {
        // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if (this.filterFn && !this.filterFn(treeItem))
            return;
        if (this.__value !== treeItem) {
            if (this.__value) {
                this.__value.removeListenerById('globalXfoChanged', this.listenerIDs['globalXfoChanged']);
            }
            this.__value = treeItem;
            if (this.__value) {
                this.listenerIDs['globalXfoChanged'] = this.__value.on('globalXfoChanged', (event) => {
                    this.emitTreeItemGlobalXfoChanged(event);
                });
            }
            this.emit('valueChanged');
        }
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        var _a;
        return {
            value: context.makeRelative((_a = this.__value) === null || _a === void 0 ? void 0 : _a.getPath()),
        };
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        if (j.value == undefined) {
            console.warn('Invalid Parameter JSON');
            return;
        }
        context.resolvePath(j.value, (treeItem) => {
            this.setValue(treeItem);
        }, () => {
            console.warn('Unable to resolve tree item parameter value:' + j.paramPath);
        });
    }
    // ////////////////////////////////////////
    // Clone and Destroy
    /**
     * The clone method constructs a new tree item parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new tree item parameter.
     */
    clone(context) {
        const clonedParam = new TreeItemParameter(this.name, this.filterFn);
        if (this.__value)
            clonedParam.setValue(this.__value.clone(context));
        return clonedParam;
    }
}
Registry.register('TreeItemParameter', TreeItemParameter);
export { TreeItemParameter };
//# sourceMappingURL=TreeItemParameter.js.map