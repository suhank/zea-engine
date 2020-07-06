<a name="MaterialColorParam"></a>

### MaterialColorParam 
Represents a specific type of parameter, that stores `Color` and `BaseImage` texture values.

i.e.:
```javascript
const image = new LDRImage();
image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")

const matColorParam = new MaterialColorParam('MyMaterialColor', new Color(0, 254, 2))
matColorParam.setImage(image)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(matColorParam)
```


**Extends**: <code>ColorParameter</code>  

* [MaterialColorParam ⇐ <code>ColorParameter</code>](#MaterialColorParam)
    * [new MaterialColorParam(name, value)](#new-MaterialColorParam)
    * [getImage() ⇒ <code>BaseImage</code>](#getImage)
    * [setImage(value, mode)](#setImage)
    * [setValue(value)](#setValue)
    * [readBinary(reader, context)](#readBinary)
    * [clone(flags)](#clone)

<a name="new_MaterialColorParam_new"></a>

### new MaterialColorParam
Create a material color parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material color parameter. |
| value | <code>Color</code> | The value of the parameter. |

<a name="MaterialColorParam+getImage"></a>

### getImage
Returns `BaseImage` texture of the Material.


**Returns**: <code>BaseImage</code> - - The return value.  
<a name="MaterialColorParam+setImage"></a>

### setImage
Sets `BaseImage` texture value in parameter.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>BaseImage</code> |  | The value param. |
| mode | <code>number</code> | <code>0</code> | The mode param. |

<a name="MaterialColorParam+setValue"></a>

### setValue
Sets `Color` or the `BaseImage` texture value in parameter.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>BaseImage</code> \| <code>Color</code> | The value param. |

<a name="MaterialColorParam+readBinary"></a>

### readBinary
Extracts `Color` and `Image` values from a buffer, updating current parameter state.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>BinReader</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="MaterialColorParam+clone"></a>

### clone
The clone method constructs a new material color parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>MaterialColorParam</code>](#MaterialColorParam) - - Returns a new cloned material color parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

