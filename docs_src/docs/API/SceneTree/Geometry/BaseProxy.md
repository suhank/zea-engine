---
id: "SceneTree_Geometry_GeomProxies.BaseProxy"
title: "Class: BaseProxy"
sidebar_label: "BaseProxy"
custom_edit_url: null
---



ProxyGeometries are pupulated from data unpacked using a webworker while loading zcad files.
These geometries represent readonly geometries with very basic topologies.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`BaseProxy`**

  ↳↳ [`PointsProxy`](SceneTree_Geometry_GeomProxies.PointsProxy)

  ↳↳ [`LinesProxy`](SceneTree_Geometry_GeomProxies.LinesProxy)

  ↳↳ [`MeshProxy`](SceneTree_Geometry_GeomProxies.MeshProxy)

## Constructors

### constructor

• **new BaseProxy**(`data`)

Create a base proxy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The data value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:19](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L19)

## Properties

### \_\_buffers

• **\_\_buffers**: `any`

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:11](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L11)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `any`

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:13](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L13)

___

### boundingBox

• `Protected` **boundingBox**: [`Box3`](../../Math/Math_Box3.Box3)

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:12](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L12)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L26)

___

### name

• `Protected` **name**: `string`

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:10](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L10)

## Methods

### deleteMetadata

▸ **deleteMetadata**(`key`): `void`

Removes metadata for a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:99](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L99)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L154)

___

### genBuffers

▸ **genBuffers**(): `any`

The genBuffers method.

#### Returns

`any`

- The return value.

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:60](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L60)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:52](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L52)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L33)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L25)

___

### getMetadata

▸ **getMetadata**(`key`): `any`

The getMetadata method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`any`

- The return value.

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:72](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L72)

___

### getNumVertices

▸ **getNumVertices**(): `any`

Returns the number of vertex attributes.

#### Returns

`any`

- The return value.

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:44](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L44)

___

### hasMetadata

▸ **hasMetadata**(`key`): `any`

The hasMetadata method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`any`

- The return value.

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:81](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L81)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L82)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L134)

___

### setMetadata

▸ **setMetadata**(`key`, `metaData`): `void`

The setMetadata method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |
| `metaData` | `any` | The metaData value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/GeomProxies.ts:90](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Geometry/GeomProxies.ts#L90)

