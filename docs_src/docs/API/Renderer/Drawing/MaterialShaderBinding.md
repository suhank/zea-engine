---
id: "Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding"
title: "Class: MaterialShaderBinding"
sidebar_label: "MaterialShaderBinding"
custom_edit_url: null
---



Class representing material shader binding.

## Constructors

### constructor

• **new MaterialShaderBinding**(`gl`, `glMaterial`, `unifs`, `warnMissingUnifs`)

Create material shader binding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | The webgl rendering context. |
| `glMaterial` | `any` | The glMaterial value. |
| `unifs` | `Uniforms` | The dictionary of WebGL uniforms. |
| `warnMissingUnifs` | `any` | The warnMissingUnifs value. |

#### Defined in

[Renderer/Drawing/MaterialShaderBinding.ts:497](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/MaterialShaderBinding.ts#L497)

## Properties

### uniformBindings

• `Protected` **uniformBindings**: `ParamUniformBinding`[] = `[]`

#### Defined in

[Renderer/Drawing/MaterialShaderBinding.ts:489](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/MaterialShaderBinding.ts#L489)

## Methods

### bind

▸ **bind**(`renderstate`): `boolean`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`boolean`

- The return value.

#### Defined in

[Renderer/Drawing/MaterialShaderBinding.ts:579](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/MaterialShaderBinding.ts#L579)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/Drawing/MaterialShaderBinding.ts:599](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/MaterialShaderBinding.ts#L599)

___

### unbind

▸ **unbind**(`renderstate`): `void`

The unbind method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderstate` | `RenderState` |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/MaterialShaderBinding.ts:589](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/MaterialShaderBinding.ts#L589)

