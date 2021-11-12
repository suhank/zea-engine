---
id: "Renderer_GLEnvMap.GLEnvMap"
title: "Class: GLEnvMap"
sidebar_label: "GLEnvMap"
custom_edit_url: null
---



Class representing a GL environment map.

## Hierarchy

- [`GLProbe`](Renderer_GLProbe.GLProbe)

  ↳ **`GLEnvMap`**

## Constructors

### constructor

• **new GLEnvMap**(`renderer`, `envMap`)

Create a GL env map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLRenderer`](Renderer_GLRenderer.GLRenderer) | The renderer value. |
| `envMap` | [`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap) | The environment map. |

#### Overrides

[GLProbe](Renderer_GLProbe.GLProbe).[constructor](Renderer_GLProbe.GLProbe#constructor)

#### Defined in

[Renderer/GLEnvMap.ts:25](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L25)

## Properties

### \_\_backgroundFocus

• `Protected` **\_\_backgroundFocus**: `number`

#### Defined in

[Renderer/GLEnvMap.ts:15](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L15)

___

### \_\_convolved

• `Protected` **\_\_convolved**: `boolean`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__convolved](Renderer_GLProbe.GLProbe#__convolved)

#### Defined in

[Renderer/GLProbe.ts:17](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L17)

___

### \_\_envMap

• `Protected` **\_\_envMap**: [`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap)

#### Defined in

[Renderer/GLEnvMap.ts:14](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L14)

___

### \_\_envMapShader

• `Protected` **\_\_envMapShader**: [`EnvMapShader`](Shaders/Renderer_Shaders_EnvMapShader.EnvMapShader) = `null`

#### Defined in

[Renderer/GLEnvMap.ts:17](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L17)

___

### \_\_envMapShaderBinding

• `Protected` **\_\_envMapShaderBinding**: [`IGeomShaderBinding`](Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding) = `null`

#### Defined in

[Renderer/GLEnvMap.ts:18](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L18)

___

### \_\_fbos

• `Protected` **\_\_fbos**: `any`[]

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__fbos](Renderer_GLProbe.GLProbe#__fbos)

#### Defined in

[Renderer/GLProbe.ts:18](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L18)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__gl](Renderer_GLProbe.GLProbe#__gl)

#### Defined in

[Renderer/GLProbe.ts:13](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L13)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__id](Renderer_GLProbe.GLProbe#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L11)

___

### \_\_lodPyramid

• `Protected` **\_\_lodPyramid**: `any`

#### Defined in

[Renderer/GLEnvMap.ts:19](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L19)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Defined in

[Renderer/GLEnvMap.ts:13](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L13)

___

### \_\_srcGLTex

• `Protected` **\_\_srcGLTex**: [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage) = `null`

#### Defined in

[Renderer/GLEnvMap.ts:16](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L16)

___

### brdfLUTTexture

• `Protected` **brdfLUTTexture**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[brdfLUTTexture](Renderer_GLProbe.GLProbe#brdfluttexture)

#### Defined in

[Renderer/GLProbe.ts:19](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L19)

___

### irradianceCubeTex

• `Protected` **irradianceCubeTex**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[irradianceCubeTex](Renderer_GLProbe.GLProbe#irradiancecubetex)

#### Defined in

[Renderer/GLProbe.ts:20](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L20)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[listeners](Renderer_GLProbe.GLProbe#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L26)

___

### maxFragmentShaderTextureUnits

• `Protected` **maxFragmentShaderTextureUnits**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[maxFragmentShaderTextureUnits](Renderer_GLProbe.GLProbe#maxfragmentshadertextureunits)

#### Defined in

[Renderer/GLProbe.ts:14](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L14)

___

### specularCubetex

• `Protected` **specularCubetex**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[specularCubetex](Renderer_GLProbe.GLProbe#specularcubetex)

#### Defined in

[Renderer/GLProbe.ts:21](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L21)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[textureDesc](Renderer_GLProbe.GLProbe#texturedesc)

#### Defined in

[Renderer/GLProbe.ts:16](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L16)

___

### textureType

• `Protected` **textureType**: `number`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[textureType](Renderer_GLProbe.GLProbe#texturetype)

#### Defined in

[Renderer/GLProbe.ts:15](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L15)

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

- Returns true if the Probe was successfully bound.

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[bind](Renderer_GLProbe.GLProbe#bind)

#### Defined in

[Renderer/GLProbe.ts:238](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L238)

___

### convolveProbe

▸ **convolveProbe**(`srcGLTex`): `void`

The convolveProbe method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `srcGLTex` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | The srcGLTex value. |

#### Returns

`void`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[convolveProbe](Renderer_GLProbe.GLProbe#convolveprobe)

#### Defined in

[Renderer/GLProbe.ts:48](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLProbe.ts#L48)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Overrides

[GLProbe](Renderer_GLProbe.GLProbe).[destroy](Renderer_GLProbe.GLProbe#destroy)

#### Defined in

[Renderer/GLEnvMap.ts:159](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L159)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `ColorRenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/GLEnvMap.ts:108](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L108)

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

[GLProbe](Renderer_GLProbe.GLProbe).[emit](Renderer_GLProbe.GLProbe#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L154)

___

### getBackgroundFocus

▸ **getBackgroundFocus**(): `number`

The getBackgroundFocus method.

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLEnvMap.ts:91](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L91)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[getClassName](Renderer_GLProbe.GLProbe#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L33)

___

### getEnvMap

▸ **getEnvMap**(): [`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap)

The getEnvMap method.

#### Returns

[`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap)

- The return value.

#### Defined in

[Renderer/GLEnvMap.ts:83](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L83)

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

[GLProbe](Renderer_GLProbe.GLProbe).[getId](Renderer_GLProbe.GLProbe#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L25)

___

### init

▸ `Private` **init**(): `void`

#### Returns

`void`

#### Defined in

[Renderer/GLEnvMap.ts:43](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L43)

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

[GLProbe](Renderer_GLProbe.GLProbe).[off](Renderer_GLProbe.GLProbe#off)

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

[GLProbe](Renderer_GLProbe.GLProbe).[on](Renderer_GLProbe.GLProbe#on)

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

[GLProbe](Renderer_GLProbe.GLProbe).[once](Renderer_GLProbe.GLProbe#once)

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

[GLProbe](Renderer_GLProbe.GLProbe).[removeListenerById](Renderer_GLProbe.GLProbe#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L134)

___

### setBackgroundFocus

▸ **setBackgroundFocus**(`val`): `void`

The setBackgroundFocus method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

#### Defined in

[Renderer/GLEnvMap.ts:99](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLEnvMap.ts#L99)

