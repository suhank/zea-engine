<a name="BaseGroup"></a>

### BaseGroup 
BaseGroup are a special type of `TreeItem` that allows you to gather/classify/organize/modify
multiple items contained within the group. Items can be added to the group directly, or using
its path.
All parameters set to the group are also set to the children; in other words, it's a faster way
to apply common things to multiple items.

**Parameters**
* **Items([`ItemSetParameter`](api/SceneTree/Parameters/ItemSetParameter.md)):** _todo_


**Extends**: <code>[TreeItem](api/SceneTree/TreeItem.md)</code>  

* [BaseGroup ⇐ <code>TreeItem</code>](#BaseGroup)
    * [new BaseGroup(name)](#new-BaseGroup)
    * [setSearchRoot(treeItem)](#setSearchRoot)
    * [setOwner(ownerItem)](#setOwner)
    * [resolveItems(paths)](#resolveItems)
    * [addItem(item, emit)](#addItem)
    * [removeItem(item, emit)](#removeItem)
    * [clearItems(emit)](#clearItems)
    * [getItems() ⇒ <code>array</code>](#getItems)
    * [setItems(items)](#setItems)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [copyFrom(src, context)](#copyFrom)

<a name="new_BaseGroup_new"></a>

### new BaseGroup
Creates an instance of a group.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the group. |

<a name="BaseGroup+setSearchRoot"></a>

### setSearchRoot
sets the root item to be used as the search root.



| Param | Type |
| --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree/TreeItem.md)</code> | 

<a name="BaseGroup+setOwner"></a>

### setOwner
The setOwner method assigns a new owner to the item. The owner of a group becomes its search root unless another search root is already set.



| Param | Type | Description |
| --- | --- | --- |
| ownerItem | <code>object</code> | The new owner item. |

<a name="BaseGroup+resolveItems"></a>

### resolveItems
Uses the specified list of paths to look and get each `BaseItem` object and add it to BaseGroup's `Items` parameter.



| Param | Type | Description |
| --- | --- | --- |
| paths | <code>array</code> | The paths value. |

<a name="BaseGroup+addItem"></a>

### addItem
Adds an item to the group(See `Items` parameter).



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>[BaseItem](api/SceneTree/BaseItem.md)</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="BaseGroup+removeItem"></a>

### removeItem
Removes an item from the group(See `Items` parameter).



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>[BaseItem](api/SceneTree/BaseItem.md)</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="BaseGroup+clearItems"></a>

### clearItems
Removes all items from the group.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| emit | <code>boolean</code> | <code>true</code> | `true` triggers `valueChanged` event. |

<a name="BaseGroup+getItems"></a>

### getItems
Returns the list of `BaseItem` objects owned by the group.


**Returns**: <code>array</code> - - The return value.  
<a name="BaseGroup+setItems"></a>

### setItems
Sets an entire new array of items to the BaseGroup replacing any previous items.



| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> | List of `BaseItem` you want to add to the group |

<a name="BaseGroup+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="BaseGroup+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="BaseGroup+copyFrom"></a>

### copyFrom
Copies current BaseGroup with all owned items.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>BaseGroup</code>](#BaseGroup) | The group to copy from. |
| context | <code>object</code> | The group to copy from. |



### [Class Tests](api/SceneTree/Groups/BaseGroup.test)