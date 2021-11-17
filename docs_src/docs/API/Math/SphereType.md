---
id: "Math_SphereType.SphereType"
title: "Class: SphereType"
sidebar_label: "SphereType"
custom_edit_url: null
---



Class representing a mathematical sphere, as opposed to the Sphere class derived from ProceduralMesh.

## Constructors

### constructor

• **new SphereType**(`pos?`, `radius?`)

Create a sphere.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pos` | [`Vec3`](Math_Vec3.Vec3) | `undefined` | The position of the sphere. |
| `radius` | `number` | `0` | The radius of the sphere. |

#### Defined in

[Math/SphereType.ts:19](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/SphereType.ts#L19)

## Properties

### pos

• **pos**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[Math/SphereType.ts:11](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/SphereType.ts#L11)

___

### radius

• **radius**: `number`

#### Defined in

[Math/SphereType.ts:12](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/SphereType.ts#L12)

## Methods

### clone

▸ **clone**(): [`SphereType`](Math_SphereType.SphereType)

Clones this sphere and returns a new sphere.

#### Returns

[`SphereType`](Math_SphereType.SphereType)

- Returns a new sphere.

#### Defined in

[Math/SphereType.ts:33](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/SphereType.ts#L33)

___

### intersectsBox

▸ **intersectsBox**(`box`): `boolean`

Checks if this sphere intersects a box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `box` | [`Box3`](Math_Box3.Box3) | The box value. |

#### Returns

`boolean`

- The return value.

#### Defined in

[Math/SphereType.ts:43](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/SphereType.ts#L43)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number` \| `Record`<`string`, `number`\>\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `number` \| `Record`<`string`, `number`\>\>

- The json object.

#### Defined in

[Math/SphereType.ts:55](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/SphereType.ts#L55)

___

### toString

▸ **toString**(): `string`

Calls `toJSON` method and stringifies it.

#### Returns

`string`

- The return value.

#### Defined in

[Math/SphereType.ts:67](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/SphereType.ts#L67)

