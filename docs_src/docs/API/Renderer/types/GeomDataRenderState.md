---
id: "Renderer_types_renderer.GeomDataRenderState"
title: "Interface: GeomDataRenderState"
sidebar_label: "GeomDataRenderState"
custom_edit_url: null
---



## Hierarchy

- [`BaseRenderState`](Renderer_types_renderer.BaseRenderState)

  ↳ **`GeomDataRenderState`**

## Properties

### attrs

• **attrs**: `Record`<`string`, `Record`<`string`, `any`\>\>

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[attrs](Renderer_types_renderer.BaseRenderState#attrs)

#### Defined in

[src/Renderer/types/renderer.ts:17](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L17)

___

### boundRendertarget

• **boundRendertarget**: `WebGLFramebuffer`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[boundRendertarget](Renderer_types_renderer.BaseRenderState#boundrendertarget)

#### Defined in

[src/Renderer/types/renderer.ts:39](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L39)

___

### boundTextures

• **boundTextures**: `number`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[boundTextures](Renderer_types_renderer.BaseRenderState#boundtextures)

#### Defined in

[src/Renderer/types/renderer.ts:38](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L38)

___

### cameraMatrix

• `Optional` **cameraMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[cameraMatrix](Renderer_types_renderer.BaseRenderState#cameramatrix)

#### Defined in

[src/Renderer/types/renderer.ts:44](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L44)

___

### directives

• `Optional` **directives**: `string`[]

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[directives](Renderer_types_renderer.BaseRenderState#directives)

#### Defined in

[src/Renderer/types/renderer.ts:19](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L19)

___

### drawItemsTexture

• `Optional` **drawItemsTexture**: `any`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[drawItemsTexture](Renderer_types_renderer.BaseRenderState#drawitemstexture)

#### Defined in

[src/Renderer/types/renderer.ts:21](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L21)

___

### floatGeomBuffer

• **floatGeomBuffer**: `boolean`

#### Defined in

[src/Renderer/types/renderer.ts:52](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L52)

___

### geomDataFbo

• `Optional` **geomDataFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo)

#### Defined in

[src/Renderer/types/renderer.ts:51](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L51)

___

### gl

• `Optional` **gl**: [`WebGL12RenderingContext`](Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[gl](Renderer_types_renderer.BaseRenderState#gl)

#### Defined in

[src/Renderer/types/renderer.ts:13](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L13)

___

### glGeom

• `Optional` **glGeom**: [`GLGeom`](../Drawing/Renderer_Drawing_GLGeom.GLGeom)

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[glGeom](Renderer_types_renderer.BaseRenderState#glgeom)

#### Defined in

[src/Renderer/types/renderer.ts:23](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L23)

___

### glShader

• `Optional` **glShader**: [`GLShader`](../Renderer_GLShader.GLShader)

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[glShader](Renderer_types_renderer.BaseRenderState#glshader)

#### Defined in

[src/Renderer/types/renderer.ts:14](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L14)

___

### pass

• `Optional` **pass**: `string`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[pass](Renderer_types_renderer.BaseRenderState#pass)

#### Defined in

[src/Renderer/types/renderer.ts:28](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L28)

___

### passIndex

• **passIndex**: `number`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[passIndex](Renderer_types_renderer.BaseRenderState#passindex)

#### Defined in

[src/Renderer/types/renderer.ts:27](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L27)

___

### region

• `Optional` **region**: `number`[]

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[region](Renderer_types_renderer.BaseRenderState#region)

#### Defined in

[src/Renderer/types/renderer.ts:43](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L43)

___

### shaderkey

• `Optional` **shaderkey**: `string`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[shaderkey](Renderer_types_renderer.BaseRenderState#shaderkey)

#### Defined in

[src/Renderer/types/renderer.ts:15](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L15)

___

### shaderopts



#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[shaderopts](Renderer_types_renderer.BaseRenderState#shaderopts)

#### Defined in

[src/Renderer/types/renderer.ts:16](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L16)

___

### supportsInstancing

• `Optional` **supportsInstancing**: `boolean`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[supportsInstancing](Renderer_types_renderer.BaseRenderState#supportsinstancing)

#### Defined in

[src/Renderer/types/renderer.ts:31](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L31)

___

### unifs



#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[unifs](Renderer_types_renderer.BaseRenderState#unifs)

#### Defined in

[src/Renderer/types/renderer.ts:18](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L18)

___

### viewScale

• **viewScale**: `number`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[viewScale](Renderer_types_renderer.BaseRenderState#viewscale)

#### Defined in

[src/Renderer/types/renderer.ts:42](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L42)

___

### viewXfo

• `Optional` **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[viewXfo](Renderer_types_renderer.BaseRenderState#viewxfo)

#### Defined in

[src/Renderer/types/renderer.ts:41](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L41)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[viewport](Renderer_types_renderer.BaseRenderState#viewport)

#### Defined in

[src/Renderer/types/renderer.ts:32](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L32)

___

### viewports

• `Optional` **viewports**: `any`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[viewports](Renderer_types_renderer.BaseRenderState#viewports)

#### Defined in

[src/Renderer/types/renderer.ts:33](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L33)

___

### vrPresenting

• `Optional` **vrPresenting**: `boolean`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[vrPresenting](Renderer_types_renderer.BaseRenderState#vrpresenting)

#### Defined in

[src/Renderer/types/renderer.ts:30](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L30)

___

### vrviewport

• `Optional` **vrviewport**: `any`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[vrviewport](Renderer_types_renderer.BaseRenderState#vrviewport)

#### Defined in

[src/Renderer/types/renderer.ts:25](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L25)

## Methods

### bindRendererUnifs

▸ **bindRendererUnifs**(`unifs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |


#### Returns

`void`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[bindRendererUnifs](Renderer_types_renderer.BaseRenderState#bindrendererunifs)

#### Defined in

[src/Renderer/types/renderer.ts:36](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L36)

___

### bindViewports

▸ **bindViewports**(`unifs`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |

| `cb` | `any` |

#### Returns

`void`

#### Inherited from

[BaseRenderState](Renderer_types_renderer.BaseRenderState).[bindViewports](Renderer_types_renderer.BaseRenderState#bindviewports)

#### Defined in

[src/Renderer/types/renderer.ts:35](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/types/renderer.ts#L35)

