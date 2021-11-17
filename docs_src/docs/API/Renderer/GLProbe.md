---
id: "Renderer_GLProbe.GLProbe"
title: "Class: GLProbe"
sidebar_label: "GLProbe"
custom_edit_url: null
---



Class representing a GL probe.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLProbe`**

  ↳↳ [`GLEnvMap`](Renderer_GLEnvMap.GLEnvMap)

## Constructors

### constructor

• **new GLProbe**(`gl`, `name`)

Create a GL probe.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | The webgl rendering context. |
| `name` | `string` | The name value. |

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[Renderer/GLProbe.ts:28](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L28)

## Properties

### \_\_convolved

• `Protected` **\_\_convolved**: `boolean`

#### Defined in

[Renderer/GLProbe.ts:17](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L17)

___

### \_\_fbos

• `Protected` **\_\_fbos**: `any`[]

#### Defined in

[Renderer/GLProbe.ts:18](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L18)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/GLProbe.ts:13](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L13)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/BaseClass.ts#L11)

___

### brdfLUTTexture

• `Protected` **brdfLUTTexture**: `any`

#### Defined in

[Renderer/GLProbe.ts:19](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L19)

___

### irradianceCubeTex

• `Protected` **irradianceCubeTex**: `any`

#### Defined in

[Renderer/GLProbe.ts:20](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L20)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L26)

___

### maxFragmentShaderTextureUnits

• `Protected` **maxFragmentShaderTextureUnits**: `any`

#### Defined in

[Renderer/GLProbe.ts:14](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L14)

___

### specularCubetex

• `Protected` **specularCubetex**: `any`

#### Defined in

[Renderer/GLProbe.ts:21](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L21)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Defined in

[Renderer/GLProbe.ts:16](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L16)

___

### textureType

• `Protected` **textureType**: `number`

#### Defined in

[Renderer/GLProbe.ts:15](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L15)

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

#### Defined in

[Renderer/GLProbe.ts:238](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L238)

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

#### Defined in

[Renderer/GLProbe.ts:48](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L48)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/GLProbe.ts:301](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/GLProbe.ts#L301)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/BaseClass.ts#L33)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/BaseClass.ts#L25)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[off](../Utilities/Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L97)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[on](../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L44)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[once](../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L82)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L134)

