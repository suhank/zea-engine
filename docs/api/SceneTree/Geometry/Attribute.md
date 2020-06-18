<a name="Attribute"></a>

### Attribute
Class representing an attribute.



* [Attribute](#Attribute)
    * [new Attribute(dataType, expectedSize, defaultValue)](#new-Attribute)
    * [length ⇒ <code>any</code>](#length)
    * [dataType ⇒ <code>any</code>](#dataType)
    * [data ⇒ <code>any</code>](#data)
    * [data](#data)
    * [numElements ⇒ <code>any</code>](#numElements)
    * [resize(size)](#resize)
    * [initRange(start)](#initRange)
    * [getCount() ⇒ <code>any</code>](#getCount)
    * [getFloat32Value(index) ⇒ <code>any</code>](#getFloat32Value)
    * [setFloat32Value(index, value)](#setFloat32Value)
    * [getValueRef(index) ⇒ <code>any</code>](#getValueRef)
    * [setValue(index, value)](#setValue)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)
    * [toString() ⇒ <code>any</code>](#toString)

<a name="new_Attribute_new"></a>

### new Attribute
Create an attribute.


| Param | Type | Description |
| --- | --- | --- |
| dataType | <code>any</code> | The dataType value. |
| expectedSize | <code>any</code> | The expectedSize value. |
| defaultValue | <code>any</code> | The defaultValue value. |

<a name="Attribute+length"></a>

### length 
Getter for length.


**Returns**: <code>any</code> - - The return value.  
<a name="Attribute+dataType"></a>

### dataType 
Getter for data.


**Returns**: <code>any</code> - - The return value.  
<a name="Attribute+data"></a>

### data 
Getter for data.


**Returns**: <code>any</code> - - The return value.  
<a name="Attribute+data"></a>

### data
Setter for data.



| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | The data value. |

<a name="Attribute+numElements"></a>

### numElements 
Getter for numElements.


**Returns**: <code>any</code> - - The return value.  
<a name="Attribute+resize"></a>

### resize
The resize method.



| Param | Type | Description |
| --- | --- | --- |
| size | <code>any</code> | The size value. |

<a name="Attribute+initRange"></a>

### initRange
The initRange method.



| Param | Type | Description |
| --- | --- | --- |
| start | <code>any</code> | The start value. |

<a name="Attribute+getCount"></a>

### getCount
The getCount method.


**Returns**: <code>any</code> - - The return value.  
<a name="Attribute+getFloat32Value"></a>

### getFloat32Value
The getFloat32Value method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="Attribute+setFloat32Value"></a>

### setFloat32Value
The setFloat32Value method.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| value | <code>any</code> | The value param. |

<a name="Attribute+getValueRef"></a>

### getValueRef
The getValueRef method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="Attribute+setValue"></a>

### setValue
The setValue method.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| value | <code>any</code> | The value param. |

<a name="Attribute+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Attribute+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |

<a name="Attribute+toString"></a>

### toString
The toString method.


**Returns**: <code>any</code> - - The return value.  
