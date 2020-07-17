<a name="Mat3Parameter"></a>

### Mat3Parameter 
Represents a specific type of parameter, that only stores Mat3(3x3 matrix) values.

i.e.:
```javascript
const mat3Param = new Ma3Parameter('MyMat3', new Mat3(...args))
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(mat3Param)
```


**Extends**: <code>Parameter</code>  

* [Mat3Parameter ⇐ <code>Parameter</code>](#Mat3Parameter)
    * [new Mat3Parameter(name, value)](#new-Mat3Parameter)
    * [clone(flags)](#clone)

<a name="new_Mat3Parameter_new"></a>

### new Mat3Parameter
Create a Mat3 parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Mat3 parameter. |
| value | <code>Vec3</code> | The value of the parameter. |

<a name="Mat3Parameter+clone"></a>

### clone
The clone method constructs a new Mat3 parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>Mat3Parameter</code>](#Mat3Parameter) - - Returns a new cloned Mat3 parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

