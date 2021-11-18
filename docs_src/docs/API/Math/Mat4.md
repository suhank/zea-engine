---
id: "Math_Mat4.Mat4"
title: "Class: Mat4"
sidebar_label: "Mat4"
custom_edit_url: null
---



A class representing a 4x4 matrix.
This matrix class is based on GLM, and is column major.

## Constructors

### constructor

• **new Mat4**(`m00?`, `m01?`, `m02?`, `m03?`, `m10?`, `m11?`, `m12?`, `m13?`, `m20?`, `m21?`, `m22?`, `m23?`, `m30?`, `m31?`, `m32?`, `m33?`)

Initializes the Mat3 class with given data.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `m00` | `number` \| `Float32Array` \| `ArrayBuffer` | `1` | Row 0, column 0. |
| `m01` | `number` | `0` | Row 0, column 1. |
| `m02` | `number` | `0` | Row 0, column 2. |
| `m03` | `number` | `0` | Row 0, column 3. |
| `m10` | `number` | `0` | Row 1, column 0. |
| `m11` | `number` | `1` | Row 1, column 1. |
| `m12` | `number` | `0` | Row 1, column 2. |
| `m13` | `number` | `0` | Row 1, column 3. |
| `m20` | `number` | `0` | Row 2, column 0. |
| `m21` | `number` | `0` | Row 2, column 1. |
| `m22` | `number` | `1` | Row 2, column 2. |
| `m23` | `number` | `0` | Row 2, column 3. |
| `m30` | `number` | `0` | Row 3, column 0. |
| `m31` | `number` | `0` | Row 3, column 1. |
| `m32` | `number` | `0` | Row 3, column 2. |
| `m33` | `number` | `1` | Row 3, column 3. |

#### Defined in

Math/Mat4.ts:34

## Properties

### \_\_data

• **\_\_data**: `Float32Array`

#### Defined in

Math/Mat4.ts:13

## Accessors

### m00

• `get` **m00**(): `number`

Getter for row 0, column 0.

#### Returns

`number`

- Returns the m00 value.

#### Defined in

Math/Mat4.ts:72

• `set` **m00**(`val`): `void`

Setter for row 0, column 0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m00 value.

#### Defined in

Math/Mat4.ts:81

___

### m01

• `get` **m01**(): `number`

Getter for row 0, column 1.

#### Returns

`number`

- Returns the m01 value.

#### Defined in

Math/Mat4.ts:90

• `set` **m01**(`val`): `void`

Setter for row 0, column 1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m01 value.

#### Defined in

Math/Mat4.ts:99

___

### m02

• `get` **m02**(): `number`

Getter for row 0, column 2.

#### Returns

`number`

- Returns the m02 value.

#### Defined in

Math/Mat4.ts:108

• `set` **m02**(`val`): `void`

Setter for row 0, column 2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m02 value.

#### Defined in

Math/Mat4.ts:117

___

### m03

• `get` **m03**(): `number`

Getter for row 0, column 3.

#### Returns

`number`

- Returns the m03 value.

#### Defined in

Math/Mat4.ts:126

• `set` **m03**(`val`): `void`

Setter for row 0, column 3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m03 value.

#### Defined in

Math/Mat4.ts:135

___

### m10

• `get` **m10**(): `number`

Getter for row 1, column 0.

#### Returns

`number`

- Returns the m10 value.

#### Defined in

Math/Mat4.ts:144

• `set` **m10**(`val`): `void`

Setter for row 1, column 0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m10 value.

#### Defined in

Math/Mat4.ts:153

___

### m11

• `get` **m11**(): `number`

Getter for row 1, column 1.

#### Returns

`number`

- Returns the m11 value.

#### Defined in

Math/Mat4.ts:162

• `set` **m11**(`val`): `void`

Setter for row 1, column 1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m11 value.

#### Defined in

Math/Mat4.ts:171

___

### m12

• `get` **m12**(): `number`

Getter for row 1, column 2.

#### Returns

`number`

- Returns the m12 value.

#### Defined in

Math/Mat4.ts:180

• `set` **m12**(`val`): `void`

Setter for row 1, column 2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m12 value.

#### Defined in

Math/Mat4.ts:189

___

### m13

• `get` **m13**(): `number`

Getter for row 1, column 3.

#### Returns

`number`

- Returns the m13 value.

#### Defined in

Math/Mat4.ts:198

• `set` **m13**(`val`): `void`

Setter for row 1, column 3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m13 value.

#### Defined in

Math/Mat4.ts:207

___

### m20

• `get` **m20**(): `number`

Getter for row 2, column 0.

#### Returns

`number`

- Returns the m20 value.

#### Defined in

Math/Mat4.ts:216

• `set` **m20**(`val`): `void`

Setter for row 2, column 0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m20 value.

#### Defined in

Math/Mat4.ts:225

___

### m21

• `get` **m21**(): `number`

Getter for row 2, column 1.

#### Returns

`number`

- Returns the m21 value.

#### Defined in

Math/Mat4.ts:234

• `set` **m21**(`val`): `void`

Setter for row 2, column 1

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m21 value.

#### Defined in

Math/Mat4.ts:243

___

### m22

• `get` **m22**(): `number`

Getter for row 2, column 2.

#### Returns

`number`

- Returns the m22 value.

#### Defined in

Math/Mat4.ts:252

• `set` **m22**(`val`): `void`

Setter for row 2, column 2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m22 value.

#### Defined in

Math/Mat4.ts:261

___

### m23

• `get` **m23**(): `number`

Getter for row 2, column 3.

#### Returns

`number`

- Returns the m23 value.

#### Defined in

Math/Mat4.ts:270

• `set` **m23**(`val`): `void`

Setter for row 2, column 3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m23 value.

#### Defined in

Math/Mat4.ts:279

___

### m30

• `get` **m30**(): `number`

Getter for row 3, column 0

#### Returns

`number`

- Returns the m30 value.

#### Defined in

Math/Mat4.ts:288

• `set` **m30**(`val`): `void`

Setter for row 3, column 0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m30 value.

#### Defined in

Math/Mat4.ts:297

___

### m31

• `get` **m31**(): `number`

Getter for row 3, column 1.

#### Returns

`number`

- Returns the m31 value.

#### Defined in

Math/Mat4.ts:306

• `set` **m31**(`val`): `void`

Setter for row 3, column 1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m31 value.

#### Defined in

Math/Mat4.ts:315

___

### m32

• `get` **m32**(): `number`

Getter for row 3, column 2.

#### Returns

`number`

- Returns the m32 value.

#### Defined in

Math/Mat4.ts:324

• `set` **m32**(`val`): `void`

Setter for row 3, column 2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m32 value.

#### Defined in

Math/Mat4.ts:333

___

### m33

• `get` **m33**(): `number`

Getter for row 3, column 3.

#### Returns

`number`

- Returns the m33 value.

#### Defined in

Math/Mat4.ts:342

• `set` **m33**(`val`): `void`

Setter for row 3, column 3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m33 value.

#### Defined in

Math/Mat4.ts:351

___

### translation

• `get` **translation**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the translation of the matrix. Assumes the translation values are 12, 13, & 14.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the translation.

#### Defined in

Math/Mat4.ts:414

• `set` **translation**(`vec3`): `void`

Setter for the translation of the matrix. Assumes the translation values are 12, 13, & 14.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The translation. |

#### Returns

`void`

- Returns the translation.

#### Defined in

Math/Mat4.ts:423

___

### xAxis

• `get` **xAxis**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the `x` axis.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the `x` axis as a Vec3.

#### Defined in

Math/Mat4.ts:360

• `set` **xAxis**(`vec3`): `void`

Setter for the `x` axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

`void`

- Returns the `x` axis as a Vec3.

#### Defined in

Math/Mat4.ts:369

___

### yAxis

• `get` **yAxis**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the `y` axis.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the `y` axis as a Vec3.

#### Defined in

Math/Mat4.ts:378

• `set` **yAxis**(`vec3`): `void`

Setter for the `y` axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

`void`

- Returns the `y` axis as a Vec3.

#### Defined in

Math/Mat4.ts:387

___

### zAxis

• `get` **zAxis**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the `z` axis.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the `z` axis as a Vec3.

#### Defined in

Math/Mat4.ts:396

• `set` **zAxis**(`vec3`): `void`

Setter for the `z` axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

`void`

- Returns the `z` axis as a Vec3.

#### Defined in

Math/Mat4.ts:405

## Methods

### asArray

▸ **asArray**(): `Float32Array`

Returns current Math type data as array. Often used to pass types to the GPU.

#### Returns

`Float32Array`

- Returns the result as an array.

#### Defined in

Math/Mat4.ts:1430

___

### clone

▸ **clone**(): [`Mat4`](Math_Mat4.Mat4)

Clones this Mat4 returning a new instance.

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns a new Mat4.

#### Defined in

Math/Mat4.ts:1364

___

### fromJSON

▸ **fromJSON**(`json`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `number`[] | The json param. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:1412

___

### inverse

▸ **inverse**(): [`Mat4`](Math_Mat4.Mat4)

Inverts a Mat4 and returns the result as a new instance.

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns a new Mat4.

#### Defined in

Math/Mat4.ts:605

___

### invertInPlace

▸ **invertInPlace**(): `boolean`

Inverts a Mat4.

#### Returns

`boolean`

- The return value.

#### Defined in

Math/Mat4.ts:670

___

### multiply

▸ **multiply**(`other`): [`Mat4`](Math_Mat4.Mat4)

Multiplies two Mat4s and returns the result as a new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Mat4`](Math_Mat4.Mat4) | The other Mat4 to multiply with. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns a new Mat4.

#### Defined in

Math/Mat4.ts:800

___

### multiplyInPlace

▸ **multiplyInPlace**(`other`): [`Mat4`](Math_Mat4.Mat4)

Multiplies two Mat4s in place explicitly not using SIMD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Mat4`](Math_Mat4.Mat4) | The other Mat4 to multiply with. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns a new Mat4.

#### Defined in

Math/Mat4.ts:865

___

### postMultiplyInPlace

▸ **postMultiplyInPlace**(`other`): [`Mat4`](Math_Mat4.Mat4)

Post multiplies two Mat4s in place explicitly not using SIMD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Mat4`](Math_Mat4.Mat4) | The other Mat4 to multiply with. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns the result as a new Mat4.

#### Defined in

Math/Mat4.ts:930

___

### readBinary

▸ **readBinary**(`reader`): `void`

Loads the state of the value from a binary reader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:1421

___

### rotateVec3

▸ **rotateVec3**(`vec`): [`Vec3`](Math_Vec3.Vec3)

Rotates a given `Vec3` and the result is returned as a new `Vec3`, applying only the top left components of the matrix, so not applying any translation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`Vec3`](Math_Vec3.Vec3) | The vec value. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Return the result as a new Vec3.

#### Defined in

Math/Mat4.ts:1254

___

### set

▸ **set**(`m00?`, `m01?`, `m02?`, `m03?`, `m10?`, `m11?`, `m12?`, `m13?`, `m20?`, `m21?`, `m22?`, `m23?`, `m30?`, `m31?`, `m32?`, `m33?`): `void`

Sets the state of the Mat4 class

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `m00` | `number` | `1` | Row 0, column 0. |
| `m01` | `number` | `0` | Row 0, column 1. |
| `m02` | `number` | `0` | Row 0, column 2. |
| `m03` | `number` | `0` | Row 0, column 3. |
| `m10` | `number` | `0` | Row 1, column 0. |
| `m11` | `number` | `1` | Row 1, column 1. |
| `m12` | `number` | `0` | Row 1, column 2. |
| `m13` | `number` | `0` | Row 1, column 3. |
| `m20` | `number` | `0` | Row 2, column 0. |
| `m21` | `number` | `0` | Row 2, column 1. |
| `m22` | `number` | `1` | Row 2, column 2. |
| `m23` | `number` | `0` | Row 2, column 3. |
| `m30` | `number` | `0` | Row 3, column 0. |
| `m31` | `number` | `0` | Row 3, column 1. |
| `m32` | `number` | `0` | Row 3, column 2. |
| `m33` | `number` | `1` | Row 3, column 3. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:450

___

### setDataArray

▸ **setDataArray**(`float32Array`): `void`

Sets the state of the Mat4 Object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `float32Array` | `Float32Array` | The float32Array value. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:498

___

### setFromMat3x4Array

▸ **setFromMat3x4Array**(`m3x4`): `void`

Transforms a 3x4 matrix into a 4x4 matrix and set the result to the Math4 state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `m3x4` | `number`[] | The m3x4 value. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:1336

___

### setFromMat4

▸ **setFromMat4**(`mat4`): `void`

Sets state of the Mat4 from another Mat4

Note: works with either Mat3 or Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mat4` | [`Mat4`](Math_Mat4.Mat4) | The mat4 value. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:509

___

### setIdentity

▸ **setIdentity**(): `void`

Sets state of the Mat4 with the identity  Matrix

#### Returns

`void`

#### Defined in

Math/Mat4.ts:489

___

### setInverse

▸ **setInverse**(`mat4`): `void`

Sets this matrix as the inverse of the given Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mat4` | [`Mat4`](Math_Mat4.Mat4) | The mat4 value. |

#### Returns

`void`

- In case the `determinant` can't be calculated, a `null` will be returned, otherwise, nothing is returned

#### Defined in

Math/Mat4.ts:736

___

### setLookAt

▸ **setLookAt**(`pos`, `target`, `up`): `void`

Generates a look-at matrix with the given position, focal point, and up axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | [`Vec3`](Math_Vec3.Vec3) | Position of the viewer. |
| `target` | [`Vec3`](Math_Vec3.Vec3) | Point the viewer is looking at. |
| `up` | [`Vec3`](Math_Vec3.Vec3) | Vec3 pointing up. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:1014

___

### setOrthographicMatrix

▸ **setOrthographicMatrix**(`left`, `right`, `bottom`, `top`, `near`, `far`): `void`

Calculates the orthographic matrix and sets the state of the Mat4 class

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `left` | `number` | The left value. |
| `right` | `number` | The right value. |
| `bottom` | `number` | The bottom value. |
| `top` | `number` | The top value. |
| `near` | `number` | The near value. |
| `far` | `number` | The far value. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:1288

___

### setPerspectiveMatrix

▸ **setPerspectiveMatrix**(`fovy`, `aspect`, `near`, `far`): `void`

Set the perspective from a Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fovy` | `number` | - |
| `aspect` | `number` | The aspect value. |
| `near` | `number` | The near value. |
| `far` | `number` | The far value. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:1270

___

### setRotation

▸ **setRotation**(`axis`, `rad`): [`Mat4`](Math_Mat4.Mat4)

Creates a matrix from a given angle around a given axis.
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotate(dest, dest, rad, axis);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | [`Vec3`](Math_Vec3.Vec3) | The axis to rotate around. |
| `rad` | `number` | The angle to rotate the matrix by. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- The return value.

#### Defined in

Math/Mat4.ts:1064

___

### setScale

▸ **setScale**(`x`, `y`, `z`): `void`

Set the Matrix to be a scale matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` \| [`Vec3`](Math_Vec3.Vec3) | The x value. |
| `y` | `number` | The y value. |
| `z` | `number` | The z value. |

#### Returns

`void`

#### Defined in

Math/Mat4.ts:1321

___

### setXRotation

▸ **setXRotation**(`rad`): [`Mat4`](Math_Mat4.Mat4)

Creates a matrix from the given angle around the X axis.
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotateX(dest, dest, rad);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rad` | `number` | The angle to rotate the matrix by. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- The return value.

#### Defined in

Math/Mat4.ts:1110

___

### setYRotation

▸ **setYRotation**(`rad`): [`Mat4`](Math_Mat4.Mat4)

Creates a matrix from the given angle around the Y axis.
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotateY(dest, dest, rad);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rad` | `number` | The angle to rotate the matrix by. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- The return value.

#### Defined in

Math/Mat4.ts:1147

___

### setZRotation

▸ **setZRotation**(`rad`): [`Mat4`](Math_Mat4.Mat4)

Creates a matrix from the given angle around the Z axis.
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotateZ(dest, dest, rad);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rad` | `number` | The angle to rotate the matrix by. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- The return value.

#### Defined in

Math/Mat4.ts:1184

___

### toJSON

▸ **toJSON**(): `Float32Array`

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Float32Array`

- The json object.

#### Defined in

Math/Mat4.ts:1403

___

### toMat3

▸ **toMat3**(): [`Mat3`](Math_Mat3.Mat3)

Converts a Mat4 to a Mat3.

#### Returns

[`Mat3`](Math_Mat3.Mat3)

- Returns a new Mat3.

#### Defined in

Math/Mat4.ts:533

___

### toString

▸ **toString**(): `string`

Converts this Vec3 to a string in JSON format.

#### Returns

`string`

- The return value.

#### Defined in

Math/Mat4.ts:1393

___

### transformVec3

▸ **transformVec3**(`vec`): [`Vec3`](Math_Vec3.Vec3)

Transforms the Vec3 with a Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`Vec3`](Math_Vec3.Vec3) | The vec value. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Return the result as a new Vec3.

#### Defined in

Math/Mat4.ts:1237

___

### transformVec4

▸ **transformVec4**(`vec`): [`Vec4`](Math_Vec4.Vec4)

Transforms the Vec4 with a Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | [`Vec4`](Math_Vec4.Vec4) | The vec value. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Return the result as a new Vec4.

#### Defined in

Math/Mat4.ts:1217

___

### translateInPlace

▸ **translateInPlace**(`v3`): [`Mat4`](Math_Mat4.Mat4)

Translate a Mat4 by the given vector not using SIMD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v3` | [`Vec3`](Math_Vec3.Vec3) | The given vector to translate along. |

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- The return value.

#### Defined in

Math/Mat4.ts:995

___

### transpose

▸ **transpose**(): [`Mat4`](Math_Mat4.Mat4)

Transposes (exchanges columns with rows) this matrix
and returns the result as a new instance.

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Return a new transposed Mat4.

#### Defined in

Math/Mat4.ts:579

___

### transposeInPlace

▸ **transposeInPlace**(): `void`

Transposes (exchanges columns with rows) this matrix.

#### Returns

`void`

#### Defined in

Math/Mat4.ts:550

