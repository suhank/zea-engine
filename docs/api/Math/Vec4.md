<a name="Vec4"></a>

## Vec4 ⇐ <code>AttrValue</code>
Class representing a Vec4. A Vec4 represents a four-dimensional coordinate.Vector classes in zea-engine internally store values in Float32Arrays andexpose getters and setters for the component values.

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [Vec4 ⇐ <code>AttrValue</code>](#Vec4)
    * [new Vec4(x, y, z, t)](#new-Vec4)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [z](#z)
    * [z](#z)
    * [t](#t)
    * [t](#t)
    * [xyz ⇒ <code>number</code>](#xyz)
    * [set(x, y, z, t)](#set)
    * [setFromOther(other)](#setFromOther)
    * [equal(other) ⇒ <code>boolean</code>](#equal)
    * [notEquals(other) ⇒ <code>boolean</code>](#notEquals)
    * [approxEqual(other, precision) ⇒ <code>boolean</code>](#approxEqual)
    * [add(other)](#add)
    * [addInPlace(other)](#addInPlace)
    * [subtract(other)](#subtract)
    * [subtractInPlace(other)](#subtractInPlace)
    * [multiply(other)](#multiply)
    * [multiplyInPlace(other)](#multiplyInPlace)
    * [divide(other)](#divide)
    * [divideInPlace(other)](#divideInPlace)
    * [scale(scalar)](#scale)
    * [scaleInPlace(scalar)](#scaleInPlace)
    * [length() ⇒ <code>number</code>](#length)
    * [lengthSquared() ⇒ <code>number</code>](#lengthSquared)
    * [normalize()](#normalize)
    * [normalizeInPlace()](#normalizeInPlace)
    * [dot(other) ⇒ <code>number</code>](#dot)
    * [cross(other)](#cross)
    * [angleTo(other) ⇒ <code>number</code>](#angleTo)
    * [lerp(other, t)](#lerp)
    * [random(scale)](#random)
    * [clone()](#clone)
    * [toVec3() ⇒ <code>Vec3</code>](#toVec3)
    * [asArray() ⇒ <code>any</code>](#asArray)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Vec4_new"></a>

### new Vec4
Create a Vec4.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The x value. Default is 0. |
| y | <code>number</code> | <code>0</code> | The y value. Default is 0. |
| z | <code>number</code> | <code>0</code> | The y value. Default is 0. |
| t | <code>number</code> | <code>0</code> | The t value. Default is 0. |

<a name="Vec4+x"></a>

### x 
Getter for x value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the x value.  
<a name="Vec4+x"></a>

### vec4
Setter for x value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+y"></a>

### y 
Getter for y value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the y value.  
<a name="Vec4+y"></a>

### vec4
Setter for y value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+z"></a>

### vec4
Getter for z value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+z"></a>

### vec4
Setter for z value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+t"></a>

### vec4
Getter for t value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+t"></a>

### vec4
Setter for t value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+xyz"></a>

### xyz 
Getter for xy swizzel.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the z value.  
<a name="Vec4+set"></a>

### set
Setter from scalar components.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The y value. |
| t | <code>number</code> | The t value. |

<a name="Vec4+setFromOther"></a>

### setFromOther
Setter from another Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to set from. |

<a name="Vec4+equal"></a>

### equal
Returns true if this Vec4 is exactly the same as other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+notEquals"></a>

### notEquals
Returns true if this Vec4 is NOT exactly the same as other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+approxEqual"></a>

### approxEqual
Returns true if this Vec4 is approximately the same as other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Vec4+add"></a>

### add
Adds other to this Vec4 and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to add. |

<a name="Vec4+addInPlace"></a>

### addInPlace
Adds other to this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to add. |

<a name="Vec4+subtract"></a>

### subtract
Subtracts other from this Vec4 and returns then result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to subtract. |

<a name="Vec4+subtractInPlace"></a>

### subtractInPlace
Subtracts other from this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to subtract. |

<a name="Vec4+multiply"></a>

### multiply
Multiplies two Vec4s and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to multiply with. |

<a name="Vec4+multiplyInPlace"></a>

### multiplyInPlace
Multiplies two Vec4s.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to multiply with. |

<a name="Vec4+divide"></a>

### divide
Divides two Vec4s and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to divide by. |

<a name="Vec4+divideInPlace"></a>

### divideInPlace
Divides two Vec4s.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to divide by. |

<a name="Vec4+scale"></a>

### scale
Scales this Vec4 by scalar and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec4+scaleInPlace"></a>

### scaleInPlace
Scales this Vec4 by scalar.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec4+length"></a>

### length
Calculates the length of this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec4+lengthSquared"></a>

### lengthSquared
Calculates the squared length of this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec4+normalize"></a>

### normalize
Normalizes the Vec4 and returns it as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns the Vec4 normalized.  
<a name="Vec4+normalizeInPlace"></a>

### normalizeInPlace
Normalizes the Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
<a name="Vec4+dot"></a>

### dot
Calculates the dot product of this Vec4 against another Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+cross"></a>

### cross
Calculates the cross product of two Vec4s and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns the cross product as a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to calculate with. |

<a name="Vec4+angleTo"></a>

### angleTo
Gets the angle between this Vec4 and b.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+lerp"></a>

### lerp
Performs a linear interpolation between this Vec4 and other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Vec4+random"></a>

### random
Generates a random vector with the given scale.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | Length of the resulting vector. If ommitted, a unit vector will be returned. |

<a name="Vec4+clone"></a>

### clone
Clones this Vec4 and returns a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  
<a name="Vec4+toVec3"></a>

### toVec3
Converts this Vec4 into a Vec3.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>Vec3</code> - - Returns the value as a new Vec3.  
<a name="Vec4+asArray"></a>

### asArray
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>any</code> - - Returns as an array.  
<a name="Vec4+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>object</code> - - The json object.  
