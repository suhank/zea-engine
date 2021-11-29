---
id: "Renderer_GLScreenQuad.GLScreenQuad"
title: "Class: GLScreenQuad"
sidebar_label: "GLScreenQuad"
custom_edit_url: null
---



Class representing a GL screen quad.

## Constructors

### constructor

• **new GLScreenQuad**(`gl`, `shaderopts`)

Create a GL screen quad.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | The webgl rendering context. |
| `shaderopts` | `Record`<`string`, `any`\> | shader options |

#### Defined in

[Renderer/GLScreenQuad.ts:22](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L22)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/GLScreenQuad.ts:10](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L10)

___

### \_\_glshader

• `Protected` **\_\_glshader**: [`ScreenQuadShader`](Shaders/Renderer_Shaders_ScreenQuadShader.ScreenQuadShader)

#### Defined in

[Renderer/GLScreenQuad.ts:14](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L14)

___

### \_\_pos

• `Protected` **\_\_pos**: `number`[]

#### Defined in

[Renderer/GLScreenQuad.ts:11](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L11)

___

### \_\_quadBinding

• `Protected` **\_\_quadBinding**: `any`

#### Defined in

[Renderer/GLScreenQuad.ts:15](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L15)

___

### \_\_size

• `Protected` **\_\_size**: `number`[]

#### Defined in

[Renderer/GLScreenQuad.ts:12](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L12)

___

### flipY

• `Protected` **flipY**: `boolean`

#### Defined in

[Renderer/GLScreenQuad.ts:13](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L13)

___

### ready

• `Protected` **ready**: `boolean`

#### Defined in

[Renderer/GLScreenQuad.ts:16](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L16)

## Methods

### bind

▸ **bind**(`renderstate`, `texture?`, `pos?`, `size?`): `void`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `texture?` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | The texture param. |
| `pos?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The pos value. |
| `size?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The size value. |

#### Returns

`void`

#### Defined in

[Renderer/GLScreenQuad.ts:49](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L49)

___

### bindShader

▸ **bindShader**(`renderstate`): `boolean`

The bindShader method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`boolean`

- The return value.

#### Defined in

[Renderer/GLScreenQuad.ts:84](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L84)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/GLScreenQuad.ts:105](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L105)

___

### draw

▸ **draw**(`renderstate`, `texture?`, `pos?`, `size?`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `texture?` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | The texture value. |
| `pos?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The pos value. |
| `size?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The size value. |

#### Returns

`void`

#### Defined in

[Renderer/GLScreenQuad.ts:95](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/GLScreenQuad.ts#L95)

