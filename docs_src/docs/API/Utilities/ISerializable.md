---
id: "Utilities_ISerializable.ISerializable"
title: "Interface: ISerializable"
sidebar_label: "ISerializable"
custom_edit_url: null
---



## Implemented by

- [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)

## Methods

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method takes a JSON and deserializes into an instance of this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Defined in

[Utilities/ISerializable.ts:18](https://github.com/ZeaInc/zea-engine/blob/87b3133d3/src/Utilities/ISerializable.ts#L18)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Defined in

[Utilities/ISerializable.ts:10](https://github.com/ZeaInc/zea-engine/blob/87b3133d3/src/Utilities/ISerializable.ts#L10)

