---
id: "Renderer_Drawing_GLGeomItemLibrary.GLGeomItemLibrary"
title: "Class: GLGeomItemLibrary"
sidebar_label: "GLGeomItemLibrary"
custom_edit_url: null
---



Class for managing all the GeomItems discovered in the SceneTree.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLGeomItemLibrary`**

## Constructors

### constructor

• **new GLGeomItemLibrary**(`renderer`, `options`)

Create a GLGeomItemLibrary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer instance |
| `options` | `Record`<`string`, `any`\> | The options object passed to the GLRenderer constructor. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:37

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

Utilities/BaseClass.ts:11

___

### dirtyItemIndices

• `Protected` **dirtyItemIndices**: `number`[]

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:26

___

### dirtyWorkerItemIndices

• `Protected` **dirtyWorkerItemIndices**: `Set`<`number`\>

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:27

___

### enableFrustumCulling

• `Protected` **enableFrustumCulling**: `any`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:31

___

### glGeomItemEventHandlers

• `Protected` **glGeomItemEventHandlers**: `any`[]

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:23

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:22

___

### glGeomItemsIndexFreeList

• `Protected` **glGeomItemsIndexFreeList**: `number`[]

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:25

___

### glGeomItemsMap

• `Protected` **glGeomItemsMap**: `Record`<`number`, `number`\>

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:24

___

### glGeomItemsTexture

• `Protected` **glGeomItemsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:30

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

Utilities/EventEmitter.ts:26

___

### removedItemIndices

• `Protected` **removedItemIndices**: `number`[]

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:28

___

### renderer

• `Protected` **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer)

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:21

___

### worker

• `Protected` **worker**: `any`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:29

## Methods

### addGeomItem

▸ **addGeomItem**(`geomItem`): [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

The addGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

[`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

- The index of GLGeomItem

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:195

___

### applyCullResults

▸ **applyCullResults**(`data`): `void`

Handles applying the culling results received from the GLGeomItemLibraryCullingWorker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `any`\> | The object containing the newlyCulled and newlyUnCulled results. |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:304

___

### bind

▸ **bind**(`renderstate`): `void`

Updates the GPU state if any update is needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:626

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:646

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

### getCullingWorkerData

▸ **getCullingWorkerData**(`geomItem`, `material`, `index`): `Record`<`string`, `any`\>

Gathers data to pass to the culling worker.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The GeomItem to gether the data for. |
| `material` | [`Material`](../../SceneTree/SceneTree_Material.Material) | The material of GeomItem. |
| `index` | `number` | The index of the item to gether the data for. |

#### Returns

`Record`<`string`, `any`\>

- the JSON data that will be passed to the worker.

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:484

___

### getGLGeomItem

▸ **getGLGeomItem**(`geomItem`): [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

The getGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

[`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

- The GLGeomItem that wraps the provided GeomItem

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:396

___

### getGeomItem

▸ **getGeomItem**(`index`): [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

The getGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

- The GLGeomItem that wraps the provided GeomItem

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:383

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

### populateDrawItemDataArray

▸ `Private` **populateDrawItemDataArray**(`index`, `subIndex`, `dataArray`): `void`

The populateDrawItemDataArray method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the item in the library. |
| `subIndex` | `number` | The index of the item within the block being uploaded. |
| `dataArray` | `Float32Array` | The dataArray value. |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:415

___

### removeGeomItem

▸ **removeGeomItem**(`geomItem`): [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

The removeGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

[`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

- The return value.

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:336

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

### setupCullingWorker

▸ **setupCullingWorker**(`renderer`): `void`

Sets up the Culling Worker to start calculating frustum culling.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer instance |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:61

___

### uploadGeomItems

▸ **uploadGeomItems**(`renderstate`): `void`

The uploadGeomItems method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:546

___

### uploadGeomItemsToWorker

▸ **uploadGeomItemsToWorker**(): `void`

Any items that need to be updated on the worker are now pushed.

#### Returns

`void`

#### Defined in

Renderer/Drawing/GLGeomItemLibrary.ts:516

