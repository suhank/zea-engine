/* eslint-disable no-unused-vars */
import { Color } from '../../Math/index';
import { Registry } from '../../Registry';
import { BooleanParameter, NumberParameter, ColorParameter } from '../Parameters/index';
import { BaseGroup } from './BaseGroup';
import { TreeItem } from '../TreeItem';
import { BaseGeomItem } from '../BaseGeomItem';
/**
 *
 * **Parameters**
 * * **Highlighted(`BooleanParameter`):** _todo_
 * * **HighlightColor(`ColorParameter`):** _todo_
 * * **HighlightFill(`NumberParameter`):** _todo_
 *
 * @extends BaseGroup
 */
class SelectionSet extends BaseGroup {
    /**
     * Creates an instance of a group.
     *
     * @param name - The name of the group.
     */
    constructor(name) {
        super(name);
        /**
         * @member highlightedParam - Whether or not the TreeItem should be highlighted.
         */
        this.highlightedParam = new BooleanParameter('Highlighted', false);
        /**
         * @member highlightColorParam - The color of the highlight.
         */
        this.highlightColorParam = new ColorParameter('HighlightColor', new Color(0.5, 0.5, 1));
        /**
         * @member highlightFillParam - TODO
         */
        this.highlightFillParam = new NumberParameter('HighlightFill', 0.0, [0, 1]);
        this.addParameter(this.highlightedParam);
        this.highlightedParam.on('valueChanged', () => {
            this.updateHighlight();
        });
        this.addParameter(this.highlightColorParam);
        this.highlightColorParam.on('valueChanged', () => {
            this.updateHighlight();
        });
        this.addParameter(this.highlightFillParam);
        this.highlightFillParam.on('valueChanged', () => {
            this.updateHighlight();
        });
    }
    /**
     * The updateVisibility method.
     * @return - The return value.
     * @private
     */
    updateVisibility() {
        if (super.updateVisibility()) {
            const value = this.isVisible();
            Array.from(this.itemsParam.value).forEach((item) => {
                if (item instanceof TreeItem)
                    item.propagateVisibility(value ? 1 : -1);
            });
            return true;
        }
        return false;
    }
    // /////////////////////////////
    /**
     * The updateHighlight method.
     * @private
     */
    updateHighlight() {
        // Make this function async so that we don't pull on the
        // graph immediately when we receive a notification.
        // Note: propagating using an operator would be much better.
        // setTimeout(() => {}, 0)
        // TODO: make async
        this.__updateHighlightHelper();
    }
    /**
     * The updateHighlight method.
     * @private
     */
    __updateHighlightHelper() {
        let highlighted = false;
        let color;
        if (this.highlightedParam.value || this.isSelected()) {
            highlighted = true;
            color = this.highlightColorParam.value;
            color.a = this.highlightFillParam.value;
        }
        const key = 'groupItemHighlight' + this.getId();
        Array.from(this.itemsParam.value).forEach((item) => {
            if (item instanceof TreeItem) {
                if (highlighted)
                    item.addHighlight(key, color, true);
                else
                    item.removeHighlight(key, true);
            }
        });
    }
    /**
     * Changes selection's state of the group with all items it owns.
     *
     * @param sel - Boolean indicating the new selection state.
     */
    setSelected(sel) {
        super.setSelected(sel);
        this.updateHighlight();
    }
    // ////////////////////////////////////////
    // Items
    /**
     * The __bindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    bindItem(item, index) {
        super.bindItem(item, index);
        const listenerIDs = this.__itemsEventHandlers[index];
        if (!(item instanceof TreeItem))
            return;
        // ///////////////////////////////
        // Update the highlight
        if (item instanceof TreeItem && this.highlightedParam.value) {
            const color = this.highlightColorParam.value;
            color.a = this.highlightFillParam.value;
            item.addHighlight('groupItemHighlight' + this.getId(), color, true);
        }
        if (!this.isVisible()) {
            // Decrement the visibility counter which might cause
            // this item to become invisible. (or it might already be invisible.)
            item.propagateVisibility(-1);
        }
        listenerIDs['BoundingBox.valueChanged'] = item.boundingBoxParam.on('valueChanged', (event) => {
            this.setBoundingBoxDirty();
        });
    }
    /**
     * The unbindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    unbindItem(item, index) {
        super.unbindItem(item, index);
        if (!(item instanceof TreeItem))
            return;
        if (this.highlightedParam.value) {
            item.removeHighlight('groupItemHighlight' + this.getId(), true);
        }
        if (!this.isVisible()) {
            // Increment the Visibility counter which might cause
            // this item to become visible.
            // It will stay invisible if its parent is invisible, or if
            // multiple groups connect to it and say it is invisible.
            item.propagateVisibility(1);
        }
        // ///////////////////////////////
        // Update the item cutaway
        item.traverse((treeItem) => {
            if (treeItem instanceof BaseGeomItem) {
                treeItem.setCutawayEnabled(false);
            }
        }, true);
    }
    // ////////////////////////////////////////
    // Clone
    /**
     * The clone method constructs a new group,
     * copies its values and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned group.
     */
    clone(context) {
        const cloned = new SelectionSet(this.__name + ' clone');
        cloned.copyFrom(this, context);
        return cloned;
    }
}
Registry.register('SelectionSet', SelectionSet); // TODO
export { SelectionSet };
//# sourceMappingURL=SelectionSet.js.map