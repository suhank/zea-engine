<a name="InstanceItem"></a>

### InstanceItem 
Class representing an instance item in a scene tree.

**Kind**: global class  
**Extends**: <code>TreeItem</code>  

* [InstanceItem ⇐ <code>TreeItem</code>](#InstanceItem)
    * [new InstanceItem(name)](#new-InstanceItem)
    * [setSrcTree(treeItem)](#setSrcTree)
    * [getSrcTree() ⇒ <code>any</code>](#getSrcTree)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags, onDone)](#fromJSON)

<a name="new_InstanceItem_new"></a>

### new InstanceItem
Create an instance item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the instance item. |

<a name="InstanceItem+setSrcTree"></a>

### setSrcTree
The setSrcTree method.

**Kind**: instance method of [<code>InstanceItem</code>](#InstanceItem)  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>any</code> | The treeItem value. |

<a name="InstanceItem+getSrcTree"></a>

### getSrcTree
The getSrcTree method.

**Kind**: instance method of [<code>InstanceItem</code>](#InstanceItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="InstanceItem+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>InstanceItem</code>](#InstanceItem)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="InstanceItem+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>InstanceItem</code>](#InstanceItem)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>object</code> |  | The context value. |
| flags | <code>number</code> | <code>0</code> | The flags value. |

<a name="InstanceItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>InstanceItem</code>](#InstanceItem)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| j | <code>object</code> |  | The json object this item must decode. |
| context | <code>object</code> |  | The context value. |
| flags | <code>number</code> | <code>0</code> | The flags value. |
| onDone | <code>any</code> |  | The onDone value. |

