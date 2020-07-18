<a name="ColorParameter"></a>

### ColorParameter 
Represents a specific type of parameter, that only stores `Color` values.

i.e.:
```javascript
const colorParam = new ColorParameter('MyColor', new Color(0, 254, 2))
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(colorParam)
```


**Extends**: <code>Parameter</code>  

* [ColorParameter ⇐ <code>Parameter</code>](#ColorParameter)
    * [new ColorParameter(name, value)](#new-ColorParameter)
    * [readBinary(reader, context)](#readBinary)
    * [clone(flags)](#clone)

<a name="new_ColorParameter_new"></a>

### new ColorParameter
Create a color parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the color parameter. |
| value | <code>Color</code> | The value of the parameter. |

<a name="ColorParameter+readBinary"></a>

### readBinary
Extracts `Color` values from a buffer, updating current parameter state.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>BinReader</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="ColorParameter+clone"></a>

### clone
The clone method constructs a new color parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>ColorParameter</code>](#ColorParameter) - - Returns a new cloned color parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

