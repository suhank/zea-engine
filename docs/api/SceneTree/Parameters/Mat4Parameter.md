<a name="Mat4Parameter"></a>

### Mat4Parameter 
Represents a specific type of parameter, that only stores Mat4(4x4 matrix) values.

i.e.:
```javascript
const mat4Param = new Ma3Parameter('MyMat4', new Mat4(...args))
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(mat4Param)
```


**Extends**: <code>Parameter</code>  

* [Mat4Parameter ⇐ <code>Parameter</code>](#Mat4Parameter)
    * [new Mat4Parameter(name, value)](#new-Mat4Parameter)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_Mat4Parameter_new"></a>

### new Mat4Parameter
Create a Mat4 parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Mat4 parameter. |
| value | <code>Mat4</code> | The value of the parameter. |

<a name="Mat4Parameter+readBinary"></a>

### readBinary
Extracts a number value from a buffer, updating current parameter state.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>BinReader</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Mat4Parameter+clone"></a>

### clone
The clone method constructs a new Mat4 parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>Mat4Parameter</code>](#Mat4Parameter) - - Returns a new cloned Mat4 parameter.  
