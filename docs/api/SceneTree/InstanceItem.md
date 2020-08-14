<a name="InstanceItem"></a>

### InstanceItem 
TreeItem type of class designed for making duplications of parts of the tree.


**Extends**: <code>TreeItem</code>  

* [InstanceItem ⇐ <code>TreeItem</code>](#InstanceItem)
    * [new InstanceItem(name)](#new-InstanceItem)
    * [setSrcTree(treeItem)](#setSrcTree)
    * [getSrcTree() ⇒ <code>TreeItem</code>](#getSrcTree)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, onDone)](#fromJSON)

<a name="new_InstanceItem_new"></a>

### new InstanceItem
Create an instance item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the instance item. |

<a name="InstanceItem+setSrcTree"></a>

### setSrcTree
Clones passed in `TreeItem` all the way down and adds it as a child of current item.



| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>TreeItem</code> | The treeItem value. |

<a name="InstanceItem+getSrcTree"></a>

### getSrcTree
Returns the last `TreeItem` cloned.


**Returns**: <code>TreeItem</code> - - The return value.  
<a name="InstanceItem+readBinary"></a>

### readBinary
Sets state of current Item(Including cloned item) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>BinReader</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="InstanceItem+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="InstanceItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.


**Todo**

- [ ] Needs to be implemented.


| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| onDone | <code>function</code> | The onDone value. |

