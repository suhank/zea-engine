---
id: "SceneTree_Version.Version"
title: "Class: Version"
sidebar_label: "Version"
custom_edit_url: null
---



Class designed to store version data. Widely used in the zea engine for backwards compatibility.

## Constructors

### constructor

• **new Version**(`versionStr?`)

Creates a version.
The version string should have the following structure:
major, minor and patch separated by a dot(`.`) and parts separated by a dash(`-`).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `versionStr` | `string` | `''` | The version string value. |

#### Defined in

[src/SceneTree/Version.ts:16](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Version.ts#L16)

## Properties

### branch

• **branch**: `string` = `''`

#### Defined in

[src/SceneTree/Version.ts:8](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Version.ts#L8)

___

### major

• **major**: `number`

#### Defined in

[src/SceneTree/Version.ts:5](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Version.ts#L5)

___

### minor

• **minor**: `number`

#### Defined in

[src/SceneTree/Version.ts:6](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Version.ts#L6)

___

### patch

• **patch**: `number`

#### Defined in

[src/SceneTree/Version.ts:7](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Version.ts#L7)

## Methods

### compare

▸ **compare**(`numbers`): `number`

Compare a version object against a version numbers array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numbers` | `number`[] | An array containing 3 version numbers. [Major, Minor, Patch] |

#### Returns

`number`

- return positive: v1 > v2, zero:v1 == v2, negative: v1 < v2

#### Defined in

[src/SceneTree/Version.ts:37](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Version.ts#L37)

