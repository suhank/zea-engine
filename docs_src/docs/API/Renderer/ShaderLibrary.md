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

[src/Renderer/ShaderLibrary.ts:26](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L26)

## Properties

### \_\_shaderModules

• **\_\_shaderModules**: `Record`<`string`, `string`\>

#### Defined in

[src/Renderer/ShaderLibrary.ts:20](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L20)

___

### materialTemplates

• **materialTemplates**: `Record`<`string`, [`Material`](../SceneTree/SceneTree_Material.Material)\>

#### Defined in

[src/Renderer/ShaderLibrary.ts:21](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L21)

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

[src/Renderer/ShaderLibrary.ts:50](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L50)

___

### getShaderModuleNames

▸ **getShaderModuleNames**(): `string`[]

The getShaderModuleNames method.

#### Returns

`string`[]

- The return value.

#### Defined in

[src/Renderer/ShaderLibrary.ts:58](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L58)

___

### handleImport

▸ **handleImport**(`result`, `shaderName`, `includeFile`, `includes`, `lineNumber`): `void`

The handleImport method -- takes the includeFile and if it exists, adds the parsed glsl, uniforms, and attributes to the result, recursively.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result` | [`ShaderParseResult`](types/Renderer_types_renderer.ShaderParseResult) | result object that stores the glsl, attribute, uniform |
| `shaderName` | `string` | shaderName |
| `includeFile` | `string` | file name of the shader snippet/module |
| `includes` | `string`[] | keep track of what was included |
| `lineNumber` | `number` | keep track of what line we're on |

#### Returns

`void`

#### Defined in

[src/Renderer/ShaderLibrary.ts:98](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L98)

___

### parseAttr

▸ **parseAttr**(`parts`, `instanced`, `result`, `line`): `void`

The parseAttr

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parts` | `string`[] | parts |
| `instanced` | `boolean` | instanced |
| `result` | [`ShaderParseResult`](types/Renderer_types_renderer.ShaderParseResult) | result object to store parsed data |
| `line` | `string` | - |

#### Returns

`void`

#### Defined in

[src/Renderer/ShaderLibrary.ts:71](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L71)

___

### parseShader

▸ **parseShader**(`shaderName`, `glsl`): [`ShaderParseResult`](types/Renderer_types_renderer.ShaderParseResult)

The parseShader method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |
| `glsl` | `string` | The glsl param. |

#### Returns

[`ShaderParseResult`](types/Renderer_types_renderer.ShaderParseResult)

- returns the 'result' object

#### Defined in

[src/Renderer/ShaderLibrary.ts:139](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L139)

___

### parseShaderHelper

▸ **parseShaderHelper**(`shaderName`, `glsl`, `includes`, `lineNumber`): [`ShaderParseResult`](types/Renderer_types_renderer.ShaderParseResult)

The parseShader recursive helper method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |
| `glsl` | `string` | The glsl param. |
| `includes` | `string`[] | keep track of what was included |
| `lineNumber` | `number` | keep track of what line we're on |

#### Returns

[`ShaderParseResult`](types/Renderer_types_renderer.ShaderParseResult)

- The return value.

#### Defined in

[src/Renderer/ShaderLibrary.ts:151](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L151)

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

[src/Renderer/ShaderLibrary.ts:36](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/ShaderLibrary.ts#L36)

