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

SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:13

## Methods

### getType

▸ **getType**(): `string`

The type of file this plugin handles.

#### Returns

`string`

The type of file.

#### Defined in

SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:22

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

SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:14

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

SceneTree/ResourceLoader/BinaryLoaderPlugin.ts:26

