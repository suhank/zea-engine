---
id: "Renderer_GLHDRImage.GLHDRImage"
title: "Class: GLHDRImage"
sidebar_label: "GLHDRImage"
custom_edit_url: null
---



Class representing a GL high dynamic range (HDR) image.

## Hierarchy

- [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

  ↳ **`GLHDRImage`**

## Constructors

### constructor

• **new GLHDRImage**(`gl`, `hdrImage`)

Create a GL HDR image.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |
| `hdrImage` | [`HDRImage`](../SceneTree/Images/SceneTree_Images_HDRImage.HDRImage) | The HDR image. |

#### Overrides

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[constructor](Renderer_GLTexture2D.GLTexture2D#constructor)

#### Defined in

[src/Renderer/GLHDRImage.ts:31](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L31)

## Properties

### \_\_bound

• `Protected` **\_\_bound**: `boolean`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__bound](Renderer_GLTexture2D.GLTexture2D#__bound)

#### Defined in

[src/Renderer/GLTexture2D.ts:22](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L22)

___

### \_\_destroyed

• `Protected` **\_\_destroyed**: `boolean`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__destroyed](Renderer_GLTexture2D.GLTexture2D#__destroyed)

#### Defined in

[src/SceneTree/RefCounted.ts:15](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L15)

___

### \_\_flipY

• `Protected` **\_\_flipY**: `boolean` = `false`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__flipY](Renderer_GLTexture2D.GLTexture2D#__flipy)

#### Defined in

[src/Renderer/GLTexture2D.ts:35](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L35)

___

### \_\_format

• `Protected` **\_\_format**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__format](Renderer_GLTexture2D.GLTexture2D#__format)

#### Defined in

[src/Renderer/GLTexture2D.ts:27](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L27)

___

### \_\_formatParam

• `Protected` **\_\_formatParam**: `string` = `''`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__formatParam](Renderer_GLTexture2D.GLTexture2D#__formatparam)

#### Defined in

[src/Renderer/GLTexture2D.ts:42](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L42)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__gl](Renderer_GLTexture2D.GLTexture2D#__gl)

#### Defined in

[src/Renderer/GLTexture2D.ts:15](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L15)

___

### \_\_gltex

• `Protected` **\_\_gltex**: `WebGLTexture` = `null`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__gltex](Renderer_GLTexture2D.GLTexture2D#__gltex)

#### Defined in

[src/Renderer/GLTexture2D.ts:40](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L40)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__id](Renderer_GLTexture2D.GLTexture2D#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/BaseClass.ts#L11)

___

### \_\_image

• `Protected` **\_\_image**: [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__image](Renderer_GLTexture2D.GLTexture2D#__image)

#### Defined in

[src/Renderer/GLTexture2D.ts:24](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L24)

___

### \_\_internalFormat

• `Protected` **\_\_internalFormat**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__internalFormat](Renderer_GLTexture2D.GLTexture2D#__internalformat)

#### Defined in

[src/Renderer/GLTexture2D.ts:25](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L25)

___

### \_\_loaded

• `Protected` **\_\_loaded**: `boolean`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__loaded](Renderer_GLTexture2D.GLTexture2D#__loaded)

#### Defined in

[src/Renderer/GLTexture2D.ts:21](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L21)

___

### \_\_magFilter

• `Protected` **\_\_magFilter**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__magFilter](Renderer_GLTexture2D.GLTexture2D#__magfilter)

#### Defined in

[src/Renderer/GLTexture2D.ts:32](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L32)

___

### \_\_minFilter

• `Protected` **\_\_minFilter**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__minFilter](Renderer_GLTexture2D.GLTexture2D#__minfilter)

#### Defined in

[src/Renderer/GLTexture2D.ts:31](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L31)

___

### \_\_mipMapped

• `Protected` **\_\_mipMapped**: `boolean` = `false`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__mipMapped](Renderer_GLTexture2D.GLTexture2D#__mipmapped)

#### Defined in

[src/Renderer/GLTexture2D.ts:36](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L36)

___

### \_\_refs

• `Protected` **\_\_refs**: [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)[]

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__refs](Renderer_GLTexture2D.GLTexture2D#__refs)

#### Defined in

[src/SceneTree/RefCounted.ts:14](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L14)

___

### \_\_type

• `Protected` **\_\_type**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__type](Renderer_GLTexture2D.GLTexture2D#__type)

#### Defined in

[src/Renderer/GLTexture2D.ts:26](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L26)

___

### \_\_typeParam

• `Protected` **\_\_typeParam**: `string` = `''`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__typeParam](Renderer_GLTexture2D.GLTexture2D#__typeparam)

#### Defined in

[src/Renderer/GLTexture2D.ts:41](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L41)

___

### \_\_wrapParam

• `Protected` **\_\_wrapParam**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__wrapParam](Renderer_GLTexture2D.GLTexture2D#__wrapparam)

#### Defined in

[src/Renderer/GLTexture2D.ts:28](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L28)

___

### \_\_wrapS

• `Protected` **\_\_wrapS**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__wrapS](Renderer_GLTexture2D.GLTexture2D#__wraps)

#### Defined in

[src/Renderer/GLTexture2D.ts:33](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L33)

___

### \_\_wrapT

• `Protected` **\_\_wrapT**: `number` = `0`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__wrapT](Renderer_GLTexture2D.GLTexture2D#__wrapt)

#### Defined in

[src/Renderer/GLTexture2D.ts:34](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L34)

___

### alphaFromLuminance

• **alphaFromLuminance**: `boolean` = `false`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[alphaFromLuminance](Renderer_GLTexture2D.GLTexture2D#alphafromluminance)

#### Defined in

[src/Renderer/GLTexture2D.ts:38](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L38)

___

### fbo

• `Protected` **fbo**: [`GLFbo`](Renderer_GLFbo.GLFbo) = `null`

#### Defined in

[src/Renderer/GLHDRImage.ts:20](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L20)

___

### hdrImage

• `Protected` **hdrImage**: [`HDRImage`](../SceneTree/Images/SceneTree_Images_HDRImage.HDRImage)

#### Defined in

[src/Renderer/GLHDRImage.ts:19](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L19)

___

### height

• **height**: `number`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[height](Renderer_GLTexture2D.GLTexture2D#height)

#### Defined in

[src/Renderer/GLTexture2D.ts:18](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L18)

___

### invert

• **invert**: `boolean` = `false`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[invert](Renderer_GLTexture2D.GLTexture2D#invert)

#### Defined in

[src/Renderer/GLTexture2D.ts:37](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L37)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[src/Renderer/GLHDRImage.ts:18](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L18)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[listeners](Renderer_GLTexture2D.GLTexture2D#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L26)

___

### params

• `Protected` **params**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[params](Renderer_GLTexture2D.GLTexture2D#params)

#### Defined in

[src/Renderer/GLTexture2D.ts:30](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L30)

___

### ready

• `Protected` **ready**: `boolean`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[ready](Renderer_GLTexture2D.GLTexture2D#ready)

#### Defined in

[src/Renderer/GLTexture2D.ts:16](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L16)

___

### shaderBinding

• `Protected` **shaderBinding**: [`IGeomShaderBinding`](Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding) = `null`

#### Defined in

[src/Renderer/GLHDRImage.ts:24](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L24)

___

### srcCDMTex

• `Protected` **srcCDMTex**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/GLHDRImage.ts:22](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L22)

___

### srcLDRTex

• `Protected` **srcLDRTex**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/GLHDRImage.ts:21](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L21)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[textureDesc](Renderer_GLTexture2D.GLTexture2D#texturedesc)

#### Defined in

[src/Renderer/GLTexture2D.ts:20](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L20)

___

### textureType

• `Protected` **textureType**: `number`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[textureType](Renderer_GLTexture2D.GLTexture2D#texturetype)

#### Defined in

[src/Renderer/GLTexture2D.ts:19](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L19)

___

### unpackHDRShader

• `Protected` **unpackHDRShader**: [`GLShader`](Renderer_GLShader.GLShader) = `null`

#### Defined in

[src/Renderer/GLHDRImage.ts:23](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L23)

___

### width

• **width**: `number`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[width](Renderer_GLTexture2D.GLTexture2D#width)

#### Defined in

[src/Renderer/GLTexture2D.ts:17](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L17)

## Accessors

### glTex

• `get` **glTex**(): `WebGLTexture`

Returns the value of the WebGLTexture value

#### Returns

`WebGLTexture`

- The return value.

#### Inherited from

GLTexture2D.glTex

#### Defined in

[src/Renderer/GLTexture2D.ts:508](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L508)

## Methods

### \_\_unpackHDRImage

▸ `Private` **__unpackHDRImage**(`hdrImageParams`): `void`

The __unpackHDRImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hdrImageParams` | `Record`<`string`, `any`\> | The HDR image parameters. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLHDRImage.ts:61](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L61)

___

### \_\_updateGLTexParams

▸ `Private` **__updateGLTexParams**(): `void`

The __updateGLTexParams method.

#### Returns

`void`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[__updateGLTexParams](Renderer_GLTexture2D.GLTexture2D#__updategltexparams)

#### Defined in

[src/Renderer/GLTexture2D.ts:209](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L209)

___

### addRef

▸ **addRef**(`referer`): `boolean`

The addRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[addRef](Renderer_GLTexture2D.GLTexture2D#addref)

#### Defined in

[src/SceneTree/RefCounted.ts:51](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L51)

___

### bindToUniform

▸ **bindToUniform**(`renderstate`, `unif`, `bindings?`): `boolean`

The bindToUniform method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The WebGL uniform |
| `bindings?` | `Record`<`string`, `any`\> | The bindings value. |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[bindToUniform](Renderer_GLTexture2D.GLTexture2D#bindtouniform)

#### Defined in

[src/Renderer/GLHDRImage.ts:158](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L158)

___

### bufferData

▸ **bufferData**(`data`, `width?`, `height?`, `bind?`, `emit?`): `void`

Initializes and creates the buffer of the object's data store.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `any` | `undefined` | The data value. |
| `width` | `number` | `-1` | The width value. |
| `height` | `number` | `-1` | The height value. |
| `bind` | `boolean` | `true` | The bind value. |
| `emit` | `boolean` | `true` | The emit value. |

#### Returns

`void`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[bufferData](Renderer_GLTexture2D.GLTexture2D#bufferdata)

#### Defined in

[src/Renderer/GLTexture2D.ts:235](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L235)

___

### clear

▸ **clear**(): `void`

Clears the buffers to preset values

#### Returns

`void`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[clear](Renderer_GLTexture2D.GLTexture2D#clear)

#### Defined in

[src/Renderer/GLTexture2D.ts:348](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L348)

___

### configure

▸ **configure**(`params`): `void`

Builds the GLTexture2D using the specified parameters object.
Parameters must have the `BaseImage` properties structure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Record`<`string`, `any`\> | The params value. |

#### Returns

`void`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[configure](Renderer_GLTexture2D.GLTexture2D#configure)

#### Defined in

[src/Renderer/GLTexture2D.ts:158](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L158)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Overrides

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[destroy](Renderer_GLTexture2D.GLTexture2D#destroy)

#### Defined in

[src/Renderer/GLHDRImage.ts:166](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L166)

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

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[emit](Renderer_GLTexture2D.GLTexture2D#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getClassName](Renderer_GLTexture2D.GLTexture2D#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/BaseClass.ts#L33)

___

### getFormat

▸ **getFormat**(): `number`

Returns the value of the specified texel data. It must be the same as the `internalFormat`

#### Returns

`number`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getFormat](Renderer_GLTexture2D.GLTexture2D#getformat)

#### Defined in

[src/Renderer/GLTexture2D.ts:128](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L128)

___

### getId

▸ **getId**(): `number`

Returns the unique id of the object. Every Object has a unique
identifier which is based on a counter that is incremented.

#### Returns

`number`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getId](Renderer_GLTexture2D.GLTexture2D#getid)

#### Defined in

[src/SceneTree/RefCounted.ts:34](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L34)

___

### getImage

▸ **getImage**(): [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage)

Returns the `BaseImage` of the GL Texture

#### Returns

[`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage)

- The return value.

#### Overrides

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getImage](Renderer_GLTexture2D.GLTexture2D#getimage)

#### Defined in

[src/Renderer/GLHDRImage.ts:52](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLHDRImage.ts#L52)

___

### getInternalFormat

▸ **getInternalFormat**(): `number`

Returns the specified value of the color components in the texture.

#### Returns

`number`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getInternalFormat](Renderer_GLTexture2D.GLTexture2D#getinternalformat)

#### Defined in

[src/Renderer/GLTexture2D.ts:110](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L110)

___

### getMipMapped

▸ **getMipMapped**(): `boolean`

Returns the value of the specified binding point.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getMipMapped](Renderer_GLTexture2D.GLTexture2D#getmipmapped)

#### Defined in

[src/Renderer/GLTexture2D.ts:146](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L146)

___

### getRefIndex

▸ **getRefIndex**(`referer`): `number`

The getRefIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`number`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getRefIndex](Renderer_GLTexture2D.GLTexture2D#getrefindex)

#### Defined in

[src/SceneTree/RefCounted.ts:89](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L89)

___

### getRefer

▸ **getRefer**(`index`): [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)

The getRefer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getRefer](Renderer_GLTexture2D.GLTexture2D#getrefer)

#### Defined in

[src/SceneTree/RefCounted.ts:80](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L80)

___

### getSize

▸ **getSize**(): `number`[]

Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.

#### Returns

`number`[]

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getSize](Renderer_GLTexture2D.GLTexture2D#getsize)

#### Defined in

[src/Renderer/GLTexture2D.ts:499](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L499)

___

### getTexHdl

▸ **getTexHdl**(): `WebGLTexture`

Returns the value of the WebGLTexture value

#### Returns

`WebGLTexture`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getTexHdl](Renderer_GLTexture2D.GLTexture2D#gettexhdl)

#### Defined in

[src/Renderer/GLTexture2D.ts:517](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L517)

___

### getType

▸ **getType**(): `number`

Returns the value of the specified data type of the texel data.

#### Returns

`number`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getType](Renderer_GLTexture2D.GLTexture2D#gettype)

#### Defined in

[src/Renderer/GLTexture2D.ts:119](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L119)

___

### getWrap

▸ **getWrap**(): `number`

Returns the value of the specified wrapping function for texture coordinate

#### Returns

`number`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[getWrap](Renderer_GLTexture2D.GLTexture2D#getwrap)

#### Defined in

[src/Renderer/GLTexture2D.ts:137](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L137)

___

### isDestroyed

▸ **isDestroyed**(): `boolean`

Returns true if this object has already been destroyed.

#### Returns

`boolean`

- Returns true or false.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[isDestroyed](Renderer_GLTexture2D.GLTexture2D#isdestroyed)

#### Defined in

[src/SceneTree/RefCounted.ts:97](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L97)

___

### isLoaded

▸ **isLoaded**(): `boolean`

Returns the loaded status of the 2D Texture

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[isLoaded](Renderer_GLTexture2D.GLTexture2D#isloaded)

#### Defined in

[src/Renderer/GLTexture2D.ts:92](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L92)

___

### numRefs

▸ **numRefs**(): `number`

The numRefs method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[numRefs](Renderer_GLTexture2D.GLTexture2D#numrefs)

#### Defined in

[src/SceneTree/RefCounted.ts:42](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L42)

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

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[off](Renderer_GLTexture2D.GLTexture2D#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L97)

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

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[on](Renderer_GLTexture2D.GLTexture2D#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L44)

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

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[once](Renderer_GLTexture2D.GLTexture2D#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L82)

___

### populate

▸ **populate**(`dataArray`, `width`, `height`, `offsetX?`, `offsetY?`, `bind?`): `void`

Upload data for the image to the GPU.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `dataArray` | `Float32Array` \| `Uint16Array` | `undefined` | The dataArray value. |
| `width` | `number` | `undefined` | The width value |
| `height` | `number` | `undefined` | The height value |
| `offsetX` | `number` | `0` | The offsetX value |
| `offsetY` | `number` | `0` | The offsetY value |
| `bind` | `boolean` | `true` | The bind value |

#### Returns

`void`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[populate](Renderer_GLTexture2D.GLTexture2D#populate)

#### Defined in

[src/Renderer/GLTexture2D.ts:481](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L481)

___

### preBind

▸ **preBind**(`unif`, `unifs`): `Record`<`string`, [`Uniform`](types/Renderer_types_renderer.Uniform)\>

The preBind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The unif value. |


#### Returns

`Record`<`string`, [`Uniform`](types/Renderer_types_renderer.Uniform)\>

- The return value.

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[preBind](Renderer_GLTexture2D.GLTexture2D#prebind)

#### Defined in

[src/Renderer/GLTexture2D.ts:527](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L527)

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

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[removeListenerById](Renderer_GLTexture2D.GLTexture2D#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L134)

___

### removeRef

▸ **removeRef**(`referer`): `void`

The removeRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`void`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[removeRef](Renderer_GLTexture2D.GLTexture2D#removeref)

#### Defined in

[src/SceneTree/RefCounted.ts:64](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/SceneTree/RefCounted.ts#L64)

___

### resize

▸ **resize**(`width`, `height`, `preserveData?`, `emit?`): `void`

The resize method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `width` | `number` | `undefined` | The width value. |
| `height` | `number` | `undefined` | The height value. |
| `preserveData` | `boolean` | `false` | The preserveData value. |
| `emit` | `boolean` | `true` | The emit value. |

#### Returns

`void`

#### Inherited from

[GLTexture2D](Renderer_GLTexture2D.GLTexture2D).[resize](Renderer_GLTexture2D.GLTexture2D#resize)

#### Defined in

[src/Renderer/GLTexture2D.ts:422](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/GLTexture2D.ts#L422)

