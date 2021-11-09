---
id: "Math_Box3.Box3"
title: "Class: Box3"
sidebar_label: "Box3"
custom_edit_url: null
---



Class representing a box in 3D space.
Represents a box in 3D space defined by two Vec3 values which define opposing corners of the box.

## Constructors

### constructor

• **new Box3**(`p0?`, `p1?`)

Creates a Box3 object using Vec3s.
In case the parameters are not passed by, their values are pre-defined:

p0 is a Vec2 with [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)

p1 is a Vec2 with [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p0?` | `Float32Array` \| [`Vec3`](Math_Vec3.Vec3) | A point representing the corners of a 3D box. |
| `p1?` | [`Vec3`](Math_Vec3.Vec3) | A point representing the corners of a 3D box. |

#### Defined in

[Math/Box3.ts:27](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L27)

## Properties

### p0

• **p0**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[Math/Box3.ts:13](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L13)

___

### p1

• **p1**: [`Vec3`](Math_Vec3.Vec3)

#### Defined in

[Math/Box3.ts:14](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L14)

## Accessors

### max

• `get` **max**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the upper (x, y, z) boundary of the box.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the maximum Vec3.

#### Defined in

[Math/Box3.ts:59](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L59)

___

### min

• `get` **min**(): [`Vec3`](Math_Vec3.Vec3)

Getter for the lower (x, y, z) boundary of the box.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the minimum Vec3.

#### Defined in

[Math/Box3.ts:50](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L50)

## Methods

### addBox3

▸ **addBox3**(`box3`, `transform?`): `void`

Adds `Box3` to this `Box3`, of the Xfo instance is passed in the parameters
it proceeds to apply the transform for the Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `box3` | [`Box3`](Math_Box3.Box3) | A 3D box. |
| `transform?` | [`Xfo`](Math_Xfo.Xfo) \| [`Mat4`](Math_Mat4.Mat4) | - |

#### Returns

`void`

#### Defined in

[Math/Box3.ts:129](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L129)

___

### addPoint

▸ **addPoint**(`point`): `void`

Expands the Box3 to contain the new point.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`Vec3`](Math_Vec3.Vec3) | A point represents the corners of a 3D box. |

#### Returns

`void`

#### Defined in

[Math/Box3.ts:107](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L107)

___

### center

▸ **center**(): [`Vec3`](Math_Vec3.Vec3)

Returns the center point of a Box3.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a Vec3.

#### Defined in

[Math/Box3.ts:169](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L169)

___

### clone

▸ **clone**(): [`Box3`](Math_Box3.Box3)

Clones this Box3 and returns a new Box3.

#### Returns

[`Box3`](Math_Box3.Box3)

- Returns a new Box3.

#### Defined in

[Math/Box3.ts:275](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L275)

___

### diagonal

▸ **diagonal**(): [`Vec3`](Math_Vec3.Vec3)

Returns the diagonal vector of the B=box from p0 to p1.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a Box3.

#### Defined in

[Math/Box3.ts:160](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L160)

___

### fromJSON

▸ **fromJSON**(`j`): `void`

Decodes a JSON object to set the state of this class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `Record`<`string`, `number`\>\> | The json object. |

#### Returns

`void`

#### Defined in

[Math/Box3.ts:299](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L299)

___

### getBoundingSphere

▸ **getBoundingSphere**(): [`SphereType`](Math_SphereType.SphereType)

Calculates and returns the bounding Sphere of the Box3

#### Returns

[`SphereType`](Math_SphereType.SphereType)

- The return value.

#### Defined in

[Math/Box3.ts:193](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L193)

___

### intersectsBox

▸ **intersectsBox**(`box`): `boolean`

Determines if this Box3 intersects a given box value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `box` | [`Box3`](Math_Box3.Box3) | The box to check for intersection against. |

#### Returns

`boolean`

- Returns true if the shapes intersect.

#### Defined in

[Math/Box3.ts:203](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L203)

___

### intersectsPlane

▸ **intersectsPlane**(`plane`): `boolean`

Determines if this Box3 intersects a plane.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plane` | `any` | The plane to check for intersection against. |

#### Returns

`boolean`

- The return value.

#### Defined in

[Math/Box3.ts:237](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L237)

___

### intersectsSphere

▸ **intersectsSphere**(`sphere`): `boolean`

Determines if this Box3 intersects a sphere.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sphere` | [`SphereType`](Math_SphereType.SphereType) | The sphere to check for intersection against. |

#### Returns

`boolean`

- Returns true if the shapes intersect.

#### Defined in

[Math/Box3.ts:221](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L221)

___

### isValid

▸ **isValid**(): `boolean`

Returns `true` if the box has been expanded to contain a point.

#### Returns

`boolean`

- The return value.

#### Defined in

[Math/Box3.ts:91](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L91)

___

### reset

▸ **reset**(): `void`

Resets the box3 back to an uninitialized state.

#### Returns

`void`

#### Defined in

[Math/Box3.ts:77](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L77)

___

### set

▸ **set**(`p0`, `p1`): `void`

Sets both Vec3 points

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p0` | [`Vec3`](Math_Vec3.Vec3) | A point representing the corners of a 3D box. |
| `p1` | [`Vec3`](Math_Vec3.Vec3) | A point representing the corners of a 3D box. |

#### Returns

`void`

#### Defined in

[Math/Box3.ts:69](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L69)

___

### setFromFloat32Array

▸ `Private` **setFromFloat32Array**(`float32array`): `void`

The setFromFloat32Array method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `float32array` | `Float32Array` | The float32array value. |

#### Returns

`void`

#### Defined in

[Math/Box3.ts:321](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L321)

___

### size

▸ **size**(): `number`

Returns the length of the diagonal of the box.

#### Returns

`number`

- Returns the distance.

#### Defined in

[Math/Box3.ts:151](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L151)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `Record`<`string`, `number`\>\>

Encodes `Box3` Class as a JSON object for persistence.

#### Returns

`Record`<`string`, `Record`<`string`, `number`\>\>

- The json object.

#### Defined in

[Math/Box3.ts:287](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L287)

___

### toMat4

▸ **toMat4**(): [`Mat4`](Math_Mat4.Mat4)

Converts this Box3 to a Mat4 (a 4x4 matrix). The returned mat4 would transform a unit cube into the shape of the Bounding box.

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns a new Mat4.

#### Defined in

[Math/Box3.ts:181](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L181)

___

### toString

▸ **toString**(): `string`

Calls `toJSON` method and stringifies it.

#### Returns

`string`

- The return value.

#### Defined in

[Math/Box3.ts:331](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Box3.ts#L331)

