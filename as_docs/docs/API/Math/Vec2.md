---
id: "Math_Vec2.Vec2"
title: "Class: Vec2"
sidebar_label: "Vec2"
custom_edit_url: null
---



Representing a Vec2(two-dimensional floating point vector). A Vec2 is for representing 2 dimensional values, such as screen coordinates or pixel coordinates within an image.

Math types internally store values in [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) and
expose getters and setters for the component values.

## Constructors

### constructor

• **new Vec2**(`x?`, `y?`)

Creates a Vec2.

The type of values of the `(x, y)` coordinates can be [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array),
[Uint32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array),
[Int32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) and
[ArrayBuffer](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer).

```javascript
 const myVec2 = new Vec2(1.2, 3.4)
```

Given an array of floats, create a Vec2 that wraps some part of it.
```javascript
 const floatArray = new Float32Array(6)
 floatArray[0] = 1.2
 floatArray[1] = 3.4
 const myVec2 = new Vec2(floatArray)
 console.log(myVec2.toJSON())
```
The resulting output
```json
 > { x:1.2, y:3.4 }
```

Given an array of floats, create a Vec2 that wraps some part of it.
```javascript
 const floatArray = new Float32Array(6)
 floatArray[0] = 1.2
 floatArray[1] = 3.4
 floatArray[2] = 5.6
 floatArray[3] = 7.8
 floatArray[4] = 9.0
 floatArray[5] = 1.9
 const myVec2 = new Vec2(floatArray.buffer, 8)
 console.log(myVec2.toJSON())
```
The resulting output
```json
 > { x:5.6, y:7.8 }
```

You can also pass one JSON object parameter.
```javascript
 const myVec2 = new Vec2({ x:1.2, y:3.4 })
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `any` | `0` | The x value. Default is 0. |
| `y` | `number` | `0` | The y value. Default is 0. |

#### Defined in

[Math/Vec2.ts:63](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L63)

## Properties

### \_\_data

• **\_\_data**: `Float32Array` \| `Uint32Array` \| `Int32Array`

#### Defined in

[Math/Vec2.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L11)

## Accessors

### x

• `get` **x**(): `number`

Getter for `x` component.

#### Returns

`number`

- Returns the x component.

#### Defined in

[Math/Vec2.ts:87](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L87)

• `set` **x**(`val`): `void`

Setter for `x` component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the x component.

#### Defined in

[Math/Vec2.ts:95](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L95)

___

### y

• `get` **y**(): `number`

Getter for `y` component.

#### Returns

`number`

- Returns the y component.

#### Defined in

[Math/Vec2.ts:103](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L103)

• `set` **y**(`val`): `void`

Setter for `y` component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the y component.

#### Defined in

[Math/Vec2.ts:111](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L111)

## Methods

### add

▸ **add**(`other`): [`Vec2`](Math_Vec2.Vec2)

Adds other to this Vec2 and returns the result as a new Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to add. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:172](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L172)

___

### addInPlace

▸ **addInPlace**(`other`): `void`

Adds a Vec2 to this Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to add. |

#### Returns

`void`

#### Defined in

[Math/Vec2.ts:181](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L181)

___

### angleTo

▸ **angleTo**(`other`): `number`

Gets the angle between this Vec2 and other assuming both are normalized vectors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to compare with. |

#### Returns

`number`

- Returns the angle in radians.

#### Defined in

[Math/Vec2.ts:360](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L360)

___

### approxEqual

▸ **approxEqual**(`other`, `precision?`): `boolean`

Returns true if this Vec2 is approximately the same as other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to compare with. |
| `precision` | `number` | The precision to which the values must match. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[Math/Vec2.ts:162](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L162)

___

### asArray

▸ **asArray**(): `Float32Array` \| `Uint32Array` \| `Int32Array`

Returns current Vec2 data as array. Often used to pass types to the GPU.

#### Returns

`Float32Array` \| `Uint32Array` \| `Int32Array`

- Returns as an array.

#### Defined in

[Math/Vec2.ts:443](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L443)

___

### clone

▸ **clone**(): [`Vec2`](Math_Vec2.Vec2)

Clones this Vec2 and returns a new Vec2.

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:434](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L434)

___

### cross

▸ **cross**(`other`): `number`

Calculates the cross product of this Vec2 against another Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to compare with. |

#### Returns

`number`

- Returns the cross product.

#### Defined in

[Math/Vec2.ts:349](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L349)

___

### distanceTo

▸ **distanceTo**(`other`): `number`

Calculates the distance to another vector.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other value. |

#### Returns

`number`

- Returns the distance between vectors.

#### Defined in

[Math/Vec2.ts:294](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L294)

___

### dot

▸ **dot**(`other`): `number`

Calculates the dot product of this Vec2 against another Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to compare with. |

#### Returns

`number`

- Returns the dot product.

#### Defined in

[Math/Vec2.ts:339](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L339)

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

[Math/Vec2.ts:477](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L477)

___

### invert

▸ **invert**(): [`Vec2`](Math_Vec2.Vec2)

Inverts this Vec2 and returns the result as a new Vec2.

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:233](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L233)

___

### invertInPlace

▸ **invertInPlace**(): [`Vec2`](Math_Vec2.Vec2)

Inverts this Vec2.

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- The return value.

#### Defined in

[Math/Vec2.ts:242](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L242)

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Checks if this Vec2 contains the same values as the other Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to compare with. |

#### Returns

`boolean`

- Returns `true` if are the same Vector, otherwise, `false`.

#### Defined in

[Math/Vec2.ts:141](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L141)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[Math/Vec2.ts:529](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L529)

___

### length

▸ **length**(): `number`

Calculates the length of this Vec2.

#### Returns

`number`

- Returns the length.

#### Defined in

[Math/Vec2.ts:284](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L284)

___

### lengthSquared

▸ **lengthSquared**(): `number`

Calculates the squared length of this Vec2.

#### Returns

`number`

- Returns the length squared.

#### Defined in

[Math/Vec2.ts:273](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L273)

___

### lerp

▸ **lerp**(`other`, `t`): [`Vec2`](Math_Vec2.Vec2)

Performs a linear interpolation between this Vec2 and other Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to interpolate between. |
| `t` | `number` | Interpolation amount between the two inputs. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:398](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L398)

___

### multiply

▸ **multiply**(`other`): [`Vec2`](Math_Vec2.Vec2)

Multiplies a Vec2 with this Vec2 and returns the result as a new Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to multiply with. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:254](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L254)

___

### multiplyInPlace

▸ **multiplyInPlace**(`other`): `void`

Multiplies a Vec2 with this Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to multiply with. |

#### Returns

`void`

#### Defined in

[Math/Vec2.ts:263](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L263)

___

### normalize

▸ **normalize**(): [`Vec2`](Math_Vec2.Vec2)

Normalizes the Vec2 and returns it as a new Vec2.
Multiplies coordinates value by the inverse of the vector length.

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns the Vec2 normalized.

#### Defined in

[Math/Vec2.ts:306](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L306)

___

### normalizeInPlace

▸ **normalizeInPlace**(): `void`

Normalizes this Vec2 multiplying coordinate values by the inverse of the vector length.

#### Returns

`void`

#### Defined in

[Math/Vec2.ts:322](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L322)

___

### notEqual

▸ **notEqual**(`other`): `boolean`

Checks if this Vec2 is different from another Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to compare with. |

#### Returns

`boolean`

- Returns `true` if the Vec2s are different, otherwise, `false`.

#### Defined in

[Math/Vec2.ts:151](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L151)

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

[Math/Vec2.ts:487](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L487)

___

### rotate

▸ **rotate**(`angle`): [`Vec2`](Math_Vec2.Vec2)

Rotates a Vec2 in a clockwise direction and returns a new rotated Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angle` | `number` | The angle of rotation. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns the rotated vector.

#### Defined in

[Math/Vec2.ts:385](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L385)

___

### scale

▸ **scale**(`scalar`): [`Vec2`](Math_Vec2.Vec2)

Scales this Vec2 by scalar and returns the result as a new Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:214](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L214)

___

### scaleInPlace

▸ **scaleInPlace**(`scalar`): `void`

Scales this Vec2 by scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

`void`

#### Defined in

[Math/Vec2.ts:223](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L223)

___

### set

▸ **set**(`x`, `y`): `void`

Setter from scalar components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x component. |
| `y` | `number` | The y component. |

#### Returns

`void`

#### Defined in

[Math/Vec2.ts:120](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L120)

___

### setFromOther

▸ **setFromOther**(`other`): `void`

Replaces this Vec2 data with the Vec2 data passed as parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to set from. |

#### Returns

`void`

#### Defined in

[Math/Vec2.ts:130](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L130)

___

### setRandom

▸ **setRandom**(`scale?`): [`Vec2`](Math_Vec2.Vec2)

Randomizes the scale of this Vec2 coordinates.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `scale` | `number` | `1.0` | The scale value. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- The return value.

#### Defined in

[Math/Vec2.ts:423](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L423)

___

### setRandomDir

▸ **setRandomDir**(`scale?`): [`Vec2`](Math_Vec2.Vec2)

Generates a random vector with the given scale.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `scale` | `number` | `1.0` | Length of the resulting vector. If omitted, a unit vector will be returned. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- The return value.

#### Defined in

[Math/Vec2.ts:410](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L410)

___

### signedAngleTo

▸ **signedAngleTo**(`other`): `number`

Gets the angle between this Vec2 and other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to compare with. |

#### Returns

`number`

- Returns the angle in radians.

#### Defined in

[Math/Vec2.ts:373](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L373)

___

### subtract

▸ **subtract**(`other`): [`Vec2`](Math_Vec2.Vec2)

Subtracts a Vec2 from this Vec2 and returns the result as a new Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to subtract. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:192](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L192)

___

### subtractInPlace

▸ **subtractInPlace**(`other`): [`Vec2`](Math_Vec2.Vec2)

Subtracts a Vec2 from this Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec2`](Math_Vec2.Vec2) | The other Vec2 to subtract. |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Math/Vec2.ts:202](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L202)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number`\>

Encodes Vec2 Class as a JSON object for persistence.

#### Returns

`Record`<`string`, `number`\>

- The json object.

#### Defined in

[Math/Vec2.ts:465](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L465)

___

### toString

▸ **toString**(): `string`

Converts this Vec3 to a string in JSON format.

#### Returns

`string`

- The return value.

#### Defined in

[Math/Vec2.ts:455](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L455)

___

### intersectionOfLines

▸ `Static` **intersectionOfLines**(`p1`, `p2`, `p3`, `p4`): [`Vec2`](Math_Vec2.Vec2)

Calculate the intersection point of 2 2d lines, returning the parameters values for each line.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p1` | [`Vec2`](Math_Vec2.Vec2) | The point of the second line |
| `p2` | [`Vec2`](Math_Vec2.Vec2) | - |
| `p3` | [`Vec2`](Math_Vec2.Vec2) | - |
| `p4` | [`Vec2`](Math_Vec2.Vec2) | - |

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns an array containing 2 parameter values for the 2 lines.

#### Defined in

[Math/Vec2.ts:501](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Math/Vec2.ts#L501)
