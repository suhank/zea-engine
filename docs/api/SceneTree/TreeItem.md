<a name="TreeItem"></a>

### TreeItem 
Class representing a tree item in the scene tree.

**Kind**: global class  
**Extends**: <code>BaseItem</code>  

* [TreeItem ⇐ <code>BaseItem</code>](#TreeItem)
    * [new TreeItem(name)](#new-TreeItem)
    * _instance_
        * [boundingBox](#boundingBox)
        * [setFlag(flag)](#setFlag)
        * [setOwner(parentItem)](#setOwner)
        * [getParentItem() ⇒ <code>any</code>](#getParentItem)
        * [setParentItem(parentItem)](#setParentItem)
        * [getLocalXfo() ⇒ <code>Xfo</code>](#getLocalXfo)
        * [setLocalXfo(xfo, mode)](#setLocalXfo)
        * [getGlobalXfo(mode) ⇒ <code>Xfo</code>](#getGlobalXfo)
        * [setGlobalXfo(xfo, mode)](#setGlobalXfo)
        * [getVisible() ⇒ <code>any</code>](#getVisible)
        * [setVisible(val)](#setVisible)
        * [propagateVisiblity(val)](#propagateVisiblity)
        * [addHighlight(name, color, propagateToChildren)](#addHighlight)
        * [removeHighlight(name, propagateToChildren)](#removeHighlight)
        * [getHighlight() ⇒ <code>Color</code>](#getHighlight)
        * [isHighlighted() ⇒ <code>boolean</code>](#isHighlighted)
        * [getBoundingBox() ⇒ <code>Box3</code>](#getBoundingBox)
        * [getChildren()](#getChildren)
        * ~~[.numChildren()](#TreeItem+numChildren) ⇒ <code>number</code>~~
        * [getNumChildren() ⇒ <code>number</code>](#getNumChildren)
        * [generateUniqueName(name) ⇒ <code>string</code>](#generateUniqueName)
        * [insertChild(childItem, index, maintainXfo, fixCollisions) ⇒ <code>number</code>](#insertChild)
        * [addChild(childItem, maintainXfo, fixCollisions) ⇒ <code>number</code>](#addChild)
        * [getChild(index)](#getChild)
        * [getChildByName(name)](#getChildByName)
        * [getChildNames() ⇒ <code>array</code>](#getChildNames)
        * [removeChild(index)](#removeChild)
        * [removeChildByName(name)](#removeChildByName)
        * [removeChildByHandle(childItem)](#removeChildByHandle)
        * [removeAllChildren()](#removeAllChildren)
        * [getChildIndex(childItem) ⇒ <code>object</code>](#getChildIndex)
        * [indexOfChild(childItem) ⇒ <code>any</code>](#indexOfChild)
        * [resolvePath(path, index) ⇒ <code>any</code>](#resolvePath)
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
        * [SaveFlags ⇒ <code>any</code>](#SaveFlags)
        * [LoadFlags ⇒ <code>any</code>](#LoadFlags)
        * [CloneFlags ⇒ <code>any</code>](#CloneFlags)
        * [getSelectionOutlineColor() ⇒ <code>Color</code>](#getSelectionOutlineColor)
        * [setSelectionOutlineColor(color)](#setSelectionOutlineColor)
        * [getBranchSelectionOutlineColor() ⇒ <code>Color</code>](#getBranchSelectionOutlineColor)
        * [setBranchSelectionOutlineColor(color)](#setBranchSelectionOutlineColor)

<a name="new_TreeItem_new"></a>

### new TreeItem
Create a tree item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the tree item. |

<a name="TreeItem+boundingBox"></a>

### boundingBox
Getter for a bounding box.

**Kind**: instance property of [<code>TreeItem</code>](#TreeItem)  
<a name="TreeItem+setFlag"></a>

### setFlag
The setFlag method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag value. |

<a name="TreeItem+setOwner"></a>

### setOwner
Sets the owner of the tree item.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| parentItem | <code>any</code> | The parent item. |

<a name="TreeItem+getParentItem"></a>

### getParentItem
Returns the parent of the tree item.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>any</code> - - Returns the parent item.  
<a name="TreeItem+setParentItem"></a>

### setParentItem
Sets the parent of the tree item.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| parentItem | <code>any</code> | The parent item. |

<a name="TreeItem+getLocalXfo"></a>

### getLocalXfo
Returns the local Xfo transform.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>Xfo</code> - - Returns the local Xfo.  
<a name="TreeItem+setLocalXfo"></a>

### setLocalXfo
Sets the local Xfo transform.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The local xfo transform. |
| mode | <code>number</code> | The mode value. |

<a name="TreeItem+getGlobalXfo"></a>

### getGlobalXfo
Returns the global Xfo transform.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>Xfo</code> - - Returns the global Xfo.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>number</code> | The mode value. |

<a name="TreeItem+setGlobalXfo"></a>

### setGlobalXfo
Sets the global Xfo transform.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The global xfo transform. |
| mode | <code>number</code> | The mode value. |

<a name="TreeItem+getVisible"></a>

### getVisible
The getVisible method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="TreeItem+setVisible"></a>

### setVisible
The setVisible method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | The val param. |

<a name="TreeItem+propagateVisiblity"></a>

### propagateVisiblity
The propagateVisiblity method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | The val param. |

<a name="TreeItem+addHighlight"></a>

### addHighlight
Add a hightlight to the tree item.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the tree item. |
| color | <code>Color</code> |  | The color of the highlight. |
| propagateToChildren | <code>boolean</code> | <code>false</code> | A boolean indicating whether to propagate to children. |

<a name="TreeItem+removeHighlight"></a>

### removeHighlight
Remove a hightlight to the tree item.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the tree item. |
| propagateToChildren | <code>boolean</code> | <code>false</code> | A boolean indicating whether to propagate to children. |

<a name="TreeItem+getHighlight"></a>

### getHighlight
Returns the color of the current hilghlight.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>Color</code> - - The color value.  
<a name="TreeItem+isHighlighted"></a>

### isHighlighted
Returns true if this items has a hilghlight color assigned.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>boolean</code> - - True if this item is hilghlighted.  
<a name="TreeItem+getBoundingBox"></a>

### getBoundingBox
The getBoundingBox method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>Box3</code> - - The return value.  
<a name="TreeItem+getChildren"></a>

### getChildren
The getChildren method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: [<code>TreeItem</code>](#TreeItem) - - The return value.  
<a name="TreeItem+numChildren"></a>

### ~~treeItem.numChildren() ⇒ <code>number</code>~~
***Deprecated***

The numChildren method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>number</code> - - The return value.  
<a name="TreeItem+getNumChildren"></a>

### getNumChildren
The getNumChildren method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>number</code> - - The return value.  
<a name="TreeItem+generateUniqueName"></a>

### generateUniqueName
Generate a unique name.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>string</code> - - Returns a unique name.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="TreeItem+insertChild"></a>

### insertChild
Insert a child TreeItem.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>number</code> - - The index of the child item in this items children array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| childItem | <code>object</code> |  | The child TreeItem to insert. |
| index | <code>number</code> |  | The index to add the child item. |
| maintainXfo | <code>boolean</code> | <code>false</code> | Boolean that determines if the Xfo value is maintained. |
| fixCollisions | <code>boolean</code> | <code>true</code> | Modify the name of the item to avoid name collisions. If false, an exception wll be thrown instead if a name collision occurs. |

<a name="TreeItem+addChild"></a>

### addChild
Add a child TreeItem..

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>number</code> - - The index of the child item in this items children array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| childItem | [<code>TreeItem</code>](#TreeItem) |  | The child TreeItem to add. |
| maintainXfo | <code>boolean</code> | <code>true</code> | Boolean that determines if the Global Xfo value is maintained. If true, when moving items in the hierarchy from one parent to another, the local Xfo of the item will be modified to maintaine and the Global Xfo. Note: this option defaults to false because we expect that is the behavior users would expect when manipulating the tree in code. To be safe and unambiguous, always try to specify this value. |
| fixCollisions | <code>boolean</code> | <code>true</code> | Modify the name of the item to avoid name collisions with other chidrent of the same parent. If false, an exception wll be thrown instead if a name collision occurs. |

<a name="TreeItem+getChild"></a>

### getChild
The getChild method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: [<code>TreeItem</code>](#TreeItem) - - Return the child TreeItem.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index to remove the child TreeItem. |

<a name="TreeItem+getChildByName"></a>

### getChildByName
The getChildByName method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: [<code>TreeItem</code>](#TreeItem) - - Return the child TreeItem.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="TreeItem+getChildNames"></a>

### getChildNames
The getChildNames method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>array</code> - - An array of names for each child.  
<a name="TreeItem+removeChild"></a>

### removeChild
Remove a child tree item.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="TreeItem+removeChildByName"></a>

### removeChildByName
The removeChildByName method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: [<code>TreeItem</code>](#TreeItem) - - Return the child TreeItem.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name param. |

<a name="TreeItem+removeChildByHandle"></a>

### removeChildByHandle
Remove a child tree item by handle.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| childItem | <code>objTreeItemect</code> | The child TreeItem to remove. |

<a name="TreeItem+removeAllChildren"></a>

### removeAllChildren
Remove all child TreeItems.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
<a name="TreeItem+getChildIndex"></a>

### getChildIndex
The getChildIndex method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| childItem | [<code>TreeItem</code>](#TreeItem) | The child TreeItem value. |

<a name="TreeItem+indexOfChild"></a>

### indexOfChild
The indexOfChild method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| childItem | <code>object</code> | The child TreeItem value. |

<a name="TreeItem+resolvePath"></a>

### resolvePath
The resolvePath method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>any</code> |  | The path value. |
| index | <code>number</code> | <code>0</code> | The index value. |

<a name="TreeItem+traverse"></a>

### traverse
Traverse the tree structure from this point down
and fire the callback for each visited item.
Note: Depth only used by selection sets for now.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>any</code> |  | The callback value. |
| includeThis | <code>boolean</code> | <code>true</code> | Fire the callback for this item. |

<a name="TreeItem+onMouseDown"></a>

### onMouseDown
Causes an event to occur when a user presses a mouse button over an element.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseUp"></a>

### onMouseUp
Causes an event to occur when a user releases a mouse button over a element.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseMove"></a>

### onMouseMove
Causes an event to occur when the mouse pointer is moving while over an element.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseEnter"></a>

### onMouseEnter
Causes an event to occur when the mouse pointer is moved onto an element.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onMouseLeave"></a>

### onMouseLeave
Causes an event to occur when the mouse pointer is moved out of an element.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="TreeItem+onWheel"></a>

### onWheel
Causes an event to occur when the mouse wheel is rolled up or down over an element.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>WheelEvent</code> | The wheel event that occurs. |

<a name="TreeItem+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="TreeItem+clone"></a>

### clone
The clone method constructs a new tree item, copies its values
from this item and returns it.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: [<code>TreeItem</code>](#TreeItem) - - Returns a new cloned tree item.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+copyFrom"></a>

### copyFrom
The copyFrom method.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| src | [<code>TreeItem</code>](#TreeItem) | The tree item to copy from. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItem+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

**Kind**: instance method of [<code>TreeItem</code>](#TreeItem)  
<a name="TreeItem.SaveFlags"></a>

### SaveFlags 
Getter for SaveFlags.

**Kind**: static property of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="TreeItem.LoadFlags"></a>

### LoadFlags 
Getter for LoadFlags.

**Kind**: static property of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="TreeItem.CloneFlags"></a>

### CloneFlags 
Getter for CloneFlags.

**Kind**: static property of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="TreeItem.getSelectionOutlineColor"></a>

### getSelectionOutlineColor
Returns the selection outline color.

**Kind**: static method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>Color</code> - - Returns a color.  
<a name="TreeItem.setSelectionOutlineColor"></a>

### setSelectionOutlineColor
Sets the selection outline color.

**Kind**: static method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>Color</code> | The color value. |

<a name="TreeItem.getBranchSelectionOutlineColor"></a>

### getBranchSelectionOutlineColor
Returns the branch selection outline color.

**Kind**: static method of [<code>TreeItem</code>](#TreeItem)  
**Returns**: <code>Color</code> - - Returns a color.  
<a name="TreeItem.setBranchSelectionOutlineColor"></a>

### setBranchSelectionOutlineColor
Sets the branch selection outline color.

**Kind**: static method of [<code>TreeItem</code>](#TreeItem)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>Color</code> | The color value. |

