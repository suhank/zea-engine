<a name="NumberParameter"></a>

## NumberParameter ⇐ <code>Parameter</code>
Class representing a number parameter.

**Kind**: global class  
**Extends**: <code>Parameter</code>  

* [NumberParameter ⇐ <code>Parameter</code>](#NumberParameter)
    * [new NumberParameter(name, value, range, step)](#new-NumberParameter)
    * [setValue(value, mode)](#setValue)
    * [getValue(mode) ⇒ <code>any</code>](#getValue)
    * [getRange() ⇒ <code>any</code>](#getRange)
    * [setRange(range) ⇒ <code>any</code>](#setRange)
    * [getStep() ⇒ <code>any</code>](#getStep)
    * [setStep(step) ⇒ <code>any</code>](#setStep)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [clone(flags)](#clone)

<a name="new_NumberParameter_new"></a>

### new NumberParameter
Create a number parameter.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the number parameter. |
| value | <code>number</code> | <code>0</code> | The value of the parameter. |
| range | <code>any</code> |  | The range value. |
| step | <code>any</code> |  | The step value. |

<a name="NumberParameter+setValue"></a>

### setValue
The setValue method.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |
| mode | <code>number</code> | The mode value. |

<a name="NumberParameter+getValue"></a>

### getValue
The getValue method.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>number</code> | The mode value. |

<a name="NumberParameter+getRange"></a>

### getRange
The getRange method.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  
**Returns**: <code>any</code> - - The return value.  
<a name="NumberParameter+setRange"></a>

### setRange
The setRange method.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>any</code> | The range value. |

<a name="NumberParameter+getStep"></a>

### getStep
The getStep method.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  
**Returns**: <code>any</code> - - The return value.  
<a name="NumberParameter+setStep"></a>

### setStep
The setStep method.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>any</code> | The step value. |

<a name="NumberParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="NumberParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="NumberParameter+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="NumberParameter+clone"></a>

### clone
The clone method constructs a new number parameter, copies its values

**Kind**: instance method of [<code>NumberParameter</code>](#NumberParameter)  
**Returns**: [<code>NumberParameter</code>](#NumberParameter) - - Returns a new number parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |
