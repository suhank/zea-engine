---
id: "Renderer_Drawing_GLMaterial.GLMaterial"
title: "Class: GLMaterial"
sidebar_label: "GLMaterial"
custom_edit_url: null
---



Class representing a GL material.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLMaterial`**

## Constructors

### constructor

• **new GLMaterial**(`gl`, `material`, `glShader`)

Create a GL material.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | The webgl rendering context. |
| `material` | [`Material`](../../SceneTree/SceneTree_Material.Material) | The material value. |
| `glShader` | [`GLShader`](../Renderer_GLShader.GLShader) | The glShader value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[Renderer/Drawing/GLMaterial.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L22)

## Properties

### \_\_boundTexturesBeforeMaterial

• `Protected` **\_\_boundTexturesBeforeMaterial**: `any`

#### Defined in

[Renderer/Drawing/GLMaterial.ts:15](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L15)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/Drawing/GLMaterial.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L11)

___

### \_\_glshader

• `Protected` **\_\_glshader**: [`GLShader`](../Renderer_GLShader.GLShader)

#### Defined in

[Renderer/Drawing/GLMaterial.ts:13](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L13)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_material

• `Protected` **\_\_material**: [`Material`](../../SceneTree/SceneTree_Material.Material)

#### Defined in

[Renderer/Drawing/GLMaterial.ts:12](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L12)

___

### \_\_shaderBindings

• `Protected` **\_\_shaderBindings**: `Record`<`string`, `any`\>

#### Defined in

[Renderer/Drawing/GLMaterial.ts:14](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L14)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

## Methods

### bind

▸ **bind**(`renderstate`, `warnMissingUnifs`): `any`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `warnMissingUnifs` | `any` | The renderstate value. |

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/Drawing/GLMaterial.ts:54](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L54)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[fromJSON](../../Utilities/Utilities_EventEmitter.EventEmitter#fromjson)

#### Defined in

[Utilities/BaseClass.ts:59](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L59)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L33)

___

### getGLShader

▸ **getGLShader**(): [`GLShader`](../Renderer_GLShader.GLShader)

The getGLShader method.

#### Returns

[`GLShader`](../Renderer_GLShader.GLShader)

- The return value.

#### Defined in

[Renderer/Drawing/GLMaterial.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L44)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

___

### getMaterial

▸ **getMaterial**(): [`Material`](../../SceneTree/SceneTree_Material.Material)

The getMaterial method.

#### Returns

[`Material`](../../SceneTree/SceneTree_Material.Material)

- The return value.

#### Defined in

[Renderer/Drawing/GLMaterial.ts:36](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L36)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[off](../../Utilities/Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L97)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L44)

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
| `listener` | (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L82)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L134)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[toJSON](../../Utilities/Utilities_EventEmitter.EventEmitter#tojson)

#### Defined in

[Utilities/BaseClass.ts:46](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L46)

___

### unbind

▸ **unbind**(`renderstate`): `void`

The unbind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLMaterial.ts:72](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/Drawing/GLMaterial.ts#L72)

