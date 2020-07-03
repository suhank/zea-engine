<a name="BooleanParameter"></a>

### BooleanParameter 
Represents a specific type of parameter, that only stores boolean values.

i.e.:
```javascript
const booleanParam = new BooleanParameter('MyBoolean', true)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(booleanParam)


**Extends**: <code>Parameter</code>  

* [BooleanParameter ⇐ <code>Parameter</code>](#BooleanParameter)
    * [new BooleanParameter(name, value)](#new-BooleanParameter)
    * [clone(flags)](#clone)

<a name="new_BooleanParameter_new"></a>

### new BooleanParameter
Creates a new parameter with `Boolean` data type.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the boolean parameter. |
| value | <code>boolean</code> | The value of the parameter. |

<a name="BooleanParameter+clone"></a>

### clone
The clone method constructs a new boolean parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>BooleanParameter</code>](#BooleanParameter) - - Returns a new cloned boolean parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

