---
id: "LibsRegistry.LibsRegistry-1"
title: "Class: LibsRegistry"
sidebar_label: "LibsRegistry"
custom_edit_url: null
---



Libraries registry.

## Constructors

### constructor

• **new LibsRegistry**(`version`)

Construct a new libraries registry for the specific version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `string` | The version of the Zea Engine that will be validated against the registered libraries. |

#### Defined in

[LibsRegistry.ts:15](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/LibsRegistry.ts#L15)

## Properties

### registry

• **registry**: `Record`<`string`, `unknown`\>

#### Defined in

[LibsRegistry.ts:8](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/LibsRegistry.ts#L8)

___

### version

• **version**: `string`

#### Defined in

[LibsRegistry.ts:9](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/LibsRegistry.ts#L9)

## Methods

### listLibs

▸ **listLibs**(): `Record`<`string`, `unknown`\>

List the registered libraries with their versions.

#### Returns

`Record`<`string`, `unknown`\>

Libraries list.

#### Defined in

[LibsRegistry.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/LibsRegistry.ts#L44)

___

### registerLib

▸ **registerLib**(`packageJson`): `void`

Validate and register a library.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packageJson` | `Record`<`string`, `any`\> | The package.json of the library to register. |

#### Returns

`void`

#### Defined in

[LibsRegistry.ts:24](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/LibsRegistry.ts#L24)

