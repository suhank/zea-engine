<a name="StringParameter"></a>

### StringParameter 
Represents a specific type of parameter, that only stores Mat4(4x4 matrix) values.

i.e.:
```javascript
const stringParam = new StringParameter('MyString', 'A String value goes here')
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(stringParam)
```


**Extends**: <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code>  

* [StringParameter ⇐ <code>Parameter</code>](#StringParameter)
    * [new StringParameter(name, value)](#new-StringParameter)
    * [setMultiLine(multiLine)](#setMultiLine)
    * [getMultiLine() ⇒ <code>boolean</code>](#getMultiLine)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_StringParameter_new"></a>

### new StringParameter
Create a string parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material color parameter. |
| value | <code>string</code> | The value of the parameter. |

<a name="StringParameter+setMultiLine"></a>

### setMultiLine
Sets flag that indicates if the string contains new line feeds.



| Param | Type | Description |
| --- | --- | --- |
| multiLine | <code>boolean</code> | The multiLine value. |

<a name="StringParameter+getMultiLine"></a>

### getMultiLine
Returns multi-line flag value.


**Returns**: <code>boolean</code> - - The return value.  
<a name="StringParameter+readBinary"></a>

### readBinary
Extracts the string value from a buffer, updating current parameter state.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree/BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="StringParameter+clone"></a>

### clone
The clone method constructs a new string parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>StringParameter</code>](#StringParameter) - - Returns a new string parameter.  


### [Class Tests](api/SceneTree/Parameters/StringParameter.test)