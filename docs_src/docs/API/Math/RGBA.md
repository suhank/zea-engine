---
id: "Math_RGBA.RGBA"
title: "Class: RGBA"
sidebar_label: "RGBA"
custom_edit_url: null
---



Class representing the red, green, blue and alpha channel of a color as 8bit values.

## Constructors

### constructor

• **new RGBA**(`r?`, `g?`, `b?`, `a?`)

Create a RGBA.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `r` | `string` \| `number` \| `ArrayBuffer` \| `Uint8Array` | `0` | The red channel of a color. |
| `g` | `number` | `0` | The green channel of a color. |
| `b` | `number` | `0` | The blue channel of a color. |
| `a` | `number` | `255` | The alpha (transparency) channel of a color. |

#### Defined in

[Math/RGBA.ts:16](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L16)

## Properties

### \_\_data

• **\_\_data**: `Uint8Array`

#### Defined in

[Math/RGBA.ts:8](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L8)

## Accessors

### a

• `get` **a**(): `number`

Getter for alpha channel.

#### Returns

`number`

- Returns the alpha channel.

#### Defined in

[Math/RGBA.ts:99](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L99)

• `set` **a**(`val`): `void`

Setter for alpha value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the alpha channel.

#### Defined in

[Math/RGBA.ts:107](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L107)

___

### b

• `get` **b**(): `number`

Getter for blue channel.

#### Returns

`number`

- Returns the blue channel.

#### Defined in

[Math/RGBA.ts:81](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L81)

• `set` **b**(`val`): `void`

Setter for blue channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the blue channel.

#### Defined in

[Math/RGBA.ts:90](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L90)

___

### g

• `get` **g**(): `number`

Getter for green channel.

#### Returns

`number`

- Returns the green channel.

#### Defined in

[Math/RGBA.ts:63](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L63)

• `set` **g**(`val`): `void`

Setter for green channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the green channel.

#### Defined in

[Math/RGBA.ts:72](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L72)

___

### r

• `get` **r**(): `number`

Getter for red channel.

#### Returns

`number`

- Returns the red channel.

#### Defined in

[Math/RGBA.ts:45](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L45)

• `set` **r**(`val`): `void`

Setter for red channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the red channel.

#### Defined in

[Math/RGBA.ts:54](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L54)

## Methods

### add

▸ **add**(`other`): [`RGBA`](Math_RGBA.RGBA)

Returns a new RGBA color which is this RGBA color added to other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`RGBA`](Math_RGBA.RGBA) | The other RGBA to add. |

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new RGBA.

#### Defined in

[Math/RGBA.ts:392](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L392)

___

### applyGamma

▸ **applyGamma**(`gamma`): `void`

Apply gamma correction to this RGBA color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gamma` | `number` | The gamma value. |

#### Returns

`void`

#### Defined in

[Math/RGBA.ts:433](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L433)

___

### approxEqual

▸ **approxEqual**(`other`, `precision?`): `boolean`

Returns true if this RGBA color is approximately the same as other.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | [`RGBA`](Math_RGBA.RGBA) | `undefined` | The other RGBA to compare with. |
| `precision` | `number` | `Number.EPSILON` | The precision to which the values must match. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/RGBA.ts:377](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L377)

___

### as3ComponentArray

▸ **as3ComponentArray**(): `number`[]

Returns the type as a 3 component array. Often used to pass types to the GPU.

#### Returns

`number`[]

- Returns as a 3 component array.

#### Defined in

[Math/RGBA.ts:530](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L530)

___

### asArray

▸ **asArray**(): `Uint8Array`

Returns the type as an array. Often used to pass types to the GPU.

#### Returns

`Uint8Array`

- Returns as an array.

#### Defined in

[Math/RGBA.ts:521](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L521)

___

### clone

▸ **clone**(): [`RGBA`](Math_RGBA.RGBA)

Clones this RGBA color and returns a new RGBA color.

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new RGBA.

#### Defined in

[Math/RGBA.ts:512](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L512)

___

### equal

▸ **equal**(`other`): `boolean`

Returns true if this RGBA color is exactly the same as other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`RGBA`](Math_RGBA.RGBA) | The other RGBA to compare with. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/RGBA.ts:356](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L356)

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

[Math/RGBA.ts:556](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L556)

___

### lerp

▸ **lerp**(`other`, `t`): [`RGBA`](Math_RGBA.RGBA)

Performs a linear interpolation between this RGBA color and other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`RGBA`](Math_RGBA.RGBA) | The other RGBA to interpolate between. |
| `t` | `number` | Interpolation amount between the two inputs. |

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new RGBA.

#### Defined in

[Math/RGBA.ts:472](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L472)

___

### luminance

▸ **luminance**(): `number`

Calculates and returns the relative luminance of the linear RGB component.

#### Returns

`number`

- The return value.

#### Defined in

[Math/RGBA.ts:461](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L461)

___

### notEquals

▸ **notEquals**(`other`): `boolean`

Returns true if this RGBA color is NOT exactly the same as other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`RGBA`](Math_RGBA.RGBA) | The other RGBA to compare with. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/RGBA.ts:366](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L366)

___

### scale

▸ **scale**(`scalar`): [`RGBA`](Math_RGBA.RGBA)

Returns a new RGBA color which is this vector scaled by scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new RGBA.

#### Defined in

[Math/RGBA.ts:412](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L412)

___

### scaleInPlace

▸ **scaleInPlace**(`scalar`): `void`

Scales this RGBA color by scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

`void`

#### Defined in

[Math/RGBA.ts:421](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L421)

___

### set

▸ **set**(`r`, `g`, `b`, `a?`): `void`

Setter from scalar components.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `r` | `number` | `undefined` | The red channel. |
| `g` | `number` | `undefined` | The green channel. |
| `b` | `number` | `undefined` | The blue channel. |
| `a` | `number` | `255` | The alpha channel. |

#### Returns

`void`

#### Defined in

[Math/RGBA.ts:119](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L119)

___

### setFromArray

▸ **setFromArray**(`values`): `void`

Setter from a scalar array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `number`[] | The array of values. |

#### Returns

`void`

#### Defined in

[Math/RGBA.ts:143](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L143)

___

### setFromCSSColorName

▸ **setFromCSSColorName**(`name`): `void`

Setter from a CSS color name.
E.g. "red"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The CSS color name. |

#### Returns

`void`

#### Defined in

[Math/RGBA.ts:181](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L181)

___

### setFromHex

▸ **setFromHex**(`hex`): `void`

Setter from a hexadecimal value.
E.g. #ff0000

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | The hex value. |

#### Returns

`void`

#### Defined in

[Math/RGBA.ts:156](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L156)

___

### setFromOther

▸ **setFromOther**(`other`): `void`

Setter from another RGBA color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`RGBA`](Math_RGBA.RGBA) | The other RGBA to set from. |

#### Returns

`void`

#### Defined in

[Math/RGBA.ts:131](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L131)

___

### subtract

▸ **subtract**(`other`): [`RGBA`](Math_RGBA.RGBA)

Returns a new RGBA color which is this RGBA color subtracted from other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`RGBA`](Math_RGBA.RGBA) | The other RGBA to subtract. |

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new RGBA.

#### Defined in

[Math/RGBA.ts:402](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L402)

___

### toCSSString

▸ **toCSSString**(): `string`

Returns the CSS rgba string.

#### Returns

`string`

- The return value.

#### Defined in

[Math/RGBA.ts:568](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L568)

___

### toGamma

▸ **toGamma**(`gamma?`): [`RGBA`](Math_RGBA.RGBA)

Converts to gamma color space and returns a new RGBA color.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gamma` | `number` | `2.2` | The gamma value. |

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new RGBA.

#### Defined in

[Math/RGBA.ts:452](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L452)

___

### toHex

▸ **toHex**(): `string`

Returns the hexadecimal value of this RGBA color.

#### Returns

`string`

- Returns the hex value.

#### Defined in

[Math/RGBA.ts:342](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L342)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `number`\>

- The json object.

#### Defined in

[Math/RGBA.ts:542](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L542)

___

### toLinear

▸ **toLinear**(`gamma?`): [`RGBA`](Math_RGBA.RGBA)

Converts to linear color space and returns a new color.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gamma` | `number` | `2.2` | The gamma value. |

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new RGBA.

#### Defined in

[Math/RGBA.ts:442](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L442)

___

### random

▸ `Static` **random**(`gammaOffset?`, `randomAlpha?`): [`RGBA`](Math_RGBA.RGBA)

Creates a random RGBA.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gammaOffset` | `number` | `0.0` | The gamma offset. |
| `randomAlpha` | `boolean` | `false` | Determines whether the alpha channel is random. |

#### Returns

[`RGBA`](Math_RGBA.RGBA)

- Returns a new random RGBA.

#### Defined in

[Math/RGBA.ts:487](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Math/RGBA.ts#L487)

