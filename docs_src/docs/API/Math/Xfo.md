---
id: "Math_Xfo.Xfo"
title: "Class: Xfo"
sidebar_label: "Xfo"
custom_edit_url: null
---



Class representing an Xfo transform, which is a transformation decomposed into 3 component values. Translation, Orientation, and Scaling.

## Constructors

### constructor

• **new Xfo**(`tr?`, `ori?`, `sc?`)

Initializes the Xfo object.

**Note:** You can leave it empty and use other methods ti set the state of the class.

**`see`** [`setFromOther`](#setFromOther) [`setFromMat4`](#setFromMat4) [`setFromFloat32Array`](#setFromFloat32Array) [`fromJSON`](#fromJSON)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tr?` | `Float32Array` \| [`Vec3`](Math_Vec3.Vec3) \| [`Quat`](Math_Quat.Quat) | The translation value. |
| `ori?` | [`Quat`](Math_Quat.Quat) | The orientation value. |
| `sc?` | [`Vec3`](Math_Vec3.Vec3) | The scaling value. |

#### Defined in

[src/Math/Xfo.ts:27](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L27)

## Properties

### ori

• **ori**: [`Quat`](Math_Quat.Quat)

#### Defined in

[src/Math/Xfo.ts:12](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L12)

___

### sc

• **sc**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[src/Math/Xfo.ts:13](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L13)

___

### tr

• **tr**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[src/Math/Xfo.ts:14](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L14)

## Methods

### approxEqual

▸ **approxEqual**(`other`, `precision?`): `boolean`

Returns true if this Vec2 is approximately the same as other.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | [`Xfo`](Math_Xfo.Xfo) | `undefined` | The other Vec3 to compare with. |
| `precision` | `number` | `Number.EPSILON` | The precision to which the values must match. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[src/Math/Xfo.ts:105](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L105)

___

### clone

▸ **clone**(): [`Xfo`](Math_Xfo.Xfo)

Clones this Xfo and returns a new Xfo.

#### Returns

[`Xfo`](Math_Xfo.Xfo)

- Returns a new Xfo.

#### Defined in

[src/Math/Xfo.ts:249](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L249)

___

### fromJSON

▸ **fromJSON**(`j`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object. |

#### Returns

`void`

#### Defined in

[src/Math/Xfo.ts:276](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L276)

___

### inverse

▸ **inverse**(): [`Xfo`](Math_Xfo.Xfo)

Returns the inverse of the Xfo object, but returns. the result as a new Xfo.

#### Returns

[`Xfo`](Math_Xfo.Xfo)

- Returns a new Xfo.

#### Defined in

[src/Math/Xfo.ts:158](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L158)

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Checks if this Vec3 contains the same values as the other Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Xfo`](Math_Xfo.Xfo) | The other Vec3 to compare with. |

#### Returns

`boolean`

- Returns `true` if are the same Vector, otherwise, `false`.

#### Defined in

[src/Math/Xfo.ts:94](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L94)

___

### isIdentity

▸ **isIdentity**(): `boolean`

Verifies that the Xfo object is an `identity`, checking that the translation, orientation and scaling attributes are in their initial state.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Math/Xfo.ts:84](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L84)

___

### multiply

▸ **multiply**(`xfo`): [`Xfo`](Math_Xfo.Xfo)

Multiplies two Xfo transforms.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xfo` | [`Xfo`](Math_Xfo.Xfo) | The xfo to multiply with. |

#### Returns

[`Xfo`](Math_Xfo.Xfo)

- Returns an Xfo.

#### Defined in

[src/Math/Xfo.ts:137](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L137)

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

[src/Math/Xfo.ts:289](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L289)

___

### set

▸ **set**(`tr`, `ori`, `sc?`): `void`

Sets the state of the Xfo object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tr` | [`Vec3`](Math_Vec3.Vec3) | The translation value. |
| `ori` | [`Quat`](Math_Quat.Quat) | The orientation value. |
| `sc?` | [`Vec3`](Math_Vec3.Vec3) | The scaling value. |

#### Returns

`void`

#### Defined in

[src/Math/Xfo.ts:62](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L62)

___

### setFromFloat32Array

▸ **setFromFloat32Array**(`float32array`): `void`

Sets the state of the Xfo object using an `Float32array`.

**Note:** You can set the byteOffset in your `Float32array` object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `float32array` | `Float32Array` | The float32array value. |

#### Returns

`void`

#### Defined in

[src/Math/Xfo.ts:222](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L222)

___

### setFromMat4

▸ **setFromMat4**(`mat4`): `void`

Sets the state of the Xfo object using Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mat4` | [`Mat4`](Math_Mat4.Mat4) | The mat4 value. |

#### Returns

`void`

#### Defined in

[src/Math/Xfo.ts:210](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L210)

___

### setFromOther

▸ **setFromOther**(`other`): `void`

Sets the state of the Xfo object using another Xfo object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Xfo`](Math_Xfo.Xfo) | The other Xfo to set from. |

#### Returns

`void`

#### Defined in

[src/Math/Xfo.ts:73](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L73)

___

### setLookAt

▸ **setLookAt**(`pos`, `target`, `up`): `void`

The setLookAt method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | [`Vec3`](Math_Vec3.Vec3) | The position value. |
| `target` | [`Vec3`](Math_Vec3.Vec3) | The target value. |
| `up` | [`Vec3`](Math_Vec3.Vec3) | The up value. |

#### Returns

`void`

#### Defined in

[src/Math/Xfo.ts:119](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L119)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `any`\>

- The json object.

#### Defined in

[src/Math/Xfo.ts:261](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L261)

___

### toMat4

▸ **toMat4**(): [`Mat4`](Math_Mat4.Mat4)

Converts this Xfo to a Mat4 (a 4x4 matrix).

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns a new Mat4.

#### Defined in

[src/Math/Xfo.ts:195](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L195)

___

### toString

▸ **toString**(): `string`

The fromJSON method decodes a json object for this type.

#### Returns

`string`

- The return value.

#### Defined in

[src/Math/Xfo.ts:300](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L300)

___

### transformVec3

▸ **transformVec3**(`vec3`): [`Vec3`](Math_Vec3.Vec3)

Transforms Xfo object using a `Vec3` object. First scaling it, then rotating and finally adding the result to current translation object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- The return value.

#### Defined in

[src/Math/Xfo.ts:186](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Math/Xfo.ts#L186)

