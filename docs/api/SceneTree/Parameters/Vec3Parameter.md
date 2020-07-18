<a name="Vec3Parameter"></a>

### Vec3Parameter 
Represents a specific type of parameter, that only stores Vec3(three-dimensional coordinate) values.

i.e.:
```javascript
const vec3Param = new Vec3Parameter('MyVec3', new Vec3(1.2, 3.4, 1))
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(vec3Param)
```


**Extends**: <code>Parameter</code>  

* [Vec3Parameter ⇐ <code>Parameter</code>](#Vec3Parameter)
    * [new Vec3Parameter(name, value, range)](#new-Vec3Parameter)
    * [clone(flags)](#clone)

<a name="new_Vec3Parameter_new"></a>

### new Vec3Parameter
Create a Vec3 parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Vec3 parameter. |
| value | <code>Vec3</code> | The value of the parameter. |
| range | <code>array</code> | The range value is an array of two `Vec2` objects. |

<a name="Vec3Parameter+clone"></a>

### clone
The clone method constructs a new Vec3 parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>Vec3Parameter</code>](#Vec3Parameter) - - Returns a new Vec3 parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

