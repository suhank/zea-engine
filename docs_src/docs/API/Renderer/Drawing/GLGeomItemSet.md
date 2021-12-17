---
id: "Renderer_Drawing_GLGeomItemSet.GLGeomItemSet"
title: "Class: GLGeomItemSet"
sidebar_label: "GLGeomItemSet"
custom_edit_url: null
---



This class abstracts the rendering of a collection of geometries to screen.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLGeomItemSet`**

## Constructors

### constructor

• **new GLGeomItemSet**(`gl`, `glGeom`)

Create a GL geom item set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |
| `glGeom` | [`GLGeom`](Renderer_Drawing_GLGeom.GLGeom) | The glGeom value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:34](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L34)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L11)

___

### drawIdsArray

• `Protected` **drawIdsArray**: `Float32Array` = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:21](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L21)

___

### drawIdsBuffer

• `Protected` **drawIdsBuffer**: `WebGLBuffer` = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:22](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L22)

___

### drawIdsBufferDirty

• `Protected` **drawIdsBufferDirty**: `boolean`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:23](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L23)

___

### gl

• `Protected` **gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:15](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L15)

___

### glGeom

• `Protected` **glGeom**: [`GLGeom`](Renderer_Drawing_GLGeom.GLGeom)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:16](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L16)

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:18](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L18)

___

### glgeomItemEventHandlers

• `Protected` **glgeomItemEventHandlers**: `any`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:20](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L20)

___

### glgeomItems\_freeIndices

• `Protected` **glgeomItems\_freeIndices**: `number`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:19](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L19)

___

### highlightedIdsArray

• `Protected` **highlightedIdsArray**: `Float32Array` = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:24](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L24)

___

### highlightedIdsBuffer

• `Protected` **highlightedIdsBuffer**: `WebGLBuffer` = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L25)

___

### highlightedIdsBufferDirty

• `Protected` **highlightedIdsBufferDirty**: `boolean`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L26)

___

### highlightedItems

• `Protected` **highlightedItems**: `number`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:28](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L28)

___

### id

• `Protected` **id**: `number`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:17](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L17)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L26)

___

### visibleItems

• `Protected` **visibleItems**: `number`[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:27](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L27)

## Methods

### \_\_bindAndRender

▸ `Private` **__bindAndRender**(`renderstate`, `itemIndices`, `drawIdsBuffer`): `void`

The __bindAndRender method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `itemIndices` | `number`[] | The itemIndices value. |
| `drawIdsBuffer` | `WebGLBuffer` | The drawIdsBuffer value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:306](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L306)

___

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

[src/Renderer/Drawing/GLGeomItemSet.ts:74](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L74)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:354](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L354)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:273](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L273)

___

### drawHighlighted

▸ **drawHighlighted**(`renderstate`): `void`

The drawHighlighted method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:288](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L288)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L154)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L33)

___

### getDrawCount

▸ **getDrawCount**(): `number`

The getDrawCount method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:66](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L66)

___

### getDrawIdsArray

▸ **getDrawIdsArray**(): `Float32Array`

The getDrawIdsArray method.

#### Returns

`Float32Array`

- The drawIds for each GeomItem packed into a Float32Array

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:201](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L201)

___

### getGLGeom

▸ **getGLGeom**(): [`GLGeom`](Renderer_Drawing_GLGeom.GLGeom)

The getGLGeom method.

#### Returns

[`GLGeom`](Renderer_Drawing_GLGeom.GLGeom)

- The return value.

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:58](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L58)

___

### getHighlightedIdsArray

▸ **getHighlightedIdsArray**(): `Float32Array`

The getHighlightedIdsArray method.

#### Returns

`Float32Array`

- The drawIds for each GeomItem packed into a Float32Array

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:248](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L248)

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

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L25)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

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

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:139](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L139)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L134)

___

### updateDrawIDsBuffer

▸ **updateDrawIDsBuffer**(): `void`

The updateDrawIDsBuffer method.
The culling system will specify a subset of the total number of items for
drawing.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:176](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L176)

___

### updateHighlightedIDsBuffer

▸ **updateHighlightedIDsBuffer**(): `void`

The updateHighlightedIDsBuffer method.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSet.ts:225](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/Drawing/GLGeomItemSet.ts#L225)

