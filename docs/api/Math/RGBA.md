<a name="RGBA"></a>

### RGBA 
Class representing the red, green, blue and alpha channel of a color.


**Extends**: <code>[AttrValue](api/Math/AttrValue.md)</code>  

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
        * [toHex() ⇒ <code>string</code>](#toHex)
        * [equal(other) ⇒ <code>boolean</code>](#equal)
        * [notEquals(other) ⇒ <code>boolean</code>](#notEquals)
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
        * [toCSSString() ⇒ <code>string</code>](#toCSSString)
    * _static_
        * [random(gammaOffset, randomAlpha)](#random)
        * [createFromBuffer(buffer, byteOffset)](#createFromBuffer)

<a name="new_RGBA_new"></a>

### new RGBA
Create a RGBA.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> \| <code>string</code> \| <code>Float32Array</code> \| <code>ArrayBuffer</code> | <code>0</code> | The red channel of a color. |
| g | <code>number</code> | <code>0</code> | The green channel of a color. |
| b | <code>number</code> | <code>0</code> | The blue channel of a color. |
| a | <code>number</code> | <code>255</code> | The alpha (transparency) channel of a color. |

<a name="RGBA+r"></a>

### r 
Getter for red channel.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the red channel.  
<a name="RGBA+r"></a>

### r
Setter for red channel.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+g"></a>

### g 
Getter for green channel.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the green channel.  
<a name="RGBA+g"></a>

### g
Setter for green channel.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+b"></a>

### b 
Getter for blue channel.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the blue channel.  
<a name="RGBA+b"></a>

### b
Setter for blue channel.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+a"></a>

### a 
Getter for alpha channel.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the alpha channel.  
<a name="RGBA+a"></a>

### a
Setter for alpha value.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+set"></a>

### set
Setter from scalar components.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> |  | The red channel. |
| g | <code>number</code> |  | The green channel. |
| b | <code>number</code> |  | The blue channel. |
| a | <code>number</code> | <code>255</code> | The alpha channel. |

<a name="RGBA+setFromOther"></a>

### setFromOther
Setter from another RGBA color.



| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to set from. |

<a name="RGBA+setFromArray"></a>

### setFromArray
Setter from a scalar array.



| Param | Type | Description |
| --- | --- | --- |
| vals | <code>array</code> | The vals param. |

<a name="RGBA+setFromHex"></a>

### setFromHex
Setter from a hexadecimal value.
E.g. #ff0000



| Param | Type | Description |
| --- | --- | --- |
| hex | <code>number</code> | The hex value. |

<a name="RGBA+setFromCSSColorName"></a>

### setFromCSSColorName
Setter from a CSS color name.
E.g. "red"



| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The CSS color name. |

<a name="RGBA+toHex"></a>

### toHex
Returns the hexadecimal value of this RGBA color.


**Returns**: <code>string</code> - - Returns the hex value.  
<a name="RGBA+equal"></a>

### equal
Returns true if this RGBA color is exactly the same as other.


**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |

<a name="RGBA+notEquals"></a>

### notEquals
Returns true if this RGBA color is NOT exactly the same as other.


**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |

<a name="RGBA+approxEqual"></a>

### approxEqual
Returns true if this RGBA color is approximately the same as other.


**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="RGBA+add"></a>

### add
Returns a new RGBA color which is this RGBA color added to other.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to add. |

<a name="RGBA+subtract"></a>

### subtract
Returns a new RGBA color which is this RGBA color subtracted from other.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to subtract. |

<a name="RGBA+scale"></a>

### scale
Returns a new RGBA color which is this vector scaled by scalar.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="RGBA+scaleInPlace"></a>

### scaleInPlace
Scales this RGBA color by scalar.



| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="RGBA+applyGamma"></a>

### applyGamma
Apply gamma correction to this RGBA color.



| Param | Type | Description |
| --- | --- | --- |
| gamma | <code>number</code> | The gamma value. |

<a name="RGBA+toLinear"></a>

### toLinear
Converts to linear color space and returns a new color.


**Returns**: <code>[Color](api/Math/Color.md)</code> - - Returns a new RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="RGBA+toGamma"></a>

### toGamma
Converts to gamma color space and returns a new RGBA color.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="RGBA+luminance"></a>

### luminance
Calculates and returns the relative luminance of the linear RGB component.


**Returns**: <code>number</code> - - The return value.  
<a name="RGBA+lerp"></a>

### lerp
Performs a linear interpolation between this RGBA color and other.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="RGBA+clone"></a>

### clone
Clones this RGBA color and returns a new RGBA color.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  
<a name="RGBA+asArray"></a>

### asArray
Returns the type as an array. Often used to pass types to the GPU.


**Returns**: <code>array</code> - - Returns as an array.  
<a name="RGBA+as3ComponentArray"></a>

### as3ComponentArray
Returns the type as a 3 component array. Often used to pass types to the GPU.


**Returns**: <code>array</code> - - Returns as a 3 component array.  
<a name="RGBA+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - The json object.  
<a name="RGBA+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="RGBA+toCSSString"></a>

### toCSSString
Returns the CSS rgba string.


**Returns**: <code>string</code> - - The return value.  
<a name="RGBA.random"></a>

### random
Creates a random RGBA.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new random RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gammaOffset | <code>number</code> | <code>0</code> | The gamma offset. |
| randomAlpha | <code>boolean</code> | <code>false</code> | Determines whether the alpha channel is random. |

<a name="RGBA.createFromBuffer"></a>

### createFromBuffer
Creates an instance of a `RGBA` using an ArrayBuffer.


**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>ArrayBuffer</code> | The buffer value. |
| byteOffset | <code>number</code> | The offset value. |



### [Class Tests](api/Math/RGBA.test)