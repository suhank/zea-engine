<a name="TreeItem"></a>

### TreeItem 
Class representing an Item in the scene tree with hierarchy capabilities(has children).
<br>
<br>
**Parameters:**
* **Visible(`BooleanParameter`):** Shows/Hides the item.
* **LocalXfo(`XfoParameter`):**
* **GlobalXfo(`XfoParameter`):**
* **BoundingBox(`BoundingBox`):**

**Events**
* **globalXfoChanged:**
* **visibilityChanged:**
* **highlightChanged:**
* **childAdded:** Emitted when a item is added as a child.
* **childRemoved:** Emitted when an item is removed from the child nodes.
* **mouseDown:** Emitted when a mouseDown event happens in an item.
* **mouseUp:** Emitted when a mouseUp event happens in an item.
* **mouseMove:** Emitted when a mouseMove event happens in an item.
* **mouseEnter:** Emitted when a mouseEnter event happens in an item.


**Extends**: <code>BaseItem</code>  

* [TreeItem ⇐ <code>BaseItem</code>](#TreeItem)
    * [new TreeItem(name)](#new-TreeItem)
    * _instance_
        * [setFlag(flag)](#setFlag)
        * [setOwner(parentItem)](#setOwner)
        * [getParentItem() \| <code>undefined</code>](#getParentItem)
        * [setParentItem(parentItem)](#setParentItem)
        * [getLocalXfo() ⇒ <code>Xfo</code>](#getLocalXfo)
        * [setLocalXfo(xfo, mode)](#setLocalXfo)
        * [getGlobalXfo(mode) ⇒ <code>Xfo</code>](#getGlobalXfo)
        * [setGlobalXfo(xfo, mode)](#setGlobalXfo)
        * [getVisible() ⇒ <code>boolean</code>](#getVisible)
        * [setVisible(val)](#setVisible)
        * [propagateVisiblity(val)](#propagateVisiblity)
        * [addHighlight(name, color, propagateToChildren)](#addHighlight)
        * [removeHighlight(name, propagateToChildren)](#removeHighlight)
        * [getHighlight() ⇒ <code>Color</code>](#getHighlight)
        * [isHighlighted() ⇒ <code>boolean</code>](#isHighlighted)
        * [getChildren() ⇒ <code>array</code>](#getChildren)
        * ~~[.numChildren()](#TreeItem+numChildren) ⇒ <code>number</code>~~
        * [getNumChildren() ⇒ <code>number</code>](#getNumChildren)
        * [generateUniqueName(name) ⇒ <code>string</code>](#generateUniqueName)
        * [insertChild(childItem, index, maintainXfo, fixCollisions) ⇒ <code>number</code>](#insertChild)
        * [addChild(childItem, maintainXfo, fixCollisions) ⇒ <code>number</code>](#addChild)
        * [getChild(index) ⇒ <code>BaseItem</code> \| <code>undefined</code>](#getChild)
        * [getChildByName(name) ⇒ <code>BaseItem</code> \| <code>null</code>](#getChildByName)
        * [getChildNames() ⇒ <code>array</code>](#getChildNames)
        * [removeChild(index)](#removeChild)
        * [removeChildByName(name) ⇒ <code>BaseItem</code>](#removeChildByName)
        * ~~[.removeChildByHandle(childItem)](#TreeItem+removeChildByHandle)~~
        * [removeAllChildren()](#removeAllChildren)
        * [getChildIndex(childItem) ⇒ <code>number</code>](#getChildIndex)
        * ~~[.indexOfChild(childItem)](#TreeItem+indexOfChild) ⇒ <code>number</code>~~
        * [resolvePath(path, index) ⇒ <code>BaseItem</code> \| <code>Parameter</code>](#resolvePath)
        * [traverse(callback, includeThis)](#traverse)
        * [onMouseDown(event)](#onMouseDown)
        * [onMouseUp(event)](#onMouseUp)
        * [onMouseMove(event)](#onMouseMove)
        * [onMouseEnter(event)](#onMouseEnter)
        * [onMouseLeave(event)](#onMouseLeave)
        * [onWheel(event)](#onWheel)
        * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
        * [fromJSON(j, context, flags)](#fromJSON)
        * [readBinary(reader, context)](#readBinary)
        * [clone(flags)](#clone)
        * [copyFrom(src, flags)](#copyFrom)
        * [destroy()](#destroy)
    * _static_
        * [SaveFlags ⇒ <code>object</code>](#SaveFlags)
        * [LoadFlags ⇒ <code>object</code>](#LoadFlags)
        * [CloneFlags ⇒ <code>object</code>](#CloneFlags)
        * [getSelectionOutlineColor() ⇒ <code>Color</code>](#getSelectionOutlineColor)
        * [setSelectionOutlineColor(color)](#setSelectionOutlineColor)
        * [getBranchSelectionOutlineColor() ⇒ <code>Color</code>](#getBranchSelectionOutlineColor)
        * [setBranchSelectionOutlineColor(color)](#setBranchSelectionOutlineColor)

<a name="new_TreeItem_new"></a>

### new TreeItem
Creates a tree item with the specified name.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the tree item. |

<a name="TreeItem+setFlag"></a>

### setFlag
Sets item flag by using an 'OR-assignation' operation then if current item is a child of another item,
flags for the owner item is changed too.



| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag value. |

<a name="TreeItem+setOwner"></a>

### setOwner
Sets the owner(another TreeItem) of the current TreeItem.



| Param | Type | Description |
| --- | --- | --- |
| parentItem | [<code>TreeItem</code>](#TreeItem) | The parent item. |

<a name="TreeItem+getParentItem"></a>

### getParentItem
Returns the parent of current TreeItem.


**Returns**: [<code>TreeItem</code>](#TreeItem) \| <code>undefined</code> - - Returns the parent item.  
<a name="TreeItem+setParentItem"></a>

### setParentItem
Sets the parent of current TreeItem.



| Param | Type | Description |
| --- | --- | --- |
| parentItem | [<code>TreeItem</code>](#TreeItem) | The parent item. |

<a name="TreeItem+getLocalXfo"></a>

### getLocalXfo
Returns the value of local Xfo transform parameter.


**Returns**: <code>Xfo</code> - - Returns the local Xfo.  
<a name="TreeItem+setLocalXfo"></a>

### setLocalXfo
Sets the local Xfo transform parameter.



| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The local xfo transform. |
| mode | <code>number</code> | The mode value. **See:** `ValueSetMode` enum in `Parameter` class. |

<a name="TreeItem+getGlobalXfo"></a>

### getGlobalXfo
Returns the global Xfo transform.


**Returns**: <code>Xfo</code> - - Returns the global Xfo.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>number</code> | The mode value. |

<a name="TreeItem+setGlobalXfo"></a>

### setGlobalXfo
Sets the global Xfo transform.



| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The global xfo transform. |
| mode | <code>number</code> | The mode value. **See:** `ValueSetMode` enum in `Parameter` class. |

<a name="TreeItem+getVisible"></a>

### getVisible
Returns visible parameter value for current TreeItem.


**Returns**: <code>boolean</code> - - The visible param value.  
<a name="TreeItem+setVisible"></a>

### setVisible
Sets visible parameter value.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="TreeItem+propagateVisiblity"></a>

### propagateVisiblity
Updates current TreeItem visible state and propagates its value to children elements.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="TreeItem+addHighlight"></a>

### addHighlight
Adds a hightlight to the tree item.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the tree item. |
| color | <code>Color</code> |  | The color of the highlight. |
| propagateToChildren | <code>boolean</code> | <code>false</code> | A boolean indicating whether to propagate to children. |

<a name="TreeItem+removeHighlight"></a>

### removeHighlight
Removes a hightlight to the tree item.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the tree item. |
| propagateToChildren | <code>boolean</code> | <code>false</code> | A boolean indicating whether to propagate to children. |

<a name="TreeItem+getHighlight"></a>

### getHighlight
Returns the color of the current hilghlight.


**Returns**: <code>Color</code> - - The color value.  
<a name="TreeItem+isHighlighted"></a>

### isHighlighted
Returns `true` if this items has a hilghlight color assigned.


**Returns**: <code>boolean</code> - - `True` if this item is hilghlighted.  
<a name="TreeItem+getChildren"></a>

### getChildren
Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
Meaning that it could be another kind of item than `TreeItem`.
<br>
i.e. **BaseImage**


**Returns**: <code>array</code> - - List of `BaseItem` owned by current TreeItem.  
<a name="TreeItem+numChildren"></a>

### ~~treeItem.numChildren() ⇒ <code>number</code>~~
***Deprecated***

Returns the number of child elements current `TreeItem` has.


**Returns**: <code>number</code> - - The return value.  
<a name="TreeItem+getNumChildren"></a>

### getNumChildren
Returns the number of child elements current `TreeItem` has.


**Returns**: <code>number</code> - - The return value.  
<a name="TreeItem+generateUniqueName"></a>

### generateUniqueName
Verifies if there's a child with the specified name.
If there's one, modifiers are applied to the name and returned.


**Returns**: <code>string</code> - - Returns a unique name.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="TreeItem+insertChild"></a>

### insertChild
Inserts a child. It accepts all kind of `BaseItem`, not only `TreeItem`.


**Returns**: <code>number</code> - - The index of the child item in this items children array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| childItem | <code>BaseItem</code> |  | The child BaseItem to insert. |
| index | <code>number</code> |  | The index to add the child item. |
| maintainXfo | <code>boolean</code> | <code>false</code> | Boolean that determines if the Xfo value is maintained. |
| fixCollisions | <code>boolean</code> | <code>true</code> | Modify the name of the item to avoid name collisions. If false, an exception wll be thrown instead if a name collision occurs. |

<a name="TreeItem+addChild"></a>

### addChild
Adds a child. It accepts all kind of `BaseItem`, not only `TreeItem`.


**Returns**: <code>number</code> - - The index of the child item in this items children array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| childItem | <code>BaseItem</code> |  | The child BaseItem to add. |
| maintainXfo | <code>boolean</code> | <code>true</code> | Boolean that determines if the Global Xfo value is maintained. If true, when moving items in the hierarchy from one parent to another, the local Xfo of the item will be modified to maintaine and the Global Xfo. Note: this option defaults to false because we expect that is the behavior users would expect when manipulating the tree in code. To be safe and unambiguous, always try to specify this value. |
| fixCollisions | <code>boolean</code> | <code>true</code> | Modify the name of the item to avoid name collisions with other chidrent of the same parent. If false, an exception wll be thrown instead if a name collision occurs. |

<a name="TreeItem+getChild"></a>

### getChild
Returns child element in the specified index.


**Returns**: <code>BaseItem</code> \| <code>undefined</code> - - Return the child TreeItem.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index to remove the child TreeItem. |

<a name="TreeItem+getChildByName"></a>

### getChildByName
Returns child element with the specified name.


**Returns**: <code>BaseItem</code> \| <code>null</code> - - Return the child BaseItem.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="TreeItem+getChildNames"></a>

### getChildNames
Returns children names as an array of strings.


**Returns**: <code>array</code> - - An array of names for each child.  
<a name="TreeItem+removeChild"></a>

### removeChild
Removes a child BaseItem by specifying its index.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="TreeItem+removeChildByName"></a>

### removeChildByName
Removes a child BaseItem by specifying its name.


**Returns**: <code>BaseItem</code> - - Return the child TreeItem.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name param. |

<a name="TreeItem+removeChildByHandle"></a>

### ~~treeItem.removeChildByHandle(childItem)~~
***Deprecated***

Remove a child BasItem by passing in actual item object.



| Param | Type | Description |
| --- | --- | --- |
| childItem | <code>BaseItem</code> | The child TreeItem to remove. |

<a name="TreeItem+removeAllChildren"></a>

### removeAllChildren
Removes all children Items.


<a name="TreeItem+getChildIndex"></a>

### getChildIndex
Returns index position of the specified item.


**Returns**: <code>number</code> - - Child index in children array.  

| Param | Type | Description |
| --- | --- | --- |
| childItem | <code>BaseItem</code> | The child TreeItem value. |

<a name="TreeItem+indexOfChild"></a>

### ~~treeItem.indexOfChild(childItem) ⇒ <code>number</code>~~
***Deprecated***

Returns index position of the specified item.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| childItem | <code>object</code> | The child TreeItem value. |

<a name="TreeItem+resolvePath"></a>

### resolvePath
The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.


**Returns**: <code>BaseItem</code> \| <code>Parameter</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>array</code> |  | The path value. |
| index | <code>number</code> | <code>0</code> | The index value. |

<a name="TreeItem+traverse"></a>

### traverse
Traverse the tree structure from this point down
and fire the callback for each visited item.
Note: Depth only used by selection sets for now.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | The callback value. |
| includeThis | <code>boolean</code> | <code>true</code> | Fire the callback for this item. |

<a name="TreeItem+onMouseDown"></a>

### onMouseDown
Causes an event to occur when a user presses a mouse button over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseUp"></a>

### onMouseUp
Causes an event to occur when a user releases a mouse button over a element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseMove"></a>

### onMouseMove
Causes an event to occur when the mouse pointer is moving while over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseEnter"></a>

### onMouseEnter
Causes an event to occur when the mouse pointer is moved onto an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseLeave"></a>

### onMouseLeave
Causes an event to occur when the mouse pointer is moved out of an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onWheel"></a>

### onWheel
Causes an event to occur when the mouse wheel is rolled up or down over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>WheelEvent</code> | The wheel event that occurs. |

<a name="TreeItem+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+readBinary"></a>

### readBinary
Sets state of current Item(Including parameters & children) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>BinReader</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="TreeItem+clone"></a>

### clone
The clone method constructs a new tree item, copies its values
from this item and returns it.


**Returns**: [<code>TreeItem</code>](#TreeItem) - - Returns a new cloned tree item.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+copyFrom"></a>

### copyFrom
Copies current TreeItem with all its children.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>TreeItem</code>](#TreeItem) | The tree item to copy from. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


<a name="TreeItem.SaveFlags"></a>

### SaveFlags 
Returns an ENUM object with save flags options.


**Returns**: <code>object</code> - - The return value.  
<a name="TreeItem.LoadFlags"></a>

### LoadFlags 
Returns an ENUM object with load flags options.


**Returns**: <code>object</code> - - The return value.  
<a name="TreeItem.CloneFlags"></a>

### CloneFlags 
Returns an ENUM object with clone flags options.


**Returns**: <code>object</code> - - The return value.  
<a name="TreeItem.getSelectionOutlineColor"></a>

### getSelectionOutlineColor
Returns the selection outline color.


**Returns**: <code>Color</code> - - Returns a color.  
<a name="TreeItem.setSelectionOutlineColor"></a>

### setSelectionOutlineColor
Sets the selection outline color.



| Param | Type | Description |
| --- | --- | --- |
| color | <code>Color</code> | The color value. |

<a name="TreeItem.getBranchSelectionOutlineColor"></a>

### getBranchSelectionOutlineColor
Returns the branch selection outline color.


**Returns**: <code>Color</code> - - Returns a color.  
<a name="TreeItem.setBranchSelectionOutlineColor"></a>

### setBranchSelectionOutlineColor
Sets the branch selection outline color.



| Param | Type | Description |
| --- | --- | --- |
| color | <code>Color</code> | The color value. |

