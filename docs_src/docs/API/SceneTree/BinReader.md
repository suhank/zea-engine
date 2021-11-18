---
id: "SceneTree_BinReader.BinReader"
title: "Class: BinReader"
sidebar_label: "BinReader"
custom_edit_url: null
---



Reads binary data in a specific encoding. Used in loading binary data such as zcad files.

## Constructors

### constructor

• **new BinReader**(`data`, `byteOffset?`, `isMobileDevice?`)

Create a bin reader.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `ArrayBuffer` | `undefined` | The data buffer. |
| `byteOffset` | `number` | `0` | The byte offset value to start reading the buffer. |
| `isMobileDevice` | `boolean` | `true` | The isMobileDevice value. |

#### Defined in

[SceneTree/BinReader.ts:21](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L21)

## Properties

### \_\_byteOffset

• `Protected` **\_\_byteOffset**: `number`

#### Defined in

[SceneTree/BinReader.ts:10](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L10)

___

### \_\_data

• `Protected` **\_\_data**: `ArrayBuffer`

#### Defined in

[SceneTree/BinReader.ts:9](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L9)

___

### \_\_dataView

• `Protected` **\_\_dataView**: `DataView`

#### Defined in

[SceneTree/BinReader.ts:11](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L11)

___

### \_\_isMobileDevice

• `Protected` **\_\_isMobileDevice**: `boolean`

#### Defined in

[SceneTree/BinReader.ts:12](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L12)

___

### utf8decoder

• `Protected` **utf8decoder**: `TextDecoder`

#### Defined in

[SceneTree/BinReader.ts:13](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L13)

## Accessors

### byteLength

• `get` **byteLength**(): `number`

Returns the length of the buffer.

#### Returns

`number`

- The total length of the buffer

#### Defined in

[SceneTree/BinReader.ts:52](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L52)

___

### data

• `get` **data**(): `ArrayBuffer`

Returns the data buffer we're reading from.

#### Returns

`ArrayBuffer`

- The data buffer we are reading from,

#### Defined in

[SceneTree/BinReader.ts:43](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L43)

___

### isMobileDevice

• `get` **isMobileDevice**(): `boolean`

Returns state of whether or not the `BinReader` object was instantiated from a mobile device.

#### Returns

`boolean`

- Returns true is a mobile device is detected.

#### Defined in

[SceneTree/BinReader.ts:34](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L34)

___

### remainingByteLength

• `get` **remainingByteLength**(): `number`

Returns remaining length of the buffer to read.

#### Returns

`number`

- The remaining length of the buffer to read.

#### Defined in

[SceneTree/BinReader.ts:61](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L61)

## Methods

### advance

▸ **advance**(`byteOffset`): `void`

Adds offset bytes to current offset value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byteOffset` | `number` | The byte Offset amount. |

#### Returns

`void`

#### Defined in

[SceneTree/BinReader.ts:86](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L86)

___

### loadBox2

▸ **loadBox2**(): [`Box2`](../Math/Math_Box2.Box2)

Creates and returns a `Box2` object with the next four Float32 values in the buffer.
Next four because it creates two Vec2.

#### Returns

[`Box2`](../Math/Math_Box2.Box2)

- Returns a Box2.

#### Defined in

[SceneTree/BinReader.ts:480](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L480)

___

### loadBox3

▸ **loadBox3**(): [`Box3`](../Math/Math_Box3.Box3)

Creates and returns a `Box2` object with the next six Float32 values in the buffer.
Next four because it creates two Vec3.

#### Returns

[`Box3`](../Math/Math_Box3.Box3)

- Returns a Box3.

#### Defined in

[SceneTree/BinReader.ts:490](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L490)

___

### loadFloat16

▸ **loadFloat16**(): `number`

Returns the Float16 value at current byte offset position,
and adds four bytes to the offset.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:144](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L144)

___

### loadFloat16From2xUInt8

▸ **loadFloat16From2xUInt8**(): `void`

Returns a single signed Float16 value at current byte offset position from 2 unsigned Int8 values,
and adds two bytes to the offset.

#### Returns

`void`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:170](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L170)

___

### loadFloat16Quat

▸ **loadFloat16Quat**(): [`Quat`](../Math/Math_Quat.Quat)

Creates and returns a `Quat` object with the next four Float16 values in the buffer.

#### Returns

[`Quat`](../Math/Math_Quat.Quat)

- Returns a Quat.

#### Defined in

[SceneTree/BinReader.ts:407](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L407)

___

### loadFloat16Vec2

▸ **loadFloat16Vec2**(): [`Vec2`](../Math/Math_Vec2.Vec2)

Creates and returns a `Vec2` object with the next two Float16 values in the buffer.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- Returns a Vec2.

#### Defined in

[SceneTree/BinReader.ts:362](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L362)

___

### loadFloat16Vec3

▸ **loadFloat16Vec3**(): [`Vec3`](../Math/Math_Vec3.Vec3)

Creates and returns a `Vec3` object with the next three Float16 values in the buffer.

#### Returns

[`Vec3`](../Math/Math_Vec3.Vec3)

- Returns a Vec3.

#### Defined in

[SceneTree/BinReader.ts:383](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L383)

___

### loadFloat32

▸ **loadFloat32**(): `number`

Returns the Float32 value at current byte offset position,
and adds four bytes to the offset.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:205](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L205)

___

### loadFloat32Array

▸ **loadFloat32Array**(`size?`, `clone?`): `Float32Array`

Reads buffer and return a Float32 array with the specified size,
starting from current byte offset.
Byte offset is increased by the specified byte size x 4.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size?` | `number` | `undefined` | The size param. |
| `clone` | `boolean` | `false` | The clone param. |

#### Returns

`Float32Array`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:290](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L290)

___

### loadFloat32Quat

▸ **loadFloat32Quat**(): [`Quat`](../Math/Math_Quat.Quat)

Creates and returns a `Quat` object with the next four Float32 values in the buffer.

#### Returns

[`Quat`](../Math/Math_Quat.Quat)

- Returns a Quat.

#### Defined in

[SceneTree/BinReader.ts:419](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L419)

___

### loadFloat32Vec2

▸ **loadFloat32Vec2**(): [`Vec2`](../Math/Math_Vec2.Vec2)

Creates and returns a `Vec2` object with the next two Float32 values in the buffer.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- Returns a Vec2.

#### Defined in

[SceneTree/BinReader.ts:372](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L372)

___

### loadFloat32Vec3

▸ **loadFloat32Vec3**(): [`Vec3`](../Math/Math_Vec3.Vec3)

Creates and returns a `Vec3` object with the next three Float32 values in the buffer.

#### Returns

[`Vec3`](../Math/Math_Vec3.Vec3)

- Returns a Vec3.

#### Defined in

[SceneTree/BinReader.ts:395](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L395)

___

### loadRGBAFloat32Color

▸ **loadRGBAFloat32Color**(): [`Color`](../Math/Math_Color.Color)

Creates and returns a RGBA `Color` object with the next four Float32 values in the buffer.

#### Returns

[`Color`](../Math/Math_Color.Color)

- Returns a Color.

#### Defined in

[SceneTree/BinReader.ts:443](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L443)

___

### loadRGBAUInt8Color

▸ **loadRGBAUInt8Color**(): [`Color`](../Math/Math_Color.Color)

Creates and returns a RGBA `Color` object with the next four unsigned Int8 values in the buffer.

#### Returns

[`Color`](../Math/Math_Color.Color)

- Returns a Color.

#### Defined in

[SceneTree/BinReader.ts:466](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L466)

___

### loadRGBFloat32Color

▸ **loadRGBFloat32Color**(): [`Color`](../Math/Math_Color.Color)

Creates and returns a `Color` object with the next three Float32 values in the buffer.

#### Returns

[`Color`](../Math/Math_Color.Color)

- Returns a Color.

#### Defined in

[SceneTree/BinReader.ts:432](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L432)

___

### loadRGBUInt8Color

▸ **loadRGBUInt8Color**(): [`Color`](../Math/Math_Color.Color)

Creates and returns a `Color` object with the next three unsigned Int8 values in the buffer.

#### Returns

[`Color`](../Math/Math_Color.Color)

- Returns a Color.

#### Defined in

[SceneTree/BinReader.ts:455](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L455)

___

### loadSInt32

▸ **loadSInt32**(): `number`

Returns the signed Int32 value at current byte offset position,
and adds four bytes to the offset.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:132](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L132)

___

### loadSInt32From2xFloat16

▸ **loadSInt32From2xFloat16**(): `number`

Loads and returns a single Signed integer value from 2 signed Float16 values.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:193](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L193)

___

### loadSInt32Vec2

▸ **loadSInt32Vec2**(): [`Vec2`](../Math/Math_Vec2.Vec2)

Creates and returns a `Vec2` object with the next two signed Int32 values in the buffer.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- Returns a Vec2.

#### Defined in

[SceneTree/BinReader.ts:341](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L341)

___

### loadStr

▸ **loadStr**(): `string`

Returns next string.
First looks for the string length description in the next four bytes in the buffer(Starting from byte offset).

#### Returns

`string`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:314](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L314)

___

### loadStrArray

▸ **loadStrArray**(): `string`[]

Returns an array of strings.
First reading the size of the array then reading each string.

#### Returns

`string`[]

- The return value.

#### Defined in

[SceneTree/BinReader.ts:327](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L327)

___

### loadUFloat16

▸ **loadUFloat16**(): `number`

Returns the Float16 value at current byte offset position,
and adds two bytes to the offset.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:155](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L155)

___

### loadUInt16

▸ **loadUInt16**(): `number`

Returns the unsigned Uint16 value at current byte offset position,
and adds two bytes to the offset.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:108](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L108)

___

### loadUInt16Array

▸ **loadUInt16Array**(`size?`, `clone?`): `Uint16Array`

Reads buffer and return an unsigned Int16 array with the specified size,
starting from current byte offset.
Byte offset is increased by the specified byte size x 2.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size?` | `number` | `undefined` | The size param. |
| `clone` | `boolean` | `false` | The clone param. |

#### Returns

`Uint16Array`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:236](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L236)

___

### loadUInt32

▸ **loadUInt32**(): `number`

Returns the unsigned Uint32 value at current byte offset position,
and adds four bytes to the offset.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:120](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L120)

___

### loadUInt32Array

▸ **loadUInt32Array**(`size?`, `clone?`): `Uint32Array`

Reads buffer and return an unsigned Int32 array with the specified size,
starting from current byte offset.
Byte offset is increased by the specified byte size x 4.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size?` | `number` | `undefined` | The size param. |
| `clone` | `boolean` | `false` | The clone param. |

#### Returns

`Uint32Array`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:263](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L263)

___

### loadUInt32From2xUFloat16

▸ **loadUInt32From2xUFloat16**(): `number`

Loads and returns a single Signed integer value from 2 Unsigned Float16 values.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:183](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L183)

___

### loadUInt32Vec2

▸ **loadUInt32Vec2**(): [`Vec2`](../Math/Math_Vec2.Vec2)

Creates and returns a `Vec2` object with the next two unsigned Int32 values in the buffer.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- Returns a Vec2.

#### Defined in

[SceneTree/BinReader.ts:351](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L351)

___

### loadUInt8

▸ **loadUInt8**(): `number`

Returns the unsigned Uint8 value at current byte offset position,
and adds one byte to the offset.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:96](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L96)

___

### loadUInt8Array

▸ **loadUInt8Array**(`size?`, `clone?`): `Uint8Array`

Reads buffer and return an unsigned Int8 array with the specified size,
starting from current byte offset.
Byte offset is increased by the specified byte size.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size?` | `number` | `undefined` | The size param. |
| `clone` | `boolean` | `false` | The clone param. |

#### Returns

`Uint8Array`

- The return value.

#### Defined in

[SceneTree/BinReader.ts:220](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L220)

___

### pos

▸ **pos**(): `number`

Returns current byte offset in the buffer.

#### Returns

`number`

- The current offset in the binary buffer

#### Defined in

[SceneTree/BinReader.ts:69](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L69)

___

### readPad

▸ **readPad**(`stride`): `void`

Given a stridee value, advance the pointer to the end of the current stride.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stride` | `number` | The stride param. |

#### Returns

`void`

#### Defined in

[SceneTree/BinReader.ts:498](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L498)

___

### seek

▸ **seek**(`byteOffset`): `void`

Sets the byte offset value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byteOffset` | `number` | The byteOffset param. |

#### Returns

`void`

#### Defined in

[SceneTree/BinReader.ts:77](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/SceneTree/BinReader.ts#L77)

