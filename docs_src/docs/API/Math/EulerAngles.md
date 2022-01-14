---
id: "Math_EulerAngles.EulerAngles"
title: "Class: EulerAngles"
sidebar_label: "EulerAngles"
custom_edit_url: null
---



Class representing euler angles. Euler angles describe rotating an object
around its various axis in a specified axis order.

## Constructors

### constructor

• **new EulerAngles**(`x?`, `y?`, `z?`, `order?`)

Create a euler angle. Receives the xyz values in radians and the order that the rotations are applied.

Order parameter values: `XYZ: 0`, `YZX: 1`, `ZXY: 2`, `XZY: 3`, `ZYX: 4`, `YXZ: 5`

It could be either the `string` or the `number` value.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` \| `ArrayBuffer` | `0` | The angle of the x axis in degrees. Default is 0. |
| `y` | `number` | `0` | The angle of the y axis in degrees. Default is 0. |
| `z` | `number` | `0` | The angle of the z axis in degrees. Default is 0. |
| `order` | `string` \| `number` | `0` | The order in which the rotations are applied. |

#### Defined in

[src/Math/EulerAngles.ts:23](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L23)

## Properties

### \_\_data

• **\_\_data**: `Float32Array`

#### Defined in

[src/Math/EulerAngles.ts:10](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L10)

___

### order

• **order**: `number`

#### Defined in

[src/Math/EulerAngles.ts:9](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L9)

## Accessors

### x

• `get` **x**(): `number`

Getter for x axis rotation.

#### Returns

`number`

- Returns the x axis rotation.

#### Defined in

[src/Math/EulerAngles.ts:66](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L66)

• `set` **x**(`val`): `void`

Setter for x axis rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the x axis rotation.

#### Defined in

[src/Math/EulerAngles.ts:75](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L75)

___

### y

• `get` **y**(): `number`

Getter for y axis rotation.

#### Returns

`number`

- Returns the y axis rotation.

#### Defined in

[src/Math/EulerAngles.ts:84](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L84)

• `set` **y**(`val`): `void`

Setter for y axis rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the y axis rotation.

#### Defined in

[src/Math/EulerAngles.ts:93](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L93)

___

### z

• `get` **z**(): `number`

Getter for z axis rotation.

#### Returns

`number`

- Returns the z axis rotation.

#### Defined in

[src/Math/EulerAngles.ts:102](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L102)

• `set` **z**(`val`): `void`

Setter for z axis rotation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the z axis rotation.

#### Defined in

[src/Math/EulerAngles.ts:111](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L111)

## Methods

### fromJSON

▸ **fromJSON**(`json`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `Record`<`string`, `number`\> |

#### Returns

`void`

#### Defined in

[src/Math/EulerAngles.ts:150](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L150)

___

### set

▸ **set**(`x`, `y`, `z`): `void`

Sets the EulerAngles

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x axis rotation in radians. |
| `y` | `number` | The y axis rotation in radians. |
| `z` | `number` | The z axis rotation in radians. |

#### Returns

`void`

#### Defined in

[src/Math/EulerAngles.ts:122](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L122)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number`\>

#### Returns

`Record`<`string`, `number`\>

#### Defined in

[src/Math/EulerAngles.ts:141](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L141)

___

### toString

▸ **toString**(): `string`

Converts this Vec3 to a string in JSON format.

#### Returns

`string`

- The return value.

#### Defined in

[src/Math/EulerAngles.ts:136](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Math/EulerAngles.ts#L136)

