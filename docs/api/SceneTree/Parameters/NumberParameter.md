<a name="NumberParameter"></a>

### NumberParameter 
Represents a specific type of parameter, that only stores numeric values.

```javascript
const numberParam = new NumberParameter('MyNumber', 15)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(numberParam)
```


**Extends**: <code>[Parameter](api/SceneTree\Parameters\Parameter.md)</code>  

* [NumberParameter ⇐ <code>Parameter</code>](#NumberParameter)
    * [new NumberParameter(name, value, range, step)](#new-NumberParameter)
    * [getRange() ⇒ <code>array</code>](#getRange)
    * [setRange(range)](#setRange)
    * [getStep() ⇒ <code>number</code>](#getStep)
    * [setStep(step)](#setStep)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_NumberParameter_new"></a>

### new NumberParameter
Create a number parameter.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the number parameter. |
| value | <code>number</code> | <code>0</code> | The value of the parameter. |
| range | <code>array</code> |  | An array with two numbers. If defined, the parameter value will be clamped. |
| step | <code>number</code> |  | The step value. If defined, the parameter value will be rounded to the nearest integer. |

<a name="NumberParameter+getRange"></a>

### getRange
Returns the range to which the parameter is restrained.


**Returns**: <code>array</code> - - The return value.  
<a name="NumberParameter+setRange"></a>

### setRange
Sets the range to which the parameter is restrained.



| Param | Type | Description |
| --- | --- | --- |
| range | <code>array</code> | The range value. |

<a name="NumberParameter+getStep"></a>

### getStep
Returns the step number, which is the one used for rounding.


**Returns**: <code>number</code> - - The return value.  
<a name="NumberParameter+setStep"></a>

### setStep
Returns step value.



| Param | Type | Description |
| --- | --- | --- |
| step | <code>number</code> | The step value. |

<a name="NumberParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="NumberParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="NumberParameter+readBinary"></a>

### readBinary
Extracts a number value from a buffer, updating current parameter state.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="NumberParameter+clone"></a>

### clone
The clone method constructs a new number parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>NumberParameter</code>](#NumberParameter) - - Returns a new number parameter.  


### [Class Tests](api/SceneTree\Parameters/NumberParameter.test)