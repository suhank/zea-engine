<a name="Vec2"></a>

## Vec2 ⇐ <code>AttrValue</code>
Representing a Vec2(two-dimensional floating point vector).

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [Vec2 ⇐ <code>AttrValue</code>](#Vec2)
    * [new Vec2(x, y)](#new-Vec2)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [set(x, y)](#set)
    * [setFromOther(other)](#setFromOther)
    * [equal(other) ⇒ <code>boolean</code>](#equal)
    * [notEquals(other) ⇒ <code>boolean</code>](#notEquals)
    * [approxEqual(other, precision) ⇒ <code>boolean</code>](#approxEqual)
    * [add(other)](#add)
    * [addInPlace(other)](#addInPlace)
    * [subtract(other)](#subtract)
    * [subtractInPlace(other)](#subtractInPlace)
    * [scale(scalar)](#scale)
    * [scaleInPlace(scalar)](#scaleInPlace)
    * [invert()](#invert)
    * [invertInPlace()](#invertInPlace)
    * [multiply(other)](#multiply)
    * [multiplyInPlace(other)](#multiplyInPlace)
    * [lengthSquared() ⇒ <code>number</code>](#lengthSquared)
    * [length() ⇒ <code>number</code>](#length)
    * [distanceTo(other) ⇒ <code>number</code>](#distanceTo)
    * [normalize()](#normalize)
    * [normalizeInPlace()](#normalizeInPlace)
    * [dot(other) ⇒ <code>number</code>](#dot)
    * [cross(other) ⇒ <code>number</code>](#cross)
    * [angleTo(other) ⇒ <code>number</code>](#angleTo)
    * [signedAngleTo(other) ⇒ <code>number</code>](#signedAngleTo)
    * [rotate(angle)](#rotate)
    * [lerp(other, t)](#lerp)
    * [setRandomDir(scale)](#setRandomDir)
    * [setRandom(scale)](#setRandom)
    * [clone()](#clone)
    * [asArray() ⇒ <code>array</code>](#asArray)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)

<a name="new_Vec2_new"></a>

### new Vec2
Creates a Vec2.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>Number</code> | <code>0</code> | The x value. Default is 0. |
| y | <code>Number</code> | <code>0</code> | The y value. Default is 0. |

<a name="Vec2+x"></a>

### x 
Getter for `x` value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the x value.  
<a name="Vec2+x"></a>

### vec2
Setter for `x` value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec2+y"></a>

### y 
Getter for `y` value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the y value.  
<a name="Vec2+y"></a>

### vec2
Setter for `y` value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec2+set"></a>

### set
Setter from scalar components.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |

<a name="Vec2+setFromOther"></a>

### setFromOther
Replaces this Vec2 data with the Vec2 data passed as parameter.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to set from. |

<a name="Vec2+equal"></a>

### equal
Checks if this Vec2 is exactly the same as another Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>boolean</code> - - Returns `true` if are the same Vector, otherwise, `false`.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+notEquals"></a>

### notEquals
Checks if this Vec2 is different from another Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>boolean</code> - - Returns `true` if the Vec2s are different, otherwise, `false`.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+approxEqual"></a>

### approxEqual
Returns true if this Vec2 is approximately the same as other.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Vec2+add"></a>

### add
Adds other to this Vec2 and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to add. |

<a name="Vec2+addInPlace"></a>

### addInPlace
Adds a Vec2 to this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to add. |

<a name="Vec2+subtract"></a>

### subtract
Subtracts a Vec2 from this Vec2 and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to subtract. |

<a name="Vec2+subtractInPlace"></a>

### subtractInPlace
Subtracts a Vec2 from this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to subtract. |

<a name="Vec2+scale"></a>

### scale
Scales this Vec2 by scalar and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec2+scaleInPlace"></a>

### scaleInPlace
Scales this Vec2 by scalar.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec2+invert"></a>

### invert
Inverts this Vec2 and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  
<a name="Vec2+invertInPlace"></a>

### invertInPlace
Inverts this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - The return value.  
<a name="Vec2+multiply"></a>

### multiply
Multiplies a Vec2 with this Vec2 and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to multiply with. |

<a name="Vec2+multiplyInPlace"></a>

### multiplyInPlace
Multiplies a Vec2 with this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to multiply with. |

<a name="Vec2+lengthSquared"></a>

### lengthSquared
Calculates the squared length of this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the length squared.  
<a name="Vec2+length"></a>

### length
Calculates the length of this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec2+distanceTo"></a>

### distanceTo
Calculates the distance to another vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the distance between vectors.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other value. |

<a name="Vec2+normalize"></a>

### normalize
Normalizes the Vec2 and returns it as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns the Vec2 normalized.  
<a name="Vec2+normalizeInPlace"></a>

### normalizeInPlace
Normalizes this Vec2 multiplying coordenate values by the inverse of the vector length.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
<a name="Vec2+dot"></a>

### dot
Calculates the dot product of this Vec2 against another Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+cross"></a>

### cross
Calculates the cross product of this Vec2 against another Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the cross product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+angleTo"></a>

### angleTo
Gets the angle between this Vec2 and other assuming both are normalized vectors.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+signedAngleTo"></a>

### signedAngleTo
Gets the angle between this Vec2 and other.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+rotate"></a>

### rotate
Rotates a Vec2 in a clockwise direction and returns a new rotated Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns the rotated vect  or.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle of rotation. |

<a name="Vec2+lerp"></a>

### lerp
Performs a linear interpolation between this Vec2 and other Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Vec2+setRandomDir"></a>

### setRandomDir
Generates a random vector with the given scale.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | Length of the resulting vector. If ommitted, a unit vector will be returned. |

<a name="Vec2+setRandom"></a>

### setRandom
Randomizes the scale of this Vec2 coordenates.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | The scale value. |

<a name="Vec2+clone"></a>

### clone
Clones this Vec2 and returns a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  
<a name="Vec2+asArray"></a>

### asArray
Returns current Vec2 data as array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="Vec2+toJSON"></a>

### toJSON
Encodes Vec2 Class as a JSON object for persistence.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>object</code> - - The json object.  
<a name="Vec2+fromJSON"></a>

### fromJSON
Decodes a JSON object to set the state of this class.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |
