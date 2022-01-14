---
id: "SceneTree_ResourceLoader_JsonLoaderPlugin.JsonLoaderPlugin"
title: "Class: JsonLoaderPlugin"
sidebar_label: "JsonLoaderPlugin"
custom_edit_url: null
---



JSON loader plugin.

## Constructors

### constructor

• **new JsonLoaderPlugin**()

## Properties

### resourceLoader

• **resourceLoader**: `any`

#### Defined in

[src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts:13](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts#L13)

## Methods

### getType

▸ **getType**(): `string`

The type of file this plugin handles.

#### Returns

`string`

The type of file.

#### Defined in

[src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts:22](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts#L22)

___

### init

▸ **init**(`resourceLoader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceLoader` | `any` |

#### Returns

`void`

#### Defined in

[src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts:14](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts#L14)

___

### loadFile

▸ **loadFile**(`url`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts:26](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/JsonLoaderPlugin.ts#L26)

