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

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:40](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L40)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[__id](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L11)

___

### drawElementCounts

• `Protected` **drawElementCounts**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawElementCounts](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawelementcounts)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:22](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L22)

___

### drawElementOffsets

• `Protected` **drawElementOffsets**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawElementOffsets](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawelementoffsets)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:23](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L23)

___

### drawIdsArray

• `Protected` **drawIdsArray**: `Float32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawIdsArray](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawidsarray)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:28](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L28)

___

### drawIdsBufferDirty

• `Protected` **drawIdsBufferDirty**: `boolean`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawIdsBufferDirty](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawidsbufferdirty)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:29](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L29)

___

### drawIdsTexture

• `Protected` **drawIdsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawIdsTexture](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawidstexture)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:30](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L30)

___

### freeIndices

• `Protected` **freeIndices**: `number`[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[freeIndices](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#freeindices)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:21](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L21)

___

### gl

• `Protected` **gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[gl](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#gl)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:17](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L17)

___

### glGeomIdsMapping

• `Protected` **glGeomIdsMapping**: `Record`<`string`, `any`\>

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[glGeomIdsMapping](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#glgeomidsmapping)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:19](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L19)

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[glGeomItems](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#glgeomitems)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:18](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L18)

___

### glgeomItemEventHandlers

• `Protected` **glgeomItemEventHandlers**: `any`[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[glgeomItemEventHandlers](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#glgeomitemeventhandlers)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:20](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L20)

___

### highlightElementCounts

• `Protected` **highlightElementCounts**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightElementCounts](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightelementcounts)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:24](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L24)

___

### highlightElementOffsets

• `Protected` **highlightElementOffsets**: `Int32Array`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightElementOffsets](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightelementoffsets)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L25)

___

### highlightedIdsArray

• `Protected` **highlightedIdsArray**: `any`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedIdsArray](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightedidsarray)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:32](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L32)

___

### highlightedIdsBufferDirty

• `Protected` **highlightedIdsBufferDirty**: `boolean`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedIdsBufferDirty](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightedidsbufferdirty)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:34](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L34)

___

### highlightedIdsTexture

• `Protected` **highlightedIdsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedIdsTexture](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlightedidstexture)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:33](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L33)

___

### highlightedItems

• `Protected` **highlightedItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[highlightedItems](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#highlighteditems)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:31](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L31)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[listeners](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L26)

___

### renderer

• `Protected` **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer)

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[renderer](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#renderer)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:16](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L16)

___

### reserved

• `Protected` **reserved**: `number`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[reserved](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#reserved)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L26)

___

### visibleItems

• `Protected` **visibleItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[visibleItems](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#visibleitems)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:27](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L27)

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

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:91](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L91)

___

### bindAndRender

▸ `Private` **bindAndRender**(`renderstate`, `drawIdsArray`, `counts`, `offsets`, `drawCount`): `void`

The bindAndRender method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `drawIdsArray` | `Float32Array` | - |
| `counts` | `Int32Array` | the counts for each element drawn in by this draw call. |
| `offsets` | `Int32Array` | the offsets for each element drawn in by this draw call. |
| `drawCount` | `number` | - |

#### Returns

`void`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[bindAndRender](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#bindandrender)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:428](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L428)

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

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:501](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L501)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[draw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#draw)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:373](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L373)

___

### drawHighlighted

▸ **drawHighlighted**(`renderstate`): `void`

The drawHighlighted method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[drawHighlighted](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#drawhighlighted)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:400](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L400)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L154)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L33)

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

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L25)

___

### multiDraw

▸ **multiDraw**(`renderstate`, `drawIds`, `counts`, `offsets`, `drawCount`): `void`

Draw an item to screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `drawIds` | `Float32Array` | the draw id for each element drawn in by this draw call. |
| `counts` | `Int32Array` | the geom element count for each element drawn in by this draw call. |
| `offsets` | `Int32Array` | the geom element offset for each element drawn in by this draw call. |
| `drawCount` | `number` | the number of active draw calls for this invocation |

#### Returns

`void`

#### Overrides

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[multiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#multidraw)

#### Defined in

[src/Renderer/Drawing/GLPointsItemSet.ts:18](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLPointsItemSet.ts#L18)

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

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L97)

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

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L44)

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

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L82)

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

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:157](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L157)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L134)

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

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:469](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L469)

___

### updateDrawIDsBuffer

▸ **updateDrawIDsBuffer**(`renderstate`): `void`

The updateDrawIDsBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[updateDrawIDsBuffer](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#updatedrawidsbuffer)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:199](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L199)

___

### updateHighlightedIDsBuffer

▸ **updateHighlightedIDsBuffer**(`renderstate`): `void`

The updateHighlightedIDsBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Inherited from

[GLGeomItemSetMultiDraw](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw).[updateHighlightedIDsBuffer](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw#updatehighlightedidsbuffer)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts:281](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSetMultiDraw.ts#L281)

