<a name="Attribute"></a>

### Attribute
Class representing an attribute.



* [Attribute](#Attribute)
    * [new Attribute(dataType, expectedSize, defaultValue)](#new-Attribute)
    * [length ⇒ <code>number</code>](#length)
    * [dataType ⇒ <code>AttrValue</code> \| <code>number</code>](#dataType)
    * [data ⇒ <code>TypedArray</code>](#data)
    * [data](#data)
    * [numElements ⇒ <code>number</code>](#numElements)
    * [resize(size)](#resize)
    * [initRange(start)](#initRange)
    * [getCount() ⇒ <code>number</code>](#getCount)
    * [getFloat32Value(index) ⇒ <code>number</code>](#getFloat32Value)
    * [setFloat32Value(index, value)](#setFloat32Value)
    * [getValueRef(index) ⇒ <code>AttrValue</code>](#getValueRef)
    * [setValue(index, value)](#setValue)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_Attribute_new"></a>

### new Attribute
Create an attribute.


| Param | Type | Description |
| --- | --- | --- |
| dataType | <code>AttrValue</code> \| <code>number</code> | The dataType value. |
| expectedSize | <code>number</code> \| <code>TypedArray</code> | The expectedSize value. |
| defaultValue | <code>number</code> | The defaultValue value. |

<a name="Attribute+length"></a>

### length 
Returns the count of attribute values in the data.


**Returns**: <code>number</code> - - The return value.  
<a name="Attribute+dataType"></a>

### dataType 
Returns the type of attribute value.


**Returns**: <code>AttrValue</code> \| <code>number</code> - - The return value.  
<a name="Attribute+data"></a>

### data 
Returns current data array.


**Returns**: <code>TypedArray</code> - - The return value.  
<a name="Attribute+data"></a>

### data
Sets data value.



| Param | Type | Description |
| --- | --- | --- |
| data | <code>TypedArray</code> | The data value. |

<a name="Attribute+numElements"></a>

### numElements 
Returns the number of elements stored in each `AttrValue`.


**Returns**: <code>number</code> - - The return value.  
<a name="Attribute+resize"></a>

### resize
Resizes current data array to to a new size.
In case the new size is bigger than current size, the new values are filled up with default ones.



| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The size value. |

<a name="Attribute+initRange"></a>

### initRange
Fills up data values with default ones starting from the specified index.



| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | The start value. |

<a name="Attribute+getCount"></a>

### getCount
Returns the count of attribute values in the data.


**Returns**: <code>number</code> - - The return value.  
<a name="Attribute+getFloat32Value"></a>

### getFloat32Value
Returns data value of the specified index.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="Attribute+setFloat32Value"></a>

### setFloat32Value
Sets data value in the specified index.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| value | <code>number</code> | The value param. |

<a name="Attribute+getValueRef"></a>

### getValueRef
Returns the `AttrValue` object placed in the specified index.


**Returns**: <code>AttrValue</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="Attribute+setValue"></a>

### setValue
Sets `AttrValue` object in the specified index.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| value | <code>AttrValue</code> | The value param. |

<a name="Attribute+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="Attribute+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |

<a name="Attribute+toString"></a>

### toString
Returns the string representation of the object's state.


**Returns**: <code>string</code> - - The return value.  
