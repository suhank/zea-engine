---
id: "SceneTree_Geometry_ColorAttribute.ColorAttribute"
title: "Class: ColorAttribute"
sidebar_label: "ColorAttribute"
custom_edit_url: null
---



Class representing an attribute.

## Hierarchy

- [`Attribute`](SceneTree_Geometry_Attribute.Attribute)

  ↳ **`ColorAttribute`**

## Constructors

### constructor

• **new ColorAttribute**()

Create a ColorAttribute.

#### Overrides

[Attribute](SceneTree_Geometry_Attribute.Attribute).[constructor](SceneTree_Geometry_Attribute.Attribute#constructor)

#### Defined in

[src/SceneTree/Geometry/ColorAttribute.ts:12](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/ColorAttribute.ts#L12)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[__id](SceneTree_Geometry_Attribute.Attribute#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L11)

___

### data

• `Protected` **data**: `Float32Array`

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[data](SceneTree_Geometry_Attribute.Attribute#data)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:23](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L23)

___

### dataTypeName

• **dataTypeName**: `string`

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[dataTypeName](SceneTree_Geometry_Attribute.Attribute#datatypename)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:20](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L20)

___

### mesh

• `Protected` **mesh**: [`Mesh`](SceneTree_Geometry_Mesh.Mesh)

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[mesh](SceneTree_Geometry_Attribute.Attribute#mesh)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L25)

___

### normalized

• `Protected` **normalized**: `boolean`

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[normalized](SceneTree_Geometry_Attribute.Attribute#normalized)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:22](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L22)

___

### splitValues

• `Protected` **splitValues**: `Float32Array`[]

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[splitValues](SceneTree_Geometry_Attribute.Attribute#splitvalues)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:26](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L26)

___

### splits

• `Protected` **splits**: `Record`<`number`, `Record`<`number`, `number`\>\>

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[splits](SceneTree_Geometry_Attribute.Attribute#splits)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:27](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L27)

___

### stride

• **stride**: `number`

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[stride](SceneTree_Geometry_Attribute.Attribute#stride)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:21](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L21)

## Accessors

### numElements

• `get` **numElements**(): `number`

Returns the number of elements stored in each `T`.

#### Returns

`number`

- The return value.

#### Inherited from

Attribute.numElements

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:120](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L120)

## Methods

### asArray

▸ **asArray**(): `Float32Array`

Returns the backing array for this attribute

#### Returns

`Float32Array`

- The return value.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[asArray](SceneTree_Geometry_Attribute.Attribute#asarray)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:57](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L57)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[fromJSON](SceneTree_Geometry_Attribute.Attribute#fromjson)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:324](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L324)

___

### genBuffer

▸ **genBuffer**(): `Record`<`string`, `any`\>

Returns vertex attributes buffers and its count.

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[genBuffer](SceneTree_Geometry_Attribute.Attribute#genbuffer)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:380](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L380)

___

### generateSplitValues

▸ **generateSplitValues**(`splitIndices`, `splitCount`): `Float32Array`

The generateSplitValues method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `splitIndices` | `Record`<`number`, `Record`<`number`, `number`\>\> | The splitIndices value. |
| `splitCount` | `number` | The splitCount value. |

#### Returns

`Float32Array`

- The return value.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[generateSplitValues](SceneTree_Geometry_Attribute.Attribute#generatesplitvalues)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:268](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L268)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[getClassName](SceneTree_Geometry_Attribute.Attribute#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L33)

___

### getCount

▸ **getCount**(): `number`

Returns the count of attribute values in the data.

#### Returns

`number`

- The return value.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[getCount](SceneTree_Geometry_Attribute.Attribute#getcount)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:75](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L75)

___

### getDataTypeName

▸ **getDataTypeName**(): `string`

Returns the name of the math type this attribute stores.

#### Returns

`string`

- The return value.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[getDataTypeName](SceneTree_Geometry_Attribute.Attribute#getdatatypename)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:66](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L66)

___

### getFaceVertexValueRef

▸ **getFaceVertexValueRef**(`face`, `faceVertex`): [`Color`](../../Math/Math_Color.Color)

Gets the value of a corner vertex of a face.
> Note: 'Ref' means that the value contains a reference to the data in the attribute.
> The components of the value can be changed causing the attributes data is changed.
> No need to call 'setFaceVertexValue'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `face` | `number` | The face index. |
| `faceVertex` | `number` | The index of vertex within the face. [0... num face vertices] |

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The return value.

#### Defined in

[src/SceneTree/Geometry/ColorAttribute.ts:74](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/ColorAttribute.ts#L74)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[getFaceVertexValueRef_array](SceneTree_Geometry_Attribute.Attribute#getfacevertexvalueref_array)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:161](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L161)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[getFloat32Value](SceneTree_Geometry_Attribute.Attribute#getfloat32value)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:130](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L130)

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

[Attribute](SceneTree_Geometry_Attribute.Attribute).[getId](SceneTree_Geometry_Attribute.Attribute#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L25)

___

### getSplits

▸ **getSplits**(): `Record`<`number`, `Record`<`number`, `number`\>\>

The getSplits method.

#### Returns

`Record`<`number`, `Record`<`number`, `number`\>\>

- The return value.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[getSplits](SceneTree_Geometry_Attribute.Attribute#getsplits)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:151](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L151)

___

### getValue

▸ **getValue**(`index`): [`Color`](../../Math/Math_Color.Color)

Returns a copy of the Color value at the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`Color`](../../Math/Math_Color.Color)

Color - The return value.

#### Defined in

[src/SceneTree/Geometry/ColorAttribute.ts:42](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/ColorAttribute.ts#L42)

___

### getValueRef

▸ **getValueRef**(`index`): [`Color`](../../Math/Math_Color.Color)

Returns the Color value at the specified index.

> Note: 'Ref' means that the value contains a reference to the data in the attribute.
> The components of the value can be changed causing the attributes data is changed.
> No need to call 'setValue'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`Color`](../../Math/Math_Color.Color)

Color - The value at the specified index.

#### Defined in

[src/SceneTree/Geometry/ColorAttribute.ts:27](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/ColorAttribute.ts#L27)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[loadSplitValues](SceneTree_Geometry_Attribute.Attribute#loadsplitvalues)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:335](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L335)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[setCount](SceneTree_Geometry_Attribute.Attribute#setcount)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:84](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L84)

___

### setFaceVertexValue

▸ **setFaceVertexValue**(`face`, `faceVertex`, `value`): `void`

Sets the value of a corner vertex of a face.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `face` | `number` | The face index. |
| `faceVertex` | `number` | The index of vertex within the face. [0... num face vertices] |
| `value` | [`Color`](../../Math/Math_Color.Color) | The value value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/ColorAttribute.ts:85](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/ColorAttribute.ts#L85)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[setFaceVertexValue_ByVertexIndex](SceneTree_Geometry_Attribute.Attribute#setfacevertexvalue_byvertexindex)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:186](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L186)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[setFaceVertexValue_array](SceneTree_Geometry_Attribute.Attribute#setfacevertexvalue_array)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:175](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L175)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[setFloat32Value](SceneTree_Geometry_Attribute.Attribute#setfloat32value)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:140](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L140)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[setMesh](SceneTree_Geometry_Attribute.Attribute#setmesh)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:48](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L48)

___

### setSplitVertexValue

▸ **setSplitVertexValue**(`vertex`, `face`, `value`): `void`

The setSplitVertexValue method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertex` | `number` | The vertex value. |
| `face` | `number` | The face index. |
| `value` | [`Color`](../../Math/Math_Color.Color) | The value value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/ColorAttribute.ts:95](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/ColorAttribute.ts#L95)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[setSplitVertexValue_array](SceneTree_Geometry_Attribute.Attribute#setsplitvertexvalue_array)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:230](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L230)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[setSplitVertexValues](SceneTree_Geometry_Attribute.Attribute#setsplitvertexvalues)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:247](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L247)

___

### setValue

▸ **setValue**(`index`, `value`): `void`

Sets Color at the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |
| `value` | [`Color`](../../Math/Math_Color.Color) | The value param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/ColorAttribute.ts:57](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/ColorAttribute.ts#L57)

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

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[toJSON](SceneTree_Geometry_Attribute.Attribute#tojson)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:311](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L311)

___

### toString

▸ **toString**(): `string`

Returns the string representation of the object's state.

#### Returns

`string`

- The return value.

#### Inherited from

[Attribute](SceneTree_Geometry_Attribute.Attribute).[toString](SceneTree_Geometry_Attribute.Attribute#tostring)

#### Defined in

[src/SceneTree/Geometry/Attribute.ts:368](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Attribute.ts#L368)

