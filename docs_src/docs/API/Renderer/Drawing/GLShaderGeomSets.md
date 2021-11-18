---
id: "Renderer_Drawing_GLShaderGeomSets.GLShaderGeomSets"
title: "Class: GLShaderGeomSets"
sidebar_label: "GLShaderGeomSets"
custom_edit_url: null
---



Class representing GL shader materials.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLShaderGeomSets`**

## Constructors

### constructor

• **new GLShaderGeomSets**(`pass`, `gl`, `shaders`)

Create a GL shader material.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pass` | [`GLStandardGeomsPass`](../Passes/Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass) | The pass that owns this object. |
| `gl` | `WebGL12RenderingContext` | The glShader value. |
| `shaders` | `Record`<`string`, `any`\> | The shader value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:31

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

Utilities/BaseClass.ts:11

___

### gl

• `Protected` **gl**: `WebGL12RenderingContext`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:16

___

### glGeomDataShader

• `Protected` **glGeomDataShader**: `any`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:18

___

### glGeomDataShaderKey

• `Protected` **glGeomDataShaderKey**: `string` = `''`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:23

___

### glGeomItemSets

• `Protected` **glGeomItemSets**: `Record`<`string`, `any`\>

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:20

___

### glHighlightShader

• `Protected` **glHighlightShader**: `any`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:19

___

### glHighlightShaderKey

• `Protected` **glHighlightShaderKey**: `string` = `''`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:24

___

### glShader

• `Protected` **glShader**: `any`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:17

___

### glShaderKey

• `Protected` **glShaderKey**: `string`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:22

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

Utilities/EventEmitter.ts:26

___

### pass

• `Protected` **pass**: [`GLStandardGeomsPass`](../Passes/Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass)

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:15

## Methods

### addGLGeomItem

▸ **addGLGeomItem**(`glGeomItem`): `void`

The addGLGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:80

___

### bindShader

▸ `Private` **bindShader**(`glShader`, `renderstate`, `key`): `void`

Binds one of its shaders for rendering, and also the other textures and values needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glShader` | `Record`<`string`, `any`\> | The shader to bind |
| `renderstate` | `RenderState` | The render state for the current draw traversal |
| `key` | `string` | The key to use to cache the shader binding. |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:126

___

### draw

▸ **draw**(`renderstate`): `void`

Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The render state for the current draw traversal |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:151

___

### drawGeomData

▸ **drawGeomData**(`renderstate`): `void`

The drawGeomData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `GeomDataRenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:179

___

### drawHighlightedGeoms

▸ **drawHighlightedGeoms**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:165

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

Utilities/EventEmitter.ts:154

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

Utilities/BaseClass.ts:33

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

Utilities/BaseClass.ts:25

___

### getOrCreateGLGeomItemSet

▸ **getOrCreateGLGeomItemSet**(`geom`): `any`

Given a GeomItem, constructs the GLGeomItemSet that handles drawing that type of geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geom` | [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) | The geomitem value. |

#### Returns

`any`

- The return value.

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:52

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

Utilities/EventEmitter.ts:97

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

Utilities/EventEmitter.ts:44

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

Utilities/EventEmitter.ts:82

___

### removeGLGeomItem

▸ **removeGLGeomItem**(`glGeomItem`): `void`

 Called by the GLPass to remove an item from this GLShaderGeomSets object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:104

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

Utilities/EventEmitter.ts:134

___

### sortItems

▸ **sortItems**(`viewPos`): `void`

Sorts the drawn items in order furthest to nearest when rendering transparent objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewPos` | [`Vec3`](../../Math/Math_Vec3.Vec3) | The position of the camera that we are sorting relative to. |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLShaderGeomSets.ts:202

