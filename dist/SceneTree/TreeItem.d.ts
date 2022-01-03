import { Box3, Color } from '../Math/index';
import { BooleanParameter } from './Parameters/BooleanParameter';
import { XfoParameter } from './Parameters/XfoParameter';
import { BaseItem } from './BaseItem';
import { BoundingBoxParameter } from './Parameters/BoundingBoxParameter';
import { BinReader } from './BinReader';
import { Operator } from './Operators';
import { Parameter } from './Parameters';
import { ZeaPointerEvent } from '../Utilities/Events/ZeaPointerEvent';
import { ZeaWheelEvent } from '../Utilities/Events/ZeaWheelEvent';
import { ZeaTouchEvent } from '../Utilities/Events/ZeaTouchEvent';
import { AssetLoadContext } from './AssetLoadContext';
/**
 * Class representing an Item in the scene tree with hierarchy capabilities (has children).
 * It has the capability to add and remove children.
 * **Parameters**
 * * **Visible(`BooleanParameter`):** Shows/Hides the item.
 * * **LocalXfo(`XfoParameter`):** Specifies the offset of this tree item from its parent.
 * * **GlobalXfo(`XfoParameter`):** Provides the computed world Xfo of this tree item.
 * * **BoundingBox(`BoundingBox`):** Provides the bounding box for the tree item and all of its children in the 3d scene.
 *
 * **Events**
 * * **globalXfoChanged:** Emitted when the value of GlobalXfo parameter changes.
 * * **visibilityChanged:** Emitted when the visibility on the tree item changes.
 * * **highlightChanged:** Emitted when the highlight on the tree item changes.
 * * **childAdded:** Emitted when a item is added as a child.
 * * **childRemoved:** Emitted when an item is removed from the child nodes.
 * * **pointerDown:** Emitted when a pointerDown event happens in an item.
 * * **pointerUp:** Emitted when a pointerUp event happens in an item.
 * * **pointerMove:** Emitted when a pointerMove event happens in an item.
 * * **pointerEnter:** Emitted when a pointerEnter event happens in an item.
 *
 * @extends {BaseItem}
 */
declare class TreeItem extends BaseItem {
    disableBoundingBox: boolean;
    protected __childItems: TreeItem[];
    protected __childItemsEventHandlers: Array<Record<string, number>>;
    protected __childItemsMapping: Record<string, number>;
    /**
     * @member globalXfoParam - Stores the global Xfo for this tree item.
     * global xfos are calculated from the localXfo and parentXfo.
     */
    globalXfoParam: XfoParameter;
    /**
     * @member localXfoParam - Stores the local Xfo for this tree item.
     * local Xfos are the offset from the parent's coordinate frame.
     */
    localXfoParam: XfoParameter;
    /**
     * @member boundingBoxParam - Stores the bounding box for this tree item
     */
    boundingBoxParam: BoundingBoxParameter;
    /**
     * @member visibleParam - Whether this tree item is visible or not.
     * Any given tree item is also is affected by parent's visibility.
     */
    visibleParam: BooleanParameter;
    protected __highlightMapping: Record<string, Color>;
    protected __highlights: Array<string>;
    protected __visible: boolean;
    protected __visibleCounter: number;
    protected globalXfoOp: Operator;
    /**
     * Creates a tree item with the specified name.
     *
     * @param name - The name of the tree item. It's the identifier of the tree item.
     * It's an identifier intended to be human readable.
     * It's included in the path that we use to access a particular item.
     * It's used to display it in the tree.
     */
    constructor(name?: string);
    /**
     * Sets the owner (another TreeItem) of the current TreeItem.
     * @param parentItem - The parent item.
     */
    setOwner(parentItem: TreeItem): void;
    /**
     * The updatePath method.
     * @private
     */
    protected updatePath(): void;
    /**
     * Returns the parent of current TreeItem.
     *
     * @return - Returns the parent item.
     */
    getParentItem(): TreeItem | undefined;
    /**
     * Sets the parent of current TreeItem.
     *
     * @param parentItem - The parent item.
     */
    setParentItem(parentItem: TreeItem): void;
    /**
     * Returns visible parameter value for current TreeItem.
     *
     * @return - The visible param value.
     */
    isVisible(): boolean;
    /**
     * Sets visible parameter value.
     *
     * @param val - The val param.
     */
    setVisible(visible: boolean): void;
    /**
     * Updates current TreeItem visible state and propagates its value to children elements.
     *
     * @param val - The val param.
     */
    propagateVisibility(val: number): void;
    /**
     * The updateVisibility method.
     * @return - Returns a boolean.
     * @private
     */
    protected updateVisibility(): boolean;
    /**
     * Adds a highlight to the tree item.
     *
     * @param name - The name of the tree item.
     * @param color - The color of the highlight.
     * @param propagateToChildren - A boolean indicating whether to propagate to children.
     */
    addHighlight(name: string, color: Color, propagateToChildren?: boolean): void;
    /**
     * Removes a highlight to the tree item.
     *
     * @param name - The name of the tree item.
     * @param propagateToChildren - A boolean indicating whether to propagate to children.
     */
    removeHighlight(name: string, propagateToChildren?: boolean): void;
    /**
     * Returns the color of the current highlight.
     *
     * @return - The color value.
     */
    getHighlight(): Color;
    /**
     * Returns `true` if this items has a highlight color assigned.
     *
     * @return - `True` if this item is highlighted.
     */
    isHighlighted(): boolean;
    /**
     * The _cleanBoundingBox method.
     * @param bbox - The bounding box value.
     * @return - The return value.
     * @private
     */
    _cleanBoundingBox(bbox: Box3): Box3;
    /**
     * The _childBBoxChanged method.
     * @private
     */
    protected childBBoxChanged(): void;
    /**
     * The setBoundingBoxDirty method.
     * @private
     */
    protected setBoundingBoxDirty(): void;
    /**
     * Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
     * Meaning that it could be another kind of item than `TreeItem`.
     *
     * i.e. **BaseImage**
     *
     * @return - List of `TreeItem` owned by current TreeItem.
     */
    getChildren(): TreeItem[];
    /**
     * Returns the number of child elements current `TreeItem` has.
     *
     * @return - The return value.
     */
    getNumChildren(): number;
    /**
     * Verifies if there's a child with the specified name.
     * If there's one, modifiers are applied to the name and returned.
     *
     * @param name - The name value.
     * @return - Returns a unique name.
     */
    generateUniqueName(name: string): string;
    /**
     * Updates the internal acceleration structure that speeds up looking up children by name.
     * @param start - The start value.
     * @private
     */
    protected updateChildNameMapping(start: number): void;
    /**
     * When a child's name changed, we update our acceleration structure.
     * @param event - The start value.
     * @private
     */
    protected childNameChanged(event: Record<string, any>): void;
    /**
     * Inserts a child. It accepts all kind of `TreeItem`, not only `TreeItem`.
     *
     * @param childItem - The child TreeItem to insert.
     * @param index - The index to add the child item.
     * @param maintainXfo - Boolean that determines if the Xfo value is maintained.
     * @param fixCollisions - Modify the name of the item to avoid name collisions.
     * If false, an exception wll be thrown instead if a name collision occurs.
     * @return - The index of the child item in this items children array.
     */
    insertChild(childItem: TreeItem, index: number, maintainXfo?: boolean, fixCollisions?: boolean): TreeItem;
    /**
     * Adds a child.
     *
     * @param childItem - The child TreeItem to add.
     * @param maintainXfo - Boolean that determines if
     * the Global Xfo value is maintained. If true, when moving
     * items in the hierarchy from one parent to another, the local Xfo
     * of the item will be modified to maintain and the Global Xfo.
     * Note: this option defaults to false because we expect that is the
     * behavior users would expect when manipulating the tree in code.
     * To be safe and unambiguous, always try to specify this value.
     * @param fixCollisions - Modify the name of the item to avoid
     * name collisions with other children of the same parent.
     * If false, an exception wll be thrown instead if a name collision occurs.
     * @return childItem - The child TreeItem that was added.
     */
    addChild(childItem: TreeItem, maintainXfo?: boolean, fixCollisions?: boolean): TreeItem;
    /**
     * Returns child element in the specified index.
     *
     * @param index - The index to remove the child TreeItem.
     * @return - Return the child TreeItem.
     */
    getChild(index: number): TreeItem;
    /**
     * Returns child element with the specified name.
     *
     * @param name - The name value.
     * @return - Return the child TreeItem.
     */
    getChildByName(name: string): TreeItem | null;
    /**
     * Returns children names as an array of strings.
     *
     * @return - An array of names for each child.
     */
    getChildNames(): string[];
    /**
     * UnBind an item from the group. This method is called
     * automatically when an item is removed from the group.
     * @param index - The index value.
     * @param childItem - item to unbind.
     * @private
     */
    protected unbindChild(index: number, childItem: TreeItem): void;
    /**
     * Removes a child TreeItem by specifying its index.
     *
     * @param index - The index value.
     */
    removeChild(index: number): void;
    /**
     * Removes a child TreeItem by specifying its name.
     *
     * @param name - The name param.
     * @return - Return the child TreeItem.
     */
    removeChildByName(name: string): void;
    /**
     * Removes the provided item from this TreeItem if it is one of its children.
     * An exception is thrown if the item is not a child of this tree item.
     *
     * @param childItem - The child TreeItem to remove.
     */
    removeChildByHandle(childItem: TreeItem): void;
    /**
     * Removes all children Items.
     */
    removeAllChildren(): void;
    /**
     * Returns index position of the specified item.
     *
     * @param childItem - The child TreeItem value.
     * @return - Child index in children array.
     */
    getChildIndex(childItem: TreeItem): number;
    /**
     * The resolvePath method traverses the subtree from this item down
     * matching each name in the path with a child until it reaches the
     * end of the path.
     *
     * @param path - The path value.
     * @param index - The index value.
     * @return - The return value.
     */
    resolvePath(path: string | string[], index?: number, displayError?: boolean): BaseItem | Parameter<any> | null;
    /**
     * Traverse the tree structure from this point down
     * and fire the callback for each visited item.
     * Note: Depth only used by selection sets for now.
     *
     * @param callback - The callback value.
     * @param includeThis - Fire the callback for this item.
     */
    traverse(callback: (treeItem: TreeItem, depth: number) => unknown, includeThis?: boolean): void;
    /**
     * Called by the Viewport when events are received by the canvas element.
     * The event is propagated to a TreeItem if it is under the pointer at the time.
     * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
     * This method emits the ZeaPointerEvent with the key 'pointerDown', and
     * propagates it up to the TreeItem's owner.
     *
     * @param event - The event value
     */
    onPointerDown(event: ZeaPointerEvent): void;
    /**
     * Called by the Viewport when events are received by the canvas element.
     * The event is propagated to a TreeItem if it is under the pointer at the time.
     * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
     * This method emits the ZeaPointerEvent with the key 'pointerDown', and
     * propagates it up to the TreeItem's owner.
     *
     * @param event - The pointer event that was generated from the user interaction
     */
    onPointerUp(event: ZeaPointerEvent): void;
    /**
     * Called by the Viewport when events are received by the canvas element.
     * The event is propagated to a TreeItem if it is under the pointer at the time.
     * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
     * This method emits the ZeaPointerEvent with the key 'pointerMove', and
     * propagates it up to the TreeItem's owner.
     *
     * @param event - The pointer event that was generated from the user interaction
     */
    onPointerMove(event: ZeaPointerEvent): void;
    /**
     * Called by the Viewport when the mouse or other pointer enters the canvas element.
     * The event is propagated to a TreeItem if it is under the pointer at the time.
     * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
     * This method emits the ZeaPointerEvent with the key 'pointerEnter', and
     * propagates it up to the TreeItem's owner.
     *
     * @param event - The pointer event that was generated from the user interaction
     */
    onPointerEnter(event: ZeaPointerEvent): void;
    /**
     * Called by the Viewport when the mouse or other pointer leaves the canvas element.
     * The event is propagated to a TreeItem if it is under the pointer at the time.
     * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
     * This method emits the ZeaPointerEvent with the key 'pointerLeave', and
     * propagates it up to the TreeItem's owner.
     *
     * @param event - The pointer event that was generated from the user interaction
     */
    onPointerLeave(event: ZeaPointerEvent): void;
    /**
     * Called by the Viewport when the mouse wheel event is received by the canvas element.
     * Emits the ZeaWheelEvent with the key 'mouseWheel', and Propagates is up to the TreeItem's owner.
     *
     * @param event - The wheel event that occurs.
     */
    onWheel(event: ZeaWheelEvent): void;
    /**
     * Called by the Viewport when the touch cancel event is received by the canvas element.
     * Emits the ZeaTouchEvent with the key 'touchCancel', and Propagates is up to the TreeItem's owner.
     *
     * @param event - The wheel event that occurs.
     */
    onTouchCancel(event: ZeaTouchEvent): void;
    /**
     * The toJSON method serializes this instance as a JSON.
     * It can be used for persistence, data transfer, etc.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method takes a JSON and deserializes into an instance of this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>, onDone?: any): void;
    /**
     * Sets state of current Item(Including parameters & children) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
    /**
     * The clone method constructs a new tree item, copies its values
     * from this item and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned tree item.
     */
    clone(context?: Record<string, unknown>): TreeItem;
    /**
     * Copies current TreeItem with all its children.
     *
     * @param src - The tree item to copy from.
     * @param context - The context value.
     */
    copyFrom(src: TreeItem, context?: Record<string, any>): void;
}
export { TreeItem };
