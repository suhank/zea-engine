---
id: "Utilities_MathFunctions.MathFunctions"
title: "Class: MathFunctions"
sidebar_label: "MathFunctions"
custom_edit_url: null
---



Math Functions

## Constructors

### constructor

• **new MathFunctions**()

## Methods

### clamp

▸ `Static` **clamp**(`value`, `min`, `max`): `number`

Restricts the specified value between two numbers

**`static`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

#### Defined in

[Utilities/MathFunctions.ts:84](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L84)

___

### convertFloat32ArrayToUInt16Array

▸ `Static` **convertFloat32ArrayToUInt16Array**(`float32Array`): `Uint16Array`

Transforms an array of Float 32 to an array of unsigned Int16.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `float32Array` | `Float32Array` | - |

#### Returns

`Uint16Array`

- Unsigned Int16 array representative of the Float32Array

#### Defined in

[Utilities/MathFunctions.ts:337](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L337)

___

### decode16BitFloat

▸ `Static` **decode16BitFloat**(`h`): `number`

As opposite of the `encode16BitFloat` method, this takes an encoded integer value,
and returns the 16 bit float.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `h` | `number` | Encoded integer |

#### Returns

`number`

- Decoded 16 bit float.

#### Defined in

[Utilities/MathFunctions.ts:316](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L316)

___

### decode16BitFloatFrom2xUInt8

▸ `Static` **decode16BitFloatFrom2xUInt8**(`c`): `number`

Decodes a Float16 from two unsigned Int8

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | `Uint8Array` | Array with the two UInt8 |

#### Returns

`number`

- Decoded Float16

#### Defined in

[Utilities/MathFunctions.ts:197](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L197)

___

### degToRad

▸ `Static` **degToRad**(`deg`): `number`

Converts Degrees to Radiants

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deg` | `number` | Degrees value |

#### Returns

`number`

-  Radians equivalent

#### Defined in

[Utilities/MathFunctions.ts:33](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L33)

___

### encode16BitFloat

▸ `Static` **encode16BitFloat**(`v`): `number`

Transforms a 16 bit float to an encoded integer.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Float16 number to encode |

#### Returns

`number`

- Encoded number

#### Defined in

[Utilities/MathFunctions.ts:263](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L263)

___

### encode16BitFloatInto2xUInt8

▸ `Static` **encode16BitFloatInto2xUInt8**(`v`): `Uint8Array`

Encodes an array of two unsigned Int8 to a Float16

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Float16 number |

#### Returns

`Uint8Array`

- Encoded Unsigned Int8 array

#### Defined in

[Utilities/MathFunctions.ts:221](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L221)

___

### fract

▸ `Static` **fract**(`value`): `number`

Returns the fractional component of a number

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:138](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L138)

___

### isNumeric

▸ `Static` **isNumeric**(`number`): `boolean`

Verifies if the specified parameter is numeric.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number` | `any` | Number to test |

#### Returns

`boolean`

- `true` when is a valid number

#### Defined in

[Utilities/MathFunctions.ts:44](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L44)

___

### lerp

▸ `Static` **lerp**(`v0`, `v1`, `t`): `number`

Calculates a lineal interpolation between two inputs for the specified parameter(t).

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v0` | `number` | - |
| `v1` | `number` | - |
| `t` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:71](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L71)

___

### linStep

▸ `Static` **linStep**(`edge0`, `edge1`, `x`): `number`

Performs - interpolation between two values

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `edge0` | `number` | - |
| `edge1` | `number` | - |
| `x` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:186](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L186)

___

### nearestPow10

▸ `Static` **nearestPow10**(`value`): `number`

Returns the nearest pow of ten value of the specified number.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:106](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L106)

___

### nearestPow2

▸ `Static` **nearestPow2**(`value`): `number`

Returns the nearest pow of two value of the specified number.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:95](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L95)

___

### nextPow2

▸ `Static` **nextPow2**(`value`): `number`

Returns the next pow of two value of the specified number.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:117](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L117)

___

### radToDeg

▸ `Static` **radToDeg**(`rad`): `number`

Converts Radians to Degrees

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rad` | `number` | Radians value |

#### Returns

`number`

- Degrees equivalent

#### Defined in

[Utilities/MathFunctions.ts:22](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L22)

___

### randomInt

▸ `Static` **randomInt**(`min`, `max`): `number`

Generates and returns a random integer within the specified range.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | `number` | Lower value random int can be. |
| `max` | `number` | Highest value random int can be. |

#### Returns

`number`

- Random number inside range.

#### Defined in

[Utilities/MathFunctions.ts:56](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L56)

___

### remap

▸ `Static` **remap**(`value`, `start1`, `end1`, `start2`, `end2`): `number`

Moves the specified value from one numeric domain(range) to another.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | - |
| `start1` | `number` | - |
| `end1` | `number` | - |
| `start2` | `number` | - |
| `end2` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:159](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L159)

___

### smoothStep

▸ `Static` **smoothStep**(`edge0`, `edge1`, `x`): `number`

Perform Hermite interpolation between two values

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `edge0` | `number` | - |
| `edge1` | `number` | - |
| `x` | `number` | - |

#### Returns

`number`

-

#### Defined in

[Utilities/MathFunctions.ts:172](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/MathFunctions.ts#L172)

