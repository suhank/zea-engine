<a name="Mat3"></a>

## Mat3 ⇐ <code>AttrValue</code>
A class representing a 3x3 matrix.This matrix class is based on GLM, and is column major.

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [Mat3 ⇐ <code>AttrValue</code>](#Mat3)
    * [new Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22)](#new-Mat3)
    * [m00 ⇒ <code>number</code>](#m00)
    * [m00](#m00)
    * [m01 ⇒ <code>number</code>](#m01)
    * [m01](#m01)
    * [m02 ⇒ <code>number</code>](#m02)
    * [m02](#m02)
    * [m10 ⇒ <code>number</code>](#m10)
    * [m10](#m10)
    * [m11 ⇒ <code>number</code>](#m11)
    * [m11](#m11)
    * [m12 ⇒ <code>number</code>](#m12)
    * [m12](#m12)
    * [m20 ⇒ <code>number</code>](#m20)
    * [m20](#m20)
    * [m21 ⇒ <code>number</code>](#m21)
    * [m21](#m21)
    * [m22 ⇒ <code>number</code>](#m22)
    * [m22](#m22)
    * [xAxis ⇒ <code>Vec3</code>](#xAxis)
    * [xAxis](#xAxis)
    * [yAxis](#yAxis)
    * [yAxis](#yAxis)
    * [zAxis](#zAxis)
    * [zAxis](#zAxis)
    * [set(m00, m01, m02, m10, m11, m12, m20, m21, m22)](#set)
    * [setIdentity()](#setIdentity)
    * [setFromMat(mat)](#setFromMat)
    * [setFromDirectionAndUpvector(dir, up)](#setFromDirectionAndUpvector)
    * [inverse()](#inverse)
    * [invertInPlace() ⇒ <code>boolean</code>](#invertInPlace)
    * [transpose()](#transpose)
    * [transposeInPlace()](#transposeInPlace)
    * [transformVec3(vec3) ⇒ <code>Vec3</code>](#transformVec3)
    * [clone()](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json)](#fromJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_Mat3_new"></a>

### new Mat3
Initializes the Mat3 class with given data.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> \| <code>ArrayBuffer</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |

<a name="Mat3+m00"></a>

### m00 
Getter for row 0, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m00 value.  
<a name="Mat3+m00"></a>

### m0
Setter for row 0, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m01"></a>

### m01 
Getter for row 0, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m01 value.  
<a name="Mat3+m01"></a>

### m0
Setter for row 0, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m02"></a>

### m02 
Getter for row 0, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m02 value.  
<a name="Mat3+m02"></a>

### m0
Setter for row 0, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m10"></a>

### m10 
Getter for row 1, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m10 value.  
<a name="Mat3+m10"></a>

### m1
Setter for row 1, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m11"></a>

### m11 
Getter for row 1, column 1

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m11 value.  
<a name="Mat3+m11"></a>

### m1
Setter for row 1, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m12"></a>

### m12 
Getter for row 1, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m12 value.  
<a name="Mat3+m12"></a>

### m1
Setter for row 1, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m20"></a>

### m20 
Getter for row 2, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m20 value.  
<a name="Mat3+m20"></a>

### m2
Setter for row 2, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m21"></a>

### m21 
Getter for row 2, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m21 value.  
<a name="Mat3+m21"></a>

### m2
Setter for row 2, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m22"></a>

### m22 
Getter for row 2, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m22 value.  
<a name="Mat3+m22"></a>

### m2
Setter for row 2, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+xAxis"></a>

### xAxis 
Getter for the `x` axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>Vec3</code> - - Returns the `x` axis as a Vec3.  
<a name="Mat3+xAxis"></a>

### xAxi
Setter for the `x` axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Mat3+yAxis"></a>

### yAxi
Getter for the `y` axis.* @return {Vec3} - Returns the `y` axis as a Vec3.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+yAxis"></a>

### yAxi
Setter for the `y` axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Mat3+zAxis"></a>

### zAxi
Getter for the `z` axis.* @return {Vec3} - Returns the `z` axis as a Vec3.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+zAxis"></a>

### zAxi
Setter for the `z` axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Mat3+set"></a>

### set
Sets the state of the Mat3 class

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |

<a name="Mat3+setIdentity"></a>

### setIdentity
Sets state of the Mat3 with the identity  Matrix

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+setFromMat"></a>

### setFromMat
Sets state of the Mat3 from another Mat3<br>Note: works with either Mat3 or Mat4.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| mat | [<code>Mat3</code>](#Mat3) | The mat value. |

<a name="Mat3+setFromDirectionAndUpvector"></a>

### setFromDirectionAndUpvector
Scales and calculates the cross product of the `Vec3` and sets the result in the Mat3

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>Vec3</code> | The dir value. |
| up | <code>Vec3</code> | The up value. |

<a name="Mat3+inverse"></a>

### inverse
Inverts a Mat3 and returns the result as a new instance.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Returns a new Mat3.  
<a name="Mat3+invertInPlace"></a>

### invertInPlace
Inverts a Mat3.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="Mat3+transpose"></a>

### transpose
Transposes (exchanges columns with rows) this matrixand returns the result as a new instance.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Return a new transposed Mat3.  
<a name="Mat3+transposeInPlace"></a>

### transposeInPlace
Transposes (exchanges columns with rows) this matrix.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+transformVec3"></a>

### transformVec3
Transforms the Vec3 with a Mat3.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>Vec3</code> - - Return the result as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Mat3+clone"></a>

### clone
Clones this Mat3 returning a new instance.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Returns a new Mat3.  
<a name="Mat3+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>object</code> - - The json object.  
<a name="Mat3+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json param. |

<a name="Mat3+toString"></a>

### toString
Calls `toJSON` method and stringifies it.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>string</code> - - The return value.  
