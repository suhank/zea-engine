<a name="ListParameter"></a>

### ListParameter 
Represents a specific type of parameter, that only stores any type of list values.

i.e.:
```javascript
const listParam = new ListParameter('MyList', [1, 2, 3])
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(listParam)
```

**Events**
* **valueChanged:** Triggered when setting a value changes in the array(insert, add, remove).
* **elementAdded:** Triggered when an element is added to the array(add, insert).
* **elementRemoved:** Triggered when an element is removed from the array


**Extends**: <code>Parameter</code>  

* [ListParameter ⇐ <code>Parameter</code>](#ListParameter)
    * [new ListParameter(name, dataType)](#new-ListParameter)
    * [getCount() ⇒ <code>number</code>](#getCount)
    * [getElement(index) ⇒ <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code>](#getElement)
    * [setElement(index, value)](#setElement)
    * [addElement(elem) ⇒ <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code>](#addElement)
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
| dataType | <code>string</code> | The dataType value. |

<a name="ListParameter+getCount"></a>

### getCount
Returns the count of items in the array.


**Returns**: <code>number</code> - - The return value.  
<a name="ListParameter+getElement"></a>

### getElement
Returns value from the array in the specified index.


**Returns**: <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="ListParameter+setElement"></a>

### setElement
Sets a value in the specified array's index.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| value | <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> | The value value. |

<a name="ListParameter+addElement"></a>

### addElement
Adds a new element at the end of the array pile.


**Returns**: <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> | The elem value. |

<a name="ListParameter+removeElement"></a>

### removeElement
Removes an array element from the specified index



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="ListParameter+insertElement"></a>

### insertElement
Inserts a new element in the specified index.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| elem | <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> | The elem value. |

<a name="ListParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ListParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ListParameter+clone"></a>

### clone
The clone method constructs a new list parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>ListParameter</code>](#ListParameter) - - Returns a new list parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="ListParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


