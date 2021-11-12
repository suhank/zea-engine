---
id: "Renderer_ImagePyramid.ImagePyramid"
title: "Class: ImagePyramid"
sidebar_label: "ImagePyramid"
custom_edit_url: null
---



Class representing an image pyramid.

## Hierarchy

- [`GLImageAtlas`](Renderer_GLImageAtlas.GLImageAtlas)

  ↳ **`ImagePyramid`**

## Constructors

### constructor

• **new ImagePyramid**(`gl`, `name`, `srcGLTex`, `screenQuad`, `destroySrcImage?`, `minTileSize?`)

Create an image pyramid.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | `undefined` | The webgl rendering context. |
| `name` | `string` | `undefined` | The name value. |
| `srcGLTex` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | `undefined` | The srcGLTex value. |
| `screenQuad` | [`GLScreenQuad`](Renderer_GLScreenQuad.GLScreenQuad) | `undefined` | - |
| `destroySrcImage` | `boolean` | `true` | The destroySrcImage value. |
| `minTileSize` | `number` | `16` | The minTileSize value. |

#### Overrides

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[constructor](Renderer_GLImageAtlas.GLImageAtlas#constructor)

#### Defined in

[Renderer/ImagePyramid.ts:30](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L30)

## Properties

### \_\_asyncCount

• `Protected` **\_\_asyncCount**: `number` = `0`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__asyncCount](Renderer_GLImageAtlas.GLImageAtlas#__asynccount)

#### Defined in

[Renderer/GLImageAtlas.ts:24](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L24)

___

### \_\_atlasLayoutShader

• `Protected` **\_\_atlasLayoutShader**: [`GLShader`](Renderer_GLShader.GLShader) = `null`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__atlasLayoutShader](Renderer_GLImageAtlas.GLImageAtlas#__atlaslayoutshader)

#### Defined in

[Renderer/GLImageAtlas.ts:31](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L31)

___

### \_\_atlasLayoutShaderBinding

• `Protected` **\_\_atlasLayoutShaderBinding**: [`IGeomShaderBinding`](Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding) = `null`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__atlasLayoutShaderBinding](Renderer_GLImageAtlas.GLImageAtlas#__atlaslayoutshaderbinding)

#### Defined in

[Renderer/GLImageAtlas.ts:30](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L30)

___

### \_\_atlasLayoutTexture

• `Protected` **\_\_atlasLayoutTexture**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__atlasLayoutTexture](Renderer_GLImageAtlas.GLImageAtlas#__atlaslayouttexture)

#### Defined in

[Renderer/GLImageAtlas.ts:28](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L28)

___

### \_\_fbos

• `Protected` **\_\_fbos**: [`GLFbo`](Renderer_GLFbo.GLFbo)[]

#### Defined in

[Renderer/ImagePyramid.ts:19](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L19)

___

### \_\_formatParam

• `Protected` **\_\_formatParam**: `string`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__formatParam](Renderer_GLImageAtlas.GLImageAtlas#__formatparam)

#### Defined in

[Renderer/GLImageAtlas.ts:19](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L19)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__gl](Renderer_GLImageAtlas.GLImageAtlas#__gl)

#### Defined in

[Renderer/GLRenderTarget.ts:7](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L7)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__id](Renderer_GLImageAtlas.GLImageAtlas#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L11)

___

### \_\_layout

• `Protected` **\_\_layout**: `LayoutItem`[] = `[]`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__layout](Renderer_GLImageAtlas.GLImageAtlas#__layout)

#### Defined in

[Renderer/GLImageAtlas.ts:27](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L27)

___

### \_\_layoutNeedsRegeneration

• `Protected` **\_\_layoutNeedsRegeneration**: `boolean`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__layoutNeedsRegeneration](Renderer_GLImageAtlas.GLImageAtlas#__layoutneedsregeneration)

#### Defined in

[Renderer/GLImageAtlas.ts:23](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L23)

___

### \_\_layoutVec4s

• `Protected` **\_\_layoutVec4s**: `number`[][] = `[]`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__layoutVec4s](Renderer_GLImageAtlas.GLImageAtlas#__layoutvec4s)

#### Defined in

[Renderer/GLImageAtlas.ts:29](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L29)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__name](Renderer_GLImageAtlas.GLImageAtlas#__name)

#### Defined in

[Renderer/GLImageAtlas.ts:18](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L18)

___

### \_\_prevBoundFbo

• `Protected` **\_\_prevBoundFbo**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__prevBoundFbo](Renderer_GLImageAtlas.GLImageAtlas#__prevboundfbo)

#### Defined in

[Renderer/GLRenderTarget.ts:26](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L26)

___

### \_\_srcGLTex

• `Protected` **\_\_srcGLTex**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[Renderer/ImagePyramid.ts:18](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L18)

___

### \_\_subImages

• `Protected` **\_\_subImages**: `any`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__subImages](Renderer_GLImageAtlas.GLImageAtlas#__subimages)

#### Defined in

[Renderer/GLImageAtlas.ts:22](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L22)

___

### \_\_typeParam

• `Protected` **\_\_typeParam**: `string`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__typeParam](Renderer_GLImageAtlas.GLImageAtlas#__typeparam)

#### Defined in

[Renderer/GLImageAtlas.ts:20](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L20)

___

### clearColor

• **clearColor**: [`Color`](../Math/Math_Color.Color)

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[clearColor](Renderer_GLImageAtlas.GLImageAtlas#clearcolor)

#### Defined in

[Renderer/GLRenderTarget.ts:22](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L22)

___

### colorMask

• `Protected` **colorMask**: `boolean`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[colorMask](Renderer_GLImageAtlas.GLImageAtlas#colormask)

#### Defined in

[Renderer/GLRenderTarget.ts:23](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L23)

___

### depthTexture

• `Protected` **depthTexture**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[depthTexture](Renderer_GLImageAtlas.GLImageAtlas#depthtexture)

#### Defined in

[Renderer/GLRenderTarget.ts:9](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L9)

___

### filter

• `Protected` **filter**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[filter](Renderer_GLImageAtlas.GLImageAtlas#filter)

#### Defined in

[Renderer/GLRenderTarget.ts:17](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L17)

___

### flipY

• `Protected` **flipY**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[flipY](Renderer_GLImageAtlas.GLImageAtlas#flipy)

#### Defined in

[Renderer/GLRenderTarget.ts:19](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L19)

___

### format

• `Protected` **format**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[format](Renderer_GLImageAtlas.GLImageAtlas#format)

#### Defined in

[Renderer/GLRenderTarget.ts:15](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L15)

___

### frameBuffer

• `Protected` **frameBuffer**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[frameBuffer](Renderer_GLImageAtlas.GLImageAtlas#framebuffer)

#### Defined in

[Renderer/GLRenderTarget.ts:11](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L11)

___

### height

• `Protected` **height**: `number` = `0`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[height](Renderer_GLImageAtlas.GLImageAtlas#height)

#### Defined in

[Renderer/GLRenderTarget.ts:21](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L21)

___

### internalFormat

• `Protected` **internalFormat**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[internalFormat](Renderer_GLImageAtlas.GLImageAtlas#internalformat)

#### Defined in

[Renderer/GLRenderTarget.ts:16](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L16)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[listeners](Renderer_GLImageAtlas.GLImageAtlas#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• `Protected` **loaded**: `boolean` = `false`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[loaded](Renderer_GLImageAtlas.GLImageAtlas#loaded)

#### Defined in

[Renderer/GLImageAtlas.ts:25](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L25)

___

### params

• `Protected` **params**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[params](Renderer_GLImageAtlas.GLImageAtlas#params)

#### Defined in

[Renderer/GLRenderTarget.ts:13](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L13)

___

### ready

• `Protected` **ready**: `boolean` = `false`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[ready](Renderer_GLImageAtlas.GLImageAtlas#ready)

#### Defined in

[Renderer/GLImageAtlas.ts:26](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L26)

___

### screenQuad

• `Protected` **screenQuad**: [`GLScreenQuad`](Renderer_GLScreenQuad.GLScreenQuad)

#### Defined in

[Renderer/ImagePyramid.ts:20](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L20)

___

### size

• `Protected` **size**: `number`

#### Defined in

[Renderer/ImagePyramid.ts:17](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L17)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[textureDesc](Renderer_GLImageAtlas.GLImageAtlas#texturedesc)

#### Defined in

[Renderer/GLRenderTarget.ts:10](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L10)

___

### textureTargets

• `Protected` **textureTargets**: `any`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[textureTargets](Renderer_GLImageAtlas.GLImageAtlas#texturetargets)

#### Defined in

[Renderer/GLRenderTarget.ts:8](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L8)

___

### textureType

• `Protected` **textureType**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[textureType](Renderer_GLImageAtlas.GLImageAtlas#texturetype)

#### Defined in

[Renderer/GLRenderTarget.ts:24](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L24)

___

### type

• `Protected` **type**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[type](Renderer_GLImageAtlas.GLImageAtlas#type)

#### Defined in

[Renderer/GLRenderTarget.ts:14](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L14)

___

### width

• `Protected` **width**: `number` = `0`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[width](Renderer_GLImageAtlas.GLImageAtlas#width)

#### Defined in

[Renderer/GLRenderTarget.ts:20](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L20)

___

### wrap

• `Protected` **wrap**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[wrap](Renderer_GLImageAtlas.GLImageAtlas#wrap)

#### Defined in

[Renderer/GLRenderTarget.ts:18](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L18)

## Methods

### addSubImage

▸ **addSubImage**(`subImage`): `number`

The addSubImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subImage` | [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) \| `WebGLTexture` | The subImage value. |

#### Returns

`number`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[addSubImage](Renderer_GLImageAtlas.GLImageAtlas#addsubimage)

#### Defined in

[Renderer/GLImageAtlas.ts:90](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L90)

___

### bindColorTexture

▸ **bindColorTexture**(`renderstate`, `unif`, `channelId?`): `boolean`

The bindColorTexture method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `renderstate` | `RenderState` | `undefined` | The object tracking the current state of the renderer |
| `unif` | `Uniform` | `undefined` | - |
| `channelId` | `number` | `0` | The channelId value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindColorTexture](Renderer_GLImageAtlas.GLImageAtlas#bindcolortexture)

#### Defined in

[Renderer/GLRenderTarget.ts:249](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L249)

___

### bindDepthTexture

▸ **bindDepthTexture**(`renderstate`, `unif`): `boolean`

The bindDepthTexture method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `unif` | `Uniform` | The WebGL uniform |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindDepthTexture](Renderer_GLImageAtlas.GLImageAtlas#binddepthtexture)

#### Defined in

[Renderer/GLRenderTarget.ts:264](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L264)

___

### bindForReading

▸ **bindForReading**(): `void`

Binds the render target in preparation for 'readPixels' calls to pull data back to main memory.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindForReading](Renderer_GLImageAtlas.GLImageAtlas#bindforreading)

#### Defined in

[Renderer/GLRenderTarget.ts:228](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L228)

___

### bindForWriting

▸ **bindForWriting**(`renderstate?`, `clear?`): `void`

The bindForWriting method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `renderstate?` | `RenderState` | `undefined` | The object tracking the current state of the renderer |
| `clear` | `boolean` | `false` | The clear value. |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindForWriting](Renderer_GLImageAtlas.GLImageAtlas#bindforwriting)

#### Defined in

[Renderer/GLRenderTarget.ts:186](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L186)

___

### bindToUniform

▸ **bindToUniform**(`renderstate`, `unif`): `boolean`

The bindToUniform method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `unif` | `Uniform` | The WebGL uniform |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindToUniform](Renderer_GLImageAtlas.GLImageAtlas#bindtouniform)

#### Defined in

[Renderer/GLImageAtlas.ts:365](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L365)

___

### checkFramebuffer

▸ **checkFramebuffer**(): `void`

The checkFramebuffer method.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[checkFramebuffer](Renderer_GLImageAtlas.GLImageAtlas#checkframebuffer)

#### Defined in

[Renderer/GLRenderTarget.ts:152](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L152)

___

### cleanup

▸ **cleanup**(): `void`

The cleanup method.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[cleanup](Renderer_GLImageAtlas.GLImageAtlas#cleanup)

#### Defined in

[Renderer/GLImageAtlas.ts:388](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L388)

___

### clear

▸ **clear**(`clearDepth?`): `void`

The clear method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `clearDepth` | `boolean` | `true` | The clearDepth value. |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[clear](Renderer_GLImageAtlas.GLImageAtlas#clear)

#### Defined in

[Renderer/GLRenderTarget.ts:213](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L213)

___

### configure

▸ **configure**(`params`): `void`

The configure method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Record`<`string`, `any`\> | The params param. |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[configure](Renderer_GLImageAtlas.GLImageAtlas#configure)

#### Defined in

[Renderer/GLRenderTarget.ts:50](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L50)

___

### decAsyncCount

▸ **decAsyncCount**(): `void`

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[decAsyncCount](Renderer_GLImageAtlas.GLImageAtlas#decasynccount)

#### Defined in

[Renderer/GLImageAtlas.ts:58](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L58)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Overrides

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[destroy](Renderer_GLImageAtlas.GLImageAtlas#destroy)

#### Defined in

[Renderer/ImagePyramid.ts:113](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L113)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[emit](Renderer_GLImageAtlas.GLImageAtlas#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L154)

___

### generateAtlasLayout

▸ **generateAtlasLayout**(`minTileSize`): `void`

The generateAtlasLayout method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minTileSize` | `any` | The minTileSize value. |

#### Returns

`void`

#### Overrides

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[generateAtlasLayout](Renderer_GLImageAtlas.GLImageAtlas#generateatlaslayout)

#### Defined in

[Renderer/ImagePyramid.ts:65](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L65)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getClassName](Renderer_GLImageAtlas.GLImageAtlas#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L33)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getId](Renderer_GLImageAtlas.GLImageAtlas#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L25)

___

### getLayoutData

▸ **getLayoutData**(`index`): `number`[]

The getLayoutData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`number`[]

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getLayoutData](Renderer_GLImageAtlas.GLImageAtlas#getlayoutdata)

#### Defined in

[Renderer/GLImageAtlas.ts:300](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L300)

___

### getMainImage

▸ **getMainImage**(): [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage)

The getMainImage method.

#### Returns

[`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage)

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getMainImage](Renderer_GLImageAtlas.GLImageAtlas#getmainimage)

#### Defined in

[Renderer/GLImageAtlas.ts:80](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L80)

___

### getSubImage

▸ **getSubImage**(`index`): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

The getSubImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- The image value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getSubImage](Renderer_GLImageAtlas.GLImageAtlas#getsubimage)

#### Defined in

[Renderer/GLImageAtlas.ts:148](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L148)

___

### incAsyncCount

▸ **incAsyncCount**(`count?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `count` | `number` | `1` |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[incAsyncCount](Renderer_GLImageAtlas.GLImageAtlas#incasynccount)

#### Defined in

[Renderer/GLImageAtlas.ts:52](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L52)

___

### isLoaded

▸ **isLoaded**(): `boolean`

The isLoaded method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[isLoaded](Renderer_GLImageAtlas.GLImageAtlas#isloaded)

#### Defined in

[Renderer/GLImageAtlas.ts:72](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L72)

___

### isReady

▸ **isReady**(): `boolean`

The isReady method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[isReady](Renderer_GLImageAtlas.GLImageAtlas#isready)

#### Defined in

[Renderer/GLImageAtlas.ts:355](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L355)

___

### numSubImages

▸ **numSubImages**(): `number`

The numSubImages method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[numSubImages](Renderer_GLImageAtlas.GLImageAtlas#numsubimages)

#### Defined in

[Renderer/GLImageAtlas.ts:156](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L156)

___

### off

▸ **off**(`eventName`, `listener?`): `void`

Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function or the id number. |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[off](Renderer_GLImageAtlas.GLImageAtlas#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L97)

___

### on

▸ **on**(`eventName`, `listener?`): `number`

Adds a listener function for a given event name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function(callback). |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[on](Renderer_GLImageAtlas.GLImageAtlas#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L44)

___

### once

▸ **once**(`eventName`, `listener`): `number`

Similar to the `on` method with the difference that when the event is triggered,
it is automatically unregistered meaning that the event listener will be triggered at most one time.

Useful for events that we expect to trigger one time, such as when assets load.
```javascript
const asset = new Asset();
asset.once('loaded', () => {
  console.log("Yay! the asset is loaded")
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The eventName value |
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[once](Renderer_GLImageAtlas.GLImageAtlas#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L82)

___

### removeListenerById

▸ **removeListenerById**(`eventName`, `id`): `void`

remove listener by ID returned from #on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `id` | `number` | The id returned by addListener |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[removeListenerById](Renderer_GLImageAtlas.GLImageAtlas#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L134)

___

### removeSubImage

▸ **removeSubImage**(`subImage`): `void`

The removeSubImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subImage` | [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) | The subImage value. |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[removeSubImage](Renderer_GLImageAtlas.GLImageAtlas#removesubimage)

#### Defined in

[Renderer/GLImageAtlas.ts:126](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLImageAtlas.ts#L126)

___

### renderAtlas

▸ **renderAtlas**(`cleanup?`): `void`

The renderAtlas method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `cleanup` | `boolean` | `true` | The cleanup value. |

#### Returns

`void`

#### Overrides

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[renderAtlas](Renderer_GLImageAtlas.GLImageAtlas#renderatlas)

#### Defined in

[Renderer/ImagePyramid.ts:97](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/ImagePyramid.ts#L97)

___

### resize

▸ **resize**(`width`, `height`, `preserveData?`): `void`

The resize method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `width` | `number` | `undefined` | The width value. |
| `height` | `number` | `undefined` | The height value. |
| `preserveData` | `boolean` | `false` | The preserveData value. |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[resize](Renderer_GLImageAtlas.GLImageAtlas#resize)

#### Defined in

[Renderer/GLRenderTarget.ts:286](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L286)

___

### unbind

▸ **unbind**(`renderstate?`): `void`

The unbind method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderstate?` | `RenderState` |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[unbind](Renderer_GLImageAtlas.GLImageAtlas#unbind)

#### Defined in

[Renderer/GLRenderTarget.ts:276](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L276)

___

### unbindForReading

▸ **unbindForReading**(): `void`

The unbindForReading method.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[unbindForReading](Renderer_GLImageAtlas.GLImageAtlas#unbindforreading)

#### Defined in

[Renderer/GLRenderTarget.ts:237](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L237)

___

### unbindForWriting

▸ **unbindForWriting**(`renderstate?`): `void`

The unbindForWriting method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[unbindForWriting](Renderer_GLImageAtlas.GLImageAtlas#unbindforwriting)

#### Defined in

[Renderer/GLRenderTarget.ts:202](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLRenderTarget.ts#L202)

