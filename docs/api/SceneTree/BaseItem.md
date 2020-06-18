<a name="BaseItem"></a>

### BaseItem 
The base class for the scene tree. A base item has a name and parameters.


**Extends**: <code>ParameterOwner</code>  

* [BaseItem ⇐ <code>ParameterOwner</code>](#BaseItem)
    * [new BaseItem(name)](#new-BaseItem)
    * _instance_
        * [getName() ⇒ <code>string</code>](#getName)
        * [setName(name, mode)](#setName)
        * [getPath() ⇒ <code>array</code>](#getPath)
        * [setFlag(flag)](#setFlag)
        * [clearFlag(flag)](#clearFlag)
        * [testFlag(flag) ⇒ <code>boolean</code>](#testFlag)
        * [resolvePath(path, index) ⇒ <code>any</code>](#resolvePath)
        * [getOwner() ⇒ <code>object</code>](#getOwner)
        * [setOwner(ownerItem)](#setOwner)
        * [getSelectable() ⇒ <code>boolean</code>](#getSelectable)
        * [setSelectable(val) ⇒ <code>boolean</code>](#setSelectable)
        * ~~[.isSelected()](#BaseItem+isSelected) ⇒ <code>boolean</code>~~
        * [getSelected() ⇒ <code>boolean</code>](#getSelected)
        * [setSelected(sel)](#setSelected)
        * [getMetadata(key) ⇒ <code>object</code>](#getMetadata)
        * [hasMetadata(key) ⇒ <code>boolean</code>](#hasMetadata)
        * [setMetadata(key, metaData)](#setMetadata)
        * [deleteMetadata(key)](#deleteMetadata)
        * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
        * [fromJSON(j, context, flags)](#fromJSON)
        * [readBinary(reader, context)](#readBinary)
        * [clone(flags)](#clone)
        * [copyFrom(src, flags)](#copyFrom)
        * [destroy()](#destroy)
    * _static_
        * [getNumBaseItems() ⇒ <code>number</code>](#getNumBaseItems)

<a name="new_BaseItem_new"></a>

### new BaseItem
Create a base item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the base item. |

<a name="BaseItem+getName"></a>

### getName
Returns the name of the base item.


**Returns**: <code>string</code> - - Returns the base item name.  
<a name="BaseItem+setName"></a>

### setName
Sets the name of the base item.



| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The base item name. |
| mode | <code>number</code> | The mode value |

<a name="BaseItem+getPath"></a>

### getPath
Returns the current path of the item in the tree as an array of names.


**Returns**: <code>array</code> - - Returns an array.  
<a name="BaseItem+setFlag"></a>

### setFlag
The setFlag method.



| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | the flag value. |

<a name="BaseItem+clearFlag"></a>

### clearFlag
The clearFlag method.



| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | the flag value. |

<a name="BaseItem+testFlag"></a>

### testFlag
Returns true if the flag if set, otherwise returns false.


**Returns**: <code>boolean</code> - - Returns a boolean indicating if the flag is set.  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag to test. |

<a name="BaseItem+resolvePath"></a>

### resolvePath
The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>any</code> | The path value. |
| index | <code>number</code> | The index value. |

<a name="BaseItem+getOwner"></a>

### getOwner
The getOwner method returns the current owner of the item.
The item is a child of the current owner.


**Returns**: <code>object</code> - - Returns the current owner.  
<a name="BaseItem+setOwner"></a>

### setOwner
The setOwner method assigns a new owner to the item.



| Param | Type | Description |
| --- | --- | --- |
| ownerItem | <code>object</code> | The new owner item. |

<a name="BaseItem+getSelectable"></a>

### getSelectable
The getSelectable method returns a boolean indicating if this item is selectable.


**Returns**: <code>boolean</code> - - Returns a boolean indicating if the item is selectable.  
<a name="BaseItem+setSelectable"></a>

### setSelectable
The setSelectable method modifies the selectability of this item.


**Returns**: <code>boolean</code> - - Returns a boolean.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>boolean</code> | A boolean indicating the selectability of the item. |

<a name="BaseItem+isSelected"></a>

### ~~baseItem.isSelected() ⇒ <code>boolean</code>~~
***Deprecated***

The isSelected method.


**Returns**: <code>boolean</code> - - The return value.  
<a name="BaseItem+getSelected"></a>

### getSelected
The getSelected method returns true if this item has been selected.


**Returns**: <code>boolean</code> - - The current selection state.  
<a name="BaseItem+setSelected"></a>

### setSelected
The getSelected method changes the current state of the selection of this item.



| Param | Type | Description |
| --- | --- | --- |
| sel | <code>boolean</code> | Boolean indicating the new selection state. |

<a name="BaseItem+getMetadata"></a>

### getMetadata
The getMetadata method.


**Returns**: <code>object</code> - - Returns the metadata associated with the given key.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value under which to check for metadata. |

<a name="BaseItem+hasMetadata"></a>

### hasMetadata
The hasMetadata method checks to see if there is metadata for a given key.


**Returns**: <code>boolean</code> - - Returns true if metadata exists under the given key, otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |

<a name="BaseItem+setMetadata"></a>

### setMetadata
The setMetadata method assigns metadata to a given key.



| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |
| metaData | <code>object</code> | The metaData value. |

<a name="BaseItem+deleteMetadata"></a>

### deleteMetadata
The deleteMetadata method removes metadata for a given key.



| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |

<a name="BaseItem+toJSON"></a>

### toJSON
The toJSON method encodes the current object as a json object.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="BaseItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="BaseItem+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="BaseItem+clone"></a>

### clone
Clones this bse item and returns a new base item.
Note: Each class should implement clone to be clonable.



| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="BaseItem+copyFrom"></a>

### copyFrom
When a BaseItem is cloned, initially the constructor is
called to generate a new instance. This instance then copies
its values from the source using this method.
This method copies any relevant data from the source object to
ensure that it represents a valid clone.
Derived classes override this method to copy any relevant
data from the source object.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>BaseItem</code>](#BaseItem) | The BaseItem to copy from. |
| flags | <code>number</code> | The flags value. |

<a name="BaseItem+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


<a name="BaseItem.getNumBaseItems"></a>

### getNumBaseItems
The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.


**Returns**: <code>number</code> - - Returns the total number of base items created.  
