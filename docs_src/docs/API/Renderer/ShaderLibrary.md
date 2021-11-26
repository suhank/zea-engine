---
id: "Renderer_ShaderLibrary.ShaderLibrary"
title: "Class: ShaderLibrary"
sidebar_label: "ShaderLibrary"
custom_edit_url: null
---



Class representing a shader library.

## Constructors

### constructor

• **new ShaderLibrary**()

Create a shader library.

#### Defined in

[Renderer/ShaderLibrary.ts:25](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L25)

## Properties

### \_\_shaderModules

• **\_\_shaderModules**: `Record`<`string`, `string`\>

#### Defined in

[Renderer/ShaderLibrary.ts:19](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L19)

___

### materialTemplates

• **materialTemplates**: `Record`<`string`, [`Material`](../SceneTree/SceneTree_Material.Material)\>

#### Defined in

[Renderer/ShaderLibrary.ts:20](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L20)

## Methods

### getShaderModule

▸ **getShaderModule**(`shaderName`): `string`

The getShaderModule method. Access specific uniforms, attributes of a particular module.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |

#### Returns

`string`

- The return value.

#### Defined in

[Renderer/ShaderLibrary.ts:49](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L49)

___

### getShaderModuleNames

▸ **getShaderModuleNames**(): `any`[]

The getShaderModuleNames method.

#### Returns

`any`[]

- The return value.

#### Defined in

[Renderer/ShaderLibrary.ts:57](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L57)

___

### handleImport

▸ **handleImport**(`result`, `shaderName`, `includeFile`, `includes`, `lineNumber`): `void`

The handleImport method -- takes the includeFile and if it exists, adds the parsed glsl, uniforms, and attributes to the result, recursively.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result` | `ShaderParseResult` | result object that stores the glsl, attribute, uniform |
| `shaderName` | `string` | shaderName |
| `includeFile` | `string` | file name of the shader snippet/module |
| `includes` | `string`[] | keep track of what was included |
| `lineNumber` | `number` | keep track of what line we're on |

#### Returns

`void`

#### Defined in

[Renderer/ShaderLibrary.ts:97](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L97)

___

### parseAttr

▸ **parseAttr**(`parts`, `instanced`, `result`, `line`): `void`

The parseAttr

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parts` | `string`[] | parts |
| `instanced` | `boolean` | instanced |
| `result` | `ShaderParseResult` | result object to store parsed data |
| `line` | `string` | - |

#### Returns

`void`

#### Defined in

[Renderer/ShaderLibrary.ts:70](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L70)

___

### parseShader

▸ **parseShader**(`shaderName`, `glsl`): `ShaderParseResult`

The parseShader method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |
| `glsl` | `string` | The glsl param. |

#### Returns

`ShaderParseResult`

- returns the 'result' object

#### Defined in

[Renderer/ShaderLibrary.ts:138](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L138)

___

### parseShaderHelper

▸ **parseShaderHelper**(`shaderName`, `glsl`, `includes`, `lineNumber`): `ShaderParseResult`

The parseShader recursive helper method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |
| `glsl` | `string` | The glsl param. |
| `includes` | `string`[] | keep track of what was included |
| `lineNumber` | `number` | keep track of what line we're on |

#### Returns

`ShaderParseResult`

- The return value.

#### Defined in

[Renderer/ShaderLibrary.ts:150](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L150)

___

### setShaderModule

▸ **setShaderModule**(`shaderName`, `shader`): `void`

The setShaderModule method. Shader must be set before parsing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |
| `shader` | `string` | The unparsed shader GLSL. |

#### Returns

`void`

#### Defined in

[Renderer/ShaderLibrary.ts:35](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/ShaderLibrary.ts#L35)

