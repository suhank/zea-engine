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
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |
| `shaderopts` | `Record`<`string`, `any`\> | shader options |

#### Defined in

[src/Renderer/GLScreenQuad.ts:24](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L24)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLScreenQuad.ts:12](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L12)

___

### \_\_glshader

• `Protected` **\_\_glshader**: [`ScreenQuadShader`](Shaders/Renderer_Shaders_ScreenQuadShader.ScreenQuadShader)

#### Defined in

[src/Renderer/GLScreenQuad.ts:16](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L16)

___

### \_\_pos

• `Protected` **\_\_pos**: `number`[]

#### Defined in

[src/Renderer/GLScreenQuad.ts:13](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L13)

___

### \_\_quadBinding

• `Protected` **\_\_quadBinding**: `any`

#### Defined in

[src/Renderer/GLScreenQuad.ts:17](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L17)

___

### \_\_size

• `Protected` **\_\_size**: `number`[]

#### Defined in

[src/Renderer/GLScreenQuad.ts:14](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L14)

___

### flipY

• `Protected` **flipY**: `boolean`

#### Defined in

[src/Renderer/GLScreenQuad.ts:15](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L15)

___

### ready

• `Protected` **ready**: `boolean`

#### Defined in

[src/Renderer/GLScreenQuad.ts:18](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L18)

## Methods

### bind

▸ **bind**(`renderstate`, `texture?`, `pos?`, `size?`): `void`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `texture?` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | The texture param. |
| `pos?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The pos value. |
| `size?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The size value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLScreenQuad.ts:51](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L51)

___

### bindShader

▸ **bindShader**(`renderstate`): `boolean`

The bindShader method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLScreenQuad.ts:86](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L86)

___

### draw

▸ **draw**(`renderstate`, `texture?`, `pos?`, `size?`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `texture?` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | The texture value. |
| `pos?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The pos value. |
| `size?` | [`Vec2`](../Math/Math_Vec2.Vec2) | The size value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLScreenQuad.ts:97](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLScreenQuad.ts#L97)

