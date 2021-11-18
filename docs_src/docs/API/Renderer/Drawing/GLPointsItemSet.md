---
id: "Renderer_Drawing_GLPointsItemSet.GLPointsItemSet"
title: "Class: GLPointsItemSet"
sidebar_label: "GLPointsItemSet"
custom_edit_url: null
---



Class representing a GL mesh.

## Hierarchy

- [`GLGeomItemSetMultiDraw`](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw)

  ↳ **`GLPointsItemSet`**

## Constructors

### constructor

• **new GLPointsItemSet**(`renderer`)

Create a GL geom item set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer object. |

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[constructor](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#constructor)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:38

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[__id](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#__id)

#### Defined in

Utilities/BaseClass.ts:11

___

### drawElementCounts

• `Protected` **drawElementCounts**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawElementCounts](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawelementcounts)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:20

___

### drawElementOffsets

• `Protected` **drawElementOffsets**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawElementOffsets](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawelementoffsets)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:21

___

### drawIdsArray

• `Protected` **drawIdsArray**: `Float32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawIdsArray](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawidsarray)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:26

___

### drawIdsBufferDirty

• `Protected` **drawIdsBufferDirty**: `boolean`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawIdsBufferDirty](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawidsbufferdirty)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:27

___

### drawIdsTexture

• `Protected` **drawIdsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawIdsTexture](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawidstexture)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:28

___

### freeIndices

• `Protected` **freeIndices**: `number`[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[freeIndices](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#freeindices)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:19

___

### gl

• `Protected` **gl**: `WebGL12RenderingContext`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[gl](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#gl)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:15

___

### glGeomIdsMapping

• `Protected` **glGeomIdsMapping**: `Record`<`string`, `any`\>

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[glGeomIdsMapping](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#glgeomidsmapping)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:17

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[glGeomItems](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#glgeomitems)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:16

___

### glgeomItemEventHandlers

• `Protected` **glgeomItemEventHandlers**: `any`[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[glgeomItemEventHandlers](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#glgeomitemeventhandlers)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:18

___

### highlightElementCounts

• `Protected` **highlightElementCounts**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightElementCounts](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightelementcounts)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:22

___

### highlightElementOffsets

• `Protected` **highlightElementOffsets**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightElementOffsets](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightelementoffsets)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:23

___

### highlightedIdsArray

• `Protected` **highlightedIdsArray**: `any`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedIdsArray](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightedidsarray)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:30

___

### highlightedIdsBufferDirty

• `Protected` **highlightedIdsBufferDirty**: `boolean`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedIdsBufferDirty](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightedidsbufferdirty)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:32

___

### highlightedIdsTexture

• `Protected` **highlightedIdsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedIdsTexture](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightedidstexture)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:31

___

### highlightedItems

• `Protected` **highlightedItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedItems](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlighteditems)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:29

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[listeners](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#listeners)

#### Defined in

Utilities/EventEmitter.ts:26

___

### renderer

• `Protected` **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer)

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[renderer](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#renderer)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:14

___

### reserved

• `Protected` **reserved**: `number`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[reserved](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#reserved)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:24

___

### visibleItems

• `Protected` **visibleItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[visibleItems](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#visibleitems)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:25

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[addGLGeomItem](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#addglgeomitem)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:89

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[bindAndRender](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#bindandrender)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:426

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[destroy](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#destroy)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:499

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[draw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#draw)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:371

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawHighlighted](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawhighlighted)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:398

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

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[emit](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#emit)

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

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[getClassName](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#getclassname)

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

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[getId](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#getid)

#### Defined in

Utilities/BaseClass.ts:25

___

### multiDraw

▸ **multiDraw**(`renderstate`, `drawIds`, `counts`, `offsets`, `drawCount`): `void`

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

#### Overrides

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[multiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#multidraw)

#### Defined in

Renderer/Drawing/GLPointsItemSet.ts:17

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

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[off](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#off)

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

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[on](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#on)

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

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[once](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#once)

#### Defined in

Utilities/EventEmitter.ts:82

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[removeGLGeomItem](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#removeglgeomitem)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:155

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

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[removeListenerById](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#removelistenerbyid)

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[sortItems](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#sortitems)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:467

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[updateDrawIDsBuffer](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#updatedrawidsbuffer)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:197

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

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[updateHighlightedIDsBuffer](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#updatehighlightedidsbuffer)

#### Defined in

Renderer/Drawing/GLGeomItemSetMultiDraw.ts:279

