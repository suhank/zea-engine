<a name="RGBA"></a>

## RGBA ⇐ <code>AttrValue</code>
Class representing the red, green, blue and alpha channel of a color.

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [RGBA ⇐ <code>AttrValue</code>](#RGBA)
    * [new RGBA(r, g, b, a)](#new-RGBA)
    * _instance_
        * [r](#r)
        * [r](#r)
        * [g](#g)
        * [g](#g)
        * [b](#b)
        * [b](#b)
        * [a](#a)
        * [a](#a)
        * [set(r, g, b, a)](#set)
        * [setFromOther(other)](#setFromOther)
        * [setFromArray(vals)](#setFromArray)
        * [setFromHex(hex)](#setFromHex)
        * [setFromCSSColorName(name)](#setFromCSSColorName)
        * [toHex() ⇒ <code>number</code>](#toHex)
        * [equal(other) ⇒ <code>boolean</code>](#equal)
        * [notequals(other) ⇒ <code>boolean</code>](#notequals)
        * [approxEqual(other, precision) ⇒ <code>boolean</code>](#approxEqual)
        * [add(other)](#add)
        * [subtract(other)](#subtract)
        * [scale(scalar)](#scale)
        * [scaleInPlace(scalar)](#scaleInPlace)
        * [applyGamma(gamma)](#applyGamma)
        * [toLinear(gamma) ⇒ <code>Color</code>](#toLinear)
        * [toGamma(gamma)](#toGamma)
        * [luminance() ⇒ <code>number</code>](#luminance)
        * [lerp(other, t)](#lerp)
        * [clone()](#clone)
        * [asArray() ⇒ <code>array</code>](#asArray)
        * [as3ComponentArray() ⇒ <code>array</code>](#as3ComponentArray)
        * [toJSON() ⇒ <code>object</code>](#toJSON)
        * [fromJSON(j)](#fromJSON)
        * [toCSSString() ⇒ <code>any</code>](#toCSSString)
    * _static_
        * [random(gammaOffset, randomAlpha)](#random)

<a name="new_RGBA_new"></a>

### new RGBA
Create a RGBA.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> | <code>0</code> | The red channel of a color. |
| g | <code>number</code> | <code>0</code> | The green channel of a color. |
| b | <code>number</code> | <code>0</code> | The blue channel of a color. |
| a | <code>number</code> | <code>255</code> | The alpha (transparency) channel of a color. |

<a name="RGBA+r"></a>

### r 
Getter for red channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the red channel.  
<a name="RGBA+r"></a>

### rgbA
Setter for red channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+g"></a>

### g 
Getter for green channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the green channel.  
<a name="RGBA+g"></a>

### rgbA
Setter for green channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+b"></a>

### b 
Getter for blue channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the blue channel.  
<a name="RGBA+b"></a>

### rgbA
Setter for blue channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+a"></a>

### a 
Getter for alpha channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the alpha channel.  
<a name="RGBA+a"></a>

### rgbA
Setter for alpha value.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+set"></a>

### set
Setter from scalar components.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> |  | The red channel. |
| g | <code>number</code> |  | The green channel. |
| b | <code>number</code> |  | The blue channel. |
| a | <code>number</code> | <code>255</code> | The alpha channel. |

<a name="RGBA+setFromOther"></a>

### setFromOther
Setter from another RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to set from. |

<a name="RGBA+setFromArray"></a>

### setFromArray
Setter from a scalar array.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>any</code> | The vals param. |

<a name="RGBA+setFromHex"></a>

### setFromHex
Setter from a hexadecimal value.E.g. #ff0000

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>number</code> | The hex value. |

<a name="RGBA+setFromCSSColorName"></a>

### setFromCSSColorName
Setter from a CSS color name.E.g. "red"

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The CSS color name. |

<a name="RGBA+toHex"></a>

### toHex
Returns the hexadecimal value of this RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>number</code> - - Returns the hex value.  
<a name="RGBA+equal"></a>

### equal
Returns true if this RGBA color is exactly the same as other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |

<a name="RGBA+notequals"></a>

### notequals
Returns true if this RGBA color is NOT exactly the same as other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |

<a name="RGBA+approxEqual"></a>

### approxEqual
Returns true if this RGBA color is approximately the same as other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="RGBA+add"></a>

### add
Returns a new RGBA color which is this RGBA color added to other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to add. |

<a name="RGBA+subtract"></a>

### subtract
Returns a new RGBA color which is this RGBA color subtracted from other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to subtract. |

<a name="RGBA+scale"></a>

### scale
Returns a new RGBA color which is this vector scaled by scalar.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="RGBA+scaleInPlace"></a>

### scaleInPlace
Scales this RGBA color by scalar.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="RGBA+applyGamma"></a>

### applyGamma
Apply gamma correction to this RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| gamma | <code>number</code> | The gamma value. |

<a name="RGBA+toLinear"></a>

### toLinear
Converts to linear color space and returns a new color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>Color</code> - - Returns a new RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="RGBA+toGamma"></a>

### toGamma
Converts to gamma color space and returns a new RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="RGBA+luminance"></a>

### luminance
The luminance method.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>number</code> - - The return value.  
<a name="RGBA+lerp"></a>

### lerp
Performs a linear interpolation between this RGBA color and other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="RGBA+clone"></a>

### clone
Clones this RGBA color and returns a new RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  
<a name="RGBA+asArray"></a>

### asArray
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="RGBA+as3ComponentArray"></a>

### as3ComponentArray
Returns the type as a 3 component array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>array</code> - - Returns as a 3 component array.  
<a name="RGBA+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>object</code> - - The json object.  
<a name="RGBA+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="RGBA+toCSSString"></a>

### toCSSString
The toCSSString method.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>any</code> - - The return value.  
<a name="RGBA.random"></a>

### random
Creates a random RGBA.

**Kind**: static method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new random RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gammaOffset | <code>number</code> | <code>0</code> | The gamma offset. |
| randomAlpha | <code>boolean</code> | <code>false</code> | Determines whether the alpha channel is random. |

