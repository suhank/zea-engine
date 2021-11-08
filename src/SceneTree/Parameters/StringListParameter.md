<a name="StringListParameter"></a>

### StringListParameter 
A parameter for storing an array of string values.


**Extends**: <code>[Parameter](api/SceneTree\Parameters\Parameter.md)</code>  

* [StringListParameter ⇐ <code>Parameter</code>](#StringListParameter)
    * [new StringListParameter(name, value)](#new-StringListParameter)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_StringListParameter_new"></a>

### new StringListParameter
Create a string parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material color parameter. |
| value | <code>string</code> | The value of the parameter. |

<a name="StringListParameter+readBinary"></a>

### readBinary
Extracts the string value from a buffer, updating current parameter state.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="StringListParameter+clone"></a>

### clone
The clone method constructs a new string parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>StringListParameter</code>](#StringListParameter) - - Returns a new string parameter.  
