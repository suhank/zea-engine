<a name="MaterialColorParam"></a>

## MaterialColorParam ⇐ <code>ColorParameter</code>
Class representing a material color parameter.

**Kind**: global class  
**Extends**: <code>ColorParameter</code>  

* [MaterialColorParam ⇐ <code>ColorParameter</code>](#MaterialColorParam)
    * [new MaterialColorParam(name, value)](#new-MaterialColorParam)
    * [getImage() ⇒ <code>any</code>](#getImage)
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
| value | <code>any</code> | The value of the parameter. |

<a name="MaterialColorParam+getImage"></a>

### getImage
The getImage method.

**Kind**: instance method of [<code>MaterialColorParam</code>](#MaterialColorParam)  
**Returns**: <code>any</code> - - The return value.  
<a name="MaterialColorParam+setImage"></a>

### setImage
The setImage method.

**Kind**: instance method of [<code>MaterialColorParam</code>](#MaterialColorParam)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | The value param. |
| mode | <code>number</code> | <code>0</code> | The mode param. |

<a name="MaterialColorParam+setValue"></a>

### setValue
The setValue method.

**Kind**: instance method of [<code>MaterialColorParam</code>](#MaterialColorParam)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="MaterialColorParam+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>MaterialColorParam</code>](#MaterialColorParam)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="MaterialColorParam+clone"></a>

### clone
The clone method constructs a new material color parameter,

**Kind**: instance method of [<code>MaterialColorParam</code>](#MaterialColorParam)  
**Returns**: [<code>MaterialColorParam</code>](#MaterialColorParam) - - Returns a new cloned material color parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |
