<a name="Mat4"></a>

## Mat4 ⇐ <code>AttrValue</code>
A class representing a 4x4 matrix.

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [Mat4 ⇐ <code>AttrValue</code>](#Mat4)
    * [new Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)](#new-Mat4)
    * [m00 ⇒ <code>number</code>](#m00)
    * [m00](#m00)
    * [m01 ⇒ <code>number</code>](#m01)
    * [m01](#m01)
    * [m02 ⇒ <code>number</code>](#m02)
    * [m02](#m02)
    * [m03 ⇒ <code>number</code>](#m03)
    * [m03](#m03)
    * [m10 ⇒ <code>number</code>](#m10)
    * [m10](#m10)
    * [m11 ⇒ <code>number</code>](#m11)
    * [m11](#m11)
    * [m12 ⇒ <code>number</code>](#m12)
    * [m12](#m12)
    * [m13 ⇒ <code>number</code>](#m13)
    * [m13](#m13)
    * [m20 ⇒ <code>number</code>](#m20)
    * [m20](#m20)
    * [m21 ⇒ <code>number</code>](#m21)
    * [m21](#m21)
    * [m22 ⇒ <code>number</code>](#m22)
    * [m22](#m22)
    * [m23 ⇒ <code>number</code>](#m23)
    * [m23](#m23)
    * [m30 ⇒ <code>number</code>](#m30)
    * [m30](#m30)
    * [m31 ⇒ <code>number</code>](#m31)
    * [m31](#m31)
    * [m32 ⇒ <code>number</code>](#m32)
    * [m32](#m32)
    * [m33 ⇒ <code>number</code>](#m33)
    * [m33](#m33)
    * [xAxis ⇒ <code>Vec3</code>](#xAxis)
    * [xAxis](#xAxis)
    * [yAxis ⇒ <code>Vec3</code>](#yAxis)
    * [yAxis](#yAxis)
    * [zAxis ⇒ <code>Vec3</code>](#zAxis)
    * [zAxis](#zAxis)
    * [translation ⇒ <code>Vec3</code>](#translation)
    * [translation](#translation)
    * [set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)](#set)
    * [setIdentity()](#setIdentity)
    * [setDataArray(float32Array)](#setDataArray)
    * [setFromMat4(mat4)](#setFromMat4)
    * [toMat3(mat4) ⇒ <code>Mat3</code>](#toMat3)
    * [transposeInPlace()](#transposeInPlace)
    * [transpose()](#transpose)
    * [inverse()](#inverse)
    * [invertInPlace() ⇒ <code>boolean</code>](#invertInPlace)
    * [setInverse(mat4) ⇒ <code>null</code>](#setInverse)
    * [multiply(other)](#multiply)
    * [multiplyInPlace(other)](#multiplyInPlace)
    * [postmultiplyInPlace(other) ⇒ <code>Mat3</code>](#postmultiplyInPlace)
    * [translateInPlace(v3)](#translateInPlace)
    * [setLookAt(pos, target, up)](#setLookAt)
    * [setRotation(axis, rad)](#setRotation)
    * [setXRotation(rad)](#setXRotation)
    * [setYRotation(rad)](#setYRotation)
    * [setZRotation(rad)](#setZRotation)
    * [transformVec4(vec) ⇒ <code>Vec4</code>](#transformVec4)
    * [transformVec3(vec) ⇒ <code>Vec3</code>](#transformVec3)
    * [rotateVec3(vec) ⇒ <code>Vec3</code>](#rotateVec3)
    * [setPerspectiveMatrix(fovy, aspect, near, far)](#setPerspectiveMatrix)
    * [setOrthographicMatrix(left, right, bottom, top, near, far)](#setOrthographicMatrix)
    * [setScale(x, y, z)](#setScale)
    * [setFromMat3x4Array(m3x4)](#setFromMat3x4Array)
    * [clone()](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json)](#fromJSON)

<a name="new_Mat4_new"></a>

### new Mat4
Initializes the Mat3 class with given data.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> \| <code>Float32Array</code> \| <code>ArrayBuffer</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m03 | <code>number</code> | <code>0</code> | Row 0, column 3. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m13 | <code>number</code> | <code>0</code> | Row 1, column 3. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |
| m23 | <code>number</code> | <code>0</code> | Row 2, column 3. |
| m30 | <code>number</code> | <code>0</code> | Row 3, column 0. |
| m31 | <code>number</code> | <code>0</code> | Row 3, column 1. |
| m32 | <code>number</code> | <code>0</code> | Row 3, column 2. |
| m33 | <code>number</code> | <code>1</code> | Row 3, column 3. |

<a name="Mat4+m00"></a>

### m00 
Getter for row 0, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m00 value.  
<a name="Mat4+m00"></a>

### m0
Setter for row 0, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m01"></a>

### m01 
Getter for row 0, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m01 value.  
<a name="Mat4+m01"></a>

### m0
Setter for row 0, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m02"></a>

### m02 
Getter for row 0, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m02 value.  
<a name="Mat4+m02"></a>

### m0
Setter for row 0, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m03"></a>

### m03 
Getter for row 0, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m03 value.  
<a name="Mat4+m03"></a>

### m0
Setter for row 0, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m10"></a>

### m10 
Getter for row 1, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m10 value.  
<a name="Mat4+m10"></a>

### m1
Setter for row 1, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m11"></a>

### m11 
Getter for row 1, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m11 value.  
<a name="Mat4+m11"></a>

### m1
Setter for row 1, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m12"></a>

### m12 
Getter for row 1, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m12 value.  
<a name="Mat4+m12"></a>

### m1
Setter for row 1, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m13"></a>

### m13 
Getter for row 1, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m13 value.  
<a name="Mat4+m13"></a>

### m1
Setter for row 1, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m20"></a>

### m20 
Getter for row 2, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m20 value.  
<a name="Mat4+m20"></a>

### m2
Setter for row 2, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m21"></a>

### m21 
Getter for row 2, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m21 value.  
<a name="Mat4+m21"></a>

### m2
Setter for row 2, column 1

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m22"></a>

### m22 
Getter for row 2, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m22 value.  
<a name="Mat4+m22"></a>

### m2
Setter for row 2, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m23"></a>

### m23 
Getter for row 2, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m23 value.  
<a name="Mat4+m23"></a>

### m2
Setter for row 2, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m30"></a>

### m30 
Getter for row 3, column 0

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m30 value.  
<a name="Mat4+m30"></a>

### m3
Setter for row 3, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m31"></a>

### m31 
Getter for row 3, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m31 value.  
<a name="Mat4+m31"></a>

### m3
Setter for row 3, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m32"></a>

### m32 
Getter for row 3, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m32 value.  
<a name="Mat4+m32"></a>

### m3
Setter for row 3, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m33"></a>

### m33 
Getter for row 3, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m33 value.  
<a name="Mat4+m33"></a>

### m3
Setter for row 3, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+xAxis"></a>

### xAxis 
Getter for the `x` axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Vec3</code> - - Returns the `x` axis as a Vec3.  
<a name="Mat4+xAxis"></a>

### xAxi
Setter for the `x` axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Mat4+yAxis"></a>

### yAxis 
Getter for the `y` axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Vec3</code> - - Returns the `y` axis as a Vec3.  
<a name="Mat4+yAxis"></a>

### yAxi
Setter for the `y` axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Mat4+zAxis"></a>

### zAxis 
Getter for the `z` axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Vec3</code> - - Returns the `z` axis as a Vec3.  
<a name="Mat4+zAxis"></a>

### zAxi
Setter for the `z` axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Mat4+translation"></a>

### translation 
Getter for the translation of the matrix.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Vec3</code> - - Returns the translation.  
<a name="Mat4+translation"></a>

### translatio
Setter for the translation of the matrix.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The translation. |

<a name="Mat4+set"></a>

### set
Sets the state of the Mat4 class

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m03 | <code>number</code> | <code>0</code> | Row 0, column 3. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m13 | <code>number</code> | <code>0</code> | Row 1, column 3. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |
| m23 | <code>number</code> | <code>0</code> | Row 2, column 3. |
| m30 | <code>number</code> | <code>0</code> | Row 3, column 0. |
| m31 | <code>number</code> | <code>0</code> | Row 3, column 1. |
| m32 | <code>number</code> | <code>0</code> | Row 3, column 2. |
| m33 | <code>number</code> | <code>1</code> | Row 3, column 3. |

<a name="Mat4+setIdentity"></a>

### setIdentity
Sets state of the Mat4 with the identity  Matrix

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
<a name="Mat4+setDataArray"></a>

### setDataArray
Sets the state of the Mat4 Object.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| float32Array | <code>Float32Array</code> | The float32Array value. |

<a name="Mat4+setFromMat4"></a>

### setFromMat4
Sets state of the Mat4 from another Mat4

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The mat4 value. |

<a name="Mat4+toMat3"></a>

### toMat3
Converts a Mat4 to a Mat3.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Mat3</code> - - Returns a new Mat3.  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The Mat4 value to convert. |

<a name="Mat4+transposeInPlace"></a>

### transposeInPlace
Transposes (exchanges columns with rows) this matrix.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
<a name="Mat4+transpose"></a>

### transpose
Transposes (exchanges columns with rows) this matrix

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Return a new transposed Mat4.  
<a name="Mat4+inverse"></a>

### inverse
Inverts a Mat4 not using SIMD and returns the result as a new instance.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  
<a name="Mat4+invertInPlace"></a>

### invertInPlace
Inverts a Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="Mat4+setInverse"></a>

### setInverse
Sets this matrix as the inverse of the given Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>null</code> - - In case the `determinant` can't be calculated, a `null` will be returned, otherwise, nothing is returned  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The mat4 value. |

<a name="Mat4+multiply"></a>

### multiply
Multiplies two Mat4s not using SIMD and returns the result as a new instance.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Mat4</code>](#Mat4) | The other Mat4 to multiply with. |

<a name="Mat4+multiplyInPlace"></a>

### multiplyInPlace
Multiplies two Mat4s in place explicitly not using SIMD.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Mat4</code>](#Mat4) | The other Mat4 to multiply with. |

<a name="Mat4+postmultiplyInPlace"></a>

### postmultiplyInPlace
Post multiplies two Mat4s in place explicitly not using SIMD.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Mat3</code> - - Returns the result as a new Mat4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Mat4</code>](#Mat4) | The other Mat4 to multiply with. |

<a name="Mat4+translateInPlace"></a>

### translateInPlace
Translate a Mat4 by the given vector not using SIMD.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| v3 | <code>Vec3</code> | The given vector to translate along. |

<a name="Mat4+setLookAt"></a>

### setLookAt
Generates a look-at matrix with the given position, focal point, and up axis.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>Vec3</code> | Position of the viewer. |
| target | <code>Vec3</code> | Point the viewer is looking at. |
| up | <code>Vec3</code> | Vec3 pointing up. |

<a name="Mat4+setRotation"></a>

### setRotation
Creates a matrix from a given angle around a given axis.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| axis | <code>Vec3</code> | The axis to rotate around. |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+setXRotation"></a>

### setXRotation
Creates a matrix from the given angle around the X axis.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+setYRotation"></a>

### setYRotation
Creates a matrix from the given angle around the Y axis.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+setZRotation"></a>

### setZRotation
Creates a matrix from the given angle around the Z axis.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+transformVec4"></a>

### transformVec4
Transforms the Vec4 with a Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Vec4</code> - - Return the result as a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vec4</code> | The vec value. |

<a name="Mat4+transformVec3"></a>

### transformVec3
Transforms the Vec3 with a Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Vec3</code> - - Return the result as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vec3</code> | The vec value. |

<a name="Mat4+rotateVec3"></a>

### rotateVec3
Rotates a given `Vec3` and the result is returned as a new `Vec3`

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>Vec3</code> - - Return the result as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>Vec3</code> | The vec value. |

<a name="Mat4+setPerspectiveMatrix"></a>

### setPerspectiveMatrix
Set the perspective from a Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| fovy | <code>number</code> | The fovy value. |
| aspect | <code>number</code> | The aspect value. |
| near | <code>number</code> | The near value. |
| far | <code>number</code> | The far value. |

<a name="Mat4+setOrthographicMatrix"></a>

### setOrthographicMatrix
Calculates the orthographic matrix and sets the state of the Mat4 class

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| left | <code>number</code> | The left value. |
| right | <code>number</code> | The right value. |
| bottom | <code>number</code> | The bottom value. |
| top | <code>number</code> | The top value. |
| near | <code>number</code> | The near value. |
| far | <code>number</code> | The far value. |

<a name="Mat4+setScale"></a>

### setScale
Scales Mat4 Matrix

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The z value. |

<a name="Mat4+setFromMat3x4Array"></a>

### setFromMat3x4Array
Transforms a 3x4 matrix into a 4x4 matrix and set the result to the Math4 state.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| m3x4 | <code>array</code> | The m3x4 value. |

<a name="Mat4+clone"></a>

### clone
Clones this Mat4 returning a new instance.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  
<a name="Mat4+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>object</code> - - The json object.  
<a name="Mat4+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json param. |
