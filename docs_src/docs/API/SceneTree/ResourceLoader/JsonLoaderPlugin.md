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

SceneTree/ResourceLoader/JsonLoaderPlugin.ts:13

## Methods

### getType

▸ **getType**(): `string`

The type of file this plugin handles.

#### Returns

`string`

The type of file.

#### Defined in

SceneTree/ResourceLoader/JsonLoaderPlugin.ts:22

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

SceneTree/ResourceLoader/JsonLoaderPlugin.ts:14

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

SceneTree/ResourceLoader/JsonLoaderPlugin.ts:26

