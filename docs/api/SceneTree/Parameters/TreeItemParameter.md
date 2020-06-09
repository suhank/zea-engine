<a name="TreeItemParameter"></a>

## TreeItemParameter ⇐ <code>Parameter</code>
Class representing a tree item parameter.

**Kind**: global class  
**Extends**: <code>Parameter</code>  

* [TreeItemParameter ⇐ <code>Parameter</code>](#TreeItemParameter)
    * [new TreeItemParameter(name, filterFn)](#new-TreeItemParameter)
    * [setOwner(owner)](#setOwner)
    * [getOwner() ⇒ <code>any</code>](#getOwner)
    * [setFilterFn(flterFn)](#setFilterFn)
    * [getFilterFn() ⇒ <code>any</code>](#getFilterFn)
    * [setValue(treeItem, mode) ⇒ <code>boolean</code>](#setValue)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [clone(flags)](#clone)
    * [destroy()](#destroy)

<a name="new_TreeItemParameter_new"></a>

### new TreeItemParameter
Create a tree item parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the tree item parameter. |
| filterFn | <code>any</code> | The filterFn value. |

<a name="TreeItemParameter+setOwner"></a>

### setOwner
The setOwner method.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>any</code> | The owner value. |

<a name="TreeItemParameter+getOwner"></a>

### getOwner
The getOwner method.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  
**Returns**: <code>any</code> - - The return value.  
<a name="TreeItemParameter+setFilterFn"></a>

### setFilterFn
The setFilterFn method.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  

| Param | Type | Description |
| --- | --- | --- |
| flterFn | <code>any</code> | The flterFn value. |

<a name="TreeItemParameter+getFilterFn"></a>

### getFilterFn
The getFilterFn method.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  
**Returns**: <code>any</code> - - The return value.  
<a name="TreeItemParameter+setValue"></a>

### setValue
The setValue method.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>any</code> | The treeItem value. |
| mode | <code>number</code> | The mode value. |

<a name="TreeItemParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItemParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="TreeItemParameter+clone"></a>

### clone
The clone method constructs a new tree item parameter, copies its values

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  
**Returns**: [<code>TreeItemParameter</code>](#TreeItemParameter) - - Returns a new tree item parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="TreeItemParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.

**Kind**: instance method of [<code>TreeItemParameter</code>](#TreeItemParameter)  