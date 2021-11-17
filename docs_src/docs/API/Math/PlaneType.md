---
id: "Math_PlaneType.PlaneType"
title: "Class: PlaneType"
sidebar_label: "PlaneType"
custom_edit_url: null
---



Class representing a plane.

## Constructors

### constructor

• **new PlaneType**(`normal?`, `w?`)

Create a plane.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `normal?` | [`Vec3`](Math_Vec3.Vec3) | `undefined` | The normal of the plane. |
| `w` | `number` | `0` | The w value. |

#### Defined in

[Math/PlaneType.ts:18](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L18)

## Properties

### normal

• **normal**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[Math/PlaneType.ts:9](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L9)

___

### w

• **w**: `number`

#### Defined in

[Math/PlaneType.ts:10](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L10)

## Methods

### clone

▸ **clone**(): [`PlaneType`](Math_PlaneType.PlaneType)

Clones this plane and returns a new plane.

#### Returns

[`PlaneType`](Math_PlaneType.PlaneType)

- Returns a new plane.

#### Defined in

[Math/PlaneType.ts:74](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L74)

___

### distanceToPoint

▸ **distanceToPoint**(`point`): `number`

Calculates the distance from a point to this plane.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`Vec3`](Math_Vec3.Vec3) | The point value. |

#### Returns

`number`

- The return value.

#### Defined in

[Math/PlaneType.ts:56](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L56)

___

### divideScalar

▸ **divideScalar**(`value`): `void`

The divideScalar method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value value. |

#### Returns

`void`

#### Defined in

[Math/PlaneType.ts:45](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L45)

___

### fromJSON

▸ **fromJSON**(`json`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Defined in

[Math/PlaneType.ts:93](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L93)

___

### normalizeInPlace

▸ **normalizeInPlace**(): `void`

Normalize this plane in place modifying its values.

#### Returns

`void`

#### Defined in

[Math/PlaneType.ts:63](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L63)

___

### set

▸ **set**(`x`, `y`, `z`, `w`): `void`

Setter from scalar components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x value. |
| `y` | `number` | The y value. |
| `z` | `number` | The z value. |
| `w` | `number` | The w value. |

#### Returns

`void`

#### Defined in

[Math/PlaneType.ts:35](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L35)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `unknown`\>

- The json object.

#### Defined in

[Math/PlaneType.ts:86](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L86)

___

### toString

▸ **toString**(): `string`

Calls `toJSON` method and stringifies it.

#### Returns

`string`

- The return value.

#### Defined in

[Math/PlaneType.ts:103](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/PlaneType.ts#L103)

