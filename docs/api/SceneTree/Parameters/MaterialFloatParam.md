<a name="MaterialFloatParam"></a>

### MaterialFloatParam 
Class representing a material float parameter.


**Extends**: <code>NumberParameter</code>  

* [MaterialFloatParam ⇐ <code>NumberParameter</code>](#MaterialFloatParam)
    * [new MaterialFloatParam(name, value, range)](#new-MaterialFloatParam)
    * [getImage() ⇒ <code>any</code>](#getImage)
    * [setImage(value, mode)](#setImage)
    * [setValue(value)](#setValue)
    * [readBinary(reader, context)](#readBinary)
    * [clone(flags)](#clone)

<a name="new_MaterialFloatParam_new"></a>

### new MaterialFloatParam
Create a material float parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material color parameter. |
| value | <code>any</code> | The value of the parameter. |
| range | <code>any</code> | The range value. |

<a name="MaterialFloatParam+getImage"></a>

### getImage
The getImage method.


**Returns**: <code>any</code> - - The return value.  
<a name="MaterialFloatParam+setImage"></a>

### setImage
The setImage method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | The value value. |
| mode | <code>number</code> | <code>0</code> | The mode value. |

<a name="MaterialFloatParam+setValue"></a>

### setValue
The setValue method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="MaterialFloatParam+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="MaterialFloatParam+clone"></a>

### clone
The clone method constructs a new material float parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>MaterialFloatParam</code>](#MaterialFloatParam) - - Returns a new cloned material float parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

