<a name="ParameterOwner"></a>

### ParameterOwner 
Class representing a parameter owner in the scene tree.


**Extends**: <code>EventEmitter</code>  

* [ParameterOwner ⇐ <code>EventEmitter</code>](#ParameterOwner)
    * [new ParameterOwner()](#new-ParameterOwner)
    * [getId() ⇒ <code>number</code>](#getId)
    * [numParameters() ⇒ <code>number</code>](#numParameters)
    * [getParameters() ⇒ <code>any</code>](#getParameters)
    * [getParameterIndex(paramName) ⇒ <code>any</code>](#getParameterIndex)
    * [getParameterByIndex(index) ⇒ <code>any</code>](#getParameterByIndex)
    * [hasParameter(paramName) ⇒ <code>any</code>](#hasParameter)
    * [getParameter(paramName) ⇒ <code>any</code>](#getParameter)
    * [addParameter(param) ⇒ <code>any</code>](#addParameter)
    * [insertParameter(param, index) ⇒ <code>any</code>](#insertParameter)
    * [removeParameter(paramName)](#removeParameter)
    * [replaceParameter(param) ⇒ <code>any</code>](#replaceParameter)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [toString() ⇒ <code>any</code>](#toString)
    * [copyFrom(src, flags)](#copyFrom)

<a name="new_ParameterOwner_new"></a>

### new ParameterOwner
Creates an instance of ParameterOwner.

<a name="ParameterOwner+getId"></a>

### getId
Returns the unique id of the object. Every Object has a unique
identifier which is based on a counter that is incremented.


**Returns**: <code>number</code> - - The Id of the ParameterOwner object.  
<a name="ParameterOwner+numParameters"></a>

### numParameters
The numParameters method.


**Returns**: <code>number</code> - - The return value.  
<a name="ParameterOwner+getParameters"></a>

### getParameters
The getParameters method.


**Returns**: <code>any</code> - - The return value.  
<a name="ParameterOwner+getParameterIndex"></a>

### getParameterIndex
The getParameterIndex method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | The parameter name. |

<a name="ParameterOwner+getParameterByIndex"></a>

### getParameterByIndex
The getParameterByIndex method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="ParameterOwner+hasParameter"></a>

### hasParameter
The hasParameter method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | The parameter name. |

<a name="ParameterOwner+getParameter"></a>

### getParameter
The getParameter method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | The parameter name. |

<a name="ParameterOwner+addParameter"></a>

### addParameter
Add a parameter.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>any</code> | The paramater to add. |

<a name="ParameterOwner+insertParameter"></a>

### insertParameter
Insert a parameter.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>any</code> | The parameter to insert. |
| index | <code>number</code> | The index value. |

<a name="ParameterOwner+removeParameter"></a>

### removeParameter
Remove a parameter.



| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | The parameter name. |

<a name="ParameterOwner+replaceParameter"></a>

### replaceParameter
Replace a parameter.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>any</code> | The parameter to replace. |

<a name="ParameterOwner+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ParameterOwner+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ParameterOwner+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="ParameterOwner+toString"></a>

### toString
The toString method.


**Returns**: <code>any</code> - - The return value.  
<a name="ParameterOwner+copyFrom"></a>

### copyFrom
The copyFrom method.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>ParameterOwner</code>](#ParameterOwner) | The ParameterOwner copy from. |
| flags | <code>number</code> | The flags value. |

