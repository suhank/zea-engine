---
id: "Math_Quat.Quat"
title: "Class: Quat"
sidebar_label: "Quat"
custom_edit_url: null
---



Class representing a quaternion. Quaternions are used to represent 3 dimensional rotations.

While Quaternions are difficult to understand they have important mathematical properties that make them very useful in 3d engines.
They can be directly multiplied together in the same was as matrices.
They can be interpolated from one value to another while maintaining constant angular velocity.
They can be converted to other more easily understood representations such as EulerAngles or Matrices.

## Constructors

### constructor

• **new Quat**(`x?`, `y?`, `z?`, `w?`)

Creates a quaternion.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` \| `ArrayBuffer` | `0` | The angle of the x axis. Default is 0. |
| `y` | `number` | `0` | The angle of the y axis. Default is 0. |
| `z` | `number` | `0` | The angle of the z axis. Default is 0. |
| `w` | `number` | `1` | The w value. Default is 1. |

#### Defined in

[Math/Quat.ts:29](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L29)

## Properties

### \_\_data

• **\_\_data**: `Float32Array`

#### Defined in

[Math/Quat.ts:20](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L20)

## Accessors

### w

• `get` **w**(): `number`

Getter for `w` value.

#### Returns

`number`

- Returns the w value.

#### Defined in

[Math/Quat.ts:117](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L117)

• `set` **w**(`val`): `void`

Setter for `w`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the w value.

#### Defined in

[Math/Quat.ts:125](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L125)

___

### x

• `get` **x**(): `number`

Getter for `x` axis rotation.

#### Returns

`number`

- Returns the x axis rotation.

#### Defined in

[Math/Quat.ts:63](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L63)

• `set` **x**(`val`): `void`

Setter for `x` axis rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the x axis rotation.

#### Defined in

[Math/Quat.ts:72](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L72)

___

### y

• `get` **y**(): `number`

Getter for `y` axis rotation.

#### Returns

`number`

- Returns the y axis rotation.

#### Defined in

[Math/Quat.ts:81](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L81)

• `set` **y**(`val`): `void`

Setter for `y` axis rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the y axis rotation.

#### Defined in

[Math/Quat.ts:90](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L90)

___

### z

• `get` **z**(): `number`

Getter for `z` axis rotation.

#### Returns

`number`

- Returns the z axis rotation.

#### Defined in

[Math/Quat.ts:99](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L99)

• `set` **z**(`val`): `void`

Setter for `z` axis rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the z axis rotation.

#### Defined in

[Math/Quat.ts:108](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L108)

## Methods

### add

▸ **add**(`other`): [`Quat`](Math_Quat.Quat)

Adds other to this Quat and return the result as a new Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to add. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:520](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L520)

___

### addInPlace

▸ **addInPlace**(`other`): `void`

Adds other to this Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to add. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:529](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L529)

___

### alignWith

▸ **alignWith**(`other`): `void`

Aligns this quaternion with another one ensuring that the delta between
the Quat values is the shortest path over the hyper-sphere.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to divide by. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:685](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L685)

___

### approxEqual

▸ **approxEqual**(`other`, `precision?`): `boolean`

Returns true if this Quat is approximately the same as other

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | `undefined` | The other Quat to compare with. |
| `precision` | `number` | `Number.EPSILON` | The precision to which the values must match. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Quat.ts:505](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L505)

___

### asArray

▸ **asArray**(): `Float32Array`

Returns the type as an array. Often used to pass types to the GPU.

#### Returns

`Float32Array`

- Returns as an array.

#### Defined in

[Math/Quat.ts:1030](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L1030)

___

### clone

▸ **clone**(): [`Quat`](Math_Quat.Quat)

Clones this Quat and returns a new Quat.

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:1021](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L1021)

___

### conjugate

▸ **conjugate**(): [`Quat`](Math_Quat.Quat)

Returns the rotational conjugate of this Quat.
Conjugation represents the same rotation of the Quat but
in the opposite direction around the rotational axis.

#### Returns

[`Quat`](Math_Quat.Quat)

- the return value.

#### Defined in

[Math/Quat.ts:666](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L666)

___

### cross

▸ **cross**(`other`): [`Quat`](Math_Quat.Quat)

Calculates the cross product of two Quats and returns the result as a new Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to calculate with. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns the cross product as a new Quat.

#### Defined in

[Math/Quat.ts:646](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L646)

___

### dot

▸ **dot**(`other`): `number`

Calculates the dot product of this quat against another.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to compare with. |

#### Returns

`number`

- Returns the dot product.

#### Defined in

[Math/Quat.ts:636](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L636)

___

### fromJSON

▸ **fromJSON**(`j`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `number`\> | The json object. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:1066](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L1066)

___

### getAngle

▸ **getAngle**(): `number`

Return the angle of the Quat.

#### Returns

`number`

- The return value.

#### Defined in

[Math/Quat.ts:474](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L474)

___

### getXaxis

▸ **getXaxis**(): [`Vec3`](Math_Vec3.Vec3)

Calculates a Vec3 value aligned with the X axis of this quaternion.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- The resulting Vec3 value

#### Defined in

[Math/Quat.ts:859](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L859)

___

### getYaxis

▸ **getYaxis**(): [`Vec3`](Math_Vec3.Vec3)

Calculates a Vec3 value aligned with the Y axis of this quaternion.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- The resulting Vec3 value

#### Defined in

[Math/Quat.ts:875](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L875)

___

### getZaxis

▸ **getZaxis**(): [`Vec3`](Math_Vec3.Vec3)

Calculates a Vec3 value aligned with the Z axis of this quaternion.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- The resulting Vec3 value

#### Defined in

[Math/Quat.ts:891](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L891)

___

### inverse

▸ **inverse**(): [`Quat`](Math_Quat.Quat)

Return the inverse of the `Quat`

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:675](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L675)

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Checks if this Quat contains the same values as the other Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to compare with. |

#### Returns

`boolean`

- Returns `true` if are the same Vector, otherwise, `false`.

#### Defined in

[Math/Quat.ts:484](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L484)

___

### isIdentity

▸ **isIdentity**(): `boolean`

Checks if the angle of the Quat is less that ` Number.EPSILON`

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Quat.ts:465](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L465)

___

### length

▸ **length**(): `number`

Calculates the length of this Quat.

#### Returns

`number`

- Returns the length.

#### Defined in

[Math/Quat.ts:573](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L573)

___

### lengthSquared

▸ **lengthSquared**(): `number`

Calculates the squared length of this Quat.

#### Returns

`number`

- Returns the length.

#### Defined in

[Math/Quat.ts:586](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L586)

___

### lerp

▸ **lerp**(`other`, `t`): [`Quat`](Math_Quat.Quat)

Performs a linear interpolation of this Quat towards another Quat, returning the result as a new Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to interpolate towards. |
| `t` | `number` | Interpolation amount between the two inputs. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:971](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L971)

___

### mirror

▸ **mirror**(`axisIndex`): [`Quat`](Math_Quat.Quat)

Reflects this quaternion according to the axis provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axisIndex` | `number` | An integer with value of 0 for the X axis, 1 for the Y axis, and 2 for the Z axis. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:910](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L910)

___

### multiply

▸ **multiply**(`other`): [`Quat`](Math_Quat.Quat)

Multiplies two this quat by another returning the result as a new Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to multiply. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:697](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L697)

___

### multiplyInPlace

▸ **multiplyInPlace**(`other`): `void`

Multiplies this quat by another, modifying its values in place.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to multiply. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:720](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L720)

___

### normalize

▸ **normalize**(): [`Quat`](Math_Quat.Quat)

Normalizes the Quat and returns it as a new Quat.

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns the Quat normalized.

#### Defined in

[Math/Quat.ts:599](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L599)

___

### normalizeInPlace

▸ **normalizeInPlace**(): `void`

Normalizes the Quat, modifying its values in place.

#### Returns

`void`

#### Defined in

[Math/Quat.ts:617](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L617)

___

### notEquals

▸ **notEquals**(`other`): `boolean`

Returns true if this Quat is NOT exactly the same other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to compare with. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Quat.ts:494](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L494)

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

[Math/Quat.ts:1079](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L1079)

___

### rotateVec3

▸ **rotateVec3**(`vec3`): [`Vec3`](Math_Vec3.Vec3)

Rotates a vector by this quaternion.
Don't forget to normalize the quaternion unless
you want axial translation as well as rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The vec3 value. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

[Math/Quat.ts:746](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L746)

___

### rotateX

▸ **rotateX**(`rad`): `void`

Sets this quaternion to a rotation by the given angle about the X axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rad` | `number` | Angle (in radians) to rotate. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:757](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L757)

___

### rotateY

▸ **rotateY**(`rad`): `void`

Sets this quaternion to a rotation by the given angle about the Y axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rad` | `number` | Angle (in radians) to rotate. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:778](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L778)

___

### rotateZ

▸ **rotateZ**(`rad`): `void`

Sets this quaternion to a rotation by the given angle about the Z axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rad` | `number` | Angle (in radians) to rotate. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:799](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L799)

___

### scale

▸ **scale**(`scalar`): [`Quat`](Math_Quat.Quat)

Scales this Quat by scalar and returns the result as a new Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Vec3.

#### Defined in

[Math/Quat.ts:552](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L552)

___

### scaleInPlace

▸ **scaleInPlace**(`scalar`): `void`

Scales this Quat by scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:561](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L561)

___

### set

▸ **set**(`x`, `y`, `z`, `w`): `void`

Setter from scalar components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x axis rotation. |
| `y` | `number` | The y axis rotation. |
| `z` | `number` | The z axis rotation. |
| `w` | `number` | The w value. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:137](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L137)

___

### setDataArray

▸ **setDataArray**(`float32Array`): `void`

Sets the state of the Quat class using a Float32Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `float32Array` | `Float32Array` | The float32Array value. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:149](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L149)

___

### setFrom2Vectors

▸ **setFrom2Vectors**(`v0`, `v1`): `void`

Sets the state of the `Quat` from two `Vec3`. The quaternion would then represent the rotation from v0 to v1 in 3d space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v0` | [`Vec3`](Math_Vec3.Vec3) | The v0 unit vector. |
| `v1` | [`Vec3`](Math_Vec3.Vec3) | The v1 unit vector. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:375](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L375)

___

### setFromAxisAndAngle

▸ **setFromAxisAndAngle**(`axis`, `angle`): `void`

Set this Quat to a rotation defined by an axis and an angle (in radians).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | [`Vec3`](Math_Vec3.Vec3) | The axis around which to rotate. |
| `angle` | `number` | The angle to rotate |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:349](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L349)

___

### setFromDirectionAndUpvector

▸ **setFromDirectionAndUpvector**(`dir`, `up`): `void`

Sets the state of the Quat to look in a particular direction along the z axis.
> The camera looks down the negative z axis, so to set a rotation value
> for the camera, remember to negate the direction vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | [`Vec3`](Math_Vec3.Vec3) | The direction value. |
| `up` | [`Vec3`](Math_Vec3.Vec3) | The up vector. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:363](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L363)

___

### setFromEulerAngles

▸ **setFromEulerAngles**(`eulerAngles`): `void`

Set this Quat from a euler rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eulerAngles` | [`EulerAngles`](Math_EulerAngles.EulerAngles) | The euler angles rotation. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:170](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L170)

___

### setFromMat3

▸ **setFromMat3**(`mat3`): `void`

Set the Quat from a Mat3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mat3` | [`Mat3`](Math_Mat3.Mat3) | The mat3 value. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:389](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L389)

___

### setFromMat4

▸ **setFromMat4**(`mat4`): `void`

Set the Quat from a Mat4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mat4` | [`Mat4`](Math_Mat4.Mat4) | The mat4 value. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:427](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L427)

___

### setFromOther

▸ **setFromOther**(`other`): `void`

Setter from another vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other vector to set from. |

#### Returns

`void`

#### Defined in

[Math/Quat.ts:158](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L158)

___

### slerp

▸ **slerp**(`other`, `t`): [`Quat`](Math_Quat.Quat)

Performs a spherical linear interpolation of this Quat towards another Quat, returning the result as a new Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to interpolate towards. |
| `t` | `number` | Interpolation amount between the two inputs. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:989](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L989)

___

### subtract

▸ **subtract**(`other`): [`Quat`](Math_Quat.Quat)

Subtracts other from this Quat and returns the result as a new Quat.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Quat`](Math_Quat.Quat) | The other Quat to subtract. |

#### Returns

[`Quat`](Math_Quat.Quat)

- Returns a new Quat.

#### Defined in

[Math/Quat.ts:542](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L542)

___

### toEulerAngles

▸ **toEulerAngles**(`rotationOrder`): [`EulerAngles`](Math_EulerAngles.EulerAngles)

Converts Quat to an EulerAngles

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rotationOrder` | `string` \| `number` | The order in which the rotations are applied. |

#### Returns

[`EulerAngles`](Math_EulerAngles.EulerAngles)

- The return value.

#### Defined in

[Math/Quat.ts:269](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L269)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `number`\>

- The json object.

#### Defined in

[Math/Quat.ts:1052](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L1052)

___

### toMat3

▸ **toMat3**(): [`Mat3`](Math_Mat3.Mat3)

Converts this Quat to a Mat3 (a 3x3 matrix).

#### Returns

[`Mat3`](Math_Mat3.Mat3)

- TReturns a new Mat3.

#### Defined in

[Math/Quat.ts:820](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L820)

___

### toMat4

▸ **toMat4**(): [`Mat4`](Math_Mat4.Mat4)

Converts this Quat to a Mat4 (a 4x4 matrix).

#### Returns

[`Mat4`](Math_Mat4.Mat4)

- Returns a new Mat4.

#### Defined in

[Math/Quat.ts:929](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L929)

___

### toString

▸ **toString**(): `string`

Converts this Vec3 to a string in JSON format.

#### Returns

`string`

- The return value.

#### Defined in

[Math/Quat.ts:1042](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Quat.ts#L1042)

