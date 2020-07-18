<a name="Group"></a>

### Group 
Groups are a special type of `TreeItem` that allows you to gather/classify/organize/modify
multiple items contained within the group. Items can be added to the group directly, or using
its path.
All parameters set to the group are also set to the children; in other words, it's a faster way
to apply common things to multiple items.

**Parameters**
* **Items(`ItemSetParameter`):** _todo_
* **Highlighted(`BooleanParameter`):** _todo_
* **HighlightColor(`ColorParameter`):** _todo_
* **HighlightFill(`NumberParameter`):** _todo_
* **Material(`MaterialParameter`):** _todo_
* **CutAwayEnabled(`BooleanParameter`):** _todo_
* **CutPlaneNormal(`Vec3Parameter`):** _todo_
* **CutPlaneDist(`NumberParameter`):** _todo_


**Extends**: <code>TreeItem</code>  

* [Group ⇐ <code>TreeItem</code>](#Group)
    * [new Group(name)](#new-Group)
    * _instance_
        * [setSelected(sel)](#setSelected)
        * [resolveItems(paths)](#resolveItems)
        * [addItem(item, emit)](#addItem)
        * [removeItem(item, emit)](#removeItem)
        * [clearItems(emit)](#clearItems)
        * [getItems() ⇒ <code>array</code>](#getItems)
        * [setItems(items)](#setItems)
        * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
        * [fromJSON(j, context, flags)](#fromJSON)
        * [clone(flags)](#clone)
        * [copyFrom(src, flags)](#copyFrom)
        * [destroy()](#destroy)
    * _static_
        * [INITIAL_XFO_MODES](#INITIAL_XFO_MODES)

<a name="new_Group_new"></a>

### new Group
Creates an instance of a group.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the group. |

<a name="Group+setSelected"></a>

### setSelected
Changes selection's state of the group with all items it owns.



| Param | Type | Description |
| --- | --- | --- |
| sel | <code>boolean</code> | Boolean indicating the new selection state. |

<a name="Group+resolveItems"></a>

### resolveItems
Uses the specified list of paths to look and get each `BaseItem` object and add it to Group's `Items` parameter.



| Param | Type | Description |
| --- | --- | --- |
| paths | <code>array</code> | The paths value. |

<a name="Group+addItem"></a>

### addItem
Adds an item to the group(See `Items` parameter).



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>BaseItem</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="Group+removeItem"></a>

### removeItem
Removes an item from the group(See `Items` parameter).



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>BaseItem</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="Group+clearItems"></a>

### clearItems
Removes all items from the group and kind of returns the object to the default state.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| emit | <code>boolean</code> | <code>true</code> | `true` triggers `valueChanged` event. |

<a name="Group+getItems"></a>

### getItems
Returns the list of `BaseItem` objects owned by the group.


**Returns**: <code>array</code> - - The return value.  
<a name="Group+setItems"></a>

### setItems
Removes old items in current group and adds new ones.



| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> | List of `BaseItem` you want to add to the group |

<a name="Group+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Group+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Group+clone"></a>

### clone
The clone method constructs a new group,
copies its values and returns it.


**Returns**: [<code>Group</code>](#Group) - - Returns a new cloned group.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="Group+copyFrom"></a>

### copyFrom
Copies current Group with all owned items.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>Group</code>](#Group) | The group to copy from. |
| flags | <code>number</code> | The flags value. |

<a name="Group+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


<a name="Group.INITIAL_XFO_MODES"></a>

### INITIAL
Returns enum of available xfo modes.

| Name | Default |
| --- | --- |
| manual | <code>0</code> |
| first | <code>1</code> |
| average | <code>2</code> |
| globalOri | <code>3</code> |


