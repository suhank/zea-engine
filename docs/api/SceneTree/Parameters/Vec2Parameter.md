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


**Extends**: <code>Parameter</code>  

* [Vec2Parameter ⇐ <code>Parameter</code>](#Vec2Parameter)
    * [new Vec2Parameter(name, value, range)](#new-Vec2Parameter)
    * [getRange() ⇒ <code>array</code>](#getRange)
    * [clone(flags)](#clone)

<a name="new_Vec2Parameter_new"></a>

### new Vec2Parameter
Create a Vec2 parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Vec2 parameter. |
| value | <code>Vec2</code> | The value of the parameter. |
| range | <code>array</code> | The range value is an array of two `Vec2` objects. |

<a name="Vec2Parameter+getRange"></a>

### getRange
Returns the range of values in which current parameter can be.


**Returns**: <code>array</code> - - The return value.  
<a name="Vec2Parameter+clone"></a>

### clone
The clone method constructs a new Vec2 parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>Vec2Parameter</code>](#Vec2Parameter) - - Returns a new Vec2 parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

