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

* **Events**
* **valueChanged:** Triggered every time the Image value changes
* **textureDisconnected:** Triggered when Image value is cleaned/removed.
* **textureConnected:** Triggered when the Image value is set.


**Extends**: <code>[NumberParameter](api/SceneTree/Parameters/NumberParameter.md)</code>  

* [MaterialFloatParam ⇐ <code>NumberParameter</code>](#MaterialFloatParam)
    * [new MaterialFloatParam(name, value, range, step)](#new-MaterialFloatParam)
    * [getImage() ⇒ <code>BaseImage</code>](#getImage)
    * [setImage(value)](#setImage)
    * [setValue(value)](#setValue)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_MaterialFloatParam_new"></a>

### new MaterialFloatParam
Create a material float parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material color parameter. |
| value | <code>number</code> | The value of the parameter. |
| range | <code>array</code> | An array with two numbers. If defined, the parameter value will be clamped. |
| step | <code>number</code> | The increment value that the parameter can be changed by. |

<a name="MaterialFloatParam+getImage"></a>

### getImage
Returns `BaseImage` texture of the Material.


**Returns**: <code>[BaseImage](api/SceneTree/BaseImage.md)</code> - - The return value.  
<a name="MaterialFloatParam+setImage"></a>

### setImage
Sets `BaseImage` texture value in parameter.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>[BaseImage](api/SceneTree/BaseImage.md)</code> | The value value. |

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


### [Class Tests](api/SceneTree/Parameters/MaterialFloatParam.test)