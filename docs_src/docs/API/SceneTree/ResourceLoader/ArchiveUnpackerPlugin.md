---
id: "SceneTree_ResourceLoader_ArchiveUnpackerPlugin.ArchiveUnpackerPlugin"
title: "Class: ArchiveUnpackerPlugin"
sidebar_label: "ArchiveUnpackerPlugin"
custom_edit_url: null
---



Archive unpacker plugin.

## Constructors

### constructor

• **new ArchiveUnpackerPlugin**()

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:29](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L29)

## Properties

### \_\_callbacks

• `Protected` **\_\_callbacks**: `Record`<`string`, `any`\>

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:24](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L24)

___

### \_\_nextWorker

• `Protected` **\_\_nextWorker**: `number`

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:26](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L26)

___

### \_\_workers

• `Protected` **\_\_workers**: `any`[]

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:25](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L25)

___

### resourceLoader

• `Protected` **resourceLoader**: `any`

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:27](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L27)

## Methods

### \_\_getWorker

▸ `Private` **__getWorker**(): `any`

The __getWorker method.

#### Returns

`any`

- The return value.

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:52](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L52)

___

### \_\_onFinishedReceiveFileData

▸ `Private` **__onFinishedReceiveFileData**(`fileData`): `void`

The __onFinishedReceiveFileData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileData` | `Record`<`string`, `any`\> | The fileData value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:146](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L146)

___

### \_\_terminateWorkers

▸ `Private` **__terminateWorkers**(): `void`

The __terminateWorkers value.

#### Returns

`void`

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:94](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L94)

___

### getType

▸ **getType**(): `string`

The type of file this plugin handles.

#### Returns

`string`

The type of file.

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:43](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L43)

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

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:35](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L35)

___

### loadFile

▸ **loadFile**(`url`): `Promise`<`unknown`\>

Loads an archive file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The url of the data to load. |

#### Returns

`Promise`<`unknown`\>

- The promise value.

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:105](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L105)

___

### shutDownWorkers

▸ **shutDownWorkers**(): `void`

#### Returns

`void`

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:157](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L157)

