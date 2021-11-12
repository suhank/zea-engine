---
id: "Math_Ray.Ray"
title: "Class: Ray"
sidebar_label: "Ray"
custom_edit_url: null
---



Class representing a ray that starts from an origin in a specified direction.

## Constructors

### constructor

• **new Ray**(`start?`, `dir?`)

Create a ray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | [`Vec3`](Math_Vec3.Vec3) | The origin of the ray. |
| `dir?` | [`Vec3`](Math_Vec3.Vec3) | The direction of the ray. |

#### Defined in

[Math/Ray.ts:20](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L20)

## Properties

### dir

• **dir**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[Math/Ray.ts:11](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L11)

___

### start

• **start**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[Math/Ray.ts:12](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L12)

## Methods

### clone

▸ **clone**(): [`Ray`](Math_Ray.Ray)

Clones this Ray and returns a new Ray.

#### Returns

[`Ray`](Math_Ray.Ray)

- Returns a new Ray.

#### Defined in

[Math/Ray.ts:231](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L231)

___

### closestPoint

▸ **closestPoint**(`point`): `number`

Get the closest point on the ray to the given point.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`Vec3`](Math_Vec3.Vec3) | The point in 3D space. |

#### Returns

`number`

- returns a number

#### Defined in

[Math/Ray.ts:40](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L40)

___

### closestPointOnLineSegment

▸ **closestPointOnLineSegment**(`p0`, `p1`): `number`[]

Get the closest point between the ray and the given line segment made of the 2 points.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p0` | [`Vec3`](Math_Vec3.Vec3) | The point in 3D space. |
| `p1` | [`Vec3`](Math_Vec3.Vec3) | The point in 3D space. |

#### Returns

`number`[]

- Returns an array containing 2 scalar values indicating 0: the fraction of the line segment, 1: distance along the Ray

#### Defined in

[Math/Ray.ts:56](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L56)

___

### fromJSON

▸ **fromJSON**(`j`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `Record`<`string`, `number`\>\> | The json object. |

#### Returns

`void`

#### Defined in

[Math/Ray.ts:255](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L255)

___

### intersectRayBox3

▸ **intersectRayBox3**(`box3`, `tolerance?`): `boolean`

Determines if this Box3 intersects a ray.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `box3` | [`Box3`](Math_Box3.Box3) | `undefined` | The box to check for intersection against. |
| `tolerance` | `number` | `0` | The tolerance of the test. |

#### Returns

`boolean`

- The return value.

#### Defined in

[Math/Ray.ts:186](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L186)

___

### intersectRayPlane

▸ **intersectRayPlane**(`plane`): `number`

Returns one ray param representing the intersection
of this ray against the plane defined by the given ray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plane` | [`Ray`](Math_Ray.Ray) | The plane to intersect with. |

#### Returns

`number`

- The return value.

#### Defined in

[Math/Ray.ts:160](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L160)

___

### intersectRayVector

▸ **intersectRayVector**(`ray`): `number` \| `number`[] \| [`Vec3`](Math_Vec3.Vec3)

Returns the two ray params that represent the closest point between the two rays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ray` | [`Ray`](Math_Ray.Ray) | The ray value. |

#### Returns

`number` \| `number`[] \| [`Vec3`](Math_Vec3.Vec3)

- Returns a Ray.

#### Defined in

[Math/Ray.ts:114](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L114)

___

### pointAtDist

▸ **pointAtDist**(`dist`): [`Vec3`](Math_Vec3.Vec3)

Get the closest point at a distance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dist` | `number` | The distance value. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a Vec3.

#### Defined in

[Math/Ray.ts:104](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L104)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `Record`<`string`, `number`\>\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `Record`<`string`, `number`\>\>

- The json object.

#### Defined in

[Math/Ray.ts:243](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L243)

___

### toString

▸ **toString**(): `string`

Calls `toJSON` method and stringifies it.

#### Returns

`string`

- The return value.

#### Defined in

[Math/Ray.ts:265](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Math/Ray.ts#L265)

