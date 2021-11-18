---
id: "SceneTree_BinWriter.BinWriter"
title: "Class: BinWriter"
sidebar_label: "BinWriter"
custom_edit_url: null
---



Writes `TypedArray` types in binary using a specific encoding.

## Constructors

### constructor

• **new BinWriter**(`dataSize?`)

Create a bin writer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `dataSize` | `number` | `0` | The dataSize value. |

#### Defined in

SceneTree/BinWriter.ts:18

## Properties

### \_\_byteOffset

• `Protected` **\_\_byteOffset**: `number`

#### Defined in

SceneTree/BinWriter.ts:11

___

### \_\_data

• `Protected` **\_\_data**: `ArrayBuffer`

#### Defined in

SceneTree/BinWriter.ts:10

___

### \_\_dataView

• `Protected` **\_\_dataView**: `DataView`

#### Defined in

SceneTree/BinWriter.ts:13

___

### \_\_reserved

• `Protected` **\_\_reserved**: `number`

#### Defined in

SceneTree/BinWriter.ts:12

## Methods

### \_\_grow

▸ `Private` **__grow**(): `void`

The __grow method.

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:68

___

### \_\_offset

▸ `Private` **__offset**(`byteCount`): `void`

The __offset method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byteCount` | `number` | The byteCount value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:95

___

### \_\_reserve

▸ `Private` **__reserve**(`offset`): `void`

The __reserve method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offset` | `number` | The offset value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:84

___

### getBuffer

▸ **getBuffer**(): `ArrayBufferLike`

Returns written buffer data to current point.

#### Returns

`ArrayBufferLike`

- Returns an array buffer.

#### Defined in

SceneTree/BinWriter.ts:55

___

### pos

▸ **pos**(): `number`

Returns the byte offset position.

#### Returns

`number`

- The return value.

#### Defined in

SceneTree/BinWriter.ts:30

___

### seek

▸ **seek**(`byteOffset`): `void`

Sets byte offset value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byteOffset` | `number` | The byteOffset value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:39

___

### seekEnd

▸ **seekEnd**(): `void`

The seekEnd method.

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:46

___

### writeAlignment

▸ **writeAlignment**(`numBytes`): `void`

The writeAlignment method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numBytes` | `number` | The numBytes value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:402

___

### writeBox2

▸ **writeBox2**(`value`): `void`

Writes a `Box2` in the buffer using Floar32 values(In `p0,p1` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Box2`](../Math/Math_Box2.Box2) | The Box2 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:373

___

### writeBox3

▸ **writeBox3**(`value`): `void`

Writes a `Box3` in the buffer using Floar32 values(In `p0,p1` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Box3`](../Math/Math_Box3.Box3) | The Box3 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:383

___

### writeFloat16

▸ **writeFloat16**(`value`): `void`

Writes a Float16 value in current byte offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value param. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:148

___

### writeFloat16Quat

▸ **writeFloat16Quat**(`value`): `void`

Writes a `Quat` in the buffer using Float16 values(In `x,y,z,w` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Quat`](../Math/Math_Quat.Quat) | The Quat to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:303

___

### writeFloat16Vec2

▸ **writeFloat16Vec2**(`value`): `void`

Writes a `Vec2` in the buffer using Float16 values(In `x,y` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Vec2`](../Math/Math_Vec2.Vec2) | The Vec2 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:262

___

### writeFloat16Vec3

▸ **writeFloat16Vec3**(`value`): `void`

Writes a `Vec3` in the buffer using Float16 values(In `x,y,z` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Vec3`](../Math/Math_Vec3.Vec3) | The Vec3 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:282

___

### writeFloat32

▸ **writeFloat32**(`value`): `void`

Writes a Float32 value in current byte offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value param. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:158

___

### writeFloat32Array

▸ **writeFloat32Array**(`value`, `writeSize?`): `void`

Writes a Float32 array value from current byte offset.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `Float32Array` | `undefined` | The value param. |
| `writeSize` | `boolean` | `true` | The writeSize value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:215

___

### writeFloat32Quat

▸ **writeFloat32Quat**(`value`): `void`

Writes a `Quat` in the buffer using Float32 values(In `x,y,z,w` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Quat`](../Math/Math_Quat.Quat) | The Quat to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:315

___

### writeFloat32Vec2

▸ **writeFloat32Vec2**(`value`): `void`

Writes a `Vec2` in the buffer using Float32 values(In `x,y` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Vec2`](../Math/Math_Vec2.Vec2) | The Vec2 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:272

___

### writeFloat32Vec3

▸ **writeFloat32Vec3**(`value`): `void`

Writes a `Vec3` in the buffer using Float32 values(In `x,y,z` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Vec3`](../Math/Math_Vec3.Vec3) | The Vec3 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:292

___

### writePadd

▸ **writePadd**(`size`): `void`

The writePadd method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | The size value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:392

___

### writeRGBAFloat32Color

▸ **writeRGBAFloat32Color**(`value`): `void`

Writes a RGBA `Color` in the buffer using Float32 values(In `r,g,b,a` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Color`](../Math/Math_Color.Color) | The Color to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:338

___

### writeRGBAUInt8Color

▸ **writeRGBAUInt8Color**(`value`): `void`

Writes a RGBA `Color` in the buffer using unsigned Int8 values(In `r,g,b,a` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Color`](../Math/Math_Color.Color) | The Color to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:361

___

### writeRGBFloat32Color

▸ **writeRGBFloat32Color**(`value`): `void`

Writes a RGB `Color` in the buffer using Float32 values(In `r,g,b` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Color`](../Math/Math_Color.Color) | The Color to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:327

___

### writeRGBUInt8Color

▸ **writeRGBUInt8Color**(`value`): `void`

Writes a RGB `Color` in the buffer using unsigned Int8 values(In `r,g,b` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Color`](../Math/Math_Color.Color) | The Color to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:350

___

### writeSInt32

▸ **writeSInt32**(`value`): `void`

Writes a signed Int32 value in current byte offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value param. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:137

___

### writeSInt32Vec2

▸ **writeSInt32Vec2**(`value`): `void`

Writes a `Vec2` in the buffer using signed Int32 values(In `x,y` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Vec2`](../Math/Math_Vec2.Vec2) | The Vec2 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:243

___

### writeStr

▸ **writeStr**(`str`, `writeSize?`): `void`

Writes string value in current position, first writing an unsigned Int32 describing its length, then adding the string in Float32 values.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | The str value. |
| `writeSize` | `boolean` | `true` | The writeSize value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:230

___

### writeUInt16

▸ **writeUInt16**(`value`): `void`

Writes an unsigned Int16 value in current byte offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value param. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:117

___

### writeUInt16Array

▸ **writeUInt16Array**(`value`, `writeSize?`): `void`

Writes an unsigned Int16 array value from current byte offset.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `Uint16Array` | `undefined` | The value param. |
| `writeSize` | `boolean` | `true` | The writeSize value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:185

___

### writeUInt32

▸ **writeUInt32**(`value`): `void`

Writes an unsigned Int32 value in current byte offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value param. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:127

___

### writeUInt32Array

▸ **writeUInt32Array**(`value`, `writeSize?`): `void`

Writes an unsigned Int32 array value from current byte offset.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `Uint32Array` | `undefined` | The value param. |
| `writeSize` | `boolean` | `true` | The writeSize value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:200

___

### writeUInt32Vec2

▸ **writeUInt32Vec2**(`value`): `void`

Writes a `Vec2` in the buffer using unsigned Int32 values(In `x,y` order).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Vec2`](../Math/Math_Vec2.Vec2) | The Vec2 to write. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:253

___

### writeUInt8

▸ **writeUInt8**(`value`): `void`

Writes an unsigned Int8 value in current byte offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value param. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:107

___

### writeUInt8Array

▸ **writeUInt8Array**(`value`, `writeSize?`): `void`

Writes an unsigned Int8 array value from current byte offset.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `Uint8Array` | `undefined` | The value param. |
| `writeSize` | `boolean` | `true` | The writeSize value. |

#### Returns

`void`

#### Defined in

SceneTree/BinWriter.ts:170

