### Classes

<dl>
<dt><a href="#GearParameter">GearParameter</a> ⇐ <code>StructParameter</code></dt>
<dd><p>Class representing a gear parameter.</p>
</dd>
<dt><a href="#GearsOperator">GearsOperator</a> ⇐ <code>Operator</code></dt>
<dd><p>Class representing a gears operator.</p>
</dd>
</dl>

<a name="GearParameter"></a>

### GearParameter 
Class representing a gear parameter.


**Extends**: <code>StructParameter</code>  

* [GearParameter ⇐ <code>StructParameter</code>](#GearParameter)
    * [new GearParameter(name)](#new-GearParameter)
    * [getOutput() ⇒ <code>any</code>](#getOutput)
    * [getRatio() ⇒ <code>number</code>](#getRatio)
    * [getOffset() ⇒ <code>number</code>](#getOffset)
    * [getAxis() ⇒ <code>any</code>](#getAxis)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)

<a name="new_GearParameter_new"></a>

### new GearParameter
Create a gear parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="GearParameter+getOutput"></a>

### getOutput
The getOutput method.


**Returns**: <code>any</code> - - The return value.  
<a name="GearParameter+getRatio"></a>

### getRatio
Getter for the gear ratio.


**Returns**: <code>number</code> - - Returns the ratio.  
<a name="GearParameter+getOffset"></a>

### getOffset
getter for the gear offset.


**Returns**: <code>number</code> - - Returns the offset.  
<a name="GearParameter+getAxis"></a>

### getAxis
The getAxis method.


**Returns**: <code>any</code> - - The return value.  
<a name="GearParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="GearParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="GearsOperator"></a>

### GearsOperator 
Class representing a gears operator.


**Extends**: <code>Operator</code>  

* [GearsOperator ⇐ <code>Operator</code>](#GearsOperator)
    * [new GearsOperator(name)](#new-GearsOperator)
    * [evaluate()](#evaluate)
    * [detach()](#detach)
    * [reattach()](#reattach)
    * [destroy()](#destroy)

<a name="new_GearsOperator_new"></a>

### new GearsOperator
Create a gears operator.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="GearsOperator+evaluate"></a>

### evaluate
The evaluate method.


<a name="GearsOperator+detach"></a>

### detach
The detach method.


<a name="GearsOperator+reattach"></a>

### reattach
The reattach method.


<a name="GearsOperator+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


