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

[LibsRegistry.ts:12](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/LibsRegistry.ts#L12)

## Properties

### registry

• **registry**: `Record`<`string`, `unknown`\>

#### Defined in

[LibsRegistry.ts:5](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/LibsRegistry.ts#L5)

___

### version

• **version**: `string`

#### Defined in

[LibsRegistry.ts:6](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/LibsRegistry.ts#L6)

## Methods

### listLibs

▸ **listLibs**(): `Record`<`string`, `unknown`\>

List the registered libraries with their versions.

#### Returns

`Record`<`string`, `unknown`\>

Libraries list.

#### Defined in

[LibsRegistry.ts:37](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/LibsRegistry.ts#L37)

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

[LibsRegistry.ts:21](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/LibsRegistry.ts#L21)

