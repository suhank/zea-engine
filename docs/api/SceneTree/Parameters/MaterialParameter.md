<a name="MaterialParameter"></a>

### MaterialParameter 
Represents a specific type of parameter, that only stores `Material` values.

i.e.:
```javascript
const material = new Material('itemMaterial', 'SimpleSurfaceShader')
material.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

const materialParam = new MaterialParameter('MyMaterial', material)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(materialParam)
```
**Events**
* **valueParameterValueChanged:** Triggered when parameter's value changes.
* **valueChanged:** Triggered when parameter's value changes, except on cleaning processes.


**Extends**: <code>Parameter</code>  

* [MaterialParameter ⇐ <code>Parameter</code>](#MaterialParameter)
    * [new MaterialParameter(name, value)](#new-MaterialParameter)
    * [setValue(material, mode)](#setValue)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [clone(flags)](#clone)
    * [destroy()](#destroy)

<a name="new_MaterialParameter_new"></a>

### new MaterialParameter
Create a material parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material parameter. |
| value | <code>Material</code> | The value of the parameter. |

<a name="MaterialParameter+setValue"></a>

### setValue
Sets `Material` value of the parameter.



| Param | Type | Description |
| --- | --- | --- |
| material | <code>Material</code> | The material param. |
| mode | <code>number</code> | The mode param. |

<a name="MaterialParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="MaterialParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="MaterialParameter+clone"></a>

### clone
The clone method constructs a new material parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>MaterialParameter</code>](#MaterialParameter) - - Returns a new material parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="MaterialParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


