<a name="BooleanParameter"></a>

### BooleanParameter 
Represents a specific type of parameter, that only stores `boolean` values.

i.e.:
```javascript
const booleanParam = new BooleanParameter('MyBoolean', true)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(booleanParam)
```


**Extends**: <code>[Parameter](api/SceneTree\Parameters\Parameter.md)</code>  

* [BooleanParameter ⇐ <code>Parameter</code>](#BooleanParameter)
    * [new BooleanParameter(name, value)](#new-BooleanParameter)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_BooleanParameter_new"></a>

### new BooleanParameter
Creates a new parameter with `Boolean` data type.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the boolean parameter. |
| value | <code>boolean</code> | The value of the parameter. |

<a name="BooleanParameter+readBinary"></a>

### readBinary
Loads the boolean values from the binary buffer.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="BooleanParameter+clone"></a>

### clone
The clone method constructs a new boolean parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>BooleanParameter</code>](#BooleanParameter) - - Returns a new cloned boolean parameter.  


### [Class Tests](api/SceneTree\Parameters/BooleanParameter.test)