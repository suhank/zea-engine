---
id: "Math_Frustum.Frustum"
title: "Class: Frustum"
sidebar_label: "Frustum"
custom_edit_url: null
---



Class representing a Frustum. Frustums are used to determine what
is inside the camera's field of view.

## Constructors

### constructor

• **new Frustum**(`p0`, `p1`, `p2`, `p3`, `p4`, `p5`)

Create a Frustum

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p0` | [`PlaneType`](Math_PlaneType.PlaneType) | the p0 value. |
| `p1` | [`PlaneType`](Math_PlaneType.PlaneType) | the p1 value. |
| `p2` | [`PlaneType`](Math_PlaneType.PlaneType) | the p2 value. |
| `p3` | [`PlaneType`](Math_PlaneType.PlaneType) | the p3 value. |
| `p4` | [`PlaneType`](Math_PlaneType.PlaneType) | the p4 value. |
| `p5` | [`PlaneType`](Math_PlaneType.PlaneType) | the p5 value. |

#### Defined in

[Math/Frustum.ts:25](https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/Math/Frustum.ts#L25)

## Properties

### planes

• **planes**: [`PlaneType`](Math_PlaneType.PlaneType)[]

#### Defined in

[Math/Frustum.ts:15](https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/Math/Frustum.ts#L15)

## Methods

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

[Math/Frustum.ts:101](https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/Math/Frustum.ts#L101)

___

### intersectsBox

▸ **intersectsBox**(`box3`): `boolean`

Tests a box to see if it is entirely within the frustum.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `box3` | [`Box3`](Math_Box3.Box3) | The box to test. |

#### Returns

`boolean`

- True if the frustum intersects the box.

#### Defined in

[Math/Frustum.ts:59](https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/Math/Frustum.ts#L59)

___

### setFromMatrix

▸ **setFromMatrix**(`mat4`): `void`

The setFromMatrix configures a Frustum object using a matrix.
Typically the matrix is a model view projection matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mat4` | [`Mat4`](Math_Mat4.Mat4) | The matrix to use. |

#### Returns

`void`

#### Defined in

[Math/Frustum.ts:41](https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/Math/Frustum.ts#L41)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `unknown`\>

- The json object.

#### Defined in

[Math/Frustum.ts:85](https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/Math/Frustum.ts#L85)

___

### toString

▸ **toString**(): `string`

Calls `toJSON` method and stringifies it.

#### Returns

`string`

- The return value.

#### Defined in

[Math/Frustum.ts:115](https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/Math/Frustum.ts#L115)

