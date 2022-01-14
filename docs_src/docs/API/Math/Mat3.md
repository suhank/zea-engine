---
id: "Math_Mat3.Mat3"
title: "Class: Mat3"
sidebar_label: "Mat3"
custom_edit_url: null
---



A class representing a 3x3 matrix.
This matrix class is based on GLM, and is column major.

## Constructors

### constructor

• **new Mat3**(`m00?`, `m01?`, `m02?`, `m10?`, `m11?`, `m12?`, `m20?`, `m21?`, `m22?`)

Initializes the Mat3 class with given data.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `m00` | `number` \| `Float32Array` \| [`Vec3`](Math_Vec3.Vec3) | `1` | Row 0, column 0. |
| `m01` | `number` \| [`Vec3`](Math_Vec3.Vec3) | `0` | Row 0, column 1. |
| `m02` | `number` \| [`Vec3`](Math_Vec3.Vec3) | `0` | Row 0, column 2. |
| `m10` | `number` | `0` | Row 1, column 0. |
| `m11` | `number` | `1` | Row 1, column 1. |
| `m12` | `number` | `0` | Row 1, column 2. |
| `m20` | `number` | `0` | Row 2, column 0. |
| `m21` | `number` | `0` | Row 2, column 1. |
| `m22` | `number` | `1` | Row 2, column 2. |

#### Defined in

[src/Math/Mat3.ts:26](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L26)

## Properties

### \_\_data

• **\_\_data**: `Float32Array`

#### Defined in

[src/Math/Mat3.ts:12](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L12)

## Accessors

### m00

• `get` **m00**(): `number`

Getter for row 0, column 0.

#### Returns

`number`

- Returns the m00 value.

#### Defined in

[src/Math/Mat3.ts:60](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L60)

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

[src/Math/Mat3.ts:69](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L69)

___

### m01

• `get` **m01**(): `number`

Getter for row 0, column 1.

#### Returns

`number`

- Returns the m01 value.

#### Defined in

[src/Math/Mat3.ts:78](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L78)

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

[src/Math/Mat3.ts:87](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L87)

___

### m02

• `get` **m02**(): `number`

Getter for row 0, column 2.

#### Returns

`number`

- Returns the m02 value.

#### Defined in

[src/Math/Mat3.ts:96](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L96)

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

[src/Math/Mat3.ts:105](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L105)

___

### m10

• `get` **m10**(): `number`

Getter for row 1, column 0.

#### Returns

`number`

- Returns the m10 value.

#### Defined in

[src/Math/Mat3.ts:114](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L114)

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

[src/Math/Mat3.ts:123](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L123)

___

### m11

• `get` **m11**(): `number`

Getter for row 1, column 1

#### Returns

`number`

- Returns the m11 value.

#### Defined in

[src/Math/Mat3.ts:132](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L132)

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

[src/Math/Mat3.ts:141](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L141)

___

### m12

• `get` **m12**(): `number`

Getter for row 1, column 2.

#### Returns

`number`

- Returns the m12 value.

#### Defined in

[src/Math/Mat3.ts:150](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L150)

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

[src/Math/Mat3.ts:159](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L159)

___

### m20

• `get` **m20**(): `number`

Getter for row 2, column 0.

#### Returns

`number`

- Returns the m20 value.

#### Defined in

[src/Math/Mat3.ts:168](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L168)

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

[src/Math/Mat3.ts:177](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L177)

___

### m21

• `get` **m21**(): `number`

Getter for row 2, column 1.

#### Returns

`number`

- Returns the m21 value.

#### Defined in

[src/Math/Mat3.ts:186](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L186)

• `set` **m21**(`val`): `void`

Setter for row 2, column 1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the m21 value.

#### Defined in

[src/Math/Mat3.ts:195](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L195)

___

### m22

• `get` **m22**(): `number`

Getter for row 2, column 2.

#### Returns

`number`

- Returns the m22 value.

#### Defined in

[src/Math/Mat3.ts:204](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L204)

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

[src/Math/Mat3.ts:213](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L213)

___

### xAxis

• `get` **xAxis**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the `x` axis.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the `x` axis as a Vec3.

#### Defined in

[src/Math/Mat3.ts:222](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L222)

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

[src/Math/Mat3.ts:231](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L231)

___

### yAxis

• `get` **yAxis**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the `y` axis.
* @return - Returns the `y` axis as a Vec3.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

#### Defined in

[src/Math/Mat3.ts:239](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L239)

• `set` **yAxis**(`vec3`): `void`

Setter for the `y` axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

`void`

#### Defined in

[src/Math/Mat3.ts:247](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L247)

___

### zAxis

• `get` **zAxis**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the `z` axis.
* @return - Returns the `z` axis as a Vec3.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

#### Defined in

[src/Math/Mat3.ts:255](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L255)

• `set` **zAxis**(`vec3`): `void`

Setter for the `z` axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

`void`

#### Defined in

[src/Math/Mat3.ts:263](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L263)

## Methods

### asArray

▸ **asArray**(): `Float32Array` \| `Uint32Array`

Returns current Math type data as array. Often used to pass types to the GPU.

#### Returns

`Float32Array` \| `Uint32Array`

- Returns the result as an array.

#### Defined in

[src/Math/Mat3.ts:545](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L545)

___

### clone

▸ **clone**(): [`Mat3`](Math_Mat3.Mat3)

Clones this Mat3 returning a new instance.

#### Returns

[`Mat3`](Math_Mat3.Mat3)

- Returns a new Mat3.

#### Defined in

[src/Math/Mat3.ts:485](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L485)

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

[src/Math/Mat3.ts:523](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L523)

___

### inverse

▸ **inverse**(): [`Mat3`](Math_Mat3.Mat3)

Inverts a Mat3 and returns the result as a new instance.

#### Returns

[`Mat3`](Math_Mat3.Mat3)

- Returns a new Mat3.

#### Defined in

[src/Math/Mat3.ts:353](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L353)

___

### invertInPlace

▸ **invertInPlace**(): `boolean`

Inverts a Mat3 in place modifying its values.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Math/Mat3.ts:393](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L393)

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

[src/Math/Mat3.ts:507](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L507)

___

### set

▸ **set**(`m00?`, `m01?`, `m02?`, `m10?`, `m11?`, `m12?`, `m20?`, `m21?`, `m22?`): `void`

Sets the state of the Mat3 class

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `m00` | `number` | `1` | Row 0, column 0. |
| `m01` | `number` | `0` | Row 0, column 1. |
| `m02` | `number` | `0` | Row 0, column 2. |
| `m10` | `number` | `0` | Row 1, column 0. |
| `m11` | `number` | `1` | Row 1, column 1. |
| `m12` | `number` | `0` | Row 1, column 2. |
| `m20` | `number` | `0` | Row 2, column 0. |
| `m21` | `number` | `0` | Row 2, column 1. |
| `m22` | `number` | `1` | Row 2, column 2. |

#### Returns

`void`

#### Defined in

[src/Math/Mat3.ts:283](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L283)

___

### setFromDirectionAndUpvector

▸ **setFromDirectionAndUpvector**(`dir`, `up`): `void`

Scales and calculates the cross product of the `Vec3` and sets the result in the Mat3
Note: the resulting matrix +Z axis is aligned with the provided direction value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | [`Vec3`](Math_Vec3.Vec3) | The dir value. |
| `up` | [`Vec3`](Math_Vec3.Vec3) | The up value. |

#### Returns

`void`

#### Defined in

[src/Math/Mat3.ts:328](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L328)

___

### setFromMat

▸ **setFromMat**(`mat`): `void`

Sets state of the Mat3 from another Mat3

Note: works with either Mat3 or Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mat` | [`Mat3`](Math_Mat3.Mat3) | The mat value. |

#### Returns

`void`

#### Defined in

[src/Math/Mat3.ts:309](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L309)

___

### setIdentity

▸ **setIdentity**(): `void`

Sets state of the Mat3 with the identity  Matrix

#### Returns

`void`

#### Defined in

[src/Math/Mat3.ts:298](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L298)

___

### toJSON

▸ **toJSON**(): `Float32Array`

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Float32Array`

- The json object.

#### Defined in

[src/Math/Mat3.ts:515](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L515)

___

### toString

▸ **toString**(): `string`

Converts this Vec3 to a string in JSON format.

#### Returns

`string`

- The return value.

#### Defined in

[src/Math/Mat3.ts:535](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L535)

___

### transformVec3

▸ **transformVec3**(`vec3`): [`Vec3`](Math_Vec3.Vec3)

Transforms the Vec3 with a Mat3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Return the result as a new Vec3.

#### Defined in

[src/Math/Mat3.ts:472](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L472)

___

### transpose

▸ **transpose**(): [`Mat3`](Math_Mat3.Mat3)

Transposes (exchanges columns with rows) this matrix
and returns the result as a new instance.

#### Returns

[`Mat3`](Math_Mat3.Mat3)

- Return a new transposed Mat3.

#### Defined in

[src/Math/Mat3.ts:435](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L435)

___

### transposeInPlace

▸ **transposeInPlace**(): `void`

Transposes (exchanges columns with rows) this matrix modifying its values.

#### Returns

`void`

#### Defined in

[src/Math/Mat3.ts:452](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Mat3.ts#L452)

