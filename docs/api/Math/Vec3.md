<a name="Vec3"></a>

## Vec3 ⇐ <code>AttrValue</code>
Representing a Vec3(three-dimensional floating point vector).

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [Vec3 ⇐ <code>AttrValue</code>](#Vec3)
    * [new Vec3(x, y, z)](#new-Vec3)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [z ⇒ <code>number</code>](#z)
    * [z](#z)
    * [xy ⇒ <code>Vec2</code>](#xy)
    * [yz ⇒ <code>Vec2</code>](#yz)
    * [set(x, y, z)](#set)
    * [setDataArray(float32Array)](#setDataArray)
    * [setFromOther(other)](#setFromOther)
    * [isNull() ⇒ <code>boolean</code>](#isNull)
    * [is111() ⇒ <code>boolean</code>](#is111)
    * [equal(other) ⇒ <code>boolean</code>](#equal)
    * [notEquals(other) ⇒ <code>boolean</code>](#notEquals)
    * [approxEqual(other, precision) ⇒ <code>boolean</code>](#approxEqual)
    * [add(other)](#add)
    * [addInPlace(other)](#addInPlace)
    * [subtract(other)](#subtract)
    * [subtractInPlace(other)](#subtractInPlace)
    * [multiply(other)](#multiply)
    * [multiplyInPlace(other)](#multiplyInPlace)
    * [divide(vec3)](#divide)
    * [divideInPlace(vec3)](#divideInPlace)
    * [scale(scalar)](#scale)
    * [scaleInPlace(scalar)](#scaleInPlace)
    * [negate()](#negate)
    * [inverse()](#inverse)
    * [lengthSquared() ⇒ <code>number</code>](#lengthSquared)
    * [length() ⇒ <code>number</code>](#length)
    * [distanceTo(other) ⇒ <code>number</code>](#distanceTo)
    * [normalize()](#normalize)
    * [normalizeInPlace() ⇒ <code>number</code>](#normalizeInPlace)
    * [resize(length)](#resize)
    * [resizeInPlace(length)](#resizeInPlace)
    * [dot(other) ⇒ <code>number</code>](#dot)
    * [cross(other)](#cross)
    * [angleTo(other) ⇒ <code>number</code>](#angleTo)
    * [lerp(other, t)](#lerp)
    * [abs()](#abs)
    * [setRandomDir(scale)](#setRandomDir)
    * [setRandom(scale)](#setRandom)
    * [clone()](#clone)
    * [asArray() ⇒ <code>array</code>](#asArray)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)

<a name="new_Vec3_new"></a>

### new Vec3
Creates a Vec3.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The x value. Default is 0. |
| y | <code>number</code> | <code>0</code> | The y value. Default is 0. |
| z | <code>number</code> | <code>0</code> | The z value. Default is 0. |

<a name="Vec3+x"></a>

### x 
Getter for `x` value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the x value.  
<a name="Vec3+x"></a>

### vec3
Setter for `x` value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec3+y"></a>

### y 
Getter for `y` value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the y value.  
<a name="Vec3+y"></a>

### vec3
Setter for `y` value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec3+z"></a>

### z 
Getter for `z` value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the z value.  
<a name="Vec3+z"></a>

### vec3
Setter for `z` value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec3+xy"></a>

### xy 
Getter for `xy` swizzel.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>Vec2</code> - - Returns the z value.  
<a name="Vec3+yz"></a>

### yz 
Getter for `yz` swizzel.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>Vec2</code> - - Returns the z value.  
<a name="Vec3+set"></a>

### set
Setter from scalar components.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The y value. |

<a name="Vec3+setDataArray"></a>

### setDataArray
Sets the state of a Vec3 Object.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| float32Array | <code>Float32Array</code> | The float32Array value. |

<a name="Vec3+setFromOther"></a>

### setFromOther
Sets the state of a Vec3 Object from another Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to set from. |

<a name="Vec3+isNull"></a>

### isNull
Checks if the coordenates of this Vec3 are 0 0 0.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns `true` if the coordenates are(0, 0, 0), otherwise, `false`.  
<a name="Vec3+is111"></a>

### is111
Checks if the coordenates of this Vec3 are 1 1 1.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns `true` if the coordenates are(1, 1, 1), otherwise, `false`.  
<a name="Vec3+equal"></a>

### equal
Checks if this Vec3 is exactly the same as another Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns `true` if are the same Vector, otherwise, `false`.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+notEquals"></a>

### notEquals
Checks if this Vec2 is different from another Vec2.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns `true` if the Vec3s are different, otherwise, `false`.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+approxEqual"></a>

### approxEqual
Returns true if this Vec2 is approximately the same as other.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Vec3+add"></a>

### add
Adds other to this Vec3 and return the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to add. |

<a name="Vec3+addInPlace"></a>

### addInPlace
Adds other to this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to add. |

<a name="Vec3+subtract"></a>

### subtract
Subtracts other from this Vec3 and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to subtract. |

<a name="Vec3+subtractInPlace"></a>

### subtractInPlace
Subtracts other from this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to subtract. |

<a name="Vec3+multiply"></a>

### multiply
Multiplies two Vec3s and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to multiply with. |

<a name="Vec3+multiplyInPlace"></a>

### multiplyInPlace
Multiplies two Vec3s.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to multiply with. |

<a name="Vec3+divide"></a>

### divide
Divides two Vec3s and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The other Vec3 to divide by. |

<a name="Vec3+divideInPlace"></a>

### divideInPlace
Divides two Vec3s.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The other Vec3 to divide by. |

<a name="Vec3+scale"></a>

### scale
Scales this Vec3 by scalar and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec3+scaleInPlace"></a>

### scaleInPlace
Scales this Vec3 by scalar.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec3+negate"></a>

### negate
Negates this Vec3 (x = -x, y = -y and z = -z), but returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+inverse"></a>

### inverse
Returns the inverse of this Vec3, but returns. the result as a new Vec3

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+lengthSquared"></a>

### lengthSquared
Calculates the squared length of this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec3+length"></a>

### length
Calculates the length of this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec3+distanceTo"></a>

### distanceTo
Calculates the distance to another Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the distance between vectors.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to calculate the distance to. |

<a name="Vec3+normalize"></a>

### normalize
Normalizes the Vec3 and returns it as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the Vec3 normalized.  
<a name="Vec3+normalizeInPlace"></a>

### normalizeInPlace
Normalizes this Vec3 multiplying coordenate values by the inverse of the vector length.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - The return value.  
<a name="Vec3+resize"></a>

### resize
Creates and returns a new Vec3 with the new coordenates(calculated with this Vec3 coordenates and the specified length).

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | The length value. |

<a name="Vec3+resizeInPlace"></a>

### resizeInPlace
Modifies current coordenates using the specified length.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | The length value. |

<a name="Vec3+dot"></a>

### dot
Calculates the dot product of this Vec3 against another Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+cross"></a>

### cross
Calculates the cross product of two Vec3s and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the cross product as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to calculate with. |

<a name="Vec3+angleTo"></a>

### angleTo
Gets the angle between this Vec3 and b.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+lerp"></a>

### lerp
Performs a linear interpolation between this Vec3 and other.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Vec3+abs"></a>

### abs
Returns a new Vec3 whose component values are the abs of this Vec3s component values.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+setRandomDir"></a>

### setRandomDir
Sets the vector a random vector on the surface of a sphere with the radius of the givenn scale value.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - The random Vec3.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | The radius of the surface sphere. |

<a name="Vec3+setRandom"></a>

### setRandom
Generates a randome vector anywhere in the sphere defined by the provided scale value.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - The random Vec3.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | The radius of the bounding sphere. |

<a name="Vec3+clone"></a>

### clone
Clones this Vec3 and returns a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+asArray"></a>

### asArray
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="Vec3+toJSON"></a>

### toJSON
Encodes Vec3 Class as a JSON object for persistence.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>object</code> - - The json object.  
<a name="Vec3+fromJSON"></a>

### fromJSON
Decodes a JSON object to set the state of this class.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |
