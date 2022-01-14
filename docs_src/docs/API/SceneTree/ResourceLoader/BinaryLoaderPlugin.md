---
id: "SceneTree_ResourceLoader_BinaryLoaderPlugin.BinaryLoaderPlugin"
title: "Class: BinaryLoaderPlugin"
sidebar_label: "BinaryLoaderPlugin"
custom_edit_url: null
---



Binary loader plugin.

## Constructors

### constructor

• **new BinaryLoaderPlugin**()

## Properties

### resourceLoader

• `Protected` **resourceLoader**: `any`

#### Defined in

[src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:13](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts#L13)

## Methods

### getType

▸ **getType**(): `string`

The type of file this plugin handles.

#### Returns

`string`

The type of file.

#### Defined in

[src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:22](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts#L22)

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

[src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:14](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts#L14)

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

[src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:26](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/ResourceLoader/BinaryLoaderPlugin.ts#L26)

