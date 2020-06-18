<a name="ListParameter"></a>

### ListParameter 
Class representing a list parameter.

**Kind**: global class  
**Extends**: <code>Parameter</code>  

* [ListParameter ⇐ <code>Parameter</code>](#ListParameter)
    * [new ListParameter(name, dataType)](#new-ListParameter)
    * [getCount() ⇒ <code>any</code>](#getCount)
    * [getElement(index) ⇒ <code>any</code>](#getElement)
    * [setElement(index, value)](#setElement)
    * [addElement(elem) ⇒ <code>any</code>](#addElement)
    * [removeElement(index)](#removeElement)
    * [insertElement(index, elem)](#insertElement)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [clone(flags)](#clone)
    * [destroy()](#destroy)

<a name="new_ListParameter_new"></a>

### new ListParameter
Create a list parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the list parameter. |
| dataType | <code>any</code> | The dataType value. |

<a name="ListParameter+getCount"></a>

### getCount
The getCount method.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  
**Returns**: <code>any</code> - - The return value.  
<a name="ListParameter+getElement"></a>

### getElement
The getElement method.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="ListParameter+setElement"></a>

### setElement
The setElement method.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| value | <code>any</code> | The value value. |

<a name="ListParameter+addElement"></a>

### addElement
The addElement method.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>any</code> | The elem value. |

<a name="ListParameter+removeElement"></a>

### removeElement
The removeElement method.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="ListParameter+insertElement"></a>

### insertElement
The insertElement method.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>any</code> | The index value. |
| elem | <code>any</code> | The elem value. |

<a name="ListParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ListParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ListParameter+clone"></a>

### clone
The clone method constructs a new list parameter, copies its values
from this parameter and returns it.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  
**Returns**: [<code>ListParameter</code>](#ListParameter) - - Returns a new list parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="ListParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

**Kind**: instance method of [<code>ListParameter</code>](#ListParameter)  
