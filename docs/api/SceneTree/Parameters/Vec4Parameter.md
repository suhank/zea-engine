<a name="Vec4Parameter"></a>

### Vec4Parameter 
Represents a specific type of parameter, that only stores Vec3(four-dimensional coordinate) values.

i.e.:
```javascript
const vec4Param = new Vec4Parameter('MyVec4', new Vec4(1.2, 3.4, 1, 4.2))
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(vec4Param)
```


**Extends**: <code>Parameter</code>  

* [Vec4Parameter ⇐ <code>Parameter</code>](#Vec4Parameter)
    * [new Vec4Parameter(name, value)](#new-Vec4Parameter)
    * [clone(flags)](#clone)

<a name="new_Vec4Parameter_new"></a>

### new Vec4Parameter
Create a Vec4 parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Vec4 parameter. |
| value | <code>Vec4</code> | The value of the parameter. |

<a name="Vec4Parameter+clone"></a>

### clone
The clone method constructs a new Vec4 parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>Vec4Parameter</code>](#Vec4Parameter) - - Returns a new Vec4 parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

