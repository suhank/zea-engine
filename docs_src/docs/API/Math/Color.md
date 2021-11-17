---
id: "Math_Color.Color"
title: "Class: Color"
sidebar_label: "Color"
custom_edit_url: null
---



Class representing a color as 4 floating point values.

## Constructors

### constructor

• **new Color**(`r?`, `g?`, `b?`, `a?`)

Creates a `Color` object with an RGBA structure.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `r` | `string` \| `number` \| `Float32Array` \| `ArrayBuffer` | `0` | The red channel of a color. |
| `g` | `number` | `0` | The green channel of a color. |
| `b` | `number` | `0` | The blue channel of a color. |
| `a` | `number` | `1.0` | The alpha (transparency) channel of a color. |

#### Defined in

[Math/Color.ts:16](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L16)

## Properties

### \_\_data

• **\_\_data**: `Float32Array`

#### Defined in

[Math/Color.ts:7](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L7)

## Accessors

### a

• `get` **a**(): `number`

Getter for alpha channel.

#### Returns

`number`

- Returns the alpha channel.

#### Defined in

[Math/Color.ts:99](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L99)

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

[Math/Color.ts:107](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L107)

___

### b

• `get` **b**(): `number`

Getter for blue channel.

#### Returns

`number`

- Returns the blue channel.

#### Defined in

[Math/Color.ts:81](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L81)

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

[Math/Color.ts:90](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L90)

___

### g

• `get` **g**(): `number`

Getter for green channel.

#### Returns

`number`

- Returns the green channel.

#### Defined in

[Math/Color.ts:64](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L64)

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

[Math/Color.ts:72](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L72)

___

### r

• `get` **r**(): `number`

Getter for red channel.

#### Returns

`number`

- Returns the red channel.

#### Defined in

[Math/Color.ts:46](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L46)

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

[Math/Color.ts:55](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L55)

## Methods

### add

▸ **add**(`other`): [`Color`](Math_Color.Color)

Returns a new Color which is this Color added to other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | The other color to add. |

#### Returns

[`Color`](Math_Color.Color)

- Returns a new color.

#### Defined in

[Math/Color.ts:455](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L455)

___

### addInPlace

▸ **addInPlace**(`other`): `void`

Updates this Color by adding the values from the other color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | The other color to add. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:464](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L464)

___

### applyGamma

▸ **applyGamma**(`gamma`): `void`

Apply gamma correction to this color

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gamma` | `number` | The gamma value. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:508](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L508)

___

### approxEqual

▸ **approxEqual**(`other`, `precision?`): `boolean`

Returns true if this color is approximately the same as other.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | `undefined` | The other color to compare with. |
| `precision` | `number` | `Number.EPSILON` | The precision to which the values must match. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Color.ts:440](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L440)

___

### as3ComponentArray

▸ `Private` **as3ComponentArray**(): `number`[]

Returns the type as a 3 component array. Often used to pass types to the GPU.

#### Returns

`number`[]

- Returns as a 3 component array.

#### Defined in

[Math/Color.ts:614](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L614)

___

### asArray

▸ **asArray**(): `Float32Array`

Returns the type as an array. Often used to pass types to the GPU.

#### Returns

`Float32Array`

- Returns as an array.

#### Defined in

[Math/Color.ts:604](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L604)

___

### clone

▸ **clone**(): [`Color`](Math_Color.Color)

Clones this color and returns a new color.

#### Returns

[`Color`](Math_Color.Color)

- Returns a new color.

#### Defined in

[Math/Color.ts:595](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L595)

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

[Math/Color.ts:640](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L640)

___

### getAsRGBArray

▸ **getAsRGBArray**(): `number`[]

Getter from an RGB array.

#### Returns

`number`[]

- The return value.

#### Defined in

[Math/Color.ts:155](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L155)

___

### getAsRGBDict

▸ **getAsRGBDict**(): `Record`<`string`, `number`\>

Getter from an RGB dict.

#### Returns

`Record`<`string`, `number`\>

- The return value.

#### Defined in

[Math/Color.ts:164](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L164)

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Checks if this Color  contains the same values as the other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | The other Color to compare with. |

#### Returns

`boolean`

- Returns `true` if the values are the same, otherwise, `false`.

#### Defined in

[Math/Color.ts:419](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L419)

___

### lerp

▸ **lerp**(`other`, `t`): [`Color`](Math_Color.Color)

Performs a linear interpolation between this color and other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | The other color to interpolate between. |
| `t` | `number` | Interpolation amount between the two inputs. |

#### Returns

[`Color`](Math_Color.Color)

- Returns a new color.

#### Defined in

[Math/Color.ts:553](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L553)

___

### luminance

▸ **luminance**(): `number`

Calculates and returns the luminance of the linear RGB components.

#### Returns

`number`

- The return value.

#### Defined in

[Math/Color.ts:542](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L542)

___

### notEquals

▸ **notEquals**(`other`): `boolean`

Returns true if this color is NOT exactly the same as other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | The other color to compare with. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Color.ts:429](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L429)

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

[Math/Color.ts:652](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L652)

___

### scale

▸ **scale**(`scalar`): [`Color`](Math_Color.Color)

Scales this color by scalar and return the result as a new Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

[`Color`](Math_Color.Color)

- Returns a new color.

#### Defined in

[Math/Color.ts:487](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L487)

___

### scaleInPlace

▸ **scaleInPlace**(`scalar`): `void`

Scales this color by scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:496](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L496)

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
| `a` | `number` | `1.0` | The alpha channel. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:119](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L119)

___

### setFromCSSColorName

▸ **setFromCSSColorName**(`name`): `void`

Sets the Color values from a CSS color name.
E.g. "red"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The CSS color name. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:241](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L241)

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

[Math/Color.ts:216](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L216)

___

### setFromOther

▸ **setFromOther**(`other`): `void`

Sets current color state with another `Color` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | The other color to set from. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:131](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L131)

___

### setFromRGB

▸ **setFromRGB**(`r`, `g`, `b`, `a?`): `void`

Setter from a RGB value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `number` | The red channel. |
| `g` | `number` | The green channel. |
| `b` | `number` | The blue channel. |
| `a?` | `number` | The alpha channel. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:180](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L180)

___

### setFromRGBArray

▸ **setFromRGBArray**(`vals`): `void`

Setter from an RGB array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vals` | `Float32Array` | The vals param. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:192](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L192)

___

### setFromRGBDict

▸ **setFromRGBDict**(`vals`): `void`

Setter from an RGB dict.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vals` | `Record`<`string`, `number`\> | The vals param. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:204](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L204)

___

### setFromScalarArray

▸ **setFromScalarArray**(`vals`): `void`

Setter from a scalar array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vals` | `Float32Array` | The vals param. |

#### Returns

`void`

#### Defined in

[Math/Color.ts:143](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L143)

___

### subtract

▸ **subtract**(`other`): [`Color`](Math_Color.Color)

Returns a new color which is this color subtracted from other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Color`](Math_Color.Color) | The other color to subtract. |

#### Returns

[`Color`](Math_Color.Color)

- Returns a new color.

#### Defined in

[Math/Color.ts:477](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L477)

___

### toCSSString

▸ **toCSSString**(): `string`

Returns the CSS rgba string.

#### Returns

`string`

- The return value.

#### Defined in

[Math/Color.ts:664](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L664)

___

### toGamma

▸ **toGamma**(`gamma?`): [`Color`](Math_Color.Color)

returns a new color value value is mapped into a gamma curve

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gamma` | `number` | `2.2` | The gamma value. |

#### Returns

[`Color`](Math_Color.Color)

- Returns a new color.

#### Defined in

[Math/Color.ts:528](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L528)

___

### toHex

▸ **toHex**(): `string`

Returns the hexadecimal value of this color, including the leading "#" character.

#### Returns

`string`

- Returns the hex value.

#### Defined in

[Math/Color.ts:404](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L404)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `number`\>

- The json object.

#### Defined in

[Math/Color.ts:626](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L626)

___

### toLinear

▸ **toLinear**(`gamma?`): [`Color`](Math_Color.Color)

Converts to linear color space and returns a new color

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gamma` | `number` | `2.2` | The gamma value. |

#### Returns

[`Color`](Math_Color.Color)

- Returns a new color.

#### Defined in

[Math/Color.ts:518](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L518)

___

### random

▸ `Static` **random**(`gammaOffset?`, `randomAlpha?`): [`Color`](Math_Color.Color)

Creates a random color.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gammaOffset` | `number` | `0.0` | The gamma offset. Values between 0 and 1 increase the average brightness of the generated color. Values between 0 and -1 darken the generated color values. |
| `randomAlpha` | `boolean` | `false` | Determines whether the alpha channel is random. If not, the alpha values will be 1.0. |

#### Returns

[`Color`](Math_Color.Color)

- The new random color.

#### Defined in

[Math/Color.ts:568](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Math/Color.ts#L568)

