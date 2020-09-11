<a name="Vec2Parameter"></a>

### Vec2Parameter 
Represents a specific type of parameter, that only stores Vec2(two-dimensional coordinate) values.

i.e.:
```javascript
const vec2Param = new Vec2Parameter('MyVec2', new Vec2(1.2, 3.4))
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(vec2Param)
```

**Events**
* **rangeChanged:** Triggered when rage array changes.


**Extends**: <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code>  

* [Vec2Parameter ⇐ <code>Parameter</code>](#Vec2Parameter)
    * [new Vec2Parameter(name, value, range)](#new-Vec2Parameter)
    * [getRange() ⇒ <code>array</code>](#getRange)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_Vec2Parameter_new"></a>

### new Vec2Parameter
Create a Vec2 parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Vec2 parameter. |
| value | <code>[Vec2](api/Math/Vec2.md)</code> | The value of the parameter. |
| range | <code>array</code> | The range value is an array of two `Vec2` objects. |

<a name="Vec2Parameter+getRange"></a>

### getRange
Returns the range of values in which current parameter can be.


**Returns**: <code>array</code> - - The return value.  
<a name="Vec2Parameter+readBinary"></a>

### readBinary
Extracts a number value from a buffer, updating current parameter state.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree/BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Vec2Parameter+clone"></a>

### clone
The clone method constructs a new Vec2 parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>Vec2Parameter</code>](#Vec2Parameter) - - Returns a new Vec2 parameter.  


### [Class Tests](api/SceneTree/Parameters/Vec2Parameter.test)