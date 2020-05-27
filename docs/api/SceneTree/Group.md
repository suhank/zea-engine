<a name="Group"></a>

## Group ⇐ <code>TreeItem</code>
Class representing a group in the scene tree.

**Kind**: global class  
**Extends**: <code>TreeItem</code>  

* [Group ⇐ <code>TreeItem</code>](#Group)
    * [new Group(name)](#new-Group)
    * _instance_
        * [setSelected(sel)](#setSelected)
        * [calcGroupXfo() ⇒ <code>Xfo</code>](#calcGroupXfo)
        * [setPaths(paths)](#setPaths)
        * [resolveItems(paths)](#resolveItems)
        * [addItem(item, emit)](#addItem)
        * [removeItem(item, emit)](#removeItem)
        * [clearItems(emit)](#clearItems)
        * [getItems() ⇒ <code>any</code>](#getItems)
        * [setItems(items)](#setItems)
        * [onMouseDown(event)](#onMouseDown)
        * [onMouseUp(event)](#onMouseUp)
        * [onMouseMove(event)](#onMouseMove)
        * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
        * [fromJSON(j, context, flags)](#fromJSON)
        * [clone(flags)](#clone)
        * [copyFrom(src, flags)](#copyFrom)
        * [destroy()](#destroy)
    * _static_
        * [INITIAL_XFO_MODES](#INITIAL_XFO_MODES)

<a name="new_Group_new"></a>

### new Group
Create a group.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the group. |

<a name="Group+setSelected"></a>

### setSelected
Returns a boolean indicating if this group is selectable.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| sel | <code>boolean</code> | Boolean indicating the new selection state. |

<a name="Group+calcGroupXfo"></a>

### calcGroupXfo
Calculate the group Xfo translate.

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>Xfo</code> - - Returns a new Xfo.  
<a name="Group+setPaths"></a>

### setPaths
This method is mostly used in our demos,and should be removed from the interface

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| paths | <code>any</code> | The paths value. |

<a name="Group+resolveItems"></a>

### resolveItems
For backwards compatiblity.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| paths | <code>any</code> | The paths value. |

<a name="Group+addItem"></a>

### addItem
Add an item to the group.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>any</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="Group+removeItem"></a>

### removeItem
Remove an item to the group.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>any</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="Group+clearItems"></a>

### clearItems
Clear items from the group.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="Group+getItems"></a>

### getItems
The getItems method.

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>any</code> - - The return value.  
<a name="Group+setItems"></a>

### setItems
The setItems method.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>any</code> | The items value. |

<a name="Group+onMouseDown"></a>

### onMouseDown
Occurs when a user presses a mouse button over an element.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="Group+onMouseUp"></a>

### onMouseUp
Occurs when a user releases a mouse button over an element.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="Group+onMouseMove"></a>

### onMouseMove
Occur when the mouse pointer is moving  while over an element.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="Group+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Group+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Group+clone"></a>

### clone
The clone method constructs a new group,copies its values and returns it.

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - - Returns a new cloned group.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="Group+copyFrom"></a>

### copyFrom
The copyFrom method.

**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Description |
| --- | --- | --- |
| src | [<code>Group</code>](#Group) | The group to copy from. |
| flags | <code>number</code> | The flags value. |

<a name="Group+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.Users should never need to call this method directly.

**Kind**: instance method of [<code>Group</code>](#Group)  
<a name="Group.INITIAL_XFO_MODES"></a>

### INITIAL
Getter for INITIAL_XFO_MODES.

**Kind**: static property of [<code>Group</code>](#Group)  
