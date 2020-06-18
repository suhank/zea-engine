<a name="Material"></a>

### Material 
Class representing a material in a scene tree.


**Extends**: <code>BaseItem</code>  

* [Material ⇐ <code>BaseItem</code>](#Material)
    * [new Material(name, shaderName)](#new-Material)
    * [getShaderName() ⇒ <code>string</code>](#getShaderName)
    * [setShaderName(shaderName)](#setShaderName)
    * [removeAllTextures()](#removeAllTextures)
    * [getParamTextures() ⇒ <code>object</code>](#getParamTextures)
    * [isTransparent() ⇒ <code>boolean</code>](#isTransparent)
    * [getShaderClass() ⇒ <code>any</code>](#getShaderClass)
    * [modifyParams(paramValues, shaderName)](#modifyParams)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [clone(flags)](#clone)
    * [copyFrom(src, flags)](#copyFrom)
    * [destroy()](#destroy)

<a name="new_Material_new"></a>

### new Material
Create a material


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material. |
| shaderName | <code>string</code> | The name of the shader. |

<a name="Material+getShaderName"></a>

### getShaderName
Getter for the shader name.


**Returns**: <code>string</code> - - Returns the shader name.  
<a name="Material+setShaderName"></a>

### setShaderName
Setter for the shader name.



| Param | Type | Description |
| --- | --- | --- |
| shaderName | <code>string</code> | The shader name. |

<a name="Material+removeAllTextures"></a>

### removeAllTextures
Remove all textures.


<a name="Material+getParamTextures"></a>

### getParamTextures
The getParamTextures method.


**Returns**: <code>object</code> - - The return value.  
<a name="Material+isTransparent"></a>

### isTransparent
Checks if the material is transparent.


**Returns**: <code>boolean</code> - - Returns true if the material is transparent.  
<a name="Material+getShaderClass"></a>

### getShaderClass
The getShaderClass method.


**Returns**: <code>any</code> - - The return value.  
<a name="Material+modifyParams"></a>

### modifyParams
The modifyParams method.



| Param | Type | Description |
| --- | --- | --- |
| paramValues | <code>any</code> | The paramValues. |
| shaderName | <code>string</code> | The shader name. |

<a name="Material+toJSON"></a>

### toJSON
The toJSON method encodes the current object as a json object.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>object</code> |  | The context value. |
| flags | <code>number</code> | <code>0</code> | The flags value. |

<a name="Material+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| j | <code>object</code> |  | The json object this item must decode. |
| context | <code>object</code> |  | The context value. |
| flags | <code>number</code> | <code>0</code> | The flags value. |

<a name="Material+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Material+clone"></a>

### clone
The clone method constructs a new material, copies its values
from this material and returns it.


**Returns**: [<code>Material</code>](#Material) - - Returns a new cloned material.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="Material+copyFrom"></a>

### copyFrom
The copyFrom method.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>Material</code>](#Material) | The material to copy from. |
| flags | <code>number</code> | The flags value. |

<a name="Material+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


