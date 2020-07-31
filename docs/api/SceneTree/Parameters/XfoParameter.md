<a name="XfoParameter"></a>

### XfoParameter 
Represents a specific type of parameter, that only stores `Xfo` transform values.

```javascript
const xfoParam = new XfoParameter('MyXfo', new Xfo(new Vec3(1.2, 3.4, 1)))
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(xfoParam)
```


**Extends**: <code>Parameter</code>  

* [XfoParameter ⇐ <code>Parameter</code>](#XfoParameter)
    * [new XfoParameter(name, value)](#new-XfoParameter)
    * [clone(flags)](#clone)

<a name="new_XfoParameter_new"></a>

### new XfoParameter
Create a Xfo parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Xfo parameter. |
| value | <code>Xfo</code> | The value of the parameter. |

<a name="XfoParameter+clone"></a>

### clone
The clone method constructs a new Xfo parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>XfoParameter</code>](#XfoParameter) - - Returns a new Xfo parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

