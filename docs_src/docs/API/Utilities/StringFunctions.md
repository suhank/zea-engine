---
id: "Utilities_StringFunctions.StringFunctions"
title: "Class: StringFunctions"
sidebar_label: "StringFunctions"
custom_edit_url: null
---



String functions

## Constructors

### constructor

• **new StringFunctions**()

## Methods

### hashStr

▸ `Static` **hashStr**(`str`): `number`

Transforms the given string into a numeric value.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | - |

#### Returns

`number`

-

#### Defined in

[src/Utilities/StringFunctions.ts:45](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/StringFunctions.ts#L45)

___

### replaceAll

▸ `Static` **replaceAll**(`str`, `pattern`, `replacement`): `string`

Replaces all matches in a string.

**`static`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | - |
| `pattern` | `string` \| `RegExp` | - |
| `replacement` | `string` | - |

#### Returns

`string`

-

#### Defined in

[src/Utilities/StringFunctions.ts:15](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/StringFunctions.ts#L15)

___

### stringifyJSONWithFixedPrecision

▸ `Static` **stringifyJSONWithFixedPrecision**(`val`, `space?`, `precision?`): `string`

Returns JSON object as a formatted string, but the numeric values are fixed to the specified precision.

**`static`**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `val` | `Record`<`string`, `any`\> | `undefined` | - |
| `space` | `number` | `0` | - |
| `precision` | `number` | `5` | - |

#### Returns

`string`

-

#### Defined in

[src/Utilities/StringFunctions.ts:28](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/StringFunctions.ts#L28)

