---
id: "Math_Vec3.Vec3"
title: "Class: Vec3"
sidebar_label: "Vec3"
custom_edit_url: null
---



Represents a three dimensional coordinate, such as 3D scene values, or mesh vertex positions.

Math types internally store values in [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) and
expose getters and setters for the component values.

## Constructors

### constructor

• **new Vec3**(`x?`, `y?`, `z?`)

Creates a Vec3.

The type of values of the `(x, y, z)` coordinates can be [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array),
[Uint32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array),
[Int32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) and
[ArrayBuffer](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer).

You can also pass one JSON object parameter.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` \| `Float32Array` \| `ArrayBuffer` \| `Uint32Array` | `0` | The x value. Default is 0. |
| `y` | `number` | `0` | The y value. Default is 0. |
| `z` | `number` | `0` | The z value. Default is 0. |

#### Defined in

Math/Vec3.ts:27

## Properties

### \_\_data

• **\_\_data**: `Float32Array` \| `Uint32Array` \| `Int32Array`

#### Defined in

Math/Vec3.ts:12

## Accessors

### x

• `get` **x**(): `number`

Getter for `x` component.

#### Returns

`number`

- Returns the x component.

#### Defined in

Math/Vec3.ts:53

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

Math/Vec3.ts:62

___

### xy

• `get` **xy**(): [`Vec2`](Math_Vec2.Vec2)

Getter for `xy` swizzel.

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns the xy components as a Vec2.

#### Defined in

Math/Vec3.ts:107

___

### y

• `get` **y**(): `number`

Getter for `y` component.

#### Returns

`number`

- Returns the y component.

#### Defined in

Math/Vec3.ts:71

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

Math/Vec3.ts:80

___

### yz

• `get` **yz**(): [`Vec2`](Math_Vec2.Vec2)

Getter for `yz` swizzel.

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns the yz components as a Vec2.

#### Defined in

Math/Vec3.ts:116

___

### z

• `get` **z**(): `number`

Getter for `z` component.

#### Returns

`number`

- Returns the z component.

#### Defined in

Math/Vec3.ts:89

• `set` **z**(`val`): `void`

Setter for `z` component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

- Returns the z component.

#### Defined in

Math/Vec3.ts:98

## Methods

### abs

▸ **abs**(): [`Vec3`](Math_Vec3.Vec3)

Returns a new Vec3 whose component values are the abs of this Vec3s component values.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:495

___

### add

▸ **add**(`other`): [`Vec3`](Math_Vec3.Vec3)

Adds other to this Vec3 and return the result as a new Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to add. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:216

___

### addInPlace

▸ **addInPlace**(`other`): `void`

Adds other to this Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to add. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:225

___

### angleTo

▸ **angleTo**(`other`): `number`

Gets the angle between this Vec3 and b.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to compare with. |

#### Returns

`number`

- Returns the angle in radians.

#### Defined in

Math/Vec3.ts:467

___

### approxEqual

▸ **approxEqual**(`other`, `precision?`): `boolean`

Returns true if this Vec2 is approximately the same as other.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | `undefined` | The other Vec3 to compare with. |
| `precision` | `number` | `Number.EPSILON` | The precision to which the values must match. |

#### Returns

`boolean`

- Returns true or false.

#### Defined in

Math/Vec3.ts:202

___

### asArray

▸ **asArray**(): `Float32Array`

Returns the type as an array. Often used to pass types to the GPU.

#### Returns

`Float32Array`

- Returns as an array.

#### Defined in

Math/Vec3.ts:543

___

### clone

▸ **clone**(): [`Vec3`](Math_Vec3.Vec3)

Clones this Vec3 and returns a new Vec3.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:534

___

### cross

▸ **cross**(`other`): [`Vec3`](Math_Vec3.Vec3)

Calculates the cross product of two Vec3s and returns the result as a new Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to calculate with. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the cross product as a new Vec3.

#### Defined in

Math/Vec3.ts:450

___

### distanceTo

▸ **distanceTo**(`other`): `number`

Calculates the distance to another Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to calculate the distance to. |

#### Returns

`number`

- Returns the distance between vectors.

#### Defined in

Math/Vec3.ts:360

___

### divide

▸ **divide**(`vec3`): [`Vec3`](Math_Vec3.Vec3)

Divides two Vec3s and returns the result as a new Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to divide by. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:279

___

### divideInPlace

▸ **divideInPlace**(`vec3`): `void`

Divides two Vec3s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec3` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to divide by. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:288

___

### dot

▸ **dot**(`other`): `number`

Calculates the dot product of this Vec3 against another Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to compare with. |

#### Returns

`number`

- Returns the dot product.

#### Defined in

Math/Vec3.ts:440

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

Math/Vec3.ts:578

___

### inverse

▸ **inverse**(): [`Vec3`](Math_Vec3.Vec3)

Returns the inverse of this Vec3, but returns. the result as a new Vec3

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:329

___

### is111

▸ **is111**(): `boolean`

Checks if the coordinates of this Vec3 are 1 1 1.

#### Returns

`boolean`

- Returns `true` if the coordinates are(1, 1, 1), otherwise, `false`.

#### Defined in

Math/Vec3.ts:167

___

### isEqual

▸ **isEqual**(`other`): `boolean`

Checks if this Vec3 contains the same values as the other Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to compare with. |

#### Returns

`boolean`

- Returns `true` if the values are the same, otherwise, `false`.

#### Defined in

Math/Vec3.ts:181

___

### isNull

▸ **isNull**(): `boolean`

Checks if the coordinates of this Vec3 are 0 0 0.

#### Returns

`boolean`

- Returns `true` if the coordinates are(0, 0, 0), otherwise, `false`.

#### Defined in

Math/Vec3.ts:158

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

Math/Vec3.ts:595

___

### length

▸ **length**(): `number`

Calculates the length of this Vec3.

#### Returns

`number`

- Returns the length.

#### Defined in

Math/Vec3.ts:350

___

### lengthSquared

▸ **lengthSquared**(): `number`

Calculates the squared length of this Vec3.

#### Returns

`number`

- Returns the length.

#### Defined in

Math/Vec3.ts:338

___

### lerp

▸ **lerp**(`other`, `t`): [`Vec3`](Math_Vec3.Vec3)

Performs a linear interpolation between this Vec3 and other.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to interpolate between. |
| `t` | `number` | Interpolation amount between the two inputs. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:483

___

### multiply

▸ **multiply**(`other`): [`Vec3`](Math_Vec3.Vec3)

Multiplies two Vec3s and returns the result as a new Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to multiply with. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:258

___

### multiplyInPlace

▸ **multiplyInPlace**(`other`): `void`

Multiplies two Vec3s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to multiply with. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:267

___

### negate

▸ **negate**(): [`Vec3`](Math_Vec3.Vec3)

Negates this Vec3 (x = -x, y = -y and z = -z), but returns the result as a new Vec3.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:320

___

### normalize

▸ **normalize**(): [`Vec3`](Math_Vec3.Vec3)

Normalizes the Vec3 and returns it as a new Vec3.
Multiplies coordinates value by the inverse of the vector length.

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns the Vec3 normalized.

#### Defined in

Math/Vec3.ts:373

___

### normalizeInPlace

▸ **normalizeInPlace**(): `number` \| `void`

Normalizes this Vec3 multiplying coordinate values by the inverse of the vector length.

#### Returns

`number` \| `void`

- The return value.

#### Defined in

Math/Vec3.ts:389

___

### notEqual

▸ **notEqual**(`other`): `boolean`

Checks if this Vec2 is different from another Vec2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to compare with. |

#### Returns

`boolean`

- Returns `true` if the Vec3s are different, otherwise, `false`.

#### Defined in

Math/Vec3.ts:191

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

Math/Vec3.ts:589

___

### resize

▸ **resize**(`length`): `void` \| [`Vec3`](Math_Vec3.Vec3)

Creates and returns a new Vec3 with the new coordinates(calculated with this Vec3 coordinates and the specified length).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | The length value. |

#### Returns

`void` \| [`Vec3`](Math_Vec3.Vec3)

- The return value.

#### Defined in

Math/Vec3.ts:409

___

### resizeInPlace

▸ **resizeInPlace**(`length`): `void`

Modifies current coordinates using the specified length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | The length value. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:423

___

### scale

▸ **scale**(`scalar`): [`Vec3`](Math_Vec3.Vec3)

Scales this Vec3 by scalar and returns the result as a new Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:300

___

### scaleInPlace

▸ **scaleInPlace**(`scalar`): `void`

Scales this Vec3 by scalar.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | The scalar value. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:309

___

### set

▸ **set**(`x`, `y`, `z`): `void`

Setter from scalar components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x component. |
| `y` | `number` | The y component. |
| `z` | `number` | The y component. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:127

___

### setDataArray

▸ **setDataArray**(`float32Array`): `void`

Sets the state of a Vec3 Object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `float32Array` | `Float32Array` | The float32Array value. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:138

___

### setFromOther

▸ **setFromOther**(`other`): `void`

Sets the state of a Vec3 Object from another Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to set from. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:147

___

### setRandom

▸ **setRandom**(`scale?`): [`Vec3`](Math_Vec3.Vec3)

Generates a random vector anywhere in the sphere defined by the provided scale value.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `scale` | `number` | `1.0` | The radius of the bounding sphere. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- The random Vec3.

#### Defined in

Math/Vec3.ts:522

___

### setRandomDir

▸ **setRandomDir**(`scale?`): [`Vec3`](Math_Vec3.Vec3)

Sets the vector a random vector on the surface of a sphere with the radius of the given scale value.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `scale` | `number` | `1.0` | The radius of the surface sphere. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- The random Vec3.

#### Defined in

Math/Vec3.ts:505

___

### subtract

▸ **subtract**(`other`): [`Vec3`](Math_Vec3.Vec3)

Subtracts other from this Vec3 and returns the result as a new Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to subtract. |

#### Returns

[`Vec3`](Math_Vec3.Vec3)

- Returns a new Vec3.

#### Defined in

Math/Vec3.ts:237

___

### subtractInPlace

▸ **subtractInPlace**(`other`): `void`

Subtracts other from this Vec3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Vec3`](Math_Vec3.Vec3) | The other Vec3 to subtract. |

#### Returns

`void`

#### Defined in

Math/Vec3.ts:246

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `number`\>

Encodes Vec3 Class as a JSON object for persistence.

#### Returns

`Record`<`string`, `number`\>

- The json object.

#### Defined in

Math/Vec3.ts:565

___

### toString

▸ **toString**(): `string`

Converts this Vec3 to a string in JSON format.

#### Returns

`string`

- The return value.

#### Defined in

Math/Vec3.ts:555

