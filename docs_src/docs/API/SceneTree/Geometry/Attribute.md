---
id: "SceneTree_Geometry_Attribute.Attribute"
title: "Class: Attribute"
sidebar_label: "Attribute"
custom_edit_url: null
---



## Hierarchy

- [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass)

  ↳ **`Attribute`**

  ↳↳ [`ColorAttribute`](SceneTree_Geometry_ColorAttribute.ColorAttribute)

  ↳↳ [`Vec2Attribute`](SceneTree_Geometry_Vec2Attribute.Vec2Attribute)

  ↳↳ [`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

  ↳↳ [`Vec4Attribute`](SceneTree_Geometry_Vec4Attribute.Vec4Attribute)

## Constructors

### constructor

• **new Attribute**(`dataTypeName`, `stride`)

Create an BaseClass.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataTypeName` | `string` |
| `stride` | `number` |

#### Overrides

[BaseClass](../../Utilities/Utilities_BaseClass.BaseClass).[constructor](../../Utilities/Utilities_BaseClass.BaseClass#constructor)

#### Defined in

[SceneTree/Geometry/Attribute.ts:29](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L29)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseClass](../../Utilities/Utilities_BaseClass.BaseClass).[__id](../../Utilities/Utilities_BaseClass.BaseClass#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L11)

___

### data

• `Protected` **data**: `Float32Array`

#### Defined in

[SceneTree/Geometry/Attribute.ts:23](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L23)

___

### dataTypeName

• **dataTypeName**: `string`

#### Defined in

[SceneTree/Geometry/Attribute.ts:20](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L20)

___

### mesh

• `Protected` **mesh**: [`Mesh`](SceneTree_Geometry_Mesh.Mesh)

#### Defined in

[SceneTree/Geometry/Attribute.ts:25](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L25)

___

### normalized

• `Protected` **normalized**: `boolean`

#### Defined in

[SceneTree/Geometry/Attribute.ts:22](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L22)

___

### splitValues

• `Protected` **splitValues**: `Float32Array`[]

#### Defined in

[SceneTree/Geometry/Attribute.ts:26](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L26)

___

### splits

• `Protected` **splits**: `Record`<`number`, `Record`<`number`, `number`\>\>

#### Defined in

[SceneTree/Geometry/Attribute.ts:27](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L27)

___

### stride

• **stride**: `number`

#### Defined in

[SceneTree/Geometry/Attribute.ts:21](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L21)

## Accessors

### numElements

• `get` **numElements**(): `number`

Returns the number of elements stored in each `T`.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:120](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L120)

## Methods

### asArray

▸ **asArray**(): `Float32Array`

Returns the backing array for this attribute

#### Returns

`Float32Array`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:57](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L57)

___

### fromJSON

▸ **fromJSON**(`j`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:324](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L324)

___

### genBuffer

▸ **genBuffer**(): `Record`<`string`, `any`\>

Returns vertex attributes buffers and its count.

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:380](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L380)

___

### generateSplitValues

▸ **generateSplitValues**(`splitIndices`, `splitCount`): `TypedArray`

The generateSplitValues method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `splitIndices` | `Record`<`number`, `Record`<`number`, `number`\>\> | The splitIndices value. |
| `splitCount` | `number` | The splitCount value. |

#### Returns

`TypedArray`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:268](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L268)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseClass](../../Utilities/Utilities_BaseClass.BaseClass).[getClassName](../../Utilities/Utilities_BaseClass.BaseClass#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L33)

___

### getCount

▸ **getCount**(): `number`

Returns the count of attribute values in the data.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:75](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L75)

___

### getDataTypeName

▸ **getDataTypeName**(): `string`

Returns the name of the math type this attribute stores.

#### Returns

`string`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:66](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L66)

___

### getFaceVertexValueRef\_array

▸ **getFaceVertexValueRef_array**(`face`, `faceVertex`): `Float32Array`

Gets the value of a corner vertex of a face.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `face` | `number` | The face index. |
| `faceVertex` | `number` | The index of vertex within the face. [0... num face vertices] |

#### Returns

`Float32Array`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:161](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L161)

___

### getFloat32Value

▸ **getFloat32Value**(`index`): `number`

Returns data value of the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:130](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L130)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Inherited from

[BaseClass](../../Utilities/Utilities_BaseClass.BaseClass).[getId](../../Utilities/Utilities_BaseClass.BaseClass#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L25)

___

### getSplits

▸ **getSplits**(): `Record`<`number`, `Record`<`number`, `number`\>\>

The getSplits method.

#### Returns

`Record`<`number`, `Record`<`number`, `number`\>\>

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:151](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L151)

___

### initRange

▸ `Private` **initRange**(`start`): `void`

Fills up data values with default ones starting from the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The start value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:108](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L108)

___

### loadSplitValues

▸ **loadSplitValues**(`reader`): `void`

The loadSplitValues method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:335](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L335)

___

### setCount

▸ **setCount**(`count`): `void`

Sets the count of attribute values in the data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:84](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L84)

___

### setFaceVertexValue\_ByVertexIndex

▸ **setFaceVertexValue_ByVertexIndex**(`face`, `vertex`, `value`): `void`

The setFaceVertexValue_ByVertexIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `face` | `number` | The face index. |
| `vertex` | `number` | The vertex value. |
| `value` | `Float32Array` | The value value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:186](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L186)

___

### setFaceVertexValue\_array

▸ **setFaceVertexValue_array**(`face`, `faceVertex`, `value`): `void`

Sets the value of a corner vertex of a face.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `face` | `number` | The face index. |
| `faceVertex` | `number` | The index of vertex within the face. [0... num face vertices] |
| `value` | `Float32Array` | The value value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:175](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L175)

___

### setFloat32Value

▸ **setFloat32Value**(`index`, `value`): `void`

Sets data value in the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |
| `value` | `number` | The value param. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:140](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L140)

___

### setMesh

▸ **setMesh**(`mesh`): `void`

Sets the Mesh reference to the VertexAttribute. This is needed for attributes
assigned to meshes, and is used to calculate face vertex indices.
> Note: the mesh automatically calls this method when a vertex attribute is assigned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mesh` | [`Mesh`](SceneTree_Geometry_Mesh.Mesh) | The mesh object |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:48](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L48)

___

### setSplitVertexValue\_array

▸ **setSplitVertexValue_array**(`vertex`, `face`, `value`): `void`

The setSplitVertexValue method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertex` | `number` | The vertex value. |
| `face` | `number` | The face index. |
| `value` | `Float32Array` | The value value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:230](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L230)

___

### setSplitVertexValues

▸ **setSplitVertexValues**(`vertex`, `faceGroup`, `value`): `void`

The setSplitVertexValues method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertex` | `number` | The vertex value. |
| `faceGroup` | `number`[] | The faceGroup value. |
| `value` | `Float32Array` | The value value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/Attribute.ts:247](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L247)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Defined in

[SceneTree/Geometry/Attribute.ts:311](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L311)

___

### toString

▸ **toString**(): `string`

Returns the string representation of the object's state.

#### Returns

`string`

- The return value.

#### Defined in

[SceneTree/Geometry/Attribute.ts:368](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/Geometry/Attribute.ts#L368)

