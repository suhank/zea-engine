---
id: "Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw"
title: "Class: GLGeomItemSetMultiDraw"
sidebar_label: "GLGeomItemSetMultiDraw"
custom_edit_url: null
---



This class abstracts the rendering of a collection of geometries to screen.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLGeomItemSetMultiDraw`**

  ↳↳ [`GLLinesItemSet`](Renderer_Drawing_GLLinesItemSet.GLLinesItemSet)

  ↳↳ [`GLMeshItemSet`](Renderer_Drawing_GLMeshItemSet.GLMeshItemSet)

  ↳↳ [`GLPointsItemSet`](Renderer_Drawing_GLPointsItemSet.GLPointsItemSet)

## Constructors

### constructor

• **new GLGeomItemSetMultiDraw**(`renderer`)

Create a GL geom item set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer object. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:38](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L38)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L11)

___

### drawElementCounts

• `Protected` **drawElementCounts**: `Int32Array`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:20](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L20)

___

### drawElementOffsets

• `Protected` **drawElementOffsets**: `Int32Array`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:21](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L21)

___

### drawIdsArray

• `Protected` **drawIdsArray**: `Float32Array`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:26](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L26)

___

### drawIdsBufferDirty

• `Protected` **drawIdsBufferDirty**: `boolean`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:27](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L27)

___

### drawIdsTexture

• `Protected` **drawIdsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:28](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L28)

___

### freeIndices

• `Protected` **freeIndices**: `number`[]

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:19](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L19)

___

### gl

• `Protected` **gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:15](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L15)

___

### glGeomIdsMapping

• `Protected` **glGeomIdsMapping**: `Record`<`string`, `any`\>

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:17](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L17)

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:16](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L16)

___

### glgeomItemEventHandlers

• `Protected` **glgeomItemEventHandlers**: `any`[]

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:18](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L18)

___

### highlightElementCounts

• `Protected` **highlightElementCounts**: `Int32Array`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:22](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L22)

___

### highlightElementOffsets

• `Protected` **highlightElementOffsets**: `Int32Array`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:23](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L23)

___

### highlightedIdsArray

• `Protected` **highlightedIdsArray**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:30](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L30)

___

### highlightedIdsBufferDirty

• `Protected` **highlightedIdsBufferDirty**: `boolean`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:32](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L32)

___

### highlightedIdsTexture

• `Protected` **highlightedIdsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:31](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L31)

___

### highlightedItems

• `Protected` **highlightedItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:29](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L29)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L26)

___

### renderer

• `Protected` **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer)

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:14](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L14)

___

### reserved

• `Protected` **reserved**: `number`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:24](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L24)

___

### visibleItems

• `Protected` **visibleItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:25](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L25)

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

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:89](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L89)

___

### bindAndRender

▸ `Private` **bindAndRender**(`renderstate`, `drawIdsArray`, `counts`, `offsets`, `drawCount`): `void`

The bindAndRender method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `drawIdsArray` | `Float32Array` | - |
| `counts` | `Int32Array` | the counts for each element drawn in by this draw call. |
| `offsets` | `Int32Array` | the offsets for each element drawn in by this draw call. |
| `drawCount` | `number` | - |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:426](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L426)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:499](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L499)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:371](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L371)

___

### drawHighlighted

▸ **drawHighlighted**(`renderstate`): `void`

The drawHighlighted method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:398](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L398)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L154)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L33)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L25)

___

### multiDraw

▸ `Abstract` **multiDraw**(`renderstate`, `drawIds`, `counts`, `offsets`, `drawCount`): `void`

Draw an item to screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `drawIds` | `Float32Array` | the draw id for each element drawn in by this draw call. |
| `counts` | `Int32Array` | the geom element count for each element drawn in by this draw call. |
| `offsets` | `Int32Array` | the geom element offset for each element drawn in by this draw call. |
| `drawCount` | `number` | the number of active draw calls for this invocation |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:455](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L455)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L82)

___

### removeGLGeomItem

▸ **removeGLGeomItem**(`glGeomItem`): `void`

The removeGLGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:155](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L155)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L134)

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

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:467](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L467)

___

### updateDrawIDsBuffer

▸ **updateDrawIDsBuffer**(`renderstate`): `void`

The updateDrawIDsBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object used to track state changes during rendering. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:197](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L197)

___

### updateHighlightedIDsBuffer

▸ **updateHighlightedIDsBuffer**(`renderstate`): `void`

The updateHighlightedIDsBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object used to track state changes during rendering. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItemSetMultiDraw.ts:279](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L279)

