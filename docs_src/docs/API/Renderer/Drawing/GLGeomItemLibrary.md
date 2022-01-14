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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:42](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L42)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/BaseClass.ts#L11)

___

### dirtyItemIndices

• `Protected` **dirtyItemIndices**: `number`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:29](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L29)

___

### dirtyWorkerItemIndices

• `Protected` **dirtyWorkerItemIndices**: `Set`<`number`\>

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:30](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L30)

___

### enableFrustumCulling

• `Protected` **enableFrustumCulling**: `boolean`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:33](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L33)

___

### glGeomItemEventHandlers

• `Protected` **glGeomItemEventHandlers**: `any`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:26](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L26)

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:25](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L25)

___

### glGeomItemsIndexFreeList

• `Protected` **glGeomItemsIndexFreeList**: `number`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:28](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L28)

___

### glGeomItemsMap

• `Protected` **glGeomItemsMap**: `Record`<`number`, `number`\>

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:27](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L27)

___

### glGeomItemsTexture

• `Protected` **glGeomItemsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:32](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L32)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L26)

___

### removedItemIndices

• `Protected` **removedItemIndices**: `number`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:31](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L31)

___

### renderer

• `Protected` **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:24](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L24)

___

### worker

• `Private` **worker**: `GLGeomItemLibraryCullingWorker`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:35](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L35)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:202](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L202)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:311](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L311)

___

### bind

▸ **bind**(`renderstate`): `void`

Updates the GPU state if any update is needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:633](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L633)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:653](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L653)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L154)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/BaseClass.ts#L33)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:491](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L491)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:403](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L403)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:390](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L390)

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

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/BaseClass.ts#L25)

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

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L97)

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

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L44)

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

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L82)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:422](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L422)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:343](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L343)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Utilities/EventEmitter.ts#L134)

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

[src/Renderer/Drawing/GLGeomItemLibrary.ts:66](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L66)

___

### uploadGeomItems

▸ **uploadGeomItems**(`renderstate`): `void`

The uploadGeomItems method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:553](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L553)

___

### uploadGeomItemsToWorker

▸ **uploadGeomItemsToWorker**(): `void`

Any items that need to be updated on the worker are now pushed.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:523](https://github.com/ZeaInc/zea-engine/blob/375d47e4b/src/Renderer/Drawing/GLGeomItemLibrary.ts#L523)

