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
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) | `undefined` | The Canvas 3D Context. |
| `colorTexture` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | `undefined` | Represents 2D Texture in GL. |
| `createDepthTexture` | `boolean` | `false` | The createDepthTexture value. |

#### Defined in

[src/Renderer/GLFbo.ts:29](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L29)

## Properties

### \_\_clearColor

• `Protected` **\_\_clearColor**: [`Color`](../Math/Math_Color.Color)

#### Defined in

[src/Renderer/GLFbo.ts:17](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L17)

___

### \_\_colorTexture

• `Protected` **\_\_colorTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[src/Renderer/GLFbo.ts:15](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L15)

___

### \_\_createDepthTexture

• `Protected` **\_\_createDepthTexture**: `boolean`

#### Defined in

[src/Renderer/GLFbo.ts:16](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L16)

___

### \_\_depthTexture

• **\_\_depthTexture**: `WebGLTexture` = `null`

#### Defined in

[src/Renderer/GLFbo.ts:18](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L18)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Defined in

[src/Renderer/GLFbo.ts:19](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L19)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLFbo.ts:14](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L14)

___

### \_\_prevBoundFbo

• `Protected` **\_\_prevBoundFbo**: `WebGLFramebuffer` = `null`

#### Defined in

[src/Renderer/GLFbo.ts:20](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L20)

___

### colorTextureResizeEventId

• `Protected` **colorTextureResizeEventId**: `number` = `-1`

#### Defined in

[src/Renderer/GLFbo.ts:13](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L13)

## Accessors

### colorTexture

• `get` **colorTexture**(): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

Returns the ColorTexture of the Fbo

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- returns this.__colorTexture

#### Defined in

[src/Renderer/GLFbo.ts:150](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L150)

___

### depthTextureGL

• `get` **depthTextureGL**(): `WebGLTexture`

Returns the value of the depthTexture property.

#### Returns

`WebGLTexture`

#### Defined in

[src/Renderer/GLFbo.ts:170](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L170)

___

### height

• `get` **height**(): `number`

Returns the `height` of the GL Texture

#### Returns

`number`

- height of GLTexture

#### Defined in

[src/Renderer/GLFbo.ts:132](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L132)

___

### size

• `get` **size**(): `number`[]

Returns the [width, height] of the GL Texture.

#### Returns

`number`[]

- returns [width, height] of the __colorTexture

#### Defined in

[src/Renderer/GLFbo.ts:141](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L141)

___

### width

• `get` **width**(): `number`

Returns the `width` of the GL Texture

#### Returns

`number`

- width of GLTexture

#### Defined in

[src/Renderer/GLFbo.ts:123](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L123)

## Methods

### \_\_checkFramebuffer

▸ `Private` **__checkFramebuffer**(): `void`

The __checkFramebuffer method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:331](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L331)

___

### bind

▸ **bind**(`renderstate?`): `void`

Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:403](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L403)

___

### bindAndClear

▸ **bindAndClear**(`renderstate?`): `void`

Runs [`bind`](#bind) then [`clear`](#clear) methods.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:463](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L463)

___

### bindForReading

▸ **bindForReading**(`renderstate?`): `void`

Binds the Fbo to the canvas context, meaning that all READ operations will affect the current Fbo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:426](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L426)

___

### bindForWriting

▸ **bindForWriting**(`renderstate?`): `void`

Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:375](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L375)

___

### clear

▸ **clear**(): `void`

Enables all color components of the rendering context of the Fbo,
specifying the default color values when clearing color buffers and clears the buffers to preset values.

#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:447](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L447)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:472](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L472)

___

### getColorTexture

▸ **getColorTexture**(): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

Returns the ColorTexture of the Fbo

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- The return value.

#### Defined in

[src/Renderer/GLFbo.ts:105](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L105)

___

### getDepthTextureGL

▸ **getDepthTextureGL**(): `WebGLTexture`

Returns the value of the deptTexture property.

#### Returns

`WebGLTexture`

- The return value.

#### Defined in

[src/Renderer/GLFbo.ts:114](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L114)

___

### getHeight

▸ **getHeight**(): `number`

Returns the `height` of the GL Texture

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLFbo.ts:87](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L87)

___

### getSize

▸ **getSize**(): `number`[]

Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.

#### Returns

`number`[]

- The return value.

#### Defined in

[src/Renderer/GLFbo.ts:96](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L96)

___

### getWidth

▸ **getWidth**(): `number`

Returns the `width` of the GL Texture

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLFbo.ts:78](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L78)

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

[src/Renderer/GLFbo.ts:280](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L280)

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

[src/Renderer/GLFbo.ts:69](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L69)

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

[src/Renderer/GLFbo.ts:159](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L159)

___

### setup

▸ **setup**(): `void`

The setup method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:177](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L177)

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

[src/Renderer/GLFbo.ts:60](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L60)

___

### unbind

▸ **unbind**(`renderstate?`): `void`

Unbinds the Fbo to the canvas context for WRITE operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:412](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L412)

___

### unbindForReading

▸ **unbindForReading**(): `void`

Unbinds the Fbo to the canvas context for READ operations.

#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:437](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L437)

___

### unbindForWriting

▸ **unbindForWriting**(`renderstate`): `void`

Unbinds the Fbo to the canvas context for WRITE operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLFbo.ts:391](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Renderer/GLFbo.ts#L391)

