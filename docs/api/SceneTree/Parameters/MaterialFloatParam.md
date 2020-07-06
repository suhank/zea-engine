<a name="MaterialFloatParam"></a>

### MaterialFloatParam 
Represents a specific type of parameter, that stores `number` and `BaseImage` texture values.

i.e.:
```javascript
const image = new LDRImage();
image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")

const numberParam = new MaterialFloatParam('MyMaterialFloat', 15.5)
numberParam.setImage(image)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(numberParam)
```


**Extends**: <code>NumberParameter</code>  

* [MaterialFloatParam ⇐ <code>NumberParameter</code>](#MaterialFloatParam)
    * [new MaterialFloatParam(name, value, range)](#new-MaterialFloatParam)
    * [getImage() ⇒ <code>BaseImage</code>](#getImage)
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
| value | <code>number</code> | The value of the parameter. |
| range | <code>array</code> | An array with two numbers. If defined, the parameter value will be clamped. |

<a name="MaterialFloatParam+getImage"></a>

### getImage
Returns `BaseImage` texture of the Material.


**Returns**: <code>BaseImage</code> - - The return value.  
<a name="MaterialFloatParam+setImage"></a>

### setImage
Sets `BaseImage` texture value in parameter.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>BaseImage</code> |  | The value value. |
| mode | <code>number</code> | <code>0</code> | The mode value. |

<a name="MaterialFloatParam+setValue"></a>

### setValue
Sets `number` or the `BaseImage` texture value in parameter.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value param. |

<a name="MaterialFloatParam+readBinary"></a>

### readBinary
Extracts `number` and `Image` values from a buffer, updating current parameter state.



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

