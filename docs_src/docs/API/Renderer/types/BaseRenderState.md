---
id: "Renderer_types_renderer.BaseRenderState"
title: "Interface: BaseRenderState"
sidebar_label: "BaseRenderState"
custom_edit_url: null
---



## Hierarchy

- **`BaseRenderState`**

  ↳ [`GeomDataRenderState`](Renderer_types_renderer.GeomDataRenderState)

  ↳ [`ColorRenderState`](Renderer_types_renderer.ColorRenderState)

## Properties

### attrs

• **attrs**: `Record`<`string`, `Record`<`string`, `any`\>\>

#### Defined in

[src/Renderer/types/renderer.ts:17](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L17)

___

### boundRendertarget

• **boundRendertarget**: `WebGLFramebuffer`

#### Defined in

[src/Renderer/types/renderer.ts:39](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L39)

___

### boundTextures

• **boundTextures**: `number`

#### Defined in

[src/Renderer/types/renderer.ts:38](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L38)

___

### cameraMatrix

• `Optional` **cameraMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/types/renderer.ts:44](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L44)

___

### directives

• `Optional` **directives**: `string`[]

#### Defined in

[src/Renderer/types/renderer.ts:19](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L19)

___

### drawItemsTexture

• `Optional` **drawItemsTexture**: `any`

#### Defined in

[src/Renderer/types/renderer.ts:21](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L21)

___

### gl

• `Optional` **gl**: [`WebGL12RenderingContext`](Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/types/renderer.ts:13](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L13)

___

### glGeom

• `Optional` **glGeom**: [`GLGeom`](../Drawing/Renderer_Drawing_GLGeom.GLGeom)

#### Defined in

[src/Renderer/types/renderer.ts:23](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L23)

___

### glShader

• `Optional` **glShader**: [`GLShader`](../Renderer_GLShader.GLShader)

#### Defined in

[src/Renderer/types/renderer.ts:14](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L14)

___

### pass

• `Optional` **pass**: `string`

#### Defined in

[src/Renderer/types/renderer.ts:28](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L28)

___

### passIndex

• **passIndex**: `number`

#### Defined in

[src/Renderer/types/renderer.ts:27](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L27)

___

### region

• `Optional` **region**: `number`[]

#### Defined in

[src/Renderer/types/renderer.ts:43](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L43)

___

### shaderkey

• `Optional` **shaderkey**: `string`

#### Defined in

[src/Renderer/types/renderer.ts:15](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L15)

___

### shaderopts



#### Defined in

[src/Renderer/types/renderer.ts:16](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L16)

___

### supportsInstancing

• `Optional` **supportsInstancing**: `boolean`

#### Defined in

[src/Renderer/types/renderer.ts:31](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L31)

___

### unifs



#### Defined in

[src/Renderer/types/renderer.ts:18](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L18)

___

### viewScale

• **viewScale**: `number`

#### Defined in

[src/Renderer/types/renderer.ts:42](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L42)

___

### viewXfo

• `Optional` **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[src/Renderer/types/renderer.ts:41](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L41)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../Renderer_GLBaseViewport.GLBaseViewport)

#### Defined in

[src/Renderer/types/renderer.ts:32](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L32)

___

### viewports

• `Optional` **viewports**: `any`

#### Defined in

[src/Renderer/types/renderer.ts:33](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L33)

___

### vrPresenting

• `Optional` **vrPresenting**: `boolean`

#### Defined in

[src/Renderer/types/renderer.ts:30](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L30)

___

### vrviewport

• `Optional` **vrviewport**: `any`

#### Defined in

[src/Renderer/types/renderer.ts:25](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L25)

## Methods

### bindRendererUnifs

▸ **bindRendererUnifs**(`unifs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/types/renderer.ts:36](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L36)

___

### bindViewports

▸ **bindViewports**(`unifs`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |

| `cb` | `any` |

#### Returns

`void`

#### Defined in

[src/Renderer/types/renderer.ts:35](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/types/renderer.ts#L35)

