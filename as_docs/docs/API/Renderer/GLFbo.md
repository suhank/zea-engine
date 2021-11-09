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

[Renderer/GLFbo.ts:27](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L27)

## Properties

### \_\_clearColor

• `Protected` **\_\_clearColor**: [`Color`](../Math/Math_Color.Color)

#### Defined in

[Renderer/GLFbo.ts:15](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L15)

___

### \_\_colorTexture

• `Protected` **\_\_colorTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[Renderer/GLFbo.ts:13](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L13)

___

### \_\_createDepthTexture

• `Protected` **\_\_createDepthTexture**: `boolean`

#### Defined in

[Renderer/GLFbo.ts:14](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L14)

___

### \_\_depthTexture

• `Protected` **\_\_depthTexture**: `WebGLTexture` = `null`

#### Defined in

[Renderer/GLFbo.ts:16](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L16)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Defined in

[Renderer/GLFbo.ts:17](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L17)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/GLFbo.ts:12](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L12)

___

### \_\_prevBoundFbo

• `Protected` **\_\_prevBoundFbo**: `WebGLFramebuffer` = `null`

#### Defined in

[Renderer/GLFbo.ts:18](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L18)

___

### colorTextureResizeEventId

• `Protected` **colorTextureResizeEventId**: `number` = `-1`

#### Defined in

[Renderer/GLFbo.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L11)

## Accessors

### colorTexture

• `get` **colorTexture**(): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

Returns the ColorTexture of the Fbo

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- returns this.__colorTexture

#### Defined in

[Renderer/GLFbo.ts:144](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L144)

___

### depthTextureGL

• `get` **depthTextureGL**(): `WebGLTexture`

Returns the value of the depthTexture property.

#### Returns

`WebGLTexture`

#### Defined in

[Renderer/GLFbo.ts:164](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L164)

___

### height

• `get` **height**(): `number`

Returns the `height` of the GL Texture

#### Returns

`number`

- height of GLTexture

#### Defined in

[Renderer/GLFbo.ts:126](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L126)

___

### size

• `get` **size**(): `number`[]

Returns the [width, height] of the GL Texture.

#### Returns

`number`[]

- returns [width, height] of the __colorTexture

#### Defined in

[Renderer/GLFbo.ts:135](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L135)

___

### width

• `get` **width**(): `number`

Returns the `width` of the GL Texture

#### Returns

`number`

- width of GLTexture

#### Defined in

[Renderer/GLFbo.ts:117](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L117)

## Methods

### \_\_checkFramebuffer

▸ `Private` **__checkFramebuffer**(): `void`

The __checkFramebuffer method.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:325](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L325)

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

[Renderer/GLFbo.ts:397](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L397)

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

[Renderer/GLFbo.ts:457](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L457)

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

[Renderer/GLFbo.ts:420](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L420)

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

[Renderer/GLFbo.ts:369](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L369)

___

### clear

▸ **clear**(): `void`

Enables all color components of the rendering context of the Fbo,
specifying the default color values when clearing color buffers and clears the buffers to preset values.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:441](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L441)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:466](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L466)

___

### getColorTexture

▸ **getColorTexture**(): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

Returns the ColorTexture of the Fbo

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- The return value.

#### Defined in

[Renderer/GLFbo.ts:99](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L99)

___

### getDepthTextureGL

▸ **getDepthTextureGL**(): `WebGLTexture`

Returns the value of the deptTexture property.

#### Returns

`WebGLTexture`

- The return value.

#### Defined in

[Renderer/GLFbo.ts:108](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L108)

___

### getHeight

▸ **getHeight**(): `number`

Returns the `height` of the GL Texture

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLFbo.ts:81](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L81)

___

### getSize

▸ **getSize**(): `number`[]

Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.

#### Returns

`number`[]

- The return value.

#### Defined in

[Renderer/GLFbo.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L90)

___

### getWidth

▸ **getWidth**(): `number`

Returns the `width` of the GL Texture

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLFbo.ts:72](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L72)

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

[Renderer/GLFbo.ts:274](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L274)

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

[Renderer/GLFbo.ts:63](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L63)

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

[Renderer/GLFbo.ts:153](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L153)

___

### setup

▸ **setup**(): `void`

The setup method.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:171](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L171)

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

[Renderer/GLFbo.ts:54](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L54)

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

[Renderer/GLFbo.ts:406](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L406)

___

### unbindForReading

▸ **unbindForReading**(): `void`

Unbinds the Fbo to the canvas context for READ operations.

#### Returns

`void`

#### Defined in

[Renderer/GLFbo.ts:431](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L431)

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

[Renderer/GLFbo.ts:385](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLFbo.ts#L385)

