---
id: "Math_Vec4.Vec4"
title: "Class: Vec4"
sidebar_label: "Vec4"
custom_edit_url: null
---



Represents a four-dimensional coordinate.
Math types internally store values in [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) and
expose getters and setters for the component values.

## Constructors

### constructor

• **new Vec4**(`x?`, `y?`, `z?`, `t?`)

Creates a Vec4.

The type of values of the `(x, y, z, t)` coordinates can be [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array),
[Uint32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array),
[Int32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) and
[ArrayBuffer](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer).

You can also pass one JSON object parameter.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` \| `Float32Array` \| `ArrayBuffer` | `0` | The x value. Default is 0. |
| `y` | `number` | `0` | The y value. Default is 0. |
| `z` | `number` | `0` | The y value. Default is 0. |
| `t` | `number` | `0` | The t value. Default is 0. |

#### Defined in

[Math/Vec4.ts:28](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L28)

## Properties

### \_\_data

• **\_\_data**: `Float32Array` \| `Uint32Array` \| `Int32Array`

#### Defined in

[Math/Vec4.ts:12](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L12)

## Accessors

### t

• `get` **t**(): `number`

Getter for `t` value.

#### Returns

`number`

#### Defined in

[Math/Vec4.ts:107](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L107)

• `set` **t**(`val`): `void`

Setter for `t` value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:116](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L116)

___

### w

• `get` **w**(): `number`

Getter for `w` value.

#### Returns

`number`

#### Defined in

[Math/Vec4.ts:125](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L125)

• `set` **w**(`val`): `void`

Setter for `w` value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L134)

___

### x

• `get` **x**(): `number`

Getter for `x` value.

#### Returns

`number`

- Returns the x value.

#### Defined in

[Math/Vec4.ts:53](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L53)

• `set` **x**(`val`): `void`

Setter for `x` value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the x value.

#### Defined in

[Math/Vec4.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L62)

___

### xyz

• `get` **xyz**(): [`Vec3`](Math_Vec3.Vec3)

Getter for `xyz` swizzel.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the z value.

#### Defined in

[Math/Vec4.ts:143](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L143)

___

### y

• `get` **y**(): `number`

Getter for `y` value.

#### Returns

`number`

- Returns the y value.

#### Defined in

[Math/Vec4.ts:71](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L71)

• `set` **y**(`val`): `void`

Setter for `y` value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the y value.

#### Defined in

[Math/Vec4.ts:80](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L80)

___

### z

• `get` **z**(): `number`

Getter for `z` value.

#### Returns

`number`

#### Defined in

[Math/Vec4.ts:89](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L89)

• `set` **z**(`val`): `void`

Setter for `z` value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:98](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L98)

## Methods

### add

▸ **add**(`other`): [`Vec4`](Math_Vec4.Vec4)

Adds other to this Vec4 and returns the result as a new Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to add. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns a new Vec4.

#### Defined in

[Math/Vec4.ts:216](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L216)

___

### addInPlace

▸ **addInPlace**(`other`): `void`

Adds other to this Vec4 mutating the values of this instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to add. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:225](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L225)

___

### angleTo

▸ **angleTo**(`other`): `number`

Gets the angle between this Vec4 and b.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to compare with. |

#### Returns

`number`

- Returns the angle in radians.

#### Defined in

[Math/Vec4.ts:415](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L415)

___

### approxEqual

▸ **approxEqual**(`other`, `precision?`): `boolean`

Returns true if this Vec4 is approximately the same as other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to compare with. |
| `precision` | `number` | The precision to which the values must match. |

#### Returns

`boolean`

- The return value.

#### Defined in

[Math/Vec4.ts:201](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L201)

___

### asArray

▸ **asArray**(): `Float32Array` \| `Uint32Array` \| `Int32Array`

Returns the type as an array. Often used to pass types to the GPU.

#### Returns

`Float32Array` \| `Uint32Array` \| `Int32Array`

- Returns as an array.

#### Defined in

[Math/Vec4.ts:482](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L482)

___

### clone

▸ **clone**(): [`Vec4`](Math_Vec4.Vec4)

Clones this Vec4 and returns a new Vec4.

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns a new Vec4.

#### Defined in

[Math/Vec4.ts:464](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L464)

___

### cross

▸ **cross**(`other`): [`Vec4`](Math_Vec4.Vec4)

Calculates the cross product of two Vec4s and returns the result as a new Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to calculate with. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns the cross product as a new Vec4.

#### Defined in

[Math/Vec4.ts:396](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L396)

___

### divide

▸ **divide**(`other`): [`Vec4`](Math_Vec4.Vec4)

Divides two Vec4s and returns the result as a new Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to divide by. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns a new Vec4.

#### Defined in

[Math/Vec4.ts:282](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L282)

___

### divideInPlace

▸ **divideInPlace**(`other`): `void`

Divides two Vec4s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to divide by. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:291](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L291)

___

### dot

▸ **dot**(`other`): `number`

Calculates the dot product of this Vec4 against another Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to compare with. |

#### Returns

`number`

- Returns the dot product.

#### Defined in

[Math/Vec4.ts:386](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L386)

___

### fromJSON

▸ **fromJSON**(`j`): `void`

Decodes a JSON object to set the state of this class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `number`\> | The json object. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:517](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L517)

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Checks if this Vec4 contains the same values as the other Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to compare with. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Vec4.ts:180](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L180)

___

### isValid

▸ **isValid**(): `boolean`

Verifies if the values stored in this Math type are valid numeric values.
Returns `false` If at least one of the values is either [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/Infinity) or
[NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/NaN).

#### Returns

`boolean`

- Returns the result as a boolean.

#### Defined in

[Math/Vec4.ts:543](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L543)

___

### length

▸ **length**(): `number`

Calculates the length of this Vec4.

#### Returns

`number`

- Returns the length.

#### Defined in

[Math/Vec4.ts:322](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L322)

___

### lengthSquared

▸ **lengthSquared**(): `number`

Calculates the squared length of this Vec4.

#### Returns

`number`

- Returns the length.

#### Defined in

[Math/Vec4.ts:335](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L335)

___

### lerp

▸ **lerp**(`other`, `t`): [`Vec4`](Math_Vec4.Vec4)

Performs a linear interpolation between this Vec4 and other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to interpolate between. |
| `t` | `number` | Interpolation amount between the two inputs. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns a new Vec4.

#### Defined in

[Math/Vec4.ts:434](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L434)

___

### multiply

▸ **multiply**(`other`): [`Vec4`](Math_Vec4.Vec4)

Multiplies two Vec4s and returns the result as a new Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to multiply with. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns a new Vec4.

#### Defined in

[Math/Vec4.ts:260](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L260)

___

### multiplyInPlace

▸ **multiplyInPlace**(`other`): `void`

Multiplies two Vec4s mutating the values of this instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to multiply with. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:269](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L269)

___

### normalize

▸ **normalize**(): [`Vec4`](Math_Vec4.Vec4)

Normalizes the Vec4 and returns it as a new Vec4.
Multiplies coordinates value by the inverse of the vector length.

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns the Vec4 normalized.

#### Defined in

[Math/Vec4.ts:349](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L349)

___

### normalizeInPlace

▸ **normalizeInPlace**(): `void`

Normalizes this Vec4 multiplying coordinate values by the inverse of the vector length.

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:367](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L367)

___

### notEqual

▸ **notEqual**(`other`): `boolean`

Checks if this Vec4 is different from another Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to compare with. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Vec4.ts:190](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L190)

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

[Math/Vec4.ts:529](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L529)

___

### scale

▸ **scale**(`scalar`): [`Vec4`](Math_Vec4.Vec4)

Scales this Vec4 by scalar and returns the result as a new Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- The return value.

#### Defined in

[Math/Vec4.ts:304](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L304)

___

### scaleInPlace

▸ **scaleInPlace**(`scalar`): `void`

Scales this Vec4 by scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:313](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L313)

___

### set

▸ **set**(`x`, `y`, `z`, `t`): `void`

Setter from scalar components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x value. |
| `y` | `number` | The y value. |
| `z` | `number` | The y value. |
| `t` | `number` | The t value. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:155](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L155)

___

### setFromOther

▸ **setFromOther**(`other`): `void`

Sets the state of a Vec4 Object from another Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to set from. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:167](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L167)

___

### subtract

▸ **subtract**(`other`): [`Vec4`](Math_Vec4.Vec4)

Subtracts other from this Vec4 and returns then result as a new Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to subtract. |

#### Returns

[`Vec4`](Math_Vec4.Vec4)

- Returns a new Vec4.

#### Defined in

[Math/Vec4.ts:238](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L238)

___

### subtractInPlace

▸ **subtractInPlace**(`other`): `void`

Subtracts other from this Vec4 mutating the values of this instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec4`](Math_Vec4.Vec4) | The other Vec4 to subtract. |

#### Returns

`void`

#### Defined in

[Math/Vec4.ts:247](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L247)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `number`\>

- The json object.

#### Defined in

[Math/Vec4.ts:503](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L503)

___

### toString

▸ **toString**(): `string`

Converts this Vec3 to a string in JSON format.

#### Returns

`string`

- The return value.

#### Defined in

[Math/Vec4.ts:494](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L494)

___

### toVec3

▸ **toVec3**(): [`Vec3`](Math_Vec3.Vec3)

Converts this Vec4 into a Vec3.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the value as a new Vec3.

#### Defined in

[Math/Vec4.ts:473](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec4.ts#L473)

