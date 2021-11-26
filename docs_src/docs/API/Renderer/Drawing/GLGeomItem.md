---
id: "Renderer_Drawing_GLGeomItem.GLGeomItem"
title: "Class: GLGeomItem"
sidebar_label: "GLGeomItem"
custom_edit_url: null
---



This class is responsible for managing a GeomItem within the renderer.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLGeomItem`**

## Constructors

### constructor

• **new GLGeomItem**(`gl`, `geomItem`, `drawItemId`, `geomId`, `materialId`, `supportInstancing?`)

Create a GL geom item.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | `undefined` | The gl value. |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | `undefined` | The geomItem value. |
| `drawItemId` | `number` | `undefined` | The drawItemId value. |
| `geomId` | `number` | `undefined` | The geomId value. |
| `materialId` | `number` | `undefined` | The materialId value. |
| `supportInstancing` | `boolean` | `false` | a boolean to disable instancing support on some mobile platforms |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:59](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L59)

## Properties

### GLGeomItemSet

• **GLGeomItemSet**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:27](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L27)

___

### GLShaderGeomSets

• `Optional` **GLShaderGeomSets**: `any` = `null`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:30](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L30)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L11)

___

### culled

• `Protected` **culled**: `boolean`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L40)

___

### cutAwayChanged

• `Protected` **cutAwayChanged**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:48](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L48)

___

### cutData

• `Protected` **cutData**: `number`[] = `[]`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:42](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L42)

___

### cutDataChanged

• `Protected` **cutDataChanged**: `boolean` = `false`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L41)

___

### drawItemId

• **drawItemId**: `number`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L34)

___

### geomData

• `Protected` **geomData**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:43](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L43)

___

### geomId

• **geomId**: `number`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L35)

___

### geomItem

• **geomItem**: [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:33](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L33)

___

### geomItemParamChanged

• **geomItemParamChanged**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:28](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L28)

___

### geomMatrixChanged

• `Protected` **geomMatrixChanged**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:47](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L47)

___

### geomMatrixDirty

• `Protected` **geomMatrixDirty**: `boolean` = `false`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:44](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L44)

___

### geomVisible

• `Protected` **geomVisible**: `boolean`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L38)

___

### gl

• `Protected` **gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:32](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L32)

___

### highlightChanged

• `Protected` **highlightChanged**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:49](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L49)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:24](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L26)

___

### material

• **material**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:26](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L26)

___

### materialId

• **materialId**: `number`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L36)

___

### modelMatrixArray

• `Protected` **modelMatrixArray**: `any`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:45](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L45)

___

### supportInstancing

• `Protected` **supportInstancing**: `boolean`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L37)

___

### visible

• **visible**: `boolean`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L39)

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

- The return value.

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:167](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L167)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L207)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L154)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L33)

___

### getDrawItemId

▸ **getDrawItemId**(): `number`

The getId method.

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:130](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L130)

___

### getGeomItem

▸ **getGeomItem**(): [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

The getGeomItem method.

#### Returns

[`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

- The return value.

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:114](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L114)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L25)

___

### isVisible

▸ **isVisible**(): `boolean`

The isVisible method.

#### Returns

`boolean`

- The return value.

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:122](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L122)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L82)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L134)

___

### setCulled

▸ **setCulled**(`culled`): `void`

Sets the additional culled value which controls visiblity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `culled` | `boolean` | True if culled, else false. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:152](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L152)

___

### updateVisibility

▸ **updateVisibility**(): `void`

The updateVisibility method.

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeomItem.ts:137](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Drawing/GLGeomItem.ts#L137)

