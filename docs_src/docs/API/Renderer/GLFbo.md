---
id: "Renderer_GLFbo.GLFbo"
title: "Class: GLFbo"
sidebar_label: "GLFbo"
custom_edit_url: null
---



This class abstracts the rendering of a collection of geometries to screen.

## Constructors

### constructor

• **new GLFbo**(`gl`, `colorTexture`, `createDepthTexture?`)

Creates a GL Framebuffer Object

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | `undefined` | The Canvas 3D Context. |
| `colorTexture` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | `undefined` | Represents 2D Texture in GL. |
| `createDepthTexture` | `boolean` | `false` | The createDepthTexture value. |

#### Defined in

[Renderer/GLFbo.ts:27](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L27)

## Properties

### \_\_clearColor

• `Protected` **\_\_clearColor**: [`Color`](../Math/Math_Color.Color)

#### Defined in

[Renderer/GLFbo.ts:15](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L15)

___

### \_\_colorTexture

• `Protected` **\_\_colorTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[Renderer/GLFbo.ts:13](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L13)

___

### \_\_createDepthTexture

• `Protected` **\_\_createDepthTexture**: `boolean`

#### Defined in

[Renderer/GLFbo.ts:14](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L14)

___

### \_\_depthTexture

• `Protected` **\_\_depthTexture**: `WebGLTexture` = `null`

#### Defined in

[Renderer/GLFbo.ts:16](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L16)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Defined in

[Renderer/GLFbo.ts:17](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L17)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/GLFbo.ts:12](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L12)

___

### \_\_prevBoundFbo

• `Protected` **\_\_prevBoundFbo**: `WebGLFramebuffer` = `null`

#### Defined in

[Renderer/GLFbo.ts:18](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L18)

___

### colorTextureResizeEventId

• `Protected` **colorTextureResizeEventId**: `number` = `-1`

#### Defined in

[Renderer/GLFbo.ts:11](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L11)

## Accessors

### colorTexture

• `get` **colorTexture**(): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

Returns the ColorTexture of the Fbo

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- returns this.__colorTexture

#### Defined in

[Renderer/GLFbo.ts:148](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L148)

___

### depthTextureGL

• `get` **depthTextureGL**(): `WebGLTexture`

Returns the value of the depthTexture property.

#### Returns

`WebGLTexture`

#### Defined in

[Renderer/GLFbo.ts:168](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L168)

___

### height

• `get` **height**(): `number`

Returns the `height` of the GL Texture

#### Returns

`number`

- height of GLTexture

#### Defined in

[Renderer/GLFbo.ts:130](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L130)

___

### size

• `get` **size**(): `number`[]

Returns the [width, height] of the GL Texture.

#### Returns

`number`[]

- returns [width, height] of the __colorTexture

#### Defined in

[Renderer/GLFbo.ts:139](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L139)

___

### width

• `get` **width**(): `number`

Returns the `width` of the GL Texture

#### Returns

`number`

- width of GLTexture

#### Defined in

[Renderer/GLFbo.ts:121](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L121)

## Methods

### \_\_checkFramebuffer

▸ `Private` **__checkFramebuffer**(): `void`

The __checkFramebuffer method.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:329](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L329)

___

### bind

▸ **bind**(`renderstate?`): `void`

Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:401](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L401)

___

### bindAndClear

▸ **bindAndClear**(`renderstate?`): `void`

Runs [`bind`](#bind) then [`clear`](#clear) methods.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:461](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L461)

___

### bindForReading

▸ **bindForReading**(`renderstate?`): `void`

Binds the Fbo to the canvas context, meaning that all READ operations will affect the current Fbo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:424](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L424)

___

### bindForWriting

▸ **bindForWriting**(`renderstate?`): `void`

Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:373](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L373)

___

### clear

▸ **clear**(): `void`

Enables all color components of the rendering context of the Fbo,
specifying the default color values when clearing color buffers and clears the buffers to preset values.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:445](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L445)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:470](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L470)

___

### getColorTexture

▸ **getColorTexture**(): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

Returns the ColorTexture of the Fbo

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- The return value.

#### Defined in

[Renderer/GLFbo.ts:103](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L103)

___

### getDepthTextureGL

▸ **getDepthTextureGL**(): `WebGLTexture`

Returns the value of the deptTexture property.

#### Returns

`WebGLTexture`

- The return value.

#### Defined in

[Renderer/GLFbo.ts:112](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L112)

___

### getHeight

▸ **getHeight**(): `number`

Returns the `height` of the GL Texture

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLFbo.ts:85](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L85)

___

### getSize

▸ **getSize**(): `number`[]

Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.

#### Returns

`number`[]

- The return value.

#### Defined in

[Renderer/GLFbo.ts:94](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L94)

___

### getWidth

▸ **getWidth**(): `number`

Returns the `width` of the GL Texture

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLFbo.ts:76](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L76)

___

### resize

▸ **resize**(`width`, `height`, `resizeTexture`): `void`

Triggered Automatically when the texture resizes.

**`todo:`** Fbos should manage the textures assigned to them.
E.g. resizing and preserving data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |
| `resizeTexture` | `any` |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:278](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L278)

___

### setClearColor

▸ **setClearColor**(`clearColor`): `void`

Sets FBO clear color using RGBA array structure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clearColor` | [`Color`](../Math/Math_Color.Color) | The clearColor value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:67](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L67)

___

### setColorTexture

▸ **setColorTexture**(`colorTexture`): `void`

Sets ColorTexture of the Fbo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `colorTexture` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | The colorTexture value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:157](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L157)

___

### setup

▸ **setup**(): `void`

The setup method.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:175](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L175)

___

### textureResized

▸ `Private` **textureResized**(`event`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The event object providing the event details |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:58](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L58)

___

### unbind

▸ **unbind**(`renderstate?`): `void`

Unbinds the Fbo to the canvas context for WRITE operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:410](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L410)

___

### unbindForReading

▸ **unbindForReading**(): `void`

Unbinds the Fbo to the canvas context for READ operations.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:435](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L435)

___

### unbindForWriting

▸ **unbindForWriting**(`renderstate`): `void`

Unbinds the Fbo to the canvas context for WRITE operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:389](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLFbo.ts#L389)

